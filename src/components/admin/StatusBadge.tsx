import { Badge } from "@/components/ui/badge"

const PROPERTY_STATUS: Record<string, { label: string; className: string }> = {
  ACTIVE: {
    label: "เผยแพร่",
    className: "bg-green-100 text-green-700 border-green-200",
  },
  SOLD: {
    label: "ขายแล้ว",
    className: "bg-gray-100 text-gray-600 border-gray-200",
  },
  RENTED: {
    label: "เช่าแล้ว",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
}

const LEAD_STATUS: Record<string, { label: string; className: string }> = {
  new: {
    label: "ใหม่",
    className: "bg-amber-100 text-amber-700 border-amber-200",
  },
  contacted: {
    label: "ติดต่อแล้ว",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  closed: {
    label: "ปิดแล้ว",
    className: "bg-green-100 text-green-700 border-green-200",
  },
}

interface StatusBadgeProps {
  status: string
  variant?: "property" | "lead"
}

export function StatusBadge({ status, variant = "property" }: StatusBadgeProps) {
  const map = variant === "lead" ? LEAD_STATUS : PROPERTY_STATUS
  const cfg = map[status] ?? {
    label: status,
    className: "bg-gray-100 text-gray-600 border-gray-200",
  }

  return (
    <Badge variant="outline" className={cfg.className}>
      {cfg.label}
    </Badge>
  )
}
