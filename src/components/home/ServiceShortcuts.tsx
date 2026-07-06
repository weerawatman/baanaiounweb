import Link from "next/link"
import { Home, Search, Users, GraduationCap } from "lucide-react"
import PageSection from "@/components/layout/PageSection"
import SectionTitle from "@/components/layout/SectionTitle"
import AudienceCard from "@/components/shared/AudienceCard"
import { SERVICES_HEADING, SERVICE_CARDS } from "@/content/homepage"

const ICON_MAP = { Home, Search, Users, GraduationCap } as const

export default function ServiceShortcuts() {
  return (
    <PageSection variant="default">
      <SectionTitle title={`${SERVICES_HEADING.th} | ${SERVICES_HEADING.en}`} />

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICE_CARDS.map((card) => {
          const Icon = ICON_MAP[card.icon]
          return (
            <AudienceCard
              key={card.href}
              href={card.href}
              icon={Icon}
              accentColor={card.color}
              titleTh={card.titleTh}
              titleEn={card.titleEn}
              descTh={card.descTh}
              descEn={card.descEn}
            />
          )
        })}
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        สนใจเครือข่าย Co-Agent หรือคอร์สนายหน้า?{" "}
        <Link href="/about" className="font-semibold text-primary underline-offset-2 hover:underline">
          ดูเพิ่มเติมที่เกี่ยวกับเรา | Learn more on About Us
        </Link>
      </p>
    </PageSection>
  )
}
