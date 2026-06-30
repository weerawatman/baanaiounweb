import type { Metadata } from "next"
import Breadcrumb from "@/components/layout/Breadcrumb"
import { PainPointsHero, SolutionsSection, StepsSection, EmotionalHook, CTAWithForm } from "@/components/shared"
import { COAGENT_CONTENT } from "@/content/co-agent"

export function generateMetadata(): Metadata {
  return {
    title: COAGENT_CONTENT.seo.title,
    description: COAGENT_CONTENT.seo.description.th,
    openGraph: {
      title: COAGENT_CONTENT.seo.title,
      description: COAGENT_CONTENT.seo.description.th,
    },
  }
}

export default function CoAgentPage() {
  return (
    <>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "หน้าแรก", href: "/" },
            { label: "บริการของเรา | Our Services", href: "/services" },
            { label: "Co-Agent | Partner with Us" },
          ]}
        />
      </div>

      {/* Pain Points Hero */}
      <PainPointsHero
        headline={COAGENT_CONTENT.painPoints.headline.th}
        headlineEn={COAGENT_CONTENT.painPoints.headline.en}
        points={COAGENT_CONTENT.painPoints.points.map((p) => p.th)}
        pointsEn={COAGENT_CONTENT.painPoints.points.map((p) => p.en)}
      />

      {/* Solutions */}
      <SolutionsSection
        headline={COAGENT_CONTENT.solutions.headline.th}
        headlineEn={COAGENT_CONTENT.solutions.headline.en}
        subtitle={COAGENT_CONTENT.solutions.subtitle.th}
        description={COAGENT_CONTENT.solutions.description.th}
        descriptionEn={COAGENT_CONTENT.solutions.description.en}
        highlight={COAGENT_CONTENT.solutions.highlight.th}
        highlightEn={COAGENT_CONTENT.solutions.highlight.en}
        features={COAGENT_CONTENT.solutions.features.map((f) => f.th)}
        featuresEn={COAGENT_CONTENT.solutions.features.map((f) => f.en)}
      />

      {/* 3 Steps */}
      <StepsSection
        headline={COAGENT_CONTENT.steps.headline}
        steps={COAGENT_CONTENT.steps.items}
      />

      {/* Emotional Hook */}
      <EmotionalHook
        quote={COAGENT_CONTENT.hook.quote.th}
        quoteEn={COAGENT_CONTENT.hook.quote.en}
        message={COAGENT_CONTENT.hook.message.th}
        messageEn={COAGENT_CONTENT.hook.message.en}
      />

      {/* CTA + Form */}
      <CTAWithForm
        primary={COAGENT_CONTENT.cta.primary}
        secondary={COAGENT_CONTENT.cta.secondary}
        formVariant="co-agent"
      />
    </>
  )
}
