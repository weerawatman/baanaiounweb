import Image from "next/image"
import dynamic from "next/dynamic"
import Breadcrumb from "@/components/layout/Breadcrumb"
import PageSection from "@/components/layout/PageSection"
import SectionTitle from "@/components/layout/SectionTitle"
import AudienceCard from "@/components/shared/AudienceCard"
import LineClosingCta from "@/components/shared/LineClosingCta"
import { SERVICES_HUB_CONTENT } from "@/content/services-hub"
import { SITE_CONFIG } from "@/config/site"
import { type SuccessStory } from "@/types"
import { Home, Search, Users, GraduationCap } from "lucide-react"

const SocialProofSection = dynamic(() => import("@/components/home/SocialProofSection"))

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
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <Breadcrumb
          items={[{ label: "หน้าแรก", href: "/" }, { label: "บริการของเรา | Our Services" }]}
        />
      </div>

      <section className="relative isolate overflow-hidden py-16 text-white sm:py-20">
        <Image
          src={background}
          alt="บริการอสังหาริมทรัพย์ บ้านไออุ่น พร็อพเพอร์ตี้"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/90 to-primary/95" />
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            {SERVICES_HUB_CONTENT.hero.h1.th}
            <span className="mt-2 block text-2xl text-white/80 sm:text-3xl">
              {SERVICES_HUB_CONTENT.hero.h1.en}
            </span>
          </h1>
          <p className="mt-5 text-lg text-white/90">{SERVICES_HUB_CONTENT.hero.sub.th}</p>
          <p className="mt-1 text-sm text-white/75">{SERVICES_HUB_CONTENT.hero.sub.en}</p>
        </div>
      </section>

      <PageSection variant="primary" className="py-8 lg:py-10">
        <div data-testid="services-stats-bar">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {SERVICES_HUB_CONTENT.stats.map((stat) => (
              <div key={stat.th} className="text-center text-primary-foreground">
                <p className="text-3xl font-bold text-secondary sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm font-medium">{stat.th}</p>
                <p className="text-xs text-primary-foreground/70">{stat.en}</p>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection variant="default">
        <SectionTitle
          title="เลือกบริการที่ตรงกับคุณ | Choose Your Path"
          subtitle="คลิกการ์ดเพื่อดูรายละเอียดและเริ่มต้นได้ทันที"
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

      {successStories.length > 0 && (
        <SocialProofSection stories={successStories} testimonials={[]} />
      )}

      <PageSection variant="warm">
        <p className="text-center text-sm leading-relaxed text-foreground/90">
          {SERVICES_HUB_CONTENT.localAuthority.th}
        </p>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {SERVICES_HUB_CONTENT.localAuthority.en}
        </p>
      </PageSection>

      <LineClosingCta
        variant="warm"
        lineUrl={lineHref}
        phoneUrl={phoneHref}
        lineTestId="services-line-cta"
        titleTh="พร้อมเริ่มต้นหรือยัง?"
        titleEn="Ready to get started?"
        subtitleTh="เลือกบริการด้านบน หรือทักมาปรึกษาฟรีได้ทันที"
      />
    </>
  )
}
