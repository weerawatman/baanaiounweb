import { cache } from "react"
import { createClient } from "@/lib/supabase/server"
import type { Property } from "@/lib/types/property"

const CARD_FIELDS =
  "id, slug, title, type, price, price_label, status, featured, images, image_primary, bedrooms, bathrooms, area_sqm, district, subdistrict, created_at"

export async function getActiveProperties(): Promise<Property[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("properties")
    .select(CARD_FIELDS)
    .eq("status", "ACTIVE")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(200)
  if (error) throw new Error(error.message)
  return (data as Property[]) ?? []
}

export async function getSaleProperties(): Promise<Property[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("properties")
    .select(CARD_FIELDS)
    .eq("type", "SALE")
    .eq("status", "ACTIVE")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(200)
  if (error) throw new Error(error.message)
  return (data as Property[]) ?? []
}

export async function getRentProperties(): Promise<Property[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("properties")
    .select(CARD_FIELDS)
    .eq("type", "RENT")
    .eq("status", "ACTIVE")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(200)
  if (error) throw new Error(error.message)
  return (data as Property[]) ?? []
}

export async function getLandProperties(): Promise<Property[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("properties")
    .select(CARD_FIELDS)
    .eq("type", "LAND")
    .eq("status", "ACTIVE")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(200)
  if (error) throw new Error(error.message)
  return (data as Property[]) ?? []
}

export async function getRelatedProperties(ids: string[]): Promise<Property[]> {
  if (ids.length === 0) return []
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("properties")
    .select(CARD_FIELDS)
    .in("id", ids)
    .is("deleted_at", null)
    .eq("status", "ACTIVE")
  if (error) return []
  return (data as Property[]) ?? []
}

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

export const getPropertyBySlug = cache(async (slug: string): Promise<Property | null> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .is("deleted_at", null)
    .single()

  if (error) return null
  return data as Property
})

export const getPropertyById = cache(async (id: string): Promise<Property | null> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .is("deleted_at", null)
    .single()

  if (error) return null
  return data as Property
})

// Dead code removed: getPublishedProperties() was unused (replaced by getActiveProperties)
