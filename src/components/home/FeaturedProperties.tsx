import { getLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import PropertyCard from "@/components/property/PropertyCard"
import PageSection from "@/components/layout/PageSection"
import SectionTitle from "@/components/layout/SectionTitle"
import type { Locale } from "@/i18n/routing"
import { pickLocalized } from "@/lib/i18n/pick-localized"
import type { Property } from "@/types"

const SECTION = {
  title: { th: "ทรัพย์แนะนำคัดพิเศษ", en: "Featured Properties" },
  subtitle: {
    th: "คัดสรรโดยทีมนักลงทุน — คุ้มค่าทั้งการอยู่อาศัยและการลงทุน",
    en: "Curated by our investor team for ultimate value and livability.",
  },
  cta: { th: "ดูทรัพย์ทั้งหมดของเรา →", en: "View All Properties →" },
} as const

interface FeaturedPropertiesProps {
  properties: Property[]
}

export default async function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  const locale = (await getLocale()) as Locale
  const display = properties.filter((p) => p.featured).slice(0, 6)

  if (display.length === 0) return null

  return (
    <PageSection variant="warm">
      <SectionTitle
        variant="plain"
        title={pickLocalized(locale, SECTION.title)}
        subtitle={pickLocalized(locale, SECTION.subtitle)}
      />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {display.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/properties"
          className="inline-flex min-h-[52px] items-center justify-center rounded-xl border-2 border-primary bg-card px-9 py-4 text-lg font-semibold text-primary shadow-[0_4px_14px_rgba(45,90,39,0.08)] transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          {pickLocalized(locale, SECTION.cta)}
        </Link>
      </div>
    </PageSection>
  )
}
