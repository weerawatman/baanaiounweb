"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Breadcrumb from "@/components/layout/Breadcrumb"
import PageHeroBanner from "@/components/shared/PageHeroBanner"
import PropertyCard from "@/components/property/PropertyCard"
import type { Property } from "@/types"
import {
  PRICE_OPTIONS,
  PROPERTY_TYPE_FILTER_OPTIONS,
  PURPOSE_TABS,
  filterProperties,
  parseFilters,
  type PurposeTab,
} from "@/lib/search"
import type { PropertyCategory } from "@/content/form-options"

export default function PropertiesPage({
  properties,
  heroImage,
}: {
  properties: Property[]
  heroImage?: string
}) {
  const searchParams = useSearchParams()
  const urlFilters = useMemo(() => parseFilters(searchParams), [searchParams])

  const [query, setQuery] = useState(urlFilters.query)
  const [purpose, setPurpose] = useState<PurposeTab>(urlFilters.purpose)
  const [district, setDistrict] = useState(urlFilters.district)
  const [maxPrice, setMaxPrice] = useState(urlFilters.maxPrice)
  const [propertyType, setPropertyType] = useState<"" | PropertyCategory>(urlFilters.propertyType)

  useEffect(() => {
    setQuery(urlFilters.query)
    setPurpose(urlFilters.purpose)
    setDistrict(urlFilters.district)
    setMaxPrice(urlFilters.maxPrice)
    setPropertyType(urlFilters.propertyType)
  }, [urlFilters])

  const districts = useMemo(
    () => [...new Set(properties.map((p) => p.location.district).filter(Boolean))].sort(),
    [properties],
  )

  const filtered = useMemo(
    () => filterProperties(properties, { query, purpose, district, maxPrice, propertyType }),
    [properties, query, purpose, district, maxPrice, propertyType],
  )

  const selectClass =
    "w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "หน้าแรก", href: "/" },
            { label: "ทรัพย์ทั้งหมด" },
          ]}
        />
      </div>

      <PageHeroBanner
        image={heroImage}
        titleTh="ทรัพย์ทั้งหมด"
        titleEn="All Properties"
        subtitleTh="บ้านขาย บ้านเช่า และที่ดิน จากบ้านไออุ่น พร็อพเพอร์ตี้"
      />

      <main className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mt-6 rounded-2xl bg-card p-5 shadow-[0_10px_30px_rgba(45,90,39,0.04)] ring-1 ring-black/5">
          {/* Type tabs */}
          <div className="mb-3 flex overflow-hidden rounded-lg border border-border">
          {PURPOSE_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setPurpose(tab.value)}
              className={`flex-1 min-h-[44px] py-2 text-sm font-semibold transition-colors ${
                purpose === tab.value
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {tab.th === tab.en ? tab.th : `${tab.th} | ${tab.en}`}
            </button>
          ))}
        </div>

        {/* Query + District + Type + Price */}
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
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value as "" | PropertyCategory)}
            className={selectClass}
            aria-label="เลือกประเภททรัพย์"
          >
            {PROPERTY_TYPE_FILTER_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
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
        <p className="mt-4 text-sm text-muted-foreground">
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
          <p className="text-lg font-medium text-foreground">
            ไม่พบทรัพย์ที่ตรงเงื่อนไข
            <span className="mt-1 block text-base text-muted-foreground">
              No properties match your filters
            </span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            ลองเปลี่ยนตัวกรอง หรือ{" "}
            <a href="/contact" className="text-primary underline underline-offset-2">
              ติดต่อพิมโดยตรง
            </a>
            <span className="mt-0.5 block">
              Try adjusting the filters or{" "}
              <a href="/contact" className="text-primary underline underline-offset-2">
                contact us directly
              </a>
            </span>
          </p>
        </div>
      )}
      </main>
    </>
  )
}
