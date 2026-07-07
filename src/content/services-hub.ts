/**
 * Services Hub content — bilingual, requirement-aligned (Phase 4)
 */

export const SERVICES_HUB_CONTENT = {
  seo: {
    title: "บริการของเรา | Our Services — บ้านไออุ่น Baan Ai Oun",
    description: {
      th: "ศูนย์รวมทางลัดความสำเร็จในโลกอสังหาฯ — ฝากขาย ค้นหาทรัพย์ Co-Agent คอร์สนายหน้า",
      en: "Your shortcut to real estate success — listing, matchmaking, co-agent network, and agent training.",
    },
  },
  hero: {
    h1: {
      th: "บ้านไออุ่น พร็อพเพอร์ตี้",
      en: "Baan Ai Oun Property",
    },
    sub: {
      th: "ศูนย์รวมทางลัดความสำเร็จในโลกอสังหาฯ ที่เข้าใจทั้งเจ้าของทรัพย์ ผู้ซื้อ และคนอยากสร้างรายได้ด้วยใจทั้งคนไทยและต่างชาติ",
      en: "The ultimate shortcut to real estate success—empowering property owners, buyers, and aspiring agents with genuine care for both local and international clients.",
    },
  },
  whyChoose: {
    title: "ทำไมต้องเลือกบ้านไออุ่น? | Why Choose Baan Ai Oun?",
    subtitle:
      "ศูนย์รวมอสังหาและเครือข่ายนายหน้า บริการซื้อ-ขาย-เช่า ครบจบในที่เดียว | All-in-one real estate center and agent network for buying, selling, and renting.",
    items: [
      {
        icon: "Heart",
        title: { th: "เข้าใจทุกความต้องการ", en: "Understand Your Needs" },
        description: {
          th: "บริการ 2 ภาษา ค้นหาและจับคู่ทรัพย์ในกรุงเทพฯ, สมุทรปราการ, EEC, ชลบุรี และพื้นที่นิคมอุตสาหกรรม",
          en: "Bilingual experts matching you with properties across Bangkok, Samut Prakan, EEC, and Chonburi.",
        },
      },
      {
        icon: "Shield",
        title: { th: "บริการครบวงจรที่เดียว", en: "All-In-One Seamless Services" },
        description: {
          th: "ดูแลตั้งแต่หาทรัพย์ สินเชื่อ สัญญา จนถึงวันโอนกรรมสิทธิ์",
          en: "End-to-end support from search and loans to secure ownership transfer.",
        },
      },
      {
        icon: "Star",
        title: { th: "เครือข่ายทีมงานคุณภาพ", en: "Quality Network & Screened Properties" },
        description: {
          th: "คัดกรองทรัพย์ทุกหลังด้วยสายตานักลงทุน",
          en: "Properties curated by investor-minded experts for true value.",
        },
      },
    ],
  },
  stats: [
    { value: "200+", th: "เคสสำเร็จปีนี้", en: "Deals Closed" },
    { value: "50+", th: "เครือข่ายนายหน้า", en: "Co-Agent Network" },
    { value: "300+", th: "ทรัพย์ที่ดูแล", en: "Properties Managed" },
    { value: "10+", th: "ปีประสบการณ์", en: "Years Experience" },
  ],
  localAuthority: {
    th: "บ้านไออุ่น พร็อพเพอร์ตี้ ให้บริการและมีความเชี่ยวชาญพิเศษในทำเล: กรุงเทพฯ, สมุทรปราการ (บางพลี, เมกาบางนา), ชลบุรี, ฉะเชิงเทรา, EEC และพื้นที่ใกล้เคียง",
    en: "Baan Ai Oun Property provides expert real estate services in: Bangkok, Samut Prakan (Bang Phli, Mega Bangna), Chonburi, Chachoengsao, EEC, and surrounding areas.",
  },
  services: [
    {
      icon: "Home",
      color: "#E8833A",
      title: { th: "ฝากขาย/ปล่อยเช่า", en: "List Your Property" },
      highlight: {
        th: "ประเมินศักยภาพทรัพย์ฟรี โดยทีมนักลงทุนตัวจริง",
        en: "Free investor-led property assessment",
      },
      description: {
        th: "จบทุกปัญหาขายยาก ปวดหัวเอกสาร และการฉ้อโกง — บริการครบวงจร ปิดดีลไว ไว้ใจได้",
        en: "End-to-end listing support — marketing, paperwork, and closing handled by experts.",
      },
      cta: { th: "ฝากขาย/ปล่อยเช่า", en: "List Your Property" },
      href: "/list-property",
    },
    {
      icon: "Search",
      color: "#2E75B6",
      title: { th: "ค้นหาบ้าน/สินเชื่อ", en: "Find Your Home" },
      highlight: {
        th: "คัดสรรบ้านทำเลทอง และทรัพย์รีโนเวทสภาพพร้อมอยู่ ผ่านการตรวจสอบโครงสร้างแล้ว",
        en: "Prime-location and move-in-ready renovated homes, structurally vetted.",
      },
      description: {
        th: "คัดทรัพย์ตรงโจทย์ ดูแลสินเชื่อและสัญญา จบที่เดียว ไม่มีค่าใช้จ่ายสำหรับผู้ซื้อและผู้เช่า",
        en: "Curated matching, loan guidance, and contracts — free for buyers and renters.",
      },
      cta: { th: "ค้นหาทรัพย์ที่ใช่", en: "Find Your Perfect Match" },
      href: "/find-property",
    },
    {
      icon: "Users",
      color: "#1B7A52",
      title: { th: "ร่วมเป็น Co-Agent", en: "Partner with Us" },
      highlight: {
        th: "ฝากทรัพย์ฟรี เราช่วยทำการตลาดจนกว่าจะปิดดีลได้",
        en: "List with us free — we market until the deal closes.",
      },
      description: {
        th: "มีทรัพย์แต่หาลูกค้าไม่ได้? กังวลค่าการตลาด? — เข้าร่วมเครือข่ายที่เติบโตไปด้วยกัน",
        en: "Have listings but no clients? Join our growing co-agent network.",
      },
      cta: { th: "ร่วมเป็น Co-Agent", en: "Join as Co-Agent" },
      href: "/co-agent",
    },
    {
      icon: "GraduationCap",
      color: "#7C3AED",
      title: { th: "คอร์สนายหน้า", en: "Agent Course" },
      highlight: {
        th: "ถ่ายทอดเคล็ดลับจากผู้แต่งหนังสือและนักลงทุนตัวจริง",
        en: "Secrets from published authors and practicing investors.",
      },
      description: {
        th: "2 วันเปลี่ยนชีวิต! Workshop จับมือทำจริง สำหรับว่าที่นายหน้า — เรียนจริง ทำจริง ได้เงินจริง",
        en: "Life-changing 2-day hands-on workshop for aspiring agents.",
      },
      cta: { th: "สมัครคอร์สนายหน้า", en: "Enroll in Agent Course" },
      href: "/agent-course",
    },
  ],
} as const
