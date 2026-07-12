import type { Metadata } from "next"
import { getProfile } from "@/lib/queries/profile"
import { getPageFaqs } from "@/lib/faq-items"
import { SERVICES_HUB_CONTENT } from "@/content/services-hub"
import { createPageMetadata } from "@/lib/i18n/metadata"
import ServicesHubPage from "./ServicesHubPage"

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = SERVICES_HUB_CONTENT
  return createPageMetadata({
    pathname: "/services",
    title: seo.title,
    description: seo.description,
  })
}

export default async function ServicesRoute() {
  const [profile, faqs] = await Promise.all([getProfile(), getPageFaqs("services")])

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
