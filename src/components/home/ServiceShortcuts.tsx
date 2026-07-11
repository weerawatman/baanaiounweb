import PageSection from "@/components/layout/PageSection"
import SectionTitle from "@/components/layout/SectionTitle"
import { SERVICES_HEADING, SERVICE_CARDS } from "@/content/homepage"
import Link from "next/link"

export default function ServiceShortcuts() {
  return (
    <PageSection variant="warm">
      <SectionTitle
        variant="plain"
        title="บริการของเรา | Our Services"
        subtitle={`${SERVICES_HEADING.subtitleTh} | ${SERVICES_HEADING.subtitleEn}`}
      />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICE_CARDS.map((card) => (
          <div
            key={card.href}
            className="flex flex-col rounded-[20px] border border-border bg-card px-6 py-9 text-center shadow-[0_10px_30px_rgba(45,90,39,0.04)] transition-all duration-300 hover:-translate-y-2 hover:border-secondary/60 hover:shadow-[0_20px_40px_rgba(212,175,55,0.12)]"
          >
            <div
              className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-[#fdf9ee] text-[1.75rem] text-[#b5932b]"
              aria-hidden
            >
              {card.emoji}
            </div>

            <h3 className="mb-3 text-lg font-semibold text-primary">
              {card.titleTh}
              <span className="mt-1 block text-sm font-medium text-muted-foreground">
                {card.titleEn}
              </span>
            </h3>

            <p className="mb-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {card.descTh}
            </p>
            <p className="mb-6 text-xs leading-relaxed text-muted-foreground/80">{card.descEn}</p>

            <div className="mt-auto flex flex-col gap-2.5">
              <Link
                href={card.href}
                className="flex min-h-[48px] items-center justify-center rounded-[10px] bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {card.ctaTh}
                <span className="ml-1.5 text-xs font-medium text-primary-foreground/90">
                  | {card.ctaEn}
                </span>
              </Link>
              <Link
                href={card.secondaryHref}
                className="flex min-h-[48px] items-center justify-center rounded-[10px] border border-border px-4 py-3 text-sm text-foreground transition-colors hover:border-secondary hover:bg-[#fdf9ee] hover:text-[#b5932b]"
              >
                อ่านรายละเอียด | Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  )
}
