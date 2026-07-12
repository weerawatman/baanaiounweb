"use client"

import { useState, useRef, useEffect } from "react"
import { useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  NAV_ENTRIES,
  NAV_ITEMS,
  isNavGroup,
  type NavGroup,
} from "@/config/navigation"
import { SITE_CONFIG } from "@/config/site"
import { navText } from "@/lib/i18n/locale-label"
import type { Locale } from "@/i18n/routing"
import type { Profile } from "@/types"
import LanguageSwitcher from "@/components/layout/LanguageSwitcher"

function NavDropdown({ group, locale }: { group: NavGroup; locale: Locale }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const timeout = useRef<ReturnType<typeof setTimeout>>(null)
  const groupLabel = navText(group, locale)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  function handleEnter() {
    if (timeout.current) clearTimeout(timeout.current)
    setOpen(true)
  }

  function handleLeave() {
    timeout.current = setTimeout(() => setOpen(false), 150)
  }

  return (
    <div ref={ref} className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={groupLabel}
        aria-expanded={open}
        className="text-foreground hover:text-primary inline-flex items-center rounded-md px-3 py-1.5 text-center text-sm font-medium transition-colors"
      >
        <span className="inline-flex items-center gap-1">
          {groupLabel}
          <ChevronDown
            className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      <div
        className={`absolute top-full left-0 pt-1 transition-all duration-200 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="min-w-48 rounded-lg border bg-white py-1 shadow-lg">
          {group.children.map((child) => {
            const label = navText(child, locale)
            return (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setOpen(false)}
                title={label}
                aria-label={label}
                className="text-foreground hover:bg-primary/5 hover:text-primary block px-4 py-2.5 text-sm transition-colors"
              >
                {label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function Header({ profile }: { profile: Profile }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const locale = useLocale() as Locale
  const siteName = profile?.siteName || SITE_CONFIG.name
  const homeLabel = locale === "en" ? "Home" : "หน้าแรก"

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white/95 shadow-[0_4px_20px_rgba(45,90,39,0.05)] backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          title={siteName}
          aria-label={`${siteName} — ${homeLabel}`}
          className="text-primary font-heading shrink-0 text-lg font-bold transition-opacity hover:opacity-80"
        >
          {siteName}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={locale === "en" ? "Main menu" : "เมนูหลัก"}>
          {NAV_ENTRIES.map((entry) => {
            const label = navText(entry, locale)
            return isNavGroup(entry) ? (
              <NavDropdown key={entry.th} group={entry} locale={locale} />
            ) : entry.href === "/contact" ? (
              <Link
                key={entry.href}
                href={entry.href}
                title={label}
                aria-label={label}
                className="bg-secondary hover:bg-secondary/90 ml-2 inline-flex items-center rounded-full px-5 py-2 text-center text-sm font-medium text-secondary-foreground transition-colors"
              >
                {label}
              </Link>
            ) : (
              <Link
                key={entry.href}
                href={entry.href}
                title={label}
                aria-label={label}
                className="text-foreground hover:text-primary inline-flex items-center rounded-md px-3 py-1.5 text-center text-sm font-medium transition-colors"
              >
                {label}
              </Link>
            )
          })}
          <LanguageSwitcher className="ml-2" />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger className="text-foreground hover:bg-muted inline-flex items-center justify-center rounded-lg p-2 transition-colors">
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              <span className="sr-only">{locale === "en" ? "Open menu" : "เปิด/ปิด เมนู"}</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0">
              <SheetHeader className="border-b px-4 py-4">
                <SheetTitle className="text-primary text-left text-base font-bold">
                  {siteName}
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col py-2" aria-label={locale === "en" ? "Mobile menu" : "เมนูมือถือ"}>
                {NAV_ITEMS.map((item) => {
                  const label = navText(item, locale)
                  return (
                    <Link
                      key={`${item.href}-${item.th}`}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      title={label}
                      aria-label={label}
                      className="text-foreground hover:text-primary hover:bg-primary/5 px-6 py-2.5 text-sm font-medium transition-colors"
                    >
                      {label}
                    </Link>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
