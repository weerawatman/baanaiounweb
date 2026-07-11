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
    <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-primary-subtle to-primary/5 p-5">
      {/* Decorative quote icon */}
      <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" aria-hidden />

      <div className="flex items-start gap-4">
        {/* Avatar */}
        <Image
          src={avatar}
          alt={agentName}
          width={48}
          height={48}
          className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-primary/30"
        />

        <div className="flex flex-col gap-1.5">
          {/* Name label */}
          <p className="text-xs font-semibold tracking-wide text-primary uppercase">
            {agentName} แนะนำ
          </p>

          {/* Blockquote */}
          <blockquote className="text-sm leading-relaxed text-primary italic">
            &ldquo;{insight}&rdquo;
          </blockquote>
        </div>
      </div>
    </div>
  )
}
