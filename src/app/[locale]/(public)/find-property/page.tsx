export { generateMetadata } from "./FindPropertyPage"
import { getProfile } from "@/lib/queries/profile"
import { getFaqsByPage } from "@/lib/queries/faqs"
import { mapFaq } from "@/lib/mappers"
import { mapFaqsToItems } from "@/lib/faq-items"
import { buildBentoItems, pickHeroImage } from "@/lib/page-images"
import { FIND_PROPERTY_CONTENT } from "@/content/find-property"
import FindPropertyPage from "./FindPropertyPage"

export const revalidate = 1800

export default async function FindPropertyRoute() {
  const [profile, faqRows] = await Promise.all([getProfile(), getFaqsByPage("find-property")])
  const faqs = mapFaqsToItems(faqRows.map(mapFaq))
  const bentoItems = buildBentoItems(
    [
      profile.findPropertyBento1Image,
      profile.findPropertyBento2Image,
      profile.findPropertyBento3Image,
    ],
    [...FIND_PROPERTY_CONTENT.bentoSlots],
  )
  const heroImage = pickHeroImage(
    profile.findPropertyHeroImage,
    profile.servicesHeroImage,
    profile.heroImageUrl,
  )

  return (
    <FindPropertyPage
      heroImage={heroImage}
      teamImage={profile.matchTeamImage || undefined}
      bentoItems={bentoItems}
      faqs={faqs}
    />
  )
}
