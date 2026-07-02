"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Loader2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
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

// WhatsApp SVG icon (official green brand icon)
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

interface FormState {
  name: string
  phone: string
  email: string
  subject: string
  message: string
}

export default function ContactPage({ profile }: { profile: Profile }) {
  const phone = profile.phone || SITE_CONFIG.phone
  const lineId = profile.lineId || SITE_CONFIG.lineId
  const lineUrl = profile.lineUrl || SITE_CONFIG.lineUrl
  const email = profile.email || SITE_CONFIG.email
  const address = profile.address || SITE_CONFIG.address
  const whatsappUrl = SITE_CONFIG.whatsappUrl
  const mapEmbed = address
    ? `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed&hl=th`
    : SITE_CONFIG.googleMapsEmbed

  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
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
          formTag: form.subject || "contact",
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
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "หน้าแรก", href: "/" }, { label: "ติดต่อเรา" }]} />
      </div>

      {/* Page Header */}
      <section className="bg-primary/5 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center" initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              ติดต่อเรา <span className="text-muted-foreground font-medium">/ Contact Us</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-base">
              ส่งข้อความหาพิม หรือแอดไลน์มาได้เลยค่ะ พิมตอบทุกข้อความ
              <br />
              Send us a message or add us on LINE — we reply to every message.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left: Contact Form */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <h2 className="text-foreground mb-6 text-xl font-semibold">
                ส่งข้อความหาพิม / Send Us a Message
              </h2>

              {submitted ? (
                <motion.div
                  className="ring-foreground/5 rounded-2xl bg-white p-8 text-center shadow-lg ring-1"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle className="mx-auto size-12 text-green-500" />
                  <h3 className="mt-4 text-xl font-bold text-[#1B4D3E]">
                    ส่งข้อความเรียบร้อยแล้ว! / Message sent!
                  </h3>
                  <p className="mt-2 text-gray-600">
                    พิมจะติดต่อกลับโดยเร็วที่สุดค่ะ / We&apos;ll get back to you shortly.
                  </p>
                  <Button
                    className="mt-6"
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false)
                      setForm({ name: "", phone: "", email: "", subject: "", message: "" })
                    }}
                  >
                    ส่งข้อความอีกครั้ง / Send another
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-foreground text-sm font-medium">
                      ชื่อ-นามสกุล / Full Name <span className="text-destructive">*</span>
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
                    <label htmlFor="phone" className="text-foreground text-sm font-medium">
                      เบอร์โทรศัพท์ / Phone <span className="text-destructive">*</span>
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
                    <label htmlFor="email" className="text-foreground text-sm font-medium">
                      อีเมล / Email
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

                  {/* Subject Dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="subject" className="text-foreground text-sm font-medium">
                      หัวข้อ / Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      disabled={submitting}
                      className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-10 w-full rounded-lg border bg-transparent px-3 text-sm focus-visible:ring-3 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      <option value="">เลือกหัวข้อ | Select Topic</option>
                      <option value="buy">ซื้อ/เช่า | Buy / Rent Property</option>
                      <option value="sell">ฝากขาย/เช่า | List My Property</option>
                      <option value="loan">สินเชื่อบ้าน | Home Loan Inquiry</option>
                      <option value="co-agent">Co-Agent | Partnership</option>
                      <option value="other">อื่นๆ | Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-foreground text-sm font-medium">
                      ข้อความ / Message <span className="text-destructive">*</span>
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
                      className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full resize-none rounded-lg border bg-transparent px-3 py-2.5 text-sm leading-relaxed focus-visible:ring-3 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
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
                    className="bg-primary hover:bg-primary/90 mt-2 gap-2 text-white disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        กำลังส่ง... / Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="size-4" />
                        ส่งข้อความ / Send Message
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
                <h2 className="text-foreground mb-6 text-xl font-semibold">
                  ช่องทางติดต่อ / Contact Channels
                </h2>

                {/* Click-to-action contact cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Phone */}
                  <a
                    href={`tel:${phone.replace(/-/g, "")}`}
                    className="ring-foreground/5 flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                      <Phone className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        โทรศัพท์ / Phone
                      </p>
                      <p className="text-foreground mt-0.5 text-sm font-medium">{phone}</p>
                    </div>
                  </a>

                  {/* LINE */}
                  <a
                    href={lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ring-foreground/5 flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <MessageCircle className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        LINE
                      </p>
                      <p className="text-foreground mt-0.5 truncate text-sm font-medium">{lineId}</p>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ring-foreground/5 flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                      <WhatsAppIcon className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        WhatsApp
                      </p>
                      <p className="text-foreground mt-0.5 text-sm font-medium">+66 86-414-9960</p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${email}`}
                    className="ring-foreground/5 flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                      <Mail className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        อีเมล / Email
                      </p>
                      <p className="text-foreground mt-0.5 truncate text-sm font-medium">{email}</p>
                    </div>
                  </a>

                  {/* Address (no link) */}
                  <div className="ring-foreground/5 col-span-full flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm ring-1">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                      <MapPin className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        ที่อยู่ / Address
                      </p>
                      <p className="text-foreground mt-0.5 text-sm font-medium">{address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="overflow-hidden rounded-2xl shadow-md">
                <iframe
                  src={mapEmbed}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="แผนที่ บ้านไออุ่น พร็อพเพอร์ตี้"
                />
              </div>

              {/* Quick LINE + WhatsApp CTA */}
              <div className="bg-primary/5 rounded-2xl p-6">
                <h3 className="text-foreground text-base font-semibold">
                  ต้องการคำตอบเร็วกว่านี้? / Need a Faster Reply?
                </h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  แอดไลน์หรือ WhatsApp หาพิมได้เลย ตอบไวกว่าค่ะ!
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
                  >
                    <MessageCircle className="size-4" />
                    แอดไลน์ {lineId}
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  >
                    <WhatsAppIcon className="size-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
