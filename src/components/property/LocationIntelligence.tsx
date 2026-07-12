"use client"

import { useLocale } from "next-intl"
import { MapPin, Building2, Heart, ShoppingBag } from "lucide-react"
import { type Property } from "@/types"
import type { Locale } from "@/i18n/routing"
import { localizedOrFallback, pickLocalized } from "@/lib/i18n/pick-localized"

interface LocationIntelligenceProps {
  property: Property
}

interface DistanceCardProps {
  icon: React.ReactNode
  label: string
  value: string
}

const LABEL_HOSPITAL = { th: "ระยะห่างจากโรงพยาบาล", en: "Distance to hospital" } as const
const LABEL_MARKET = { th: "ระยะห่างจากตลาด", en: "Distance to market" } as const
const MAP_TITLE = { th: "แผนที่", en: "Map" } as const

function DistanceCard({ icon, label, value }: DistanceCardProps) {
  return (
    <div className="border-border bg-muted/40 flex items-start gap-3 rounded-xl border p-4">
      <div className="mt-0.5 shrink-0 text-primary">{icon}</div>
      <div>
        <p className="text-muted-foreground text-xs">{label}</p>
        <p className="text-foreground text-sm font-semibold">{value}</p>
      </div>
    </div>
  )
}

export default function LocationIntelligence({ property }: LocationIntelligenceProps) {
  const locale = useLocale() as Locale
  const { location } = property
  const title = localizedOrFallback(locale, property.title, property.titleEn)

  const hasCoords =
    location.lat != null && location.lng != null && location.lat !== 0 && location.lng !== 0
  const mapQuery = hasCoords
    ? `${location.lat},${location.lng}`
    : encodeURIComponent([location.subdistrict, location.district].filter(Boolean).join(" "))
  const mapHl = locale === "en" ? "en" : "th"
  const mapSrc = mapQuery
    ? `https://maps.google.com/maps?q=${mapQuery}&z=15&output=embed&hl=${mapHl}`
    : null

  const industrialLabel =
    locale === "en"
      ? `Distance to industrial estate (${location.nearestIndustrialEstate})`
      : `ระยะห่างจากนิคม (${location.nearestIndustrialEstate})`

  return (
    <div className="flex flex-col gap-4">
      {mapSrc && (
        <div className="border-border overflow-hidden rounded-xl border">
          <iframe
            src={mapSrc}
            title={`${pickLocalized(locale, MAP_TITLE)} ${title}`}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>
      )}

      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <MapPin className="h-4 w-4 shrink-0 text-primary" />
        <span>
          {location.subdistrict}
          {location.subdistrict && location.district ? ", " : ""}
          {location.district}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <DistanceCard
          icon={<Building2 className="h-5 w-5" />}
          label={industrialLabel}
          value={location.distanceToAmata}
        />
        <DistanceCard
          icon={<Heart className="h-5 w-5" />}
          label={pickLocalized(locale, LABEL_HOSPITAL)}
          value={location.distanceToHospital}
        />
        <DistanceCard
          icon={<ShoppingBag className="h-5 w-5" />}
          label={pickLocalized(locale, LABEL_MARKET)}
          value={location.distanceToMarket}
        />
      </div>
    </div>
  )
}
