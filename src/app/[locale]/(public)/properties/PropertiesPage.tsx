"use client"

import { useEffect, useMemo, useState } from "react"
import { useLocale } from "next-intl"
import { useSearchParams } from "next/navigation"
import { Link } from "@/i18n/navigation"
import Breadcrumb from "@/components/layout/Breadcrumb"
import PageHeroBanner from "@/components/shared/PageHeroBanner"
import PropertyCard from "@/components/property/PropertyCard"
import type { Property } from "@/types"
import {
  BEDROOM_OPTIONS,
  PRICE_OPTIONS,
  PROPERTY_TYPE_FILTER_OPTIONS,
  PURPOSE_TABS,
  filterProperties,
  parseFilters,
  type PurposeTab,
} from "@/lib/search"
import type { PropertyCategory } from "@/content/form-options"
import type { Locale } from "@/i18n/routing"
import { homeCrumb, localizedCrumb } from "@/lib/i18n/breadcrumbs"
import { pickLocalized, pickPipeBilingual } from "@/lib/i18n/pick-localized"

const PROPERTIES_CRUMB = { th: "ทรัพย์ทั้งหมด", en: "All Properties" } as const

const SEARCH_PLACEHOLDER = {
  th: "ค้นหาทำเล ชื่อโครงการ หรือคำสำคัญ",
  en: "Search area, project, or keyword",
} as const
const ALL_AREAS = { th: "ทุกทำเล", en: "All Areas" } as const

const RESULT_COUNT = { th: "พบ", en: "Found" } as const
const RESULT_SUFFIX = { th: "รายการ", en: "listings" } as const

const EMPTY_HEADING = {
  th: "ไม่พบทรัพย์ที่ตรงเงื่อนไข",
  en: "No properties match your filters",
} as const
const EMPTY_HINT = {
  th: "ลองเปลี่ยนตัวกรอง หรือ",
  en: "Try adjusting the filters or",
} as const
const EMPTY_CONTACT = { th: "ติดต่อพิมโดยตรง", en: "contact us directly" } as const

const SEARCH_ARIA = { th: "ค้นหาทรัพย์", en: "Search properties" } as const
const DISTRICT_ARIA = { th: "เลือกทำเล", en: "Select area" } as const
const TYPE_ARIA = { th: "เลือกประเภททรัพย์", en: "Select property type" } as const
const PRICE_ARIA = { th: "เลือกช่วงราคา", en: "Select price range" } as const
const BEDROOM_ARIA = { th: "เลือกจำนวนห้องนอน", en: "Select bedrooms" } as const

export default function PropertiesPage({
  properties,
  heroImage,
}: {
  properties: Property[]
  heroImage?: string
}) {
  const locale = useLocale() as Locale
  const searchParams = useSearchParams()
  const urlFilters = useMemo(() => parseFilters(searchParams), [searchParams])

  const [query, setQuery] = useState(urlFilters.query)
  const [purpose, setPurpose] = useState<PurposeTab>(urlFilters.purpose)
  const [district, setDistrict] = useState(urlFilters.district)
  const [maxPrice, setMaxPrice] = useState(urlFilters.maxPrice)
  const [propertyType, setPropertyType] = useState<"" | PropertyCategory>(urlFilters.propertyType)
  const [minBedrooms, setMinBedrooms] = useState(urlFilters.minBedrooms)

  useEffect(() => {
    setQuery(urlFilters.query)
    setPurpose(urlFilters.purpose)
    setDistrict(urlFilters.district)
    setMaxPrice(urlFilters.maxPrice)
    setPropertyType(urlFilters.propertyType)
    setMinBedrooms(urlFilters.minBedrooms)
  }, [urlFilters])

  const districts = useMemo(
    () => [...new Set(properties.map((p) => p.location.district).filter(Boolean))].sort(),
    [properties],
  )

  const filtered = useMemo(
    () =>
      filterProperties(properties, { query, purpose, district, maxPrice, propertyType, minBedrooms }),
    [properties, query, purpose, district, maxPrice, propertyType, minBedrooms],
  )

  const selectClass =
    "w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            homeCrumb(locale),
            localizedCrumb(locale, PROPERTIES_CRUMB),
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
                {pickLocalized(locale, tab)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={pickLocalized(locale, SEARCH_PLACEHOLDER)}
              className={`${selectClass} sm:col-span-2`}
              aria-label={pickLocalized(locale, SEARCH_ARIA)}
            />
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className={selectClass}
              aria-label={pickLocalized(locale, DISTRICT_ARIA)}
            >
              <option value="">{pickLocalized(locale, ALL_AREAS)}</option>
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
              aria-label={pickLocalized(locale, TYPE_ARIA)}
            >
              {PROPERTY_TYPE_FILTER_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {pickPipeBilingual(locale, o.label)}
                </option>
              ))}
            </select>
            <select
              value={minBedrooms}
              onChange={(e) => setMinBedrooms(e.target.value)}
              className={selectClass}
              aria-label={pickLocalized(locale, BEDROOM_ARIA)}
            >
              {BEDROOM_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {pickPipeBilingual(locale, o.label)}
                </option>
              ))}
            </select>
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className={selectClass}
              aria-label={pickLocalized(locale, PRICE_ARIA)}
            >
              {PRICE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {pickPipeBilingual(locale, o.label)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          {pickLocalized(locale, RESULT_COUNT)} {filtered.length}{" "}
          {pickLocalized(locale, RESULT_SUFFIX)}
        </p>

        {filtered.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg font-medium text-foreground">
              {pickLocalized(locale, EMPTY_HEADING)}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {pickLocalized(locale, EMPTY_HINT)}{" "}
              <Link href="/contact" className="text-primary underline underline-offset-2">
                {pickLocalized(locale, EMPTY_CONTACT)}
              </Link>
            </p>
          </div>
        )}
      </main>
    </>
  )
}
