import type { Metadata } from "next"
import Link from "next/link"
import Breadcrumb from "@/components/layout/Breadcrumb"
import PageSection from "@/components/layout/PageSection"
import { SolutionsSection, StepsSection, EmotionalHook } from "@/components/shared"
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

export default function FindPropertyPage() {
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

      <PageSection variant="warm" className="pt-4 lg:pt-6">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="py-4 lg:py-8">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              งานหาทรัพย์ | Property Match
            </span>

            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {FIND_PROPERTY_CONTENT.hero.headline.th}
            </h1>
            <p className="mt-2 text-lg font-medium text-secondary sm:text-xl">
              {FIND_PROPERTY_CONTENT.hero.headline.en}
            </p>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/90">
              {FIND_PROPERTY_CONTENT.hero.description.th}
            </p>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              {FIND_PROPERTY_CONTENT.hero.description.en}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {FIND_PROPERTY_CONTENT.hero.highlights.map((item) => (
                <div
                  key={item.th}
                  className="rounded-2xl border border-border bg-card p-4 shadow-sm"
                >
                  <p className="text-sm font-semibold text-primary">{item.th}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.en}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              อยากดูทรัพย์ที่มีอยู่แล้ว?{" "}
              <Link href="/properties" className="font-semibold text-primary underline-offset-2 hover:underline">
                ดูทรัพย์ทั้งหมด | Browse all properties
              </Link>
            </p>
          </div>

          <div className="lg:pb-4">
            <div
              className="rounded-3xl border border-border bg-card p-6 shadow-lg sm:p-8"
              data-testid="property-match-form"
            >
              <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  {FIND_PROPERTY_CONTENT.formCard.title.th}
                </h2>
                <p className="mt-1 text-sm font-medium text-secondary">
                  {FIND_PROPERTY_CONTENT.formCard.title.en}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {FIND_PROPERTY_CONTENT.formCard.description.th}
                </p>
              </div>

              <RequestForm requestType="matchmaking" />
            </div>
          </div>
        </div>
      </PageSection>

      <SolutionsSection
        headline={FIND_PROPERTY_CONTENT.solutions.headline.th}
        headlineEn={FIND_PROPERTY_CONTENT.solutions.headline.en}
        subtitle={FIND_PROPERTY_CONTENT.solutions.subtitle}
        description={FIND_PROPERTY_CONTENT.solutions.description.th}
        descriptionEn={FIND_PROPERTY_CONTENT.solutions.description.en}
        highlight={FIND_PROPERTY_CONTENT.solutions.highlight.th}
        highlightEn={FIND_PROPERTY_CONTENT.solutions.highlight.en}
        features={FIND_PROPERTY_CONTENT.solutions.features.map((f) => f.th)}
        featuresEn={FIND_PROPERTY_CONTENT.solutions.features.map((f) => f.en)}
      />

      <StepsSection
        headline={FIND_PROPERTY_CONTENT.steps.headline}
        steps={FIND_PROPERTY_CONTENT.steps.items}
      />

      <EmotionalHook
        quote={FIND_PROPERTY_CONTENT.hook.quote.th}
        quoteEn={FIND_PROPERTY_CONTENT.hook.quote.en}
        message={FIND_PROPERTY_CONTENT.hook.message.th}
        messageEn={FIND_PROPERTY_CONTENT.hook.message.en}
      />
    </>
  )
}
