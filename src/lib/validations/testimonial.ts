import { z } from "zod"

export const testimonialSchema = z
  .object({
    client_name: z.string().min(1, "กรุณาระบุชื่อลูกค้า"),
    quote: z.string().min(1, "กรุณาระบุคำรีวิว"),
    quote_en: z.string().default(""),
    property_type: z.string().default(""),
    rating: z.coerce.number().int().min(1).max(5).default(5),
    avatar_url: z.string().default(""),
    published: z.boolean().default(true),
    sort_order: z.coerce.number().int().default(0),
  })
  .superRefine((data, ctx) => {
    if (!data.published) return
    if (!data.quote_en.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "กรุณาระบุคำรีวิว (English) ก่อนเผยแพร่",
        path: ["quote_en"],
      })
    }
  })

export type TestimonialFormValues = z.infer<typeof testimonialSchema>
