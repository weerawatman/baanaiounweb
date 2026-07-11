import Link from "next/link"
import PropertyCard from "@/components/property/PropertyCard"
import PageSection from "@/components/layout/PageSection"
import SectionTitle from "@/components/layout/SectionTitle"
import type { Property } from "@/types"

interface FeaturedPropertiesProps {
  properties: Property[]
}

export default function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  const display = properties.filter((p) => p.featured).slice(0, 6)

  if (display.length === 0) return null

  return (
    <PageSection variant="default" className="bg-[#f8f6f0]">
      <SectionTitle
        variant="plain"
        title="ทรัพย์แนะนำคัดพิเศษ | Featured Properties"
        subtitle="คัดสรรโดยทีมนักลงทุน — คุ้มค่าทั้งการอยู่อาศัยและการลงทุน | Curated by our investor team for ultimate value and livability."
      />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
        {display.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/properties"
          className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-white px-9 py-4 text-lg font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          ดูทรัพย์ทั้งหมดของเรา → | View All Properties →
        </Link>
      </div>
    </PageSection>
  )
}
