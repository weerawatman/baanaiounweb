import HeroSection from "@/components/home/HeroSection"
import ServiceShortcuts from "@/components/home/ServiceShortcuts"
import FeaturedProperties from "@/components/home/FeaturedProperties"
import WhyChoosePillars from "@/components/home/WhyChoosePillars"
import { FaqSection, type FaqItem } from "@/components/shared"
import { type Property } from "@/types"

interface HomePageProps {
  properties: Property[]
  heroImage?: string
  faqs: FaqItem[]
}

export default function HomePage({ properties, heroImage, faqs }: HomePageProps) {
  const districts = [
    ...new Set(properties.map((p) => p.location.district).filter(Boolean)),
  ].sort()

  return (
    <div className="bg-[#f8f6f0]">
      <HeroSection heroImage={heroImage} districts={districts} />

      <ServiceShortcuts />

      <WhyChoosePillars />

      <FeaturedProperties properties={properties} />

      <FaqSection
        variant="boxed"
        title="คำถามที่พบบ่อย (FAQ) | Frequently Asked Questions"
        subtitle="เรื่องอสังหาฯ ให้เราดูแล เพื่อให้คุณก้าวสู่เป้าหมายได้อย่างสบายใจและคุ้มค่าที่สุด | We handle real estate so you can move forward with confidence."
        items={faqs}
      />
    </div>
  )
}
