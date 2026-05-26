"use client"

import Breadcrumb from "@/components/layout/Breadcrumb"
import {
  PainPointsHero,
  SolutionsSection,
  EmotionalHook,
  CTAWithForm,
} from "@/components/shared"
import { COAGENT_CONTENT } from "@/lib/page-content"

export default function CoAgentPage() {
  return (
    <>
      <title>{COAGENT_CONTENT.seo.title}</title>
      <meta name="description" content={COAGENT_CONTENT.seo.description} />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "หน้าแรก", href: "/" },
            { label: "Co-Agent เครือข่ายนายหน้า" },
          ]}
        />
      </div>

      {/* Pain Points Hero */}
      <PainPointsHero
        headline={COAGENT_CONTENT.painPoints.headline}
        points={COAGENT_CONTENT.painPoints.points}
      />

      {/* Solutions */}
      <SolutionsSection
        headline={COAGENT_CONTENT.solutions.headline}
        subtitle={COAGENT_CONTENT.solutions.subtitle}
        description={COAGENT_CONTENT.solutions.description}
        highlight={COAGENT_CONTENT.solutions.highlight}
        features={COAGENT_CONTENT.solutions.features}
      />

      {/* Emotional Hook */}
      <EmotionalHook
        quote={COAGENT_CONTENT.hook.quote}
        message={COAGENT_CONTENT.hook.message}
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
