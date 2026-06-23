import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { BlogPostForm } from "../../BlogPostForm"
import { updateBlogPost } from "@/actions/blog"
import { getBlogPostById } from "@/lib/queries/blog"

export const metadata = { title: "แก้ไขบทความ" }

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params
  const post = await getBlogPostById(id)

  if (!post) notFound()

  const action = updateBlogPost.bind(null, id)

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
        <h1 className="text-foreground text-2xl font-bold">แก้ไขบทความ: {post.title}</h1>
      </div>

      <BlogPostForm defaultValues={post} action={action} submitLabel="บันทึกการเปลี่ยนแปลง" />
    </div>
  )
}
