import type { Property } from "@/types"

/** คั่นหลักพันตามรูปแบบไทย เช่น 1990000 → "1,990,000" */
export function formatNumber(value: number): string {
  return value.toLocaleString("th-TH")
}

/**
 * สร้าง slug จากข้อความ (รองรับภาษาไทย)
 * เช่น "ขายด่วน บ้านแฝด 34 ตรว." → "ขายด่วน-บ้านแฝด-34-ตรว"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
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
