/**
 * Main navigation items used in Header and Footer.
 * Labels are bilingual objects; display one language via pickLocalized / navText.
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
  { th: "งานหาทรัพย์", en: "Property Match", href: "/find-property" },
  { th: "บริการของเรา", en: "Our Services", href: "/services" },
  { th: "บทความ", en: "Blog", href: "/blog" },
  { th: "เกี่ยวกับเรา", en: "About Us", href: "/about" },
  { th: "ติดต่อเรา", en: "Contact Us", href: "/contact" },
]

// ─── Mobile & Footer: flat list ─────────────────────────────────────────

export const NAV_ITEMS: NavItem[] = [
  { th: "หน้าแรก", en: "Home", href: "/" },
  { th: "งานหาทรัพย์", en: "Property Match", href: "/find-property" },
  { th: "บริการของเรา", en: "Our Services", href: "/services" },
  { th: "ฝากขาย/เช่า", en: "List Property", href: "/list-property" },
  { th: "Co-Agent", en: "Co-Agent", href: "/co-agent" },
  { th: "คอร์สนายหน้า", en: "Agent Course", href: "/agent-course" },
  { th: "บทความ", en: "Blog", href: "/blog" },
  { th: "เกี่ยวกับเรา", en: "About Us", href: "/about" },
  { th: "ติดต่อเรา", en: "Contact Us", href: "/contact" },
]

// ─── Footer quick links (เมนูลัด) ───────────────────────────────────────

export const FOOTER_QUICK_LINKS: NavItem[] = [
  { th: "ฝากขาย/ปล่อยเช่า", en: "List Property", href: "/list-property" },
  { th: "ค้นหาทรัพย์", en: "Find Properties", href: "/find-property" },
  { th: "ร่วมเป็น Co-Agent", en: "Co-Agent Program", href: "/co-agent" },
  { th: "คอร์สนายหน้าอสังหาฯ", en: "Real Estate Course", href: "/agent-course" },
]

/** Popular search pills in the footer — links to property search. */
export const FOOTER_SEO_TAGS: { label: string; href: string }[] = [
  { label: "บ้านมือสอง ชลบุรี", href: "/properties?query=บ้านมือสอง+ชลบุรี" },
  { label: "คอนโด อ่อนนุช", href: "/properties?query=คอนโด+อ่อนนุช" },
  { label: "คอนโด สุขุมวิท 77", href: "/properties?query=คอนโด+สุขุมวิท+77" },
  { label: "คอนโดใกล้นิคม EEC", href: "/properties?query=คอนโด+EEC" },
  { label: "ทาวน์โฮม สมุทรปราการ", href: "/properties?query=ทาวน์โฮม+สมุทรปราการ" },
  { label: "หาบ้านเช่า ฟรี", href: "/properties?purpose=RENT" },
]
