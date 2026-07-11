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
}

export default function FaqSection({
  title,
  subtitle,
  items,
  variant = "default",
}: FaqSectionProps) {
  if (items.length === 0) return null

  const content = (
    <div className="mx-auto max-w-3xl">
      <SectionTitle title={title} subtitle={subtitle} />
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
    </div>
  )

  if (variant === "boxed") {
    return (
      <PageSection variant="default">
        <div className="rounded-2xl border border-border bg-muted/40 px-6 py-10 sm:px-10 sm:py-14">
          {content}
        </div>
      </PageSection>
    )
  }

  return <PageSection variant="default">{content}</PageSection>
}
