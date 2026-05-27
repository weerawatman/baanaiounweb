import { Quote } from "lucide-react"
import { SITE_CONFIG } from "@/config/site"

interface PimInsightProps {
  insight: string
}

export default function PimInsight({ insight }: PimInsightProps) {
  return (
    <div className="relative rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-5">
      {/* Decorative quote icon */}
      <Quote className="absolute right-4 top-4 h-8 w-8 text-green-200" aria-hidden />

      <div className="flex items-start gap-4">
        {/* Avatar */}
        <img
          src={SITE_CONFIG.pim.avatar}
          alt={SITE_CONFIG.pim.name}
          className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-green-300"
        />

        <div className="flex flex-col gap-1.5">
          {/* Name label */}
          <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
            {SITE_CONFIG.pim.name} แนะนำ
          </p>

          {/* Blockquote */}
          <blockquote className="text-sm leading-relaxed text-green-900 italic">
            &ldquo;{insight}&rdquo;
          </blockquote>
        </div>
      </div>
    </div>
  )
}
