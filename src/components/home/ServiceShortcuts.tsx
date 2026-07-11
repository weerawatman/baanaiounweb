import PageSection from "@/components/layout/PageSection"
import SectionTitle from "@/components/layout/SectionTitle"
import { SERVICES_HEADING, SERVICE_CARDS } from "@/content/homepage"
import Link from "next/link"

export default function ServiceShortcuts() {
  return (
    <PageSection variant="default" className="bg-[#f8f6f0]">
      <SectionTitle
        variant="plain"
        title="บริการของเรา | Our Services"
        subtitle={`${SERVICES_HEADING.subtitleTh} | ${SERVICES_HEADING.subtitleEn}`}
      />

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICE_CARDS.map((card) => (
          <div
            key={card.href}
            className="flex flex-col rounded-[20px] bg-primary px-6 py-9 text-center text-white shadow-[0_10px_25px_rgba(20,83,45,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(20,83,45,0.25)]"
          >
            <div className="mb-4 text-5xl" aria-hidden>
              {card.emoji}
            </div>

            <h3 className="mb-4 border-b border-white/20 pb-4 text-xl font-bold">
              {card.titleTh}
              <span className="mt-1 block text-sm font-medium text-white/75">{card.titleEn}</span>
            </h3>

            <p className="mb-6 flex-1 text-[0.95rem] leading-relaxed text-[#f0fdf4]">
              {card.descTh}
            </p>
            <p className="mb-6 text-xs leading-relaxed text-white/65">{card.descEn}</p>

            <div className="mt-auto flex flex-col gap-3">
              <Link
                href={card.href}
                className="flex min-h-[48px] items-center justify-center rounded-lg bg-[#ea580c] px-4 py-3 text-base font-bold text-white transition-colors hover:bg-[#d04d08]"
              >
                {card.ctaTh}
                <span className="ml-1.5 text-sm font-medium text-white/90">| {card.ctaEn}</span>
              </Link>
              <Link
                href={card.secondaryHref}
                className="flex min-h-[48px] items-center justify-center rounded-lg border border-white/60 px-4 py-3 text-[0.95rem] text-white transition-colors hover:border-white hover:bg-white/10"
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
