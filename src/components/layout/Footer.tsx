import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import { SITE_CONFIG } from "@/config/site"
import { NAV_ITEMS } from "@/config/navigation"
import type { Profile } from "@/types"

export default function Footer({ profile }: { profile: Profile }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Column 1: Company Info + Nav */}
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-bold">{profile.siteName || SITE_CONFIG.name}</h2>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                {profile.slogan || SITE_CONFIG.slogan}
              </p>
            </div>
            <nav className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/80 hover:text-white transition-colors w-fit"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 2: Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold">ติดต่อเรา</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`tel:${profile.phone || SITE_CONFIG.phone}`}
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <Phone className="size-4 shrink-0" />
                  {profile.phone || SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${profile.email || SITE_CONFIG.email}`}
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <Mail className="size-4 shrink-0" />
                  {profile.email || SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/80">
                <MapPin className="size-4 shrink-0 mt-0.5" />
                {profile.address || SITE_CONFIG.address}
              </li>
              <li>
                <a
                  href={profile.lineUrl || SITE_CONFIG.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 hover:text-white transition-colors"
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
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <span className="size-4 flex items-center justify-center text-xs font-bold">LINE</span>
                  LINE Official
                </a>
              </li>
              <li>
                <a
                  href={profile.facebook || SITE_CONFIG.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <span className="size-4 flex items-center justify-center text-xs font-bold">FB</span>
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={profile.tiktok || SITE_CONFIG.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <span className="size-4 flex items-center justify-center text-xs font-bold">TT</span>
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href={profile.youtube || SITE_CONFIG.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <span className="size-4 flex items-center justify-center text-xs font-bold">YT</span>
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm text-white/60">
          © {currentYear} {profile.siteName || SITE_CONFIG.name} · {SITE_CONFIG.nameEn} · สงวนลิขสิทธิ์ทุกประการ
        </div>
      </div>
    </footer>
  )
}
