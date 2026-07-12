import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import type { Locale } from "@/i18n/routing"
import { getProfile } from "@/lib/queries/profile"
import { getPageFaqs } from "@/lib/faq-items"
import { COAGENT_CONTENT } from "@/content/co-agent"
import { SITE_CONFIG } from "@/config/site"
import { createPageMetadata } from "@/lib/i18n/metadata"
import CoAgentPage from "./CoAgentPage"

export const revalidate = 1800

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const { seo } = COAGENT_CONTENT
  return createPageMetadata({
    locale,
    pathname: "/co-agent",
    title: seo.title,
    description: seo.description,
  })
}

export default async function CoAgentRoute({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const [profile, faqs] = await Promise.all([getProfile(), getPageFaqs("co-agent")])

  return (
    <CoAgentPage
      heroImage={profile.coAgentHeroImage || undefined}
      splitImage={profile.coAgentSplitImage || undefined}
      lineUrl={profile.lineUrl || SITE_CONFIG.lineUrl}
      faqs={faqs}
    />
  )
}
