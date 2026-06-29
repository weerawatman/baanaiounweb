/**
 * Services Hub content - bilingual display of 4 main services
 */

export const SERVICES_HUB_CONTENT = {
  seo: {
    title: "บริการของเรา | Our Services — บ้านไออุ่น Baan Ai Oun",
    description: {
      th: "บริการครบวงจรด้านอสังหาริมทรัพย์ ฝากขาย-ปล่อยเช่า ค้นหาบ้าน สินเชื่อ คอร์สนายหน้า และ Co-Agent",
      en: "Comprehensive real estate services: property listing, home search, loan consultation, agent training, and co-agent partnerships"
    }
  },
  hero: {
    h1: {
      th: "บริการของเรา",
      en: "Our Services"
    },
    sub: {
      th: "ครบจบเรื่องอสังหาฯ ในที่เดียว บริการมืออาชีพ ตั้งแต่เจ้าของทรัพย์ ผู้ซื้อ-เช่า นายหน้า ไปจนถึงคอร์สอบรม",
      en: "All your real estate needs in one place. Professional services for property owners, buyers, renters, agents, and training."
    }
  },
  services: [
    {
      icon: "Home",
      color: "#E8833A",
      title: {
        th: "ฝากขาย/ปล่อยเช่า",
        en: "List Your Property"
      },
      description: {
        th: "จบทุกปัญหาขายยาก ปวดหัวเอกสาร และการฉ้อโกง — บริการครบวงจร ปิดดีลไว ไว้ใจได้ 100%",
        en: "Stop worrying about unsold properties, complex paperwork, or scams. We handle everything from start to finish."
      },
      cta: {
        th: "ฝากขาย/ปล่อยเช่า | List Your Property",
        en: ""
      },
      href: "/list-property"
    },
    {
      icon: "Search",
      color: "#2E75B6",
      title: {
        th: "ค้นหาบ้าน/สินเชื่อ",
        en: "Find Your Home"
      },
      description: {
        th: "คัดทรัพย์ตรงโจทย์ ดูแลสินเชื่อและสัญญา จบที่เดียว ไม่มีค่าใช้จ่ายสำหรับผู้ซื้อและผู้เช่า",
        en: "Curated property matching, expert loan assistance, and seamless contract handling. 100% Free for buyers and renters."
      },
      cta: {
        th: "ค้นหาบ้าน/ปรึกษาสินเชื่อ | Find Your Home",
        en: ""
      },
      href: "/find-property"
    },
    {
      icon: "Users",
      color: "#1B7A52",
      title: {
        th: "ร่วมเป็น Co-Agent",
        en: "Partner with Us"
      },
      description: {
        th: "มีทรัพย์แต่หาลูกค้าไม่ได้? กังวลค่าการตลาด? — ฝากทรัพย์ฟรี! เราช่วยทำการตลาดจนกว่าจะปิดดีลได้",
        en: "Have listings but no clients? Worried about marketing costs? We market your listings for free until closed!"
      },
      cta: {
        th: "ร่วมเป็น Co-Agent | Partner with Us",
        en: ""
      },
      href: "/co-agent"
    },
    {
      icon: "GraduationCap",
      color: "#7C3AED",
      title: {
        th: "คอร์สนายหน้า",
        en: "Agent Course"
      },
      description: {
        th: "2 วันเปลี่ยนชีวิต! Workshop พลิกชีวิตสำหรับว่าที่นายหน้า — เรียนจริง ทำจริง ได้เงินจริง",
        en: "Life-changing 2-day workshop for aspiring agents — Real learning, real practice, real income."
      },
      cta: {
        th: "สมัครคอร์สนายหน้า | Enroll in Agent Course",
        en: ""
      },
      href: "/agent-course"
    }
  ]
}