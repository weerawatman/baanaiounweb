import type { Locale } from "@/i18n/routing"
import { pickLocalized, type BilingualPair } from "./pick-localized"

export const HOME_CRUMB: BilingualPair = { th: "หน้าแรก", en: "Home" }

export function homeCrumb(locale: Locale) {
  return { label: pickLocalized(locale, HOME_CRUMB), href: "/" as const }
}

export function localizedCrumb(locale: Locale, label: BilingualPair, href?: string) {
  return href
    ? { label: pickLocalized(locale, label), href }
    : { label: pickLocalized(locale, label) }
}
