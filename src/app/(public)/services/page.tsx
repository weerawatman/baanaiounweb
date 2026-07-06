import type { Metadata } from "next"
import { getProfile } from "@/lib/queries/profile"
import { getPublishedSuccessStories } from "@/lib/queries/success-stories"
import { mapSuccessStory } from "@/lib/mappers"
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
  const [profile, storyRows] = await Promise.all([getProfile(), getPublishedSuccessStories()])
  const successStories = storyRows.map(mapSuccessStory)

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
        heroImageUrl={profile.heroImageUrl}
        lineUrl={profile.lineUrl}
        successStories={successStories}
      />
    </>
  )
}
