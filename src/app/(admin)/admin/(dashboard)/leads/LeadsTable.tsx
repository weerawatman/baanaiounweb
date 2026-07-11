"use client"

import { DataTable, type Column } from "@/components/admin/DataTable"
import { AdminRowLink } from "@/components/admin/AdminRowLink"
import { StatusBadge } from "@/components/admin/StatusBadge"
import type { Lead } from "@/lib/types/property"

const FORM_TAG_LABEL: Record<string, string> = {
  owner: "เจ้าของ (TH)",
  "owner-foreign": "เจ้าของ (EN)",
  buyer: "ซื้อ/เช่า (TH)",
  "buyer-foreign": "ซื้อ/เช่า (EN)",
  "co-agent": "Co-Agent",
  academy: "คอร์สนายหน้า | Agent Course",
  contact: "ติดต่อ",
}

const columns: Column<Lead>[] = [
  {
    key: "name",
    label: "ชื่อ",
    render: (row) => (
      <AdminRowLink
        href={`/admin/leads/${row.id}`}
        className="text-primary font-medium hover:underline"
      >
        {row.name}
      </AdminRowLink>
    ),
  },
  {
    key: "form_tag",
    label: "ฟอร์ม",
    render: (row) => (
      <span className="text-muted-foreground text-xs">
        {FORM_TAG_LABEL[row.form_tag] ?? row.form_tag}
      </span>
    ),
  },
  {
    key: "phone",
    label: "เบอร์โทร",
    render: (row) => row.phone ?? "—",
  },
  {
    key: "status",
    label: "สถานะ",
    searchable: false,
    render: (row) => <StatusBadge status={row.status} variant="lead" />,
  },
  {
    key: "created_at",
    label: "วันที่",
    searchable: false,
    render: (row) =>
      new Date(row.created_at).toLocaleDateString("th-TH", {
        day: "numeric",
        month: "short",
        year: "2-digit",
      }),
  },
  {
    key: "actions",
    label: "",
    searchable: false,
    render: (row) => (
      <AdminRowLink
        href={`/admin/leads/${row.id}`}
        className="text-muted-foreground hover:text-primary text-sm"
      >
        ดูรายละเอียด →
      </AdminRowLink>
    ),
  },
]

export function LeadsTable({ leads }: { leads: Lead[] }) {
  return (
    <DataTable<Lead>
      data={leads}
      columns={columns}
      searchPlaceholder="ค้นหาชื่อ, เบอร์..."
      emptyText="ยังไม่มี leads"
    />
  )
}
