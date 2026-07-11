/**
 * Homepage-specific content (Rev.04): bilingual hero + services cards.
 * แสดงไทย+อังกฤษพร้อมกัน (ไม่มีปุ่มสลับภาษา)
 */

export const HERO = {
  h1Th: "ครบจบเรื่องอสังหาฯ ซื้อ-ขาย-เช่า",
  h1Th2: "ดูแลด้วยสายตานักลงทุน",
  h1En: "Your All-in-One Real Estate Partner",
  subTh: "ปิดดีลไว ได้ราคาที่ใช่ พร้อมทีมงานดูแลครบวงจรเพื่อคนไทยและต่างชาติ",
  subEn: "Expert services for buyers, sellers, and renters. Serving local and international clients.",
  ctaList: { th: "ฝากขาย / ปล่อยเช่า", en: "List Your Property", href: "/list-property" },
  ctaSearch: { th: "ค้นหาทรัพย์", en: "Search Properties", href: "/properties" },
} as const

export const SERVICES_HEADING = {
  th: "บริการของเรา",
  en: "Our Services",
  subtitleTh: "เราไม่ใช่แค่กระดานประกาศ แต่เราคือ \"พาร์ทเนอร์\" ที่เข้าใจคุณ",
  subtitleEn: "More than just listings, we are your real estate partners.",
} as const

export const SERVICE_CARDS = [
  {
    emoji: "🏠",
    icon: "Home",
    color: "#E8833A",
    titleTh: "สำหรับเจ้าของทรัพย์",
    titleEn: "Property Owners",
    descTh: "ประเมินศักยภาพทรัพย์ฟรี คัดกรองผู้ซื้อตัวจริง และทำการตลาดเชิงรุกจนปิดดีล",
    descEn: "Free property assessment and proactive full-service marketing until closed.",
    href: "/list-property",
    ctaTh: "ฝากทรัพย์ทันที",
    ctaEn: "List Property Now",
    secondaryHref: "/services",
  },
  {
    emoji: "🔍",
    icon: "Search",
    color: "#2E75B6",
    titleTh: "สำหรับผู้ซื้อ-เช่า",
    titleEn: "Buyers & Renters",
    descTh: "คัดสรรทรัพย์ทำเลทอง รีโนเวทพร้อมอยู่ พร้อมบริการดูแลด้านสินเชื่อให้ฟรี 100%",
    descEn: "Curated prime locations and renovated homes with free loan care.",
    href: "/find-property",
    ctaTh: "ให้เราหาให้ฟรี",
    ctaEn: "Find Property Free",
    secondaryHref: "/services",
  },
  {
    emoji: "🤝",
    icon: "Users",
    color: "#1B7A52",
    titleTh: "เครือข่าย Co-Agent",
    titleEn: "Co-Agent Network",
    descTh: "ขยายโอกาส ปิดดีลไว ฝากทรัพย์เข้าระบบฟรี เราช่วยดันการตลาด แบ่งคอมมิชชันโปร่งใส",
    descEn: "Expand your reach. Free listing with transparent commission splits.",
    href: "/co-agent",
    ctaTh: "ร่วมเครือข่าย",
    ctaEn: "Join Network",
    secondaryHref: "/services",
  },
  {
    emoji: "🎓",
    icon: "GraduationCap",
    color: "#7C3AED",
    titleTh: "คอร์สนายหน้าอสังหาฯ",
    titleEn: "Real Estate Course",
    descTh: "คอร์สเวิร์กชอปจับมือทำ ถ่ายทอดประสบการณ์จริงจากนักลงทุนและผู้เชี่ยวชาญตัวจริง",
    descEn: "Hands-on workshop taught by real investors and industry experts.",
    href: "/agent-course",
    ctaTh: "สมัครคอร์สเรียน",
    ctaEn: "Enroll Now",
    secondaryHref: "/services",
  },
] as const

export const HOME_WHY_CHOOSE = {
  heading: { th: "ทำไมต้องเลือก บ้านไออุ่น?", en: "Why Choose Us?" },
  pillars: [
    {
      icon: "👁️",
      titleTh: "คัดกรองด้วยสายตานักลงทุน",
      titleEn: "Investor's Eye Screening",
      descTh:
        "ทีมงานลงพื้นที่ตรวจเช็กโครงสร้างและประเมินความคุ้มค่าให้คุณก่อนเสมอ เพื่อให้มั่นใจว่าทรัพย์ทุกชิ้นมีคุณภาพสูงสุด",
      descEn:
        "Our team inspects structure and value on-site before every recommendation, ensuring top quality.",
    },
    {
      icon: "🌐",
      titleTh: "ระบบนิเวศที่มีชีวิต",
      titleEn: "Living Ecosystem",
      descTh:
        "ศูนย์รวมผู้ซื้อ ผู้ขาย และเครือข่าย Co-Agent ทั่วประเทศ ที่ทำงานร่วมกันอย่างมีชีวิตชีวา ช่วยเพิ่มโอกาสปิดดีลให้ไวขึ้น",
      descEn:
        "A nationwide network of buyers, sellers, and Co-Agents working together to close deals faster.",
    },
    {
      icon: "🛡️",
      titleTh: "ดูแลเอกสารและสินเชื่อฟรี",
      titleEn: "Free Paperwork & Loan Care",
      descTh:
        "บริการแบบ End-to-End ตั้งแต่หาสินเชื่อ ตรวจสัญญา จนถึงวันโอนกรรมสิทธิ์ โดยไม่มีค่าใช้จ่ายแอบแฝง",
      descEn:
        "End-to-end service from loans and contracts through transfer day — no hidden fees.",
    },
  ],
} as const
