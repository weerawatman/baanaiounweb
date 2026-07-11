import { getFaqsByPage } from "@/lib/queries/faqs"
import { getProfile } from "@/lib/queries/profile"
import { mapFaq } from "@/lib/mappers"
import { mapFaqsToItems } from "@/lib/faq-items"
import { buildBentoItems, pickHeroImage } from "@/lib/page-images"
import { LIST_PROPERTY_CONTENT } from "@/content/list-property"
import ListPropertyPage, { generateMetadata } from "./ListPropertyPage"

export { generateMetadata }
export const revalidate = 1800

export default async function ListPropertyRoute() {
  const [profile, faqRows] = await Promise.all([getProfile(), getFaqsByPage("owners")])
  const faqs = mapFaqsToItems(faqRows.map(mapFaq))
  const bentoItems = buildBentoItems(
    [
      profile.listPropertyBento1Image,
      profile.listPropertyBento2Image,
      profile.listPropertyBento3Image,
    ],
    [...LIST_PROPERTY_CONTENT.bentoSlots],
  )
  const heroImage = pickHeroImage(
    profile.listPropertyHeroImage,
    profile.servicesHeroImage,
    profile.heroImageUrl,
  )

  return (
    <ListPropertyPage heroImage={heroImage} bentoItems={bentoItems} faqs={faqs} />
  )
}
