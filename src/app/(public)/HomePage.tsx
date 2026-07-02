import dynamic from "next/dynamic"
import Link from "next/link"
import { MessageCircle } from "lucide-react"
import HeroSection from "@/components/home/HeroSection"
import ServiceShortcuts from "@/components/home/ServiceShortcuts"
import CoreValues from "@/components/home/CoreValues"
import SmartSearchWrapper from "@/components/home/SmartSearchWrapper"
import { type Property, type Testimonial, type FAQ } from "@/types"
import { SITE_CONFIG } from "@/config/site"

const TestimonialSlider = dynamic(() => import("@/components/home/TestimonialSlider"))
const FAQSection = dynamic(() => import("@/components/home/FAQSection"))

interface HomePageProps {
  properties: Property[]
  testimonials: Testimonial[]
  faqs: FAQ[]
  heroImage?: string
  lineUrl?: string
}

export default function HomePage({
  properties,
  testimonials,
  faqs,
  heroImage,
  lineUrl,
}: HomePageProps) {
  const lineHref = lineUrl || SITE_CONFIG.lineUrl

  return (
    <>
      <HeroSection heroImage={heroImage} />

      {/* บริการของเรา */}
      <ServiceShortcuts />

      {/* ฝากทรัพย์ CTA Strip */}
      <section className="flex items-center justify-between bg-amber-500 px-6 py-4">
        <div>
          <p className="th-only font-semibold text-white">
            อยากฝากทรัพย์ขาย/เช่า? ให้พิมดูแลให้ครบวงจร
          </p>
          <p className="en-only font-semibold text-white">
            Want to list your property? We handle everything for you.
          </p>
        </div>
        <Link
          href="/list-property"
          className="ml-4 shrink-0 rounded-lg bg-white px-4 py-2 text-sm font-bold text-amber-600 transition-colors hover:bg-amber-50"
        >
          <span className="th-only">ฝากทรัพย์เลย</span>
          <span className="en-only">List Property</span>
        </Link>
      </section>

      {/* Smart Search + Property Grid */}
      <SmartSearchWrapper initialProperties={properties} />

      <CoreValues />

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
              <span className="th-only">ให้บ้านไออุ่นช่วยดูแลทุกเรื่องอสังหาฯ ของคุณ</span>
              <span className="en-only">Let Baan Ai Oun Handle All Your Real Estate Needs</span>
            </h2>
            <p className="max-w-xl text-base text-white/80">
              <span className="th-only">คุยง่าย ตรงไปตรงมา พร้อมดูแลทุกเคสด้วยความจริงใจ</span>
              <span className="en-only">Easy to talk to, straightforward, caring for every case with sincerity.</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={lineHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-[#1B4D3E] transition-colors hover:bg-white/90"
              >
                <MessageCircle className="size-4" />
                <span className="th-only">ทักแชทปรึกษาฟรี</span>
                <span className="en-only">Chat with Us Free</span>
              </a>
              <Link
                href="/find-property"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white/40 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <span className="th-only">ดูทรัพย์ทั้งหมดของเรา</span>
                <span className="en-only">View All Properties</span>
              </Link>
              <Link
                href="/agent-course"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-[#D4A843] px-6 py-2.5 text-sm font-semibold text-[#D4A843] transition-colors hover:bg-[#D4A843] hover:text-white"
              >
                <span className="th-only">สนใจคอร์สนายหน้า</span>
                <span className="en-only">Agent Course</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
