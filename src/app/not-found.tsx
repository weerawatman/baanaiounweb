import Link from "next/link"
import { Home, MessageCircle } from "lucide-react"
import { SITE_CONFIG } from "@/config/site"

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-bold text-primary/20">404</p>
      <h1 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
        หาหน้านี้ไม่เจอค่ะ
      </h1>
      <p className="mt-3 max-w-md text-base text-muted-foreground leading-relaxed">
        อาจถูกย้ายหรือลบไปแล้ว ลองกลับไปหน้าแรกหรือทักพิมโดยตรงได้เลยนะคะ
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
        >
          <Home className="size-4" />
          กลับหน้าแรก
        </Link>
        <a
          href={SITE_CONFIG.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-primary px-6 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
        >
          <MessageCircle className="size-4" />
          ทักแชทพิม
        </a>
      </div>
    </div>
  )
}
