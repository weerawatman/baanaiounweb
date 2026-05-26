"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MessageCircle, ArrowRight } from "lucide-react"
import HeroSection from "@/components/home/HeroSection"
import ServiceShortcuts from "@/components/home/ServiceShortcuts"
import CoreValues from "@/components/home/CoreValues"
import TestimonialSlider from "@/components/home/TestimonialSlider"
import FAQSection from "@/components/home/FAQSection"
import SectionTitle from "@/components/layout/SectionTitle"
import { MOCK_PROPERTIES, SITE_CONFIG } from "@/lib/mock-data"
import { HOMEPAGE_PAIN_POINTS } from "@/lib/page-content"
import PropertyCard from "@/components/property/PropertyCard"
import { Button } from "@/components/ui/button"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

export default function HomePage() {
  const featuredProperties = MOCK_PROPERTIES.filter((p) => p.featured)

  return (
    <>
      <title>บ้านไออุ่น พร็อพเพอร์ตี้ — มากกว่าที่พัก คือพลังกายพลังใจให้คุณไปต่อ</title>
      <meta name="description" content="บ้านไออุ่น คัดสรรบ้านขาย บ้านเช่า ที่ดิน ในเขตบ้านบึง ชลบุรี ใกล้นิคมอมตะ เหมราช โดยพิม นายหน้าที่ดูแลด้วยหัวใจ" />
      <meta property="og:title" content="บ้านไออุ่น พร็อพเพอร์ตี้ — มากกว่าที่พัก คือพลังกายพลังใจให้คุณไปต่อ" />
      <meta property="og:description" content="บ้านไออุ่น คัดสรรบ้านขาย บ้านเช่า ที่ดิน ในเขตบ้านบึง ชลบุรี ใกล้นิคมอมตะ เหมราช โดยพิม นายหน้าที่ดูแลด้วยหัวใจ" />

      <HeroSection />

      {/* Pain Points overview — ขยี้ปัญหา 4 กลุ่ม */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="คุณกำลังเจอปัญหาเหล่านี้อยู่หรือเปล่า?"
            subtitle="ไม่ว่าคุณจะเป็นใคร บ้านไออุ่นช่วยได้"
          />
          <motion.div
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {HOMEPAGE_PAIN_POINTS.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
              >
                <Link href={item.href} className="group block">
                  <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-[#1B4D3E]/20">
                    <span className="inline-block rounded-full bg-[#1B4D3E]/10 px-3 py-1 text-xs font-semibold text-[#1B4D3E]">
                      {item.target}
                    </span>
                    <p className="mt-3 text-sm font-medium text-gray-800 leading-relaxed">
                      {item.pain}
                    </p>
                    <p className="mt-2 text-xs text-[#D4A843] font-medium flex items-center gap-1">
                      {item.solution}
                      <ArrowRight className="size-3" />
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services — 4 กลุ่มบริการ */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <SectionTitle
          title="บริการครบวงจรของเรา"
          subtitle="ไม่ว่าคุณจะอยากขาย เช่า หาซื้อ หรือสร้างรายได้จากอสังหาฯ"
        />
        <ServiceShortcuts />
      </section>

      {/* Featured Properties */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <SectionTitle
          title="ทรัพย์แนะนำ"
          subtitle="คัดมาแล้วโดยพิม ทุกหลังน่าอยู่"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/buy">
            <Button variant="outline" className="gap-2 border-[#1B4D3E] text-[#1B4D3E] hover:bg-[#1B4D3E] hover:text-white">
              ดูทรัพย์ทั้งหมด
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </section>

      <CoreValues />

      <section className="py-12 px-4 max-w-6xl mx-auto">
        <SectionTitle
          title="เสียงจากลูกค้า"
          subtitle="คนที่เคยใช้บริการบ้านไออุ่น"
        />
        <TestimonialSlider />
      </section>

      <section className="py-12 px-4 max-w-4xl mx-auto">
        <SectionTitle
          title="คำถามที่พบบ่อย"
          subtitle="สงสัยอะไร ถามพิมได้เลยค่ะ"
        />
        <FAQSection />
      </section>

      {/* Homepage CTA — 3 ปุ่มแยกทาง */}
      <section className="bg-[#1B4D3E] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col items-center gap-6 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              ให้บ้านไออุ่นช่วยดูแลทุกเรื่องอสังหาฯ ของคุณ
            </h2>
            <p className="max-w-xl text-base text-white/80">
              คุยง่าย ตรงไปตรงมา พร้อมดูแลทุกเคสด้วยความจริงใจ
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={SITE_CONFIG.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-[#1B4D3E] hover:bg-white/90 transition-colors"
              >
                <MessageCircle className="size-4" />
                ทักแชทปรึกษาฟรี
              </a>
              <Link
                href="/buy"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white/40 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                ดูทรัพย์ทั้งหมดของเรา
              </Link>
              <Link
                href="/academy"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-[#D4A843] px-6 py-2.5 text-sm font-semibold text-[#D4A843] hover:bg-[#D4A843] hover:text-white transition-colors"
              >
                สนใจคอร์สนายหน้า
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
