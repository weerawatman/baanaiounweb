"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

interface PropertyGalleryProps {
  images: string[]
  title: string
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectedImage = images[selectedIndex] ?? images[0]

  return (
    <div className="flex flex-col gap-3">
      {/* Main image — clicking opens lightbox */}
      <Dialog>
        <DialogTrigger
          render={
            <button
              className="w-full overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="ดูภาพขนาดเต็ม"
            />
          }
        >
          <div className="relative h-72 w-full sm:h-96">
            <Image
              src={selectedImage}
              alt={`${title} — ภาพหลัก`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 672px"
              className="object-cover transition-transform duration-300 hover:scale-[1.02] cursor-zoom-in"
            />
          </div>
        </DialogTrigger>

        <DialogContent
          className="max-w-3xl w-full p-2"
          showCloseButton
        >
          <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
            <Image
              src={selectedImage}
              alt={`${title} — ดูภาพเต็ม`}
              fill
              sizes="(max-width: 1024px) 100vw, 768px"
              className="object-contain rounded-lg"
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">
            {title} — ภาพ {selectedIndex + 1} / {images.length}
          </p>
        </DialogContent>
      </Dialog>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`shrink-0 overflow-hidden rounded-lg border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                idx === selectedIndex
                  ? "border-green-600 ring-1 ring-green-600"
                  : "border-transparent hover:border-muted-foreground/40"
              }`}
              aria-label={`ดูภาพที่ ${idx + 1}`}
            >
              <Image
                src={src}
                alt={`${title} — ภาพที่ ${idx + 1}`}
                width={96}
                height={64}
                className="h-16 w-24 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
