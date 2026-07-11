"use client"

import { useState, useCallback, useRef } from "react"
import { ImagePlus, X, AlertTriangle, Loader2 } from "lucide-react"

// ─── Config ──────────────────────────────────────────────────────────────

const MAX_FILES = 5
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"]
const ACCEPTED_EXT = ".jpg,.jpeg,.png,.webp"

// ─── Types ───────────────────────────────────────────────────────────────

export interface UploadedImage {
  file: File
  preview: string // object URL for local preview
  uploading?: boolean
  url?: string // remote URL after upload
  error?: string
}

interface ImageUploadProps {
  images: UploadedImage[]
  onChange: (images: UploadedImage[]) => void
  error?: string
  disabled?: boolean
}

// ─── Helpers ─────────────────────────────────────────────────────────────

function validateFile(file: File): string | null {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return "รองรับเฉพาะไฟล์ JPG, PNG, WEBP"
  }
  if (file.size > MAX_FILE_SIZE) {
    return `ไฟล์ใหญ่เกินไป (สูงสุด ${MAX_FILE_SIZE / 1024 / 1024} MB)`
  }
  return null
}

// ─── Component ───────────────────────────────────────────────────────────

export default function ImageUpload({ images, onChange, error, disabled }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const addFiles = useCallback(
    (fileList: FileList | File[]) => {
      const files = Array.from(fileList)
      const remaining = MAX_FILES - images.length
      if (remaining <= 0) return

      const toAdd = files.slice(0, remaining)
      const newImages: UploadedImage[] = []

      for (const file of toAdd) {
        const validationError = validateFile(file)
        newImages.push({
          file,
          preview: URL.createObjectURL(file),
          error: validationError ?? undefined,
        })
      }

      onChange([...images, ...newImages])
    },
    [images, onChange],
  )

  const removeImage = useCallback(
    (index: number) => {
      const updated = [...images]
      // Revoke object URL to prevent memory leaks
      URL.revokeObjectURL(updated[index].preview)
      updated.splice(index, 1)
      onChange(updated)
    },
    [images, onChange],
  )

  // ─── Drag handlers ────────────────────────────────────────────────

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      if (disabled) return
      if (e.dataTransfer.files.length > 0) {
        addFiles(e.dataTransfer.files)
      }
    },
    [addFiles, disabled],
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        addFiles(e.target.files)
      }
      // Reset input so the same file can be re-selected
      e.target.value = ""
    },
    [addFiles],
  )

  const canAddMore = images.length < MAX_FILES

  return (
    <div className="flex flex-col gap-2">
      {/* Thumbnails grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {images.map((img, i) => (
            <div
              key={img.preview}
              className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.preview}
                alt={`รูปทรัพย์ ${i + 1}`}
                className="size-full object-cover"
              />

              {/* Uploading overlay */}
              {img.uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Loader2 className="size-5 animate-spin text-white" />
                </div>
              )}

              {/* Error overlay */}
              {img.error && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-500/20">
                  <AlertTriangle className="size-5 text-red-600" />
                </div>
              )}

              {/* Uploaded checkmark */}
              {img.url && !img.uploading && (
                <div className="absolute right-1 bottom-1 flex size-5 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                  ✓
                </div>
              )}

              {/* Remove button */}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/80"
                  aria-label={`ลบรูปที่ ${i + 1}`}
                >
                  <X className="size-3" />
                </button>
              )}

              {/* Error tooltip */}
              {img.error && (
                <div className="absolute inset-x-0 bottom-0 bg-red-600/90 px-1 py-0.5 text-center text-[10px] leading-tight text-white">
                  {img.error}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      {canAddMore && (
        <div
          className={`relative flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed px-4 py-6 text-center transition-colors ${
            disabled
              ? "cursor-not-allowed border-border bg-muted text-muted-foreground"
              : dragActive
                ? "border-primary bg-primary/5 text-primary"
                : "border-input text-muted-foreground hover:border-primary/40 hover:text-foreground"
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => !disabled && inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              inputRef.current?.click()
            }
          }}
        >
          <ImagePlus className="size-8 opacity-60" />
          <div className="text-sm">
            <span className="font-medium">คลิกเลือกรูป</span> หรือลากไฟล์มาวาง
          </div>
          <p className="text-xs text-muted-foreground">
            JPG, PNG, WEBP สูงสุด {MAX_FILES} รูป (ไม่เกิน {MAX_FILE_SIZE / 1024 / 1024} MB ต่อรูป)
          </p>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_EXT}
            multiple
            className="hidden"
            onChange={handleInputChange}
            disabled={disabled}
          />
        </div>
      )}

      {/* File count */}
      {images.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {images.length}/{MAX_FILES} รูป
        </p>
      )}

      {/* External error */}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500">
          <AlertTriangle className="size-3 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}
