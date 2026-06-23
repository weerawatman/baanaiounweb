import { createClient } from "@/lib/supabase/server"
import type { Property } from "@/lib/types/property"

export async function getProperties(): Promise<Property[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return (data as Property[]) ?? []
}

export async function getPropertyBySlug(
  slug: string,
): Promise<Property | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .is("deleted_at", null)
    .single()

  if (error) return null
  return data as Property
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

export async function getPublishedProperties(): Promise<Property[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("status", "ACTIVE")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return (data as Property[]) ?? []
}
