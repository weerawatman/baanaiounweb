"use client"

import { type BlogCategory } from "@/types"

interface BlogCategoryFilterProps {
  categories: BlogCategory[]
  activeCategory: string
  onSelect: (slug: string) => void
}

const pillClass = (active: boolean) =>
  `shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
    active
      ? "border-primary bg-primary text-primary-foreground"
      : "border-border bg-card text-foreground hover:border-primary hover:text-primary"
  }`

export default function BlogCategoryFilter({
  categories,
  activeCategory,
  onSelect,
}: BlogCategoryFilterProps) {
  return (
    <div
      className="flex gap-2.5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      data-testid="blog-category-tabs"
    >
      <button
        type="button"
        onClick={() => onSelect("all")}
        aria-label="ทั้งหมด | All"
        className={pillClass(activeCategory === "all")}
      >
        ทั้งหมด
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          type="button"
          onClick={() => onSelect(cat.slug)}
          aria-label={cat.nameEn ? `${cat.name} | ${cat.nameEn}` : cat.name}
          className={pillClass(activeCategory === cat.slug)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
