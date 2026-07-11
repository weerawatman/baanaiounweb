"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Loader2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Breadcrumb from "@/components/layout/Breadcrumb"
import WhatsAppIcon from "@/components/shared/WhatsAppIcon"
import { SITE_CONFIG } from "@/config/site"
import { buildGoogleMapsEmbedUrl } from "@/lib/google-maps"
import { mapContactSubjectToFormTag } from "@/lib/form-validation"
import type { Profile } from "@/types"

interface FormState {
  name: string
  phone: string
  email: string
  subject: string
  message: string
}

const inputCls =
  "w-full rounded-lg border border-input bg-[#fafafa] px-4 py-3 text-[15px] transition-colors focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"

export default function ContactPage({ profile }: { profile: Profile }) {
  const phone = profile.phone || SITE_CONFIG.phone
  const lineId = profile.lineId || SITE_CONFIG.lineId
  const lineUrl = profile.lineUrl || SITE_CONFIG.lineUrl
  const email = profile.email || SITE_CONFIG.email
  const address = profile.address || SITE_CONFIG.address
  const whatsappUrl = SITE_CONFIG.whatsappUrl
  const mapEmbed =
    buildGoogleMapsEmbedUrl({
      lat: profile.mapLat,
      lng: profile.mapLng,
      address,
    }) ?? SITE_CONFIG.googleMapsEmbed

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
          formTag: mapContactSubjectToFormTag(form.subject),
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
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <Breadcrumb items={[{ label: "หน้าแรก", href: "/" }, { label: "ติดต่อเรา | Contact Us" }]} />
      </div>

      {/* Hero — mockup: green banner + optional background image */}
      <header className="relative mb-12 overflow-hidden border-b-4 border-[#eab308] bg-primary py-16 text-center text-white sm:py-20">
        {profile.heroImageUrl && (
          <Image
            src={profile.heroImageUrl}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-primary/85" aria-hidden />
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-3xl font-bold sm:text-4xl">ติดต่อเรา | Contact Us</h1>
          <p className="mt-4 text-base leading-relaxed text-[#e5e7eb] sm:text-lg">
            ส่งข้อความหาพิม หรือแอดไลน์มาได้เลยค่ะ เราตอบทุกข้อความ
            <br />
            Send us a message or add us on LINE — we reply to every message.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-10">
          {/* Left: Form */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] sm:p-10">
            <h2 className="mb-6 border-b-2 border-border pb-4 text-xl font-semibold text-primary">
              ✉️ ส่งข้อความหาเรา | Send Us a Message
            </h2>

            {submitted ? (
              <div className="py-8 text-center">
                <CheckCircle className="mx-auto size-12 text-green-500" />
                <h3 className="mt-4 text-xl font-bold text-primary">
                  ส่งข้อความเรียบร้อยแล้ว! | Message sent!
                </h3>
                <p className="mt-2 text-muted-foreground">
                  พิมจะติดต่อกลับโดยเร็วที่สุดค่ะ | We&apos;ll get back to you shortly.
                </p>
                <Button
                  className="mt-6"
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false)
                    setForm({ name: "", phone: "", email: "", subject: "", message: "" })
                  }}
                >
                  ส่งข้อความอีกครั้ง | Send another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-bold text-[#444]">
                    ชื่อ-นามสกุล | Full Name <span className="text-red-600">*</span>
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
                    className={inputCls}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm font-bold text-[#444]">
                    เบอร์โทรศัพท์ | Phone <span className="text-red-600">*</span>
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
                    className={inputCls}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-bold text-[#444]">
                    อีเมล | Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    disabled={submitting}
                    className={inputCls}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-sm font-bold text-[#444]">
                    หัวข้อ | Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    disabled={submitting}
                    className={inputCls}
                  >
                    <option value="">เลือกหัวข้อ | Select Topic</option>
                    <option value="buy">ซื้อ/เช่า | Buy / Rent Property</option>
                    <option value="sell">ฝากขาย/เช่า | List My Property</option>
                    <option value="loan">สินเชื่อบ้าน | Home Loan Inquiry</option>
                    <option value="co-agent">Co-Agent | Partnership</option>
                    <option value="other">อื่นๆ | Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-bold text-[#444]">
                    ข้อความ | Message <span className="text-red-600">*</span>
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
                    className={`${inputCls} min-h-[120px] resize-y`}
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
                  className="bg-primary hover:bg-[#0f3d20] mt-2 h-auto w-full gap-2 py-4 text-base font-bold text-white disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      กำลังส่ง... | Sending...
                    </>
                  ) : (
                    <>ส่งข้อความ | Send Message 🚀</>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Right: Map, Fast Reply, Contact Cards */}
          <div className="flex flex-col gap-6">
            {/* Google Maps — พิกัดจาก Admin */}
            <div className="h-[250px] overflow-hidden rounded-xl border border-border shadow-sm">
              <iframe
                src={mapEmbed}
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="แผนที่ บ้านไออุ่น พร็อพเพอร์ตี้"
                className="h-full w-full"
              />
            </div>

            {/* Fast Reply */}
            <div className="rounded-2xl border border-primary/20 bg-primary-subtle p-8 text-center">
              <h3 className="text-lg font-semibold text-primary">
                ⚡ ต้องการคำตอบเร็วกว่านี้? | Need a Faster Reply?
              </h3>
              <p className="mt-2 text-sm text-[#555]">
                แอดไลน์หรือ WhatsApp หาพิมได้เลย ตอบไวกว่าค่ะ!
                <br />
                Add us on LINE or WhatsApp for the fastest response!
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <a
                  href={lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#00c300] px-6 py-3 text-sm font-bold text-white shadow-[0_4px_6px_rgba(0,195,0,0.2)] transition-colors hover:bg-[#00a600]"
                >
                  💬 แอดไลน์ {lineId}
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#25d366] px-6 py-3 text-sm font-bold text-white shadow-[0_4px_6px_rgba(37,211,102,0.2)] transition-colors hover:bg-[#1ebc59]"
                >
                  <WhatsAppIcon className="size-4" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <a
                href={`tel:${phone.replace(/-/g, "")}`}
                className="flex flex-col gap-2.5 rounded-xl border border-border bg-card p-5 shadow-[0_4px_6px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-md"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-primary-subtle text-lg text-primary">
                  📱
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wide text-[#888] uppercase">
                    โทรศัพท์ | Phone
                  </p>
                  <p className="mt-1 text-base font-medium text-foreground">{phone}</p>
                </div>
              </a>

              <a
                href={`mailto:${email}`}
                className="flex flex-col gap-2.5 rounded-xl border border-border bg-card p-5 shadow-[0_4px_6px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-md"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-primary-subtle text-lg text-primary">
                  ✉️
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wide text-[#888] uppercase">
                    อีเมล | Email
                  </p>
                  <p className="mt-1 truncate text-base font-medium text-foreground">{email}</p>
                </div>
              </a>

              <div className="col-span-full flex flex-col gap-2.5 rounded-xl border border-border bg-card p-5 shadow-[0_4px_6px_rgba(0,0,0,0.02)]">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary-subtle text-lg text-primary">
                  📍
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wide text-[#888] uppercase">
                    ที่อยู่สำนักงาน | Address
                  </p>
                  <p className="mt-1 text-base font-medium text-foreground">{address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
