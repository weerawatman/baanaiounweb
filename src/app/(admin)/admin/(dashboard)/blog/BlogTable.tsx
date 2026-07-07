"use client"

import Link from "next/link"
import Image from "next/image"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DataTable, type Column } from "@/components/admin/DataTable"
import { ConfirmDialog } from "@/components/admin/ConfirmDialog"
import { deleteBlogPost } from "@/actions/blog"
import type { BlogPost } from "@/lib/types/property"
import { cn } from "@/lib/utils"
import { FileImage } from "lucide-react"

const columns: Column<BlogPost>[] = [
  {
    key: "featured_image",
    label: "รูปปก",
    searchable: false,
    render: (row) => (
      <div className="relative size-14 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
        {row.featured_image ? (
          <Image
            src={row.featured_image}
            alt=""
            fill
            sizes="56px"
            className="object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-muted-foreground">
            <FileImage className="size-5" />
          </div>
        )}
      </div>
    ),
  },
  {
    key: "title",
    label: "ชื่อบทความ",
    render: (row) => (
      <div className="flex flex-col">
        <span className="text-foreground font-medium">{row.title}</span>
        <span className="text-muted-foreground text-xs">{row.slug}</span>
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
        <Badge className="border-green-200 bg-green-100 text-green-700" variant="outline">
          ใช้งาน
        </Badge>
      ) : (
        <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-800">
          ยกเลิก
        </Badge>
      ),
  },
  {
    key: "created_at",
    label: "วันที่",
    searchable: false,
    render: (row) =>
      new Date(row.published_at ?? row.created_at).toLocaleDateString("th-TH", {
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
      <div className="flex items-center justify-end gap-2">
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
                "cursor-pointer border-red-200 text-red-600 hover:bg-red-50",
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
