import type { Locale } from "@/i18n/routing"
import { pickLocalized } from "./pick-localized"

const LABELS = {
  quickLinks: { th: "เมนูลัด", en: "Quick Links" },
  contact: { th: "ติดต่อเรา", en: "Contact Us" },
  follow: { th: "ติดตามเรา", en: "Follow Us" },
  popularSearches: { th: "ค้นหาทำเลยอดฮิต", en: "Popular Searches" },
  privacy: { th: "นโยบายความเป็นส่วนตัว", en: "Privacy Policy" },
  rights: { th: "สงวนลิขสิทธิ์ทุกประการ", en: "All rights reserved" },
  tel: { th: "โทร", en: "Tel" },
  lineOa: { th: "LINE OA", en: "LINE OA" },
  linePersonal: { th: "LINE ส่วนตัว", en: "Personal LINE" },
  email: { th: "Email", en: "Email" },
  office: { th: "สำนักงาน", en: "Office" },
  fbFanpage: { th: "FB Fanpage", en: "FB Fanpage" },
  fbPersonal: { th: "FB ส่วนตัว", en: "Personal FB" },
  instagram: { th: "Instagram (IG)", en: "Instagram (IG)" },
  tiktok: { th: "TikTok", en: "TikTok" },
  youtube: { th: "YouTube", en: "YouTube" },
} as const

export function footerLabel(locale: Locale, key: keyof typeof LABELS): string {
  return pickLocalized(locale, LABELS[key])
}
