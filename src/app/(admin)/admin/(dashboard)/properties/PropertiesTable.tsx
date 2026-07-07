"use client"

import Link from "next/link"
import { ArchiveRestore, Star } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { DataTable, type Column } from "@/components/admin/DataTable"
import { StatusBadge } from "@/components/admin/StatusBadge"
import { ConfirmDialog } from "@/components/admin/ConfirmDialog"
import { archiveProperty, restoreProperty, toggleFeaturedProperty } from "@/actions/properties"
import type { Property } from "@/lib/types/property"
import { cn } from "@/lib/utils"

const TYPE_LABEL: Record<string, string> = {
  SALE: "ขาย",
  RENT: "เช่า",
  LAND: "ที่ดิน",
}

const columns: Column<Property>[] = [
  {
    key: "title",
    label: "ชื่อทรัพย์",
    render: (row) => (
      <div className="flex flex-col">
        <span className="text-foreground font-medium">{row.title}</span>
        <span className="text-muted-foreground text-xs">{row.slug}</span>
      </div>
    ),
  },
  {
    key: "type",
    label: "ประเภท",
    render: (row) => <span>{TYPE_LABEL[row.type] ?? row.type}</span>,
  },
  { key: "price_label", label: "ราคา", searchable: false },
  {
    key: "status",
    label: "สถานะ",
    searchable: false,
    render: (row) => <StatusBadge status={row.status} variant="property" />,
  },
  {
    key: "featured",
    label: "คัดพิเศษ",
    searchable: false,
    render: (row) =>
      row.deleted_at ? null : (
        <button
          type="button"
          onClick={() => toggleFeaturedProperty(row.id, !row.featured)}
          title={
            row.featured
              ? "เอาออกจากทรัพย์แนะนำคัดพิเศษ (หน้าแรก)"
              : "ตั้งเป็นทรัพย์แนะนำคัดพิเศษ (แสดงหน้าแรก สูงสุด 9 รายการ)"
          }
          aria-label="สลับทรัพย์แนะนำคัดพิเศษ"
          className="rounded-md p-1.5 transition-colors hover:bg-gray-100"
        >
          <Star
            className={cn(
              "size-5 transition-colors",
              row.featured ? "fill-[#D4A843] text-[#D4A843]" : "text-gray-300 hover:text-gray-400",
            )}
          />
        </button>
      ),
  },
  {
    key: "actions",
    label: "",
    searchable: false,
    render: (row) => (
      <div className="flex items-center justify-end gap-2">
        <Link
          href={`/admin/properties/${row.id}/edit`}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          แก้ไข
        </Link>
        {row.deleted_at ? (
          <ConfirmDialog
            trigger={
              <span
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "cursor-pointer gap-1 border-green-200 text-green-700 hover:bg-green-50",
                )}
              >
                <ArchiveRestore className="size-3.5" />
                คืนค่า
              </span>
            }
            title="คืนค่าทรัพย์"
            description={`คุณต้องการคืนค่า "${row.title}" ให้กลับมาแสดงในระบบหรือไม่?`}
            confirmLabel="คืนค่า"
            variant="default"
            onConfirm={() => restoreProperty(row.id)}
          />
        ) : (
          <ConfirmDialog
            trigger={
              <span
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "cursor-pointer border-red-200 text-red-600 hover:bg-red-50",
                )}
              >
                ลบ
              </span>
            }
            title="ยืนยันการลบ"
            description={`"${row.title}" จะถูก archive (สามารถกู้คืนได้)`}
            confirmLabel="ลบ"
            onConfirm={() => archiveProperty(row.id)}
          />
        )}
      </div>
    ),
  },
]

export function PropertiesTable({
  active,
  archived,
}: {
  active: Property[]
  archived: Property[]
}) {
  return (
    <>
      <DataTable<Property>
        data={active}
        columns={columns}
        searchPlaceholder="ค้นหาทรัพย์..."
        emptyText="ยังไม่มีทรัพย์ในระบบ"
      />

      {archived.length > 0 && (
        <details className="rounded-xl border bg-white">
          <summary className="text-muted-foreground hover:text-foreground cursor-pointer px-4 py-3 text-sm font-medium">
            Archived ({archived.length} รายการ)
          </summary>
          <div className="p-4 pt-0">
            <DataTable<Property>
              data={archived}
              columns={columns}
              searchPlaceholder="ค้นหา..."
              emptyText="ไม่มีทรัพย์ที่ถูกลบ"
            />
          </div>
        </details>
      )}
    </>
  )
}
