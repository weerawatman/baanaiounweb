"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImageUploader } from "@/components/admin/ImageUploader"

interface SingleImageFieldProps {
  value: string
  onChange: (url: string) => void
  label?: string
  aspect?: "square" | "wide"
}

/** ฟิลด์รูปเดียว (เช่น avatar / hero) — wrapper ของ ImageUploader ที่รับ/คืน string */
export function SingleImageField({
  value,
  onChange,
  label = "อัปโหลดรูป",
  aspect = "square",
}: SingleImageFieldProps) {
  return (
    <div className="flex flex-col gap-3">
      {value ? (
        <div className="flex items-start gap-4">
          <div
            className={`relative overflow-hidden rounded-lg border ${
              aspect === "wide" ? "aspect-[4/3] w-64" : "size-32"
            }`}
          >
            <Image
              src={value}
              alt="preview"
              fill
              className="object-cover"
              sizes={aspect === "wide" ? "256px" : "128px"}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onChange("")}
              className="gap-1 text-red-600 border-red-200 hover:bg-red-50"
            >
              <X className="size-3.5" />
              ลบรูป
            </Button>
            <p className="text-xs text-muted-foreground break-all max-w-xs">
              {value}
            </p>
          </div>
        </div>
      ) : (
        <ImageUploader
          value={[]}
          onChange={(urls) => onChange(urls[0] ?? "")}
          maxFiles={1}
          label={label}
        />
      )}
    </div>
  )
}
