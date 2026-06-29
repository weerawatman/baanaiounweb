"use client"

import Breadcrumb from "@/components/layout/Breadcrumb"
import { PainPointsHero, SolutionsSection, EmotionalHook, CTAWithForm } from "@/components/shared"
import { FIND_PROPERTY_CONTENT } from "@/content/find-property"

export default function FindPropertyPage() {
  return (
    <>
      <title>{FIND_PROPERTY_CONTENT.seo.title}</title>
      <meta name="description" content={FIND_PROPERTY_CONTENT.seo.description.th} />
      <meta property="og:title" content={FIND_PROPERTY_CONTENT.seo.title} />
      <meta property="og:description" content={FIND_PROPERTY_CONTENT.seo.description.th} />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "หน้าแรก", href: "/" }, { label: "ค้นหาบ้าน/สินเชื่อ | Find Your Home" }]} />
      </div>

      {/* Pain Points Hero */}
      <PainPointsHero
        headline={FIND_PROPERTY_CONTENT.painPoints.headline.th}
        points={FIND_PROPERTY_CONTENT.painPoints.points.map(p => p.th)}
      />

      {/* Solutions */}
      <SolutionsSection
        headline={FIND_PROPERTY_CONTENT.solutions.headline.th}
        subtitle={FIND_PROPERTY_CONTENT.solutions.subtitle}
        description={FIND_PROPERTY_CONTENT.solutions.description.th}
        highlight={FIND_PROPERTY_CONTENT.solutions.highlight.th}
        features={FIND_PROPERTY_CONTENT.solutions.features.map(f => f.th)}
      />

      {/* Emotional Hook */}
      <EmotionalHook quote={FIND_PROPERTY_CONTENT.hook.quote.th} message={FIND_PROPERTY_CONTENT.hook.message.th} />

      {/* CTA + Form */}
      <CTAWithForm
        primary={FIND_PROPERTY_CONTENT.cta.primary}
        secondary={FIND_PROPERTY_CONTENT.cta.secondary}
        formVariant="buyer"
      />
    </>
  )
}