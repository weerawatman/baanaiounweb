import type { Property } from "@/types"

/**
 * Shared property search/filter logic — single source for the homepage hero
 * search, the properties listing page, and any future filter UI.
 */

export type PurposeTab = "all" | Property["type"]

export interface PropertyFilters {
  purpose: PurposeTab
  district: string
  maxPrice: string
  subType: string
}

export const EMPTY_FILTERS: PropertyFilters = {
  purpose: "all",
  district: "",
  maxPrice: "",
  subType: "",
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

export const SUB_TYPE_OPTIONS: { label: string; value: "" | Property["subType"] }[] = [
  { label: "ทุกประเภท | All Types", value: "" },
  { label: "บ้านใหม่ | Brand New", value: "new" },
  { label: "รีโนเวทใหม่ | Renovated", value: "renovated" },
  { label: "ทาวน์โฮม | Townhome", value: "townhome" },
  { label: "บ้านพักอาศัย | Residential", value: "residential" },
  { label: "ทรัพย์ลงทุน | Investment", value: "investment" },
]

export function filterProperties(properties: Property[], filters: PropertyFilters): Property[] {
  return properties.filter((p) => {
    if (filters.purpose !== "all" && p.type !== filters.purpose) return false
    if (filters.district && p.location.district !== filters.district) return false
    if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false
    if (filters.subType && p.subType !== filters.subType) return false
    return true
  })
}

/** Parse filters from URL search params, ignoring unknown values. */
export function parseFilters(params: URLSearchParams): PropertyFilters {
  const purpose = params.get("purpose") ?? ""
  const maxPrice = params.get("maxPrice") ?? ""
  const subType = params.get("subType") ?? ""
  return {
    purpose: PURPOSE_TABS.some((t) => t.value === purpose) ? (purpose as PurposeTab) : "all",
    district: params.get("district") ?? "",
    maxPrice: PRICE_OPTIONS.some((o) => o.value === maxPrice) ? maxPrice : "",
    subType: SUB_TYPE_OPTIONS.some((o) => o.value === subType) ? subType : "",
  }
}

/** Build a query string from filters, skipping empty/default values. */
export function buildQueryString(filters: PropertyFilters): string {
  const params = new URLSearchParams()
  if (filters.purpose !== "all") params.set("purpose", filters.purpose)
  if (filters.district) params.set("district", filters.district)
  if (filters.maxPrice) params.set("maxPrice", filters.maxPrice)
  if (filters.subType) params.set("subType", filters.subType)
  return params.toString()
}
