"use client"

import { useState } from "react"
import { MOCK_PROPERTIES, type Property } from "@/lib/mock-data"
import PropertyCard from "@/components/property/PropertyCard"
import PropertyFilter from "@/components/property/PropertyFilter"
import SectionTitle from "@/components/layout/SectionTitle"
import Breadcrumb from "@/components/layout/Breadcrumb"
import {
  PainPointsHero,
  SolutionsSection,
  EmotionalHook,
  CTAWithForm,
} from "@/components/shared"
import { BUY_CONTENT } from "@/lib/page-content"

const BASE_PROPERTIES = MOCK_PROPERTIES.filter((p) => p.type === "SALE")

export default function BuyPage() {
  const [filtered, setFiltered] = useState<Property[]>(BASE_PROPERTIES)

  return (
    <>
      <title>{BUY_CONTENT.seo.title}</title>
      <meta name="description" content={BUY_CONTENT.seo.description} />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "หน้าแรก", href: "/" },
            { label: "ซื้อบ้าน" },
          ]}
        />
      </div>

      {/* Pain Points Hero */}
      <PainPointsHero
        headline={BUY_CONTENT.painPoints.headline}
        points={BUY_CONTENT.painPoints.points}
      />

      {/* Solutions */}
      <SolutionsSection
        headline={BUY_CONTENT.solutions.headline}
        description={BUY_CONTENT.solutions.description}
        highlight={BUY_CONTENT.solutions.highlight}
        features={BUY_CONTENT.solutions.features}
      />

      {/* Emotional Hook */}
      <EmotionalHook
        quote={BUY_CONTENT.hook.quote}
        message={BUY_CONTENT.hook.message}
      />

      {/* CTA + Form */}
      <CTAWithForm
        primary={BUY_CONTENT.cta.primary}
        secondary={BUY_CONTENT.cta.secondary}
        formVariant="buyer"
        formPreselect="SALE"
      />

      {/* Property Listings */}
      <section id="listings" className="py-12">
        <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <SectionTitle
              title="บ้านขาย ทุกหลังคัดมาแล้ว"
              subtitle="พิมคัดทุกหลังด้วยตัวเอง มีแต่บ้านที่คุ้มค่าและน่าอยู่จริงๆ"
            />
          </div>

          <div className="mb-6">
            <PropertyFilter
              properties={BASE_PROPERTIES}
              onFilter={setFiltered}
            />
          </div>

          <p className="mb-4 text-sm text-muted-foreground">
            พบ {filtered.length} รายการ
          </p>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <p className="text-lg font-medium text-foreground">
                ไม่พบบ้านขายที่ตรงกับเงื่อนไข
              </p>
              <p className="text-sm text-muted-foreground">
                ลองปรับตัวกรองใหม่อีกครั้ง หรือติดต่อพิมโดยตรงได้เลยค่ะ
              </p>
            </div>
          )}
        </main>
      </section>
    </>
  )
}
