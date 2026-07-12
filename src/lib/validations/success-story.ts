import { z } from "zod"

export const successStorySchema = z
  .object({
    title: z.string().min(1, "กรุณาระบุหัวข้อ (ไทย)"),
    title_en: z.string().default(""),
    description: z.string().default(""),
    description_en: z.string().default(""),
    location: z.string().default(""),
    before_image_url: z.string().min(1, "กรุณาอัปโหลดรูปก่อนรีโนเวท"),
    after_image_url: z.string().min(1, "กรุณาอัปโหลดรูปหลังรีโนเวท"),
    published: z.boolean().default(true),
    sort_order: z.coerce.number().int().default(0),
  })
  .superRefine((data, ctx) => {
    if (!data.published) return
    if (!data.title_en.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "กรุณาระบุหัวข้อ (English) ก่อนเผยแพร่",
        path: ["title_en"],
      })
    }
    if (!data.description_en.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "กรุณาระบุคำอธิบาย (English) ก่อนเผยแพร่",
        path: ["description_en"],
      })
    }
  })

export type SuccessStoryFormValues = z.infer<typeof successStorySchema>
