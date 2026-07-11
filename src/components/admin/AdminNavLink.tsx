"use client"

import Link, { useLinkStatus } from "next/link"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface AdminNavLinkProps {
  href: string
  label: string
  icon: LucideIcon
  active: boolean
}

function NavPendingDot() {
  const { pending } = useLinkStatus()
  if (!pending) return null
  return (
    <span
      className="ml-auto size-2 shrink-0 animate-pulse rounded-full bg-white/90"
      aria-hidden
    />
  )
}

export function AdminNavLink({ href, label, icon: Icon, active }: AdminNavLinkProps) {
  return (
    <Link
      href={href}
      prefetch={true}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        active
          ? "bg-primary text-white"
          : "text-foreground hover:bg-primary/5 hover:text-primary",
      )}
    >
      <Icon className="size-5 shrink-0" />
      <span className="truncate">{label}</span>
      <NavPendingDot />
    </Link>
  )
}
