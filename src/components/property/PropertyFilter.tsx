"use client"

import { useState, useEffect } from "react"
import { type Property } from "@/types"

interface PropertyFilterProps {
  properties: Property[]
  onFilter: (filtered: Property[]) => void
}

const SALE_PRICE_OPTIONS = [
  { label: "ทุกราคา", min: 0, max: Infinity },
  { label: "ต่ำกว่า 1 ล้าน", min: 0, max: 1_000_000 },
  { label: "1-2 ล้าน", min: 1_000_000, max: 2_000_000 },
  { label: "2-3 ล้าน", min: 2_000_000, max: 3_000_000 },
  { label: "มากกว่า 3 ล้าน", min: 3_000_000, max: Infinity },
]

const RENT_PRICE_OPTIONS = [
  { label: "ทุกราคา", min: 0, max: Infinity },
  { label: "ต่ำกว่า 3,000", min: 0, max: 3_000 },
  { label: "3,000-5,000", min: 3_000, max: 5_000 },
  { label: "มากกว่า 5,000", min: 5_000, max: Infinity },
]

const SORT_OPTIONS = [
  { label: "ใหม่สุด", value: "newest" },
  { label: "ราคาต่ำ-สูง", value: "price-asc" },
  { label: "ราคาสูง-ต่ำ", value: "price-desc" },
]

const BEDROOM_OPTIONS = [
  { label: "ทั้งหมด", value: 0 },
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4+", value: 4 },
]

// Determine the prevailing type from the property list
function detectListingType(properties: Property[]): "SALE" | "RENT" | "MIXED" {
  const hasSale = properties.some((p) => p.type === "SALE" || p.type === "LAND")
  const hasRent = properties.some((p) => p.type === "RENT")
  if (hasSale && !hasRent) return "SALE"
  if (hasRent && !hasSale) return "RENT"
  return "MIXED"
}

export default function PropertyFilter({
  properties,
  onFilter,
}: PropertyFilterProps) {
  const listingType = detectListingType(properties)
  const priceOptions =
    listingType === "RENT" ? RENT_PRICE_OPTIONS : SALE_PRICE_OPTIONS

  const [priceIndex, setPriceIndex] = useState(0)
  const [bedrooms, setBedrooms] = useState(0)
  const [sort, setSort] = useState("newest")

  useEffect(() => {
    let filtered = [...properties]

    // Price filter
    const { min, max } = priceOptions[priceIndex]
    if (min > 0 || max !== Infinity) {
      filtered = filtered.filter((p) => p.price >= min && p.price <= max)
    }

    // Bedroom filter
    if (bedrooms > 0) {
      if (bedrooms === 4) {
        filtered = filtered.filter((p) => p.bedrooms >= 4)
      } else {
        filtered = filtered.filter((p) => p.bedrooms === bedrooms)
      }
    }

    // Sort
    if (sort === "newest") {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    } else if (sort === "price-asc") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sort === "price-desc") {
      filtered.sort((a, b) => b.price - a.price)
    }

    onFilter(filtered)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceIndex, bedrooms, sort, properties])

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card px-4 py-3 text-sm">
      {/* Price range */}
      <div className="flex items-center gap-2">
        <label className="shrink-0 font-medium text-muted-foreground">
          ราคา:
        </label>
        <select
          value={priceIndex}
          onChange={(e) => setPriceIndex(Number(e.target.value))}
          className="rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          {priceOptions.map((opt, idx) => (
            <option key={idx} value={idx}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Bedrooms */}
      <div className="flex items-center gap-2">
        <span className="shrink-0 font-medium text-muted-foreground">
          ห้องนอน:
        </span>
        <div className="flex gap-1">
          {BEDROOM_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setBedrooms(opt.value)}
              className={`min-w-[2rem] rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${
                bedrooms === opt.value
                  ? "border-green-600 bg-green-600 text-white"
                  : "border-border bg-transparent text-foreground hover:bg-muted"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2 ml-auto">
        <label className="shrink-0 font-medium text-muted-foreground">
          เรียงตาม:
        </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
