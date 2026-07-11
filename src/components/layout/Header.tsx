"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  NAV_ENTRIES,
  NAV_ITEMS,
  isNavGroup,
  navLabel,
  type NavGroup,
} from "@/config/navigation"
import { SITE_CONFIG } from "@/config/site"
import type { Profile } from "@/types"

// ─── Bilingual label (Thai primary, English secondary) ──────────────────

function BilingualLabel({ th, en }: { th: string; en: string }) {
  if (th === en) {
    return <span className="text-sm leading-tight font-medium">{th}</span>
  }
  return (
    <>
      <span className="text-sm leading-tight font-medium">{th}</span>
      <span className="text-[11px] leading-tight font-normal opacity-70">{en}</span>
    </>
  )
}

// ─── Dropdown component ─────────────────────────────────────────────────

function NavDropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const timeout = useRef<ReturnType<typeof setTimeout>>(null)

  // Close on click outside
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
        aria-label={`${navLabel(group)} เมนู`}
        aria-expanded={open}
        className="text-foreground hover:text-primary inline-flex flex-col items-center rounded-md px-3 py-1.5 text-center transition-colors"
      >
        <span className="inline-flex items-center gap-1">
          <BilingualLabel th={group.th} en={group.en} />
          <ChevronDown
            className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute top-full left-0 pt-1 transition-all duration-200 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="min-w-48 rounded-lg border bg-white py-1 shadow-lg">
          {group.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={() => setOpen(false)}
              title={navLabel(child)}
              aria-label={navLabel(child)}
              className="text-foreground hover:bg-primary/5 hover:text-primary block px-4 py-2.5 text-sm transition-colors"
            >
              {navLabel(child)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Header ─────────────────────────────────────────────────────────────

export default function Header({ profile }: { profile: Profile }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const siteName = profile?.siteName || SITE_CONFIG.name

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white/95 shadow-[0_4px_20px_rgba(45,90,39,0.05)] backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          title={siteName}
          aria-label={`${siteName} — หน้าแรก`}
          className="text-primary font-heading shrink-0 text-lg font-bold transition-opacity hover:opacity-80"
        >
          {siteName}
        </Link>

        {/* Desktop Nav — grouped with dropdowns */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="เมนูหลัก">
          {NAV_ENTRIES.map((entry) =>
            isNavGroup(entry) ? (
              <NavDropdown key={entry.th} group={entry} />
            ) : entry.href === "/contact" ? (
              <Link
                key={entry.href}
                href={entry.href}
                title={navLabel(entry)}
                aria-label={navLabel(entry)}
                className="bg-secondary hover:bg-secondary/90 ml-2 inline-flex flex-col items-center rounded-full px-5 py-2 text-center text-secondary-foreground transition-colors"
              >
                <BilingualLabel th={entry.th} en={entry.en} />
              </Link>
            ) : (
              <Link
                key={entry.href}
                href={entry.href}
                title={navLabel(entry)}
                aria-label={navLabel(entry)}
                className="text-foreground hover:text-primary inline-flex flex-col items-center rounded-md px-3 py-1.5 text-center transition-colors"
              >
                <BilingualLabel th={entry.th} en={entry.en} />
              </Link>
            ),
          )}
        </nav>

        {/* Mobile Hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger className="text-foreground hover:bg-muted inline-flex items-center justify-center rounded-lg p-2 transition-colors lg:hidden">
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">เปิด/ปิด เมนู</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-0">
            <SheetHeader className="border-b px-4 py-4">
              <SheetTitle className="text-primary text-left text-base font-bold">
                {siteName}
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col py-2" aria-label="เมนูมือถือ">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={`${item.href}-${item.th}`}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  title={navLabel(item)}
                  aria-label={navLabel(item)}
                  className="text-foreground hover:text-primary hover:bg-primary/5 flex flex-col px-6 py-2.5 transition-colors"
                >
                  <span className="text-sm leading-snug font-medium">{item.th}</span>
                  {item.en !== item.th && (
                    <span className="text-xs leading-snug text-muted-foreground">{item.en}</span>
                  )}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
