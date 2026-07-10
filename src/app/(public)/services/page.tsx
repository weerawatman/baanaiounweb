import type { Metadata } from "next"
import { getProfile } from "@/lib/queries/profile"
import ServicesHubPage from "./ServicesHubPage"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "บริการของเรา | Our Services — บ้านไออุ่น พร็อพเพอร์ตี้",
  description:
    "ศูนย์รวมทางลัดความสำเร็จในโลกอสังหาฯ ฝากขาย ค้นหาทรัพย์ Co-Agent คอร์สนายหน้า กรุงเทพฯ ชลบุรี EEC",
  openGraph: {
    title: "บริการของเรา | Our Real Estate Services — Baan Ai Oun Property",
    description:
      "Your shortcut to real estate success — listing, matchmaking, co-agent network, and agent training across Bangkok, Chonburi, and EEC.",
  },
}

export default async function ServicesRoute() {
  const profile = await getProfile()

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
        trustImages={{
          renovation: profile.trustRenovationImage,
          network: profile.trustNetworkImage,
          shopper: profile.trustShopperImage,
        }}
      />
    </>
  )
}
