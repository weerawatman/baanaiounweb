"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Home, Search } from "lucide-react"
import { SITE_CONFIG } from "@/config/site"
import { HERO } from "@/content/homepage"

interface HeroSectionProps {
  heroImage?: string
}

export default function HeroSection({ heroImage }: HeroSectionProps) {
  const background = heroImage || SITE_CONFIG.pim.heroImage

  return (
    <section className="relative isolate overflow-hidden">
      {/* Background image (warm family/home) + overlay for text legibility */}
      <Image
        src={background}
        alt="บ้านไออุ่น พร็อพเพอร์ตี้ — บ้านอบอุ่นสำหรับครอบครัว"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          {/* H1 — ไทย (เด่น) + อังกฤษ (รอง) */}
          <h1 className="text-white">
            <span className="block text-3xl leading-snug font-bold sm:text-4xl lg:text-5xl">
              {HERO.h1Th}
            </span>
            <span className="mt-3 block text-lg font-medium text-white/85 sm:text-xl">
              {HERO.h1En}
            </span>
          </h1>

          {/* คำบรรยายรอง 2 ภาษา */}
          <p className="mt-6 max-w-2xl">
            <span className="block text-base text-white/90 sm:text-lg">{HERO.subTh}</span>
            <span className="mt-1 block text-sm text-white/75 sm:text-base">{HERO.subEn}</span>
          </p>

          {/* ปุ่ม CTA แยกบริการ — ทั้งคู่ → /request (แท็บตามบริการ) */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={HERO.ctaThai.href}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1B4D3E] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#163f33]"
            >
              <Home className="size-5" />
              {HERO.ctaThai.th} | {HERO.ctaThai.en}
            </Link>
            <Link
              href={HERO.ctaIntl.href}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#E8833A] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#d4742f]"
            >
              <Search className="size-5" />
              {HERO.ctaIntl.th} | {HERO.ctaIntl.en}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
