"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import {
  PRICE_OPTIONS,
  PURPOSE_TABS,
  buildQueryString,
  type PurposeTab,
} from "@/lib/search"

interface HeroSearchBarProps {
  districts: string[]
}

export default function HeroSearchBar({ districts }: HeroSearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [purpose, setPurpose] = useState<PurposeTab>("all")
  const [district, setDistrict] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  const selectClass =
    "w-full rounded-lg border border-white/20 bg-white/95 px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D4A843]"

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const qs = buildQueryString({ query, purpose, district, maxPrice, subType: "" })
    router.push(qs ? `/properties?${qs}` : "/properties")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-2xl bg-black/35 p-4 ring-1 ring-white/15 backdrop-blur-sm sm:p-5"
    >
      <p className="mb-3 text-center text-sm font-semibold text-white sm:text-base">
        ค้นหาทรัพย์ที่ใช่สำหรับคุณ
        <span className="mt-0.5 block text-xs font-medium text-white/75 sm:inline sm:ml-1.5">
          | Find Your Perfect Property
        </span>
      </p>

      <div className="mb-3 flex overflow-hidden rounded-lg border border-white/20">
        {PURPOSE_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setPurpose(tab.value)}
            className={`flex-1 min-h-[44px] py-2 text-xs font-semibold transition-colors sm:text-sm ${
              purpose === tab.value
                ? "bg-[#D4A843] text-[#1B4D3E]"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {tab.th === tab.en ? tab.th : `${tab.th} | ${tab.en}`}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ค้นหาทำเล ชื่อโครงการ หรือคำสำคัญ | Search area, project, keyword"
          className={selectClass}
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
          className={`${selectClass} sm:col-span-2`}
          aria-label="เลือกช่วงราคา"
        >
          {PRICE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#E8833A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#d4742f]"
      >
        <Search className="size-4" />
        ค้นหาทรัพย์ | Search Properties
      </button>
    </form>
  )
}
