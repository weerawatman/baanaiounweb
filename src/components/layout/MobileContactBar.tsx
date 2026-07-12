"use client"

import { useLocale } from "next-intl"
import { Phone, MessageCircle } from "lucide-react"
import WhatsAppIcon from "@/components/shared/WhatsAppIcon"
import type { Locale } from "@/i18n/routing"
import { pickLocalized } from "@/lib/i18n/pick-localized"

const NAV_LABEL = { th: "ติดต่อด่วน", en: "Quick contact" } as const
const CALL_LABEL = { th: "โทร", en: "Call" } as const
const LINE_ARIA = { th: "แชท LINE", en: "Chat on LINE" } as const
const WA_ARIA = { th: "แชท WhatsApp", en: "Chat on WhatsApp" } as const

interface MobileContactBarProps {
  phone: string
  lineUrl: string
  whatsappUrl: string
}

export default function MobileContactBar({ phone, lineUrl, whatsappUrl }: MobileContactBarProps) {
  const locale = useLocale() as Locale
  const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`
  const pick = (pair: { th: string; en: string }) => pickLocalized(locale, pair)

  const itemClass =
    "flex min-h-[56px] flex-col items-center justify-center gap-0.5 text-[11px] font-semibold"

  return (
    <nav
      aria-label={pick(NAV_LABEL)}
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-border bg-card pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_10px_rgba(45,90,39,0.08)] md:hidden"
    >
      <a href={telHref} className={`${itemClass} text-primary`} aria-label={`${pick(CALL_LABEL)} ${phone}`}>
        <Phone className="size-5" />
        {pick(CALL_LABEL)}
      </a>
      <a
        href={lineUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${itemClass} text-[#06C755]`}
        aria-label={pick(LINE_ARIA)}
      >
        <MessageCircle className="size-5" />
        LINE
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${itemClass} text-[#25D366]`}
        aria-label={pick(WA_ARIA)}
      >
        <WhatsAppIcon className="size-5" />
        WhatsApp
      </a>
    </nav>
  )
}
