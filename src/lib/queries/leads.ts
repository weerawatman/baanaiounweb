import { createClient } from "@/lib/supabase/server"
import type { Lead } from "@/lib/types/property"

export async function getLeads(): Promise<Lead[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("form_submissions")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return (data as Lead[]) ?? []
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("form_submissions").select("*").eq("id", id).single()

  if (error) return null
  return data as Lead
}
