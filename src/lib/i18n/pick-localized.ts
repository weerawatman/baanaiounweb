import type { Locale } from "@/i18n/routing"

export type BilingualPair = { th: string; en: string }

/** Pick one language from a static content pair. */
export function pickLocalized(locale: Locale, pair: BilingualPair): string {
  return locale === "en" ? pair.en : pair.th
}

/** Pick EN when available; otherwise fall back to Thai (for CMS fields). */
export function localizedOrFallback(locale: Locale, th: string, en: string): string {
  if (locale === "en" && en.trim()) return en
  return th
}

export function pickPipeBilingual(locale: Locale, text: string): string {
  const sep = " | "
  const idx = text.indexOf(sep)
  if (idx === -1) return text
  return pickLocalized(locale, { th: text.slice(0, idx), en: text.slice(idx + sep.length) })
}
