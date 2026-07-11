import type { Property } from "@/types"

/**
 * Trust badges shown on property cards — derived from fields the admin
 * already edits on the property form (no separate badge UI needed):
 *
 * - "คัดกรองโดยนักลงทุน"  ← featured = true, or a tag containing "นักลงทุน"/"investor"
 * - "รีโนเวทใหม่พร้อมอยู่" ← a tag containing "รีโนเวท"/"renovate"
 * - "การันตีทำเลทอง"      ← a tag containing "ทำเลทอง"/"prime"
 */

export interface TrustBadge {
  key: "investor" | "renovated" | "prime"
  th: string
  en: string
  className: string
}

const INVESTOR: TrustBadge = {
  key: "investor",
  th: "คัดกรองโดยนักลงทุน",
  en: "Investor Curated",
  className: "bg-[#1B4D3E] text-white",
}

const RENOVATED: TrustBadge = {
  key: "renovated",
  th: "รีโนเวทใหม่พร้อมอยู่",
  en: "Newly Renovated",
  className: "bg-[#E8833A] text-white",
}

const PRIME: TrustBadge = {
  key: "prime",
  th: "การันตีทำเลทอง",
  en: "Prime Location",
  className: "bg-[#D4A843] text-white",
}

/** Max 2 badges per card to keep the image readable. */
export function deriveBadges(property: Property): TrustBadge[] {
  const tags = property.tags.join(" ")
  const badges: TrustBadge[] = []
  if (property.featured || /นักลงทุน|investor/i.test(tags)) badges.push(INVESTOR)
  if (/รีโนเวท|renovat/i.test(tags)) badges.push(RENOVATED)
  if (/ทำเลทอง|prime/i.test(tags)) badges.push(PRIME)
  return badges.slice(0, 2)
}
