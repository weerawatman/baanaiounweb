"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import PropertyCard from "@/components/property/PropertyCard"
import SectionTitle from "@/components/layout/SectionTitle"
import type { Property } from "@/types"
import {
  PRICE_OPTIONS,
  PURPOSE_TABS,
  filterProperties,
  type PurposeTab,
} from "@/lib/search"

interface SmartSearchWrapperProps {
  initialProperties: Property[]
}

export default function SmartSearchWrapper({ initialProperties }: SmartSearchWrapperProps) {
  const [purpose, setPurpose] = useState<PurposeTab>("all")
  const [district, setDistrict] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  const districts = useMemo(
    () =>
      [...new Set(initialProperties.map((p) => p.location.district).filter(Boolean))].sort(),
    [initialProperties],
  )

  const filtered = useMemo(
    () => filterProperties(initialProperties, { purpose, district, maxPrice, subType: "" }),
    [initialProperties, purpose, district, maxPrice],
  )

  const displayProperties = useMemo(() => {
    const featured = filtered.filter((p) => p.featured)
    return featured.length > 0 ? featured : filtered.slice(0, 6)
  }, [filtered])

  const selectClass =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]"

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      {/* Search Bar */}
      <div className="mb-8 rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5">
        <h2 className="mb-4 text-center text-base font-bold text-[#1B4D3E] sm:text-lg">
          ค้นหาทรัพย์ที่ใช่สำหรับคุณ
          <span className="ml-1.5 text-sm font-medium text-gray-400">
            | Find Your Perfect Property
          </span>
        </h2>

        {/* Purpose tabs */}
        <div className="mb-3 flex overflow-hidden rounded-lg border border-gray-200">
          {PURPOSE_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setPurpose(tab.value)}
              className={`flex-1 min-h-[44px] py-2 text-sm font-semibold transition-colors ${
                purpose === tab.value
                  ? "bg-[#1B4D3E] text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.th === tab.en ? tab.th : `${tab.th} | ${tab.en}`}
            </button>
          ))}
        </div>

        {/* Filter dropdowns */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className={selectClass}
            aria-label="เลือกทำเล"
          >
            <option value="">ทุกทำเล | All Areas</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className={selectClass}
            aria-label="เลือกช่วงราคา"
          >
            {PRICE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Section header with result count */}
      <SectionTitle
        title="ทรัพย์แนะนำ | Featured Properties"
        subtitle={`พบ ${filtered.length} รายการ | Found ${filtered.length} listings`}
      />

      {/* Property Grid */}
      {displayProperties.length > 0 ? (
        <>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/properties">
              <Button
                variant="outline"
                className="gap-2 border-[#1B4D3E] text-[#1B4D3E] hover:bg-[#1B4D3E] hover:text-white"
              >
                ดูทรัพย์ทั้งหมด | View All Properties
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <div className="py-16 text-center text-gray-500">
          <p>ไม่พบทรัพย์ที่ตรงเงื่อนไข — ลองเปลี่ยนตัวกรองดูนะคะ</p>
          <p className="mt-1 text-sm text-gray-400">
            No properties match your filters — try adjusting the criteria.
          </p>
        </div>
      )}
    </section>
  )
}
