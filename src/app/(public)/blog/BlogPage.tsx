"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { type BlogPost } from "@/types"
import { BLOG_CATEGORIES } from "@/data/blog-posts"
import BlogCard from "@/components/blog/BlogCard"
import BlogHeroArticle from "@/components/blog/BlogHeroArticle"
import NewsletterBanner from "@/components/blog/NewsletterBanner"
import BlogCategoryFilter from "@/components/blog/BlogCategoryFilter"
import Breadcrumb from "@/components/layout/Breadcrumb"
import { FaqSection, type FaqItem } from "@/components/shared"
import { Search } from "lucide-react"

interface BlogPageProps {
  posts: BlogPost[]
  faqs: FaqItem[]
  heroImage?: string
}

export default function BlogPage({ posts, faqs, heroImage }: BlogPageProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

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
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumb items={[{ label: "หน้าแรก", href: "/" }, { label: "บทความ | Blog" }]} />

      <header
        className={cn(
          "mb-10 mt-5 rounded-2xl py-10 text-center",
          heroImage && "relative isolate overflow-hidden px-4",
        )}
      >
        {heroImage && (
          <>
            <Image
              src={heroImage}
              alt=""
              aria-hidden
              fill
              priority
              sizes="100vw"
              className="-z-20 object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#1B4D3E]/85 to-[#0d2820]/90" />
          </>
        )}
        <h1
          className={cn(
            "text-[2.2rem] font-bold leading-tight",
            heroImage ? "text-white" : "text-foreground",
          )}
        >
          บทความน่าอ่าน จากบ้านไออุ่น
        </h1>
        <p
          className={cn(
            "mt-2 text-xl font-medium",
            heroImage ? "text-white/80" : "text-muted-foreground",
          )}
        >
          Insightful Articles by Baan Ai Oun
        </p>
        <p
          className={cn(
            "mx-auto mt-3 max-w-2xl text-sm",
            heroImage ? "text-white/75" : "text-muted-foreground",
          )}
        >
          คลังความรู้ เคล็ดลับ และเคสรีโนเวทจริง เพื่อให้คุณลงทุนและซื้อขายอสังหาฯ ได้อย่างมั่นใจ
        </p>
        <div className="mx-auto mt-4 h-1 w-[60px] rounded-sm bg-primary" />
      </header>

      <div
        className="mb-10 flex flex-col-reverse items-stretch justify-between gap-5 border-b border-border pb-5 sm:flex-row sm:items-center"
        data-testid="blog-filters"
      >
        <BlogCategoryFilter
          categories={BLOG_CATEGORIES}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาบทความ ความรู้ ทำเล... | Search..."
            className="w-full rounded-full border border-border bg-card py-2.5 pr-4 pl-10 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {heroPost && <BlogHeroArticle post={heroPost} />}

      {gridPosts.length > 0 && (
        <div className="mb-12 grid grid-cols-1 gap-[30px] sm:grid-cols-2 xl:grid-cols-3">
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
        <div className="mt-5 rounded-xl border-2 border-dashed border-border bg-card/70 px-5 py-10 text-center">
          <p className="text-base font-medium text-muted-foreground">
            🚧 ยังไม่มีบทความใหม่ในระบบ ทีมงานบ้านไออุ่นกำลังเตรียมคอนเทนต์ดีๆ ติดตามได้เร็วๆ นี้ค่ะ
          </p>
          <p className="mt-2 text-sm text-muted-foreground/80">
            🚧 No new articles at the moment. Our team is preparing great content. Stay tuned!
          </p>
        </div>
      )}

      <NewsletterBanner />

      <FaqSection
        title="อสังหาฯ 101 (Real Estate 101) | FAQ"
        subtitle={'คำว่า "101" หมายถึงความรู้พื้นฐานสำหรับผู้เริ่มต้น | "101" means beginner-friendly fundamentals.'}
        items={faqs}
      />
    </main>
  )
}
