"use client"

import Breadcrumb from "@/components/layout/Breadcrumb"
import {
  PainPointsHero,
  SolutionsSection,
  EmotionalHook,
  CTAWithForm,
} from "@/components/shared"
import { ACADEMY_CONTENT } from "@/lib/page-content"

export default function AcademyPage() {
  return (
    <>
      <title>{ACADEMY_CONTENT.seo.title}</title>
      <meta name="description" content={ACADEMY_CONTENT.seo.description} />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "หน้าแรก", href: "/" },
            { label: "สร้างรายได้กับอสังหาฯ" },
          ]}
        />
      </div>

      {/* Pain Points Hero */}
      <PainPointsHero
        headline={ACADEMY_CONTENT.painPoints.headline}
        points={ACADEMY_CONTENT.painPoints.points}
      />

      {/* Solutions */}
      <SolutionsSection
        headline={ACADEMY_CONTENT.solutions.headline}
        subtitle={ACADEMY_CONTENT.solutions.subtitle}
        description={ACADEMY_CONTENT.solutions.description}
        highlight={ACADEMY_CONTENT.solutions.highlight}
        features={ACADEMY_CONTENT.solutions.features}
      />

      {/* Emotional Hook */}
      <EmotionalHook
        quote={ACADEMY_CONTENT.hook.quote}
        message={ACADEMY_CONTENT.hook.message}
      />

      {/* CTA + Form */}
      <CTAWithForm
        primary={ACADEMY_CONTENT.cta.primary}
        secondary={ACADEMY_CONTENT.cta.secondary}
        formVariant="academy"
      />
    </>
  )
}
