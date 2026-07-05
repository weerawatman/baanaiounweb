import { NextRequest, NextResponse } from "next/server"
import { createServerSupabase } from "@/lib/supabase"
import { sendLineMessage } from "@/lib/line-messaging"
import { sendEmailNotification } from "@/lib/email"

// ─── Rate limiting (in-memory, per IP) ────────────────────────────────────
// NOTE: resets per serverless instance. Upgrade to Upstash Redis for multi-instance scale.
const RATE_LIMIT_WINDOW_MS = 60_000 // 1 minute
const RATE_LIMIT_MAX = 3 // 3 submissions per minute per IP
const rateBuckets = new Map<string, { count: number; resetAt: number }>()

function getClientIp(request: NextRequest): string {
  const fwd = request.headers.get("x-forwarded-for")
  if (fwd) return fwd.split(",")[0]!.trim()
  return request.headers.get("x-real-ip") ?? "unknown"
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const bucket = rateBuckets.get(ip)
  if (!bucket || now > bucket.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  if (bucket.count >= RATE_LIMIT_MAX) return false
  bucket.count++
  return true
}

// ─── Types ───────────────────────────────────────────────────────────────

const REQUEST_TABLES = {
  "list-property": "list_property_requests",
  matchmaking: "matchmaking_requests",
  "co-agent": "coagent_requests",
} as const

type RequestType = keyof typeof REQUEST_TABLES

interface ServiceRequestBody {
  requestType: RequestType
  name: string
  phone: string
  email: string
  propertyType: string
  location: string
  budget?: string
  imageUrls?: string[]
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ─── Validation ──────────────────────────────────────────────────────────

function validateRequest(
  data: unknown,
): { valid: true; parsed: ServiceRequestBody } | { valid: false; error: string } {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid request body" }
  }

  const d = data as Record<string, unknown>

  if (typeof d.requestType !== "string" || !(d.requestType in REQUEST_TABLES)) {
    return { valid: false, error: "requestType must be list-property, matchmaking, or co-agent" }
  }
  if (!d.name || typeof d.name !== "string" || d.name.trim().length < 2) {
    return { valid: false, error: "name is required (min 2 characters)" }
  }
  if (!d.phone || typeof d.phone !== "string" || d.phone.trim().length < 3) {
    return { valid: false, error: "phone / WhatsApp / LINE is required" }
  }
  if (!d.email || typeof d.email !== "string" || !EMAIL_PATTERN.test(d.email.trim())) {
    return { valid: false, error: "a valid email is required" }
  }
  if (!d.propertyType || typeof d.propertyType !== "string") {
    return { valid: false, error: "propertyType is required" }
  }
  if (!d.location || typeof d.location !== "string" || d.location.trim().length < 2) {
    return { valid: false, error: "location is required" }
  }

  return {
    valid: true,
    parsed: {
      requestType: d.requestType as RequestType,
      name: String(d.name).trim(),
      phone: String(d.phone).trim(),
      email: String(d.email).trim(),
      propertyType: String(d.propertyType),
      location: String(d.location).trim(),
      budget: d.budget ? String(d.budget).trim() : undefined,
      imageUrls: Array.isArray(d.imageUrls)
        ? (d.imageUrls as unknown[]).filter((u): u is string => typeof u === "string")
        : undefined,
    },
  }
}

// ─── POST Handler ────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    if (!checkRateLimit(getClientIp(request))) {
      return NextResponse.json({ success: false, error: "Too many requests" }, { status: 429 })
    }

    const body = await request.json()
    const validation = validateRequest(body)

    if (!validation.valid) {
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 })
    }

    const data = validation.parsed
    const table = REQUEST_TABLES[data.requestType]

    // 1) Save to Supabase (table per request type)
    let dbSuccess = false
    try {
      const supabase = createServerSupabase()
      if (!supabase) {
        console.warn("[API] Supabase not configured — skipping DB insert")
      } else {
        const { error: dbError } = await supabase.from(table).insert({
          name: data.name,
          phone: data.phone,
          email: data.email,
          property_type: data.propertyType,
          location: data.location,
          budget: data.budget,
          image_urls: data.imageUrls ?? [],
        })

        if (dbError) {
          console.error("[Supabase] Insert error:", dbError)
        } else {
          dbSuccess = true
        }
      }
    } catch (err) {
      console.error("[Supabase] Connection error:", err)
    }

    // 2+3) LINE + Email notifications in parallel
    const formTag = `request-${data.requestType}`
    const notificationDetails = {
      propertyType: data.propertyType,
      location: data.location,
      email: data.email,
      ...(data.budget ? { budget: data.budget } : {}),
    }

    const [lineResult, emailResult] = await Promise.allSettled([
      sendLineMessage({ formTag, name: data.name, contact: data.phone, details: notificationDetails }),
      sendEmailNotification({ formTag, name: data.name, contact: data.phone, details: notificationDetails }),
    ])

    if (lineResult.status === "rejected") console.error("[LINE Messaging] Error:", lineResult.reason)
    if (emailResult.status === "rejected") console.error("[Email] Error:", emailResult.reason)

    return NextResponse.json({
      success: true,
      saved: dbSuccess,
      lineNotified: lineResult.status === "fulfilled" && lineResult.value,
      emailNotified: emailResult.status === "fulfilled" && emailResult.value,
    })
  } catch {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
