"use client"

import { useState, useRef, useTransition } from "react"
import Image from "next/image"
import { Upload, X, Loader2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImageUploaderProps {
  value: string[]
  onChange: (urls: string[]) => void
  maxFiles?: number
  label?: string
}

export function ImageUploader({
  value,
  onChange,
  maxFiles = 10,
  label = "อัปโหลดรูปภาพ",
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

    setError(null)
    startTransition(async () => {
      const formData = new FormData()
      files.forEach((f) => formData.append("files", f))

      try {
        const res = await fetch("/api/upload-images", {
          method: "POST",
          body: formData,
        })
        if (!res.ok) throw new Error("อัปโหลดล้มเหลว")
        const json = await res.json()
        const urls: string[] = json.urls ?? []
        onChange([...value, ...urls])
      } catch (err) {
        setError(err instanceof Error ? err.message : "อัปโหลดล้มเหลว")
      }
    })
  }

  function handleFiles(files: FileList | null) {
    if (!files) return
    uploadFiles(Array.from(files).filter((f) => f.type.startsWith("image/")))
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
