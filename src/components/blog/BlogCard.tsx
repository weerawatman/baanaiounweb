import Link from "next/link"
import Image from "next/image"
import { FileImage } from "lucide-react"
import { type BlogPost } from "@/types"
import { BLOG_PAGE_CONTENT } from "@/content/blog"

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  const { cardAuthor } = BLOG_PAGE_CONTENT

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
        <div className="relative aspect-video bg-muted">
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
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {post.category && (
              <span className="rounded-full bg-secondary px-2.5 py-1 font-bold text-secondary-foreground">
                {post.category}
              </span>
            )}
            {post.readingTime && (
              <span className="flex items-center gap-1">
                <span aria-hidden>⏱️</span>
                {post.readingTime}
              </span>
            )}
          </div>

          <h3 className="mt-2.5 text-lg font-bold leading-snug text-foreground line-clamp-3 sm:text-xl">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3 sm:text-[0.95rem]">
              {post.excerpt}
            </p>
          )}

          <div className="mt-auto border-t border-border pt-4">
            <p className="text-sm text-muted-foreground">{cardAuthor.th}</p>
            <p className="text-xs text-muted-foreground/80">{cardAuthor.en}</p>
          </div>
        </div>
      </Link>
    </article>
  )
}
