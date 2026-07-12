"use client"

import { useState } from "react"
import { useLocale } from "next-intl"
import { SITE_CONFIG } from "@/config/site"
import type { Locale } from "@/i18n/routing"
import { pickLocalized } from "@/lib/i18n/pick-localized"

const HEADING = {
  th: "ไม่พลาดทุกเคสรีโนเวทและทำเลทอง",
  en: "Never miss renovation case studies and prime locations",
} as const
const BODY = {
  th: "สมัครรับข่าวสารจากเรา เพื่อรับเคล็ดลับอสังหาฯ อัปเดตทำเลน่าลงทุน และเคสศึกษาฉบับเจาะลึก ส่งตรงถึงอีเมลคุณ",
  en: "Subscribe for tips, location updates, and in-depth case studies delivered to your inbox.",
} as const
const PLACEHOLDER = { th: "กรอกอีเมลของคุณ...", en: "Your email" } as const
const SUBSCRIBE = { th: "ติดตามข่าวสาร", en: "Subscribe" } as const
const THANKS = { th: "ขอบคุณที่สมัครรับข่าวสารค่ะ!", en: "Thank you for subscribing!" } as const
const FOLLOW_LINE = {
  th: "ติดตามอัปเดตได้ที่ LINE:",
  en: "Follow us on LINE for updates:",
} as const

export default function NewsletterBanner() {
  const locale = useLocale() as Locale
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        className="mb-14 rounded-[20px] bg-primary px-6 py-12 text-center text-primary-foreground shadow-lg sm:px-10"
        data-testid="newsletter-banner"
      >
        <p className="text-lg font-bold text-secondary">{pickLocalized(locale, THANKS)}</p>
        <p className="mt-2 text-sm text-primary-foreground/85">
          {pickLocalized(locale, FOLLOW_LINE)}{" "}
          <a href={SITE_CONFIG.lineUrl} className="underline">
            {SITE_CONFIG.lineId}
          </a>
        </p>
      </div>
    )
  }

  return (
    <div
      className="mb-14 rounded-[20px] bg-primary px-6 py-12 text-center text-primary-foreground shadow-lg sm:px-10"
      data-testid="newsletter-banner"
    >
      <h3 className="text-2xl font-bold text-secondary sm:text-3xl">
        {pickLocalized(locale, HEADING)}
      </h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
        {pickLocalized(locale, BODY)}
      </p>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-6 flex w-full max-w-lg flex-col gap-3 sm:flex-row"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={pickLocalized(locale, PLACEHOLDER)}
          className="min-h-[52px] flex-1 rounded-full border border-white/30 bg-white px-5 py-3 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/40"
        />
        <button
          type="submit"
          className="min-h-[52px] rounded-full bg-secondary px-8 py-3 text-sm font-bold text-secondary-foreground transition-colors hover:bg-secondary/90"
        >
          {pickLocalized(locale, SUBSCRIBE)}
        </button>
      </form>
    </div>
  )
}
