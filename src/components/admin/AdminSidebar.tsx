"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ADMIN_NAV } from "@/config/admin-nav"
import { SITE_CONFIG } from "@/config/site"

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r bg-white lg:flex">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/admin" className="text-base font-bold text-primary">
          {SITE_CONFIG.name}
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {ADMIN_NAV.map((item) => {
          // Exact match for dashboard root, prefix match for sections
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary text-white"
                  : "text-foreground hover:bg-primary/5 hover:text-primary"
              }`}
            >
              <item.icon className="size-5 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
