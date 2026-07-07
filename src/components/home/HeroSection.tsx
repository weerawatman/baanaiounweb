"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Home, Search } from "lucide-react"
import { SITE_CONFIG } from "@/config/site"
import { HERO } from "@/content/homepage"
import HeroSearchBar from "./HeroSearchBar"

interface HeroSectionProps {
  heroImage?: string
  districts: string[]
}

export default function HeroSection({ heroImage, districts }: HeroSectionProps) {
  const background = heroImage || SITE_CONFIG.pim.heroImage

  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={background}
        alt="บ้านไออุ่น พร็อพเพอร์ตี้ — บ้านอบอุ่นสำหรับครอบครัว"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="text-white">
            <span className="block text-3xl leading-snug font-bold sm:text-4xl lg:text-5xl">
              {HERO.h1Th}
            </span>
            <span className="mt-1 block text-2xl leading-snug font-bold sm:text-3xl lg:text-4xl">
              {HERO.h1Th2}
            </span>
            <span className="mt-3 block text-lg font-medium text-white/85 sm:text-xl">
              {HERO.h1En}
            </span>
            <span className="mt-0.5 block text-base font-medium text-white/75 sm:text-lg">
              {HERO.h1En2}
            </span>
          </h1>

          <HeroSearchBar districts={districts} />

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={HERO.ctaThai.href}
              className="inline-flex items-center gap-2 rounded-lg bg-[#E8833A] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#d4742f]"
            >
              <Home className="size-4" />
              <span>{HERO.ctaThai.th}</span>
              <span className="text-xs font-medium text-white/85">| {HERO.ctaThai.en}</span>
            </Link>
            <Link
              href={HERO.ctaIntl.href}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-colors hover:bg-primary/90"
            >
              <Search className="size-4" />
              <span>{HERO.ctaIntl.th}</span>
              <span className="text-xs font-medium text-primary-foreground/85">
                | {HERO.ctaIntl.en}
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
