"use client"

import { useState } from "react"
import { SITE_CONFIG } from "@/config/site"

export default function NewsletterBanner() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        className="mb-12 rounded-2xl bg-primary px-6 py-10 text-center text-primary-foreground sm:px-10"
        data-testid="newsletter-banner"
      >
        <p className="text-lg font-bold">ขอบคุณที่สมัครรับข่าวสารค่ะ!</p>
        <p className="mt-2 text-sm text-primary-foreground/80">
          Thank you! Follow us on LINE for the latest updates:{" "}
          <a href={SITE_CONFIG.lineUrl} className="underline">
            {SITE_CONFIG.lineId}
          </a>
        </p>
      </div>
    )
  }

  return (
    <div
      className="mb-12 rounded-2xl bg-primary px-6 py-10 text-center text-primary-foreground sm:px-10"
      data-testid="newsletter-banner"
    >
      <h3 className="text-xl font-bold sm:text-2xl">ไม่พลาดทุกเคสรีโนเวทและทำเลทอง</h3>
      <p className="mt-1 text-base font-medium text-primary-foreground/85">
        Never miss renovation case studies and prime locations
      </p>
      <p className="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/80">
        สมัครรับข่าวสารจากเรา เพื่อรับเคล็ดลับอสังหาฯ อัปเดตทำเลน่าลงทุน และเคสศึกษาฉบับเจาะลึก
      </p>
      <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="กรอกอีเมลของคุณ... | Your email"
          className="flex-1 rounded-full border-0 px-5 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <button
          type="submit"
          className="rounded-full bg-secondary px-6 py-3 text-sm font-bold text-secondary-foreground transition-opacity hover:opacity-90"
        >
          ติดตามข่าวสาร | Subscribe
        </button>
      </form>
    </div>
  )
}
