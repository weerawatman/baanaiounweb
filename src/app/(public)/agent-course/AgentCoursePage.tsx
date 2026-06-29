"use client"

import Breadcrumb from "@/components/layout/Breadcrumb"
import { PainPointsHero, SolutionsSection, EmotionalHook, CTAWithForm } from "@/components/shared"
import { AGENT_COURSE_CONTENT } from "@/content/agent-course"

export default function AgentCoursePage() {
  return (
    <>
      <title>{AGENT_COURSE_CONTENT.seo.title}</title>
      <meta name="description" content={AGENT_COURSE_CONTENT.seo.description.th} />
      <meta property="og:title" content={AGENT_COURSE_CONTENT.seo.title} />
      <meta property="og:description" content={AGENT_COURSE_CONTENT.seo.description.th} />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "หน้าแรก", href: "/" }, { label: "คอร์สนายหน้า | Agent Course" }]} />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#1B4D3E] to-[#0d2820] py-16 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            {AGENT_COURSE_CONTENT.hero.h1.th}
          </h1>
          <p className="mt-6 text-lg text-gray-200">
            {AGENT_COURSE_CONTENT.hero.sub.th}
          </p>
        </div>
      </section>

      {/* Pain Points Hero */}
      <PainPointsHero
        headline={AGENT_COURSE_CONTENT.painPoints.headline.th}
        points={AGENT_COURSE_CONTENT.painPoints.points.map(p => p.th)}
      />

      {/* Day 1 Solutions */}
      <SolutionsSection
        headline={AGENT_COURSE_CONTENT.solutions.headline.th}
        subtitle={AGENT_COURSE_CONTENT.solutions.subtitle.th}
        description={AGENT_COURSE_CONTENT.solutions.description.th}
        highlight={AGENT_COURSE_CONTENT.solutions.highlight.th}
        features={AGENT_COURSE_CONTENT.solutions.features.map(f => f.th)}
      />

      {/* Day 2 Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#1B4D3E] sm:text-3xl">
              {AGENT_COURSE_CONTENT.dayTwo.headline.th}
            </h2>
            <p className="mt-4 text-gray-600">
              {AGENT_COURSE_CONTENT.dayTwo.description.th}
            </p>
          </div>
          <div className="space-y-4">
            {AGENT_COURSE_CONTENT.dayTwo.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                <div className="flex-shrink-0 text-2xl">{feature.th.split(' ')[0]}</div>
                <p className="text-gray-700">{feature.th.substring(feature.th.indexOf(' ') + 1)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[#1B4D3E] sm:text-3xl">
            {AGENT_COURSE_CONTENT.results.headline.th}
          </h2>
          <p className="mt-4 text-gray-600">
            {AGENT_COURSE_CONTENT.results.description.th}
          </p>
        </div>
      </section>

      {/* Emotional Hook */}
      <EmotionalHook quote={AGENT_COURSE_CONTENT.hook.quote.th} message={AGENT_COURSE_CONTENT.hook.message.th} />

      {/* CTA + Form */}
      <CTAWithForm
        primary={AGENT_COURSE_CONTENT.cta.primary}
        secondary={AGENT_COURSE_CONTENT.cta.secondary}
        formVariant="academy"
      />
    </>
  )
}