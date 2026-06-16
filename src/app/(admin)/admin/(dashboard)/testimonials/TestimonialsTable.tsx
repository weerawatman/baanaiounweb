"use client"

import Link from "next/link"
import { Star } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DataTable, type Column } from "@/components/admin/DataTable"
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
      <span className="line-clamp-2 text-sm text-muted-foreground max-w-xs">
        {row.quote}
      </span>
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
        <Badge
          className="bg-green-100 text-green-700 border-green-200"
          variant="outline"
        >
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
      <div className="flex items-center gap-2 justify-end">
        <Link
          href={`/admin/testimonials/${row.id}/edit`}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          แก้ไข
        </Link>
        <ConfirmDialog
          trigger={
            <span
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "text-red-600 border-red-200 hover:bg-red-50 cursor-pointer",
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
