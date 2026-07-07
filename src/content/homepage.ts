/**
 * Homepage-specific content (Rev.04): bilingual hero + services cards.
 * แสดงไทย+อังกฤษพร้อมกัน (ไม่มีปุ่มสลับภาษา)
 */

export const HERO = {
  h1Th: "ครบจบเรื่องอสังหาฯ ซื้อ-ขาย-เช่า ง่าย สะดวก ปลอดภัย",
  h1Th2: "พร้อมดูแลด้วยใจเพื่อคนไทยและต่างชาติ",
  h1En: "Your All-in-One Real Estate Partner — Buy, Sell, Rent, Stress-Free.",
  h1En2: "Caring service for both Thai and international clients.",
  ctaThai: { th: "ฝากขาย/ปล่อยเช่า", en: "List Your Property", href: "/request?tab=list-property" },
  ctaIntl: {
    th: "ค้นหาทรัพย์ที่ใช่",
    en: "Find Your Perfect Match",
    href: "/find-property",
  },
} as const

export const SERVICES_HEADING = {
  th: "บริการของเรา",
  en: "Our Services",
} as const

export const SERVICE_CARDS = [
  {
    icon: "Home",
    color: "#E8833A",
    titleTh: "สำหรับเจ้าของทรัพย์",
    titleEn: "Property Owners",
    descTh: "ประเมินศักยภาพทรัพย์ฟรี และการตลาดครบวงจรจนปิดดีล",
    descEn: "Free investor-led assessment and full-service marketing until closing.",
    href: "/request?tab=list-property",
  },
  {
    icon: "Search",
    color: "#2E75B6",
    titleTh: "สำหรับผู้ซื้อ-เช่า",
    titleEn: "Buyers & Renters",
    descTh: "คัดสรรทรัพย์ทำเลทองและรีโนเวทพร้อมอยู่ ดูแลสินเชื่อฟรี",
    descEn: "Curated homes and free loan guidance through closing.",
    href: "/find-property",
  },
  {
    icon: "Users",
    color: "#1B7A52",
    titleTh: "เครือข่าย Co-Agent",
    titleEn: "Co-Agent Network",
    descTh: "ฝากทรัพย์ฟรี เราช่วยทำการตลาดจนกว่าจะปิดดีล",
    descEn: "List with us free — we market until the deal closes.",
    href: "/request?tab=co-agent",
  },
  {
    icon: "GraduationCap",
    color: "#7C3AED",
    titleTh: "คอร์สนายหน้าอสังหาฯ",
    titleEn: "Real Estate Course",
    descTh: "คอร์สจับมือทำ ถ่ายทอดจากนักลงทุนและผู้เชี่ยวชาญตัวจริง",
    descEn: "Hands-on course taught by real investors and experts.",
    href: "/agent-course",
  },
] as const
