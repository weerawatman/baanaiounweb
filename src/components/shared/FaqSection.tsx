import SectionTitle from "@/components/layout/SectionTitle"
import PageSection from "@/components/layout/PageSection"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

export interface FaqItem {
  id: string
  question: string
  answer: string
}

interface FaqSectionProps {
  title: string
  subtitle?: string
  items: FaqItem[]
  variant?: "default" | "boxed"
  layout?: "accordion" | "cards"
}

export default function FaqSection({
  title,
  subtitle,
  items,
  variant = "default",
  layout = "accordion",
}: FaqSectionProps) {
  if (items.length === 0) return null

  const contentWidth = layout === "cards" ? "w-full" : "mx-auto max-w-3xl"

  const faqList =
    layout === "cards" ? (
      <div className="mt-10 grid gap-5">
        {items.map((faq) => (
          <div
            key={faq.id}
            className="rounded-xl border border-[#eee] bg-[#fafafa] px-6 py-6 sm:px-8 sm:py-7"
          >
            <p className="flex gap-2.5 text-base font-bold text-primary sm:text-lg">
              <span className="shrink-0 text-[#ea580c]">Q:</span>
              {faq.question}
            </p>
            <div
              className="mt-3 pl-7 text-sm leading-relaxed text-[#555] sm:text-[0.95rem]"
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          </div>
        ))}
      </div>
    ) : (
      <div className="mt-10">
        <Accordion>
          {items.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <div
                  className="prose prose-sm max-w-none text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    )

  const content = (
    <div className={contentWidth}>
      <SectionTitle title={title} subtitle={subtitle} variant="plain" />
      {faqList}
    </div>
  )

  if (variant === "boxed") {
    return (
      <PageSection variant="default">
        <div className="rounded-3xl border border-border bg-card px-6 py-10 shadow-sm sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          {content}
        </div>
      </PageSection>
    )
  }

  return <PageSection variant="default">{content}</PageSection>
}
