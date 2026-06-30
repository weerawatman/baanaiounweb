import dynamic from "next/dynamic"
import Link from "next/link"
import { MessageCircle, ArrowRight } from "lucide-react"
import HeroSection from "@/components/home/HeroSection"
import ServiceShortcuts from "@/components/home/ServiceShortcuts"
import CoreValues from "@/components/home/CoreValues"
import SectionTitle from "@/components/layout/SectionTitle"
import { type Property, type Testimonial, type FAQ } from "@/types"
import { SITE_CONFIG } from "@/config/site"
import PropertyCard from "@/components/property/PropertyCard"
import { Button } from "@/components/ui/button"

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
  const featuredProperties = properties.filter((p) => p.featured)
  const lineHref = lineUrl || SITE_CONFIG.lineUrl

  return (
    <>
      <HeroSection heroImage={heroImage} />

      {/* Services — บริการของเรา (Rev.04): ServiceShortcuts มี H2 + การ์ดในตัว */}
      <ServiceShortcuts />

      {/* Featured Properties */}
      {featuredProperties.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <SectionTitle title="ทรัพย์แนะนำ | Featured Properties" subtitle="คัดสรรทุกหลัง ทำเลศักยภาพ คุณภาพที่เชื่อถือได้" />
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/buy">
              <Button
                variant="outline"
                className="gap-2 border-[#1B4D3E] text-[#1B4D3E] hover:bg-[#1B4D3E] hover:text-white"
              >
                ดูทรัพย์ทั้งหมด | View All Properties
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </section>
      )}

      <CoreValues />

      {testimonials.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <SectionTitle title="เสียงจากลูกค้า" subtitle="คนที่เคยใช้บริการบ้านไออุ่น" />
          <TestimonialSlider testimonials={testimonials} />
        </section>
      )}

      {faqs.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 py-12">
          <SectionTitle title="คำถามที่พบบ่อย" subtitle="สงสัยอะไร ถามพิมได้เลยค่ะ" />
          <FAQSection faqs={faqs} />
        </section>
      )}

      {/* Homepage CTA */}
      <section className="bg-[#1B4D3E] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              ให้บ้านไออุ่นช่วยดูแลทุกเรื่องอสังหาฯ ของคุณ
            </h2>
            <p className="max-w-xl text-base text-white/80">
              คุยง่าย ตรงไปตรงมา พร้อมดูแลทุกเคสด้วยความจริงใจ
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={lineHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-[#1B4D3E] transition-colors hover:bg-white/90"
              >
                <MessageCircle className="size-4" />
                ทักแชทปรึกษาฟรี
              </a>
              <Link
                href="/buy"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white/40 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                ดูทรัพย์ทั้งหมดของเรา
              </Link>
              <Link
                href="/academy"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-[#D4A843] px-6 py-2.5 text-sm font-semibold text-[#D4A843] transition-colors hover:bg-[#D4A843] hover:text-white"
              >
                สนใจคอร์สนายหน้า
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
