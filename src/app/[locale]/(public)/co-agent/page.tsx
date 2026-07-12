import type { Metadata } from "next"
import { getProfile } from "@/lib/queries/profile"
import { getPageFaqs } from "@/lib/faq-items"
import { COAGENT_CONTENT } from "@/content/co-agent"
import { SITE_CONFIG } from "@/config/site"
import { createPageMetadata } from "@/lib/i18n/metadata"
import CoAgentPage from "./CoAgentPage"

export const revalidate = 1800

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = COAGENT_CONTENT
  return createPageMetadata({
    pathname: "/co-agent",
    title: seo.title,
    description: seo.description,
  })
}

export default async function CoAgentRoute() {
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
