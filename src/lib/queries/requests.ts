import { createClient } from "@/lib/supabase/server"
import {
  SERVICE_REQUEST_TABLES,
  type ServiceRequest,
  type ServiceRequestType,
} from "@/lib/types/service-request"

export async function getServiceRequests(type: ServiceRequestType): Promise<ServiceRequest[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from(SERVICE_REQUEST_TABLES[type])
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500)

  if (error) throw new Error(error.message)
  return (data as ServiceRequest[]) ?? []
}

export async function getServiceRequestById(
  type: ServiceRequestType,
  id: string,
): Promise<ServiceRequest | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from(SERVICE_REQUEST_TABLES[type])
    .select("*")
    .eq("id", id)
    .single()

  if (error) return null
  return data as ServiceRequest
}

export async function getServiceRequestCounts(): Promise<Record<ServiceRequestType, number>> {
  const supabase = await createClient()

  const counts = await Promise.all(
    (Object.entries(SERVICE_REQUEST_TABLES) as [ServiceRequestType, string][]).map(
      async ([type, table]) => {
        const { count } = await supabase.from(table).select("id", { count: "exact", head: true })
        return [type, count ?? 0] as const
      },
    ),
  )

  return Object.fromEntries(counts) as Record<ServiceRequestType, number>
}
