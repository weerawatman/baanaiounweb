import { BASE_URL } from "@/config/site"
import type { Metadata } from "next"
import { routing, type Locale } from "@/i18n/routing"
import { pickLocalized, pickPipeBilingual, type BilingualPair } from "./pick-localized"


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

/**
 * Build hreflang metadata for a static page in the given locale.
 * Locale must come from route params (not getLocale()) so generateMetadata
 * stays statically renderable — getLocale() without setRequestLocale reads
 * request headers and opts the whole route into dynamic rendering.
 */
export function createPageMetadata({
  locale,
  pathname,
  title,
  description,
}: {
  locale: Locale
  pathname: string
  title: PageTitle
  description: BilingualPair
}): Metadata {
  return buildPageMetadata({
    locale,
    pathname,
    title: resolvePageTitle(locale, title),
    description: pickLocalized(locale, description),
  })
}
