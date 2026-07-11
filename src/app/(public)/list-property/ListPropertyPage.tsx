import type { Metadata } from "next"
import Breadcrumb from "@/components/layout/Breadcrumb"
import PageSection from "@/components/layout/PageSection"
import {
  PageHeroBanner,
  ServiceLeadTabs,
  PortfolioBento,
  FaqSection,
  EmotionalHook,
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
  bentoItems: BentoItem[]
  faqs: FaqItem[]
}

export default function ListPropertyPage({
  heroImage,
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

      <PageSection variant="warm" className="pt-8 lg:pt-10">
        <ServiceLeadTabs active="list-property" />

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <h2 className="text-2xl font-bold leading-tight text-primary sm:text-3xl">
              {split.headline.th}
            </h2>
            <p className="mt-2 text-lg font-medium text-secondary">{split.headline.en}</p>

            <p className="mt-4 text-sm font-semibold text-muted-foreground">{split.seo.th}</p>
            <p className="text-xs text-muted-foreground/80">{split.seo.en}</p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {split.benefits.map((item) => (
                <div
                  key={item.titleTh}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                >
                  <span className="text-2xl" aria-hidden>
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-foreground">{item.titleTh}</p>
                    <p className="text-xs font-medium text-muted-foreground">{item.titleEn}</p>
                    <p className="mt-1 text-xs text-foreground/80">{item.descTh}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <h3 className="text-lg font-bold text-primary">{split.whyUs.titleTh}</h3>
              <p className="text-sm font-medium text-muted-foreground">{split.whyUs.titleEn}</p>
              <ul className="mt-4 space-y-3">
                {split.whyUs.items.map((item) => (
                  <li key={item.th} className="flex gap-2 text-sm">
                    <span className="shrink-0 text-primary" aria-hidden>
                      ✅
                    </span>
                    <div>
                      <p className="font-medium text-foreground">{item.th}</p>
                      <p className="text-xs text-muted-foreground">{item.en}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <PortfolioBento items={bentoItems} />

            <div className="mt-8">
              <h3 className="text-lg font-bold text-primary">
                {steps.headline.split("|")[0].trim()}
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {steps.items.map((step) => (
                  <div
                    key={step.number}
                    className="rounded-xl border border-border bg-card p-4 text-center"
                  >
                    <div className="mx-auto flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {step.number}
                    </div>
                    <p className="mt-3 text-sm font-bold text-foreground">{step.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <div
              className="rounded-3xl border border-border bg-card p-6 shadow-lg sm:p-8"
              data-testid="list-property-form"
            >
              <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
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

      <EmotionalHook
        quote={hook.quote.th}
        quoteEn={hook.quote.en}
        message={hook.message.th}
        messageEn={hook.message.en}
      />

      <FaqSection
        title="คำถามที่พบบ่อย | FAQ"
        subtitle="สงสัยอะไร ถามพิมได้เลยค่ะ | Have questions? Just ask Pim!"
        items={faqs}
      />
    </>
  )
}
