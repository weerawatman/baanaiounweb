"use client"

import { useState } from "react"
import { useLocale } from "next-intl"
import {
  Loader2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Breadcrumb from "@/components/layout/Breadcrumb"
import PageHeroBanner from "@/components/shared/PageHeroBanner"
import WhatsAppIcon from "@/components/shared/WhatsAppIcon"
import { SITE_CONFIG } from "@/config/site"
import { buildGoogleMapsEmbedUrl } from "@/lib/google-maps"
import { mapContactSubjectToFormTag } from "@/lib/form-validation"
import type { Locale } from "@/i18n/routing"
import { pickLocalized } from "@/lib/i18n/pick-localized"
import type { Profile } from "@/types"

interface FormState {
  name: string
  phone: string
  email: string
  subject: string
  message: string
}

const HOME_CRUMB = { th: "หน้าแรก", en: "Home" } as const
const CONTACT_CRUMB = { th: "ติดต่อเรา", en: "Contact Us" } as const

const FORM_HEADING = { th: "✉️ ส่งข้อความหาเรา", en: "✉️ Send Us a Message" } as const
const SUCCESS_TITLE = { th: "ส่งข้อความเรียบร้อยแล้ว!", en: "Message sent!" } as const
const SUCCESS_BODY = {
  th: "พิมจะติดต่อกลับโดยเร็วที่สุดค่ะ",
  en: "We'll get back to you shortly.",
} as const
const SEND_ANOTHER = { th: "ส่งข้อความอีกครั้ง", en: "Send another" } as const

const LABEL_NAME = { th: "ชื่อ-นามสกุล", en: "Full Name" } as const
const LABEL_PHONE = { th: "เบอร์โทรศัพท์", en: "Phone" } as const
const LABEL_EMAIL = { th: "อีเมล", en: "Email" } as const
const LABEL_SUBJECT = { th: "หัวข้อ", en: "Subject" } as const
const LABEL_MESSAGE = { th: "ข้อความ", en: "Message" } as const

const PLACEHOLDER_NAME = { th: "คุณชื่ออะไรคะ?", en: "What is your name?" } as const
const PLACEHOLDER_MESSAGE = {
  th: "บอกพิมได้เลยค่ะ ว่าสนใจซื้อ ขาย เช่า หรือมีคำถามอะไร...",
  en: "Tell us if you're interested in buying, selling, renting, or have any questions...",
} as const

const SUBJECT_OPTIONS = [
  { value: "", label: { th: "เลือกหัวข้อ", en: "Select Topic" } },
  { value: "buy", label: { th: "ซื้อ/เช่า", en: "Buy / Rent Property" } },
  { value: "sell", label: { th: "ฝากขาย/เช่า", en: "List My Property" } },
  { value: "loan", label: { th: "สินเชื่อบ้าน", en: "Home Loan Inquiry" } },
  { value: "co-agent", label: { th: "Co-Agent", en: "Co-Agent Partnership" } },
  { value: "other", label: { th: "อื่นๆ", en: "Other" } },
] as const

const ERROR_GENERIC = {
  th: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
  en: "Something went wrong. Please try again.",
} as const
const ERROR_NETWORK = {
  th: "ไม่สามารถส่งข้อมูลได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต",
  en: "Could not send your message. Please check your internet connection.",
} as const

const SUBMITTING = { th: "กำลังส่ง...", en: "Sending..." } as const
const SUBMIT = { th: "ส่งข้อความ 🚀", en: "Send Message 🚀" } as const

const FAST_REPLY_HEADING = {
  th: "⚡ ต้องการคำตอบเร็วกว่านี้?",
  en: "⚡ Need a Faster Reply?",
} as const
const FAST_REPLY_BODY = {
  th: "แอดไลน์หรือ WhatsApp หาพิมได้เลย ตอบไวกว่าค่ะ!",
  en: "Add us on LINE or WhatsApp for the fastest response!",
} as const
const LINE_CTA = { th: "แอดไลน์", en: "Add LINE" } as const

const CARD_PHONE = { th: "โทรศัพท์", en: "Phone" } as const
const CARD_EMAIL = { th: "อีเมล", en: "Email" } as const
const CARD_ADDRESS = { th: "ที่อยู่สำนักงาน", en: "Address" } as const

const MAP_TITLE = {
  th: "แผนที่ บ้านไออุ่น พร็อพเพอร์ตี้",
  en: "Baan Ai Oun Property map",
} as const

const inputCls =
  "w-full rounded-lg border border-input bg-muted px-4 py-3 text-[15px] transition-colors focus:border-primary focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"

export default function ContactPage({ profile }: { profile: Profile }) {
  const locale = useLocale() as Locale
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
        setError(body.error ?? pickLocalized(locale, ERROR_GENERIC))
        return
      }

      setSubmitted(true)
    } catch {
      setError(pickLocalized(locale, ERROR_NETWORK))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <Breadcrumb
          items={[
            { label: pickLocalized(locale, HOME_CRUMB), href: "/" },
            { label: pickLocalized(locale, CONTACT_CRUMB) },
          ]}
        />
      </div>

      <PageHeroBanner
        image={profile.heroImageUrl}
        titleTh="ติดต่อเรา"
        titleEn="Contact Us"
        subtitleTh="ส่งข้อความหาพิม หรือแอดไลน์มาได้เลยค่ะ เราตอบทุกข้อความ"
        subtitleEn="Send us a message or add us on LINE — we reply to every message."
      />

      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-10">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] sm:p-10">
            <h2 className="mb-6 border-b-2 border-border pb-4 text-xl font-semibold text-primary">
              {pickLocalized(locale, FORM_HEADING)}
            </h2>

            {submitted ? (
              <div className="py-8 text-center">
                <CheckCircle className="mx-auto size-12 text-green-500" />
                <h3 className="mt-4 text-xl font-bold text-primary">
                  {pickLocalized(locale, SUCCESS_TITLE)}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {pickLocalized(locale, SUCCESS_BODY)}
                </p>
                <Button
                  className="mt-6"
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false)
                    setForm({ name: "", phone: "", email: "", subject: "", message: "" })
                  }}
                >
                  {pickLocalized(locale, SEND_ANOTHER)}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-bold text-foreground">
                    {pickLocalized(locale, LABEL_NAME)} <span className="text-red-600">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={pickLocalized(locale, PLACEHOLDER_NAME)}
                    required
                    value={form.name}
                    onChange={handleChange}
                    disabled={submitting}
                    className={inputCls}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm font-bold text-foreground">
                    {pickLocalized(locale, LABEL_PHONE)} <span className="text-red-600">*</span>
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
                  <label htmlFor="email" className="text-sm font-bold text-foreground">
                    {pickLocalized(locale, LABEL_EMAIL)}
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
                  <label htmlFor="subject" className="text-sm font-bold text-foreground">
                    {pickLocalized(locale, LABEL_SUBJECT)}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    disabled={submitting}
                    className={inputCls}
                  >
                    {SUBJECT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {pickLocalized(locale, opt.label)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-bold text-foreground">
                    {pickLocalized(locale, LABEL_MESSAGE)} <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={pickLocalized(locale, PLACEHOLDER_MESSAGE)}
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
                  className="bg-primary hover:bg-primary/90 mt-2 h-auto w-full gap-2 py-4 text-base font-bold text-white disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      {pickLocalized(locale, SUBMITTING)}
                    </>
                  ) : (
                    pickLocalized(locale, SUBMIT)
                  )}
                </Button>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="h-[250px] overflow-hidden rounded-xl border border-border shadow-sm">
              <iframe
                src={mapEmbed}
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={pickLocalized(locale, MAP_TITLE)}
                className="h-full w-full"
              />
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary-subtle p-8 text-center">
              <h3 className="text-lg font-semibold text-primary">
                {pickLocalized(locale, FAST_REPLY_HEADING)}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {pickLocalized(locale, FAST_REPLY_BODY)}
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <a
                  href={lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#00c300] px-6 py-3 text-sm font-bold text-white shadow-[0_4px_6px_rgba(0,195,0,0.2)] transition-colors hover:bg-[#00a600]"
                >
                  💬 {pickLocalized(locale, LINE_CTA)} {lineId}
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <a
                href={`tel:${phone.replace(/-/g, "")}`}
                className="flex flex-col gap-2.5 rounded-xl border border-border bg-card p-5 shadow-[0_4px_6px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-md"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-primary-subtle text-lg text-primary">
                  📱
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wide text-muted-foreground uppercase">
                    {pickLocalized(locale, CARD_PHONE)}
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
                  <p className="text-xs font-bold tracking-wide text-muted-foreground uppercase">
                    {pickLocalized(locale, CARD_EMAIL)}
                  </p>
                  <p className="mt-1 truncate text-base font-medium text-foreground">{email}</p>
                </div>
              </a>

              <div className="col-span-full flex flex-col gap-2.5 rounded-xl border border-border bg-card p-5 shadow-[0_4px_6px_rgba(0,0,0,0.02)]">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary-subtle text-lg text-primary">
                  📍
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wide text-muted-foreground uppercase">
                    {pickLocalized(locale, CARD_ADDRESS)}
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
