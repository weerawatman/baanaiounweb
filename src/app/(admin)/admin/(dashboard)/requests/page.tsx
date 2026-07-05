import Link from "next/link"
import { StatusBadge } from "@/components/admin/StatusBadge"
import { getServiceRequests, getServiceRequestCounts } from "@/lib/queries/requests"
import {
  isServiceRequestType,
  SERVICE_REQUEST_TYPE_LABEL,
  type ServiceRequestType,
} from "@/lib/types/service-request"
import { RequestsTable } from "./RequestsTable"

export const metadata = { title: "คำขอบริการ" }

const TABS: ServiceRequestType[] = ["list-property", "matchmaking", "co-agent"]

interface Props {
  searchParams: Promise<{ tab?: string }>
}

export default async function RequestsPage({ searchParams }: Props) {
  const { tab } = await searchParams
  const activeTab: ServiceRequestType = isServiceRequestType(tab) ? tab : "list-property"

  const [requests, counts] = await Promise.all([
    getServiceRequests(activeTab),
    getServiceRequestCounts(),
  ])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-foreground text-2xl font-bold">คำขอบริการ</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          คำขอจากหน้าฟอร์ม /request — ฝากขาย/ปล่อยเช่า, จัดหาทรัพย์, Co-Agent
        </p>
      </div>

      {/* Tab bar (link-based, server-rendered) */}
      <div className="flex flex-wrap gap-2 border-b pb-px">
        {TABS.map((t) => {
          const active = t === activeTab
          return (
            <Link
              key={t}
              href={`/admin/requests?tab=${t}`}
              className={`inline-flex items-center gap-2 rounded-t-lg border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "border-primary text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground border-transparent"
              }`}
            >
              {SERVICE_REQUEST_TYPE_LABEL[t]}
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  active ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {counts[t]}
              </span>
            </Link>
          )
        })}
      </div>

      {/* Status summary for active tab */}
      <div className="flex flex-wrap gap-3">
        {(["new", "contacted", "closed"] as const).map((s) => {
          const count = requests.filter((r) => r.status === s).length
          return (
            <div key={s} className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2">
              <StatusBadge status={s} variant="lead" />
              <span className="text-sm font-semibold">{count}</span>
            </div>
          )
        })}
      </div>

      <RequestsTable requests={requests} type={activeTab} />
    </div>
  )
}
