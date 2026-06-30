"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Shield, Star } from "lucide-react"

const VALUES = [
  {
    icon: Heart,
    titleTH: "เข้าใจทุกความต้องการ ทลายกำแพงภาษา",
    titleEN: "Understanding Needs & Bridging Gaps",
    description:
      "เราเข้าใจหัวอกคนหาบ้านและเจ้าของทรัพย์ เราช่วยตัดปัญหาเรื่องการสื่อสารที่ยุ่งยาก รองรับทั้งลูกค้าชาวไทยและต่างชาติ เพื่อค้นหาและจับคู่ทรัพย์ในทำเลศักยภาพที่มีความต้องการสูง เช่น กรุงเทพฯ, ปริมณฑล, EEC, ชลบุรี, ฉะเชิงเทรา และทำเลอื่นๆ ทั่วประเทศ",
    color: "#E85D75",
  },
  {
    icon: Shield,
    titleTH: "บริการครบวงจรจบที่เดียว",
    titleEN: "All-in-One Seamless Services",
    description:
      "เปลี่ยนเรื่องปวดหัวให้เป็นเรื่องง่าย เราดูแลเคียงข้างคุณทุกขั้นตอน ตั้งแต่การค้นหาทรัพย์ที่ใช่ การเจรจาต่อรอง บริการที่ปรึกษาสินเชื่อฟรี การจัดการเอกสารและสัญญาที่ซับซ้อน ไปจนถึงวันโอนกรรมสิทธิ์และส่งมอบกุญแจ ปลอดภัย ไร้กังวล 100%",
    color: "#1B4D3E",
  },
  {
    icon: Star,
    titleTH: "เครือข่ายทีมงาน คัดกรองด้วยหัวใจ",
    titleEN: "Team Network & Quality Screened",
    description:
      "เราทำงานเป็นทีมร่วมกับเครือข่ายนายหน้าทั่วประเทศ นำทรัพย์ที่ซ่อนอยู่ในระบบมาเปิดเผยให้คุณเข้าถึงได้ง่ายขึ้น ทุกหลังผ่านการลงพื้นที่และคัดสรรด้วยหัวใจ ไม่ใช่แค่เน้นปิดการขาย แต่ต้องมั่นใจว่าเป็นทรัพย์ที่ 'น่าอยู่จริง' และคุ้มค่าที่สุดสำหรับคุณ",
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
        <div className="mb-4 text-center">
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

        {/* Intro paragraph */}
        <p className="mx-auto mb-10 max-w-3xl text-center text-sm leading-relaxed text-gray-700 md:text-base">
          ในปัจจุบันที่อสังหาริมทรัพย์มีให้เลือกมากมาย แต่ผู้ซื้อและผู้เช่ากลับ
          {" "}&ldquo;หาบ้านที่ตรงใจไม่เจอ&rdquo; ในขณะที่เจ้าของทรัพย์ก็ประสบปัญหา
          {" "}&ldquo;ปล่อยขาย/เช่าไม่ออก&rdquo;{" "}
          โดยเฉพาะลูกค้าชาวต่างชาติที่ต้องเผชิญกำแพงภาษา บ้านไออุ่น พร็อพเพอร์ตี้ จึงเข้ามาเป็น{" "}
          <strong>&ldquo;ศูนย์กลาง&rdquo;</strong>{" "}
          ที่รวบรวมทรัพย์ เครือข่ายนายหน้า (Co-Agent) และทีมงานมืออาชีพไว้ในที่เดียว
          เพื่อเปลี่ยนทุกความยุ่งยากให้เป็นความอุ่นใจ
        </p>

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
                <p className="text-sm leading-relaxed text-gray-600">{value.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Join Our Ecosystem strip */}
        <motion.div
          className="mt-10 rounded-2xl bg-[#1B4D3E] px-8 py-8 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-bold md:text-xl">
            เติบโตไปด้วยกันกับครอบครัวบ้านไออุ่น | Join Our Ecosystem
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
            ความต้องการที่อยู่อาศัยยังคงเพิ่มขึ้นอย่างต่อเนื่อง บ้านไออุ่นจึงเปิดโอกาสให้ผู้ที่อยากมีรายได้
            อยากเริ่มต้นอาชีพนายหน้าอสังหาฯ แต่ &ldquo;ไม่มีทุนและไม่มีประสบการณ์&rdquo;
            ได้เข้ามาเรียนรู้และลงมือทำจริงไปพร้อมกับทีมงานของเรา
          </p>
          <Link
            href="/co-agent"
            className="mt-5 inline-flex items-center gap-1.5 rounded-lg border-2 border-white/40 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            เรียนรู้เพิ่มเติม →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
