import Link from "next/link"
import { ArrowRight } from "lucide-react"
import PropertyCard from "@/components/property/PropertyCard"
import PageSection from "@/components/layout/PageSection"
import SectionTitle from "@/components/layout/SectionTitle"
import { Button } from "@/components/ui/button"
import type { Property } from "@/types"

interface FeaturedPropertiesProps {
  properties: Property[]
}

export default function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  // แสดงเฉพาะทรัพย์ที่ Admin ติ๊ก "ทรัพย์แนะนำคัดพิเศษ" สูงสุด 9 รายการ (3 แถว)
  const display = properties.filter((p) => p.featured).slice(0, 9)

  if (display.length === 0) return null

  return (
    <PageSection variant="warm">
      <SectionTitle
        title="ทรัพย์แนะนำคัดพิเศษ | Featured Properties"
        subtitle="คัดสรรโดยทีมนักลงทุน — ใช้แถบค้นหาด้านบนเพื่อกรองทรัพย์ทั้งหมด"
      />

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {display.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href="/properties">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary gap-2 hover:text-primary-foreground"
          >
            ดูทรัพย์ทั้งหมด | View All Properties
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>
    </PageSection>
  )
}
