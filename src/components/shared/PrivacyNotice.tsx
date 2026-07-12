"use client"

import { useLocale } from "next-intl"
import { Shield } from "lucide-react"
import { FORM_PRIVACY_NOTICE } from "@/content/form-options"
import type { Locale } from "@/i18n/routing"
import { pickLocalized } from "@/lib/i18n/pick-localized"

export default function PrivacyNotice() {
  const locale = useLocale() as Locale

  return (
    <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
      <Shield className="size-3.5 shrink-0" />
      <span>{pickLocalized(locale, FORM_PRIVACY_NOTICE)}</span>
    </p>
  )
}
