"use client"

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import PageSection from "@/components/layout/PageSection"
import SectionTitle from "@/components/layout/SectionTitle"
import { type FAQ } from "@/types"

interface FAQSectionProps {
  faqs: FAQ[]
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <PageSection variant="warm">
      <SectionTitle
        title="คำถามที่พบบ่อย | FAQ"
        subtitle="มีข้อสงสัยไหม? พิมตอบให้ทุกข้อค่ะ"
      />

      <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border bg-card px-6 py-2 shadow-sm">
        <Accordion>
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="py-4 text-sm font-semibold text-foreground transition-colors hover:text-primary hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </PageSection>
  )
}
