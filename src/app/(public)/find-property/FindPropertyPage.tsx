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

      <PageSection variant="warm" className="pt-0">
        <div className="relative z-10 -mt-8 mb-10">
          <ServiceLeadTabs active="matchmaking" />
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <h2 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">
              {split.headline.th}
              <br />
              {split.headline.thLine2}
            </h2>
            <p className="mt-2 text-lg font-medium text-secondary">{split.headline.en}</p>

            <p className="mt-5 inline-block border-b-2 border-[#eab308] pb-3 text-sm font-bold text-primary">
              {split.seo.th}
            </p>
            <p className="mt-1 text-xs font-medium text-muted-foreground">{split.seo.en}</p>

            <p className="mt-5 text-base leading-relaxed text-foreground/90">{split.lead.th}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{split.lead.en}</p>

            <ul className="mt-6 space-y-4">
              {split.benefits.map((item) => (
                <li
                  key={item.titleTh}
                  className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm"
                >
                  <span
                    className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-xl"
                    aria-hidden
                  >
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-foreground">{item.titleTh}</p>
                    <p className="text-xs font-medium text-muted-foreground">{item.titleEn}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">{item.descTh}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.descEn}</p>
                  </div>
                </li>
              ))}
            </ul>

            <PortfolioBento items={bentoItems} />

            <div className="relative isolate mt-8 overflow-hidden rounded-2xl px-6 py-12 text-center shadow-lg sm:px-10">
              {teamImage ? (
                <>
                  <Image
                    src={teamImage}
                    alt=""
                    aria-hidden
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="-z-20 object-cover grayscale-[30%] brightness-[0.7]"
                  />
                  <div className="absolute inset-0 -z-10 bg-primary/85" />
                </>
              ) : (
                <div className="absolute inset-0 -z-10 bg-primary" />
              )}
              <div className="relative z-10 text-primary-foreground">
                <p className="text-3xl" aria-hidden>
                  💛
                </p>
                <blockquote className="mt-2 text-lg font-bold italic text-[#eab308] sm:text-xl">
                  &ldquo;{hook.quote.th}&rdquo;
                </blockquote>
                <p className="mt-2 text-sm italic text-[#eab308]/80">&ldquo;{hook.quote.en}&rdquo;</p>
                <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
                  {hook.message.th}
                </p>
                <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-white/65">
                  {hook.message.en}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <div
              className="rounded-3xl border border-border bg-card p-6 shadow-lg sm:p-8"
              data-testid="property-match-form"
            >
              <div className="mb-6 border-b border-border pb-5 text-center">
                <h2 className="text-xl font-bold text-primary sm:text-2xl">
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

      <FaqSection
        title="คำถามที่พบบ่อย (FAQ)"
        subtitle="ทุกข้อสงสัยเกี่ยวกับบริการจัดหาบ้าน เรามีคำตอบที่ชัดเจนให้ค่ะ | Clear answers about our property match service."
        items={faqs}
        variant="boxed"
        layout="cards"
      />
    </>
  )
}
