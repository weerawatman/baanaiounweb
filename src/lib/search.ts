import type { Property } from "@/types"
import { PROPERTY_CATEGORY_OPTIONS, type PropertyCategory } from "@/content/form-options"

/**
 * Shared property search/filter logic — single source for the homepage hero
 * search, the properties listing page, and any future filter UI.
 */

export type PurposeTab = "all" | Property["type"]

export interface PropertyFilters {
  query: string
  purpose: PurposeTab
  district: string
  maxPrice: string
  propertyType: "" | PropertyCategory
}

export const EMPTY_FILTERS: PropertyFilters = {
  query: "",
  purpose: "all",
  district: "",
  maxPrice: "",
  propertyType: "",
}

export const PURPOSE_TABS: { value: PurposeTab; th: string; en: string }[] = [
  { value: "all", th: "ทั้งหมด", en: "All" },
  { value: "SALE", th: "ซื้อ", en: "Buy" },
  { value: "RENT", th: "เช่า", en: "Rent" },
  { value: "LAND", th: "ที่ดิน", en: "Land" },
]

export const PRICE_OPTIONS = [
  { label: "ทุกราคา | All Prices", value: "" },
  { label: "≤ 1 ล้าน | Under 1M", value: "1000000" },
  { label: "≤ 2 ล้าน | Under 2M", value: "2000000" },
  { label: "≤ 3 ล้าน | Under 3M", value: "3000000" },
  { label: "≤ 5 ล้าน | Under 5M", value: "5000000" },
]

export const PROPERTY_TYPE_FILTER_OPTIONS: { label: string; value: "" | PropertyCategory }[] = [
  { label: "ทุกประเภท | All Types", value: "" },
  ...PROPERTY_CATEGORY_OPTIONS.map((opt) => ({ label: opt.label, value: opt.value })),
]

export function filterProperties(properties: Property[], filters: PropertyFilters): Property[] {
  const q = filters.query.trim().toLowerCase()

  return properties.filter((p) => {
    if (q) {
      const haystack = [
        p.title,
        p.location.district,
        p.location.subdistrict,
        p.tags?.join(" "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
      if (!haystack.includes(q)) return false
    }
    if (filters.purpose !== "all" && p.type !== filters.purpose) return false
    if (filters.district && p.location.district !== filters.district) return false
    if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false
    if (filters.propertyType && p.subType !== filters.propertyType) return false
    return true
  })
}

/** Parse filters from URL search params, ignoring unknown values. */
export function parseFilters(params: URLSearchParams): PropertyFilters {
  const purpose = params.get("purpose") ?? ""
  const maxPrice = params.get("maxPrice") ?? ""
  const propertyType = params.get("propertyType") ?? ""
  return {
    query: params.get("query") ?? "",
    purpose: PURPOSE_TABS.some((t) => t.value === purpose) ? (purpose as PurposeTab) : "all",
    district: params.get("district") ?? "",
    maxPrice: PRICE_OPTIONS.some((o) => o.value === maxPrice) ? maxPrice : "",
    propertyType: PROPERTY_TYPE_FILTER_OPTIONS.some((o) => o.value === propertyType)
      ? (propertyType as PropertyCategory | "")
      : "",
  }
}

/** Build a query string from filters, skipping empty/default values. */
export function buildQueryString(filters: PropertyFilters): string {
  const params = new URLSearchParams()
  if (filters.query.trim()) params.set("query", filters.query.trim())
  if (filters.purpose !== "all") params.set("purpose", filters.purpose)
  if (filters.district) params.set("district", filters.district)
  if (filters.maxPrice) params.set("maxPrice", filters.maxPrice)
  if (filters.propertyType) params.set("propertyType", filters.propertyType)
  return params.toString()
}
