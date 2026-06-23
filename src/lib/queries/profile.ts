import { createClient } from "@/lib/supabase/server"
import { mapProfile } from "@/lib/mappers"
import { SITE_CONFIG } from "@/config/site"
import type { AgentProfile } from "@/lib/types/property"
import type { Profile } from "@/types"

/**
 * ค่า profile เริ่มต้นจาก SITE_CONFIG (ใช้ตอน DB ยังไม่มี row หรือ field ว่าง)
 */
function defaultProfile(): Profile {
  return {
    name: SITE_CONFIG.pim.name,
    fullName: SITE_CONFIG.pim.fullName,
    role: "นายหน้าอสังหาริมทรัพย์ บ้านบึง ชลบุรี",
    bio: SITE_CONFIG.pim.bio,
    vision: SITE_CONFIG.pim.vision,
    avatarUrl: SITE_CONFIG.pim.avatar,
    heroImageUrl: SITE_CONFIG.pim.heroImage,
    phone: SITE_CONFIG.phone,
    lineId: SITE_CONFIG.lineId,
    lineUrl: SITE_CONFIG.lineUrl,
    email: SITE_CONFIG.email,
    facebook: SITE_CONFIG.facebook,
    tiktok: SITE_CONFIG.tiktok,
    youtube: SITE_CONFIG.youtube,
    siteName: SITE_CONFIG.name,
    slogan: SITE_CONFIG.slogan,
    address: SITE_CONFIG.address,
  }
}

/** คืนค่า field จาก DB ถ้าไม่ว่าง มิฉะนั้นใช้ค่า default จาก SITE_CONFIG */
function pick(dbValue: string | undefined, fallback: string): string {
  return dbValue && dbValue.trim() !== "" ? dbValue : fallback
}

/**
 * อ่าน agent profile จาก Supabase (row id=1) แล้ว merge ทับค่า default
 * — ค่าว่างใน DB จะ fall back ไป SITE_CONFIG เสมอ จึงไม่พังแม้ยังไม่ได้กรอก
 */
export async function getProfile(): Promise<Profile> {
  const fallback = defaultProfile()

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("agent_profile")
    .select("*")
    .eq("id", 1)
    .maybeSingle()

  if (error || !data) return fallback

  const row = mapProfile(data as AgentProfile)

  return {
    name: pick(row.name, fallback.name),
    fullName: pick(row.fullName, fallback.fullName),
    role: pick(row.role, fallback.role),
    bio: pick(row.bio, fallback.bio),
    vision: pick(row.vision, fallback.vision),
    avatarUrl: pick(row.avatarUrl, fallback.avatarUrl),
    heroImageUrl: pick(row.heroImageUrl, fallback.heroImageUrl),
    phone: pick(row.phone, fallback.phone),
    lineId: pick(row.lineId, fallback.lineId),
    lineUrl: pick(row.lineUrl, fallback.lineUrl),
    email: pick(row.email, fallback.email),
    facebook: pick(row.facebook, fallback.facebook),
    tiktok: pick(row.tiktok, fallback.tiktok),
    youtube: pick(row.youtube, fallback.youtube),
    siteName: pick(row.siteName, fallback.siteName),
    slogan: pick(row.slogan, fallback.slogan),
    address: pick(row.address, fallback.address),
  }
}
