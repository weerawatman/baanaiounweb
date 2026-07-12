import { getLocale } from "next-intl/server"
import { MessageCircle, Phone } from "lucide-react"
import Breadcrumb from "@/components/layout/Breadcrumb"
import PageSection from "@/components/layout/PageSection"
import SectionTitle from "@/components/layout/SectionTitle"
import TrustPillars, { type TrustPillarImages } from "@/components/home/TrustPillars"
import ServiceHubCard from "@/components/services/ServiceHubCard"
import ServicesWhyChoose from "@/components/services/ServicesWhyChoose"
import { FaqSection, PageHeroBanner, type FaqItem } from "@/components/shared"
import { SERVICES_HUB_CONTENT } from "@/content/services-hub"
import { SITE_CONFIG } from "@/config/site"
import type { Locale } from "@/i18n/routing"
import { pickLocalized, pickPipeBilingual } from "@/lib/i18n/pick-localized"

interface ServicesHubPageProps {
  servicesHeroImage?: string
  heroImageUrl?: string
  lineUrl?: string
  whyChooseImage?: string
  trustImages: TrustPillarImages
  faqs: FaqItem[]
}

const HOME_CRUMB = { th: "หน้าแรก", en: "Home" } as const
const SERVICES_CRUMB = { th: "บริการของเรา", en: "Our Services" } as const
const FAQ_TITLE = { th: "คำถามที่พบบ่อย", en: "FAQ" } as const
const FAQ_SUBTITLE = {
  th: "ข้อสงสัยยอดฮิตเกี่ยวกับบริการทั้งหมดของเรา",
  en: "Top questions about all our services.",
} as const
const LINE_CTA = { th: "ทักแชทปรึกษาฟรี", en: "Free LINE Chat" } as const
const CALL_CTA = { th: "โทรด่วน", en: "Call Now" } as const

export default async function ServicesHubPage({
  servicesHeroImage,
  heroImageUrl,
  lineUrl,
  whyChooseImage,
  trustImages,
  faqs,
}: ServicesHubPageProps) {
  const locale = (await getLocale()) as Locale
  const background = servicesHeroImage || heroImageUrl || SITE_CONFIG.pim.heroImage
  const lineHref = lineUrl || SITE_CONFIG.lineUrl
  const phoneHref = `tel:${SITE_CONFIG.phone.replace(/-/g, "")}`
  const { cta, servicesSection } = SERVICES_HUB_CONTENT

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <Breadcrumb
          items={[
            { label: pickLocalized(locale, HOME_CRUMB), href: "/" },
            { label: pickLocalized(locale, SERVICES_CRUMB) },
          ]}
        />
      </div>

      <PageHeroBanner
        image={background}
        titleTh={SERVICES_HUB_CONTENT.hero.h1.th}
        titleEn={SERVICES_HUB_CONTENT.hero.h1.en}
        subtitleTh={SERVICES_HUB_CONTENT.hero.sub.th}
        subtitleEn={SERVICES_HUB_CONTENT.hero.sub.en}
        data-testid="services-hero"
      >
        <div
          className="mt-5 border-t border-primary-foreground/20 pt-4"
          data-testid="services-stats-bar"
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
            {SERVICES_HUB_CONTENT.stats.map((stat) => (
              <div key={stat.th} className="text-center">
                <p className="text-xl font-bold text-secondary sm:text-2xl">{stat.value}</p>
                <p className="mt-0.5 text-sm font-medium">{stat.th}</p>
                <p className="text-xs text-primary-foreground/70">{stat.en}</p>
              </div>
            ))}
          </div>
        </div>
      </PageHeroBanner>

      <PageSection variant="default">
        <SectionTitle title={pickPipeBilingual(locale, servicesSection.title)} />
        <p className="mx-auto -mt-4 max-w-3xl text-center text-base font-bold leading-relaxed text-primary sm:text-lg">
          {pickLocalized(locale, servicesSection.seoSubtitle)}
        </p>

        <div
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          data-testid="services-four-column-grid"
        >
          {SERVICES_HUB_CONTENT.services.map((service) => (
            <ServiceHubCard
              key={service.href}
              href={service.href}
              emoji={service.emoji}
              title={service.title}
              description={service.description}
              locale={locale}
            />
          ))}
        </div>
      </PageSection>

      <ServicesWhyChoose imageUrl={whyChooseImage} />

      <TrustPillars images={trustImages} />

      <FaqSection
        variant="boxed"
        layout="cards"
        title={pickLocalized(locale, FAQ_TITLE)}
        subtitle={pickLocalized(locale, FAQ_SUBTITLE)}
        items={faqs}
      />

      <PageSection variant="default">
        <div className="rounded-3xl border border-border bg-card px-6 py-12 text-center shadow-sm sm:px-10 sm:py-16">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            {pickLocalized(locale, { th: cta.titleTh, en: cta.titleEn })}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            {pickLocalized(locale, { th: cta.subtitleTh, en: cta.subtitleEn })}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={lineHref}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="services-line-cta"
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-[#06C755] px-8 py-3 text-base font-bold text-white shadow-sm transition-opacity hover:opacity-90 sm:w-auto"
            >
              <MessageCircle className="size-5" />
              {pickLocalized(locale, LINE_CTA)}
            </a>
            <a
              href={phoneHref}
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-8 py-3 text-base font-bold text-foreground transition-colors hover:bg-muted sm:w-auto"
            >
              <Phone className="size-5" />
              {pickLocalized(locale, CALL_CTA)}
            </a>
          </div>
        </div>
      </PageSection>
    </>
  )
}
