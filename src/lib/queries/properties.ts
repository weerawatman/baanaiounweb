import { unstable_cache } from "next/cache"
import { publicClient } from "@/lib/supabase/public-client"
import { createClient } from "@/lib/supabase/server"
import type { Property } from "@/lib/types/property"

const CARD_FIELDS =
  "id, slug, title, type, price, price_label, status, featured, images, image_primary, bedrooms, bathrooms, area_sqm, district, subdistrict, created_at"

// ─── Public queries (ISR-cached, no cookies) ────────────────────────────────

export const getActiveProperties = unstable_cache(
  async (): Promise<Property[]> => {
    const { data, error } = await publicClient
      .from("properties")
      .select(CARD_FIELDS)
      .eq("status", "ACTIVE")
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .limit(200)
    if (error) throw new Error(error.message)
    return (data as Property[]) ?? []
  },
  ["active-properties"],
  { revalidate: 900, tags: ["properties"] },
)

export const getSaleProperties = unstable_cache(
  async (): Promise<Property[]> => {
    const { data, error } = await publicClient
      .from("properties")
      .select(CARD_FIELDS)
      .eq("type", "SALE")
      .eq("status", "ACTIVE")
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .limit(200)
    if (error) throw new Error(error.message)
    return (data as Property[]) ?? []
  },
  ["sale-properties"],
  { revalidate: 900, tags: ["properties"] },
)

export const getRentProperties = unstable_cache(
  async (): Promise<Property[]> => {
    const { data, error } = await publicClient
      .from("properties")
      .select(CARD_FIELDS)
      .eq("type", "RENT")
      .eq("status", "ACTIVE")
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .limit(200)
    if (error) throw new Error(error.message)
    return (data as Property[]) ?? []
  },
  ["rent-properties"],
  { revalidate: 900, tags: ["properties"] },
)

export const getLandProperties = unstable_cache(
  async (): Promise<Property[]> => {
    const { data, error } = await publicClient
      .from("properties")
      .select(CARD_FIELDS)
      .eq("type", "LAND")
      .eq("status", "ACTIVE")
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .limit(200)
    if (error) throw new Error(error.message)
    return (data as Property[]) ?? []
  },
  ["land-properties"],
  { revalidate: 900, tags: ["properties"] },
)

export const getPropertyBySlug = unstable_cache(
  async (slug: string): Promise<Property | null> => {
    const { data, error } = await publicClient
      .from("properties")
      .select("*")
      .eq("slug", slug)
      .is("deleted_at", null)
      .single()
    if (error) return null
    return data as Property
  },
  ["property-by-slug"],
  { revalidate: 900, tags: ["properties"] },
)

export const getRelatedProperties = unstable_cache(
  async (ids: string[]): Promise<Property[]> => {
    if (ids.length === 0) return []
    const { data, error } = await publicClient
      .from("properties")
      .select(CARD_FIELDS)
      .in("id", ids)
      .is("deleted_at", null)
      .eq("status", "ACTIVE")
    if (error) return []
    return (data as Property[]) ?? []
  },
  ["related-properties"],
  { revalidate: 900, tags: ["properties"] },
)

// ─── Admin queries (dynamic, requires auth session via cookies) ──────────────

const ADMIN_FIELDS = "id, slug, title, type, price_label, status, deleted_at"

export async function getProperties(): Promise<Property[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("properties")
    .select(ADMIN_FIELDS)
    .order("created_at", { ascending: false })
    .limit(500)
  if (error) throw new Error(error.message)
  return (data as Property[]) ?? []
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .is("deleted_at", null)
    .single()
  if (error) return null
  return data as Property
}
