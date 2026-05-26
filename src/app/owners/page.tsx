"use client"

import Breadcrumb from "@/components/layout/Breadcrumb"
import {
  PainPointsHero,
  SolutionsSection,
  EmotionalHook,
  CTAWithForm,
} from "@/components/shared"
import { OWNERS_CONTENT } from "@/lib/page-content"
import { MOCK_FAQS } from "@/lib/mock-data"
import SectionTitle from "@/components/layout/SectionTitle"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

export default function OwnersPage() {
  const ownerFaqs = MOCK_FAQS.filter((faq) => faq.pageSlug === "owners")

  return (
    <>
      <title>{OWNERS_CONTENT.seo.title}</title>
      <meta name="description" content={OWNERS_CONTENT.seo.description} />
      <meta property="og:title" content={OWNERS_CONTENT.seo.title} />
      <meta property="og:description" content={OWNERS_CONTENT.seo.description} />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "หน้าแรก", href: "/" },
            { label: "ฝากขาย/เช่า" },
          ]}
        />
      </div>

      {/* Pain Points Hero */}
      <PainPointsHero
        headline={OWNERS_CONTENT.painPoints.headline}
        points={OWNERS_CONTENT.painPoints.points}
      />

      {/* Solutions */}
      <SolutionsSection
        headline={OWNERS_CONTENT.solutions.headline}
        subtitle={OWNERS_CONTENT.solutions.subtitle}
        description={OWNERS_CONTENT.solutions.description}
        highlight={OWNERS_CONTENT.solutions.highlight}
        features={OWNERS_CONTENT.solutions.features}
      />

      {/* Emotional Hook */}
      <EmotionalHook
        quote={OWNERS_CONTENT.hook.quote}
        message={OWNERS_CONTENT.hook.message}
      />

      {/* CTA + Form */}
      <CTAWithForm
        primary={OWNERS_CONTENT.cta.primary}
        secondary={OWNERS_CONTENT.cta.secondary}
        formVariant="owner"
      />

      {/* FAQ */}
      {ownerFaqs.length > 0 && (
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              title="คำถามที่พบบ่อย"
              subtitle="สงสัยอะไร ถามพิมได้เลยค่ะ"
            />
            <div className="mt-10">
              <Accordion>
                {ownerFaqs.map((faq) => (
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
