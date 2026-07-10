import Image from "next/image"
import Breadcrumb from "@/components/layout/Breadcrumb"
import PageSection from "@/components/layout/PageSection"
import SectionTitle from "@/components/layout/SectionTitle"
import AudienceCard from "@/components/shared/AudienceCard"
import LineClosingCta from "@/components/shared/LineClosingCta"
import TrustPillars, { type TrustPillarImages } from "@/components/home/TrustPillars"
import ServicesWhyChoose from "@/components/services/ServicesWhyChoose"
import { SERVICES_HUB_CONTENT } from "@/content/services-hub"
import { SITE_CONFIG } from "@/config/site"
import { Home, Search, Users, GraduationCap } from "lucide-react"

const ICON_MAP = { Home, Search, Users, GraduationCap } as const

interface ServicesHubPageProps {
  servicesHeroImage?: string
  heroImageUrl?: string
  lineUrl?: string
  trustImages: TrustPillarImages
}

export default function ServicesHubPage({
  servicesHeroImage,
  heroImageUrl,
  lineUrl,
  trustImages,
}: ServicesHubPageProps) {
  const background = servicesHeroImage || heroImageUrl || SITE_CONFIG.pim.heroImage
  const lineHref = lineUrl || SITE_CONFIG.lineUrl
  const phoneHref = `tel:${SITE_CONFIG.phone.replace(/-/g, "")}`

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <Breadcrumb
          items={[{ label: "หน้าแรก", href: "/" }, { label: "บริการของเรา | Our Services" }]}
        />
      </div>

      <section className="relative isolate overflow-hidden bg-primary py-16 text-primary-foreground sm:py-20">
        <Image
          src={background}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-primary/85" />
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            {SERVICES_HUB_CONTENT.hero.h1.th}
            <span className="mt-2 block text-2xl font-semibold text-primary-foreground/85 sm:text-3xl">
              {SERVICES_HUB_CONTENT.hero.h1.en}
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-primary-foreground/90">
            {SERVICES_HUB_CONTENT.hero.sub.th}
          </p>
          <p className="mx-auto mt-2 max-w-3xl text-sm text-primary-foreground/75">
            {SERVICES_HUB_CONTENT.hero.sub.en}
          </p>

          <div
            className="mt-12 border-t border-primary-foreground/20 pt-10"
            data-testid="services-stats-bar"
          >
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {SERVICES_HUB_CONTENT.stats.map((stat) => (
                <div key={stat.th} className="text-center">
                  <p className="text-3xl font-bold text-secondary sm:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium">{stat.th}</p>
                  <p className="text-xs text-primary-foreground/70">{stat.en}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PageSection variant="default">
        <SectionTitle
          title="เลือกบริการที่ตรงกับคุณ | Choose Your Path"
          subtitle="คลิกการ์ดเพื่อดูรายละเอียดและเริ่มต้นได้ทันที | Click on a card to learn more and get started."
        />
        <div
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          data-testid="services-four-column-grid"
        >
          {SERVICES_HUB_CONTENT.services.map((service) => {
            const Icon = ICON_MAP[service.icon as keyof typeof ICON_MAP]
            return (
              <AudienceCard
                key={service.href}
                href={service.href}
                icon={Icon}
                accentColor={service.color}
                titleTh={service.title.th}
                titleEn={service.title.en}
                highlightTh={service.highlight.th}
                highlightEn={service.highlight.en}
                descTh={service.description.th}
                descEn={service.description.en}
              />
            )
          })}
        </div>
      </PageSection>

      <ServicesWhyChoose />

      <TrustPillars images={trustImages} />

      <LineClosingCta
        variant="warm"
        lineUrl={lineHref}
        phoneUrl={phoneHref}
        lineTestId="services-line-cta"
        locationTh={SERVICES_HUB_CONTENT.localAuthority.th}
        locationEn={SERVICES_HUB_CONTENT.localAuthority.en}
        titleTh="พร้อมเริ่มต้นหรือยัง?"
        titleEn="Ready to get started?"
        subtitleTh="เลือกบริการด้านบน หรือทักมาปรึกษาฟรีได้ทันที"
        subtitleEn="Choose a service above or contact us for a free consultation today."
      />
    </>
  )
}
