import Link from "next/link";
import { Home, Key, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SERVICES = [
  {
    icon: Home,
    title: "ซื้อบ้าน",
    description: "คัดสรรบ้านคุณภาพ รีโนเวทพร้อมอยู่ และโครงการใหม่ ราคาดี ทำเลเด่นในชลบุรี",
    href: "/buy",
    color: "#1B4D3E",
  },
  {
    icon: Key,
    title: "เช่าบ้าน",
    description: "บ้านเช่ารายเดือนใกล้นิคมอุตสาหกรรม เฟอร์ครบ ราคาสบายกระเป๋า เลี้ยงสัตว์ได้",
    href: "/rent",
    color: "#2E75B6",
  },
  {
    icon: Users,
    title: "ฝากขาย/เช่า",
    description: "ฝากทรัพย์กับพิม ถ่ายรูปสวย ลงประกาศทุกช่อง คัดผู้ซื้อ/ผู้เช่าจริงจัง",
    href: "/owners",
    color: "#D4A843",
  },
];

export default function ServiceShortcuts() {
  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Link key={service.title} href={service.href} className="group block">
                <Card className="h-full transition-shadow duration-200 hover:shadow-lg hover:ring-2 hover:ring-[#1B4D3E]/20 cursor-pointer">
                  <CardContent className="flex flex-col items-center text-center gap-4 py-8 px-6">
                    <div
                      className="flex items-center justify-center w-14 h-14 rounded-2xl"
                      style={{ backgroundColor: `${service.color}18` }}
                    >
                      <Icon size={28} style={{ color: service.color }} />
                    </div>
                    <h3
                      className="text-lg font-bold"
                      style={{ color: service.color }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
