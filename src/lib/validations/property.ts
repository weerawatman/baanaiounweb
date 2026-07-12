import { z } from "zod"
import { PROPERTY_CATEGORY_OPTIONS } from "@/content/form-options"

const propertyCategoryValues = PROPERTY_CATEGORY_OPTIONS.map((opt) => opt.value) as [
  "house",
  "townhome",
  "condo",
  "land",
]

export const propertySchema = z
  .object({
    title: z.string().min(1, "กรุณาระบุชื่อทรัพย์"),
    title_en: z.string().default(""),
    slug: z
      .string()
      .min(1, "กรุณาระบุ slug")
      .regex(/^[\p{L}\p{N}-]+$/u, "slug ใช้ได้เฉพาะตัวอักษร ตัวเลข และขีด (-)"),
    type: z.enum(["SALE", "RENT", "LAND"]),
    sub_type: z.preprocess(
      (v) => (v === "" || v == null ? undefined : v),
      z.enum(propertyCategoryValues).optional().nullable(),
    ),
    price: z.coerce.number().min(0, "ราคาต้องไม่ต่ำกว่า 0"),
    price_label: z.string().default(""),
    price_label_en: z.string().default(""),
    area_sqm: z.coerce.number().min(0).default(0),
    bedrooms: z.coerce.number().int().min(0).default(0),
    bathrooms: z.coerce.number().int().min(0).default(0),
    description: z.string().default(""),
    description_en: z.string().default(""),
    emotional_desc: z.string().default(""),
    emotional_desc_en: z.string().default(""),
    pim_insight: z.string().default(""),
    pim_insight_en: z.string().default(""),
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
  .superRefine((data, ctx) => {
    if (data.status !== "ACTIVE") return
    if (!data.title_en.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "กรุณาระบุชื่อทรัพย์ (English) ก่อนเผยแพร่",
        path: ["title_en"],
      })
    }
  })

export type PropertyFormValues = z.infer<typeof propertySchema>
