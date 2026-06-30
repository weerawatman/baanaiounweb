import type { Metadata } from "next"
import { getActiveProperties } from "@/lib/queries/properties"
import { getTestimonials } from "@/lib/queries/testimonials"
import { getFaqsByPage } from "@/lib/queries/faqs"
import { getProfile } from "@/lib/queries/profile"
import { mapProperty, mapTestimonial, mapFaq } from "@/lib/mappers"
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
  const [propertyRows, testimonialRows, faqRows, profile] = await Promise.all([
    getActiveProperties(),
    getTestimonials(),
    getFaqsByPage("home"),
    getProfile(),
  ])

  const properties = propertyRows.map(mapProperty)
  const testimonials = testimonialRows.map(mapTestimonial)
  const faqs = faqRows.map(mapFaq)

  return (
    <HomePage
      properties={properties}
      testimonials={testimonials}
      faqs={faqs}
      heroImage={profile.heroImageUrl}
      lineUrl={profile.lineUrl}
    />
  )
}
