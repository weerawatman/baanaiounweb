"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/auth/guard"
import type { LeadStatus } from "@/lib/types/property"

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
): Promise<{ error?: string }> {
  await requireAdmin()

  const supabase = await createClient()
  const { error } = await supabase.from("form_submissions").update({ status }).eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/admin/leads")
  revalidatePath(`/admin/leads/${id}`)
  return {}
}

export async function updateLeadNotes(id: string, notes: string): Promise<{ error?: string }> {
  await requireAdmin()

  const supabase = await createClient()
  const { error } = await supabase.from("form_submissions").update({ notes }).eq("id", id)

  if (error) return { error: error.message }

  revalidatePath(`/admin/leads/${id}`)
  return {}
}
