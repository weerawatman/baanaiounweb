"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

interface SolutionsSectionProps {
  headline: string
  subtitle?: string
  description: string
  highlight?: string
  features: string[]
  className?: string
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

export default function SolutionsSection({
  headline,
  subtitle,
  description,
  highlight,
  features,
  className,
}: SolutionsSectionProps) {
  return (
    <section className={`py-16 sm:py-24 ${className ?? ""}`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Text content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-2xl font-bold tracking-tight text-[#1B4D3E] sm:text-3xl">
              {headline}
            </h2>
            {subtitle && (
              <p className="mt-2 text-lg font-medium text-[#D4A843]">{subtitle}</p>
            )}
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              {description}
            </p>
            {highlight && (
              <p className="mt-3 text-base font-semibold text-[#1B4D3E]">
                {highlight}
              </p>
            )}
          </motion.div>

          {/* Features checklist */}
          <motion.ul
            className="flex flex-col gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3 rounded-lg bg-[#1B4D3E]/5 px-5 py-4"
                variants={fadeUp}
                custom={i}
              >
                <CheckCircle className="mt-0.5 size-5 shrink-0 text-[#1B4D3E]" />
                <span className="text-sm leading-relaxed text-gray-700 sm:text-base">
                  {feature}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
