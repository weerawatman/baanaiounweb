"use client"

import { type BlogCategory } from "@/types"

interface BlogCategoryFilterProps {
  categories: BlogCategory[]
  activeCategory: string
  onSelect: (slug: string) => void
}

export default function BlogCategoryFilter({
  categories,
  activeCategory,
  onSelect,
}: BlogCategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => onSelect("all")}
        className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
          activeCategory === "all"
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
        }`}
      >
        ทั้งหมด
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onSelect(cat.slug)}
          className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            activeCategory === cat.slug
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
