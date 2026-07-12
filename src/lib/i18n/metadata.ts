import type { Metadata } from "next"
import { getLocale } from "next-intl/server"
import { routing, type Locale } from "@/i18n/routing"
import { pickLocalized, pickPipeBilingual, type BilingualPair } from "./pick-localized"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.baanaioun.com"

type PageTitle = string | BilingualPair

function resolvePageTitle(locale: Locale, title: PageTitle): string {
  if (typeof title === "string") {
    return title.includes(" | ") ? pickPipeBilingual(locale, title) : title
  }
  return pickLocalized(locale, title)
}

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

/** Resolve locale from the current request and build hreflang metadata for a static page. */
export async function createPageMetadata({
  pathname,
  title,
  description,
}: {
  pathname: string
  title: PageTitle
  description: BilingualPair
}): Promise<Metadata> {
  const locale = (await getLocale()) as Locale
  return buildPageMetadata({
    locale,
    pathname,
    title: resolvePageTitle(locale, title),
    description: pickLocalized(locale, description),
  })
}
