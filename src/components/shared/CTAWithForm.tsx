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
    <section id="cta-form" className={`py-8 lg:py-10 ${className ?? ""}`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {!showForm ? (
          <motion.div
            className="flex flex-col items-center gap-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-2xl font-bold text-primary sm:text-3xl">
              พร้อมเริ่มต้นหรือยัง?
              <span className="mt-1 block text-base font-medium text-secondary">
                Ready to Get Started?
              </span>
            </h2>
            <p className="max-w-xl text-muted-foreground">
              คุยง่าย ตรงไปตรงมา พร้อมดูแลทุกเคสด้วยความจริงใจ
              <span className="mt-1 block text-sm text-muted-foreground/80">
                Straightforward communication, handling every case with sincerity.
              </span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {primary.action === "form" ? (
                <Button
                  className="h-auto max-w-full gap-2 whitespace-normal bg-primary px-8 py-2.5 text-white hover:bg-primary/90"
                  size="lg"
                  onClick={() => setShowForm(true)}
                >
                  <MessageCircle className="size-4" />
                  {primary.label}
                </Button>
              ) : (
                <Link href={primary.href ?? "#"} className="max-w-full">
                  <Button
                    className="h-auto max-w-full gap-2 whitespace-normal bg-primary px-8 py-2.5 text-white hover:bg-primary/90"
                    size="lg"
                  >
                    {primary.label}
                  </Button>
                </Link>
              )}

              {secondary.href && (
                <Link href={secondary.href} className="max-w-full">
                  <Button
                    variant="outline"
                    className="h-auto max-w-full gap-2 whitespace-normal border-secondary px-8 py-2.5 text-secondary hover:bg-secondary hover:text-secondary-foreground"
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
                className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground"
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
