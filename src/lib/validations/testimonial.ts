import { z } from "zod"

export const testimonialSchema = z.object({
  client_name: z.string().min(1, "กรุณาระบุชื่อลูกค้า"),
  quote: z.string().min(1, "กรุณาระบุคำรีวิว"),
  property_type: z.string().default(""),
  rating: z.coerce
    .number()
    .int()
    .min(1)
    .max(5)
    .default(5),
  avatar_url: z.string().default(""),
  published: z.boolean().default(true),
  sort_order: z.coerce.number().int().default(0),
})

export type TestimonialFormValues = z.infer<typeof testimonialSchema>
