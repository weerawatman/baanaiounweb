import type { Metadata } from "next"
import { routing, type Locale } from "@/i18n/routing"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.baanaioun.com"

function localePath(locale: Locale, pathname: string): string {
  if (locale === routing.defaultLocale) {
    return pathname === "/" ? "" : pathname
  }
  return pathname === "/" ? "/en" : `/en${pathname}`
}

export function localeUrl(locale: Locale, pathname: string): string {
  return `${BASE_URL}${localePath(locale, pathname)}`
}

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
}: {
  locale: Locale
  pathname: string
  title: string
  description: string
}): Metadata {
  const canonical = localeUrl(locale, pathname)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: locale === "en" ? "en_US" : "th_TH",
      url: canonical,
    },
    alternates: {
      canonical,
      languages: {
        th: localeUrl("th", pathname),
        en: localeUrl("en", pathname),
        "x-default": localeUrl("th", pathname),
      },
    },
  }
}
