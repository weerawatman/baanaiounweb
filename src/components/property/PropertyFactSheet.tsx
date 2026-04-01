import { Maximize, Bed, Bath, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { type Property } from "@/lib/mock-data"

interface PropertyFactSheetProps {
  property: Property
}

const statusLabel: Record<Property["status"], string> = {
  ACTIVE: "พร้อมขาย/เช่า",
  SOLD: "ขายแล้ว",
  RENTED: "ปล่อยเช่าแล้ว",
}

const statusClass: Record<Property["status"], string> = {
  ACTIVE: "text-green-700",
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
    <div className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-muted/40 p-4 text-center">
      <div className="text-green-700">{icon}</div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-sm font-semibold ${valueClassName ?? "text-foreground"}`}>
        {value}
      </p>
    </div>
  )
}

export default function PropertyFactSheet({ property }: PropertyFactSheetProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Fact grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <FactItem
          icon={<Maximize className="h-5 w-5" />}
          label="พื้นที่"
          value={`${property.areaSqm} ตร.ม.`}
        />
        {property.bedrooms > 0 && (
          <FactItem
            icon={<Bed className="h-5 w-5" />}
            label="ห้องนอน"
            value={`${property.bedrooms} ห้อง`}
          />
        )}
        {property.bathrooms > 0 && (
          <FactItem
            icon={<Bath className="h-5 w-5" />}
            label="ห้องน้ำ"
            value={`${property.bathrooms} ห้อง`}
          />
        )}
        <FactItem
          icon={<CheckCircle className="h-5 w-5" />}
          label="สถานะ"
          value={statusLabel[property.status]}
          valueClassName={statusClass[property.status]}
        />
      </div>

      {/* Amenities */}
      {property.amenities.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">
            สิ่งอำนวยความสะดวก
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
