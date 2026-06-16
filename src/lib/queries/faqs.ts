import { createClient } from "@/lib/supabase/server"
import type { Faq } from "@/lib/types/property"

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
