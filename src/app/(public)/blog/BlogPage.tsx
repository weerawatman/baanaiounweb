"use client"

import { useState } from "react"
import { type BlogPost } from "@/types"
import { BLOG_CATEGORIES } from "@/data/blog-posts"
import { BLOG_PAGE_CONTENT } from "@/content/blog"
import BlogCard from "@/components/blog/BlogCard"
import BlogHeroArticle from "@/components/blog/BlogHeroArticle"
import NewsletterBanner from "@/components/blog/NewsletterBanner"
import BlogCategoryFilter from "@/components/blog/BlogCategoryFilter"
import Breadcrumb from "@/components/layout/Breadcrumb"
import PageSection from "@/components/layout/PageSection"
import { FaqSection, type FaqItem } from "@/components/shared"
import { Search } from "lucide-react"

interface BlogPageProps {
  posts: BlogPost[]
  faqs: FaqItem[]
}

export default function BlogPage({ posts, faqs }: BlogPageProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { header, searchPlaceholder, faq } = BLOG_PAGE_CONTENT

  const filteredPosts = posts.filter((post) => {
    if (activeCategory !== "all" && post.categorySlug !== activeCategory) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      const haystack = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })

  const heroPost = filteredPosts[0]
  const gridPosts = filteredPosts.slice(1)
  const showComingSoon = posts.length === 0

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <Breadcrumb items={[{ label: "หน้าแรก", href: "/" }, { label: "บทความ | Blog" }]} />
      </div>

      <PageSection variant="default" className="pt-6 pb-10">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-primary sm:text-4xl">{header.titleTh}</h1>
          <p className="mt-1 text-xl font-medium text-muted-foreground sm:text-2xl">
            {header.titleEn}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/90">{header.subtitleTh}</p>
          <p className="mx-auto mt-1 max-w-2xl text-sm text-muted-foreground">{header.subtitleEn}</p>
        </header>

        <div
          className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
          data-testid="blog-filters"
        >
          <BlogCategoryFilter
            categories={BLOG_CATEGORIES}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
          <div className="relative w-full shrink-0 lg:max-w-[280px]">
            <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-full border border-border bg-card py-3 pr-4 pl-10 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>

        {heroPost && <BlogHeroArticle post={heroPost} />}

        {gridPosts.length > 0 && (
          <div className="mb-14 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {gridPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {!showComingSoon && filteredPosts.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            ไม่พบบทความที่ตรงกับการค้นหา | No articles match your search.
          </div>
        )}

        {showComingSoon && (
          <div className="mb-14 rounded-xl border-2 border-dashed border-border bg-muted/30 px-5 py-10 text-center">
            <p className="text-base font-medium text-muted-foreground">
              🚧 ยังไม่มีบทความใหม่ในระบบ ทีมงานบ้านไออุ่นกำลังเตรียมคอนเทนต์ดีๆ ติดตามได้เร็วๆ นี้ค่ะ
            </p>
            <p className="mt-2 text-sm text-muted-foreground/80">
              🚧 No new articles at the moment. Our team is preparing great content. Stay tuned!
            </p>
          </div>
        )}

        <NewsletterBanner />
      </PageSection>

      <FaqSection
        title={faq.title}
        subtitle={faq.subtitle}
        items={faqs}
        variant="boxed"
        layout="cards"
      />
    </>
  )
}
