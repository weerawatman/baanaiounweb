/**
 * Types for the /request service-request feature (3 tabs → 3 tables).
 */

export type ServiceRequestType = "list-property" | "matchmaking" | "co-agent"

export type ServiceRequestStatus = "new" | "contacted" | "closed"

export interface ServiceRequest {
  id: string
  created_at: string
  name: string
  phone: string
  email: string
  property_type: string
  location: string
  budget: string | null
  image_urls: string[]
  status: ServiceRequestStatus
  notes: string | null
}

/** Whitelist mapping request type → table name. Never build table names any other way. */
export const SERVICE_REQUEST_TABLES: Record<ServiceRequestType, string> = {
  "list-property": "list_property_requests",
  matchmaking: "matchmaking_requests",
  "co-agent": "coagent_requests",
}

export function isServiceRequestType(value: string | undefined): value is ServiceRequestType {
  return value === "list-property" || value === "matchmaking" || value === "co-agent"
}

export const SERVICE_REQUEST_TYPE_LABEL: Record<ServiceRequestType, string> = {
  "list-property": "ฝากขาย/ปล่อยเช่า",
  matchmaking: "จัดหาทรัพย์ตามต้องการ",
  "co-agent": "Co-Agent",
}
