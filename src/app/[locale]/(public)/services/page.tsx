import type { Metadata } from "next"
import { getLocale } from "next-intl/server"
import { getProfile } from "@/lib/queries/profile"
import { getFaqsByPage } from "@/lib/queries/faqs"
import { mapFaq } from "@/lib/mappers"
import { getLocalizedFaqItems } from "@/lib/faq-items"
import { SERVICES_HUB_CONTENT } from "@/content/services-hub"
import type { Locale } from "@/i18n/routing"
import { pickLocalized, pickPipeBilingual } from "@/lib/i18n/pick-localized"
import ServicesHubPage from "./ServicesHubPage"

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale
  const { seo } = SERVICES_HUB_CONTENT
  const { buildPageMetadata } = await import("@/lib/i18n/metadata")

  return buildPageMetadata({
    locale,
    pathname: "/services",
    title: pickPipeBilingual(locale, seo.title),
    description: pickLocalized(locale, seo.description),
  })
}

export default async function ServicesRoute() {
  const [profile, faqRows] = await Promise.all([getProfile(), getFaqsByPage("services")])
  const faqs = await getLocalizedFaqItems(faqRows.map(mapFaq))

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "บริการอสังหาริมทรัพย์ บ้านไออุ่น พร็อพเพอร์ตี้",
    provider: { "@type": "RealEstateAgent", name: "บ้านไออุ่น พร็อพเพอร์ตี้" },
    areaServed: [
      "กรุงเทพฯ",
      "สมุทรปราการ",
      "ชลบุรี",
      "ฉะเชิงเทรา",
      "EEC",
      "บ้านบึง",
    ],
    serviceType: ["ฝากขาย", "ค้นหาทรัพย์", "สินเชื่อ", "Co-Agent", "คอร์สนายหน้า"],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <ServicesHubPage
        servicesHeroImage={profile.servicesHeroImage}
        heroImageUrl={profile.heroImageUrl}
        lineUrl={profile.lineUrl}
        whyChooseImage={profile.servicesWhyChooseImage}
        trustImages={{
          renovation: profile.trustRenovationImage,
          network: profile.trustNetworkImage,
          shopper: profile.trustShopperImage,
        }}
        faqs={faqs}
      />
    </>
  )
}
