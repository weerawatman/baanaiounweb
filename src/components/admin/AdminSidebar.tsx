"use client"

import { usePathname } from "next/navigation"
import { ADMIN_NAV } from "@/config/admin-nav"
import { SITE_CONFIG } from "@/config/site"
import Link from "next/link"
import { AdminNavLink } from "@/components/admin/AdminNavLink"

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r bg-white lg:flex">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/admin" prefetch className="text-primary text-base font-bold">
          {SITE_CONFIG.name}
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {ADMIN_NAV.map((item) => {
          const active =
            item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href)

          return (
            <AdminNavLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={active}
            />
          )
        })}
      </nav>
    </aside>
  )
}
