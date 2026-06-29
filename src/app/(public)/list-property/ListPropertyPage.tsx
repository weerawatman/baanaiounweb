"use client"

import Breadcrumb from "@/components/layout/Breadcrumb"
import { PainPointsHero, SolutionsSection, StepsSection, EmotionalHook, CTAWithForm } from "@/components/shared"
import { LIST_PROPERTY_CONTENT } from "@/content/list-property"
import { type FAQ } from "@/types"
import SectionTitle from "@/components/layout/SectionTitle"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

interface ListPropertyPageProps {
  faqs: FAQ[]
}

export default function ListPropertyPage({ faqs }: ListPropertyPageProps) {
  return (
    <>
      <title>{LIST_PROPERTY_CONTENT.seo.title}</title>
      <meta name="description" content={LIST_PROPERTY_CONTENT.seo.description.th} />
      <meta property="og:title" content={LIST_PROPERTY_CONTENT.seo.title} />
      <meta property="og:description" content={LIST_PROPERTY_CONTENT.seo.description.th} />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "หน้าแรก", href: "/" },
            { label: "บริการของเรา | Our Services", href: "/services" },
            { label: "ฝากขาย/เช่า | List Your Property" },
          ]}
        />
      </div>

      {/* Pain Points Hero */}
      <PainPointsHero
        headline={LIST_PROPERTY_CONTENT.painPoints.headline.th}
        headlineEn={LIST_PROPERTY_CONTENT.painPoints.headline.en}
        points={LIST_PROPERTY_CONTENT.painPoints.points.map((p) => p.th)}
        pointsEn={LIST_PROPERTY_CONTENT.painPoints.points.map((p) => p.en)}
      />

      {/* Solutions */}
      <SolutionsSection
        headline={LIST_PROPERTY_CONTENT.solutions.headline.th}
        headlineEn={LIST_PROPERTY_CONTENT.solutions.headline.en}
        subtitle={LIST_PROPERTY_CONTENT.solutions.subtitle}
        description={LIST_PROPERTY_CONTENT.solutions.description.th}
        descriptionEn={LIST_PROPERTY_CONTENT.solutions.description.en}
        highlight={LIST_PROPERTY_CONTENT.solutions.highlight.th}
        highlightEn={LIST_PROPERTY_CONTENT.solutions.highlight.en}
        features={LIST_PROPERTY_CONTENT.solutions.features.map((f) => f.th)}
        featuresEn={LIST_PROPERTY_CONTENT.solutions.features.map((f) => f.en)}
      />

      {/* 3 Steps */}
      <StepsSection
        headline={LIST_PROPERTY_CONTENT.steps.headline}
        steps={LIST_PROPERTY_CONTENT.steps.items}
      />

      {/* Emotional Hook */}
      <EmotionalHook
        quote={LIST_PROPERTY_CONTENT.hook.quote.th}
        quoteEn={LIST_PROPERTY_CONTENT.hook.quote.en}
        message={LIST_PROPERTY_CONTENT.hook.message.th}
        messageEn={LIST_PROPERTY_CONTENT.hook.message.en}
      />

      {/* CTA + Form */}
      <CTAWithForm
        primary={LIST_PROPERTY_CONTENT.cta.primary}
        secondary={LIST_PROPERTY_CONTENT.cta.secondary}
        formVariant="owner"
      />

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <SectionTitle title="คำถามที่พบบ่อย | FAQ" subtitle="สงสัยอะไร ถามพิมได้เลยค่ะ | Have questions? Just ask Pim!" />
            <div className="mt-10">
              <Accordion>
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
