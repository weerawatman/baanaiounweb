import type { Property } from "@/types"

/** คั่นหลักพันตามรูปแบบไทย เช่น 1990000 → "1,990,000" */
export function formatNumber(value: number): string {
  return value.toLocaleString("th-TH")
}

/**
 * สร้าง slug แบบ ASCII เท่านั้นจากข้อความ (a-z, 0-9, ขีด)
 * ตัดอักขระอื่นทั้งหมดทิ้ง (รวมภาษาไทย) โดยแทนที่อักขระที่ตัดทิ้งแต่ละช่วงด้วย
 * ขีดคั่นเดียว — ไม่ใช่การลบเฉยๆ — เพื่อไม่ให้ตัวเลข/คำที่อยู่คนละฝั่งของ
 * เครื่องหมายวรรคตอน (เช่น "10/1") ถูกเชื่อมติดกันเป็น "101" โดยไม่ได้ตั้งใจ
 * slug ต้องเป็น ASCII เสมอเพราะถูกใช้เป็นส่วนหนึ่งของ URL path และส่งให้
 * revalidatePath() ซึ่งอ่านค่าเป็น HTTP header (ByteString) ที่รับได้เฉพาะ
 * อักขระ Latin-1 — ใส่ภาษาไทยเข้าไปจะทำให้ error ทันที
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/** Short deterministic ASCII code from arbitrary text (same input → same output). */
function hashCode(text: string): string {
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) | 0
  }
  return Math.abs(hash).toString(36)
}

/**
 * สร้าง slug สำหรับใช้ auto-fill ในฟอร์ม — ถ้าข้อความต้นทาง (เช่น ชื่อภาษาไทยล้วน)
 * ไม่เหลือตัวอักษร a-z เลยหลัง slugify (อาจเหลือแค่ตัวเลขที่แทรกอยู่ เช่น "34" หรือ
 * "2" จากเลขชั้น/ซอย ซึ่งชื่อทรัพย์หลายรายการอาจมีร่วมกัน) จะแนบรหัสสำรองต่อท้าย
 * เพื่อกันชนกัน (คงที่ตามข้อความเดิม — พิมพ์ซ้ำได้ slug เดิม) ผู้ใช้ควรแก้เป็น
 * ชื่อที่อ่านง่ายกว่านี้เอง (เช่น กรอกชื่อภาษาอังกฤษ)
 */
export function slugifyWithFallback(text: string, fallbackPrefix = "property"): string {
  const slug = slugify(text)
  if (slug && /[a-z]/.test(slug)) return slug
  if (!text.trim()) return ""
  const suffix = hashCode(text)
  return slug ? `${fallbackPrefix}-${slug}-${suffix}` : `${fallbackPrefix}-${suffix}`
}

/**
 * แปลงราคาเป็นข้อความแสดงผล โดยคั่นหลักพันอัตโนมัติ
 *
 * กฎ:
 * - ถ้า priceLabel เป็นตัวเลขล้วน (เช่น "1990000" หรือ "1,990,000")
 *   → จัดรูปแบบให้ "1,990,000 บาท" (หรือ "... บาท/เดือน" กรณีเช่า)
 * - ถ้า priceLabel เป็นข้อความกำหนดเอง (เช่น "ตกลงกันได้", "8,000 บาท/เดือน")
 *   → ใช้ตามที่กรอกไว้
 * - ถ้า priceLabel ว่าง → จัดรูปแบบจาก price
 */
export function formatPrice(property: Pick<Property, "price" | "priceLabel" | "type">): string {
  const label = (property.priceLabel ?? "").trim()
  const unit = property.type === "RENT" ? " บาท/เดือน" : " บาท"

  if (label) {
    // ตัวเลขล้วน (อนุญาตให้มีจุลภาค/จุดทศนิยม/ช่องว่าง)
    const numeric = label.replace(/[,\s]/g, "")
    if (/^\d+(\.\d+)?$/.test(numeric)) {
      return formatNumber(Number(numeric)) + unit
    }
    return label
  }

  return formatNumber(Number(property.price ?? 0)) + unit
}
