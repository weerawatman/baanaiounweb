import type { Locale } from "@/i18n/routing"
import { pickLocalized, type BilingualPair } from "./pick-localized"

/** Single-locale nav label (replaces combined "ไทย | English" for body/nav). */
export function navText(item: BilingualPair, locale: Locale): string {
  return pickLocalized(locale, item)
}
