import { MapPin, Building2, Heart, ShoppingBag } from "lucide-react"
import { type Property } from "@/types"

interface LocationIntelligenceProps {
  property: Property
}

interface DistanceCardProps {
  icon: React.ReactNode
  label: string
  value: string
}

function DistanceCard({ icon, label, value }: DistanceCardProps) {
  return (
    <div className="border-border bg-muted/40 flex items-start gap-3 rounded-xl border p-4">
      <div className="mt-0.5 shrink-0 text-green-700">{icon}</div>
      <div>
        <p className="text-muted-foreground text-xs">{label}</p>
        <p className="text-foreground text-sm font-semibold">{value}</p>
      </div>
    </div>
  )
}

export default function LocationIntelligence({ property }: LocationIntelligenceProps) {
  const { location } = property

  // สร้างแผนที่จากพิกัดจริงของทรัพย์; ถ้าไม่มีพิกัดใช้ชื่อตำบล/อำเภอแทน
  const hasCoords =
    location.lat != null && location.lng != null && location.lat !== 0 && location.lng !== 0
  const mapQuery = hasCoords
    ? `${location.lat},${location.lng}`
    : encodeURIComponent([location.subdistrict, location.district].filter(Boolean).join(" "))
  const mapSrc = mapQuery
    ? `https://maps.google.com/maps?q=${mapQuery}&z=15&output=embed&hl=th`
    : null

  return (
    <div className="flex flex-col gap-4">
      {/* Google Maps embed — ใช้พิกัดของทรัพย์ */}
      {mapSrc && (
        <div className="border-border overflow-hidden rounded-xl border">
          <iframe
            src={mapSrc}
            title={`แผนที่ ${property.title}`}
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

      {/* Location label */}
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <MapPin className="h-4 w-4 shrink-0 text-green-700" />
        <span>
          {location.subdistrict}
          {location.subdistrict && location.district ? ", " : ""}
          {location.district}
        </span>
      </div>

      {/* Distance cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <DistanceCard
          icon={<Building2 className="h-5 w-5" />}
          label={`ระยะห่างจากนิคม (${location.nearestIndustrialEstate})`}
          value={location.distanceToAmata}
        />
        <DistanceCard
          icon={<Heart className="h-5 w-5" />}
          label="ระยะห่างจากโรงพยาบาล"
          value={location.distanceToHospital}
        />
        <DistanceCard
          icon={<ShoppingBag className="h-5 w-5" />}
          label="ระยะห่างจากตลาด"
          value={location.distanceToMarket}
        />
      </div>
    </div>
  )
}
