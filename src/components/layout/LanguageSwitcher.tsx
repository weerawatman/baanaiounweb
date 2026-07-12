"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { cn } from "@/lib/utils"

export default function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const other: Locale = locale === "th" ? "en" : "th"

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: other })}
      className={cn(
        "text-foreground hover:text-primary inline-flex items-center rounded-md border border-border bg-white px-2.5 py-1 text-xs font-medium transition-colors",
        className,
      )}
      aria-label={locale === "th" ? "Switch to English" : "เปลี่ยนเป็นภาษาไทย"}
      title={locale === "th" ? "English" : "ไทย"}
    >
      {locale === "th" ? "EN" : "ไทย"}
    </button>
  )
}
