import { z } from "zod"

export const blogSchema = z
  .object({
    title: z.string().min(1, "กรุณาระบุชื่อบทความ"),
    title_en: z.string().default(""),
    slug: z
      .string()
      .min(1, "กรุณาระบุ slug")
      .regex(/^[a-z0-9-]+$/, "slug ใช้ได้เฉพาะ a-z, 0-9, และขีด (-)"),
    category: z.string().default(""),
    category_slug: z.string().default(""),
    excerpt: z.string().default(""),
    excerpt_en: z.string().default(""),
    content: z.string().default(""),
    content_en: z.string().default(""),
    reading_time: z.string().default(""),
    featured_image: z.string().default(""),
    published: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (!data.published) return
    if (!data.title_en.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "กรุณาระบุชื่อบทความ (English) ก่อนเผยแพร่",
        path: ["title_en"],
      })
    }
    if (!data.excerpt_en.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "กรุณาระบุคำย่อ (English) ก่อนเผยแพร่",
        path: ["excerpt_en"],
      })
    }
    if (!data.content_en.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "กรุณาระบุเนื้อหา (English) ก่อนเผยแพร่",
        path: ["content_en"],
      })
    }
  })

export type BlogFormValues = z.infer<typeof blogSchema>
