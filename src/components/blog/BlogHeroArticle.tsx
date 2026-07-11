import Link from "next/link"
import Image from "next/image"
import { type BlogPost } from "@/types"
import { Clock } from "lucide-react"

interface BlogHeroArticleProps {
  post: BlogPost
}

export default function BlogHeroArticle({ post }: BlogHeroArticleProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group mb-12 grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md lg:grid-cols-[1fr_1.1fr]"
      data-testid="blog-hero-article"
    >
      <div className="relative min-h-[220px] bg-muted lg:min-h-[320px]">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            priority
          />
        ) : null}
      </div>
      <div className="flex flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {post.category && (
            <span className="rounded bg-primary/10 px-2.5 py-1 font-bold text-primary">
              {post.category}
            </span>
          )}
          {post.readingTime && (
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="size-3.5" aria-hidden />
              {post.readingTime}
            </span>
          )}
        </div>
        <h2 className="mt-4 text-xl font-bold leading-snug text-foreground group-hover:text-primary sm:text-2xl">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-4 sm:text-base">
            {post.excerpt}
          </p>
        )}
        <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            BA
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              แบ่งปันประสบการณ์โดย: ทีมนักลงทุนบ้านไออุ่น
            </p>
            <p className="text-xs text-muted-foreground">
              Shared by the Baan Ai Oun investor team
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
