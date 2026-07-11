"use client"

import { useEffect } from "react"
import { RefreshCw, LayoutDashboard } from "lucide-react"
import Link from "next/link"

export default function AdminDashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[admin]", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border bg-white px-6 py-16 text-center">
      <p className="text-5xl">😔</p>
      <h1 className="text-foreground mt-4 text-xl font-bold">โหลดหน้านี้ไม่สำเร็จ</h1>
      <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
        มีปัญหาชั่วคราวในหน้านี้ ลองโหลดใหม่ หรือกลับไปภาพรวม admin
      </p>
      {error.digest && (
        <p className="text-muted-foreground mt-3 font-mono text-xs">รหัสอ้างอิง: {error.digest}</p>
      )}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold text-white"
        >
          <RefreshCw className="size-4" />
          ลองใหม่อีกครั้ง
        </button>
        <Link
          href="/admin"
          className="border-primary text-primary hover:bg-primary/5 inline-flex items-center gap-2 rounded-lg border px-5 py-2 text-sm font-semibold"
        >
          <LayoutDashboard className="size-4" />
          กลับภาพรวม
        </Link>
      </div>
    </div>
  )
}
