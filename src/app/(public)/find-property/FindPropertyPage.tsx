import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import Breadcrumb from "@/components/layout/Breadcrumb"
import PageSection from "@/components/layout/PageSection"
import {
  StepsSection,
  PageHeroBanner,
  ServiceLeadTabs,
  PortfolioBento,
  FaqSection,
  type FaqItem,
  type BentoItem,
} from "@/components/shared"
import { FIND_PROPERTY_CONTENT } from "@/content/find-property"
import RequestForm from "../request/RequestForm"

export function generateMetadata(): Metadata {
  return {
    title: FIND_PROPERTY_CONTENT.seo.title,
    description: FIND_PROPERTY_CONTENT.seo.description.th,
    openGraph: {
      title: FIND_PROPERTY_CONTENT.seo.title,
      description: FIND_PROPERTY_CONTENT.seo.description.th,
    },
  }
}

interface FindPropertyPageProps {
  heroImage?: string
  teamImage?: string
  bentoItems: BentoItem[]
  faqs: FaqItem[]
}

export default function FindPropertyPage({
  heroImage,
  teamImage,
  bentoItems,
  faqs,
}: FindPropertyPageProps) {
  const { banner, split, steps, hook, formCard } = FIND_PROPERTY_CONTENT

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <Breadcrumb
          items={[
            { label: "หน้าแรก", href: "/" },
            { label: "บริการของเรา | Our Services", href: "/services" },
            { label: "งานหาทรัพย์ | Property Match" },
          ]}
        />
      </div>

      <PageHeroBanner
        image={heroImage}
        titleTh={banner.titleTh}
        titleEn={banner.titleEn}
        subtitleTh={banner.subtitleTh}
        subtitleEn={banner.subtitleEn}
      />

      <PageSection variant="warm" className="pt-8 lg:pt-10">
        <ServiceLeadTabs active="matchmaking" />

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <h2 className="text-2xl font-bold leading-tight text-primary sm:text-3xl">
              {split.headline.th}
            </h2>
            <p className="mt-2 text-lg font-medium text-secondary">{split.headline.en}</p>

            <p className="mt-4 text-sm font-semibold text-muted-foreground">{split.seo.th}</p>
            <p className="text-xs text-muted-foreground/80">{split.seo.en}</p>

            <p className="mt-4 text-base leading-relaxed text-foreground/90">{split.lead.th}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{split.lead.en}</p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {split.benefits.map((item) => (
                <div
                  key={item.th}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                >
                  <span className="text-2xl" aria-hidden>
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-foreground">{item.th}</p>
                    <p className="text-xs text-muted-foreground">{item.en}</p>
                  </div>
                </div>
              ))}
            </div>

            <PortfolioBento items={bentoItems} />

            <div className="relative isolate mt-8 overflow-hidden rounded-2xl bg-primary px-6 py-10 text-center text-primary-foreground">
              {teamImage && (
                <>
                  <Image
                    src={teamImage}
                    alt=""
                    aria-hidden
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="-z-20 object-cover"
                  />
                  <div className="absolute inset-0 -z-10 bg-primary/85" />
                </>
              )}
              <blockquote className="text-lg font-bold italic text-[#D4A843] sm:text-xl">
                {hook.quote.th}
              </blockquote>
              <p className="mt-2 text-sm italic text-[#D4A843]/75">{hook.quote.en}</p>
            </div>

            <Link
              href="/properties"
              className="mt-6 inline-block text-sm font-bold text-secondary underline-offset-2 hover:underline"
            >
              อยากดูทรัพย์ที่มีอยู่แล้ว? ดูทรัพย์ทั้งหมด → | Browse all properties →
            </Link>
          </div>

          <div className="lg:sticky lg:top-24">
            <div
              className="rounded-3xl border border-border bg-card p-6 shadow-lg sm:p-8"
              data-testid="property-match-form"
            >
              <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  {formCard.title.th}
                </h2>
                <p className="mt-1 text-sm font-medium text-secondary">{formCard.title.en}</p>
                <p className="mt-3 text-sm text-muted-foreground">{formCard.description.th}</p>
                <p className="mt-1 text-xs text-muted-foreground">{formCard.description.en}</p>
              </div>
              <RequestForm requestType="matchmaking" />
            </div>
          </div>
        </div>
      </PageSection>

      <StepsSection headline={steps.headline} steps={steps.items} />

      <PageSection variant="default">
        <div className="rounded-3xl bg-primary px-6 py-14 text-center sm:px-12 sm:py-16">
          <blockquote className="mx-auto max-w-3xl text-2xl font-bold italic leading-relaxed text-[#D4A843] sm:text-3xl">
            {hook.quote.th}
          </blockquote>
          <blockquote className="mx-auto mt-3 max-w-3xl text-base font-medium italic leading-relaxed text-[#D4A843]/75">
            {hook.quote.en}
          </blockquote>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">
            {hook.message.th}
          </p>
          <p className="mx-auto mt-2 max-w-3xl text-sm leading-relaxed text-white/60">
            {hook.message.en}
          </p>
        </div>
      </PageSection>

      <FaqSection
        title="คำถามที่พบบ่อย | FAQ"
        subtitle="ทุกข้อสงสัยเกี่ยวกับบริการจัดหาบ้าน เรามีคำตอบที่ชัดเจนให้ค่ะ | Clear answers about our property match service."
        items={faqs}
      />
    </>
  )
}
