import HeroSection from "@/components/home/HeroSection"
import ServiceShortcuts from "@/components/home/ServiceShortcuts"
import FeaturedProperties from "@/components/home/FeaturedProperties"
import WhyChoosePillars from "@/components/home/WhyChoosePillars"
import SocialProofSection from "@/components/home/SocialProofSection"
import { FaqSection, type FaqItem } from "@/components/shared"
import { getLocale } from "next-intl/server"
import type { Locale } from "@/i18n/routing"
import { pickLocalized } from "@/lib/i18n/pick-localized"
import { type Property, type SuccessStory, type Testimonial } from "@/types"

const FAQ_TITLE = { th: "คำถามที่พบบ่อย (FAQ)", en: "Frequently Asked Questions" } as const
const FAQ_SUBTITLE = {
  th: "เรื่องอสังหาฯ ให้เราดูแล เพื่อให้คุณก้าวสู่เป้าหมายได้อย่างสบายใจและคุ้มค่าที่สุด",
  en: "We handle real estate so you can move forward with confidence.",
} as const

interface HomePageProps {
  properties: Property[]
  heroImage?: string
  faqs: FaqItem[]
  testimonials: Testimonial[]
  successStories: SuccessStory[]
}

export default async function HomePage({
  properties,
  heroImage,
  faqs,
  testimonials,
  successStories,
}: HomePageProps) {
  const locale = (await getLocale()) as Locale
  const districts = [
    ...new Set(properties.map((p) => p.location.district).filter(Boolean)),
  ].sort()

  return (
    <div className="bg-background">
      <HeroSection heroImage={heroImage} districts={districts} />

      <ServiceShortcuts />

      <WhyChoosePillars />

      <FeaturedProperties properties={properties} />

      <SocialProofSection stories={successStories} testimonials={testimonials} />

      <FaqSection
        variant="boxed"
        title={pickLocalized(locale, FAQ_TITLE)}
        subtitle={pickLocalized(locale, FAQ_SUBTITLE)}
        items={faqs}
      />
    </div>
  )
}
