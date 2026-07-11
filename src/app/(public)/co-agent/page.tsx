import type { Metadata } from "next"
import { getProfile } from "@/lib/queries/profile"
import { getFaqsByPage } from "@/lib/queries/faqs"
import { mapFaq } from "@/lib/mappers"
import { mapFaqsToItems } from "@/lib/faq-items"
import { COAGENT_CONTENT } from "@/content/co-agent"
import { SITE_CONFIG } from "@/config/site"
import CoAgentPage from "./CoAgentPage"

export const revalidate = 1800

export function generateMetadata(): Metadata {
  return {
    title: COAGENT_CONTENT.seo.title,
    description: COAGENT_CONTENT.seo.description.th,
    openGraph: {
      title: COAGENT_CONTENT.seo.title,
      description: COAGENT_CONTENT.seo.description.en,
    },
  }
}

export default async function CoAgentRoute() {
  const [profile, faqRows] = await Promise.all([getProfile(), getFaqsByPage("co-agent")])
  const faqs = mapFaqsToItems(faqRows.map(mapFaq))

  return (
    <CoAgentPage
      heroImage={profile.coAgentHeroImage || undefined}
      splitImage={profile.coAgentSplitImage || undefined}
      lineUrl={profile.lineUrl || SITE_CONFIG.lineUrl}
      faqs={faqs}
    />
  )
}
