import Link from "next/link"
import Image from "next/image"
import { type BlogPost } from "@/types"
import { BLOG_PAGE_CONTENT } from "@/content/blog"

interface BlogHeroArticleProps {
  post: BlogPost
}

export default function BlogHeroArticle({ post }: BlogHeroArticleProps) {
  const { heroAuthor } = BLOG_PAGE_CONTENT

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group mb-14 grid overflow-hidden rounded-[20px] border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:grid-cols-[1.2fr_1fr]"
      data-testid="blog-hero-article"
    >
      <div className="relative min-h-[250px] bg-muted lg:min-h-[400px]">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            priority
          />
        ) : null}
      </div>
      <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          {post.category && (
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
              {post.category}
            </span>
          )}
          {post.readingTime && (
            <span className="flex items-center gap-1">
              <span aria-hidden>⏱️</span>
              ใช้เวลาอ่าน {post.readingTime}
            </span>
          )}
        </div>
        <h2 className="mt-4 text-2xl font-bold leading-snug text-primary sm:text-3xl lg:text-[2.2rem] lg:leading-tight">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="mt-4 flex-1 text-base leading-relaxed text-muted-foreground line-clamp-4">
            {post.excerpt}
          </p>
        )}
        <div className="mt-auto flex items-center gap-4 border-t border-border pt-5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
            BA
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{heroAuthor.bylineTh}</p>
            <p className="text-xs font-medium text-muted-foreground">{heroAuthor.bylineEn}</p>
            <p className="mt-1 text-xs font-bold text-[#16a34a]">{heroAuthor.verifiedTh}</p>
            <p className="text-[0.7rem] font-medium text-[#16a34a]/80">{heroAuthor.verifiedEn}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
