"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { type BlogPost } from "@/types"
import { BLOG_CATEGORIES } from "@/data/blog-posts"
import BlogCard from "@/components/blog/BlogCard"
import BlogCategoryFilter from "@/components/blog/BlogCategoryFilter"
import Breadcrumb from "@/components/layout/Breadcrumb"
import SectionTitle from "@/components/layout/SectionTitle"
import { Search, Calendar, Tag } from "lucide-react"

interface BlogPageProps {
  posts: BlogPost[]
}

export default function BlogPage({ posts }: BlogPageProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const featured = posts[0] ?? null

  const filteredPosts = posts
    .filter((_, i) => i > 0)
    .filter((post) => {
      if (activeCategory !== "all" && post.categorySlug !== activeCategory) return false
      if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
      return true
    })

  return (
    <main className="container mx-auto max-w-6xl space-y-8 px-4 py-10">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: "หน้าแรก", href: "/" }, { label: "บทความ" }]} />

      {/* Section title */}
      <SectionTitle title="บทความน่าอ่าน จากบ้านไออุ่น" />

      {/* Featured Post */}
      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group relative block overflow-hidden rounded-2xl shadow-md"
        >
          {featured.featuredImage ? (
            <div className="relative aspect-video w-full">
              <Image
                src={featured.featuredImage}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
          ) : (
            <div className="relative aspect-video w-full bg-gradient-to-br from-[#1B4D3E] to-[#0d2820]" />
          )}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            {featured.categorySlug && (
              <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-0.5 text-xs font-medium backdrop-blur-sm">
                <Tag className="size-3" />
                {featured.categorySlug}
              </span>
            )}
            <h2 className="text-xl font-bold leading-snug sm:text-2xl">{featured.title}</h2>
            {featured.excerpt && (
              <p className="mt-1 line-clamp-2 text-sm text-white/80">{featured.excerpt}</p>
            )}
            {featured.publishedAt && (
              <p className="mt-2 flex items-center gap-1 text-xs text-white/60">
                <Calendar className="size-3" />
                {new Date(featured.publishedAt).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>
        </Link>
      )}

      {/* Search + Category filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" data-testid="blog-filters">
        <BlogCategoryFilter
          categories={BLOG_CATEGORIES}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาบทความ | Search articles"
            className="w-full rounded-lg border border-gray-200 py-2 pr-4 pl-9 text-sm focus:border-[#1B4D3E] focus:outline-none"
          />
        </div>
      </div>

      {/* Blog grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground py-16 text-center">
          {posts.length === 0
            ? "ยังไม่มีบทความในระบบ ติดตามได้เร็วๆ นี้ค่ะ"
            : "ไม่พบบทความที่ตรงกับการค้นหา"}
        </div>
      )}
    </main>
  )
}
