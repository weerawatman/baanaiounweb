"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import {
  Heart,
  Star,
  Shield,
  MessageCircle,
  ExternalLink,
} from "lucide-react"
import Breadcrumb from "@/components/layout/Breadcrumb"
import SectionTitle from "@/components/layout/SectionTitle"
import { SITE_CONFIG } from "@/config/site"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

const MILESTONES = [
  {
    year: "2015",
    title: "เช่าห้องแถวแรก",
    desc: "พิมเริ่มต้นชีวิตการทำงานในนิคมอุตสาหกรรมชลบุรี เช่าห้องแถวเล็ก ๆ ราคา 2,500 บาท เข้าใจทุกความเหนื่อยของคนไกลบ้านด้วยตัวเอง",
  },
  {
    year: "2019",
    title: "ก้าวสู่วงการอสังหาฯ",
    desc: "ตัดสินใจเปลี่ยนเส้นทาง เรียนรู้เรื่องอสังหาริมทรัพย์จากศูนย์ สอบใบอนุญาตนายหน้า เริ่มต้นช่วยเพื่อนร่วมงานหาบ้าน",
  },
  {
    year: "2022",
    title: "บ้านไออุ่นเกิดขึ้น",
    desc: "เปิดตัว บ้านไออุ่น พร็อพเพอร์ตี้ อย่างเป็นทางการ มุ่งเน้นบ้านเพื่อคนทำงานในชลบุรีและบ้านบึง เน้นคุณภาพและความซื่อสัตย์",
  },
  {
    year: "2025",
    title: "ขยายบริการรีโนเวท",
    desc: "เพิ่มบริการรีโนเวทบ้านเก่าก่อนขาย ช่วยให้เจ้าของทรัพย์ได้ราคาดีขึ้น และผู้ซื้อได้บ้านคุณภาพในราคาที่คุ้มค่า",
  },
]

const PERSONAL_VALUES = [
  {
    icon: Heart,
    title: "ดูแลด้วยใจ",
    desc: "พิมไม่ได้แค่ขายบ้าน แต่ช่วยคุณหา 'บ้าน' ที่ใช่จริง ๆ เพราะเข้าใจว่าทุกบาทที่จ่ายไปมีความหมายแค่ไหน",
  },
  {
    icon: Shield,
    title: "ซื่อสัตย์โปร่งใส",
    desc: "บอกตรง ๆ ทั้งข้อดีและข้อด้อยของทุกทรัพย์ ไม่มีข้อมูลซ่อนเร้น คุณตัดสินใจได้อย่างมั่นใจ",
  },
  {
    icon: Star,
    title: "มืออาชีพที่เชื่อถือได้",
    desc: "ดูแลตั้งแต่ต้นจนจบ ตั้งแต่หาทรัพย์ เตรียมเอกสาร ยื่นกู้ จนถึงวันโอน พิมไม่ทิ้งคุณกลางทางแน่นอน",
  },
]

const SOCIAL_LINKS = [
  {
    label: "LINE Official",
    href: SITE_CONFIG.lineUrl,
    shortLabel: "LINE",
    color: "bg-green-500",
  },
  {
    label: "Facebook",
    href: SITE_CONFIG.facebook,
    shortLabel: "FB",
    color: "bg-blue-600",
  },
  {
    label: "TikTok",
    href: SITE_CONFIG.tiktok,
    shortLabel: "TT",
    color: "bg-black",
  },
  {
    label: "YouTube",
    href: SITE_CONFIG.youtube,
    shortLabel: "YT",
    color: "bg-red-600",
  },
]

