"use client"

import { motion } from "framer-motion"
import { Heart, Shield, Star } from "lucide-react"

const VALUES = [
  {
    icon: Heart,
    titleTH: "เข้าใจทุกความต้องการ",
    titleEN: "Understand Your Needs",
    descTH:
      "บริการ 2 ภาษา เจาะลึกทำเลทอง (กทม., สมุทรปราการ, EEC, ชลบุรี และพื้นที่นิคมอุตสาหกรรม) ค้นหาและจับคู่ทรัพย์ตรงใจรวดเร็ว",
    descEN:
      "Bilingual experts ready to match you with the perfect property in prime locations including Bangkok, Samut Prakan, EEC, and Chonburi.",
    color: "#E85D75",
  },
  {
    icon: Shield,
    titleTH: "บริการครบวงจรที่เดียว",
    titleEN: "All-In-One Seamless Services",
    descTH:
      "ดูแลตั้งแต่เริ่มหาเช่า, ซื้อ, ขาย-ปล่อยเช่า ประสานงานหาลูกค้า หาทรัพย์ สัญญา สินเชื่อ จนถึงวันโอนกรรมสิทธิ์ ปลอดภัย ไร้กังวล 100%",
    descEN:
      "End-to-end support from property search and loan coordination to a secure ownership transfer.",
    color: "#1B4D3E",
  },
  {
    icon: Star,
    titleTH: "เครือข่ายทีมงานคุณภาพ",
    titleEN: "Quality Network & Screened Properties",
    descTH: "คัดกรองทรัพย์ทุกหลังด้วยสายตานักลงทุน มั่นใจได้ว่าคุ้มค่าและน่าอยู่จริง",
    descEN:
      "Properties carefully curated by investor-minded experts, ensuring true value and livability.",
    color: "#D4A843",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function CoreValues() {
  return (
    <section className="bg-[#F5F0E8] py-16">
      <div className="container mx-auto max-w-5xl px-4">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-[#1B4D3E] md:text-3xl">
            ทำไมต้องเลือกบ้านไออุ่น? | Why Choose Baan Ai Oun?
          </h2>
          <p className="mt-2 text-sm font-medium text-[#1B4D3E]/80 md:text-base">
            ศูนย์รวมอสังหาในไทยและเครือข่ายนายหน้า บริการซื้อ-ขาย-เช่า ครบจบทุกขั้นตอน ดูแลลูกค้าคนไทยและต่างชาติแบบไร้รอยต่อในที่เดียว
          </p>
          <p className="mt-1 text-xs italic text-gray-500 md:text-sm">
            The Premier Thai Real Estate Hub &amp; Agent Network – Seamless Buy, Sell, and Rent
            Solutions for Local &amp; International Clients.
          </p>
        </div>

        {/* 3 Cards */}
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {VALUES.map((value) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.titleTH}
                variants={cardVariants}
                className="flex flex-col items-center gap-4 rounded-2xl bg-white p-8 text-center shadow-sm"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${value.color}18` }}
                >
                  <Icon size={28} style={{ color: value.color }} />
                </div>
                <h3 className="text-sm font-bold text-gray-900 md:text-base">
                  {value.titleTH}
                  <span className="mt-0.5 block text-xs font-medium text-gray-500">
                    {value.titleEN}
                  </span>
                </h3>
                <div>
                  <p className="text-sm leading-relaxed text-gray-600">{value.descTH}</p>
                  <p className="mt-2 text-xs leading-relaxed text-gray-400">{value.descEN}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
