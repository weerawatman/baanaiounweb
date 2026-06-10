"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Bed, Bath, Maximize, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { type Property } from "@/types"

interface PropertyCardProps {
  property: Property
}

const statusConfig: Record<
  Property["status"],
  { label: string; className: string }
> = {
  ACTIVE: { label: "พร้อมขาย/เช่า", className: "bg-green-100 text-green-800 border-green-200" },
  SOLD: { label: "ขายแล้ว", className: "bg-red-100 text-red-800 border-red-200" },
  RENTED: { label: "ปล่อยเช่าแล้ว", className: "bg-blue-100 text-blue-800 border-blue-200" },
}

const typeConfig: Record<
  Property["type"],
  { label: string; className: string }
> = {
  SALE: { label: "ขาย", className: "bg-green-600 text-white" },
  RENT: { label: "เช่า", className: "bg-blue-600 text-white" },
  LAND: { label: "ที่ดิน", className: "bg-amber-500 text-white" },
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const status = statusConfig[property.status]
  const type = typeConfig[property.type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Link href={`/property/${property.slug}`} className="block h-full group">
        <Card className="h-full overflow-hidden transition-shadow duration-300 group-hover:shadow-xl group-hover:ring-foreground/20">
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <Image
              src={property.imagePrimary}
              alt={property.title}
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
            {/* First tag badge */}
            {property.tags[0] && (
              <span className="absolute bottom-3 left-3 inline-flex items-center rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                {property.tags[0]}
              </span>
            )}
          </div>

          <CardContent className="flex flex-col gap-2 pt-3">
            {/* Title */}
            <h3 className="font-medium text-sm leading-snug line-clamp-2 text-foreground">
              {property.title}
            </h3>

            {/* Price */}
            <p className="text-base font-semibold text-green-700">
              {property.priceLabel}
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
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
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{property.location.district}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
