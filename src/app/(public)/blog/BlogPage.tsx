"use client"

import { useState } from "react"
import { type BlogPost } from "@/types"
import { BLOG_CATEGORIES } from "@/data/blog-posts"
import BlogCard from "@/components/blog/BlogCard"
import BlogCategoryFilter from "@/components/blog/BlogCategoryFilter"
import Breadcrumb from "@/components/layout/Breadcrumb"
import { Search } from "lucide-react"

interface BlogPageProps {
  posts: BlogPost[]
}

export default function BlogPage({ posts }: BlogPageProps) {
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

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumb items={[{ label: "หน้าแรก", href: "/" }, { label: "บทความ | Blog" }]} />

      <header className="mb-10 mt-6 text-center">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          บทความน่าอ่าน จากบ้านไออุ่น
          <span className="mt-2 block text-xl font-medium text-muted-foreground sm:text-2xl">
            Insightful Articles by Baan Ai Oun
          </span>
        </h1>
        <div className="mx-auto mt-4 flex items-center justify-center gap-2">
          <div className="h-0.5 w-8 rounded-full bg-primary/30" />
          <div className="h-1 w-12 rounded-full bg-primary" />
          <div className="h-0.5 w-8 rounded-full bg-primary/30" />
        </div>
      </header>

      <div
        className="mb-10 flex flex-col-reverse items-stretch justify-between gap-5 border-b border-border pb-6 sm:flex-row sm:items-center"
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
            placeholder="ค้นหาบทความ | Search articles..."
            className="w-full rounded-full border border-border bg-card py-2.5 pr-4 pl-10 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-border bg-card/50 px-6 py-12 text-center">
          <p className="text-base font-medium text-muted-foreground">
            ยังไม่มีบทความใหม่ในระบบ ทีมงานบ้านไออุ่นกำลังเตรียมคอนเทนต์ดีๆ ติดตามได้เร็วๆ นี้ค่ะ
          </p>
          <p className="mt-2 text-sm text-muted-foreground/80">
            No new articles at the moment. Our team is preparing great content. Stay tuned!
          </p>
        </div>
      ) : (
        <div className="py-16 text-center text-muted-foreground">
          ไม่พบบทความที่ตรงกับการค้นหา | No articles match your search.
        </div>
      )}
    </main>
  )
}
