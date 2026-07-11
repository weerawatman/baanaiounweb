import type { Metadata } from "next"
import { getActiveProperties } from "@/lib/queries/properties"
import { getProfile } from "@/lib/queries/profile"
import { getFaqsByPage } from "@/lib/queries/faqs"
import { getTestimonials } from "@/lib/queries/testimonials"
import { getPublishedSuccessStories } from "@/lib/queries/success-stories"
import { mapProperty, mapFaq, mapTestimonial, mapSuccessStory } from "@/lib/mappers"
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
  const [propertyRows, profile, faqRows, testimonialRows, storyRows] = await Promise.all([
    getActiveProperties(),
    getProfile(),
    getFaqsByPage("home"),
    getTestimonials(),
    getPublishedSuccessStories(),
  ])

  const properties = propertyRows.map(mapProperty)
  const faqs = mapFaqsToItems(faqRows.map(mapFaq))
  const testimonials = testimonialRows.map(mapTestimonial)
  const successStories = storyRows.map(mapSuccessStory)

  return (
    <HomePage
      properties={properties}
      heroImage={profile.homeHeroImage || profile.heroImageUrl}
      faqs={faqs}
      testimonials={testimonials}
      successStories={successStories}
    />
  )
}
