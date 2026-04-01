"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { MOCK_FAQS } from "@/lib/mock-data";

const homeFaqs = MOCK_FAQS.filter((faq) => faq.pageSlug === "home");

export default function FAQSection() {
  return (
    <section className="py-16 bg-[#F5F0E8]">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Section title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B4D3E]">
            คำถามที่พบบ่อย
          </h2>
          <p className="mt-3 text-gray-600 text-sm md:text-base">
            มีข้อสงสัยไหม? พิมตอบให้ทุกข้อค่ะ
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm px-6 py-2">
          <Accordion>
            {homeFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="py-4 text-sm font-semibold text-gray-900 hover:text-[#1B4D3E] hover:no-underline transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-700 leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
