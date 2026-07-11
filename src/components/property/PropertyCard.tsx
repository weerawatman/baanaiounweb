import Link from "next/link"
import Image from "next/image"
import { Bed, Bath, Maximize, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { type Property } from "@/types"
import { formatPrice } from "@/lib/format"
import { deriveBadges } from "@/lib/badges"

interface PropertyCardProps {
  property: Property
}

const statusConfig: Record<Property["status"], { label: string; className: string }> = {
  ACTIVE: { label: "พร้อมขาย/เช่า", className: "bg-primary-subtle text-primary border-primary/20" },
  SOLD: { label: "ขายแล้ว", className: "bg-red-100 text-red-800 border-red-200" },
  RENTED: { label: "ปล่อยเช่าแล้ว", className: "bg-blue-100 text-blue-800 border-blue-200" },
}

const typeConfig: Record<Property["type"], { label: string; className: string }> = {
  SALE: { label: "ขาย", className: "bg-primary text-white" },
  RENT: { label: "เช่า", className: "bg-blue-600 text-white" },
  LAND: { label: "ที่ดิน", className: "bg-amber-500 text-white" },
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const status = statusConfig[property.status]
  const type = typeConfig[property.type]
  const badges = deriveBadges(property)

  return (
    <div className="h-full transition-transform duration-200 hover:scale-[1.02]">
      <Link
        href={`/property/${property.slug}`}
        aria-label={property.title}
        className="group block h-full"
      >
        <Card className="group-hover:ring-foreground/20 h-full overflow-hidden rounded-[20px] border-border shadow-[0_10px_30px_rgba(45,90,39,0.04)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_15px_40px_rgba(45,90,39,0.1)]">
          {/* Image */}
          <div className="relative h-60 overflow-hidden">
            <Image
              src={property.imagePrimary}
              alt={`${type.label} ${property.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Type badge overlay */}
            <span
              className={`absolute top-3 left-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${type.className}`}
            >
              {type.label}
            </span>
            {/* Status badge overlay */}
            {property.status !== "ACTIVE" && (
              <span
                className={`absolute top-3 right-3 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${status.className}`}
              >
                {status.label}
              </span>
            )}
            {/* Trust badges (max 2) */}
            {badges.length > 0 && (
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                {badges.map((badge) => (
                  <span
                    key={badge.key}
                    title={`${badge.th} | ${badge.en}`}
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold shadow-sm ${badge.className}`}
                  >
                    {badge.th}
                  </span>
                ))}
              </div>
            )}
          </div>

          <CardContent className="flex flex-col gap-2 pt-3">
            {/* Title */}
            <h3 className="text-foreground line-clamp-2 text-sm leading-snug font-medium">
              {property.title}
            </h3>

            {/* Price */}
            <p className="text-xl font-bold text-primary">{formatPrice(property)}</p>

            {/* Stats row */}
            <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
              {property.bedrooms > 0 && (
                <span className="flex items-center gap-1">
                  <Bed className="h-3.5 w-3.5" />
                  {property.bedrooms} นอน
                </span>
              )}
              {property.bathrooms > 0 && (
                <span className="flex items-center gap-1">
                  <Bath className="h-3.5 w-3.5" />
                  {property.bathrooms} น้ำ
                </span>
              )}
              <span className="flex items-center gap-1">
                <Maximize className="h-3.5 w-3.5" />
                {property.areaSqm} ตร.ม.
              </span>
            </div>

            {/* Location */}
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
