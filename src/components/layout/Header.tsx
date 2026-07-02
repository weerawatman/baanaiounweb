"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { NAV_ENTRIES, NAV_ITEMS, isNavGroup, type NavGroup } from "@/config/navigation"
import { SITE_CONFIG } from "@/config/site"
import LanguageToggle from "@/components/layout/LanguageToggle"
import type { Profile } from "@/types"

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
        aria-label={`${group.label} เมนู`}
        aria-expanded={open}
        className="text-foreground hover:text-primary inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors"
      >
        {group.label}
        <ChevronDown
          className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
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
              title={child.label}
              aria-label={child.label}
              className="text-foreground hover:bg-primary/5 hover:text-primary block px-4 py-2.5 text-sm transition-colors"
            >
              {child.label}
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
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          title={siteName}
          aria-label={`${siteName} — หน้าแรก`}
          className="text-primary shrink-0 text-lg font-bold transition-opacity hover:opacity-80"
        >
          {siteName}
        </Link>

        {/* Desktop Nav — grouped with dropdowns */}
        <nav className="hidden items-center lg:flex" aria-label="เมนูหลัก">
          {NAV_ENTRIES.map((entry) =>
            isNavGroup(entry) ? (
              <NavDropdown key={entry.label} group={entry} />
            ) : entry.href === "/contact" ? (
              <Link
                key={entry.href}
                href={entry.href}
                title={entry.label}
                aria-label={entry.label}
                className="bg-primary hover:bg-primary/90 ml-2 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
              >
                {entry.label}
              </Link>
            ) : (
              <Link
                key={entry.href}
                href={entry.href}
                title={entry.label}
                aria-label={entry.label}
                className="text-foreground hover:text-primary rounded-md px-3 py-2 text-sm font-medium transition-colors"
              >
                {entry.label}
              </Link>
            ),
          )}
        </nav>

        {/* Language Toggle */}
        <div className="hidden lg:flex">
          <LanguageToggle />
        </div>

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
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  title={item.label}
                  aria-label={item.label}
                  className="text-foreground hover:text-primary hover:bg-primary/5 px-6 py-3 text-sm font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
