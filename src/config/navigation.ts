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
  { label: "หน้าแรก", href: "/" },
  {
    label: "ค้นหาทรัพย์",
    children: [
      { label: "ซื้อบ้าน", href: "/buy" },
      { label: "เช่าบ้าน", href: "/rent" },
      { label: "ที่ดิน", href: "/land" },
    ],
  },
  {
    label: "บริการ",
    children: [
      { label: "ฝากขาย / ปล่อยเช่า", href: "/owners" },
      { label: "Co-Agent เครือข่ายนายหน้า", href: "/co-agent" },
      { label: "สร้างรายได้กับอสังหาฯ", href: "/academy" },
    ],
  },
  { label: "บทความ", href: "/blog" },
  { label: "เกี่ยวกับพิม", href: "/about" },
  { label: "ติดต่อเรา", href: "/contact" },
]

// ─── Mobile & Footer: flat list ─────────────────────────────────────────

export const NAV_ITEMS: NavItem[] = [
  { label: "หน้าแรก", href: "/" },
  { label: "ซื้อบ้าน", href: "/buy" },
  { label: "เช่าบ้าน", href: "/rent" },
  { label: "ที่ดิน", href: "/land" },
  { label: "ฝากขาย/เช่า", href: "/owners" },
  { label: "Co-Agent", href: "/co-agent" },
  { label: "สร้างรายได้", href: "/academy" },
  { label: "บทความ", href: "/blog" },
  { label: "เกี่ยวกับพิม", href: "/about" },
  { label: "ติดต่อเรา", href: "/contact" },
]
