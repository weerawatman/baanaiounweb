import Image from "next/image"
import Link from "next/link"
import { MessageCircle, Phone } from "lucide-react"
import Breadcrumb from "@/components/layout/Breadcrumb"
import PageSection from "@/components/layout/PageSection"
import SectionTitle from "@/components/layout/SectionTitle"
import TrustPillars, { type TrustPillarImages } from "@/components/home/TrustPillars"
import ServiceHubCard from "@/components/services/ServiceHubCard"
import ServicesWhyChoose from "@/components/services/ServicesWhyChoose"
import { FaqSection, type FaqItem } from "@/components/shared"
import { SERVICES_HUB_CONTENT } from "@/content/services-hub"
import { SITE_CONFIG } from "@/config/site"

interface ServicesHubPageProps {
  servicesHeroImage?: string
  heroImageUrl?: string
  lineUrl?: string
  whyChooseImage?: string
  trustImages: TrustPillarImages
  faqs: FaqItem[]
}

export default function ServicesHubPage({
  servicesHeroImage,
  heroImageUrl,
  lineUrl,
  whyChooseImage,
  trustImages,
  faqs,
}: ServicesHubPageProps) {
  const background = servicesHeroImage || heroImageUrl || SITE_CONFIG.pim.heroImage
  const lineHref = lineUrl || SITE_CONFIG.lineUrl
  const phoneHref = `tel:${SITE_CONFIG.phone.replace(/-/g, "")}`
  const { cta, servicesSection } = SERVICES_HUB_CONTENT

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
          className="-z-10 object-cover grayscale-[50%] brightness-[0.8]"
        />
        <div className="absolute inset-0 -z-10 bg-primary/85" />
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-3xl font-bold drop-shadow sm:text-4xl lg:text-5xl">
            {SERVICES_HUB_CONTENT.hero.h1.th}
          </h1>
          <p className="mt-2 text-2xl font-normal text-primary-foreground/95 drop-shadow sm:text-3xl">
            {SERVICES_HUB_CONTENT.hero.h1.en}
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-lg font-bold text-secondary">
            {SERVICES_HUB_CONTENT.hero.sub.th}
          </p>
          <p className="mx-auto mt-2 max-w-3xl text-sm text-primary-foreground/80">
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
        <SectionTitle title={servicesSection.title} />
        <p className="mx-auto -mt-4 max-w-3xl text-center text-base font-bold leading-relaxed text-primary sm:text-lg">
          {servicesSection.seoSubtitle.th}
          <span className="mt-1 block text-sm font-medium text-muted-foreground">
            {servicesSection.seoSubtitle.en}
          </span>
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
              titleTh={service.title.th}
              titleEn={service.title.en}
              descTh={service.description.th}
              descEn={service.description.en}
            />
          ))}
        </div>
      </PageSection>

      <ServicesWhyChoose imageUrl={whyChooseImage} />

      <TrustPillars images={trustImages} />

      <FaqSection
        variant="boxed"
        layout="cards"
        title="คำถามที่พบบ่อย | FAQ"
        subtitle="ข้อสงสัยยอดฮิตเกี่ยวกับบริการทั้งหมดของเรา | Top questions about all our services."
        items={faqs}
      />

      <PageSection variant="default">
        <div className="rounded-3xl border border-border bg-card px-6 py-12 text-center shadow-sm sm:px-10 sm:py-16">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            {cta.titleTh}
            <span className="mt-1 block text-lg font-medium text-muted-foreground">
              {cta.titleEn}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            {cta.subtitleTh}
            <span className="mt-1 block text-sm">{cta.subtitleEn}</span>
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={lineHref}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="services-line-cta"
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-[#22c55e] px-8 py-3 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#16a34a] sm:w-auto"
            >
              <MessageCircle className="size-5" />
              ทักแชทปรึกษาฟรี | Free LINE Chat
            </Link>
            <Link
              href={phoneHref}
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-8 py-3 text-base font-bold text-foreground transition-colors hover:bg-muted sm:w-auto"
            >
              <Phone className="size-5" />
              โทรด่วน | Call Now
            </Link>
          </div>
        </div>
      </PageSection>
    </>
  )
}
