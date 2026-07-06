import { z } from "zod"

export const successStorySchema = z.object({
  title: z.string().min(1, "กรุณาระบุหัวข้อ (ไทย)"),
  title_en: z.string().default(""),
  description: z.string().default(""),
  description_en: z.string().default(""),
  location: z.string().default(""),
  before_image_url: z.string().min(1, "กรุณาระบุ URL รูปก่อนรีโนเวท"),
  after_image_url: z.string().min(1, "กรุณาระบุ URL รูปหลังรีโนเวท"),
  published: z.boolean().default(true),
  sort_order: z.coerce.number().int().default(0),
})

export type SuccessStoryFormValues = z.infer<typeof successStorySchema>
