import Link from "next/link"
import { Plus } from "lucide-react"
import { buttonVariants } from "@/lib/button-variants"
import { getBlogPosts } from "@/lib/queries/blog"
import { BlogTable } from "./BlogTable"
import { cn } from "@/lib/utils"

export const metadata = { title: "บทความ" }

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">บทความ</h1>
          <p className="mt-1 text-sm text-muted-foreground">จัดการบทความทั้งหมด</p>
        </div>
        <Link
          href="/admin/blog/new"
          className={cn(
            buttonVariants({ variant: "default" }),
            "gap-2 bg-primary text-white hover:bg-primary/90",
          )}
        >
          <Plus className="size-4" />
          เพิ่มบทความ
        </Link>
      </div>

      <BlogTable posts={posts} />
    </div>
  )
}
