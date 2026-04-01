"use client"

import { useState } from "react"
import { MOCK_BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/mock-data"
import BlogCard from "@/components/blog/BlogCard"
import BlogCategoryFilter from "@/components/blog/BlogCategoryFilter"
import Breadcrumb from "@/components/layout/Breadcrumb"
import SectionTitle from "@/components/layout/SectionTitle"

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredPosts =
    activeCategory === "all"
      ? MOCK_BLOG_POSTS
      : MOCK_BLOG_POSTS.filter((post) => post.categorySlug === activeCategory)

  return (
    <>
      <title>บทความ — บ้านไออุ่น</title>
      <main className="container mx-auto max-w-6xl px-4 py-10 space-y-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "หน้าแรก", href: "/" },
            { label: "บทความ" },
          ]}
        />

        {/* Section title */}
        <SectionTitle title="บทความน่าอ่าน จากบ้านไออุ่น" />

        {/* Category filter */}
        <BlogCategoryFilter
          categories={BLOG_CATEGORIES}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        {/* Blog grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-muted-foreground">
            ไม่มีบทความในหมวดหมู่นี้
          </div>
        )}
      </main>
    </>
  )
}
