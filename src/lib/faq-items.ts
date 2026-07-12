import { getLocale } from "next-intl/server"
import type { FAQ } from "@/types"
import type { FaqItem } from "@/components/shared/FaqSection"
import type { Locale } from "@/i18n/routing"
import { localizedOrFallback } from "@/lib/i18n/pick-localized"

export function mapFaqsToItems(faqs: FAQ[], locale: Locale): FaqItem[] {
  return faqs.map((faq) => ({
    id: faq.id,
    question: localizedOrFallback(locale, faq.question, faq.questionEn),
    answer: localizedOrFallback(locale, faq.answer, faq.answerEn),
  }))
}

/** Convenience for route handlers — resolves locale from the current request. */
export async function getLocalizedFaqItems(faqs: FAQ[]): Promise<FaqItem[]> {
  const locale = (await getLocale()) as Locale
  return mapFaqsToItems(faqs, locale)
}
