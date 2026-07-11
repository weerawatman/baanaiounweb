import PageSection from "@/components/layout/PageSection"
import SectionTitle from "@/components/layout/SectionTitle"
import { HOME_WHY_CHOOSE } from "@/content/homepage"

export default function WhyChoosePillars() {
  return (
    <PageSection variant="default">
      <SectionTitle
        title={`${HOME_WHY_CHOOSE.heading.th} | ${HOME_WHY_CHOOSE.heading.en}`}
      />
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
        {HOME_WHY_CHOOSE.pillars.map((pillar) => (
          <div
            key={pillar.titleTh}
            className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
          >
            <span className="text-4xl" aria-hidden>
              {pillar.icon}
            </span>
            <h3 className="mt-4 text-base font-bold text-foreground">{pillar.titleTh}</h3>
            <p className="mt-1 text-sm font-medium text-muted-foreground">{pillar.titleEn}</p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">{pillar.descTh}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{pillar.descEn}</p>
          </div>
        ))}
      </div>
    </PageSection>
  )
}
