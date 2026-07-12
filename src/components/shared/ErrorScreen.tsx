"use client"

import { useEffect } from "react"
import { RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function ErrorScreen({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error(error)
    }
  }, [error])

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl">😔</p>
      <h1 className="text-foreground mt-4 text-2xl font-bold sm:text-3xl">
        เกิดข้อผิดพลาดบางอย่างค่ะ
      </h1>
      <p className="text-muted-foreground mt-3 max-w-md text-base leading-relaxed">
        ขอโทษนะคะ ระบบมีปัญหาชั่วคราว ลองโหลดใหม่หรือกลับไปหน้าแรกได้เลย
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={reset}
          className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-colors"
        >
          <RefreshCw className="size-4" />
          ลองใหม่อีกครั้ง
        </button>
        <Link
          href="/"
          className="border-primary text-primary hover:bg-primary/5 inline-flex items-center gap-2 rounded-lg border px-6 py-2.5 text-sm font-semibold transition-colors"
        >
          <Home className="size-4" />
          กลับหน้าแรก
        </Link>
      </div>
    </div>
  )
}
