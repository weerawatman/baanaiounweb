"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  PRICE_OPTIONS,
  PROPERTY_TYPE_FILTER_OPTIONS,
  PURPOSE_TABS,
  buildQueryString,
  type PurposeTab,
} from "@/lib/search"
import type { PropertyCategory } from "@/content/form-options"

interface HeroSearchBarProps {
  districts: string[]
  listHref: string
  listLabelTh: string
  listLabelEn: string
  searchLabelTh: string
  searchLabelEn: string
}

export default function HeroSearchBar({
  districts,
  listHref,
  listLabelTh,
  listLabelEn,
  searchLabelTh,
  searchLabelEn,
}: HeroSearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [purpose, setPurpose] = useState<PurposeTab>("all")
  const [district, setDistrict] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [propertyType, setPropertyType] = useState<"" | PropertyCategory>("")

  const selectClass =
    "min-w-0 w-full rounded-xl border border-border bg-white px-5 py-4 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary"

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const qs = buildQueryString({ query, purpose, district, maxPrice, propertyType })
    router.push(qs ? `/properties?${qs}` : "/properties")
  }

  return (
    <form
      onSubmit={handleSearch}
      className="mx-auto mt-5 max-w-3xl rounded-3xl border border-secondary/30 bg-white/15 p-5 text-left shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-md sm:p-6"
    >
      <p className="mb-4 border-b border-white/30 pb-3 text-base font-bold text-white">
        ค้นหาทรัพย์ที่ใช่สำหรับคุณ
        <span className="mt-0.5 block text-sm font-medium text-white/80">
          Find Your Perfect Property
        </span>
      </p>

      <div className="mb-4 flex gap-2">
        {PURPOSE_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setPurpose(tab.value)}
            className={`flex-1 rounded-full px-3 py-2.5 text-sm font-semibold transition-colors ${
              purpose === tab.value
                ? "bg-secondary text-secondary-foreground"
                : "border border-white/20 bg-white/10 text-white hover:bg-white/25"
            }`}
          >
            {tab.th === tab.en ? tab.th : `${tab.th} | ${tab.en}`}
          </button>
        ))}
      </div>

      <div className="mb-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="กรุงเทพฯ, สุขุมวิท 77, ชลบุรี, EEC... | Bangkok, Sukhumvit 77..."
          className={selectClass}
          aria-label="ค้นหาทำเล"
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

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href={listHref}
          className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl border border-white/60 bg-transparent px-4 py-3.5 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
        >
          🏠 {listLabelTh}
          <span className="text-sm font-medium text-white/90">| {listLabelEn}</span>
        </Link>
        <button
          type="submit"
          className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3.5 text-base font-semibold text-secondary-foreground shadow-[0_8px_20px_rgba(212,175,55,0.3)] transition-colors hover:bg-secondary/90"
        >
          🔍 {searchLabelTh}
          <span className="text-sm font-medium text-white/90">| {searchLabelEn}</span>
        </button>
      </div>
    </form>
  )
}
