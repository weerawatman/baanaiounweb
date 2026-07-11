import type { BentoItem } from "@/components/shared/PortfolioBento"

export interface BentoSlotMeta {
  alt: string
  badgeTh: string
  badgeEn: string
  badgeVariant?: "primary" | "orange"
}

/** รวมรูปจาก Admin กับข้อความจาก content — ช่องว่างแสดง placeholder บนหน้าเว็บ */
export function buildBentoItems(images: string[], slots: BentoSlotMeta[]): BentoItem[] {
  return slots.map((slot, i) => ({
    ...slot,
    image: images[i]?.trim() ?? "",
  }))
}

export function pickHeroImage(...candidates: (string | undefined)[]): string | undefined {
  for (const url of candidates) {
    if (url?.trim()) return url.trim()
  }
  return undefined
}
