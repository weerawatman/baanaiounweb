/**
 * Homepage-specific content (Rev.04): bilingual hero + services cards.
 * แสดงไทย+อังกฤษพร้อมกัน (ไม่มีปุ่มสลับภาษา)
 */

export const HERO = {
  h1Th: "ครบจบเรื่องอสังหาฯ ซื้อ-ขาย-เช่า ง่าย สะดวก ปลอดภัย",
  h1En: "Your All-in-One Thai Real Estate Partner – Buy, Sell, Rent, Stress-Free.",
  subTh:
    "ดูแลครบวงจรด้วยทีมงานมืออาชีพ พร้อมเจาะลึกทำเลศักยภาพ: กรุงเทพฯ, สมุทรปราการ, EEC, ฉะเชิงเทรา (นิคมฯ เวลโกรว์, ทีเอฟดี), ชลบุรี, พัทยา, ศรีราชา, บ้านบึง, บ่อทอง, หนองใหญ่ (นิคมฯ โรจนะ, WHA หนองใหญ่) และโซนนิคมอุตสาหกรรมหลัก (อมตะ 1-2,\nอีสเทิร์นซีบอร์ด)",
  subEn:
    "Expert, personalized service for local and international clients. Specializing in prime locations: Bangkok, Samut Prakan, EEC, Chachoengsao (Wellgrow & TFD Industrial Estates), Chonburi, Pattaya, Sriracha, Ban Bueng, Bo Thong, Nong Yai (Rojana & WHA Nong Yai), and major Industrial Zones (Amata 1 & 2,\nEastern Seaboard).", 
  // ปุ่มทั้งสองลิงก์ไปหน้าฟอร์มคำขอบริการ /request (แท็บตามบริการ)
  ctaThai: { th: "ฝากขาย/ปล่อยเช่า", en: "List Your Property", href: "/request?tab=list-property" },
  ctaIntl: {
    th: "บริการจัดหาทรัพย์ตามต้องการ",
    en: "Property Matchmaking Service",
    href: "/request?tab=matchmaking",
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
    solutionTh: "การตลาดครบวงจร ปิดดีลไว ปลอดภัย 100%",
    solutionEn: "Full-service marketing, fast-closing, and secure transactions.",
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
    solutionTh: "คัดทรัพย์ตรงโจทย์ ดูแลสินเชื่อและสัญญา จบที่เดียว",
    solutionEn:
      "Curated property matching, expert loan assistance, and seamless contract handling.",
    ctaTh: "บริการจัดหาทรัพย์ตามต้องการ",
    ctaEn: "Property Matchmaking Service",
    href: "/request?tab=matchmaking",
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
    solutionTh: "คอร์ส “จับมือทำ” จากศูนย์ เริ่มต้นได้ทันที",
    solutionEn: "Take our 'hands-on' agent course! Start from zero.",
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
