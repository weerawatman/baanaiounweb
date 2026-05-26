"use client"

import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"

interface PainPointsHeroProps {
  headline: string
  points: string[]
  className?: string
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12 },
  }),
}

export default function PainPointsHero({ headline, points, className }: PainPointsHeroProps) {
  return (
    <section className={`bg-gradient-to-b from-[#F5F0E8] to-white py-16 sm:py-24 ${className ?? ""}`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <h1 className="text-3xl font-bold tracking-tight text-[#1B4D3E] sm:text-4xl lg:text-5xl whitespace-pre-line leading-tight">
            {headline}
          </h1>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2"
          initial="hidden"
          animate="visible"
        >
          {points.map((point, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-3 rounded-xl bg-white p-5 shadow-sm ring-1 ring-foreground/5"
              variants={fadeUp}
              custom={i + 1}
            >
              <AlertCircle className="mt-0.5 size-5 shrink-0 text-amber-500" />
              <p className="text-sm leading-relaxed text-gray-700 sm:text-base">{point}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
