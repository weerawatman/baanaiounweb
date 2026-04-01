"use client"

import { useState, useEffect } from "react"
import { MOCK_PROPERTIES } from "@/lib/mock-data"
import PropertyCard from "@/components/property/PropertyCard"
import PropertyFilter from "@/components/property/PropertyFilter"
import SectionTitle from "@/components/layout/SectionTitle"
import Breadcrumb from "@/components/layout/Breadcrumb"
import { type Property } from "@/lib/mock-data"

const BASE_PROPERTIES = MOCK_PROPERTIES.filter((p) => p.type === "SALE")

export default function BuyPage() {
  const [filtered, setFiltered] = useState<Property[]>(BASE_PROPERTIES)

  return (
    <>
      <title>ซื้อบ้าน — บ้านไออุ่น</title>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "หน้าแรก", href: "/" },
              { label: "ซื้อบ้าน" },
            ]}
          />
        </div>

        {/* Section Title */}
        <div className="mb-8">
          <SectionTitle
            title="บ้านขาย ทุกหลังคัดมาแล้ว"
            subtitle="พิมคัดทุกหลังด้วยตัวเอง มีแต่บ้านที่คุ้มค่าและน่าอยู่จริง ๆ"
          />
        </div>

        {/* Filter */}
        <div className="mb-6">
          <PropertyFilter
            properties={BASE_PROPERTIES}
            onFilter={setFiltered}
          />
        </div>

        {/* Results count */}
        <p className="mb-4 text-sm text-muted-foreground">
          พบ {filtered.length} รายการ
        </p>

        {/* Property Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <p className="text-lg font-medium text-foreground">
              ไม่พบบ้านที่ตรงกับเงื่อนไข
            </p>
            <p className="text-sm text-muted-foreground">
              ลองปรับตัวกรองใหม่อีกครั้ง หรือติดต่อพิมโดยตรงได้เลยค่ะ
            </p>
          </div>
        )}
      </main>
    </>
  )
}
