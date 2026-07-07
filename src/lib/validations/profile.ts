import { z } from "zod"

export const profileSchema = z.object({
  name: z.string().default(""),
  full_name: z.string().min(1, "กรุณาระบุชื่อเต็ม"),
  role: z.string().default(""),
  bio: z.string().default(""),
  vision: z.string().default(""),
  avatar_url: z.string().default(""),
  hero_image_url: z.string().default(""),
  home_hero_image: z.string().default(""),
  trust_renovation_image: z.string().default(""),
  trust_network_image: z.string().default(""),
  trust_shopper_image: z.string().default(""),
  match_team_image: z.string().default(""),
  phone: z.string().default(""),
  line_id: z.string().default(""),
  line_url: z.string().default(""),
  email: z.string().default(""),
  facebook: z.string().default(""),
  tiktok: z.string().default(""),
  youtube: z.string().default(""),
  site_name: z.string().min(1, "กรุณาระบุชื่อเว็บไซต์"),
  slogan: z.string().default(""),
  address: z.string().default(""),
})

export type ProfileFormValues = z.infer<typeof profileSchema>
