"use client"

import { useState } from "react"
import { type Property } from "@/types"
import PropertyCard from "@/components/property/PropertyCard"
import PropertyFilter from "@/components/property/PropertyFilter"
import SectionTitle from "@/components/layout/SectionTitle"
import Breadcrumb from "@/components/layout/Breadcrumb"
import { PainPointsHero, SolutionsSection, EmotionalHook, CTAWithForm } from "@/components/shared"
import { RENT_CONTENT } from "@/content/rent"

interface RentPageProps {
  properties: Property[]
}

export default function RentPage({ properties }: RentPageProps) {
  const [filtered, setFiltered] = useState<Property[]>(properties)

  return (
    <>
      <title>{RENT_CONTENT.seo.title}</title>
      <meta name="description" content={RENT_CONTENT.seo.description} />
      <meta property="og:title" content={RENT_CONTENT.seo.title} />
      <meta property="og:description" content={RENT_CONTENT.seo.description} />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "หน้าแรก", href: "/" }, { label: "เช่าบ้าน" }]} />
      </div>

      {/* Pain Points Hero */}
      <PainPointsHero
        headline={RENT_CONTENT.painPoints.headline}
        points={RENT_CONTENT.painPoints.points}
      />

      {/* Solutions */}
      <SolutionsSection
        headline={RENT_CONTENT.solutions.headline}
        description={RENT_CONTENT.solutions.description}
        highlight={RENT_CONTENT.solutions.highlight}
        features={RENT_CONTENT.solutions.features}
      />

      {/* Emotional Hook */}
      <EmotionalHook quote={RENT_CONTENT.hook.quote} message={RENT_CONTENT.hook.message} />

      {/* CTA + Form */}
      <CTAWithForm
        primary={RENT_CONTENT.cta.primary}
        secondary={RENT_CONTENT.cta.secondary}
        formVariant="buyer"
        formPreselect="RENT"
      />

      {/* Property Listings */}
      <section id="listings" className="py-12">
        <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <SectionTitle
              title="บ้านเช่า พร้อมอยู่ทันที"
              subtitle="บ้านเช่าที่พิมคัดสรรมาแล้ว สะอาด ปลอดภัย เจ้าของใจดี"
            />
          </div>

          {properties.length > 0 ? (
            <>
              <div className="mb-6">
                <PropertyFilter properties={properties} onFilter={setFiltered} />
              </div>

              <p className="text-muted-foreground mb-4 text-sm">พบ {filtered.length} รายการ</p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <p className="text-foreground text-lg font-medium">ยังไม่มีบ้านเช่าในระบบ</p>
              <p className="text-muted-foreground text-sm">
                ทรัพย์ใหม่ๆ กำลังจะเข้ามา หรือติดต่อพิมเพื่อแจ้งความต้องการได้เลยค่ะ
              </p>
            </div>
          )}
        </main>
      </section>
    </>
  )
}
