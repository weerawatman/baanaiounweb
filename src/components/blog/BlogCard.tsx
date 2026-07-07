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
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
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

        <div className="flex flex-1 flex-col p-6">
          {post.category && (
            <span className="mb-3 inline-flex self-start rounded bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
              {post.category}
            </span>
          )}

          <h3 className="text-lg font-bold leading-snug text-foreground line-clamp-2">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
              {post.excerpt}
            </p>
          )}

          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <span className="text-sm font-semibold text-secondary group-hover:underline">
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
