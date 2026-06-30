import Link from "next/link"
import Image from "next/image"
import { Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type BlogPost } from "@/types"

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="h-full transition-transform duration-200 hover:scale-[1.02]">
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <Card className="group-hover:ring-foreground/20 h-full overflow-hidden transition-shadow duration-300 group-hover:shadow-xl">
          {/* Featured image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <CardContent className="flex flex-col gap-3 pt-4">
            {/* Category badge */}
            <Badge variant="secondary" className="w-fit">
              {post.category}
            </Badge>

            {/* Title */}
            <h3 className="text-foreground line-clamp-2 text-sm leading-snug font-semibold">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-muted-foreground line-clamp-3 text-xs leading-relaxed">
              {post.excerpt}
            </p>

            {/* Reading time */}
            <div className="text-muted-foreground mt-auto flex items-center gap-1.5 pt-1 text-xs">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              <span>อ่าน {post.readingTime}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}
