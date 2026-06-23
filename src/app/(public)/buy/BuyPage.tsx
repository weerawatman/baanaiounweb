"use client"

import { useState } from "react"
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
import { BUY_CONTENT } from "@/content/buy"

interface BuyPageProps {
  properties: Property[]
}

export default function BuyPage({ properties }: BuyPageProps) {
  const [filtered, setFiltered] = useState<Property[]>(properties)

  return (
    <>
      <title>{BUY_CONTENT.seo.title}</title>
      <meta name="description" content={BUY_CONTENT.seo.description} />
      <meta property="og:title" content={BUY_CONTENT.seo.title} />
      <meta property="og:description" content={BUY_CONTENT.seo.description} />

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

          {properties.length > 0 ? (
            <>
              <div className="mb-6">
                <PropertyFilter properties={properties} onFilter={setFiltered} />
              </div>

              <p className="mb-4 text-sm text-muted-foreground">
                พบ {filtered.length} รายการ
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <p className="text-lg font-medium text-foreground">
                ยังไม่มีบ้านขายในระบบ
              </p>
              <p className="text-sm text-muted-foreground">
                ทรัพย์ใหม่ๆ กำลังจะเข้ามา หรือติดต่อพิมเพื่อแจ้งความต้องการได้เลยค่ะ
              </p>
            </div>
          )}
        </main>
      </section>
    </>
  )
}
