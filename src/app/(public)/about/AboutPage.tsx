"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Shield, Star, ArrowRight, Home, TrendingUp, Building2, Globe } from "lucide-react"
import type { ElementType } from "react"
import Breadcrumb from "@/components/layout/Breadcrumb"
import PageSection from "@/components/layout/PageSection"
import SectionTitle from "@/components/layout/SectionTitle"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

interface Milestone {
  year: string
  icon: ElementType
  titleTH: string
  titleEN: string
  desc: string
}

const MILESTONES: Milestone[] = [
  {
    year: "2002",
    icon: Home,
    titleTH: "จุดเริ่มต้นจากห้องเช่าเล็กๆ",
    titleEN: "The Beginning",
    desc: "พิมเริ่มต้นชีวิตการทำงานในกรุงเทพฯ ด้วยห้องเช่าเล็กๆ ราคา 1,700–3,500 บาท ต้องย้ายที่อยู่ตลอดเวลา จนวันหนึ่งที่เริ่มสร้างครอบครัวและกู้ซื้อบ้านหลังแรกได้สำเร็จ ประสบการณ์นั้นทำให้เรา 'เข้าใจทุกความเหนื่อยล้าของคนไกลบ้าน' อย่างลึกซึ้ง",
  },
  {
    year: "2016",
    icon: TrendingUp,
    titleTH: "ก้าวแรกสู่วงการอสังหาฯ",
    titleEN: "First Step into Real Estate",
    desc: "เริ่มต้นเรียนรู้การลงทุนอสังหาริมทรัพย์ในไทย ควบคู่กับงานประจำ โดยเริ่มจากการกู้เงินธนาคารเพื่อรีโนเวทบ้าน ปล่อยขายและปล่อยเช่าในพื้นที่กรุงเทพฯ และปริมณฑล จนประสบความสำเร็จถึง 5 หลัง",
  },
  {
    year: "2020",
    icon: Building2,
    titleTH: "กำเนิด 'บ้านไออุ่น'",
    titleEN: "The Birth of Baan Ai Oun",
    desc: "ร่วมกับพาร์ทเนอร์ก่อตั้งบริษัท บ้านไออุ่น จำกัด สร้างบ้านเพื่อคนทำงานในโซนชลบุรีและบ้านบึง แม้จะเผชิญวิกฤตโควิด-19 และวิกฤตเลิกจ้าง แต่เราก็สู้จนลูกค้าได้เข้าอยู่ครบทุกหลัง และยังคงรักษาสายสัมพันธ์ที่ดีกับลูกค้าและพาร์ทเนอร์นายหน้ามาจนถึงปัจจุบัน",
  },
  {
    year: "2026",
    icon: Globe,
    titleTH: "กำเนิดเว็บไซต์บ้านไออุ่น",
    titleEN: "Launch of Baan Ai Oun Digital Hub",
    desc: "จากประสบการณ์ที่คลุกคลีในตลาด เราพบปัญหาใหญ่ที่สวนทางกัน คืออสังหาฯ ในไทยมีสภาวะล้นตลาด แต่ผู้ซื้อกลับ 'หาบ้านที่ตรงใจไม่เจอ' ส่วนเจ้าของทรัพย์ก็ 'ปล่อยขาย/เช่าไม่ออก' นี่คือจุดเปลี่ยนสำคัญที่ทำให้เราสร้างแพลตฟอร์มเว็บไซต์บ้านไออุ่นขึ้นมา เพื่อแก้ปัญหานี้โดยเฉพาะ",
  },
]

