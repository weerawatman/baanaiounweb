/**
 * Homepage-specific content (Rev.04): bilingual hero + services cards.
 * แสดงไทย+อังกฤษพร้อมกัน (ไม่มีปุ่มสลับภาษา)
 */

export const HERO = {
  h1Th: "คัดสรรและดูแลทรัพย์โดยทีมนักลงทุนและผู้เชี่ยวชาญตัวจริง",
  h1En: "Curated and managed by real estate investors and local experts.",
  subTh:
    "บ้านไออุ่นช่วยเจ้าของทรัพย์ ผู้ซื้อ-เช่า และเครือข่ายนายหน้า ด้วยบริการครบวงจรในทำเลศักยภาพ: กรุงเทพฯ, สมุทรปราการ, EEC, ฉะเชิงเทรา, ชลบุรี, พัทยา, ศรีราชา, บ้านบึง และโซนนิคมอุตสาหกรรมหลัก",
  subEn:
    "Baan Ai Oun supports owners, buyers, renters, and co-agents across prime locations: Bangkok, Samut Prakan, EEC, Chachoengsao, Chonburi, Pattaya, Sriracha, Ban Bueng, and major industrial zones.",
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
    painTh: "ขาย/ปล่อยเช่าไม่ออก? ปวดหัวเรื่องเอกสาร? กลัวถูกโกง?",
    painEn: "Struggling to sell/rent? Worried about paperwork and legal scams?",
    solutionTh: "ประเมินศักยภาพทรัพย์ฟรี โดยทีมนักลงทุนตัวจริง — การตลาดครบวงจรจนปิดดีล",
    solutionEn: "Free investor-led property assessment plus full-service marketing until closing.",
    ctaTh: "ฝากขาย/ปล่อยเช่า",
    ctaEn: "List Your Property",
    href: "/request?tab=list-property",
  },
  {
    icon: "Search",
    color: "#2E75B6",
    titleTh: "สำหรับผู้ซื้อ-เช่า",
    titleEn: "Buyers & Renters",
    painTh: "หาบ้านไม่เจอ? กู้ผ่านยาก? สับสนเรื่องสัญญา?",
    painEn: "Can't find the right home? Loan rejection or legal concerns?",
    solutionTh:
      "คัดสรรบ้านทำเลทอง และทรัพย์รีโนเวทสภาพพร้อมอยู่ ผ่านการตรวจสอบโครงสร้างแล้ว",
    solutionEn:
      "Curated prime-location homes and move-in-ready renovated properties, structurally vetted.",
    ctaTh: "ค้นหาทรัพย์ที่ใช่",
    ctaEn: "Find Your Perfect Match",
    href: "/find-property",
  },
  {
    icon: "Users",
    color: "#1B7A52",
    titleTh: "สำหรับเพื่อนๆ นายหน้า",
    titleEn: "Co-Agents",
    painTh: "มีทรัพย์แต่หาลูกค้าไม่ได้? กังวลค่าการตลาด?",
    painEn: "Have listings but no clients? Worried about marketing costs?",
    solutionTh: "ฝากทรัพย์ฟรี! เราช่วยทำการตลาดจนกว่าจะปิดดีลได้",
    solutionEn: "We market your listings for free until closed!",
    ctaTh: "ร่วมเป็น Co-Agent",
    ctaEn: "Join as a Co-Agent",
    href: "/request?tab=co-agent",
  },
  {
    icon: "GraduationCap",
    color: "#7C3AED",
    titleTh: "สำหรับว่าที่นายหน้ามือใหม่",
    titleEn: "Aspiring Agents",
    painTh: "อยากมีรายได้เพิ่ม ไม่มีประสบการณ์/ไม่มีทุน?",
    painEn: "Want extra income, but no experience or capital?",
    solutionTh: "คอร์ส “จับมือทำ” ถ่ายทอดเคล็ดลับจากผู้แต่งหนังสือและนักลงทุนตัวจริง",
    solutionEn: "Hands-on course led by practicing investors and published authors.",
    ctaTh: "สมัครคอร์สนายหน้า",
    ctaEn: "Join Our Agent Course",
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
