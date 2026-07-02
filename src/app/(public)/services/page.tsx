import type { Metadata } from "next"
import { getProfile } from "@/lib/queries/profile"
import ServicesHubPage from "./ServicesHubPage"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "บริการของเรา | Our Services — บ้านไออุ่น พร็อพเพอร์ตี้",
  description:
    "บริการอสังหาริมทรัพย์ครบวงจร ซื้อ ขาย เช่า Co-Agent คอร์สนายหน้า บ้านบึง ชลบุรี EEC นิคมอมตะ เหมราช",
  openGraph: {
    title: "บริการของเรา | Our Real Estate Services — Baan Ai Oun Property",
    description:
      "Full-service real estate: Buy, Sell, Rent, Co-Agent Network, Agent Course. Serving Ban Bueng, Chonburi, EEC and beyond.",
  },
}

export default async function ServicesRoute() {
  const profile = await getProfile()

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "บริการอสังหาริมทรัพย์ บ้านไออุ่น พร็อพเพอร์ตี้",
    provider: { "@type": "RealEstateAgent", name: "บ้านไออุ่น พร็อพเพอร์ตี้" },
    areaServed: { "@type": "City", name: "บ้านบึง ชลบุรี" },
    serviceType: ["ซื้อขายบ้าน", "เช่าอสังหาริมทรัพย์", "ฝากขาย", "Co-Agent Network", "คอร์สนายหน้า"],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <ServicesHubPage heroImageUrl={profile.heroImageUrl} />
    </>
  )
}
