export { generateMetadata } from "./FindPropertyPage"
import { setRequestLocale } from "next-intl/server"
import type { LocaleParams } from "@/i18n/routing"
import { getProfile } from "@/lib/queries/profile"
import { getPageFaqs } from "@/lib/faq-items"
import { buildBentoItems, pickHeroImage } from "@/lib/page-images"
import { FIND_PROPERTY_CONTENT } from "@/content/find-property"
import FindPropertyPage from "./FindPropertyPage"

export const revalidate = 1800

export default async function FindPropertyRoute({
  params,
}: {
  params: LocaleParams
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const [profile, faqs] = await Promise.all([getProfile(), getPageFaqs("find-property")])
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
