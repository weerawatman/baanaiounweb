import { z } from "zod"

export const blogSchema = z.object({
  title: z.string().min(1, "กรุณาระบุชื่อบทความ"),
  slug: z
    .string()
    .min(1, "กรุณาระบุ slug")
    .regex(/^[a-z0-9-]+$/, "slug ใช้ได้เฉพาะ a-z, 0-9, และขีด (-)"),
  category: z.string().default(""),
  category_slug: z.string().default(""),
  excerpt: z.string().default(""),
  content: z.string().default(""),
  reading_time: z.string().default(""),
  featured_image: z.string().default(""),
  published: z.boolean().default(false),
})

export type BlogFormValues = z.infer<typeof blogSchema>
