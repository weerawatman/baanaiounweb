import { z } from "zod"

export const propertySchema = z.object({
  title: z.string().min(1, "กรุณาระบุชื่อทรัพย์"),
  slug: z
    .string()
    .min(1, "กรุณาระบุ slug")
    .regex(/^[a-z0-9-]+$/, "slug ใช้ได้เฉพาะ a-z, 0-9, และขีด (-)"),
  type: z.enum(["SALE", "RENT", "LAND"]),
  sub_type: z.preprocess(
    (v) => (v === "" || v == null ? undefined : v),
    z.enum(["new", "renovated", "townhome", "residential", "investment"]).optional().nullable(),
  ),
  price: z.coerce.number().min(0, "ราคาต้องไม่ต่ำกว่า 0"),
  price_label: z.string().min(1, "กรุณาระบุข้อความแสดงราคา"),
  area_sqm: z.coerce.number().min(0).default(0),
  bedrooms: z.coerce.number().int().min(0).default(0),
  bathrooms: z.coerce.number().int().min(0).default(0),
  description: z.string().default(""),
  emotional_desc: z.string().default(""),
  pim_insight: z.string().default(""),
  status: z.enum(["ACTIVE", "SOLD", "RENTED"]).default("ACTIVE"),
  featured: z.boolean().default(false),
  images: z.array(z.string()).default([]),
  image_primary: z.string().default(""),
  district: z.string().default(""),
  subdistrict: z.string().default(""),
  lat: z.preprocess(
    (v) => (v === "" || v == null ? null : v),
    z.coerce.number().optional().nullable(),
  ),
  lng: z.preprocess(
    (v) => (v === "" || v == null ? null : v),
    z.coerce.number().optional().nullable(),
  ),
  distance_amata: z.string().default(""),
  distance_hospital: z.string().default(""),
  distance_market: z.string().default(""),
  nearest_estate: z.string().default(""),
  amenities: z.array(z.string()).default([]),
  video_url: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
})

export type PropertyFormValues = z.infer<typeof propertySchema>
