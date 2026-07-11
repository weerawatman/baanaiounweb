import type { FAQ } from "@/types"
import type { FaqItem } from "@/components/shared/FaqSection"

export function mapFaqsToItems(faqs: FAQ[]): FaqItem[] {
  return faqs.map((faq) => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
  }))
}
