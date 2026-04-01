"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Breadcrumb from "@/components/layout/Breadcrumb"
import SectionTitle from "@/components/layout/SectionTitle"
import { SITE_CONFIG } from "@/lib/mock-data"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

const CONTACT_CARDS = [
  {
    icon: Phone,
    label: "โทรศัพท์",
    value: SITE_CONFIG.phone,
    href: `tel:${SITE_CONFIG.phone}`,
    color: "bg-green-100 text-green-700",
  },
  {
    icon: MessageCircle,
    label: "LINE",
    value: SITE_CONFIG.lineId,
    href: SITE_CONFIG.lineUrl,
    color: "bg-emerald-100 text-emerald-700",
    external: true,
  },
  {
    icon: Mail,
    label: "อีเมล",
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: MapPin,
    label: "ที่อยู่",
    value: SITE_CONFIG.address,
    href: undefined,
    color: "bg-rose-100 text-rose-700",
  },
]

interface FormState {
  name: string
  phone: string
  email: string
  message: string
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    message: "",
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log("Contact form submitted:", form)
    alert("ส่งข้อความเรียบร้อยแล้ว พิมจะติดต่อกลับโดยเร็วที่สุดค่ะ!")
    setForm({ name: "", phone: "", email: "", message: "" })
  }

  return (
    <>
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "หน้าแรก", href: "/" },
              { label: "ติดต่อเรา" },
            ]}
          />
        </div>

        {/* Page Header */}
        <section className="bg-primary/5 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                ติดต่อเรา
              </h1>
              <p className="mt-4 text-base text-muted-foreground">
                ส่งข้อความหาพิม หรือแอดไลน์มาได้เลยค่ะ พิมตอบทุกข้อความ
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Left: Contact Form */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={0}
              >
                <h2 className="mb-6 text-xl font-semibold text-foreground">
                  ส่งข้อความหาพิม
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground"
                    >
                      ชื่อ-นามสกุล <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="คุณชื่ออะไรคะ?"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="h-10"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-foreground"
                    >
                      เบอร์โทรศัพท์ <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="0xx-xxx-xxxx"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      className="h-10"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground"
                    >
                      อีเมล
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      className="h-10"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-foreground"
                    >
                      ข้อความ <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="บอกพิมได้เลยค่ะ ว่าสนใจซื้อ ขาย เช่า หรือมีคำถามอะไร..."
                      required
                      value={form.message}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-input bg-transparent px-3 py-2.5 text-sm leading-relaxed placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="mt-2 gap-2 bg-primary text-white hover:bg-primary/90"
                  >
                    <Mail className="size-4" />
                    ส่งข้อความ
                  </Button>
                </form>
              </motion.div>

              {/* Right: Contact Info + Map */}
              <motion.div
                className="flex flex-col gap-8"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={1}
              >
                <div>
                  <h2 className="mb-6 text-xl font-semibold text-foreground">
                    ช่องทางติดต่อ
                  </h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {CONTACT_CARDS.map((card) => {
                      const inner = (
                        <div className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-foreground/5 transition-all hover:-translate-y-0.5 hover:shadow-md">
                          <div
                            className={`flex size-10 shrink-0 items-center justify-center rounded-full ${card.color}`}
                          >
                            <card.icon className="size-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                              {card.label}
                            </p>
                            <p className="mt-0.5 truncate text-sm font-medium text-foreground">
                              {card.value}
                            </p>
                          </div>
                        </div>
                      )

                      if (card.href) {
                        return (
                          <a
                            key={card.label}
                            href={card.href}
                            target={card.external ? "_blank" : undefined}
                            rel={card.external ? "noopener noreferrer" : undefined}
                          >
                            {inner}
                          </a>
                        )
                      }
                      return <div key={card.label}>{inner}</div>
                    })}
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="overflow-hidden rounded-2xl shadow-md">
                  <iframe
                    src={SITE_CONFIG.googleMapsEmbed}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="แผนที่ บ้านไออุ่น พร็อพเพอร์ตี้"
                  />
                </div>

                {/* Quick LINE CTA */}
                <div className="rounded-2xl bg-primary/5 p-6">
                  <h3 className="text-base font-semibold text-foreground">
                    ต้องการคำตอบเร็วกว่านี้?
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    แอดไลน์หาพิมได้เลย ตอบไวกว่าค่ะ!
                  </p>
                  <a
                    href={SITE_CONFIG.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                  >
                    <MessageCircle className="size-4" />
                    แอดไลน์ {SITE_CONFIG.lineId}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
    </>
  )
}
