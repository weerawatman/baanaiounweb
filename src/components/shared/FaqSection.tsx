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

  const faqList =
    layout === "cards" ? (
      <div className="mt-10 grid gap-4">
        {items.map((faq) => (
          <div
            key={faq.id}
            className="rounded-xl border border-border bg-muted/30 px-6 py-6 sm:px-8"
          >
            <p className="flex gap-2 text-base font-bold text-foreground">
              <span className="shrink-0 text-[#ea580c]">Q:</span>
              {faq.question}
            </p>
            <div
              className="mt-3 pl-7 text-sm leading-relaxed text-muted-foreground"
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
    <div className="mx-auto max-w-3xl">
      <SectionTitle title={title} subtitle={subtitle} variant="plain" />
      {faqList}
    </div>
  )

  if (variant === "boxed") {
    return (
      <PageSection variant="default">
        <div className="rounded-3xl border border-border bg-card px-6 py-10 shadow-sm sm:px-10 sm:py-14">
          {content}
        </div>
      </PageSection>
    )
  }

  return <PageSection variant="default">{content}</PageSection>
}
