import { defineRouting } from "next-intl/routing"

export const locales = ["th", "en"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "th"

/**
 * Route params for pages under the [locale] segment. Pages await this and
 * call setRequestLocale(locale) first thing — required for static rendering
 * (see ARCHITECTURE.md). Extend for extra dynamic segments:
 * `LocaleParams<{ slug: string }>`.
 */
export type LocaleParams<Extra = unknown> = Promise<{ locale: Locale } & Extra>

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  localeDetection: false,
})
