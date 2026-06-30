import type { Metadata } from "next"
import Breadcrumb from "@/components/layout/Breadcrumb"
import { PainPointsHero, SolutionsSection, StepsSection, EmotionalHook, CTAWithForm } from "@/components/shared"
import { FIND_PROPERTY_CONTENT } from "@/content/find-property"

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

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "หน้าแรก", href: "/" },
            { label: "บริการของเรา | Our Services", href: "/services" },
            { label: "ค้นหาบ้าน/สินเชื่อ | Find Your Home" },
          ]}
        />
      </div>

      {/* Pain Points Hero */}
      <PainPointsHero
        headline={FIND_PROPERTY_CONTENT.painPoints.headline.th}
        headlineEn={FIND_PROPERTY_CONTENT.painPoints.headline.en}
        points={FIND_PROPERTY_CONTENT.painPoints.points.map((p) => p.th)}
        pointsEn={FIND_PROPERTY_CONTENT.painPoints.points.map((p) => p.en)}
      />

      {/* Solutions */}
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

      {/* 3 Steps */}
      <StepsSection
        headline={FIND_PROPERTY_CONTENT.steps.headline}
        steps={FIND_PROPERTY_CONTENT.steps.items}
      />

      {/* Emotional Hook */}
      <EmotionalHook
        quote={FIND_PROPERTY_CONTENT.hook.quote.th}
        quoteEn={FIND_PROPERTY_CONTENT.hook.quote.en}
        message={FIND_PROPERTY_CONTENT.hook.message.th}
        messageEn={FIND_PROPERTY_CONTENT.hook.message.en}
      />

      {/* CTA + Form */}
      <CTAWithForm
        primary={FIND_PROPERTY_CONTENT.cta.primary}
        secondary={FIND_PROPERTY_CONTENT.cta.secondary}
        formVariant="buyer"
      />
    </>
  )
}
