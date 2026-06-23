import { StatusBadge } from "@/components/admin/StatusBadge"
import { getLeads } from "@/lib/queries/leads"
import { LeadsTable } from "./LeadsTable"

export const metadata = { title: "Leads" }

export default async function LeadsPage() {
  const leads = await getLeads()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-foreground text-2xl font-bold">Leads</h1>
        <p className="text-muted-foreground mt-1 text-sm">ผู้ที่ส่งฟอร์มเข้ามาทั้งหมด</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {(["new", "contacted", "closed"] as const).map((s) => {
          const count = leads.filter((l) => l.status === s).length
          return (
            <div key={s} className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2">
              <StatusBadge status={s} variant="lead" />
              <span className="text-sm font-semibold">{count}</span>
            </div>
          )
        })}
      </div>

      <LeadsTable leads={leads} />
    </div>
  )
}
