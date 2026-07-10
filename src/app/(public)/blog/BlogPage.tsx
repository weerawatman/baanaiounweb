"use client"

import { useState } from "react"
import Image from "next/image"
import { type BlogPost } from "@/types"
import { BLOG_CATEGORIES } from "@/data/blog-posts"
import BlogCard from "@/components/blog/BlogCard"
import BlogCategoryFilter from "@/components/blog/BlogCategoryFilter"
import Breadcrumb from "@/components/layout/Breadcrumb"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface BlogPageProps {
  posts: BlogPost[]
  heroImage?: string
}

export default function BlogPage({ posts, heroImage }: BlogPageProps) {
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
            placeholder="ค้นหาบทความ... | Search articles..."
            className="w-full rounded-full border border-border bg-card py-2.5 pr-4 pl-10 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {filteredPosts.length > 0 && (
        <div className="mb-12 grid grid-cols-1 gap-[30px] sm:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post) => (
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
    </main>
  )
}
