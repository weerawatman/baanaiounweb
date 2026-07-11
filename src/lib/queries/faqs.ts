import { unstable_cache } from "next/cache"
import { publicClient } from "@/lib/supabase/public-client"
import { createClient } from "@/lib/supabase/server"
import type { Faq } from "@/lib/types/property"

// ─── Public (ISR-cached) ─────────────────────────────────────────────────────

export const getFaqsByPage = unstable_cache(
  async (pageSlug: string): Promise<Faq[]> => {
    const { data, error } = await publicClient
      .from("faqs")
      .select("id, question, answer, page_slug, sort_order")
      .eq("page_slug", pageSlug)
      .order("sort_order", { ascending: true })
    if (error) throw new Error(error.message)
    return (data as Faq[]) ?? []
  },
  ["faqs-by-page"],
  { revalidate: 3600, tags: ["faqs"] },
)

// ─── Admin (dynamic, requires auth) ─────────────────────────────────────────

export async function getFaqs(): Promise<Faq[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("page_slug")
    .order("sort_order", { ascending: true })
  if (error) throw new Error(error.message)
  return (data as Faq[]) ?? []
}

export function groupFaqsByPage(faqs: Faq[]): Record<string, Faq[]> {
  return faqs.reduce<Record<string, Faq[]>>((acc, faq) => {
    const slug = faq.page_slug ?? "home"
    ;(acc[slug] ??= []).push(faq)
    return acc
  }, {})
}
