"use client"

import { motion } from "framer-motion"
import { Heart, Shield, Star } from "lucide-react"
import PageSection from "@/components/layout/PageSection"
import SectionTitle from "@/components/layout/SectionTitle"

const VALUES = [
  {
    icon: Heart,
    titleTH: "เข้าใจทุกความต้องการ",
    titleEN: "Understand Your Needs",
    descTH:
      "บริการ 2 ภาษา ค้นหาและจับคู่ทรัพย์ในกรุงเทพฯ, สมุทรปราการ, EEC, ชลบุรี และพื้นที่นิคมอุตสาหกรรม",
    descEN:
      "Bilingual experts matching you with properties across Bangkok, Samut Prakan, EEC, and Chonburi.",
    color: "#E85D75",
  },
  {
    icon: Shield,
    titleTH: "บริการครบวงจรที่เดียว",
    titleEN: "All-In-One Seamless Services",
    descTH: "ดูแลตั้งแต่หาทรัพย์ สินเชื่อ สัญญา จนถึงวันโอนกรรมสิทธิ์",
    descEN: "End-to-end support from search and loans to secure ownership transfer.",
    color: "#1B4D3E",
  },
  {
    icon: Star,
    titleTH: "เครือข่ายทีมงานคุณภาพ",
    titleEN: "Quality Network & Screened Properties",
    descTH: "คัดกรองทรัพย์ทุกหลังด้วยสายตานักลงทุน",
    descEN: "Properties curated by investor-minded experts for true value.",
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
    <PageSection variant="warm">
      <SectionTitle
        title="ทำไมต้องเลือกบ้านไออุ่น? | Why Choose Baan Ai Oun"
        subtitle="ศูนย์รวมอสังหาและเครือข่ายนายหน้า บริการซื้อ-ขาย-เช่า ครบจบในที่เดียว"
      />

      <motion.div
        className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3"
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
              className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center shadow-sm"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${value.color}18` }}
              >
                <Icon size={28} style={{ color: value.color }} />
              </div>
              <h3 className="text-sm font-bold text-foreground md:text-base">
                {value.titleTH}
                <span className="mt-0.5 block text-xs font-medium text-muted-foreground">
                  {value.titleEN}
                </span>
              </h3>
              <div>
                <p className="text-sm leading-relaxed text-foreground/90">{value.descTH}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{value.descEN}</p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </PageSection>
  )
}
