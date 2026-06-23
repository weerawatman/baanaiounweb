import Link from "next/link"
import { Home, Search, Users, GraduationCap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const ICON_MAP = { Home, Search, Users, GraduationCap } as const

const SERVICES = [
  {
    icon: "Home" as const,
    title: "ฝากขาย / ปล่อยเช่า",
    description:
      "หมดกังวลเรื่องหาคนซื้อหรือคนเช่า เราช่วยดูแลตั้งแต่ประเมินราคา ทำการตลาด จนปิดดีล",
    href: "/owners",
    color: "#D4A843",
    target: "สำหรับเจ้าของทรัพย์",
  },
  {
    icon: "Search" as const,
    title: "หาบ้าน / ที่ดิน",
    description: "บอกสเปกและงบ เราช่วยจัดหาให้ตรงใจ พร้อมช่วยกู้สินเชื่อฟรี!",
    href: "/buy",
    color: "#1B4D3E",
    target: "สำหรับผู้หาซื้อ/เช่า",
  },
  {
    icon: "Users" as const,
    title: "Co-Agent เครือข่าย",
    description: "ฝากทรัพย์เข้าระบบฟรี! ช่วยทำการตลาด คัดกรองลูกค้า วิน-วิน ทุกฝ่าย",
    href: "/co-agent",
    color: "#2E75B6",
    target: "สำหรับนายหน้า/เอเจนต์",
  },
  {
    icon: "GraduationCap" as const,
    title: "สร้างรายได้กับอสังหาฯ",
    description: "คอร์สสอนทำจริง จับมือทำ ไม่ต้องใช้ทุน เปลี่ยนความกลัวเป็นรายได้",
    href: "/academy",
    color: "#E85D75",
    target: "สำหรับผู้สนใจอาชีพ",
  },
]

export default function ServiceShortcuts() {
  return (
    <section className="bg-white py-14">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => {
            const Icon = ICON_MAP[service.icon]
            return (
              <Link key={service.title} href={service.href} className="group block">
                <Card className="h-full cursor-pointer transition-shadow duration-200 hover:shadow-lg hover:ring-2 hover:ring-[#1B4D3E]/20">
                  <CardContent className="flex flex-col items-center gap-3 px-5 py-8 text-center">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: `${service.color}18` }}
                    >
                      <Icon size={28} style={{ color: service.color }} />
                    </div>
                    <span
                      className="inline-block rounded-full px-3 py-0.5 text-xs font-medium"
                      style={{ backgroundColor: `${service.color}15`, color: service.color }}
                    >
                      {service.target}
                    </span>
                    <h3 className="text-base font-bold" style={{ color: service.color }}>
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
