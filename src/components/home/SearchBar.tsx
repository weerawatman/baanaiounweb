"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

const QUICK_FILTERS = [
  { label: "บ้านเช่า", href: "/rent" },
  { label: "บ้านซื้อ", href: "/buy" },
  { label: "ที่ดิน", href: "/land" },
  { label: "รีโนเวท", href: "/buy" },
  { label: "ใกล้นิคม", href: "/buy" },
];

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="max-w-2xl mx-auto px-4 flex flex-col items-center gap-5">
        {/* Search input */}
        <div className="relative w-full">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาบ้าน ที่ดิน หรือทรัพย์สิน..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] focus:border-[#1B4D3E] bg-gray-50 placeholder:text-gray-400"
          />
        </div>

        {/* Quick filter chips */}
        <div className="flex flex-wrap justify-center gap-2">
          {QUICK_FILTERS.map((filter) => (
            <Link
              key={filter.label}
              href={filter.href}
              className="inline-flex items-center justify-center rounded-full border border-[#1B4D3E] px-4 py-1.5 text-xs font-medium text-[#1B4D3E] bg-white hover:bg-[#1B4D3E] hover:text-white transition-colors"
            >
              {filter.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
