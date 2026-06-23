"use client"

import { motion } from "framer-motion"
import { Heart, Shield, Star } from "lucide-react"

const VALUES = [
  {
    icon: Heart,
    title: "เข้าใจคนไกลบ้าน",
    description: "พิมเคยเป็นคนไกลบ้านเหมือนกัน จึงเข้าใจทุกความต้องการ",
    color: "#E85D75",
  },
  {
    icon: Shield,
    title: "บริการครบวงจร",
    description: "ตั้งแต่หาบ้าน กู้สินเชื่อ จนถึงส่งมอบกุญแจ",
    color: "#1B4D3E",
  },
  {
    icon: Star,
    title: "คัดกรองด้วยหัวใจ",
    description: "ทุกหลังผ่านการคัดสรร ไม่ใช่แค่ขาย แต่ต้องน่าอยู่จริง",
    color: "#D4A843",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function CoreValues() {
  return (
    <section className="bg-[#F5F0E8] py-16">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-[#1B4D3E] md:text-3xl">
            ทำไมต้องเลือกบ้านไออุ่น?
          </h2>
          <p className="mt-3 text-sm text-gray-600 md:text-base">
            เพราะเราไม่ได้แค่ขายบ้าน แต่ดูแลคุณทุกขั้นตอน
          </p>
        </div>

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
                key={value.title}
                variants={cardVariants}
                className="flex flex-col items-center gap-4 rounded-2xl bg-white p-8 text-center shadow-sm"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${value.color}18` }}
                >
                  <Icon size={28} style={{ color: value.color }} />
                </div>
                <h3 className="text-base font-bold text-gray-900">{value.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{value.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
