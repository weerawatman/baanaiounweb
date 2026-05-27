import { MapPin, Building2, Heart, ShoppingBag } from "lucide-react"
import { type Property } from "@/types"
import { SITE_CONFIG } from "@/config/site"

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
    <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
      <div className="mt-0.5 shrink-0 text-green-700">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  )
}

export default function LocationIntelligence({
  property,
}: LocationIntelligenceProps) {
  const { location } = property

  return (
    <div className="flex flex-col gap-4">
      {/* Google Maps embed */}
      <div className="overflow-hidden rounded-xl border border-border">
        <iframe
          src={SITE_CONFIG.googleMapsEmbed}
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

      {/* Location label */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4 shrink-0 text-green-700" />
        <span>
          {location.subdistrict}, {location.district}
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
