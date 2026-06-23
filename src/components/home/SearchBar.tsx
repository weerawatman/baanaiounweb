"use client"

import { useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"

const QUICK_FILTERS = [
  { label: "บ้านเช่า", href: "/rent" },
  { label: "บ้านซื้อ", href: "/buy" },
  { label: "ที่ดิน", href: "/land" },
  { label: "รีโนเวท", href: "/buy" },
  { label: "ใกล้นิคม", href: "/buy" },
]

export default function SearchBar() {
  const [query, setQuery] = useState("")

  return (
    <section className="border-b border-gray-100 bg-white py-10">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 px-4">
        {/* Search input */}
        <div className="relative w-full">
          <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาบ้าน ที่ดิน หรือทรัพย์สิน..."
            className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pr-4 pl-12 text-sm shadow-sm placeholder:text-gray-400 focus:border-[#1B4D3E] focus:ring-2 focus:ring-[#1B4D3E] focus:outline-none"
          />
        </div>

        {/* Quick filter chips */}
        <div className="flex flex-wrap justify-center gap-2">
          {QUICK_FILTERS.map((filter) => (
            <Link
              key={filter.label}
              href={filter.href}
              className="inline-flex items-center justify-center rounded-full border border-[#1B4D3E] bg-white px-4 py-1.5 text-xs font-medium text-[#1B4D3E] transition-colors hover:bg-[#1B4D3E] hover:text-white"
            >
              {filter.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
