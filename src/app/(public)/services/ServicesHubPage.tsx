import Image from "next/image"
import Link from "next/link"
import Breadcrumb from "@/components/layout/Breadcrumb"
import { SERVICES_HUB_CONTENT } from "@/content/services-hub"
import { SITE_CONFIG } from "@/config/site"
import { Home, Search, Users, GraduationCap } from "lucide-react"

const ICON_MAP = { Home, Search, Users, GraduationCap } as const

const STATS = [
  { value: "200+", th: "ทรัพย์ปิดดีลสำเร็จ", en: "Properties Closed" },
  { value: "10+", th: "ปีประสบการณ์", en: "Years Experience" },
  { value: "500+", th: "ลูกค้าที่ไว้วางใจ", en: "Trusted Clients" },
  { value: "3", th: "จังหวัดที่ให้บริการ", en: "Provinces Served" },
]

interface ServicesHubPageProps {
  heroImageUrl?: string
}

export default function ServicesHubPage({ heroImageUrl }: ServicesHubPageProps) {
  const background = heroImageUrl || SITE_CONFIG.pim.heroImage

  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[{ label: "หน้าแรก", href: "/" }, { label: "บริการของเรา | Our Services" }]}
        />
      </div>

      {/* Hero — background image + dark overlay */}
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

      {/* Stats Bar */}
      <section className="bg-[#1B4D3E] py-8">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.th} className="text-center text-white">
                <p className="text-3xl font-bold text-[#D4A843] sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm font-medium">{stat.th}</p>
                <p className="text-xs text-white/70">{stat.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {SERVICES_HUB_CONTENT.services.map((service) => {
              const Icon = ICON_MAP[service.icon as keyof typeof ICON_MAP]
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group flex h-full flex-col rounded-2xl border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: `${service.color}18` }}
                  >
                    <Icon size={32} style={{ color: service.color }} />
                  </div>
                  <h3 className="mt-6 text-xl font-bold">
                    <span className="block" style={{ color: service.color }}>
                      {service.title.th}
                    </span>
                    <span className="block text-base text-gray-600">{service.title.en}</span>
                  </h3>
                  <div className="mt-4 flex flex-1 flex-col gap-2">
                    <p className="leading-relaxed text-gray-700">{service.description.th}</p>
                    <p className="text-sm leading-relaxed text-gray-500">{service.description.en}</p>
                  </div>
                  <div className="mt-6">
                    <div
                      className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-opacity group-hover:opacity-90"
                      style={{ backgroundColor: service.color }}
                    >
                      {service.cta.th}
                      {service.cta.en && <span>| {service.cta.en}</span>}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold text-[#1B4D3E] sm:text-3xl">พร้อมเริ่มต้นหรือยัง?</h2>
          <p className="mt-4 text-gray-600">
            เลือกบริการที่คุณต้องการด้านบน หรือติดต่อเราสำหรับคำปรึกษาฟรี
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-lg bg-[#1B4D3E] px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              ติดต่อเรา | Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
