"use client"

import { useState, useRef, useTransition } from "react"
import Image from "next/image"
import { Upload, X, Loader2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_FILE_SIZE_BYTES, MAX_IMAGE_FILE_SIZE_MB } from "@/lib/upload-config"

function validateFile(file: File): string | null {
  if (!(file.type in ACCEPTED_IMAGE_TYPES)) {
    if (/\.heic$|\.heif$/i.test(file.name) || file.type === "image/heic") {
      return `ไฟล์ "${file.name}" เป็น HEIC (รูปแบบ iPhone) — กรุณาแปลงเป็น JPG ก่อนอัปโหลด`
    }
    return `ไฟล์ "${file.name}" ไม่ใช่รูปภาพที่รองรับ (รองรับเฉพาะ JPG, PNG, WEBP)`
  }
  if (file.size > MAX_IMAGE_FILE_SIZE_BYTES) {
    return `ไฟล์ "${file.name}" มีขนาดเกิน ${MAX_IMAGE_FILE_SIZE_MB} MB`
  }
  return null
}

interface ImageUploaderProps {
  value: string[]
  onChange: (urls: string[]) => void
  maxFiles?: number
  label?: string
  /** Subfolder under uploads/ in property-images bucket (allowlisted server-side). */
  uploadFolder?: string
}

export function ImageUploader({
  value,
  onChange,
  maxFiles = 10,
  label = "อัปโหลดรูปภาพ",
  uploadFolder,
}: ImageUploaderProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function uploadFiles(files: File[]) {
    if (!files.length) return
    if (value.length + files.length > maxFiles) {
      setError(`อัปโหลดได้สูงสุด ${maxFiles} รูป`)
      return
    }

    // Validate every file before starting any upload — catches size/type
    // problems immediately instead of failing partway through.
    for (const file of files) {
      const validationError = validateFile(file)
      if (validationError) {
        setError(validationError)
        return
      }
    }

    setError(null)
    startTransition(async () => {
      // One file per request: a combined multi-file body can exceed the
      // platform's request-size limit and fail before our code even runs,
      // and a single failure would otherwise lose every file in the batch.
      const uploaded: string[] = []
      for (const file of files) {
        const formData = new FormData()
        formData.append("files", file)
        if (uploadFolder) formData.append("folder", uploadFolder)

        try {
          const res = await fetch("/api/upload-images", {
            method: "POST",
            body: formData,
          })
          const json = await res.json()
          if (!res.ok || !json.success) {
            throw new Error(json.error ?? `อัปโหลด "${file.name}" ล้มเหลว`)
          }
          uploaded.push(...(json.urls ?? []))
        } catch (err) {
          setError(err instanceof Error ? err.message : `อัปโหลด "${file.name}" ล้มเหลว`)
          break
        }
      }
      if (uploaded.length) onChange([...value, ...uploaded])
    })
  }

  function handleFiles(files: FileList | null) {
    if (!files) return
    // Don't silently drop files by MIME sniffing here — some browsers report
    // no MIME type for HEIC photos, which would otherwise vanish with zero
    // feedback. validateFile() below gives a clear reason for every file.
    uploadFiles(Array.from(files))
  }

  function remove(url: string) {
    onChange(value.filter((u) => u !== url))
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          handleFiles(e.dataTransfer.files)
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 transition-colors",
          dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
        )}
        onClick={() => inputRef.current?.click()}
      >
        {isPending ? (
          <Loader2 className="text-primary size-8 animate-spin" />
        ) : (
          <Upload className="text-muted-foreground size-8" />
        )}
        <p className="text-sm font-medium">{label}</p>
        <p className="text-muted-foreground text-xs">ลากวาง หรือคลิกเพื่อเลือกไฟล์</p>
        <p className="text-muted-foreground text-xs">
          JPG, PNG, WEBP ไม่เกิน {MAX_IMAGE_FILE_SIZE_MB} MB ต่อรูป — ไฟล์ HEIC จาก iPhone ต้องแปลงเป็น JPG ก่อน
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          <AlertTriangle className="size-4 shrink-0" />
          {error}
        </div>
      )}

      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
          {value.map((url) => (
            <div
              key={url}
              className="group relative aspect-square overflow-hidden rounded-lg border"
            >
              <Image src={url} alt="uploaded" fill className="object-cover" sizes="120px" />
              <Button
                type="button"
                size="icon"
                variant="destructive"
                onClick={() => remove(url)}
                className="absolute top-1 right-1 size-6 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="size-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {value.length > 0 && (
        <p className="text-muted-foreground text-xs">
          {value.length} / {maxFiles} รูป
        </p>
      )}
    </div>
  )
}
