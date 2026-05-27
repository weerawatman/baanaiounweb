"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NAV_ENTRIES, NAV_ITEMS, isNavGroup, type NavGroup } from "@/config/navigation"
import { SITE_CONFIG } from "@/config/site"

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
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary rounded-md transition-colors"
      >
        {group.label}
        <ChevronDown
          className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute left-0 top-full pt-1 transition-all duration-200 ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="min-w-48 rounded-lg border bg-white py-1 shadow-lg">
          {group.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
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

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-lg font-bold text-primary hover:opacity-80 transition-opacity"
        >
          {SITE_CONFIG.name}
        </Link>

        {/* Desktop Nav — grouped with dropdowns */}
        <nav className="hidden lg:flex items-center">
          {NAV_ENTRIES.map((entry) =>
            isNavGroup(entry) ? (
              <NavDropdown key={entry.label} group={entry} />
            ) : (
              <Link
                key={entry.href}
                href={entry.href}
                className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary rounded-md transition-colors"
              >
                {entry.label}
              </Link>
            ),
          )}
        </nav>

        {/* Mobile Hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            className="inline-flex items-center justify-center rounded-lg p-2 text-foreground hover:bg-muted transition-colors lg:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">เปิด/ปิด เมนู</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-0">
            <SheetHeader className="border-b px-4 py-4">
              <SheetTitle className="text-left text-primary text-base font-bold">
                {SITE_CONFIG.name}
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col py-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-6 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-colors"
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
