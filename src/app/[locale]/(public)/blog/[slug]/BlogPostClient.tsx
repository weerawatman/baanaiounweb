"use client"

import { useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Clock, CalendarDays } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Breadcrumb from "@/components/layout/Breadcrumb"
import SectionTitle from "@/components/layout/SectionTitle"
import PropertyCard from "@/components/property/PropertyCard"
import ArticleCTA from "@/components/blog/ArticleCTA"
import { type BlogPost, type Property } from "@/types"
import type { Locale } from "@/i18n/routing"
import { homeCrumb, localizedCrumb } from "@/lib/i18n/breadcrumbs"
import { localizedOrFallback, pickLocalized } from "@/lib/i18n/pick-localized"

interface BlogPostClientProps {
  post: BlogPost | null
  relatedProperties: Property[]
  lineUrl?: string
}

const BLOG_CRUMB = { th: "บทความ", en: "Blog" } as const
const NOT_FOUND = { th: "ไม่พบบทความ", en: "Article not found" } as const
const BACK_TO_BLOG = { th: "กลับไปหน้าบทความทั้งหมด", en: "Back to all articles" } as const
const RELATED_TITLE = { th: "บ้านและคอนโดที่เกี่ยวข้อง", en: "Related properties" } as const
const READ_TIME = { th: "อ่าน", en: "Read" } as const

export default function BlogPostClient({ post, relatedProperties, lineUrl }: BlogPostClientProps) {
  const locale = useLocale() as Locale

  if (!post) {
    return (
      <main className="container mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-muted-foreground text-2xl font-semibold">
          {pickLocalized(locale, NOT_FOUND)}
        </p>
        <Link href="/blog" className="text-primary mt-4 inline-block hover:underline">
          {pickLocalized(locale, BACK_TO_BLOG)}
        </Link>
      </main>
    )
  }

  const title = localizedOrFallback(locale, post.title, post.titleEn)
  const excerpt = localizedOrFallback(locale, post.excerpt, post.excerptEn)
  const content = localizedOrFallback(locale, post.content, post.contentEn)

  const dateLocale = locale === "en" ? "en-US" : "th-TH"
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(dateLocale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""

  return (
    <main className="container mx-auto max-w-4xl space-y-10 px-4 py-10">
      <Breadcrumb
        items={[
          homeCrumb(locale),
          localizedCrumb(locale, BLOG_CRUMB, "/blog"),
          { label: title },
        ]}
      />

      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-6"
      >
        {post.featuredImage && (
          <div className="relative h-64 overflow-hidden rounded-xl sm:h-80">
            <Image
              src={post.featuredImage}
              alt={title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          {post.category && <Badge variant="secondary">{post.category}</Badge>}
          {formattedDate && (
            <span className="text-muted-foreground flex items-center gap-1.5 text-sm">
              <CalendarDays className="h-4 w-4 shrink-0" />
              {formattedDate}
            </span>
          )}
          {post.readingTime && (
            <span className="text-muted-foreground flex items-center gap-1.5 text-sm">
              <Clock className="h-4 w-4 shrink-0" />
              {pickLocalized(locale, READ_TIME)} {post.readingTime}
            </span>
          )}
        </div>

        <h1 className="text-foreground text-2xl leading-snug font-bold sm:text-3xl">{title}</h1>

        {excerpt && (
          <p className="text-muted-foreground border-primary border-l-4 pl-4 text-base leading-relaxed italic">
            {excerpt}
          </p>
        )}

        {content ? (
          <div
            className="prose prose-sm sm:prose prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-primary prose-strong:text-foreground max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <p className="text-muted-foreground text-sm">—</p>
        )}
      </motion.article>

      {relatedProperties.length > 0 && (
        <section className="space-y-6">
          <SectionTitle title={pickLocalized(locale, RELATED_TITLE)} />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>
      )}

      <ArticleCTA lineUrl={lineUrl} />
    </main>
  )
}
