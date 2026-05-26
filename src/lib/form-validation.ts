/**
 * Client-side form validation rules for Baan Ai Oun forms.
 *
 * Each form variant defines which fields are required and
 * optional validation patterns (phone, email format, etc.).
 */

// ─── Types ───────────────────────────────────────────────────────────────

export type FieldErrors = Record<string, string>

interface ValidationRule {
  required?: boolean
  minLength?: number
  pattern?: RegExp
  patternMessage?: string
}

type ValidationSchema = Record<string, ValidationRule>

// ─── Thai phone number ───────────────────────────────────────────────────

const THAI_PHONE = /^0[1-9]\d{7,8}$/          // 09xxxxxxxx or 0xxxxxxxxX
const PHONE_LOOSE = /^[\d+\-\s()]{8,15}$/     // international / any format

// ─── Schemas per form variant + tab ─────────────────────────────────────

const SCHEMAS: Record<string, ValidationSchema> = {
  // Owner — Thai
  owner: {
    name: { required: true, minLength: 2 },
    phone: { required: true, pattern: THAI_PHONE, patternMessage: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (เช่น 0812345678)" },
    propertyType: { required: true },
  },
  // Owner — Foreign
  "owner-foreign": {
    name: { required: true, minLength: 2 },
    contact: { required: true, minLength: 3 },
  },
  // Buyer — Thai
  buyer: {
    name: { required: true, minLength: 2 },
    phone: { required: true, pattern: THAI_PHONE, patternMessage: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (เช่น 0812345678)" },
    requirement: { required: true },
  },
  // Buyer — Foreign
  "buyer-foreign": {
    name: { required: true, minLength: 2 },
    contact: { required: true, minLength: 3 },
  },
  // Co-Agent
  "co-agent": {
    name: { required: true, minLength: 2 },
    phone: { required: true, pattern: THAI_PHONE, patternMessage: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (เช่น 0812345678)" },
  },
  // Academy
  academy: {
    name: { required: true, minLength: 2 },
    phone: { required: true, pattern: THAI_PHONE, patternMessage: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (เช่น 0812345678)" },
  },
}

// ─── Field labels (for error messages) ───────────────────────────────────

const FIELD_LABELS: Record<string, string> = {
  name: "ชื่อ-นามสกุล",
  phone: "เบอร์โทรศัพท์",
  contact: "ช่องทางติดต่อ",
  propertyType: "ประเภททรัพย์",
  requirement: "ประเภททรัพย์ที่ต้องการ",
  lineId: "ไอดีไลน์",
  location: "ที่ตั้ง",
  price: "ราคา",
  budget: "งบประมาณ",
}

// ─── Validate function ───────────────────────────────────────────────────

export function validateForm(
  formTag: string,
  data: Record<string, string>
): { valid: true } | { valid: false; errors: FieldErrors } {
  const schema = SCHEMAS[formTag]
  if (!schema) return { valid: true }

  const errors: FieldErrors = {}

  for (const [field, rule] of Object.entries(schema)) {
    const value = (data[field] ?? "").trim()

    if (rule.required && !value) {
      const label = FIELD_LABELS[field] ?? field
      errors[field] = `กรุณากรอก${label}`
      continue
    }

    if (value && rule.minLength && value.length < rule.minLength) {
      const label = FIELD_LABELS[field] ?? field
      errors[field] = `${label}ต้องมีอย่างน้อย ${rule.minLength} ตัวอักษร`
      continue
    }

    if (value && rule.pattern && !rule.pattern.test(value.replace(/[\s-]/g, ""))) {
      errors[field] = rule.patternMessage ?? `รูปแบบ${FIELD_LABELS[field] ?? field}ไม่ถูกต้อง`
    }
  }

  return Object.keys(errors).length === 0
    ? { valid: true }
    : { valid: false, errors }
}

// ─── Sanitize phone for display ──────────────────────────────────────────

export function formatThaiPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "")
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  return phone
}
