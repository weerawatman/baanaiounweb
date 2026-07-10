import type { Metadata } from "next"
import Image from "next/image"
import Breadcrumb from "@/components/layout/Breadcrumb"

export const revalidate = 1800
import { PainPointsHero, SolutionsSection, StepsSection, EmotionalHook, CTAWithForm } from "@/components/shared"
import { COAGENT_CONTENT } from "@/content/co-agent"
import { getProfile } from "@/lib/queries/profile"

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

export default async function CoAgentPage() {
  const profile = await getProfile()
  const heroImage = profile.coAgentHeroImage

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

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#1B4D3E] to-[#0d2820] py-16 text-white">
        {heroImage && (
          <>
            <Image
              src={heroImage}
              alt=""
              aria-hidden
              fill
              priority
              sizes="100vw"
              className="-z-20 object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#1B4D3E]/85 to-[#0d2820]/90" />
          </>
        )}
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">{COAGENT_CONTENT.seo.title}</h1>
        </div>
      </section>

      {/* Pain Points Hero */}
      <PainPointsHero
        headingLevel="h2"
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
