import type { Metadata } from "next"
import { getActiveProperties } from "@/lib/queries/properties"
import { getTestimonials } from "@/lib/queries/testimonials"
import { getPublishedSuccessStories } from "@/lib/queries/success-stories"
import { getFaqsByPage } from "@/lib/queries/faqs"
import { getProfile } from "@/lib/queries/profile"
import { mapProperty, mapTestimonial, mapSuccessStory, mapFaq } from "@/lib/mappers"
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
  const [propertyRows, testimonialRows, successStoryRows, faqRows, profile] = await Promise.all([
    getActiveProperties(),
    getTestimonials(),
    getPublishedSuccessStories(),
    getFaqsByPage("home"),
    getProfile(),
  ])

  const properties = propertyRows.map(mapProperty)
  const testimonials = testimonialRows.map(mapTestimonial)
  const successStories = successStoryRows.map(mapSuccessStory)
  const faqs = faqRows.map(mapFaq)

  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null

  return (
    <>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <HomePage
        properties={properties}
        testimonials={testimonials}
        successStories={successStories}
        faqs={faqs}
        heroImage={profile.heroImageUrl}
        lineUrl={profile.lineUrl}
      />
    </>
  )
}
