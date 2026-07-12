import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import type { Locale } from "@/i18n/routing"
import { getActiveProperties } from "@/lib/queries/properties"
import { getProfile } from "@/lib/queries/profile"
import { getPageFaqs } from "@/lib/faq-items"
import { getTestimonials } from "@/lib/queries/testimonials"
import { getPublishedSuccessStories } from "@/lib/queries/success-stories"
import { mapProperty, mapTestimonial, mapSuccessStory } from "@/lib/mappers"
import { filterDisplayableSuccessStoryViews } from "@/lib/success-stories-display"
import { createPageMetadata } from "@/lib/i18n/metadata"
import HomePage from "./HomePage"

export const revalidate = 900

const HOME_META = {
  title: {
    th: "บ้านไออุ่น พร็อพเพอร์ตี้ — จบทุกความต้องการเรื่องอสังหาฯ บ้านบึง ชลบุรี",
    en: "Baan Ai Oun Property — Real Estate in Ban Bueng, Chonburi",
  },
  description: {
    th: "บ้านไออุ่น คัดสรรบ้านขาย บ้านเช่า ที่ดิน ในเขตบ้านบึง ชลบุรี ใกล้นิคมอมตะ เหมราช โดยพิม นายหน้าที่ดูแลด้วยหัวใจ",
    en: "Curated homes for sale and rent in Ban Bueng, Chonburi — near Amata City and Hemaraj industrial zones.",
  },
} as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return createPageMetadata({
    locale,
    pathname: "/",
    title: HOME_META.title,
    description: HOME_META.description,
  })
}

export default async function HomeRoute({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const [propertyRows, profile, faqs, testimonialRows, storyRows] = await Promise.all([
    getActiveProperties(),
    getProfile(),
    getPageFaqs("home"),
    getTestimonials(),
    getPublishedSuccessStories(),
  ])

  const properties = propertyRows.map(mapProperty)
  const testimonials = testimonialRows.map(mapTestimonial)
  const successStories = filterDisplayableSuccessStoryViews(storyRows.map(mapSuccessStory))

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
