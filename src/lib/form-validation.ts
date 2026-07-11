/**
 * Client-side form validation rules for Baan Ai Oun forms (Rev.00 bilingual).
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

const THAI_PHONE = /^0[1-9]\d{7,8}$/ // 09xxxxxxxx or 0xxxxxxxxX
const _PHONE_LOOSE = /^[\d+\-\s()]{8,15}$/ // international / any format (reserved)
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Shared schema for the /request service-request forms (3 tabs).
 * phone accepts Thai numbers OR WhatsApp/LINE IDs, so no strict pattern —
 * just a minimum length. Email is required (unlike the legacy forms).
 */
const SERVICE_REQUEST_SCHEMA: ValidationSchema = {
  name: { required: true, minLength: 2 },
  phone: { required: true, minLength: 3 },
  email: {
    required: true,
    pattern: EMAIL,
    patternMessage: "Please enter a valid email address | กรุณากรอกอีเมลให้ถูกต้อง",
  },
  propertyType: { required: true },
  location: { required: true, minLength: 2 },
}

// ─── Schemas per form variant + tab ─────────────────────────────────────

const SCHEMAS: Record<string, ValidationSchema> = {
  // Owner — Thai (list-property)
  owner: {
    name: { required: true, minLength: 2 },
    phone: {
      required: true,
      pattern: THAI_PHONE,
      patternMessage: "Please enter a valid phone number (e.g., 0812345678) | กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (เช่น 0812345678)",
    },
    propertyType: { required: true },
    purpose: { required: true },
  },
  // Owner — Foreign
  "owner-foreign": {
    name: { required: true, minLength: 2 },
    contact: { required: true, minLength: 3 },
    propertyType: { required: true },
    purpose: { required: true },
  },
  // Buyer — Thai (find-property)
  buyer: {
    name: { required: true, minLength: 2 },
    phone: {
      required: true,
      pattern: THAI_PHONE,
      patternMessage: "Please enter a valid phone number (e.g., 0812345678) | กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (เช่น 0812345678)",
    },
    requirement: { required: true },
    propertyType: { required: true },
  },
  // Buyer — Foreign
  "buyer-foreign": {
    name: { required: true, minLength: 2 },
    contact: { required: true, minLength: 3 },
    requirement: { required: true },
    propertyType: { required: true },
  },
  // Co-Agent
  "co-agent": {
    name: { required: true, minLength: 2 },
    phone: {
      required: true,
      pattern: THAI_PHONE,
      patternMessage: "Please enter a valid phone number (e.g., 0812345678) | กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (เช่น 0812345678)",
    },
    lineId: { required: true },
    propertyType: { required: true },
  },
  // Academy (agent-course)
  academy: {
    name: { required: true, minLength: 2 },
    phone: {
      required: true,
      pattern: THAI_PHONE,
      patternMessage: "Please enter a valid phone number (e.g., 0812345678) | กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (เช่น 0812345678)",
    },
    lineId: { required: true },
    occupation: { required: true },
  },
  // Contact page
  contact: {
    name: { required: true, minLength: 2 },
  },
  // /request page — 3 tabs, same structure
  "request-list-property": {
    ...SERVICE_REQUEST_SCHEMA,
    listingPurpose: { required: true },
  },
  "request-matchmaking": SERVICE_REQUEST_SCHEMA,
  "request-co-agent": SERVICE_REQUEST_SCHEMA,
}

// ─── Field labels (bilingual for error messages) ─────────────────────────

const FIELD_LABELS: Record<string, { th: string; en: string }> = {
  name: { th: "ชื่อ-นามสกุล", en: "Full Name" },
  phone: { th: "เบอร์โทรศัพท์", en: "Phone Number" },
  email: { th: "อีเมล", en: "Email" },
  contact: { th: "ช่องทางติดต่อ", en: "Contact Information" },
  propertyType: { th: "ประเภททรัพย์", en: "Property Type" },
  requirement: { th: "ความต้องการ", en: "Requirement" },
  purpose: { th: "จุดประสงค์", en: "Purpose" },
  lineId: { th: "LINE ID", en: "LINE ID" },
  location: { th: "ทำเลที่ตั้ง", en: "Location" },
  listingPurpose: { th: "ความต้องการ", en: "Listing Type" },
  price: { th: "ราคา", en: "Price" },
  budget: { th: "งบประมาณ", en: "Budget" },
  occupation: { th: "อาชีพปัจจุบัน", en: "Current Occupation" },
  goal: { th: "เป้าหมายที่อยากได้", en: "Your Goal" },
  commission: { th: "เงื่อนไขคอมมิชชัน", en: "Commission Terms" },
}

// ─── Validate function ───────────────────────────────────────────────────

export function validateForm(
  formTag: string,
  data: Record<string, string>,
): { valid: true } | { valid: false; errors: FieldErrors } {
  const schema = SCHEMAS[formTag]
  if (!schema) return { valid: true }

  const errors: FieldErrors = {}

  for (const [field, rule] of Object.entries(schema)) {
    const value = (data[field] ?? "").trim()

    if (rule.required && !value) {
      const label = FIELD_LABELS[field] ?? { th: field, en: field }
      errors[field] = `Please enter ${label.en} | กรุณากรอก${label.th}`
      continue
    }

    if (value && rule.minLength && value.length < rule.minLength) {
      const label = FIELD_LABELS[field] ?? { th: field, en: field }
      errors[field] = `${label.en} must be at least ${rule.minLength} characters | ${label.th}ต้องมีอย่างน้อย ${rule.minLength} ตัวอักษร`
      continue
    }

    if (value && rule.pattern && !rule.pattern.test(value.replace(/[\s-]/g, ""))) {
      errors[field] = rule.patternMessage ?? `Invalid ${FIELD_LABELS[field]?.en ?? field} format | รูปแบบ${FIELD_LABELS[field]?.th ?? field}ไม่ถูกต้อง`
    }
  }

  return Object.keys(errors).length === 0 ? { valid: true } : { valid: false, errors }
}

// ─── Sanitize phone for display ──────────────────────────────────────────

export function formatThaiPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "")
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  return phone
}

/** Map contact-page subject values to valid form_submissions.form_tag values. */
export function mapContactSubjectToFormTag(subject: string): string {
  switch (subject) {
    case "buy":
      return "buyer"
    case "sell":
      return "owner"
    case "loan":
      return "buyer"
    case "co-agent":
      return "co-agent"
    default:
      return "contact"
  }
}
