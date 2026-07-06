import dynamic from "next/dynamic"
import HeroSection from "@/components/home/HeroSection"
import ServiceShortcuts from "@/components/home/ServiceShortcuts"
import CoreValues from "@/components/home/CoreValues"
import FeaturedProperties from "@/components/home/FeaturedProperties"
import LineClosingCta from "@/components/shared/LineClosingCta"
import { type Property, type Testimonial, type SuccessStory, type FAQ } from "@/types"
import { SITE_CONFIG } from "@/config/site"

const SocialProofSection = dynamic(() => import("@/components/home/SocialProofSection"))
const FAQSection = dynamic(() => import("@/components/home/FAQSection"))

interface HomePageProps {
  properties: Property[]
  testimonials: Testimonial[]
  successStories: SuccessStory[]
  faqs: FAQ[]
  heroImage?: string
  lineUrl?: string
}

export default function HomePage({
  properties,
  testimonials,
  successStories,
  faqs,
  heroImage,
  lineUrl,
}: HomePageProps) {
  const lineHref = lineUrl || SITE_CONFIG.lineUrl
  const districts = [
    ...new Set(properties.map((p) => p.location.district).filter(Boolean)),
  ].sort()

  const showSocialProof = successStories.length > 0 || testimonials.length > 0

  return (
    <>
      <HeroSection heroImage={heroImage} districts={districts} />

      <ServiceShortcuts />

      <FeaturedProperties properties={properties} />

      <CoreValues />

      {showSocialProof && (
        <SocialProofSection stories={successStories} testimonials={testimonials} />
      )}

      {faqs.length > 0 && <FAQSection faqs={faqs} />}

      <LineClosingCta
        lineUrl={lineHref}
        secondaryLinks={[
          { href: "/properties", label: "ดูทรัพย์ทั้งหมด" },
          { href: "/services", label: "บริการของเรา" },
          { href: "/about", label: "เกี่ยวกับเรา" },
        ]}
      />
    </>
  )
}
