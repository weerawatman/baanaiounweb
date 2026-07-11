"use client"

import * as Sentry from "@sentry/nextjs"
import { useEffect } from "react"

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="th">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <p className="text-6xl">😔</p>
          <h1 className="mt-4 text-2xl font-bold text-primary sm:text-3xl">
            เกิดข้อผิดพลาดร้ายแรง
            <span className="mt-1 block text-lg font-medium text-muted-foreground">
              A critical error occurred
            </span>
          </h1>
          <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
            ขอโทษนะคะ ระบบมีปัญหา ทีมงานได้รับแจ้งแล้ว กรุณาลองโหลดหน้านี้ใหม่
          </p>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- root layout has crashed; next/link's router context isn't reliable here, use a plain reload */}
          <a
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            กลับหน้าแรก | Back to Home
          </a>
        </div>
      </body>
    </html>
  )
}
