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

interface FormSubmission {
  formTag: string // owner | owner-foreign | buyer | buyer-foreign | co-agent | academy | contact
  name: string
  phone?: string
  lineId?: string
  email?: string
  contact?: string // for foreign users (WhatsApp, WeChat, etc.)
  propertyType?: string
  propertySize?: string
  location?: string
  region?: string
  price?: string
  purpose?: string
  requirement?: string
  preferredSize?: string
  budget?: string
  details?: string
  preselect?: string // SALE | RENT | LAND
  imageUrls?: string[] // uploaded property image URLs
  commission?: string // for Co-Agent
  occupation?: string // for Academy
}

// ─── Validation ──────────────────────────────────────────────────────────

function validateSubmission(
  data: unknown,
): { valid: true; parsed: FormSubmission } | { valid: false; error: string } {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid request body" }
  }

  const d = data as Record<string, unknown>

  if (!d.formTag || typeof d.formTag !== "string") {
    return { valid: false, error: "formTag is required" }
  }

  if (!d.name || typeof d.name !== "string" || d.name.trim().length < 2) {
    return { valid: false, error: "name is required (min 2 characters)" }
  }

  // Require at least one contact method
  const hasContact = d.phone || d.lineId || d.email || d.contact
  if (!hasContact) {
    return {
      valid: false,
      error: "At least one contact method is required (phone, lineId, email, or contact)",
    }
  }

  return {
    valid: true,
    parsed: {
      formTag: String(d.formTag),
      name: String(d.name).trim(),
      phone: d.phone ? String(d.phone).trim() : undefined,
      lineId: d.lineId ? String(d.lineId).trim() : undefined,
      email: d.email ? String(d.email).trim() : undefined,
      contact: d.contact ? String(d.contact).trim() : undefined,
      propertyType: d.propertyType ? String(d.propertyType) : undefined,
      propertySize: d.propertySize ? String(d.propertySize) : undefined,
      location: d.location ? String(d.location) : undefined,
      region: d.region ? String(d.region) : undefined,
      price: d.price ? String(d.price) : undefined,
      purpose: d.purpose ? String(d.purpose) : undefined,
      requirement: d.requirement ? String(d.requirement) : undefined,
      preferredSize: d.preferredSize ? String(d.preferredSize) : undefined,
      budget: d.budget ? String(d.budget) : undefined,
      details: d.details ? String(d.details) : undefined,
      preselect: d.preselect ? String(d.preselect) : undefined,
      imageUrls: Array.isArray(d.imageUrls)
        ? (d.imageUrls as string[]).filter((u) => typeof u === "string")
        : undefined,
      commission: d.commission ? String(d.commission) : undefined,
      occupation: d.occupation ? String(d.occupation) : undefined,
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
    const validation = validateSubmission(body)

    if (!validation.valid) {
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 })
    }

    const data = validation.parsed
    const contactInfo = data.phone || data.contact || data.lineId || data.email || ""

    // 1) Save to Supabase
    let dbSuccess = false
    try {
      const supabase = createServerSupabase()
      if (!supabase) {
        console.warn("[API] Supabase not configured — skipping DB insert")
      } else {
        const { error: dbError } = await supabase.from("form_submissions").insert({
          form_tag: data.formTag,
          name: data.name,
          phone: data.phone,
          line_id: data.lineId,
          email: data.email,
          contact: data.contact,
          property_type: data.propertyType,
          property_size: data.propertySize,
          location: data.location,
          region: data.region,
          price: data.price,
          purpose: data.purpose,
          requirement: data.requirement,
          preferred_size: data.preferredSize,
          budget: data.budget,
          details: data.details,
          preselect: data.preselect,
          image_urls: data.imageUrls ?? [],
          commission: data.commission,
          occupation: data.occupation,
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

    // 2+3) Send LINE + Email in parallel (saves 1-3s vs sequential)
    const notificationDetails = {
      ...(data.purpose ? { purpose: data.purpose } : {}),
      ...(data.requirement ? { requirement: data.requirement } : {}),
      ...(data.propertyType ? { propertyType: data.propertyType } : {}),
      ...(data.location ? { location: data.location } : {}),
      ...(data.price ? { price: data.price } : {}),
      ...(data.budget ? { budget: data.budget } : {}),
      ...(data.lineId ? { lineId: data.lineId } : {}),
      ...(data.commission ? { commission: data.commission } : {}),
      ...(data.occupation ? { occupation: data.occupation } : {}),
      ...(data.details ? { details: data.details } : {}),
      ...(data.contact ? { contact: data.contact } : {}),
    }

    const [lineResult, emailResult] = await Promise.allSettled([
      sendLineMessage({ formTag: data.formTag, name: data.name, contact: contactInfo, details: notificationDetails }),
      sendEmailNotification({ formTag: data.formTag, name: data.name, contact: contactInfo, details: notificationDetails }),
    ])

    if (lineResult.status === "rejected") console.error("[LINE Messaging] Error:", lineResult.reason)
    if (emailResult.status === "rejected") console.error("[Email] Error:", emailResult.reason)

    const lineSuccess = lineResult.status === "fulfilled" && lineResult.value
    const emailSuccess = emailResult.status === "fulfilled" && emailResult.value

    return NextResponse.json({
      success: true,
      saved: dbSuccess,
      lineNotified: lineSuccess,
      emailNotified: emailSuccess,
    })
  } catch {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
