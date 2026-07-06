import { type BlogCategory } from "@/types"

/** 5 หมวดบทความ — เน้น Local SEO และ E-E-A-T (Phase 5) */
export const BLOG_CATEGORIES: BlogCategory[] = [
  { name: "ซื้อ-ขายและเช่า", nameEn: "Buy, Sell & Rent", slug: "buy-sell-rent" },
  { name: "สินเชื่อและการเงิน", nameEn: "Loans & Finance", slug: "loans-finance" },
  { name: "ทำเลและการลงทุน", nameEn: "Locations & Investment", slug: "locations" },
  { name: "รีโนเวทและต่อเติม", nameEn: "Renovation", slug: "renovation" },
  { name: "นายหน้าและอาชีพ", nameEn: "Agent Career", slug: "agent-career" },
]

export function getCategoryLabel(slug: string): string {
  const cat = BLOG_CATEGORIES.find((c) => c.slug === slug)
  if (!cat) return slug
  return cat.nameEn ? `${cat.name} | ${cat.nameEn}` : cat.name
}
