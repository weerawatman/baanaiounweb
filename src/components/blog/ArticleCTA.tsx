import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { SITE_CONFIG } from "@/config/site"

interface ArticleCTAProps {
  lineUrl?: string
}

export default function ArticleCTA({ lineUrl }: ArticleCTAProps) {
  const lineHref = lineUrl || SITE_CONFIG.lineUrl

  return (
    <section
      data-testid="article-cta"
      className="bg-primary/5 border-primary/20 space-y-4 rounded-2xl border px-6 py-8 text-center"
    >
      <h2 className="text-foreground text-xl font-bold">
        สนใจปรึกษาเรื่องบ้าน?
        <span className="mt-1 block text-base font-medium text-muted-foreground">
          Need help with your home search or loan?
        </span>
      </h2>
      <p className="text-muted-foreground mx-auto max-w-md text-sm">
        พิมพร้อมให้คำแนะนำทุกขั้นตอน ตั้งแต่เลือกทำเล วางแผนการเงิน จนถึงวันโอน
        ไม่มีค่าใช้จ่ายในการปรึกษา
        <span className="mt-1 block text-muted-foreground">
          Free consultation from location selection to closing day.
        </span>
      </p>
      <Link
        href={lineHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#06C755] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        <MessageCircle className="h-4 w-4" />
        ติดต่อพิมผ่าน LINE | Chat on LINE
      </Link>
    </section>
  )
}
