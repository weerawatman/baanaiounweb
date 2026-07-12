"use client"

import { useCallback, useRef, useState } from "react"
import { useLocale } from "next-intl"
import Image from "next/image"
import { GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/routing"
import { pickLocalized } from "@/lib/i18n/pick-localized"

const BEFORE_LABEL = { th: "ก่อน", en: "Before" } as const
const AFTER_LABEL = { th: "หลัง", en: "After" } as const
const SLIDER_ARIA = {
  th: "เปรียบเทียบก่อนและหลัง",
  en: "Compare before and after",
} as const

interface BeforeAfterSliderProps {
  beforeUrl: string
  afterUrl: string
  beforeAlt?: string
  afterAlt?: string
  className?: string
}

export default function BeforeAfterSlider({
  beforeUrl,
  afterUrl,
  className,
}: BeforeAfterSliderProps) {
  const locale = useLocale() as Locale
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width)
    setPosition((x / rect.width) * 100)
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    containerRef.current?.setPointerCapture(e.pointerId)
    updatePosition(e.clientX)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    e.preventDefault()
    e.stopPropagation()
    updatePosition(e.clientX)
  }

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (containerRef.current?.hasPointerCapture(e.pointerId)) {
      containerRef.current.releasePointerCapture(e.pointerId)
    }
  }

  const beforeClip = `inset(0 ${100 - position}% 0 0)`

  return (
    <div
      ref={containerRef}
      data-testid="before-after-slider"
      className={cn(
        "relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-xl bg-muted",
        className,
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <Image
        src={afterUrl}
        alt=""
        aria-hidden
        fill
        sizes="(max-width: 768px) 100vw, 800px"
        className="object-cover"
        draggable={false}
      />

      <Image
        src={beforeUrl}
        alt=""
        aria-hidden
        fill
        sizes="(max-width: 768px) 100vw, 800px"
        className="object-cover"
        style={{ clipPath: beforeClip }}
        draggable={false}
      />

      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white shadow-lg"
        style={{ left: `${position}%` }}
        aria-hidden
      >
        <div className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-primary text-primary-foreground shadow-md">
          <GripVertical className="size-5" />
        </div>
      </div>

      <div
        role="slider"
        aria-label={pickLocalized(locale, SLIDER_ARIA)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        className="sr-only"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5))
          if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5))
        }}
      />

      <span className="pointer-events-none absolute top-3 left-3 rounded bg-black/60 px-2 py-1 text-xs font-semibold text-white">
        {pickLocalized(locale, BEFORE_LABEL)}
      </span>
      <span className="pointer-events-none absolute top-3 right-3 rounded bg-primary/90 px-2 py-1 text-xs font-semibold text-white">
        {pickLocalized(locale, AFTER_LABEL)}
      </span>
    </div>
  )
}
