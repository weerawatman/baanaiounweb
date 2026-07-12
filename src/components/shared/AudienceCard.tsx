"use client"

import { useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import type { LucideIcon } from "lucide-react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/routing"
import { pickLocalized } from "@/lib/i18n/pick-localized"

const LEARN_MORE = { th: "อ่านรายละเอียด", en: "Learn More" } as const

interface AudienceCardProps {
  href: string
  icon: LucideIcon
  accentColor: string
  titleTh: string
  titleEn: string
  descTh: string
  descEn: string
  highlightTh?: string
  highlightEn?: string
  className?: string
  variant?: "light" | "dark"
  ctaTh?: string
  ctaEn?: string
  secondaryHref?: string
}

export default function AudienceCard({
  href,
  icon: Icon,
  accentColor,
  titleTh,
  titleEn,
  descTh,
  descEn,
  highlightTh,
  highlightEn,
  className,
  variant = "light",
  ctaTh,
  ctaEn,
  secondaryHref,
}: AudienceCardProps) {
  const locale = useLocale() as Locale
  const pick = (th: string, en: string) => pickLocalized(locale, { th, en })

  if (variant === "dark") {
    return (
      <div
        className={cn(
          "flex h-full flex-col items-center rounded-2xl bg-primary p-6 text-center shadow-sm",
          className,
        )}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
          <Icon size={30} className="text-white" />
        </div>

        <h3 className="mt-4 text-base font-bold leading-snug text-white">
          {pick(titleTh, titleEn)}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/90">
          {pick(descTh, descEn)}
        </p>

        <div className="mt-5 flex w-full flex-col gap-2">
          <Link
            href={href}
            className="rounded-full bg-secondary px-4 py-2.5 text-sm font-bold text-secondary-foreground transition-opacity hover:opacity-90"
          >
            {pick(ctaTh ?? titleTh, ctaEn ?? titleEn)}
          </Link>
          {secondaryHref && (
            <Link
              href={secondaryHref}
              className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {pickLocalized(locale, LEARN_MORE)}
            </Link>
          )}
        </div>
      </div>
    )
  }

  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm",
        "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${accentColor}18` }}
      >
        <Icon size={24} style={{ color: accentColor }} />
      </div>

      <h3 className="mt-4 text-base font-bold leading-snug text-foreground">
        {pick(titleTh, titleEn)}
      </h3>

      {highlightTh && (
        <p className="mt-2 text-xs font-semibold text-primary">
          {pick(highlightTh, highlightEn ?? highlightTh)}
        </p>
      )}

      <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/90">
        {pick(descTh, descEn)}
      </p>

      <span
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold transition-colors"
        style={{ color: accentColor }}
      >
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}
