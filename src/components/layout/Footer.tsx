import { Link } from "@/i18n/navigation"
import { getLocale } from "next-intl/server"
import { footerLabel } from "@/lib/i18n/footer-labels"
import { SITE_CONFIG } from "@/config/site"
import { FOOTER_QUICK_LINKS, FOOTER_SEO_TAGS } from "@/config/navigation"
import { navText } from "@/lib/i18n/locale-label"
import type { Locale } from "@/i18n/routing"
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

export default async function Footer({ profile }: { profile: Profile }) {
  const locale = (await getLocale()) as Locale
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
          <div className="flex flex-col gap-1.5">
            <FooterHeading>{siteName}</FooterHeading>
            <p className="text-xs leading-snug text-white/75 sm:text-sm">{slogan}</p>
          </div>

          <div className="flex flex-col gap-2">
            <FooterHeading>{footerLabel(locale, "quickLinks")}</FooterHeading>
            <FooterList>
              {FOOTER_QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-white/80 transition-colors hover:text-white sm:text-sm"
                  >
                    - {navText(item, locale)}
                  </Link>
                </li>
              ))}
            </FooterList>
          </div>

          <div className="flex flex-col gap-2">
            <FooterHeading>{footerLabel(locale, "contact")}</FooterHeading>
            <FooterList>
              <FooterRow icon="📞" href={`tel:${phone}`}>
                {footerLabel(locale, "tel")}: {phone}
              </FooterRow>
              <FooterRow icon="🟢" href={lineUrl}>
                {footerLabel(locale, "lineOa")}: {lineId}
              </FooterRow>
              {linePersonalId ? (
                <FooterRow icon="💬">
                  {footerLabel(locale, "linePersonal")}: {linePersonalId}
                </FooterRow>
              ) : null}
              <FooterRow icon="✉️" href={`mailto:${email}`}>
                {footerLabel(locale, "email")}: {email}
              </FooterRow>
              <FooterRow icon="📍">
                {footerLabel(locale, "office")}: {address}
              </FooterRow>
            </FooterList>
          </div>

          <div className="flex flex-col gap-2">
            <FooterHeading>{footerLabel(locale, "follow")}</FooterHeading>
            <FooterList>
              <FooterRow icon="🟦" href={facebook}>
                {footerLabel(locale, "fbFanpage")}: {siteName}
              </FooterRow>
              {facebookPersonal ? (
                <FooterRow icon="👤" href={facebookPersonal}>
                  {footerLabel(locale, "fbPersonal")}: {SITE_CONFIG.facebookPersonalLabel}
                </FooterRow>
              ) : null}
              <FooterRow icon="📸" href={SITE_CONFIG.instagram}>
                {footerLabel(locale, "instagram")}: {SITE_CONFIG.instagramHandle}
              </FooterRow>
              <FooterRow icon="🎵" href={profile.tiktok || SITE_CONFIG.tiktok}>
                {footerLabel(locale, "tiktok")}: {SITE_CONFIG.tiktokHandle}
              </FooterRow>
              <FooterRow icon="📺" href={profile.youtube || SITE_CONFIG.youtube}>
                {footerLabel(locale, "youtube")}: {SITE_CONFIG.youtubeLabel}
              </FooterRow>
            </FooterList>
          </div>
        </div>

        <div className="mt-5 border-t border-white/15 pt-4 text-center">
          <p className="mb-2 text-xs text-white/60">{footerLabel(locale, "popularSearches")}</p>
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

        <p className="mt-4 text-center text-xs text-white/60">
          © {currentYear} {siteName} {footerLabel(locale, "rights")}{" "}
          <span className="text-white/30">|</span>{" "}
          <Link href="/privacy-policy" className="transition-colors hover:text-white">
            {footerLabel(locale, "privacy")}
          </Link>
        </p>
      </div>
    </footer>
  )
}
