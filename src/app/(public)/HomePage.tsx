import dynamic from "next/dynamic"
import Link from "next/link"
import { MessageCircle } from "lucide-react"
import HeroSection from "@/components/home/HeroSection"
import ServiceShortcuts from "@/components/home/ServiceShortcuts"
import CoreValues from "@/components/home/CoreValues"
import EcosystemBand from "@/components/home/EcosystemBand"
import SmartSearchWrapper from "@/components/home/SmartSearchWrapper"
import { type Property, type Testimonial, type SuccessStory, type FAQ } from "@/types"
import { SITE_CONFIG } from "@/config/site"

const TestimonialSlider = dynamic(() => import("@/components/home/TestimonialSlider"))
const SuccessStoriesSection = dynamic(() => import("@/components/home/SuccessStoriesSection"))
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

  return (
    <>
      <HeroSection heroImage={heroImage} districts={districts} />

      {/* บริการของเรา */}
      <ServiceShortcuts />

      {/* Smart Search + Property Grid */}
      <SmartSearchWrapper initialProperties={properties} />

      <CoreValues />

      <EcosystemBand />

      {successStories.length > 0 && <SuccessStoriesSection stories={successStories} />}

      {testimonials.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <TestimonialSlider testimonials={testimonials} />
        </section>
      )}

      {faqs.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 py-12">
          <FAQSection faqs={faqs} />
        </section>
      )}

      {/* Homepage CTA */}
      <section className="bg-[#1B4D3E] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              ให้บ้านไออุ่นช่วยดูแลทุกเรื่องอสังหาฯ ของคุณ
              <span className="mt-1 block text-lg font-medium text-white/70">
                Let Baan Ai Oun Handle All Your Real Estate Needs
              </span>
            </h2>
            <p className="max-w-xl text-base text-white/80">
              คุยง่าย ตรงไปตรงมา พร้อมดูแลทุกเคสด้วยความจริงใจ
              <span className="mt-1 block text-sm text-white/60">
                Easy to talk to, straightforward, caring for every case with sincerity.
              </span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={lineHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-[#1B4D3E] transition-colors hover:bg-white/90"
              >
                <MessageCircle className="size-4" />
                ทักแชทปรึกษาฟรี | Free Chat
              </a>
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white/40 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                ดูทรัพย์ทั้งหมด | All Properties
              </Link>
              <Link
                href="/agent-course"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-[#D4A843] px-6 py-2.5 text-sm font-semibold text-[#D4A843] transition-colors hover:bg-[#D4A843] hover:text-white"
              >
                คอร์สนายหน้า | Agent Course
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
