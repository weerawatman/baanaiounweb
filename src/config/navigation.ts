/**
 * Main navigation items used in Header and Footer.
 */

export interface NavItem {
  label: string
  href: string
}

export interface NavGroup {
  label: string
  children: NavItem[]
}

export type NavEntry = NavItem | NavGroup

export function isNavGroup(entry: NavEntry): entry is NavGroup {
  return "children" in entry
}

// ─── Desktop: grouped with dropdowns ────────────────────────────────────

export const NAV_ENTRIES: NavEntry[] = [
  { label: "หน้าแรก | Home", href: "/" },
  { label: "ค้นหาทรัพย์ | Find Property", href: "/buy" },
  { label: "บริการของเรา | Our Services", href: "/services" },
  { label: "บทความ | Blog", href: "/blog" },
  { label: "เกี่ยวกับเรา | About Us", href: "/about" },
  { label: "ติดต่อเรา | Contact Us", href: "/contact" },
]

// ─── Mobile & Footer: flat list ─────────────────────────────────────────

export const NAV_ITEMS: NavItem[] = [
  { label: "หน้าแรก | Home", href: "/" },
  { label: "ค้นหาทรัพย์ | Find Property", href: "/buy" },
  { label: "บริการของเรา | Our Services", href: "/services" },
  { label: "ฝากขาย/เช่า", href: "/list-property" },
  { label: "ค้นหาบ้าน/สินเชื่อ", href: "/find-property" },
  { label: "Co-Agent", href: "/co-agent" },
  { label: "คอร์สนายหน้า", href: "/agent-course" },
  { label: "บทความ | Blog", href: "/blog" },
  { label: "เกี่ยวกับเรา | About Us", href: "/about" },
  { label: "ติดต่อเรา | Contact Us", href: "/contact" },
]
