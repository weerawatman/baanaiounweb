/**
 * Shared form field options and privacy notice used across all forms.
 * Bilingual TH/EN options for Rev.00 implementation
 */

export const PROPERTY_TYPE_OPTIONS = [
  { value: "house", label: "บ้านเดี่ยว | House", labelTh: "บ้านเดี่ยว", labelEn: "House" },
  { value: "townhome", label: "ทาวน์โฮม | Townhome", labelTh: "ทาวน์โฮม", labelEn: "Townhome" },
  { value: "condo", label: "คอนโด | Condo", labelTh: "คอนโด", labelEn: "Condo" },
  { value: "land", label: "ที่ดิน | Land", labelTh: "ที่ดิน", labelEn: "Land" },
  { value: "commercial", label: "อาคารพาณิชย์ | Commercial", labelTh: "อาคารพาณิชย์", labelEn: "Commercial" },
  { value: "other", label: "อื่นๆ | Other", labelTh: "อื่นๆ", labelEn: "Other" },
]

/**
 * Property types for the /request service-request forms (per owner's spec):
 * บ้านเดี่ยว, บ้านแฝด, ทาวน์โฮม, คอนโด, ที่ดิน
 */
export const REQUEST_PROPERTY_TYPE_OPTIONS = [
  { value: "house", label: "บ้านเดี่ยว | Single House", labelTh: "บ้านเดี่ยว", labelEn: "Single House" },
  { value: "twin-house", label: "บ้านแฝด | Twin House", labelTh: "บ้านแฝด", labelEn: "Twin House" },
  { value: "townhome", label: "ทาวน์โฮม | Townhome", labelTh: "ทาวน์โฮม", labelEn: "Townhome" },
  { value: "condo", label: "คอนโด | Condo", labelTh: "คอนโด", labelEn: "Condo" },
  { value: "land", label: "ที่ดิน | Land", labelTh: "ที่ดิน", labelEn: "Land" },
]

export const OWNER_PURPOSE_OPTIONS = [
  { value: "sale", label: "ฝากขาย | For Sale", labelTh: "ฝากขาย", labelEn: "For Sale" },
  { value: "rent", label: "ฝากปล่อยเช่า | For Rent", labelTh: "ฝากปล่อยเช่า", labelEn: "For Rent" },
]

export const BUYER_REQUIREMENT_OPTIONS = [
  { value: "buy", label: "ซื้อ | Buy", labelTh: "ซื้อ", labelEn: "Buy" },
  { value: "rent", label: "เช่า | Rent", labelTh: "เช่า", labelEn: "Rent" },
  { value: "loan", label: "ปรึกษาสินเชื่อ | Loan Consultation", labelTh: "ปรึกษาสินเชื่อ", labelEn: "Loan Consultation" },
]

export const BUYER_PURPOSE_OPTIONS = [
  { value: "living", label: "เพื่ออยู่อาศัย | For Living", labelTh: "เพื่ออยู่อาศัย", labelEn: "For Living" },
  { value: "investment", label: "เพื่อการลงทุน | For Investment", labelTh: "เพื่อการลงทุน", labelEn: "For Investment" },
]

export const LOCATION_OPTIONS = [
  { value: "chonburi", label: "ชลบุรี | Chonburi", labelTh: "ชลบุรี", labelEn: "Chonburi" },
  { value: "banbung", label: "บ้านบึง | Banbung", labelTh: "บ้านบึง", labelEn: "Banbung" },
  { value: "sriracha", label: "ศรีราชา | Sriracha", labelTh: "ศรีราชา", labelEn: "Sriracha" },
  { value: "pattaya", label: "พัทยา | Pattaya", labelTh: "พัทยา", labelEn: "Pattaya" },
  { value: "amata", label: "อมตะ | Amata", labelTh: "อมตะ", labelEn: "Amata" },
  { value: "laemchabang", label: "แหลมฉบัง | Laemchabang", labelTh: "แหลมฉบัง", labelEn: "Laemchabang" },
  { value: "other", label: "อื่นๆ | Other", labelTh: "อื่นๆ", labelEn: "Other" },
]

export const REGION_OPTIONS = [
  { value: "east", label: "ภาคตะวันออก | Eastern", labelTh: "ภาคตะวันออก", labelEn: "Eastern Region" },
  { value: "central", label: "ภาคกลาง | Central", labelTh: "ภาคกลาง", labelEn: "Central Region" },
  { value: "northeast", label: "ภาคตะวันออกเฉียงเหนือ | Northeastern", labelTh: "ภาคตะวันออกเฉียงเหนือ", labelEn: "Northeastern Region" },
  { value: "north", label: "ภาคเหนือ | Northern", labelTh: "ภาคเหนือ", labelEn: "Northern Region" },
  { value: "south", label: "ภาคใต้ | Southern", labelTh: "ภาคใต้", labelEn: "Southern Region" },
]

export const FORM_PRIVACY_NOTICE = {
  th: "ข้อมูลของคุณจะถูกเก็บเป็นความลับสูงสุด ทีมงานบ้านไออุ่นจะรีบติดต่อกลับโดยเร็วที่สุดค่ะ",
  en: "Your information is kept strictly confidential. Our team will contact you as soon as possible."
}

export const COAGENT_RIGHTS_NOTICE = {
  th: "เราเคารพสิทธิ์การดูแลทรัพย์ของคุณ ข้อมูลใช้เพื่อ Co-Broke เท่านั้น",
  en: "We respect your listing rights. This information is used for Co-Broke purposes only."
}
