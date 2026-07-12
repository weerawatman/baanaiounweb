import { setRequestLocale } from "next-intl/server"
import type { LocaleParams } from "@/i18n/routing"
import { getPageFaqs } from "@/lib/faq-items"
import { getProfile } from "@/lib/queries/profile"
import { buildBentoItems, pickHeroImage } from "@/lib/page-images"
import { LIST_PROPERTY_CONTENT } from "@/content/list-property"
import ListPropertyPage, { generateMetadata } from "./ListPropertyPage"

export { generateMetadata }
export const revalidate = 1800

export default async function ListPropertyRoute({
  params,
}: {
  params: LocaleParams
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const [profile, faqs] = await Promise.all([getProfile(), getPageFaqs("list-property")])
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
  const quoteImage = pickHeroImage(
    profile.listPropertyHeroImage,
    profile.servicesHeroImage,
    profile.heroImageUrl,
  )

  return (
    <ListPropertyPage heroImage={heroImage} quoteImage={quoteImage} bentoItems={bentoItems} faqs={faqs} />
  )
}
