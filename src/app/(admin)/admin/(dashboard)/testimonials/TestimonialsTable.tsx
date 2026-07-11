"use client"

import { Star } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DataTable, type Column } from "@/components/admin/DataTable"
import { AdminRowLink } from "@/components/admin/AdminRowLink"
import { ConfirmDialog } from "@/components/admin/ConfirmDialog"
import { deleteTestimonial } from "@/actions/testimonials"
import type { Testimonial } from "@/lib/types/property"
import { cn } from "@/lib/utils"

const columns: Column<Testimonial>[] = [
  {
    key: "client_name",
    label: "ลูกค้า",
    render: (row) => <span className="font-medium">{row.client_name}</span>,
  },
  {
    key: "quote",
    label: "รีวิว",
    render: (row) => (
      <span className="text-muted-foreground line-clamp-2 max-w-xs text-sm">{row.quote}</span>
    ),
  },
  {
    key: "rating",
    label: "คะแนน",
    searchable: false,
    render: (row) => (
      <div className="flex items-center gap-1">
        <Star className="size-3.5 fill-amber-400 text-amber-400" />
        <span className="text-sm font-medium">{row.rating}</span>
      </div>
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
          href={`/admin/testimonials/${row.id}/edit`}
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
          title="ลบรีวิว"
          description={`รีวิวของ "${row.client_name}" จะถูกลบถาวร`}
          confirmLabel="ลบ"
          onConfirm={() => deleteTestimonial(row.id)}
        />
      </div>
    ),
  },
]

export function TestimonialsTable({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <DataTable<Testimonial>
      data={testimonials}
      columns={columns}
      searchPlaceholder="ค้นหารีวิว..."
      emptyText="ยังไม่มีรีวิว"
    />
  )
}