const VALUE_PROPS = [
  {
    icon: Heart,
    titleTH: "เข้าใจทุกความต้องการ ทลายกำแพงภาษา",
    titleEN: "Understanding Needs & Bridging Gaps",
    desc: "เราใช้เว็บไซต์นี้เป็นพื้นที่ 'ศูนย์กลาง' รวบรวมทรัพย์และเครือข่ายนายหน้า (Co-Agent) ตัดความยุ่งยากในการสื่อสาร รองรับทั้งลูกค้าชาวไทยและต่างชาติ เพื่อค้นหาและจับคู่ทรัพย์ในทำเลศักยภาพ เช่น กรุงเทพฯ, ปริมณฑล, EEC, ชลบุรี, ฉะเชิงเทรา และพื้นที่อื่นๆ ที่มักจะหาในระบบทั่วไปไม่เจอ",
    iconClass: "bg-secondary/15 text-secondary",
  },
  {
    icon: Shield,
    titleTH: "บริการครบวงจรจบที่เดียว",
    titleEN: "All-in-One Seamless Services",
    desc: "เพียงเข้ามาที่เว็บไซต์ของเรา เราดูแลคุณทุกขั้นตอน ตั้งแต่คัดสรรทรัพย์ เจรจาต่อรอง ปรึกษาสินเชื่อ ดูแลเอกสารและสัญญา ไปจนถึงการโอนกรรมสิทธิ์และส่งมอบกุญแจ ปลอดภัย ไร้กังวล 100%",
    iconClass: "bg-primary/10 text-primary",
  },
  {
    icon: Star,
    titleTH: "เครือข่ายทีมงาน คัดกรองด้วยหัวใจ",
    titleEN: "Team Network & Quality Screened",
    desc: "เราไม่ได้ทำงานคนเดียว แต่เว็บไซต์นี้เชื่อมโยงกับเครือข่ายนายหน้าทั่วประเทศ นำทรัพย์ที่ซ่อนอยู่มาเปิดเผย เพื่อให้มั่นใจว่าลูกค้าจะได้เจอกับทรัพย์ที่ 'น่าอยู่จริง' และตรงความต้องการที่สุด",
    iconClass: "bg-primary/10 text-secondary",
  },
]

