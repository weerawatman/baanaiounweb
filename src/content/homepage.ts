/**
 * Homepage-specific content: hero tabs, services grid, and pain-point cards.
 */

export const HERO_CONTENT = {
  th: {
    headline: "จบทุกความต้องการ\nเรื่องอสังหาฯ",
    tagline: "ไม่ต้องปวดหัวเรื่องอสังหาฯ อีกต่อไป! เรื่องยากเราเปลี่ยนให้เป็นเรื่องง่าย",
    tabs: [
      {
        label: "เจ้าของทรัพย์",
        icon: "🏠",
        pains: [
          "ปวดหัวกับการประกาศขาย/ปล่อยเช่าเอง ไม่รู้จะเริ่มยังไง",
          "กังวลว่าทรัพย์จะขายไม่ออก หรือหาคนเช่าไม่ได้",
          "วิตกเรื่องเอกสาร กฎหมาย และกลัวถูกโกง",
        ],
        solutions: [
          "เราทำการตลาดครบวงจร หาลูกค้าซื้อ-เช่าให้ จบไว!",
          "ดูแลเรื่องเอกสารและกฎหมายให้ทุกขั้นตอน",
          "ปรึกษาฟรี! ดูแลจนกว่าจะขายหรือปล่อยเช่าได้สำเร็จ",
        ],
        cta: { label: "ฝากขาย/เช่ากับเรา", href: "/owners" },
      },
      {
        label: "ซื้อ / เช่าบ้าน",
        icon: "🔍",
        pains: [
          "เหนื่อยกับการหาบ้าน คอนโด ที่ดินที่ใช่ในทำเลและราคาที่ชอบ",
          "ปวดหัวเรื่องเอกสาร สัญญา และขั้นตอนการยื่นกู้",
          "ไม่แน่ใจว่าราคาที่เห็นสมเหตุสมผลหรือเปล่า",
        ],
        solutions: [
          "บริการครบวงจร จัดหาบ้าน-คอนโด-ที่ดินตามทำเลและงบที่ต้องการ จบไว!",
          "คัดกรองทรัพย์ที่ตรงใจ พร้อมบริการปรึกษาสินเชื่อฟรี!",
          "ดูแลตั้งแต่ดูบ้าน ทำสัญญา จนถึงวันโอนกรรมสิทธิ์",
        ],
        cta: { label: "หาทรัพย์ที่ใช่", href: "/buy" },
      },
      {
        label: "อยากมีรายได้",
        icon: "💰",
        pains: [
          "อยากมีรายได้เสริมแต่ไม่รู้จะเริ่มต้นยังไง",
          "กลัวว่าเรื่องอสังหาฯ ยากเกินไปสำหรับมือใหม่",
          "ไม่มีทุน ไม่มีทรัพย์เป็นของตัวเอง",
        ],
        solutions: [
          "คอร์ส 'จับมือทำนายหน้าอสังหาฯ' เริ่มจากศูนย์ก็ทำได้จริง!",
          "หรือสมัครเป็น Co-Agent ฝากทรัพย์เข้าระบบฟรี ช่วยทำการตลาด",
          "ไม่ต้องใช้เงินลงทุน เริ่มได้ทันที",
        ],
        cta: { label: "เริ่มสร้างรายได้", href: "/academy" },
      },
    ],
  },
  en: {
    headline: "Worry-Free Thailand Real Estate Solutions",
    tagline: "Buying, Selling, Renting, or Letting? Baan Ai Oun offers one-stop, stress-free solutions for international clients.",
    tabs: [
      {
        label: "Property Owners",
        icon: "🏠",
        pains: [
          "Struggling to find buyers or tenants on your own?",
          "Worried your property won't sell or legal issues may arise?",
          "Overwhelmed by Thai paperwork, contracts, or fear of being scammed?",
        ],
        solutions: [
          "Full-service marketing — we find buyers and tenants fast.",
          "We handle all documents and legal steps on your behalf.",
          "Free consultation — we stay with you until the deal is done.",
        ],
        cta: { label: "List Your Property", href: "/owners" },
      },
      {
        label: "Buyers & Renters",
        icon: "🔍",
        pains: [
          "Can't find the right home, condo, or land at the right price?",
          "Confused by Thai contracts, documentation, or mortgage processes?",
          "Facing a language barrier in negotiations or legal terms?",
        ],
        solutions: [
          "Curated listings pre-screened for legal validity — matched to your budget.",
          "English-speaking agents to guide you through every step.",
          "Free mortgage consultation included.",
        ],
        cta: { label: "Find Your Dream Home", href: "/buy" },
      },
      {
        label: "Legal & Safety",
        icon: "⚖️",
        pains: [
          "Confused by Thai property laws or ownership restrictions for foreigners?",
          "Worried about rental scams or dishonest landlords?",
          "Unsure how to handle deposits or contract terms safely?",
        ],
        solutions: [
          "All listings are verified for legal validity before being listed.",
          "Secure rental contract review and transparent deposit handling.",
          "Full transparency at every step — no hidden surprises.",
        ],
        cta: { label: "Consult us for FREE", href: "/contact" },
      },
    ],
  },
} as const;
export const HOMEPAGE_SERVICES = [
  {
    icon: "Home" as const,
    title: "ฝากขาย / ปล่อยเช่า",
    description: "หมดกังวลเรื่องหาคนซื้อหรือคนเช่า เราช่วยดูแลตั้งแต่ประเมินราคา ทำการตลาด จนปิดดีล",
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
