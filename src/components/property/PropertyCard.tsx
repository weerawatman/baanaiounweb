"use client"

import { useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import { Bed, Bath, Maximize, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { type Property } from "@/types"
import { formatPrice } from "@/lib/format"
import { deriveBadges } from "@/lib/badges"
import { localizedOrFallback } from "@/lib/i18n/pick-localized"
import type { Locale } from "@/i18n/routing"

interface PropertyCardProps {
  property: Property
}

const STATUS_LABELS: Record<Property["status"], { th: string; en: string }> = {
  ACTIVE: { th: "พร้อมขาย/เช่า", en: "Available" },
  SOLD: { th: "ขายแล้ว", en: "Sold" },
  RENTED: { th: "ปล่อยเช่าแล้ว", en: "Rented" },
}

const TYPE_LABELS: Record<Property["type"], { th: string; en: string }> = {
  SALE: { th: "ขาย", en: "Sale" },
  RENT: { th: "เช่า", en: "Rent" },
  LAND: { th: "ที่ดิน", en: "Land" },
}

const BED_LABEL = { th: "นอน", en: "bed" } as const
const BATH_LABEL = { th: "น้ำ", en: "bath" } as const
const AREA_LABEL = { th: "ตร.ม.", en: "sqm" } as const

export default function PropertyCard({ property }: PropertyCardProps) {
  const locale = useLocale() as Locale
  const pick = (pair: { th: string; en: string }) => (locale === "en" ? pair.en : pair.th)
  const status = STATUS_LABELS[property.status]
  const type = TYPE_LABELS[property.type]
  const badges = deriveBadges(property)
  const title = localizedOrFallback(locale, property.title, property.titleEn)

  return (
    <div className="h-full transition-transform duration-200 hover:scale-[1.02]">
      <Link
        href={`/property/${property.slug}`}
        aria-label={title}
        className="group block h-full"
      >
        <Card className="group-hover:ring-foreground/20 h-full overflow-hidden rounded-[20px] border-border shadow-[0_10px_30px_rgba(45,90,39,0.04)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_15px_40px_rgba(45,90,39,0.1)]">
          <div className="relative h-60 overflow-hidden">
            <Image
              src={property.imagePrimary}
              alt={`${pick(type)} ${title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span
              className={`absolute top-3 left-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                property.type === "SALE"
                  ? "bg-primary text-white"
                  : property.type === "RENT"
                    ? "bg-blue-600 text-white"
                    : "bg-amber-500 text-white"
              }`}
            >
              {pick(type)}
            </span>
            {property.status !== "ACTIVE" && (
              <span
                className={`absolute top-3 right-3 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                  property.status === "SOLD"
                    ? "bg-red-100 text-red-800 border-red-200"
                    : "bg-blue-100 text-blue-800 border-blue-200"
                }`}
              >
                {pick(status)}
              </span>
            )}
            {badges.length > 0 && (
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                {badges.map((badge) => (
                  <span
                    key={badge.key}
                    title={`${badge.th} | ${badge.en}`}
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold shadow-sm ${badge.className}`}
                  >
                    {pick({ th: badge.th, en: badge.en })}
                  </span>
                ))}
              </div>
            )}
          </div>

          <CardContent className="flex flex-col gap-2 pt-3">
            <h3 className="text-foreground line-clamp-2 text-sm leading-snug font-medium">
              {title}
            </h3>

            <p className="text-xl font-bold text-primary">{formatPrice(property)}</p>

            <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
              {property.bedrooms > 0 && (
                <span className="flex items-center gap-1">
                  <Bed className="h-3.5 w-3.5" />
                  {property.bedrooms} {pick(BED_LABEL)}
                </span>
              )}
              {property.bathrooms > 0 && (
                <span className="flex items-center gap-1">
                  <Bath className="h-3.5 w-3.5" />
                  {property.bathrooms} {pick(BATH_LABEL)}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Maximize className="h-3.5 w-3.5" />
                {property.areaSqm} {pick(AREA_LABEL)}
              </span>
            </div>

            <div className="text-muted-foreground flex items-center gap-1 text-xs">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{property.location.district}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}
