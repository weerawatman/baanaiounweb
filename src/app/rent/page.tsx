"use client"

import { useState } from "react"
import { MOCK_PROPERTIES } from "@/lib/mock-data"
import PropertyCard from "@/components/property/PropertyCard"
import PropertyFilter from "@/components/property/PropertyFilter"
import SectionTitle from "@/components/layout/SectionTitle"
import Breadcrumb from "@/components/layout/Breadcrumb"
import { type Property } from "@/lib/mock-data"

const BASE_PROPERTIES = MOCK_PROPERTIES.filter((p) => p.type === "RENT")

export default function RentPage() {
  const [filtered, setFiltered] = useState<Property[]>(BASE_PROPERTIES)

  return (
    <>
      <title>เช่าบ้าน — บ้านไออุ่น</title>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "หน้าแรก", href: "/" },
              { label: "เช่าบ้าน" },
            ]}
          />
        </div>

        {/* Section Title */}
        <div className="mb-8">
          <SectionTitle
            title="บ้านเช่า พร้อมอยู่ทันที"
            subtitle="บ้านเช่าที่พิมคัดสรรมาแล้ว สะอาด ปลอดภัย เจ้าของใจดี"
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
              ไม่พบบ้านเช่าที่ตรงกับเงื่อนไข
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
