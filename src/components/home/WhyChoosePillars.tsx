import PageSection from "@/components/layout/PageSection"
import SectionTitle from "@/components/layout/SectionTitle"
import { HOME_WHY_CHOOSE } from "@/content/homepage"

const iconBg = ["bg-primary", "bg-secondary", "bg-accent"] as const

export default function WhyChoosePillars() {
  return (
    <PageSection variant="default">
      <SectionTitle
        variant="plain"
        title={`${HOME_WHY_CHOOSE.heading.th} | ${HOME_WHY_CHOOSE.heading.en}`}
      />

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
        {HOME_WHY_CHOOSE.pillars.map((pillar, index) => (
          <div
            key={pillar.titleTh}
            className="rounded-[20px] border border-border bg-card px-8 py-10 text-center shadow-[0_8px_25px_rgba(45,90,39,0.03)]"
          >
            <span
              className={`mx-auto flex size-[4.5rem] -rotate-6 items-center justify-center rounded-[20px] text-[2.125rem] text-white shadow-[0_10px_20px_rgba(0,0,0,0.1)] ${iconBg[index % iconBg.length]}`}
              aria-hidden
            >
              {pillar.icon}
            </span>
            <h3 className="mt-6 text-lg font-semibold text-primary">{pillar.titleTh}</h3>
            <p className="mt-1 text-sm font-medium text-muted-foreground">{pillar.titleEn}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{pillar.descTh}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground/80">{pillar.descEn}</p>
          </div>
        ))}
      </div>
    </PageSection>
  )
}
