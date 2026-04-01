"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/mock-data";

export default function HeroSection() {
  return (
    <section className="bg-[#F5F0E8] py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-[#1B4D3E] leading-snug">
              {SITE_CONFIG.headline}
            </h1>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {SITE_CONFIG.subHeadline}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                href="/buy"
                className="inline-flex items-center justify-center rounded-lg bg-[#1B4D3E] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-[#2A6B56] transition-colors"
              >
                ดูทรัพย์แนะนำ
              </Link>
              <Link
                href={SITE_CONFIG.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border-2 border-[#D4A843] px-6 py-3 text-sm font-semibold text-[#D4A843] hover:bg-[#D4A843] hover:text-white transition-colors"
              >
                ปรึกษาพิมฟรี
              </Link>
            </div>
          </motion.div>

          {/* Right: Pim image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="flex justify-center"
          >
            <img
              src={SITE_CONFIG.pim.heroImage}
              alt={SITE_CONFIG.pim.fullName}
              className="rounded-2xl shadow-xl w-full max-w-md object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
