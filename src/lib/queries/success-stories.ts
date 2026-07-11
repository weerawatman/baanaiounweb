import { unstable_cache } from "next/cache"
import { publicClient } from "@/lib/supabase/public-client"
import { createClient } from "@/lib/supabase/server"
import { filterDisplayableSuccessStoryRows } from "@/lib/success-stories-display"
import type { SuccessStory } from "@/lib/types/property"

const PUBLIC_FIELDS =
  "id, title, title_en, description, description_en, location, before_image_url, after_image_url, sort_order"

// ─── Public (ISR-cached) ─────────────────────────────────────────────────────

export const getPublishedSuccessStories = unstable_cache(
  async (): Promise<SuccessStory[]> => {
    const { data, error } = await publicClient
      .from("success_stories")
      .select(PUBLIC_FIELDS)
      .eq("published", true)
      .order("sort_order", { ascending: true })
    if (error) throw new Error(error.message)
    const rows = (data as SuccessStory[]) ?? []
    return filterDisplayableSuccessStoryRows(rows)
  },
  ["success-stories"],
  { revalidate: 3600, tags: ["success-stories"] },
)

// ─── Admin (dynamic, requires auth) ─────────────────────────────────────────

export async function getAllSuccessStories(): Promise<SuccessStory[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("success_stories")
      .select("*")
      .order("sort_order", { ascending: true })
    if (error) {
      console.error("[getAllSuccessStories]", error.message)
      return []
    }
    return (data as SuccessStory[]) ?? []
  } catch (err) {
    console.error("[getAllSuccessStories]", err)
    return []
  }
}

export async function getSuccessStoryById(id: string): Promise<SuccessStory | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("success_stories").select("*").eq("id", id).single()
  if (error) return null
  return data as SuccessStory
}
