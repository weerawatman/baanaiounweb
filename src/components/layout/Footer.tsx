import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import { SITE_CONFIG } from "@/config/site"
import type { Profile } from "@/types"

export default function Footer({ profile }: { profile: Profile }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Column 1: Company Info */}
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">{profile.siteName || SITE_CONFIG.name}</h2>
            <p className="text-sm leading-relaxed text-white/70">
              {profile.slogan || SITE_CONFIG.slogan}
            </p>
          </div>

          {/* Column 2: Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold">ติดต่อเรา</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`tel:${profile.phone || SITE_CONFIG.phone}`}
                  className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
                >
                  <Phone className="size-4 shrink-0" />
                  {profile.phone || SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${profile.email || SITE_CONFIG.email}`}
                  className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
                >
                  <Mail className="size-4 shrink-0" />
                  {profile.email || SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/80">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                {profile.address || SITE_CONFIG.address}
              </li>
              <li>
                <a
                  href={profile.lineUrl || SITE_CONFIG.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  LINE: {profile.lineId || SITE_CONFIG.lineId}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold">ติดตามเรา</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={profile.lineUrl || SITE_CONFIG.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
                >
                  <span className="flex size-4 items-center justify-center text-xs font-bold">
                    LINE
                  </span>
                  LINE Official
                </a>
              </li>
              <li>
                <a
                  href={profile.facebook || SITE_CONFIG.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
                >
                  <span className="flex size-4 items-center justify-center text-xs font-bold">
                    FB
                  </span>
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={profile.tiktok || SITE_CONFIG.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
                >
                  <span className="flex size-4 items-center justify-center text-xs font-bold">
                    TT
                  </span>
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href={profile.youtube || SITE_CONFIG.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
                >
                  <span className="flex size-4 items-center justify-center text-xs font-bold">
                    YT
                  </span>
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* เมนูเสริม + Copyright */}
        <div className="mt-6 flex flex-col items-center gap-2 border-t border-white/20 pt-4 text-center text-sm text-white/60">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              นโยบายความเป็นส่วนตัว
            </Link>
            <span className="text-white/30">·</span>
            <Link href="/blog" className="transition-colors hover:text-white">
              บทความอสังหาฯ
            </Link>
          </div>
          <p>
            © {currentYear} {profile.siteName || SITE_CONFIG.name} · {SITE_CONFIG.nameEn} ·
            สงวนลิขสิทธิ์ทุกประการ
          </p>
        </div>
      </div>
    </footer>
  )
}
