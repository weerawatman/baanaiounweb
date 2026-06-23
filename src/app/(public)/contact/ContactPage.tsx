"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, MessageCircle, Mail, MapPin, Loader2, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Breadcrumb from "@/components/layout/Breadcrumb"
import { SITE_CONFIG } from "@/config/site"
import type { Profile } from "@/types"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

interface FormState {
  name: string
  phone: string
  email: string
  message: string
}

export default function ContactPage({ profile }: { profile: Profile }) {
  const phone = profile.phone || SITE_CONFIG.phone
  const lineId = profile.lineId || SITE_CONFIG.lineId
  const lineUrl = profile.lineUrl || SITE_CONFIG.lineUrl
  const email = profile.email || SITE_CONFIG.email

  const contactCards = [
    { icon: Phone, label: "โทรศัพท์", value: phone, href: `tel:${phone}`, color: "bg-green-100 text-green-700" },
    { icon: MessageCircle, label: "LINE", value: lineId, href: lineUrl, color: "bg-emerald-100 text-emerald-700", external: true },
    { icon: Mail, label: "อีเมล", value: email, href: `mailto:${email}`, color: "bg-blue-100 text-blue-700" },
    { icon: MapPin, label: "ที่อยู่", value: SITE_CONFIG.address, href: undefined, color: "bg-rose-100 text-rose-700" },
  ]

  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError(null)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formTag: "contact",
          name: form.name,
          phone: form.phone || undefined,
          email: form.email || undefined,
          details: form.message,
        }),
      })

      const body = await res.json()

      if (!res.ok || !body.success) {
        setError(body.error ?? "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง")
        return
      }

      setSubmitted(true)
    } catch {
      setError("ไม่สามารถส่งข้อมูลได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
        <title>ติดต่อเรา — บ้านไออุ่น พร็อพเพอร์ตี้</title>
        <meta name="description" content="ติดต่อบ้านไออุ่น พร็อพเพอร์ตี้ โทร แอดไลน์ หรือส่งข้อความหาพิมได้เลย ปรึกษาเรื่องซื้อ ขาย เช่าบ้านฟรี!" />
        <meta property="og:title" content="ติดต่อเรา — บ้านไออุ่น พร็อพเพอร์ตี้" />
        <meta property="og:description" content="ติดต่อบ้านไออุ่น พร็อพเพอร์ตี้ โทร แอดไลน์ หรือส่งข้อความหาพิมได้เลย ปรึกษาเรื่องซื้อ ขาย เช่าบ้านฟรี!" />

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

                {submitted ? (
                  <motion.div
                    className="rounded-2xl bg-white p-8 text-center shadow-lg ring-1 ring-foreground/5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <CheckCircle className="mx-auto size-12 text-green-500" />
                    <h3 className="mt-4 text-xl font-bold text-[#1B4D3E]">ส่งข้อความเรียบร้อยแล้ว!</h3>
                    <p className="mt-2 text-gray-600">พิมจะติดต่อกลับโดยเร็วที่สุดค่ะ</p>
                    <Button
                      className="mt-6"
                      variant="outline"
                      onClick={() => {
                        setSubmitted(false)
                        setForm({ name: "", phone: "", email: "", message: "" })
                      }}
                    >
                      ส่งข้อความอีกครั้ง
                    </Button>
                  </motion.div>
                ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
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
                      disabled={submitting}
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
                      disabled={submitting}
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
                      disabled={submitting}
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
                      disabled={submitting}
                      className="w-full rounded-lg border border-input bg-transparent px-3 py-2.5 text-sm leading-relaxed placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 resize-none"
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      <AlertTriangle className="size-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="mt-2 gap-2 bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        กำลังส่ง...
                      </>
                    ) : (
                      <>
                        <Mail className="size-4" />
                        ส่งข้อความ
                      </>
                    )}
                  </Button>
                </form>
                )}
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
                    {contactCards.map((card) => {
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
                    href={lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                  >
                    <MessageCircle className="size-4" />
                    แอดไลน์ {lineId}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
    </>
  )
}
