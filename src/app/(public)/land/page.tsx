"use client"

import { useState } from "react"
import { MOCK_PROPERTIES } from "@/data/properties"
import { type Property } from "@/types"
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
import { LAND_CONTENT } from "@/content/land"

const BASE_PROPERTIES = MOCK_PROPERTIES.filter((p) => p.type === "LAND")

export default function LandPage() {
  const [filtered, setFiltered] = useState<Property[]>(BASE_PROPERTIES)

  return (
    <>
      <title>{LAND_CONTENT.seo.title}</title>
      <meta name="description" content={LAND_CONTENT.seo.description} />
      <meta property="og:title" content={LAND_CONTENT.seo.title} />
      <meta property="og:description" content={LAND_CONTENT.seo.description} />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "หน้าแรก", href: "/" },
            { label: "ที่ดิน" },
          ]}
        />
      </div>

      {/* Pain Points Hero */}
      <PainPointsHero
        headline={LAND_CONTENT.painPoints.headline}
        points={LAND_CONTENT.painPoints.points}
      />

      {/* Solutions */}
      <SolutionsSection
        headline={LAND_CONTENT.solutions.headline}
        description={LAND_CONTENT.solutions.description}
        highlight={LAND_CONTENT.solutions.highlight}
        features={LAND_CONTENT.solutions.features}
      />

      {/* Emotional Hook */}
      <EmotionalHook
        quote={LAND_CONTENT.hook.quote}
        message={LAND_CONTENT.hook.message}
      />

      {/* CTA + Form */}
      <CTAWithForm
        primary={LAND_CONTENT.cta.primary}
        secondary={LAND_CONTENT.cta.secondary}
        formVariant="buyer"
        formPreselect="LAND"
      />

      {/* Property Listings */}
      <section id="listings" className="py-12">
        <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <SectionTitle
              title="ที่ดินทำเลดี พร้อมสร้างบ้าน"
              subtitle="ที่ดินที่พิมเลือกมาให้ ทำเลดี ราคาคุ้ม เหมาะทั้งสร้างบ้านและลงทุน"
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
                ไม่พบที่ดินที่ตรงกับเงื่อนไข
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
