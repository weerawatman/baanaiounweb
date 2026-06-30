import { createClient } from "@/lib/supabase/server"
import type { Lead } from "@/lib/types/property"

const ADMIN_LIST_FIELDS = "id, name, phone, form_tag, status, created_at"

export async function getLeads(): Promise<Lead[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("form_submissions")
    .select(ADMIN_LIST_FIELDS)
    .order("created_at", { ascending: false })
    .limit(500)

  if (error) throw new Error(error.message)
  return (data as Lead[]) ?? []
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("form_submissions").select("*").eq("id", id).single()

  if (error) return null
  return data as Lead
}
