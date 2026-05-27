/**
 * Homepage-specific content: services grid and pain-point cards.
 */
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
