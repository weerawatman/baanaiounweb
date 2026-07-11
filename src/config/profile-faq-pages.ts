/**
 * Maps admin Profile tabs to public FAQ page_slug values in Supabase.
 * Keep in sync with getFaqsByPage() calls on each public route.
 */
export const PROFILE_PAGE_FAQS = {
  home: { slug: "home", path: "/" },
  "property-match": { slug: "find-property", path: "/find-property" },
  "list-property": { slug: "list-property", path: "/list-property" },
  blog: { slug: "blog", path: "/blog" },
  about: { slug: "about", path: "/about" },
  services: { slug: "services", path: "/services" },
  "agent-course": { slug: "agent-course", path: "/agent-course" },
  "co-agent": { slug: "co-agent", path: "/co-agent" },
} as const

export type ProfileFaqTab = keyof typeof PROFILE_PAGE_FAQS

/** Public route order — home first, then main nav flow */
export const PROFILE_FAQ_TAB_ORDER: ProfileFaqTab[] = [
  "home",
  "property-match",
  "list-property",
  "services",
  "blog",
  "about",
  "agent-course",
  "co-agent",
]

/** URL-style name shown in admin, e.g. home, blog, find-property */
export function faqRouteName(path: string): string {
  return path === "/" ? "home" : path.slice(1)
}

export function faqPageSortIndex(slug: string): number {
  const idx = PROFILE_FAQ_TAB_ORDER.findIndex(
    (tab) => PROFILE_PAGE_FAQS[tab].slug === slug,
  )
  return idx === -1 ? PROFILE_FAQ_TAB_ORDER.length : idx
}
