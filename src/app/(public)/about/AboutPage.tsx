"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Shield, Star, ArrowRight, Home, TrendingUp, Building2, Globe } from "lucide-react"
import type { ElementType } from "react"
import Breadcrumb from "@/components/layout/Breadcrumb"

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
    color: "#E85D75",
  },
  {
    icon: Shield,
    titleTH: "บริการครบวงจรจบที่เดียว",
    titleEN: "All-in-One Seamless Services",
    desc: "เพียงเข้ามาที่เว็บไซต์ของเรา เราดูแลคุณทุกขั้นตอน ตั้งแต่คัดสรรทรัพย์ เจรจาต่อรอง ปรึกษาสินเชื่อ ดูแลเอกสารและสัญญา ไปจนถึงการโอนกรรมสิทธิ์และส่งมอบกุญแจ ปลอดภัย ไร้กังวล 100%",
    color: "#1B4D3E",
  },
  {
    icon: Star,
    titleTH: "เครือข่ายทีมงาน คัดกรองด้วยหัวใจ",
    titleEN: "Team Network & Quality Screened",
    desc: "เราไม่ได้ทำงานคนเดียว แต่เว็บไซต์นี้เชื่อมโยงกับเครือข่ายนายหน้าทั่วประเทศ นำทรัพย์ที่ซ่อนอยู่มาเปิดเผย เพื่อให้มั่นใจว่าลูกค้าจะได้เจอกับทรัพย์ที่ 'น่าอยู่จริง' และตรงความต้องการที่สุด",
    color: "#D4A843",
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
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "หน้าแรก", href: "/" }, { label: "เกี่ยวกับเรา | About Us" }]} />
      </div>

      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-primary/5 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-primary mb-3 text-sm font-medium tracking-widest uppercase">
              About Us
            </p>
            <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              เกี่ยวกับเรา: บ้านไออุ่น พร็อพเพอร์ตี้
              <span className="mt-2 block text-xl font-semibold text-[#1B4D3E]/70 sm:text-2xl">
                About Baan Ai Oun Property
              </span>
            </h1>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-base leading-relaxed">
              ศูนย์รวมอสังหาในไทยและเครือข่ายนายหน้า เชื่อมต่อโอกาส ซื้อ-ขาย-เช่า
              และเติบโตไปด้วยกัน สำหรับลูกค้าคนไทยและต่างชาติ
            </p>
            <p className="mx-auto mt-1 max-w-2xl text-sm italic text-gray-500">
              The Premier Thai Real Estate Hub &amp; Agent Network – Connecting Opportunities for
              Buy, Sell, Rent, and Professional Growth for Local &amp; International Clients.
            </p>
          </motion.div>

          {/* Mission Statement Box */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="mx-auto mt-8 max-w-2xl rounded-r-xl border-l-4 border-[#1B4D3E] bg-white py-4 pl-6 pr-4 text-left shadow-sm"
          >
            <p className="th-only text-base font-semibold text-[#1B4D3E]">
              พันธกิจ: ทำให้ทุกคนเข้าถึงบ้านที่ใช่ ในราคาที่ใช่
            </p>
            <p className="en-only text-base font-semibold text-[#1B4D3E]">
              Mission: Making the Right Home Accessible for Everyone, at the Right Price
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Our Story + Timeline ────────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-2xl font-bold text-[#1B4D3E] sm:text-3xl">
              จุดเริ่มต้นของเรา | Our Story
            </h2>
            <p className="mt-3 text-base italic text-gray-600">
              &ldquo;จากคนเช่าห้องแถว สู่ทีมงานที่คัดสรรบ้านด้วยหัวใจ&rdquo;
            </p>
            <p className="text-muted-foreground mt-1 text-sm">
              &ldquo;From Renting a Small Room to a Team That Selects Homes with Heart&rdquo;
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            <div className="bg-primary/20 absolute top-0 left-4 hidden h-full w-0.5 sm:left-1/2 sm:block" />
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
                      <div className="bg-primary z-10 flex size-14 flex-col items-center justify-center rounded-full text-white shadow-md">
                        <Icon className="size-5" />
                        <span className="text-[10px] font-bold leading-none">{milestone.year}</span>
                      </div>
                    </div>
                    <div
                      className={`ring-foreground/5 w-full rounded-xl bg-white p-6 shadow-sm ring-1 sm:w-[calc(50%-2rem)] ${
                        i % 2 === 0 ? "sm:mr-auto" : "sm:ml-auto"
                      }`}
                    >
                      <div className="mb-1 flex items-center gap-2 sm:hidden">
                        <div className="bg-primary flex size-8 items-center justify-center rounded-full">
                          <Icon className="size-4 text-white" />
                        </div>
                        <span className="bg-primary rounded-full px-3 py-0.5 text-xs font-bold text-white">
                          {milestone.year}
                        </span>
                      </div>
                      <h3 className="text-foreground text-base font-semibold">
                        {milestone.titleTH}
                        <span className="ml-1.5 text-xs font-normal text-gray-500">
                          ({milestone.titleEN})
                        </span>
                      </h3>
                      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                        {milestone.desc}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. How We Solve Your Problems ──────────────────────────────── */}
      <section className="bg-[#F5F0E8] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-10 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-2xl font-bold text-[#1B4D3E] sm:text-3xl">
              เว็บไซต์บ้านไออุ่น ช่วยแก้ปัญหาให้คุณได้อย่างไร?
            </h2>
            <p className="mt-1 text-sm text-gray-500 sm:text-base">
              How Our Platform Solves Your Problems
            </p>
            <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm leading-relaxed sm:text-base">
              ศูนย์รวมอสังหาในไทยและเครือข่ายนายหน้า บริการซื้อ-ขาย-เช่า ครบจบทุกขั้นตอน
              ดูแลลูกค้าคนไทยและต่างชาติแบบไร้รอยต่อในที่เดียว
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
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
                  className="flex flex-col items-center gap-4 rounded-2xl bg-white p-8 text-center shadow-sm"
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: `${vp.color}18` }}
                  >
                    <Icon size={28} style={{ color: vp.color }} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 md:text-base">
                    {vp.titleTH}
                    <span className="mt-0.5 block text-xs font-medium text-gray-500">
                      {vp.titleEN}
                    </span>
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">{vp.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── 4. Local Expertise Box ─────────────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-2xl border border-green-200 bg-green-50 p-6"
          >
            <h3 className="mb-3 font-bold text-green-800">
              <span className="th-only">ความเชี่ยวชาญเฉพาะพื้นที่ | Local Market Expertise</span>
              <span className="en-only">Local Market Expertise — Areas We Serve</span>
            </h3>
            <p className="mb-4 text-sm text-green-700">
              <span className="th-only">
                เราคลุกคลีในตลาดอสังหาริมทรัพย์ของพื้นที่เหล่านี้มากกว่า 10 ปี
                รู้จักทุกซอกทุกมุม ทุกทำเล และทุกราคาในโซนนี้
              </span>
              <span className="en-only">
                Over 10 years of deep expertise in these local real estate markets — we know every
                corner, location, and price point.
              </span>
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {LOCAL_AREAS.map((area) => (
                <span
                  key={area}
                  className="rounded-lg border border-green-200 bg-white px-3 py-2 text-center text-sm font-medium text-green-800"
                >
                  {area}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 5. Join Our Ecosystem ──────────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-2xl font-bold text-[#1B4D3E] sm:text-3xl">
              เติบโตไปด้วยกันกับครอบครัวบ้านไออุ่น
            </h2>
            <p className="mt-1 text-sm text-gray-500 sm:text-base">Join Our Ecosystem</p>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
              <strong>อยากเป็นนายหน้าอสังหาฯ แต่ไม่มีทุน ไม่รู้จะเริ่มอย่างไร?</strong>
              <br />
              บ้านไออุ่น พบว่ายังมีลูกค้าที่ต้องการซื้อ-เช่าบ้านอีกจำนวนมากผ่านระบบของเรา
              เราจึงเปิดโอกาสให้ผู้ที่อยากมีรายได้ อยากลองเส้นทางอาชีพนี้ ได้เข้ามาเรียนรู้แบบ
              &ldquo;จับมือทำ&rdquo; ไปพร้อมกับทีมงานของเรา มาร่วมเป็นเครือข่าย Co-Agent
              เพื่อส่งมอบบ้านในฝันให้ลูกค้า และสร้างอาชีพที่มั่นคงไปด้วยกัน!
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/find-property"
                className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-8 py-3 text-sm font-semibold text-white transition-colors"
              >
                ค้นหาทรัพย์ | Find Properties
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/co-agent"
                className="border-primary text-primary hover:bg-primary hover:text-white inline-flex items-center gap-2 rounded-lg border-2 px-8 py-3 text-sm font-semibold transition-colors"
              >
                ร่วมเป็น Co-Agent / สมัครคอร์สนายหน้า | Join Our Network
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
