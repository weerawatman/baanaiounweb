"use client"

import { useState } from "react"
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
          <img
            src={selectedImage}
            alt={`${title} — ภาพหลัก`}
            className="w-full h-72 sm:h-96 object-cover transition-transform duration-300 hover:scale-[1.02] cursor-zoom-in"
          />
        </DialogTrigger>

        <DialogContent
          className="max-w-3xl w-full p-2"
          showCloseButton
        >
          <img
            src={selectedImage}
            alt={`${title} — ดูภาพเต็ม`}
            className="w-full max-h-[80vh] object-contain rounded-lg"
          />
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
              <img
                src={src}
                alt={`${title} — ภาพที่ ${idx + 1}`}
                className="h-16 w-24 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
