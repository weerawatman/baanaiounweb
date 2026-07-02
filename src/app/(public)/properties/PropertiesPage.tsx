"use client"

import { useState, useMemo } from "react"
import Breadcrumb from "@/components/layout/Breadcrumb"
import SectionTitle from "@/components/layout/SectionTitle"
import PropertyCard from "@/components/property/PropertyCard"
import type { Property } from "@/types"

const PRICE_OPTIONS = [
  { label: "ทุกราคา | All Prices", value: "" },
  { label: "≤ 1 ล้าน | Under 1M", value: "1000000" },
  { label: "≤ 2 ล้าน | Under 2M", value: "2000000" },
  { label: "≤ 3 ล้าน | Under 3M", value: "3000000" },
  { label: "≤ 5 ล้าน | Under 5M", value: "5000000" },
]

type PurposeTab = "all" | "SALE" | "RENT" | "LAND"

const PURPOSE_TABS: { value: PurposeTab; th: string; en: string }[] = [
  { value: "all", th: "ทั้งหมด", en: "All" },
  { value: "SALE", th: "ซื้อ", en: "Buy" },
  { value: "RENT", th: "เช่า", en: "Rent" },
  { value: "LAND", th: "ที่ดิน", en: "Land" },
]

export default function PropertiesPage({ properties }: { properties: Property[] }) {
  const [purpose, setPurpose] = useState<PurposeTab>("all")
  const [district, setDistrict] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  const districts = useMemo(
    () => [...new Set(properties.map((p) => p.location.district).filter(Boolean))].sort(),
    [properties],
  )

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (purpose !== "all" && p.type !== purpose) return false
      if (district && p.location.district !== district) return false
      if (maxPrice && p.price > Number(maxPrice)) return false
      return true
    })
  }, [properties, purpose, district, maxPrice])

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
              <span className="th-only">{tab.th}</span>
              <span className="en-only">{tab.en}</span>
            </button>
          ))}
        </div>

        {/* District + Price */}
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

      {/* Result count */}
      <p className="mt-4 text-sm text-gray-500">
        <span className="th-only">พบ {filtered.length} รายการ</span>
        <span className="en-only">Found {filtered.length} listings</span>
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
            <span className="th-only">ไม่พบทรัพย์ที่ตรงเงื่อนไข</span>
            <span className="en-only">No properties match your filters</span>
          </p>
          <p className="mt-2 text-sm text-gray-500">
            <span className="th-only">ลองเปลี่ยนตัวกรอง หรือ</span>
            <span className="en-only">Try adjusting the filters or</span>{" "}
            <a href="/contact" className="text-[#1B4D3E] underline underline-offset-2">
              <span className="th-only">ติดต่อพิมโดยตรง</span>
              <span className="en-only">contact us directly</span>
            </a>
          </p>
        </div>
      )}
    </main>
  )
}
