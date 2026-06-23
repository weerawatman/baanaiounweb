"use client"

import { LogOut, ExternalLink } from "lucide-react"
import { logout } from "@/app/(admin)/admin/login/actions"

export default function AdminTopbar({ email }: { email: string }) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 sm:px-6">
      <div className="text-muted-foreground text-sm">ระบบจัดการหลังบ้าน</div>

      <div className="flex items-center gap-4">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary hidden items-center gap-1.5 text-sm sm:flex"
        >
          <ExternalLink className="size-4" />
          ดูเว็บไซต์
        </a>

        <span className="text-foreground hidden text-sm sm:inline">{email}</span>

        <form action={logout}>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="size-4" />
            ออกจากระบบ
          </button>
        </form>
      </div>
    </header>
  )
}
