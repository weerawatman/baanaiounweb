"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { SITE_CONFIG } from "@/config/site"

export default function StickyCTA({ lineUrl }: { lineUrl: string }) {
  const url = lineUrl || SITE_CONFIG.lineUrl
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        aria-label="ปรึกษาพิมฟรีผ่าน LINE"
      >
        <MessageCircle className="size-5 shrink-0" />
        ปรึกษาพิมฟรี
      </motion.a>
    </div>
  )
}
