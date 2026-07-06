import dynamic from "next/dynamic"
import Link from "next/link"
import { MessageCircle } from "lucide-react"
import HeroSection from "@/components/home/HeroSection"
import ServiceShortcuts from "@/components/home/ServiceShortcuts"
import CoreValues from "@/components/home/CoreValues"
import FeaturedProperties from "@/components/home/FeaturedProperties"
import PageSection from "@/components/layout/PageSection"
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

      <PageSection variant="primary">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            ปรึกษาเรื่องอสังหาฯ ฟรีกับพิม
            <span className="mt-1 block text-lg font-medium text-primary-foreground/80">
              Free real estate consultation with Pim
            </span>
          </h2>
          <p className="text-base text-primary-foreground/90">
            คุยง่าย ตรงไปตรงมา ไม่มีค่าใช้จ่ายในการปรึกษา
          </p>
          <a
            href={lineHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-card px-8 py-3 text-sm font-semibold text-primary shadow-md transition-colors hover:bg-card/90"
          >
            <MessageCircle className="size-5" />
            ทักแชทปรึกษาฟรี | Free LINE Chat
          </a>
          <p className="text-sm text-primary-foreground/75">
            <Link href="/properties" className="underline-offset-2 hover:underline">
              ดูทรัพย์ทั้งหมด
            </Link>
            {" · "}
            <Link href="/services" className="underline-offset-2 hover:underline">
              บริการของเรา
            </Link>
            {" · "}
            <Link href="/about" className="underline-offset-2 hover:underline">
              เกี่ยวกับเรา
            </Link>
          </p>
        </div>
      </PageSection>
    </>
  )
}
