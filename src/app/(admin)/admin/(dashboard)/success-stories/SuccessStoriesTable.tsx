"use client"

import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DataTable, type Column } from "@/components/admin/DataTable"
import { AdminRowLink } from "@/components/admin/AdminRowLink"
import { ConfirmDialog } from "@/components/admin/ConfirmDialog"
import { deleteSuccessStory } from "@/actions/success-stories"
import type { SuccessStory } from "@/lib/types/property"
import { cn } from "@/lib/utils"

const columns: Column<SuccessStory>[] = [
  {
    key: "title",
    label: "หัวข้อ",
    render: (row) => (
      <div>
        <span className="font-medium">{row.title}</span>
        {row.title_en && (
          <p className="text-muted-foreground text-xs">{row.title_en}</p>
        )}
      </div>
    ),
  },
  {
    key: "location",
    label: "ทำเล",
    render: (row) => (
      <span className="text-muted-foreground text-sm">{row.location || "—"}</span>
    ),
  },
  {
    key: "published",
    label: "สถานะ",
    searchable: false,
    render: (row) =>
      row.published ? (
        <Badge className="border-green-200 bg-green-100 text-green-700" variant="outline">
          เผยแพร่
        </Badge>
      ) : (
        <Badge variant="outline" className="text-muted-foreground">
          ซ่อน
        </Badge>
      ),
  },
  {
    key: "actions",
    label: "",
    searchable: false,
    render: (row) => (
      <div className="flex items-center justify-end gap-2">
        <AdminRowLink
          href={`/admin/success-stories/${row.id}/edit`}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          แก้ไข
        </AdminRowLink>
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
          title="ลบผลงาน"
          description={`ผลงาน "${row.title}" จะถูกลบถาวร`}
          confirmLabel="ลบ"
          onConfirm={() => deleteSuccessStory(row.id)}
        />
      </div>
    ),
  },
]

export function SuccessStoriesTable({ stories }: { stories: SuccessStory[] }) {
  return (
    <DataTable<SuccessStory>
      data={stories}
      columns={columns}
      searchPlaceholder="ค้นหาผลงาน..."
      emptyText="ยังไม่มีผลงาน"
    />
  )
}
