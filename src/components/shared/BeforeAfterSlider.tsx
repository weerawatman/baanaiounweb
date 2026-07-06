"use client"

import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import { GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"

interface BeforeAfterSliderProps {
  beforeUrl: string
  afterUrl: string
  beforeAlt: string
  afterAlt: string
  className?: string
}

export default function BeforeAfterSlider({
  beforeUrl,
  afterUrl,
  beforeAlt,
  afterAlt,
  className,
}: BeforeAfterSliderProps) {
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
    setIsDragging(true)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    updatePosition(e.clientX)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    updatePosition(e.clientX)
  }

  const onPointerUp = (e: React.PointerEvent) => {
    setIsDragging(false)
    ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
  }

  return (
    <div
      ref={containerRef}
      data-testid="before-after-slider"
      className={cn(
        "relative aspect-[4/3] w-full select-none overflow-hidden rounded-xl bg-gray-200",
        className,
      )}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <Image
        src={afterUrl}
        alt={afterAlt}
        fill
        sizes="(max-width: 768px) 100vw, 800px"
        className="object-cover"
        draggable={false}
      />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
        aria-hidden
      >
        <div
          className="relative h-full"
          style={{ width: position > 0 ? `${10000 / position}%` : "100%" }}
        >
          <Image
            src={beforeUrl}
            alt={beforeAlt}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            draggable={false}
          />
        </div>
      </div>

      <div
        className="absolute inset-y-0 z-10 w-1 -translate-x-1/2 cursor-ew-resize bg-white shadow-lg"
        style={{ left: `${position}%` }}
        onPointerDown={onPointerDown}
        role="slider"
        aria-label="Compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
      >
        <div className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#1B4D3E] text-white shadow-md">
          <GripVertical className="size-5" />
        </div>
      </div>

      <span className="absolute top-3 left-3 rounded bg-black/60 px-2 py-1 text-xs font-semibold text-white">
        Before | ก่อน
      </span>
      <span className="absolute top-3 right-3 rounded bg-[#1B4D3E]/90 px-2 py-1 text-xs font-semibold text-white">
        After | หลัง
      </span>
    </div>
  )
}
