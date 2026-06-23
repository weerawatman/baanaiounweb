"use client"

import { useState } from "react"
import { type BlogPost } from "@/types"
import { BLOG_CATEGORIES } from "@/data/blog-posts"
import BlogCard from "@/components/blog/BlogCard"
import BlogCategoryFilter from "@/components/blog/BlogCategoryFilter"
import Breadcrumb from "@/components/layout/Breadcrumb"
import SectionTitle from "@/components/layout/SectionTitle"

interface BlogPageProps {
  posts: BlogPost[]
}

export default function BlogPage({ posts }: BlogPageProps) {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter((post) => post.categorySlug === activeCategory)

  return (
    <>
      <title>บทความ — บ้านไออุ่น พร็อพเพอร์ตี้</title>
      <meta name="description" content="บทความน่าอ่านจากบ้านไออุ่น เรื่องกู้บ้าน วางแผนการเงิน เจาะลึกทำเล และเทคนิคชีวิตคนไกลบ้าน" />
      <meta property="og:title" content="บทความ — บ้านไออุ่น พร็อพเพอร์ตี้" />
      <meta property="og:description" content="บทความน่าอ่านจากบ้านไออุ่น เรื่องกู้บ้าน วางแผนการเงิน เจาะลึกทำเล และเทคนิคชีวิตคนไกลบ้าน" />
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
            {posts.length === 0
              ? "ยังไม่มีบทความในระบบ ติดตามได้เร็วๆ นี้ค่ะ"
              : "ไม่มีบทความในหมวดหมู่นี้"}
          </div>
        )}
      </main>
    </>
  )
}
