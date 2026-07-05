"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/auth/guard"
import {
  SERVICE_REQUEST_TABLES,
  isServiceRequestType,
  type ServiceRequestStatus,
} from "@/lib/types/service-request"

export async function updateRequestStatus(
  type: string,
  id: string,
  status: ServiceRequestStatus,
): Promise<{ error?: string }> {
  await requireAdmin()

  if (!isServiceRequestType(type)) return { error: "Invalid request type" }

  const supabase = await createClient()
  const { error } = await supabase
    .from(SERVICE_REQUEST_TABLES[type])
    .update({ status })
    .eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/admin/requests")
  revalidatePath(`/admin/requests/${id}`)
  return {}
}

export async function updateRequestNotes(
  type: string,
  id: string,
  notes: string,
): Promise<{ error?: string }> {
  await requireAdmin()

  if (!isServiceRequestType(type)) return { error: "Invalid request type" }

  const supabase = await createClient()
  const { error } = await supabase
    .from(SERVICE_REQUEST_TABLES[type])
    .update({ notes })
    .eq("id", id)

  if (error) return { error: error.message }

  revalidatePath(`/admin/requests/${id}`)
  return {}
}
