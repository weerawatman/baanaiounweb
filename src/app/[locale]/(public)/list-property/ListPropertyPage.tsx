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
import { LIST_PROPERTY_CONTENT } from "@/content/list-property"
import RequestForm from "../request/RequestForm"

export function generateMetadata(): Metadata {
  return {
    title: LIST_PROPERTY_CONTENT.seo.title,
    description: LIST_PROPERTY_CONTENT.seo.description.th,
    openGraph: {
      title: LIST_PROPERTY_CONTENT.seo.title,
      description: LIST_PROPERTY_CONTENT.seo.description.th,
    },
  }
}

interface ListPropertyPageProps {
  heroImage?: string
  quoteImage?: string
  bentoItems: BentoItem[]
  faqs: FaqItem[]
}

export default function ListPropertyPage({
  heroImage,
  quoteImage,
  bentoItems,
  faqs,
}: ListPropertyPageProps) {
  const { banner, split, steps, hook, formCard } = LIST_PROPERTY_CONTENT

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <Breadcrumb
          items={[
            { label: "หน้าแรก", href: "/" },
            { label: "บริการของเรา | Our Services", href: "/services" },
            { label: "ฝากขาย/เช่า | List Your Property" },
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
          <ServiceLeadTabs active="list-property" />
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <h2 className="text-pretty text-xl font-bold leading-snug text-foreground sm:text-2xl lg:text-[1.75rem] xl:text-3xl">
              {split.headline.thLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-2 text-base font-medium text-secondary sm:text-lg">{split.headline.en}</p>

            <div className="mt-5 inline-block border-b-2 border-secondary pb-3">
              {split.seo.thLines.map((line) => (
                <p key={line} className="text-sm font-bold leading-snug text-primary">
                  {line}
                </p>
              ))}
            </div>
            <p className="mt-1 text-xs font-medium text-muted-foreground">{split.seo.en}</p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {split.benefits.map((item) => (
                <div
                  key={item.titleTh}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-sm"
                >
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-xl"
                    aria-hidden
                  >
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-foreground">{item.titleTh}</p>
                    <p className="text-xs font-medium text-muted-foreground">{item.titleEn}</p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/80">{item.descTh}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{item.descEn}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-primary/20 bg-primary-subtle/50 p-6">
              <h3 className="text-lg font-bold text-primary">{split.whyUs.titleTh}</h3>
              <p className="text-sm font-medium text-muted-foreground">{split.whyUs.titleEn}</p>
              <ul className="mt-4 space-y-4">
                {split.whyUs.items.map((item) => (
                  <li key={item.th} className="flex gap-3 text-sm">
                    <span className="shrink-0 text-primary" aria-hidden>
                      ✅
                    </span>
                    <div>
                      <p className="font-bold text-foreground">{item.th}</p>
                      <p className="text-xs font-medium text-muted-foreground">{item.en}</p>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/80">{item.descTh}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{item.descEn}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <PortfolioBento items={bentoItems} />

            <div className="relative isolate mt-8 overflow-hidden rounded-2xl px-6 py-12 text-center shadow-lg sm:px-10">
              {quoteImage ? (
                <>
                  <Image
                    src={quoteImage}
                    alt=""
                    aria-hidden
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="-z-20 object-cover grayscale-[50%]"
                  />
                  <div className="absolute inset-0 -z-10 bg-primary/90" />
                </>
              ) : (
                <div className="absolute inset-0 -z-10 bg-primary" />
              )}
              <div className="relative z-10 text-primary-foreground">
                <p className="text-3xl" aria-hidden>
                  💛
                </p>
                <blockquote className="mt-2 text-lg font-bold italic text-secondary sm:text-xl">
                  &ldquo;{hook.quote.th}&rdquo;
                </blockquote>
                <p className="mt-2 text-sm italic text-secondary/80">&ldquo;{hook.quote.en}&rdquo;</p>
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
              data-testid="list-property-form"
            >
              <div className="mb-6 border-b border-border pb-5 text-center">
                <h2 className="text-xl font-bold text-primary sm:text-2xl">
                  {formCard.title.th}
                </h2>
                <p className="mt-1 text-sm font-medium text-secondary">{formCard.title.en}</p>
                <p className="mt-3 text-sm text-muted-foreground">{formCard.description.th}</p>
                <p className="mt-1 text-xs text-muted-foreground">{formCard.description.en}</p>
              </div>
              <RequestForm requestType="list-property" />
            </div>
          </div>
        </div>
      </PageSection>

      <StepsSection headline={steps.headline} steps={steps.items} />

      <FaqSection
        title="คำถามที่พบบ่อยเกี่ยวกับการฝากทรัพย์ (FAQ)"
        subtitle="เปลี่ยนความกังวลให้เป็นความมั่นใจ ทุกข้อสงสัยเรามีคำตอบให้ค่ะ | Turn worries into confidence — we have clear answers."
        items={faqs}
        variant="boxed"
        layout="cards"
      />
    </>
  )
}
