import { NextRequest, NextResponse } from "next/server"
import { createServerSupabase } from "@/lib/supabase"

// ─── Config ──────────────────────────────────────────────────────────────

const MAX_FILES = 5
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const ACCEPTED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"])
const BUCKET = "property-images"

// ─── POST Handler ────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabase()

    if (!supabase) {
      return NextResponse.json(
        { success: false, error: "Storage not configured" },
        { status: 503 }
      )
    }

    const formData = await request.formData()
    const files = formData.getAll("files") as File[]

    if (!files.length) {
      return NextResponse.json(
        { success: false, error: "No files provided" },
        { status: 400 }
      )
    }

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { success: false, error: `Maximum ${MAX_FILES} files allowed` },
        { status: 400 }
      )
    }

    // Validate all files before uploading
    for (const file of files) {
      if (!ACCEPTED_TYPES.has(file.type)) {
        return NextResponse.json(
          { success: false, error: `Invalid file type: ${file.type}. Accepted: JPG, PNG, WEBP` },
          { status: 400 }
        )
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { success: false, error: `File "${file.name}" exceeds ${MAX_FILE_SIZE / 1024 / 1024} MB limit` },
          { status: 400 }
        )
      }
    }

    // Upload each file to Supabase Storage
    const timestamp = Date.now()
    const uploadResults: { url: string; path: string }[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg"
      const safeName = `${timestamp}-${i}.${ext}`
      const storagePath = `uploads/${safeName}`

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
          { status: 500 }
        )
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(storagePath)

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
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}
