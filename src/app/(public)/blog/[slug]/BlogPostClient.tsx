"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Clock, CalendarDays } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Breadcrumb from "@/components/layout/Breadcrumb"
import SectionTitle from "@/components/layout/SectionTitle"
import PropertyCard from "@/components/property/PropertyCard"
import ArticleCTA from "@/components/blog/ArticleCTA"
import { type BlogPost, type Property } from "@/types"

interface BlogPostClientProps {
  post: BlogPost | null
  relatedProperties: Property[]
  lineUrl?: string
}

export default function BlogPostClient({ post, relatedProperties, lineUrl }: BlogPostClientProps) {
  if (!post) {
    return (
      <main className="container mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-muted-foreground text-2xl font-semibold">ไม่พบบทความ</p>
        <Link href="/blog" className="text-primary mt-4 inline-block hover:underline">
          กลับไปหน้าบทความทั้งหมด
        </Link>
      </main>
    )
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""

  return (
    <main className="container mx-auto max-w-4xl space-y-10 px-4 py-10">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "หน้าแรก", href: "/" },
          { label: "บทความ", href: "/blog" },
          { label: post.title },
        ]}
      />

      {/* Article */}
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-6"
      >
        {/* Featured image */}
        {post.featuredImage && (
          <div className="relative h-64 overflow-hidden rounded-xl sm:h-80">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        {/* Meta row */}
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
              อ่าน {post.readingTime}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-foreground text-2xl leading-snug font-bold sm:text-3xl">
          {post.title}
        </h1>

        {/* Excerpt / lead */}
        {post.excerpt && (
          <p className="text-muted-foreground border-primary border-l-4 pl-4 text-base leading-relaxed italic">
            {post.excerpt}
          </p>
        )}

        {/* Body content (HTML from TipTap editor) */}
        {post.content ? (
          <div
            className="prose prose-sm sm:prose prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-primary prose-strong:text-foreground max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <p className="text-muted-foreground text-sm">—</p>
        )}
      </motion.article>

      {/* Related properties */}
      {relatedProperties.length > 0 && (
        <section className="space-y-6">
          <SectionTitle title="บ้านและคอนโดที่เกี่ยวข้อง" />
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
