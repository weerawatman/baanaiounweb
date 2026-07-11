import { NextRequest, NextResponse } from "next/server"
import { createServerSupabase } from "@/lib/supabase"
import { buildStorageUploadPath } from "@/lib/upload-storage"

// ─── Config ──────────────────────────────────────────────────────────────

const MAX_FILES = 10 // per request; admin ImageUploader allows up to 10, public ImageUpload caps itself at 5
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
// type → file extension. Also serves as the accepted-types allowlist.
const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
}
const BUCKET = "property-images"

// ─── Rate limiting (in-memory, per IP) ─────────────────────────────────────
// NOTE: this resets per serverless instance. For multi-instance / production
// scale, back this with a shared store (e.g. Upstash Redis).
const RATE_LIMIT_WINDOW_MS = 60_000 // 1 minute
const RATE_LIMIT_MAX = 20 // requests per window per IP
const rateBuckets = new Map<string, { count: number; resetAt: number }>()

function getClientIp(request: NextRequest): string {
  const fwd = request.headers.get("x-forwarded-for")
  if (fwd) return fwd.split(",")[0]!.trim()
  return request.headers.get("x-real-ip") ?? "unknown"
}

/** Returns true if the request is within the rate limit (and records it). */
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

/** Allow only same-origin requests (browser callers), blocking direct scripts. */
function isAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin")
  if (!origin) return false

  const allowed = new Set<string>([request.nextUrl.origin])
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (siteUrl) allowed.add(siteUrl.replace(/\/$/, ""))

  return allowed.has(origin)
}

// ─── POST Handler ────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    // 1) Reject cross-origin / direct (non-browser) requests
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 })
    }

    // 2) Rate limit per IP
    if (!checkRateLimit(getClientIp(request))) {
      return NextResponse.json({ success: false, error: "Too many requests" }, { status: 429 })
    }

    const supabase = createServerSupabase()

    if (!supabase) {
      return NextResponse.json({ success: false, error: "Storage not configured" }, { status: 503 })
    }

    const formData = await request.formData()
    const files = formData.getAll("files") as File[]
    const folder = formData.get("folder")
    const storageFolder = typeof folder === "string" ? folder : undefined

    if (!files.length) {
      return NextResponse.json({ success: false, error: "No files provided" }, { status: 400 })
    }

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { success: false, error: `Maximum ${MAX_FILES} files allowed` },
        { status: 400 },
      )
    }

    // Validate all files before uploading
    for (const file of files) {
      if (!(file.type in EXT_BY_TYPE)) {
        return NextResponse.json(
          { success: false, error: `Invalid file type: ${file.type}. Accepted: JPG, PNG, WEBP` },
          { status: 400 },
        )
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            success: false,
            error: `File "${file.name}" exceeds ${MAX_FILE_SIZE / 1024 / 1024} MB limit`,
          },
          { status: 400 },
        )
      }
    }

    // Upload each file to Supabase Storage
    const timestamp = Date.now()
    const uploadResults: { url: string; path: string }[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      // Derive extension from the validated MIME type — never trust file.name.
      const ext = EXT_BY_TYPE[file.type]
      const safeName = `${timestamp}-${i}.${ext}`
      const storagePath = buildStorageUploadPath(storageFolder, safeName)

      const arrayBuffer = await file.arrayBuffer()
      const buffer = new Uint8Array(arrayBuffer)

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(storagePath, buffer, {
          contentType: file.type,
          upsert: false,
        })

      if (uploadError) {
        console.error(`[Upload] Failed for ${safeName}:`, uploadError)
        return NextResponse.json(
          { success: false, error: `Upload failed: ${uploadError.message}` },
          { status: 500 },
        )
      }

      // Get public URL
      const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath)

      uploadResults.push({
        url: urlData.publicUrl,
        path: storagePath,
      })
    }

    return NextResponse.json({
      success: true,
      urls: uploadResults.map((r) => r.url),
    })
  } catch (err) {
    console.error("[Upload] Error:", err)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
