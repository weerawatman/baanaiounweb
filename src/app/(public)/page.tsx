import type { Metadata } from "next"
import { getActiveProperties } from "@/lib/queries/properties"
import { getProfile } from "@/lib/queries/profile"
import { getFaqsByPage } from "@/lib/queries/faqs"
import { mapProperty, mapFaq } from "@/lib/mappers"
import { mapFaqsToItems } from "@/lib/faq-items"
import HomePage from "./HomePage"

export const revalidate = 900

export const metadata: Metadata = {
  title: "บ้านไออุ่น พร็อพเพอร์ตี้ — จบทุกความต้องการเรื่องอสังหาฯ บ้านบึง ชลบุรี",
  description:
    "บ้านไออุ่น คัดสรรบ้านขาย บ้านเช่า ที่ดิน ในเขตบ้านบึง ชลบุรี ใกล้นิคมอมตะ เหมราช โดยพิม นายหน้าที่ดูแลด้วยหัวใจ",
  openGraph: {
    title: "บ้านไออุ่น พร็อพเพอร์ตี้ — จบทุกความต้องการเรื่องอสังหาฯ",
    description:
      "บ้านไออุ่น คัดสรรบ้านขาย บ้านเช่า ที่ดิน ในเขตบ้านบึง ชลบุรี ใกล้นิคมอมตะ เหมราช โดยพิม นายหน้าที่ดูแลด้วยหัวใจ",
  },
}

export default async function HomeRoute() {
  const [propertyRows, profile, faqRows] = await Promise.all([
    getActiveProperties(),
    getProfile(),
    getFaqsByPage("home"),
  ])

  const properties = propertyRows.map(mapProperty)
  const faqs = mapFaqsToItems(faqRows.map(mapFaq))

  return (
    <HomePage
      properties={properties}
      heroImage={profile.homeHeroImage || profile.heroImageUrl}
      faqs={faqs}
    />
  )
}
