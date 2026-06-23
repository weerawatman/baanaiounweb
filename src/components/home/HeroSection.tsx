"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react"
import { SITE_CONFIG } from "@/config/site"
import { HERO_CONTENT } from "@/content/homepage"

type Lang = "th" | "en"

interface HeroSectionProps {
  heroImage?: string
  fullName?: string
  lineUrl?: string
}

export default function HeroSection({ heroImage, fullName, lineUrl }: HeroSectionProps) {
  const [lang, setLang] = useState<Lang>("th")
  const [activeTab, setActiveTab] = useState(0)

  const content = HERO_CONTENT[lang]
  const tab = content.tabs[activeTab]
  const lineHref = lineUrl || SITE_CONFIG.lineUrl

  function switchLang(newLang: Lang) {
    setLang(newLang)
    setActiveTab(0)
  }

  return (
    <section className="relative overflow-hidden bg-[#F5F0E8] py-14 md:py-20">
      {/* Language Toggle */}
      <div className="absolute top-4 right-4 z-10 sm:top-5 sm:right-6">
        <div className="flex rounded-full border border-[#1B4D3E]/20 bg-white p-1 shadow-sm">
          {(["th", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => switchLang(l)}
              aria-pressed={lang === l}
              className={`rounded-full px-3 py-1 text-xs font-bold tracking-wide transition-all ${
                lang === l ? "bg-[#1B4D3E] text-white shadow" : "text-gray-500 hover:text-[#1B4D3E]"
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
          {/* ── LEFT: Content ── */}
          <motion.div
            key={lang}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col gap-5"
          >
            {/* Headline */}
            <div>
              <h1 className="max-w-2xl text-3xl leading-normal font-bold whitespace-pre-line text-[#1B4D3E] md:text-4xl lg:text-5xl">
                {content.headline}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-gray-600 md:text-lg">
                {content.tagline}
              </p>
            </div>

            {/* Tab pills */}
            <div className="flex flex-wrap gap-2" role="tablist">
              {content.tabs.map((t, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={activeTab === i}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    activeTab === i
                      ? "bg-[#1B4D3E] text-white shadow-md"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-[#1B4D3E]/40 hover:text-[#1B4D3E]"
                  }`}
                >
                  <span aria-hidden="true">{t.icon}</span>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab content card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${lang}-${activeTab}`}
                role="tabpanel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                {/* Pain points */}
                <div>
                  <p className="mb-2 text-xs font-semibold tracking-wide text-red-500 uppercase">
                    {lang === "th" ? "ปัญหาที่คุณเจออยู่" : "Challenges You Face"}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {tab.pains.map((pain, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-400" aria-hidden />
                        {pain}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-100" />

                {/* Solutions */}
                <div>
                  <p className="mb-2 text-xs font-semibold tracking-wide text-[#1B4D3E] uppercase">
                    {lang === "th" ? "บ้านไออุ่นช่วยได้" : "How We Help"}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {tab.solutions.map((sol, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2
                          className="mt-0.5 size-4 shrink-0 text-[#1B4D3E]"
                          aria-hidden
                        />
                        {sol}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Primary CTA */}
                <Link
                  href={tab.cta.href}
                  className="inline-flex items-center gap-2 self-start rounded-lg bg-[#D4A843] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#C49030]"
                >
                  {tab.cta.label}
                  <ArrowRight className="size-4" />
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Secondary LINE CTA */}
            <p className="text-sm text-gray-500">
              {lang === "th" ? (
                <>
                  หรือ{" "}
                  <a
                    href={lineHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#1B4D3E] underline-offset-2 hover:underline"
                  >
                    ทักแชทพิมฟรีเลย →
                  </a>
                </>
              ) : (
                <>
                  Or{" "}
                  <a
                    href={lineHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#1B4D3E] underline-offset-2 hover:underline"
                  >
                    chat with us for free →
                  </a>
                </>
              )}
            </p>
          </motion.div>

          {/* ── RIGHT: Pim image ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex justify-center lg:sticky lg:top-24"
          >
            <Image
              src={heroImage || SITE_CONFIG.pim.heroImage}
              alt={fullName || SITE_CONFIG.pim.fullName}
              width={800}
              height={600}
              priority
              className="w-full max-w-md rounded-2xl object-cover shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
