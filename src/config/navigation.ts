/**
 * Main navigation items used in Header and Footer.
 * Labels are bilingual — the site displays Thai and English together.
 */

export interface NavItem {
  th: string
  en: string
  href: string
}

export interface NavGroup {
  th: string
  en: string
  children: NavItem[]
}

export type NavEntry = NavItem | NavGroup

export function isNavGroup(entry: NavEntry): entry is NavGroup {
  return "children" in entry
}

/** Combined single-line label, e.g. for aria-label / title attributes. */
export function navLabel(item: { th: string; en: string }): string {
  return item.th === item.en ? item.th : `${item.th} | ${item.en}`
}

// ─── Desktop: grouped with dropdowns ────────────────────────────────────

export const NAV_ENTRIES: NavEntry[] = [
  { th: "หน้าแรก", en: "Home", href: "/" },
  { th: "ค้นหาทรัพย์", en: "Find Property", href: "/find-property" },
  { th: "บริการของเรา", en: "Our Services", href: "/services" },
  { th: "บทความ", en: "Blog", href: "/blog" },
  { th: "เกี่ยวกับเรา", en: "About Us", href: "/about" },
  { th: "ติดต่อเรา", en: "Contact Us", href: "/contact" },
]

// ─── Mobile & Footer: flat list ─────────────────────────────────────────

export const NAV_ITEMS: NavItem[] = [
  { th: "หน้าแรก", en: "Home", href: "/" },
  { th: "ค้นหาทรัพย์", en: "Find Property", href: "/find-property" },
  { th: "บริการของเรา", en: "Our Services", href: "/services" },
  { th: "ฝากขาย/เช่า", en: "List Property", href: "/list-property" },
  { th: "ค้นหาบ้าน/สินเชื่อ", en: "Find Home & Loan", href: "/find-property" },
  { th: "Co-Agent", en: "Co-Agent", href: "/co-agent" },
  { th: "คอร์สนายหน้า", en: "Agent Course", href: "/agent-course" },
  { th: "บทความ", en: "Blog", href: "/blog" },
  { th: "เกี่ยวกับเรา", en: "About Us", href: "/about" },
  { th: "ติดต่อเรา", en: "Contact Us", href: "/contact" },
]
