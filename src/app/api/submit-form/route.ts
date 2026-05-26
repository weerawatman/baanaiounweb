import { NextRequest, NextResponse } from "next/server"
import { createServerSupabase } from "@/lib/supabase"
import { sendLineNotify } from "@/lib/line-notify"

// ─── Types ───────────────────────────────────────────────────────────────

interface FormSubmission {
  formTag: string       // owner | owner-foreign | buyer | buyer-foreign | co-agent | academy
  name: string
  phone?: string
  lineId?: string
  email?: string
  contact?: string      // for foreign users (WhatsApp, WeChat, etc.)
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
  preselect?: string    // SALE | RENT | LAND
}

// ─── Validation ──────────────────────────────────────────────────────────

function validateSubmission(data: unknown): { valid: true; parsed: FormSubmission } | { valid: false; error: string } {
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
    return { valid: false, error: "At least one contact method is required (phone, lineId, email, or contact)" }
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
    },
  }
}

// ─── POST Handler ────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = validateSubmission(body)

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      )
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

    // 2) Send LINE Notify
    let lineSuccess = false
    try {
      lineSuccess = await sendLineNotify({
        formTag: data.formTag,
        name: data.name,
        contact: contactInfo,
        details: {
          ...(data.propertyType ? { ประเภททรัพย์: data.propertyType } : {}),
          ...(data.propertySize ? { ขนาดพื้นที่: data.propertySize } : {}),
          ...(data.location ? { ที่ตั้ง: data.location } : {}),
          ...(data.price ? { ราคา: `${data.price} บาท` } : {}),
          ...(data.budget ? { งบประมาณ: `${data.budget} บาท` } : {}),
          ...(data.requirement ? { ความต้องการ: data.requirement } : {}),
          ...(data.purpose ? { วัตถุประสงค์: data.purpose } : {}),
          ...(data.details ? { รายละเอียดเพิ่มเติม: data.details } : {}),
        },
      })
    } catch (err) {
      console.error("[LINE Notify] Error:", err)
    }

    return NextResponse.json({
      success: true,
      saved: dbSuccess,
      notified: lineSuccess,
    })
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}
