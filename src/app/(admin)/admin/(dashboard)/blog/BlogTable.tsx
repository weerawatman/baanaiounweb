"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DataTable, type Column } from "@/components/admin/DataTable"
import { ConfirmDialog } from "@/components/admin/ConfirmDialog"
import { deleteBlogPost } from "@/actions/blog"
import type { BlogPost } from "@/lib/types/property"
import { cn } from "@/lib/utils"

const columns: Column<BlogPost>[] = [
  {
    key: "title",
    label: "ชื่อบทความ",
    render: (row) => (
      <div className="flex flex-col">
        <span className="font-medium text-foreground">{row.title}</span>
        <span className="text-xs text-muted-foreground">{row.slug}</span>
      </div>
    ),
  },
  {
    key: "category",
    label: "หมวดหมู่",
    render: (row) => row.category || "—",
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
          ฉบับร่าง
        </Badge>
      ),
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
      <div className="flex items-center gap-2 justify-end">
        <Link
          href={`/admin/blog/${row.id}/edit`}
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
          title="ลบบทความ"
          description={`"${row.title}" จะถูกลบถาวร`}
          confirmLabel="ลบ"
          onConfirm={() => deleteBlogPost(row.id)}
        />
      </div>
    ),
  },
]

export function BlogTable({ posts }: { posts: BlogPost[] }) {
  return (
    <DataTable<BlogPost>
      data={posts}
      columns={columns}
      searchPlaceholder="ค้นหาบทความ..."
      emptyText="ยังไม่มีบทความ"
    />
  )
}
