"use client"

import { useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import { MessageCircle, Phone } from "lucide-react"
import PageSection from "@/components/layout/PageSection"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/routing"
import { pickLocalized } from "@/lib/i18n/pick-localized"

const DEFAULT_TITLE = {
  th: "ปรึกษาเรื่องอสังหาฯ ฟรีกับพิม",
  en: "Free real estate consultation with Pim",
} as const
const DEFAULT_SUBTITLE = {
  th: "คุยง่าย ตรงไปตรงมา ไม่มีค่าใช้จ่ายในการปรึกษา",
  en: "Easy, straightforward chat — consultation is free.",
} as const
const LINE_CTA = { th: "ทักแชทปรึกษาฟรี", en: "Free LINE Chat" } as const
const CALL_CTA = { th: "โทรด่วน", en: "Call Now" } as const

interface LineClosingCtaProps {
  lineUrl: string
  phoneUrl?: string
  variant?: "primary" | "warm"
  titleTh?: string
  titleEn?: string
  subtitleTh?: string
  subtitleEn?: string
  locationTh?: string
  locationEn?: string
  lineTestId?: string
  secondaryLinks?: { href: string; label: string }[]
}

export default function LineClosingCta({
  lineUrl,
  phoneUrl,
  variant = "primary",
  titleTh = DEFAULT_TITLE.th,
  titleEn = DEFAULT_TITLE.en,
  subtitleTh = DEFAULT_SUBTITLE.th,
  subtitleEn = DEFAULT_SUBTITLE.en,
  locationTh,
  locationEn,
  lineTestId,
  secondaryLinks,
}: LineClosingCtaProps) {
  const locale = useLocale() as Locale
  const isPrimary = variant === "primary"
  const pick = (th: string, en: string) => pickLocalized(locale, { th, en })

  return (
    <PageSection variant={variant}>
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        {(locationTh || locationEn) && (
          <div className="w-full border-y border-border py-8">
            {locationTh && locale !== "en" && (
              <p className="text-base leading-relaxed text-foreground/90">{locationTh}</p>
            )}
            {locationEn && locale === "en" && (
              <p className="text-base leading-relaxed text-foreground/90">{locationEn}</p>
            )}
            {!locationEn && locationTh && locale === "en" && (
              <p className="text-base leading-relaxed text-foreground/90">{locationTh}</p>
            )}
            {!locationTh && locationEn && locale !== "en" && (
              <p className="text-base leading-relaxed text-foreground/90">{locationEn}</p>
            )}
          </div>
        )}
        <h2
          className={cn(
            "text-2xl font-bold sm:text-3xl",
            isPrimary ? "text-primary-foreground" : "text-foreground",
          )}
        >
          {pick(titleTh, titleEn)}
        </h2>
        <p
          className={cn(
            "text-base",
            isPrimary ? "text-primary-foreground/90" : "text-muted-foreground",
          )}
        >
          {pick(subtitleTh, subtitleEn ?? "")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={lineTestId}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-8 py-3 text-sm font-semibold shadow-md transition-opacity hover:opacity-90",
              isPrimary ? "bg-card text-primary" : "bg-[#06C755] text-white",
            )}
          >
            <MessageCircle className="size-5" />
            {pick(LINE_CTA.th, LINE_CTA.en)}
          </a>
          {phoneUrl && (
            <a
              href={phoneUrl}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border-2 px-8 py-3 text-sm font-semibold transition-colors",
                isPrimary
                  ? "border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
                  : "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
              )}
            >
              <Phone className="size-5" />
              {pick(CALL_CTA.th, CALL_CTA.en)}
            </a>
          )}
        </div>
        {secondaryLinks && secondaryLinks.length > 0 && (
          <p
            className={cn(
              "text-sm",
              isPrimary ? "text-primary-foreground/75" : "text-muted-foreground",
            )}
          >
            {secondaryLinks.map((link, i) => (
              <span key={link.href}>
                {i > 0 && " · "}
                <Link href={link.href} className="underline-offset-2 hover:underline">
                  {link.label}
                </Link>
              </span>
            ))}
          </p>
        )}
      </div>
    </PageSection>
  )
}
