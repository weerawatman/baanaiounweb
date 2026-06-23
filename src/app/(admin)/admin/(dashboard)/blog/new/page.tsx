import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { BlogPostForm } from "../BlogPostForm"
import { createBlogPost } from "@/actions/blog"

export const metadata = { title: "เพิ่มบทความ" }

export default function NewBlogPage() {
  return (
    <div className="flex max-w-4xl flex-col gap-6">
      <div>
        <Link
          href="/admin/blog"
          className="text-muted-foreground hover:text-foreground mb-3 inline-flex items-center gap-1 text-sm"
        >
          <ChevronLeft className="size-4" />
          กลับ
        </Link>
        <h1 className="text-foreground text-2xl font-bold">เพิ่มบทความใหม่</h1>
      </div>

      <BlogPostForm action={createBlogPost} submitLabel="เผยแพร่บทความ" />
    </div>
  )
}
