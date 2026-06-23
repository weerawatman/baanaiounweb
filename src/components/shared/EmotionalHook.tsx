"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

interface EmotionalHookProps {
  quote: string
  message: string
  className?: string
}

export default function EmotionalHook({ quote, message, className }: EmotionalHookProps) {
  return (
    <section className={`bg-[#F5F0E8] py-16 sm:py-20 ${className ?? ""}`}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-center gap-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Heart className="size-8 text-[#D4A843]" />
          <blockquote className="text-xl leading-relaxed font-bold text-[#1B4D3E] sm:text-2xl">
            &ldquo;{quote}&rdquo;
          </blockquote>
          <p className="max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">{message}</p>
        </motion.div>
      </div>
    </section>
  )
}
