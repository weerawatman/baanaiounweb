"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"
import { locales, type Locale } from "@/i18n/routing"
import { cn } from "@/lib/utils"

const LOCALE_LABEL: Record<Locale, { short: string; aria: string }> = {
  th: { short: "TH", aria: "ภาษาไทย" },
  en: { short: "EN", aria: "English" },
}

export default function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  function switchTo(target: Locale) {
    if (target !== locale) {
      router.replace(pathname, { locale: target })
    }
  }

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn("inline-flex items-center gap-1.5", className)}
    >
      {locales.map((code, index) => {
        const isActive = locale === code
        const { short, aria } = LOCALE_LABEL[code]

        return (
          <span key={code} className="inline-flex items-center gap-1.5">
            {index > 0 && (
              <span className="text-border select-none text-xs font-light" aria-hidden="true">
                |
              </span>
            )}
            <button
              type="button"
              onClick={() => switchTo(code)}
              aria-label={aria}
              aria-pressed={isActive}
              className={cn(
                "rounded-md px-2 py-0.5 text-xs font-semibold tracking-wide transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-primary-subtle hover:text-primary",
              )}
            >
              {short}
            </button>
          </span>
        )
      })}
    </div>
  )
}
