import type { Metadata } from "next"
import { getLocale } from "next-intl/server"
import { getProfile } from "@/lib/queries/profile"
import { getFaqsByPage } from "@/lib/queries/faqs"
import { mapFaq } from "@/lib/mappers"
import { getLocalizedFaqItems } from "@/lib/faq-items"
import { COAGENT_CONTENT } from "@/content/co-agent"
import { SITE_CONFIG } from "@/config/site"
import type { Locale } from "@/i18n/routing"
import { pickLocalized, pickPipeBilingual } from "@/lib/i18n/pick-localized"
import CoAgentPage from "./CoAgentPage"

export const revalidate = 1800

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale
  const { seo } = COAGENT_CONTENT
  const { buildPageMetadata } = await import("@/lib/i18n/metadata")

  return buildPageMetadata({
    locale,
    pathname: "/co-agent",
    title: pickPipeBilingual(locale, seo.title),
    description: pickLocalized(locale, seo.description),
  })
}

export default async function CoAgentRoute() {
  const [profile, faqRows] = await Promise.all([getProfile(), getFaqsByPage("co-agent")])
  const faqs = await getLocalizedFaqItems(faqRows.map(mapFaq))

  return (
    <CoAgentPage
      heroImage={profile.coAgentHeroImage || undefined}
      splitImage={profile.coAgentSplitImage || undefined}
      lineUrl={profile.lineUrl || SITE_CONFIG.lineUrl}
      faqs={faqs}
    />
  )
}
