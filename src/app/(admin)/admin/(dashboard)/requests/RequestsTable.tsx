"use client"

import Link from "next/link"
import { DataTable, type Column } from "@/components/admin/DataTable"
import { StatusBadge } from "@/components/admin/StatusBadge"
import type { ServiceRequest, ServiceRequestType } from "@/lib/types/service-request"
import { getPropertyCategoryLabelTh } from "@/content/form-options"
function buildColumns(type: ServiceRequestType): Column<ServiceRequest>[] {
  return [
    {
      key: "name",
      label: "ชื่อ",
      render: (row) => (
        <Link
          href={`/admin/requests/${row.id}?type=${type}`}
          className="text-primary font-medium hover:underline"
        >
          {row.name}
        </Link>
      ),
    },
    {
      key: "phone",
      label: "เบอร์/LINE",
    },
    {
      key: "email",
      label: "อีเมล",
    },
    {
      key: "property_type",
      label: "ประเภททรัพย์",
      render: (row) => getPropertyCategoryLabelTh(row.property_type),
    },
    {
      key: "location",
      label: "ทำเล",
    },
    {
      key: "image_urls",
      label: "รูป",
      searchable: false,
      render: (row) => (
        <span className="text-muted-foreground text-xs">
          {row.image_urls?.length > 0 ? `${row.image_urls.length} รูป` : "—"}
        </span>
      ),
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
          href={`/admin/requests/${row.id}?type=${type}`}
          className="text-muted-foreground hover:text-primary text-sm"
        >
          ดูรายละเอียด →
        </Link>
      ),
    },
  ]
}

export function RequestsTable({
  requests,
  type,
}: {
  requests: ServiceRequest[]
  type: ServiceRequestType
}) {
  return (
    <DataTable<ServiceRequest>
      data={requests}
      columns={buildColumns(type)}
      searchPlaceholder="ค้นหาชื่อ, เบอร์, อีเมล, ทำเล..."
      emptyText="ยังไม่มีคำขอ"
    />
  )
}