export default function AboutPage() {
  return (
    <>
        <title>เกี่ยวกับพิม — นายหน้าอสังหาฯ บ้านบึง ชลบุรี</title>
        <meta name="description" content="รู้จักพิม นายหน้าอสังหาริมทรัพย์ บ้านบึง ชลบุรี จากคนเช่าห้องแถว สู่เจ้าของ บ้านไออุ่น พร็อพเพอร์ตี้ ดูแลทุกเคสด้วยหัวใจ" />
        <meta property="og:title" content="เกี่ยวกับพิม — นายหน้าอสังหาฯ บ้านบึง ชลบุรี" />
        <meta property="og:description" content="รู้จักพิม นายหน้าอสังหาริมทรัพย์ บ้านบึง ชลบุรี จากคนเช่าห้องแถว สู่เจ้าของ บ้านไออุ่น พร็อพเพอร์ตี้ ดูแลทุกเคสด้วยหัวใจ" />

        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "หน้าแรก", href: "/" },
              { label: "เกี่ยวกับพิม" },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="bg-primary/5 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <motion.div
                className="order-2 lg:order-1"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
                  เกี่ยวกับ
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {SITE_CONFIG.pim.fullName}
                </h1>
                <p className="mt-2 text-lg font-medium text-primary">
                  นายหน้าอสังหาริมทรัพย์ บ้านบึง ชลบุรี
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {SITE_CONFIG.pim.bio}
                </p>
                <div className="mt-8">
                  <a
                    href={SITE_CONFIG.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                  >
                    <MessageCircle className="size-5" />
                    อยากคุยกับพิม?
                  </a>
                </div>
              </motion.div>
              <motion.div
                className="order-1 flex justify-center lg:order-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src={SITE_CONFIG.pim.heroImage}
                    alt={SITE_CONFIG.pim.fullName}
                    width={800}
                    height={600}
                    priority
                    className="h-80 w-full max-w-md object-cover sm:h-96"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Journey & Timeline */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              title="จากคนเช่าห้อง สู่นายหน้าที่คัดสรรบ้านด้วยหัวใจ"
              subtitle="เส้นทางที่ทำให้พิมเข้าใจทุกความฝันของคนอยากมีบ้าน"
            />
            <div className="mt-12 relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 hidden h-full w-0.5 bg-primary/20 sm:left-1/2 sm:block" />
              <div className="flex flex-col gap-10">
                {MILESTONES.map((milestone, i) => (
                  <motion.div
                    key={milestone.year}
                    className={`relative flex flex-col gap-4 sm:flex-row sm:items-start ${
                      i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i * 0.5}
                  >
                    {/* Year badge — centered on the timeline */}
                    <div className="hidden sm:flex sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:items-center sm:justify-center">
                      <div className="z-10 flex size-12 items-center justify-center rounded-full bg-primary font-bold text-white text-sm shadow-md">
                        {milestone.year}
                      </div>
                    </div>
                    {/* Content */}
                    <div
                      className={`w-full sm:w-[calc(50%-2rem)] rounded-xl bg-white p-6 shadow-sm ring-1 ring-foreground/5 ${
                        i % 2 === 0 ? "sm:mr-auto" : "sm:ml-auto"
                      }`}
                    >
                      <div className="mb-1 flex items-center gap-2 sm:hidden">
                        <span className="rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-white">
                          {milestone.year}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-foreground">
                        {milestone.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {milestone.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="bg-primary py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/60">
                วิสัยทัศน์
              </p>
              <blockquote className="text-xl font-medium leading-relaxed text-white sm:text-2xl">
                "{SITE_CONFIG.pim.vision}"
              </blockquote>
              <p className="mt-4 text-white/70">— {SITE_CONFIG.pim.name}</p>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              title="สิ่งที่พิมยึดถือ"
              subtitle="คุณค่าที่กำหนดทุกการตัดสินใจในการทำงานของพิม"
            />
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {PERSONAL_VALUES.map((value, i) => (
                <motion.div
                  key={value.title}
                  className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-foreground/5"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i * 0.3}
                >
                  <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10">
                    <value.icon className="size-7 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {value.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="bg-muted/40 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <SectionTitle
                title="ติดตามพิมได้ที่"
                subtitle="อัปเดตบ้านใหม่ เคล็ดลับการเงิน และไลฟ์สไตล์คนไกลบ้านทุกวัน"
              />
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 rounded-xl bg-white px-5 py-3 text-sm font-medium shadow-sm ring-1 ring-foreground/10 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span
                      className={`flex size-6 items-center justify-center rounded-md text-xs font-bold text-white ${social.color}`}
                    >
                      {social.shortLabel}
                    </span>
                    {social.label}
                    <ExternalLink className="size-3.5 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="flex flex-col items-center gap-6 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                อยากคุยกับพิม?
              </h2>
              <p className="max-w-md text-base text-muted-foreground">
                ไม่ว่าจะซื้อ ขาย เช่า หรือแค่ขอคำแนะนำ พิมยินดีช่วยเสมอค่ะ
              </p>
              <a
                href={SITE_CONFIG.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
              >
                <MessageCircle className="size-5" />
                แอดไลน์พิมเลยค่ะ
              </a>
            </motion.div>
          </div>
        </section>
    </>
  )
}
