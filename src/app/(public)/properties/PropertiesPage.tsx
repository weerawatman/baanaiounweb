"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Breadcrumb from "@/components/layout/Breadcrumb"
import SectionTitle from "@/components/layout/SectionTitle"
import PropertyCard from "@/components/property/PropertyCard"
import type { Property } from "@/types"
import {
  PRICE_OPTIONS,
  PURPOSE_TABS,
  filterProperties,
  parseFilters,
  type PurposeTab,
} from "@/lib/search"

export default function PropertiesPage({ properties }: { properties: Property[] }) {
  const searchParams = useSearchParams()
  const urlFilters = useMemo(() => parseFilters(searchParams), [searchParams])

  const [query, setQuery] = useState(urlFilters.query)
  const [purpose, setPurpose] = useState<PurposeTab>(urlFilters.purpose)
  const [district, setDistrict] = useState(urlFilters.district)
  const [maxPrice, setMaxPrice] = useState(urlFilters.maxPrice)

  useEffect(() => {
    setQuery(urlFilters.query)
    setPurpose(urlFilters.purpose)
    setDistrict(urlFilters.district)
    setMaxPrice(urlFilters.maxPrice)
  }, [urlFilters])

  const districts = useMemo(
    () => [...new Set(properties.map((p) => p.location.district).filter(Boolean))].sort(),
    [properties],
  )

  const filtered = useMemo(
    () => filterProperties(properties, { query, purpose, district, maxPrice, subType: "" }),
    [properties, query, purpose, district, maxPrice],
  )

  const selectClass =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]"

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: "หน้าแรก", href: "/" },
          { label: "ทรัพย์ทั้งหมด" },
        ]}
      />

      <div className="mt-6">
        <SectionTitle
          as="h1"
          title="ทรัพย์ทั้งหมด | All Properties"
          subtitle="บ้านขาย บ้านเช่า และที่ดิน จากบ้านไออุ่น พร็อพเพอร์ตี้"
        />
      </div>

      {/* Filter bar */}
      <div className="mt-6 rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5">
        {/* Type tabs */}
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

        {/* Query + District + Price */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาทำเล ชื่อโครงการ หรือคำสำคัญ | Search area, project, keyword"
            className={`${selectClass} sm:col-span-2`}
            aria-label="ค้นหาทรัพย์"
          />
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

      {/* Result count */}
      <p className="mt-4 text-sm text-gray-500">
        พบ {filtered.length} รายการ | Found {filtered.length} listings
      </p>

      {/* Property grid */}
      {filtered.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg font-medium text-gray-700">
            ไม่พบทรัพย์ที่ตรงเงื่อนไข
            <span className="mt-1 block text-base text-gray-500">
              No properties match your filters
            </span>
          </p>
          <p className="mt-2 text-sm text-gray-500">
            ลองเปลี่ยนตัวกรอง หรือ{" "}
            <a href="/contact" className="text-[#1B4D3E] underline underline-offset-2">
              ติดต่อพิมโดยตรง
            </a>
            <span className="mt-0.5 block">
              Try adjusting the filters or{" "}
              <a href="/contact" className="text-[#1B4D3E] underline underline-offset-2">
                contact us directly
              </a>
            </span>
          </p>
        </div>
      )}
    </main>
  )
}
