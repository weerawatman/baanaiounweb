"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import PropertyForm from "./PropertyForm"

interface CTAAction {
  label: string
  action?: "form"
  href?: string
}

interface CTAWithFormProps {
  primary: CTAAction
  secondary: CTAAction
  formVariant: "owner" | "buyer" | "co-agent" | "academy"
  formPreselect?: "SALE" | "RENT" | "LAND"
  className?: string
}

export default function CTAWithForm({
  primary,
  secondary,
  formVariant,
  formPreselect,
  className,
}: CTAWithFormProps) {
  const [showForm, setShowForm] = useState(false)

  return (
    <section id="cta-form" className={`py-16 sm:py-24 ${className ?? ""}`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {!showForm ? (
          <motion.div
            className="flex flex-col items-center gap-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-[#1B4D3E] sm:text-3xl">พร้อมเริ่มต้นหรือยัง?</h2>
            <p className="max-w-xl text-gray-600">
              คุยง่าย ตรงไปตรงมา พร้อมดูแลทุกเคสด้วยความจริงใจ
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {primary.action === "form" ? (
                <Button
                  className="gap-2 bg-[#1B4D3E] px-8 py-2.5 text-white hover:bg-[#2A6B56]"
                  size="lg"
                  onClick={() => setShowForm(true)}
                >
                  <MessageCircle className="size-4" />
                  {primary.label}
                </Button>
              ) : (
                <Link href={primary.href ?? "#"}>
                  <Button
                    className="gap-2 bg-[#1B4D3E] px-8 py-2.5 text-white hover:bg-[#2A6B56]"
                    size="lg"
                  >
                    {primary.label}
                  </Button>
                </Link>
              )}

              {secondary.href && (
                <Link href={secondary.href}>
                  <Button
                    variant="outline"
                    className="gap-2 border-[#D4A843] px-8 py-2.5 text-[#D4A843] hover:bg-[#D4A843] hover:text-white"
                    size="lg"
                  >
                    {secondary.label}
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PropertyForm variant={formVariant} preselect={formPreselect} />
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-sm text-gray-400 underline underline-offset-2 hover:text-gray-600"
              >
                ยกเลิก กลับไปหน้าเดิม
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
