import Link from "next/link"
import { SITE_CONFIG } from "@/config/site"
import { FOOTER_QUICK_LINKS, FOOTER_SEO_TAGS } from "@/config/navigation"
import type { Profile } from "@/types"

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-bold text-secondary">{children}</h3>
}

function FooterList({ children }: { children: React.ReactNode }) {
  return <ul className="flex flex-col gap-1.5">{children}</ul>
}

function FooterRow({
  icon,
  children,
  href,
}: {
  icon: React.ReactNode
  children: React.ReactNode
  href?: string
}) {
  const className =
    "flex items-start gap-1.5 text-xs leading-snug text-white/80 transition-colors hover:text-white sm:text-sm"
  if (href) {
    return (
      <li>
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          <span className="shrink-0" aria-hidden>
            {icon}
          </span>
          <span>{children}</span>
        </a>
      </li>
    )
  }
  return (
    <li className={className}>
      <span className="shrink-0" aria-hidden>
        {icon}
      </span>
      <span>{children}</span>
    </li>
  )
}

export default function Footer({ profile }: { profile: Profile }) {
  const currentYear = new Date().getFullYear()
  const siteName = profile.siteName || SITE_CONFIG.name
  const rawSlogan = profile.slogan || SITE_CONFIG.slogan
  const slogan = rawSlogan.replace(/^บ้านไออุ่น:\s*/, "")
  const phone = profile.phone || SITE_CONFIG.phone
  const lineId = profile.lineId || SITE_CONFIG.lineId
  const lineUrl = profile.lineUrl || SITE_CONFIG.lineUrl
  const email = profile.email || SITE_CONFIG.email
  const address = profile.address || SITE_CONFIG.address
  const facebook = profile.facebook || SITE_CONFIG.facebook
  const facebookPersonal = SITE_CONFIG.facebookPersonal
  const linePersonalId = SITE_CONFIG.linePersonalId

  return (
    <footer className="border-t-4 border-secondary bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* บริษัท */}
          <div className="flex flex-col gap-1.5">
            <FooterHeading>{siteName}</FooterHeading>
            <p className="text-xs leading-snug text-white/75 sm:text-sm">{slogan}</p>
          </div>

          {/* เมนูลัด */}
          <div className="flex flex-col gap-2">
            <FooterHeading>เมนูลัด</FooterHeading>
            <FooterList>
              {FOOTER_QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-white/80 transition-colors hover:text-white sm:text-sm"
                  >
                    - {item.th}
                  </Link>
                </li>
              ))}
            </FooterList>
          </div>

          {/* ติดต่อเรา */}
          <div className="flex flex-col gap-2">
            <FooterHeading>ติดต่อเรา</FooterHeading>
            <FooterList>
              <FooterRow icon="📞" href={`tel:${phone}`}>
                โทร (Tel): {phone}
              </FooterRow>
              <FooterRow icon="🟢" href={lineUrl}>
                LINE OA: {lineId}
              </FooterRow>
              {linePersonalId ? (
                <FooterRow icon="💬">LINE ส่วนตัว: {linePersonalId}</FooterRow>
              ) : null}
              <FooterRow icon="✉️" href={`mailto:${email}`}>
                Email: {email}
              </FooterRow>
              <FooterRow icon="📍">สำนักงาน: {address}</FooterRow>
            </FooterList>
          </div>

          {/* ติดตามเรา */}
          <div className="flex flex-col gap-2">
            <FooterHeading>ติดตามเรา</FooterHeading>
            <FooterList>
              <FooterRow icon="🟦" href={facebook}>
                FB Fanpage: {siteName}
              </FooterRow>
              {facebookPersonal ? (
                <FooterRow icon="👤" href={facebookPersonal}>
                  FB ส่วนตัว: {SITE_CONFIG.facebookPersonalLabel}
                </FooterRow>
              ) : null}
              <FooterRow icon="📸" href={SITE_CONFIG.instagram}>
                Instagram (IG): {SITE_CONFIG.instagramHandle}
              </FooterRow>
              <FooterRow icon="🎵" href={profile.tiktok || SITE_CONFIG.tiktok}>
                TikTok: {SITE_CONFIG.tiktokHandle}
              </FooterRow>
              <FooterRow icon="📺" href={profile.youtube || SITE_CONFIG.youtube}>
                YouTube: {SITE_CONFIG.youtubeLabel}
              </FooterRow>
            </FooterList>
          </div>
        </div>

        {/* ค้นหาทำเลยอดฮิต */}
        <div className="mt-5 border-t border-white/15 pt-4 text-center">
          <p className="mb-2 text-xs text-white/60">ค้นหาทำเลยอดฮิต</p>
          <div className="flex flex-wrap justify-center gap-2">
            {FOOTER_SEO_TAGS.map((tag) => (
              <Link
                key={tag.href}
                href={tag.href}
                className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/75 transition-colors hover:bg-secondary hover:text-secondary-foreground"
              >
                {tag.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-4 text-center text-xs text-white/60">
          © {currentYear} {siteName} สงวนลิขสิทธิ์ทุกประการ{" "}
          <span className="text-white/30">|</span>{" "}
          <Link href="/privacy-policy" className="transition-colors hover:text-white">
            นโยบายความเป็นส่วนตัว
          </Link>
        </p>
      </div>
    </footer>
  )
}
