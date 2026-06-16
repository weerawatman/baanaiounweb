"use client"

import Link from "next/link"
import { DataTable, type Column } from "@/components/admin/DataTable"
import { StatusBadge } from "@/components/admin/StatusBadge"
import type { Lead } from "@/lib/types/property"

const FORM_TAG_LABEL: Record<string, string> = {
  owner: "เจ้าของ (TH)",
  "owner-foreign": "เจ้าของ (EN)",
  buyer: "ซื้อ/เช่า (TH)",
  "buyer-foreign": "ซื้อ/เช่า (EN)",
  "co-agent": "Co-Agent",
  academy: "Academy",
  contact: "ติดต่อ",
}

const columns: Column<Lead>[] = [
  {
    key: "name",
    label: "ชื่อ",
    render: (row) => (
      <Link
        href={`/admin/leads/${row.id}`}
        className="font-medium text-primary hover:underline"
      >
        {row.name}
      </Link>
    ),
  },
  {
    key: "form_tag",
    label: "ฟอร์ม",
    render: (row) => (
      <span className="text-xs text-muted-foreground">
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
      <Link
        href={`/admin/leads/${row.id}`}
        className="text-sm text-muted-foreground hover:text-primary"
      >
        ดูรายละเอียด →
      </Link>
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
