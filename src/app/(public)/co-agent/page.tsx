"use client"

import Breadcrumb from "@/components/layout/Breadcrumb"
import { PainPointsHero, SolutionsSection, EmotionalHook, CTAWithForm } from "@/components/shared"
import { COAGENT_CONTENT } from "@/content/co-agent"

export default function CoAgentPage() {
  return (
    <>
      <title>{COAGENT_CONTENT.seo.title}</title>
      <meta name="description" content={COAGENT_CONTENT.seo.description.th} />
      <meta property="og:title" content={COAGENT_CONTENT.seo.title} />
      <meta property="og:description" content={COAGENT_CONTENT.seo.description.th} />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[{ label: "หน้าแรก", href: "/" }, { label: "Co-Agent | Partner with Us" }]}
        />
      </div>

      {/* Pain Points Hero */}
      <PainPointsHero
        headline={COAGENT_CONTENT.painPoints.headline.th}
        points={COAGENT_CONTENT.painPoints.points.map(p => p.th)}
      />

      {/* Solutions */}
      <SolutionsSection
        headline={COAGENT_CONTENT.solutions.headline.th}
        subtitle={COAGENT_CONTENT.solutions.subtitle.th}
        description={COAGENT_CONTENT.solutions.description.th}
        highlight={COAGENT_CONTENT.solutions.highlight.th}
        features={COAGENT_CONTENT.solutions.features.map(f => f.th)}
      />

      {/* Emotional Hook */}
      <EmotionalHook quote={COAGENT_CONTENT.hook.quote.th} message={COAGENT_CONTENT.hook.message.th} />

      {/* CTA + Form */}
      <CTAWithForm
        primary={COAGENT_CONTENT.cta.primary}
        secondary={COAGENT_CONTENT.cta.secondary}
        formVariant="co-agent"
      />
    </>
  )
}
