"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type BlogPost } from "@/types"

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full group">
        <Card className="h-full overflow-hidden transition-shadow duration-300 group-hover:shadow-xl group-hover:ring-foreground/20">
          {/* Featured image */}
          <div className="relative overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <CardContent className="flex flex-col gap-3 pt-4">
            {/* Category badge */}
            <Badge variant="secondary" className="w-fit">
              {post.category}
            </Badge>

            {/* Title */}
            <h3 className="font-semibold text-sm leading-snug line-clamp-2 text-foreground">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>

            {/* Reading time */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-auto pt-1">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              <span>อ่าน {post.readingTime}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
