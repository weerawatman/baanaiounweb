import { type BlogCategory } from "@/types"

/** 6 หมวดบทความ — ตาม mockup docs/mockups/blog.html */
export const BLOG_CATEGORIES: BlogCategory[] = [
  { name: "อสังหาฯ 101", nameEn: "Real Estate 101", slug: "real-estate-101" },
  { name: "รีโนเวทและต่อเติม", nameEn: "Renovation", slug: "renovation" },
  { name: "ทำเลและการลงทุน", nameEn: "Locations & Investment", slug: "locations" },
  { name: "ซื้อ-ขายและเช่า", nameEn: "Buy, Sell & Rent", slug: "buy-sell-rent" },
  { name: "สินเชื่อและการเงิน", nameEn: "Loans & Finance", slug: "loans-finance" },
  { name: "นายหน้าและอาชีพ", nameEn: "Agent Career", slug: "agent-career" },
]

export function getCategoryLabel(slug: string): string {
  const cat = BLOG_CATEGORIES.find((c) => c.slug === slug)
  if (!cat) return slug
  return cat.nameEn ? `${cat.name} | ${cat.nameEn}` : cat.name
}
