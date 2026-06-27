/**
 * Homepage-specific content (Rev.04): bilingual hero + services cards.
 * แสดงไทย+อังกฤษพร้อมกัน (ไม่มีปุ่มสลับภาษา)
 */

export const HERO = {
  h1Th: "บ้านไออุ่น: ครบจบเรื่องอสังหาฯ ในไทย ซื้อ-ขาย-เช่า ง่าย สะดวก ปลอดภัย",
  h1En: "Baan Ai Oun: Your All-in-One Thai Real Estate Partner – Buy, Sell, Rent, Stress-Free.",
  subTh: "เปลี่ยนเรื่องอสังหาฯ ให้เป็นเรื่องง่าย ด้วยบริการมืออาชีพเพื่อคนไทยและต่างชาติ",
  subEn:
    "Simplifying Thai real estate with expert, personalized service for local and international clients.",
  // ปุ่มทั้งสองลิงก์ไปฟอร์มติดต่อเดียวกัน (/contact) — ไม่เชื่อม WhatsApp/LINE
  ctaThai: { th: "สำหรับคนไทย คลิกที่นี่", en: "Thai Users", href: "/contact" },
  ctaIntl: { label: "For International Clients Click Here", href: "/contact" },
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
    solutionTh: "การตลาดครบวงจร ปิดดีลไว ปลอดภัย 100%",
    solutionEn: "Full-service marketing, fast-closing, and secure transactions.",
    ctaTh: "ฝากขาย/ปล่อยเช่า",
    ctaEn: "List Your Property",
    href: "/owners",
  },
  {
    icon: "Search",
    color: "#2E75B6",
    titleTh: "สำหรับผู้ซื้อ-เช่า",
    titleEn: "Buyers & Renters",
    painTh: "หาบ้านไม่เจอ? กู้ผ่านยาก? สับสนเรื่องสัญญา?",
    painEn: "Can't find the right home? Loan rejection or legal concerns?",
    solutionTh: "คัดทรัพย์ตรงโจทย์ ดูแลสินเชื่อและสัญญา จบที่เดียว",
    solutionEn:
      "Curated property matching, expert loan assistance, and seamless contract handling.",
    ctaTh: "ค้นหาบ้าน/ปรึกษาสินเชื่อ",
    ctaEn: "Find Your Home",
    href: "/buy",
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
    ctaEn: "",
    href: "/co-agent",
  },
  {
    icon: "GraduationCap",
    color: "#7C3AED",
    titleTh: "สำหรับว่าที่นายหน้ามือใหม่",
    titleEn: "Aspiring Agents",
    painTh: "อยากมีรายได้เพิ่ม ไม่มีประสบการณ์/ไม่มีทุน?",
    painEn: "Want extra income, but no experience or capital?",
    solutionTh: "คอร์ส “จับมือทำ” จากศูนย์ เริ่มต้นได้ทันที",
    solutionEn: "Take our 'hands-on' agent course! Start from zero.",
    ctaTh: "สมัครคอร์สนายหน้า",
    ctaEn: "",
    href: "/academy",
  },
] as const
export const HOMEPAGE_SERVICES = [
  {
    icon: "Home" as const,
    title: "ฝากขาย / ปล่อยเช่า",
    description:
      "หมดกังวลเรื่องหาคนซื้อหรือคนเช่า เราช่วยดูแลตั้งแต่ประเมินราคา ทำการตลาด จนปิดดีล",
    href: "/owners",
    color: "#D4A843",
    target: "เจ้าของทรัพย์",
  },
  {
    icon: "Search" as const,
    title: "หาบ้าน / ที่ดิน",
    description: "บอกสเปกและงบ เราช่วยจัดหาให้ตรงใจ พร้อมช่วยกู้สินเชื่อฟรี!",
    href: "/buy",
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
    href: "/academy",
    color: "#E85D75",
    target: "ผู้สนใจอาชีพนายหน้า",
  },
]

export const HOMEPAGE_PAIN_POINTS = [
  {
    target: "เจ้าของทรัพย์",
    pain: "ประกาศขาย/เช่ามานาน แต่ยังไม่จบดีล?",
    solution: "ให้เราช่วยดูแลจนปิดดีล",
    href: "/owners",
  },
  {
    target: "คนหาบ้าน/ที่ดิน",
    pain: "หาบ้านที่ใช่ในงบที่มีไม่ได้สักที?",
    solution: "บอกสเปก เราช่วยหาให้ + กู้ฟรี",
    href: "/buy",
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
    href: "/academy",
  },
]
