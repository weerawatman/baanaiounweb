"use client"

import { useLocale } from "next-intl"
import { Maximize, Bed, Bath, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { type Property } from "@/types"
import type { Locale } from "@/i18n/routing"
import { pickLocalized } from "@/lib/i18n/pick-localized"

interface PropertyFactSheetProps {
  property: Property
}

const STATUS_LABEL: Record<Property["status"], { th: string; en: string }> = {
  ACTIVE: { th: "พร้อมขาย/เช่า", en: "Available" },
  SOLD: { th: "ขายแล้ว", en: "Sold" },
  RENTED: { th: "ปล่อยเช่าแล้ว", en: "Rented" },
}

const LABEL_AREA = { th: "พื้นที่", en: "Area" } as const
const LABEL_BED = { th: "ห้องนอน", en: "Bedrooms" } as const
const LABEL_BATH = { th: "ห้องน้ำ", en: "Bathrooms" } as const
const LABEL_STATUS = { th: "สถานะ", en: "Status" } as const
const LABEL_AMENITIES = { th: "สิ่งอำนวยความสะดวก", en: "Amenities" } as const

const statusClass: Record<Property["status"], string> = {
  ACTIVE: "text-primary",
  SOLD: "text-red-600",
  RENTED: "text-blue-600",
}

interface FactItemProps {
  icon: React.ReactNode
  label: string
  value: string
  valueClassName?: string
}

function FactItem({ icon, label, value, valueClassName }: FactItemProps) {
  return (
    <div className="border-border bg-muted/40 flex flex-col items-center gap-1.5 rounded-xl border p-4 text-center">
      <div className="text-primary">{icon}</div>
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className={`text-sm font-semibold ${valueClassName ?? "text-foreground"}`}>{value}</p>
    </div>
  )
}

export default function PropertyFactSheet({ property }: PropertyFactSheetProps) {
  const locale = useLocale() as Locale
  const sqmUnit = pickLocalized(locale, { th: "ตร.ม.", en: "sqm" })
  const roomUnit = pickLocalized(locale, { th: "ห้อง", en: "rooms" })

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <FactItem
          icon={<Maximize className="h-5 w-5" />}
          label={pickLocalized(locale, LABEL_AREA)}
          value={`${property.areaSqm} ${sqmUnit}`}
        />
        {property.bedrooms > 0 && (
          <FactItem
            icon={<Bed className="h-5 w-5" />}
            label={pickLocalized(locale, LABEL_BED)}
            value={`${property.bedrooms} ${roomUnit}`}
          />
        )}
        {property.bathrooms > 0 && (
          <FactItem
            icon={<Bath className="h-5 w-5" />}
            label={pickLocalized(locale, LABEL_BATH)}
            value={`${property.bathrooms} ${roomUnit}`}
          />
        )}
        <FactItem
          icon={<CheckCircle className="h-5 w-5" />}
          label={pickLocalized(locale, LABEL_STATUS)}
          value={pickLocalized(locale, STATUS_LABEL[property.status])}
          valueClassName={statusClass[property.status]}
        />
      </div>

      {property.amenities.length > 0 && (
        <div>
          <p className="text-foreground mb-2 text-sm font-medium">
            {pickLocalized(locale, LABEL_AMENITIES)}
          </p>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((amenity) => (
              <Badge key={amenity} variant="secondary">
                {amenity}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
