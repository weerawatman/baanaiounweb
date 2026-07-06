import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import Breadcrumb from "@/components/layout/Breadcrumb"
import { SERVICES_HUB_CONTENT } from "@/content/services-hub"
import { SITE_CONFIG } from "@/config/site"
import { type SuccessStory } from "@/types"
import { Home, Search, Users, GraduationCap, ArrowRight, MessageCircle, Phone } from "lucide-react"

const SuccessStoriesSection = dynamic(
  () => import("@/components/home/SuccessStoriesSection"),
)

const ICON_MAP = { Home, Search, Users, GraduationCap } as const

interface ServicesHubPageProps {
  heroImageUrl?: string
  lineUrl?: string
  successStories?: SuccessStory[]
}

export default function ServicesHubPage({
  heroImageUrl,
  lineUrl,
  successStories = [],
}: ServicesHubPageProps) {
  const background = heroImageUrl || SITE_CONFIG.pim.heroImage
  const lineHref = lineUrl || SITE_CONFIG.lineUrl
  const phoneHref = `tel:${SITE_CONFIG.phone.replace(/-/g, "")}`

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[{ label: "หน้าแรก", href: "/" }, { label: "บริการของเรา | Our Services" }]}
        />
      </div>

      <section className="relative isolate overflow-hidden py-20 text-white">
        <Image
          src={background}
          alt="บริการอสังหาริมทรัพย์ บ้านไออุ่น พร็อพเพอร์ตี้"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#1B4D3E]/90 to-[#0d2820]/95" />
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            {SERVICES_HUB_CONTENT.hero.h1.th}
            <span className="mt-2 block text-2xl text-white/80 sm:text-3xl lg:text-4xl">
              {SERVICES_HUB_CONTENT.hero.h1.en}
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/90">{SERVICES_HUB_CONTENT.hero.sub.th}</p>
          <p className="mt-2 text-base text-white/75">{SERVICES_HUB_CONTENT.hero.sub.en}</p>
        </div>
      </section>

      <section className="bg-[#1B4D3E] py-8" data-testid="services-stats-bar">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {SERVICES_HUB_CONTENT.stats.map((stat) => (
              <div key={stat.th} className="text-center text-white">
                <p className="text-3xl font-bold text-[#D4A843] sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm font-medium">{stat.th}</p>
                <p className="text-xs text-white/70">{stat.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            data-testid="services-four-column-grid"
          >
            {SERVICES_HUB_CONTENT.services.map((service) => {
              const Icon = ICON_MAP[service.icon as keyof typeof ICON_MAP]
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: `${service.color}18` }}
                  >
                    <Icon size={28} style={{ color: service.color }} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold">
                    <span className="block" style={{ color: service.color }}>
                      {service.title.th}
                    </span>
                    <span className="block text-sm text-gray-600">{service.title.en}</span>
                  </h3>
                  <p className="mt-3 text-xs font-semibold text-[#1B4D3E]">
                    {service.highlight.th}
                    <span className="mt-0.5 block font-normal text-gray-500">
                      {service.highlight.en}
                    </span>
                  </p>
                  <div className="mt-3 flex flex-1 flex-col gap-1">
                    <p className="text-sm leading-relaxed text-gray-700">{service.description.th}</p>
                    <p className="text-xs leading-relaxed text-gray-500">{service.description.en}</p>
                  </div>
                  <div className="mt-5">
                    <span
                      className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity group-hover:opacity-90"
                      style={{ backgroundColor: service.color }}
                    >
                      {service.cta.th}
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {successStories.length > 0 && <SuccessStoriesSection stories={successStories} />}

      <section className="border-t bg-white py-12">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <p className="text-sm leading-relaxed text-gray-700">
            {SERVICES_HUB_CONTENT.localAuthority.th}
          </p>
          <p className="mt-2 text-sm text-gray-500">{SERVICES_HUB_CONTENT.localAuthority.en}</p>
        </div>
      </section>

      <section className="bg-[#F5F0E8] py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold text-[#1B4D3E] sm:text-3xl">พร้อมเริ่มต้นหรือยัง?</h2>
          <p className="mt-4 text-gray-600">
            เลือกบริการด้านบน หรือทักมาปรึกษาฟรีได้ทันที
            <span className="mt-1 block text-sm text-gray-500">
              Pick a service above or chat with us for a free consultation.
            </span>
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={lineHref}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="services-line-cta"
              className="inline-flex items-center gap-2 rounded-lg bg-[#06C755] px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              <MessageCircle className="size-5" />
              ปรึกษาฟรี ทัก LINE | Free LINE Chat
            </a>
            <a
              href={phoneHref}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-[#1B4D3E] px-8 py-3 font-semibold text-[#1B4D3E] transition-colors hover:bg-[#1B4D3E] hover:text-white"
            >
              <Phone className="size-5" />
              โทรด่วน | Call Now
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
