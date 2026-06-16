import { z } from "zod"

export const faqSchema = z.object({
  question: z.string().min(1, "กรุณาระบุคำถาม"),
  answer: z.string().min(1, "กรุณาระบุคำตอบ"),
  page_slug: z.string().default("home"),
  sort_order: z.coerce.number().int().default(0),
})

export type FaqFormValues = z.infer<typeof faqSchema>