const LOCAL_AREAS = [
  "บ้านบึง",
  "ชลบุรี",
  "ฉะเชิงเทรา",
  "สมุทรปราการ",
  "EEC",
  "นิคมอมตะ",
  "เหมราช",
  "ศรีราชา",
]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <Breadcrumb items={[{ label: "หน้าแรก", href: "/" }, { label: "เกี่ยวกับเรา | About Us" }]} />
      </div>

      <PageSection variant="warm" className="py-12 lg:py-16">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">About Us</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            เกี่ยวกับเรา: บ้านไออุ่น พร็อพเพอร์ตี้
            <span className="mt-2 block text-xl font-semibold text-muted-foreground sm:text-2xl">
              About Baan Ai Oun Property
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-foreground/90">
            บ้านไออุ่น พร็อพเพอร์ตี้: เชื่อมโยงทุกความต้องการอสังหาฯ ด้วยประสบการณ์นักลงทุนและบริการที่จริงใจ
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm italic text-muted-foreground">
            Baan Ai Oun Property: Connecting real estate goals through investor-led expertise and
            heartfelt service.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="mx-auto mt-8 max-w-2xl rounded-r-xl border-l-4 border-primary bg-card py-4 pl-6 pr-4 text-left shadow-sm"
        >
          <p className="text-base font-semibold text-primary">
            พันธกิจ: เชื่อมโยงทุกความต้องการอสังหาฯ ด้วยประสบการณ์นักลงทุนและบริการที่จริงใจ
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Mission: Connecting real estate goals through investor-led expertise and heartfelt
            service.
          </p>
        </motion.div>
      </PageSection>

      <PageSection variant="default">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionTitle
            title="จุดเริ่มต้นของเรา | Our Story"
            subtitle="“จากคนเช่าห้องแถว สู่ทีมงานที่คัดสรรบ้านด้วยหัวใจ” — From Renting a Small Room to a Team That Selects Homes with Heart"
          />
        </motion.div>

        <div className="relative mt-12">
          <div className="absolute top-0 left-4 hidden h-full w-0.5 bg-primary/20 sm:left-1/2 sm:block" />
          <div className="flex flex-col gap-10">
            {MILESTONES.map((milestone, i) => {
              const Icon = milestone.icon
              return (
                <motion.div
                  key={milestone.year}
                  className={`relative flex flex-col gap-4 sm:flex-row sm:items-start ${
                    i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i * 0.3}
                >
                  <div className="hidden sm:absolute sm:left-1/2 sm:flex sm:-translate-x-1/2 sm:items-center sm:justify-center">
                    <div className="z-10 flex size-14 flex-col items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                      <Icon className="size-5" />
                      <span className="text-[10px] font-bold leading-none">{milestone.year}</span>
                    </div>
                  </div>
                  <div
                    className={`w-full rounded-xl border border-border bg-card p-6 shadow-sm sm:w-[calc(50%-2rem)] ${
                      i % 2 === 0 ? "sm:mr-auto" : "sm:ml-auto"
                    }`}
                  >
                    <div className="mb-1 flex items-center gap-2 sm:hidden">
                      <div className="flex size-8 items-center justify-center rounded-full bg-primary">
                        <Icon className="size-4 text-primary-foreground" />
                      </div>
                      <span className="rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-foreground">
                        {milestone.year}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground">
                      {milestone.titleTH}
                      <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                        ({milestone.titleEN})
                      </span>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {milestone.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </PageSection>

      <PageSection variant="warm">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionTitle
            title="เว็บไซต์บ้านไออุ่น ช่วยแก้ปัญหาให้คุณได้อย่างไร?"
            subtitle="ศูนย์รวมอสังหาในไทยและเครือข่ายนายหน้า บริการซื้อ-ขาย-เช่า ครบจบทุกขั้นตอน ดูแลลูกค้าคนไทยและต่างชาติแบบไร้รอยต่อในที่เดียว"
          />
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {VALUE_PROPS.map((vp) => {
            const Icon = vp.icon
            return (
              <motion.div
                key={vp.titleTH}
                variants={cardVariants}
                className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center shadow-sm"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${vp.iconClass}`}
                >
                  <Icon size={28} />
                </div>
                <h3 className="text-sm font-bold text-foreground md:text-base">
                  {vp.titleTH}
                  <span className="mt-0.5 block text-xs font-medium text-muted-foreground">
                    {vp.titleEN}
                  </span>
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{vp.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </PageSection>

      <PageSection variant="default" className="py-12 lg:py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="rounded-2xl border border-primary/20 bg-primary/5 p-6"
        >
          <h3 className="mb-3 font-bold text-primary">
            ความเชี่ยวชาญเฉพาะพื้นที่ | Local Market Expertise
          </h3>
          <p className="mb-4 text-sm text-foreground/90">
            เราคลุกคลีในตลาดอสังหาริมทรัพย์ของพื้นที่เหล่านี้มากกว่า 10 ปี รู้จักทุกซอกทุกมุม
            ทุกทำเล และทุกราคาในโซนนี้
            <span className="mt-1 block text-muted-foreground">
              Over 10 years of deep expertise in these local real estate markets — we know every
              corner, location, and price point.
            </span>
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {LOCAL_AREAS.map((area) => (
              <span
                key={area}
                className="rounded-lg border border-border bg-card px-3 py-2 text-center text-sm font-medium text-primary"
              >
                {area}
              </span>
            ))}
          </div>
        </motion.div>
      </PageSection>

      <PageSection variant="default">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto max-w-3xl text-center"
        >
          <SectionTitle title="เติบโตไปด้วยกันกับครอบครัวบ้านไออุ่น | Join Our Ecosystem" />
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <strong className="text-foreground">อยากเป็นนายหน้าอสังหาฯ แต่ไม่มีทุน ไม่รู้จะเริ่มอย่างไร?</strong>
            <br />
            บ้านไออุ่น พบว่ายังมีลูกค้าที่ต้องการซื้อ-เช่าบ้านอีกจำนวนมากผ่านระบบของเรา
            เราจึงเปิดโอกาสให้ผู้ที่อยากมีรายได้ อยากลองเส้นทางอาชีพนี้ ได้เข้ามาเรียนรู้แบบ
            &ldquo;จับมือทำ&rdquo; ไปพร้อมกับทีมงานของเรา มาร่วมเป็นเครือข่าย Co-Agent
            เพื่อส่งมอบบ้านในฝันให้ลูกค้า และสร้างอาชีพที่มั่นคงไปด้วยกัน!
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/find-property"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              ค้นหาทรัพย์ | Find Properties
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/co-agent"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-8 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              ร่วมเป็น Co-Agent / สมัครคอร์สนายหน้า | Join Our Network
            </Link>
          </div>
        </motion.div>
      </PageSection>
    </>
  )
}
