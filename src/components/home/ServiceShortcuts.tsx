import { Home, Search, Users, GraduationCap } from "lucide-react"
import PageSection from "@/components/layout/PageSection"
import SectionTitle from "@/components/layout/SectionTitle"
import AudienceCard from "@/components/shared/AudienceCard"
import { SERVICES_HEADING, SERVICE_CARDS } from "@/content/homepage"

const ICON_MAP = { Home, Search, Users, GraduationCap } as const

export default function ServiceShortcuts() {
  return (
    <PageSection variant="default">
      <SectionTitle
        title={`${SERVICES_HEADING.th} | ${SERVICES_HEADING.en}`}
        subtitle={`${SERVICES_HEADING.subtitleTh} | ${SERVICES_HEADING.subtitleEn}`}
      />

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICE_CARDS.map((card) => {
          const Icon = ICON_MAP[card.icon]
          return (
            <AudienceCard
              key={card.href}
              variant="dark"
              href={card.href}
              icon={Icon}
              accentColor={card.color}
              titleTh={card.titleTh}
              titleEn={card.titleEn}
              descTh={card.descTh}
              descEn={card.descEn}
              ctaTh={card.ctaTh}
              ctaEn={card.ctaEn}
              secondaryHref={card.secondaryHref}
            />
          )
        })}
      </div>
    </PageSection>
  )
}
