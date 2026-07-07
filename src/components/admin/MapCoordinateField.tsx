"use client"

import { Input } from "@/components/ui/input"
import { ExternalLink } from "lucide-react"
import { buildGoogleMapsEmbedUrl, buildGoogleMapsPickerUrl } from "@/lib/google-maps"

interface MapCoordinateFieldProps {
  lat: string
  lng: string
  address?: string
  onLatChange: (value: string) => void
  onLngChange: (value: string) => void
}

/** ฟิลด์พิกัดแผนที่ — ใส่ lat/lng แล้วดูตัวอย่าง Google Maps ทันที */
export function MapCoordinateField({
  lat,
  lng,
  address,
  onLatChange,
  onLngChange,
}: MapCoordinateFieldProps) {
  const latNum = lat.trim() ? Number(lat) : null
  const lngNum = lng.trim() ? Number(lng) : null
  const embedUrl = buildGoogleMapsEmbedUrl({ lat: latNum, lng: lngNum, address })
  const pickerUrl = buildGoogleMapsPickerUrl({ lat: latNum, lng: lngNum, address })

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-foreground text-sm font-medium">ละติจูด (Latitude)</label>
          <Input
            type="text"
            inputMode="decimal"
            placeholder="13.607700"
            value={lat}
            onChange={(e) => onLatChange(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-foreground text-sm font-medium">ลองจิจูด (Longitude)</label>
          <Input
            type="text"
            inputMode="decimal"
            placeholder="100.734500"
            value={lng}
            onChange={(e) => onLngChange(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <a
          href={pickerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border-input bg-background hover:bg-muted inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-sm font-medium transition-colors"
        >
          <ExternalLink className="size-3.5" />
          เปิด Google Maps เพื่อเลือกพิกัด
        </a>
        <p className="text-muted-foreground text-xs">
          คลิกขวาที่ตำแหน่ง → คัดลอกพิกัด → วางในช่องด้านบน
        </p>
      </div>

      {embedUrl ? (
        <div className="overflow-hidden rounded-xl border">
          <iframe
            src={embedUrl}
            title="ตัวอย่างแผนที่ Google Maps"
            width="100%"
            height="220"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>
      ) : (
        <div className="text-muted-foreground rounded-xl border border-dashed bg-muted/30 px-4 py-8 text-center text-sm">
          ใส่พิกัด lat/lng หรือที่อยู่ด้านบนเพื่อดูตัวอย่างแผนที่
        </div>
      )}
    </div>
  )
}
