/**
 * Homepage-specific content (Rev.04): bilingual hero + services cards.
 * แสดงไทย+อังกฤษพร้อมกัน (ไม่มีปุ่มสลับภาษา)
 */

export const HERO = {
  h1Th: "คัดสรรและดูแลทรัพย์โดยทีมนักลงทุนและผู้เชี่ยวชาญตัวจริง",
  h1En: "Curated and managed by real estate investors and local experts.",
  subTh: "บ้านไออุ่นช่วยเจ้าของทรัพย์ ผู้ซื้อ-เช่า และเครือข่ายนายหน้า ด้วยบริการครบวงจร",
  subEn: "Full-service real estate support for owners, buyers, renters, and co-agents.",
  ctaThai: { th: "ฝากขาย/ปล่อยเช่า", en: "List Your Property", href: "/request?tab=list-property" },
  ctaIntl: {
    th: "ค้นหาทรัพย์ที่ใช่",
    en: "Find Your Perfect Match",
    href: "/find-property",
  },
} as const

export const ECOSYSTEM_BAND = {
  title: {
    th: "เติบโตไปด้วยกันกับครอบครัวบ้านไออุ่น",
    en: "Join Our Ecosystem",
  },
  body: {
    th: "อยากเป็นนายหน้าอสังหาฯ แต่ไม่มีทุน ไม่รู้จะเริ่มอย่างไร? บ้านไออุ่นเปิดโอกาสให้เรียนรู้แบบจับมือทำ พร้อมเข้าร่วมเครือข่าย Co-Agent และคอร์สนายหน้าที่ถ่ายทอดจากนักลงทุนและผู้เชี่ยวชาญตัวจริง",
    en: "Want to build a real estate career without heavy capital? Learn hands-on with our team, join the Co-Agent network, or start with our agent course led by practicing investors and experts.",
  },
  primary: {
    label: { th: "ร่วมเป็น Co-Agent", en: "Join as Co-Agent" },
    href: "/request?tab=co-agent",
  },
  secondary: {
    label: { th: "สมัครคอร์สนายหน้า", en: "Agent Course" },
    href: "/agent-course",
  },
} as const

export const SERVICES_HEADING = {
  th: "บริการของเรา",
  en: "Our Services & Solutions",
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
    titleTh: "สำหรับเพื่อนๆ นายหน้า",
    titleEn: "Co-Agents",
    descTh: "ฝากทรัพย์ฟรี เราช่วยทำการตลาดจนกว่าจะปิดดีล",
    descEn: "List with us free — we market until the deal closes.",
    href: "/request?tab=co-agent",
  },
  {
    icon: "GraduationCap",
    color: "#7C3AED",
    titleTh: "สำหรับว่าที่นายหน้ามือใหม่",
    titleEn: "Aspiring Agents",
    descTh: "คอร์สจับมือทำ ถ่ายทอดจากนักลงทุนและผู้เชี่ยวชาญตัวจริง",
    descEn: "Hands-on agent course led by practicing investors.",
    href: "/agent-course",
  },
] as const
export const HOMEPAGE_SERVICES = [
  {
    icon: "Home" as const,
    title: "ฝากขาย / ปล่อยเช่า",
    description:
      "หมดกังวลเรื่องหาคนซื้อหรือคนเช่า เราช่วยดูแลตั้งแต่ประเมินราคา ทำการตลาด จนปิดดีล",
    href: "/list-property",
    color: "#D4A843",
    target: "เจ้าของทรัพย์",
  },
  {
    icon: "Search" as const,
    title: "หาบ้าน / ที่ดิน",
    description: "บอกสเปกและงบ เราช่วยจัดหาให้ตรงใจ พร้อมช่วยกู้สินเชื่อฟรี!",
    href: "/find-property",
    color: "#1B4D3E",
    target: "ผู้ที่กำลังหาซื้อ/เช่า",
  },
  {
    icon: "Users" as const,
    title: "Co-Agent เครือข่ายนายหน้า",
    description: "ฝากทรัพย์เข้าระบบฟรี! ช่วยทำการตลาด คัดกรองลูกค้า วิน-วิน ทุกฝ่าย",
    href: "/co-agent",
    color: "#2E75B6",
    target: "นายหน้า/เอเจนต์",
  },
  {
    icon: "GraduationCap" as const,
    title: "สร้างรายได้กับอสังหาฯ",
    description: "คอร์สสอนทำจริง จับมือทำ ไม่ต้องใช้ทุน เปลี่ยนความกลัวเป็นรายได้",
    href: "/agent-course",
    color: "#E85D75",
    target: "ผู้สนใจอาชีพนายหน้า",
  },
]

export const HOMEPAGE_PAIN_POINTS = [
  {
    target: "เจ้าของทรัพย์",
    pain: "ประกาศขาย/เช่ามานาน แต่ยังไม่จบดีล?",
    solution: "ให้เราช่วยดูแลจนปิดดีล",
    href: "/list-property",
  },
  {
    target: "คนหาบ้าน/ที่ดิน",
    pain: "หาบ้านที่ใช่ในงบที่มีไม่ได้สักที?",
    solution: "บอกสเปก เราช่วยหาให้ + กู้ฟรี",
    href: "/find-property",
  },
  {
    target: "นายหน้า/เอเจนต์",
    pain: "มีทรัพย์แต่ปิดขายไม่ได้?",
    solution: "ฝากเข้าระบบฟรี ช่วยทำตลาด",
    href: "/co-agent",
  },
  {
    target: "อยากมีรายได้เสริม",
    pain: "ไม่มีทุน ไม่รู้เริ่มยังไง?",
    solution: "เรียนจริง ทำจริง ไม่ต้องใช้ทุน",
    href: "/agent-course",
  },
]
