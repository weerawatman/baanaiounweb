import { unstable_cache } from "next/cache"
import { publicClient } from "@/lib/supabase/public-client"
import { mapProfile } from "@/lib/mappers"
import { SITE_CONFIG } from "@/config/site"
import type { AgentProfile } from "@/lib/types/property"
import type { Profile } from "@/types"

function defaultProfile(): Profile {
  return {
    name: SITE_CONFIG.pim.name,
    fullName: SITE_CONFIG.pim.fullName,
    role: "นายหน้าอสังหาริมทรัพย์ บ้านบึง ชลบุรี",
    bio: SITE_CONFIG.pim.bio,
    vision: SITE_CONFIG.pim.vision,
    avatarUrl: SITE_CONFIG.pim.avatar,
    heroImageUrl: SITE_CONFIG.pim.heroImage,
    homeHeroImage: "",
    trustRenovationImage: "",
    trustNetworkImage: "",
    trustShopperImage: "",
    matchTeamImage: "",
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

function pick(dbValue: string | undefined, fallback: string): string {
  return dbValue && dbValue.trim() !== "" ? dbValue : fallback
}

export const getProfile = unstable_cache(
  async (): Promise<Profile> => {
    const fallback = defaultProfile()

    const { data, error } = await publicClient
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
      // รูปหน้าแรก: ค่าว่าง = ยังไม่อัปโหลด (UI แสดง placeholder/fallback เอง)
      homeHeroImage: row.homeHeroImage,
      trustRenovationImage: row.trustRenovationImage,
      trustNetworkImage: row.trustNetworkImage,
      trustShopperImage: row.trustShopperImage,
      matchTeamImage: row.matchTeamImage,
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
  },
  ["profile-v1"],
  { revalidate: 3600, tags: ["profile"] },
)
