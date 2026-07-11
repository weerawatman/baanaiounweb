import PageSection from "@/components/layout/PageSection"
import SectionTitle from "@/components/layout/SectionTitle"
import { HOME_WHY_CHOOSE } from "@/content/homepage"

export default function WhyChoosePillars() {
  return (
    <PageSection variant="default" className="bg-[#f8f6f0]">
      <SectionTitle
        variant="plain"
        title={`${HOME_WHY_CHOOSE.heading.th} | ${HOME_WHY_CHOOSE.heading.en}`}
      />

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
        {HOME_WHY_CHOOSE.pillars.map((pillar) => (
          <div
            key={pillar.titleTh}
            className="rounded-[20px] border border-border bg-card px-8 py-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
          >
            <span className="text-6xl" aria-hidden>
              {pillar.icon}
            </span>
            <h3 className="mt-5 text-xl font-bold text-primary">{pillar.titleTh}</h3>
            <p className="mt-1 text-sm font-medium text-muted-foreground">{pillar.titleEn}</p>
            <p className="mt-4 text-base leading-relaxed text-[#555]">{pillar.descTh}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.descEn}</p>
          </div>
        ))}
      </div>
    </PageSection>
  )
}
