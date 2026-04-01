"use client"

import { motion } from "framer-motion"
import { Phone, Home, Globe, CheckCircle, MessageCircle, Hammer } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import Breadcrumb from "@/components/layout/Breadcrumb"
import SectionTitle from "@/components/layout/SectionTitle"
import { MOCK_FAQS, SITE_CONFIG } from "@/lib/mock-data"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

const PROCESS_STEPS = [
  {
    icon: Phone,
    title: "ติดต่อพิม",
    desc: "แอดไลน์หรือโทรมา บอกรายละเอียดทรัพย์",
    step: 1,
  },
  {
    icon: Home,
    title: "ดูทรัพย์จริง",
    desc: "พิมไปดูทรัพย์ ถ่ายรูปสวย ๆ วิเคราะห์ราคา",
    step: 2,
  },
  {
    icon: Globe,
    title: "ลงประกาศทุกช่องทาง",
    desc: "Facebook, LINE, TikTok, เว็บไซต์ ครบทุกแพลตฟอร์ม",
    step: 3,
  },
  {
    icon: CheckCircle,
    title: "ปิดการขาย/เช่า",
    desc: "คัดกรองลูกค้าจริงจัง ดูแลจนจบ",
    step: 4,
  },
]

export default function OwnersPage() {
  const ownerFaqs = MOCK_FAQS.filter((faq) => faq.pageSlug === "owners")

  return (
    <>
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "หน้าแรก", href: "/" },
              { label: "ฝากขาย/เช่า" },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="bg-primary/5 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mx-auto max-w-2xl text-center"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                ฝากขาย ฝากเช่า กับพิม
                <br />
                <span className="text-primary">ขายได้เร็ว ดูแลดี</span>
              </h1>
              <motion.p
                className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg"
                variants={fadeUp}
                custom={1}
              >
                พิมดูแลทรัพย์ของคุณเหมือนทรัพย์ของตัวเอง ตั้งแต่ถ่ายรูปสวยงาม
                วิเคราะห์ราคาตลาด ไปจนถึงลงประกาศทุกช่องทางและคัดกรองลูกค้าจริงจังให้คุณ
                คุณนอนหลับสบาย พิมทำงานให้ค่ะ
              </motion.p>
              <motion.div className="mt-8" variants={fadeUp} custom={2}>
                <a
                  href={SITE_CONFIG.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                >
                  <MessageCircle className="size-5" />
                  ปรึกษาพิมฟรี ไม่มีค่าใช้จ่าย
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              title="ขั้นตอนฝากขาย/ฝากเช่า"
              subtitle="ง่าย ๆ แค่ 4 ขั้นตอน พิมดูแลทุกอย่างให้ค่ะ"
            />
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS_STEPS.map((step) => (
                <motion.div
                  key={step.step}
                  className="relative flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-foreground/5"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={step.step * 0.5}
                >
                  <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10">
                    <step.icon className="size-7 text-primary" />
                  </div>
                  <span className="absolute -top-3 left-4 flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {step.step}
                  </span>
                  <h3 className="text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Renovate to Sell */}
        <section className="bg-amber-50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-800">
                  <Hammer className="size-4" />
                  บริการพิเศษ
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  รีโนเวทบ้านเก่า
                  <br />
                  <span className="text-amber-700">เพิ่มราคาขาย ขายได้ไวขึ้น</span>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  บ้านเก่าขายยากเพราะดูไม่น่าอยู่? พิมช่วยได้ค่ะ! พิมมีทีมช่างที่ไว้วางใจได้
                  พร้อมออกแบบการรีโนเวทที่คุ้มค่า เน้นจุดที่กระทบราคาขายมากที่สุด
                  ไม่ว่าจะเป็นสี กระเบื้อง ห้องน้ำ หรือครัว
                </p>
                <ul className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground">
                  {[
                    "วิเคราะห์ว่ารีโนเวทส่วนไหนคุ้มที่สุด",
                    "ประสานงานช่างให้ ไม่ต้องยุ่งเอง",
                    "ถ่ายรูป Before-After สวย ๆ เพิ่มแรงดึงดูดผู้ซื้อ",
                    "ขายได้ราคาสูงขึ้น คืนทุนรีโนเวทและยังมีกำไร",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 size-4 shrink-0 text-amber-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <a
                    href={SITE_CONFIG.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 transition-colors"
                  >
                    <MessageCircle className="size-4" />
                    สอบถามบริการรีโนเวท
                  </a>
                </div>
              </motion.div>
              <motion.div
                className="overflow-hidden rounded-2xl shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="https://placehold.co/600x400/D4A843/FFFFFF?text=รีโนเวท+Before+%26+After"
                  alt="บริการรีโนเวทบ้านก่อนขาย"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        {ownerFaqs.length > 0 && (
          <section className="py-16 sm:py-24">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <SectionTitle
                title="คำถามที่พบบ่อย"
                subtitle="สงสัยอะไร ถามพิมได้เลยค่ะ"
              />
              <motion.div
                className="mt-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Accordion>
                  {ownerFaqs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-primary py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="flex flex-col items-center gap-6 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                พร้อมฝากทรัพย์กับพิม?
              </h2>
              <p className="max-w-xl text-base text-white/80">
                ไม่มีค่าใช้จ่ายล่วงหน้า พิมรับค่าคอมมิชชั่นเมื่อขาย/ปล่อยเช่าสำเร็จเท่านั้นค่ะ
              </p>
              <a
                href={SITE_CONFIG.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-2.5 text-sm font-medium text-primary hover:bg-white/90 transition-colors"
              >
                <MessageCircle className="size-5" />
                แอดไลน์พิมเลย
              </a>
            </motion.div>
          </div>
        </section>
    </>
  )
}
