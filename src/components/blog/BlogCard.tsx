import Link from "next/link"
import Image from "next/image"
import { FileImage } from "lucide-react"
import { type BlogPost } from "@/types"

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[0_4px_6px_rgba(0,0,0,0.03)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.08)]">
      <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
        <div className="relative h-[200px] border-b border-border bg-muted">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <FileImage className="size-10 opacity-40" />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-[25px]">
          {post.category && (
            <span className="mb-3 inline-flex self-start rounded bg-[#f0fdf4] px-2.5 py-1 text-xs font-bold text-primary">
              {post.category}
            </span>
          )}

          <h3 className="text-xl font-bold leading-snug text-foreground line-clamp-2">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground line-clamp-3">
              {post.excerpt}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between border-t border-border pt-[15px]">
            <span className="text-sm font-bold text-orange-600 group-hover:underline">
              อ่านต่อ → | Read more →
            </span>
            {formattedDate && (
              <time className="text-xs text-muted-foreground" dateTime={post.publishedAt}>
                {formattedDate}
              </time>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}
