"use client"

import { motion } from "framer-motion"
import { useLocale } from "next-intl"
import { MessageCircle } from "lucide-react"
import { SITE_CONFIG } from "@/config/site"
import type { Locale } from "@/i18n/routing"
import { pickLocalized } from "@/lib/i18n/pick-localized"

const CTA_LABEL = { th: "ปรึกษาพิมฟรี", en: "Free chat with Pim" } as const

export default function StickyCTA({ lineUrl }: { lineUrl: string }) {
  const locale = useLocale() as Locale
  const url = lineUrl || SITE_CONFIG.lineUrl

  return (
    <div className="fixed right-6 bottom-6 z-50 hidden md:block">
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-primary flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        aria-label={pickLocalized(locale, CTA_LABEL)}
      >
        <MessageCircle className="size-5 shrink-0" />
        {pickLocalized(locale, CTA_LABEL)}
      </motion.a>
    </div>
  )
}
