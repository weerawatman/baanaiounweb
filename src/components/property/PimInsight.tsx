import Image from "next/image"
import { Quote } from "lucide-react"
import { SITE_CONFIG } from "@/config/site"

interface PimInsightProps {
  insight: string
  avatarUrl?: string
  name?: string
}

export default function PimInsight({ insight, avatarUrl, name }: PimInsightProps) {
  const avatar = avatarUrl || SITE_CONFIG.pim.avatar
  const agentName = name || SITE_CONFIG.pim.name

  return (
    <div className="relative rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-5">
      {/* Decorative quote icon */}
      <Quote className="absolute right-4 top-4 h-8 w-8 text-green-200" aria-hidden />

      <div className="flex items-start gap-4">
        {/* Avatar */}
        <Image
          src={avatar}
          alt={agentName}
          width={48}
          height={48}
          className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-green-300"
        />

        <div className="flex flex-col gap-1.5">
          {/* Name label */}
          <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
            {agentName} แนะนำ
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
