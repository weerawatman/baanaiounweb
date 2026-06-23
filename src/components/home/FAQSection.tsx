"use client"

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { type FAQ } from "@/types"

interface FAQSectionProps {
  faqs: FAQ[]
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section className="bg-[#F5F0E8] py-16">
      <div className="container mx-auto max-w-3xl px-4">
        {/* Section title */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-[#1B4D3E] md:text-3xl">คำถามที่พบบ่อย</h2>
          <p className="mt-3 text-sm text-gray-600 md:text-base">
            มีข้อสงสัยไหม? พิมตอบให้ทุกข้อค่ะ
          </p>
        </div>

        <div className="rounded-2xl bg-white px-6 py-2 shadow-sm">
          <Accordion>
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="py-4 text-sm font-semibold text-gray-900 transition-colors hover:text-[#1B4D3E] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
