import { getLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import PageSection from "@/components/layout/PageSection"
import SectionTitle from "@/components/layout/SectionTitle"
import { SERVICES_HEADING, SERVICE_CARDS } from "@/content/homepage"
import type { Locale } from "@/i18n/routing"
import { pickLocalized } from "@/lib/i18n/pick-localized"
import { ThaiText } from "@/lib/thai-wrap"

const LEARN_MORE = { th: "อ่านรายละเอียด", en: "Learn More" } as const

export default async function ServiceShortcuts() {
  const locale = (await getLocale()) as Locale

  return (
    <PageSection variant="warm">
      <SectionTitle
        variant="plain"
        title={pickLocalized(locale, SERVICES_HEADING)}
        subtitle={
          <ThaiText
            text={pickLocalized(locale, {
              th: SERVICES_HEADING.subtitleTh,
              en: SERVICES_HEADING.subtitleEn,
            })}
          />
        }
      />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICE_CARDS.map((card) => (
          <div
            key={card.href}
            className="flex flex-col rounded-[20px] border border-border bg-card px-6 py-9 text-center shadow-[0_10px_30px_rgba(45,90,39,0.04)] transition-all duration-300 hover:-translate-y-2 hover:border-secondary/60 hover:shadow-[0_20px_40px_rgba(212,175,55,0.12)]"
          >
            <div
              className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-secondary/10 text-[1.75rem] text-secondary"
              aria-hidden
            >
              {card.emoji}
            </div>

            <h3 className="mb-3 text-lg font-semibold text-primary">
              {pickLocalized(locale, { th: card.titleTh, en: card.titleEn })}
            </h3>

            <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
              <ThaiText text={pickLocalized(locale, { th: card.descTh, en: card.descEn })} />
            </p>

            <div className="mt-auto flex flex-col gap-2.5">
              <Link
                href={card.href}
                className="flex min-h-[48px] items-center justify-center rounded-[10px] bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {pickLocalized(locale, { th: card.ctaTh, en: card.ctaEn })}
              </Link>
              <Link
                href={card.secondaryHref}
                className="flex min-h-[48px] items-center justify-center rounded-[10px] border border-border px-4 py-3 text-sm text-foreground transition-colors hover:border-secondary hover:bg-secondary/10 hover:text-secondary"
              >
                {pickLocalized(locale, LEARN_MORE)}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  )
}
