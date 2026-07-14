import { MessageCircle, Phone } from "lucide-react"
import { SITE_CONFIG } from "@/config/site"

export default function UnderConstructionPage() {
  const phoneHref = `tel:${SITE_CONFIG.phone.replace(/-/g, "")}`

  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,color-mix(in_srgb,var(--primary)_18%,transparent),transparent_55%),radial-gradient(ellipse_at_90%_10%,color-mix(in_srgb,var(--secondary)_22%,transparent),transparent_45%),linear-gradient(180deg,var(--background)_0%,color-mix(in_srgb,var(--primary-subtle)_70%,var(--background))_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232d5a27' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-16 sm:px-8 sm:py-20">
        <p className="animate-[fade-up_0.6s_ease-out_both] font-heading text-sm font-semibold tracking-[0.12em] text-secondary uppercase sm:text-base">
          {SITE_CONFIG.name}
          <span className="mt-1 block font-sans text-xs font-medium tracking-normal text-muted-foreground normal-case sm:text-sm">
            {SITE_CONFIG.nameEn}
          </span>
        </p>

        <h1 className="mt-8 animate-[fade-up_0.7s_ease-out_0.08s_both] font-heading text-4xl leading-[1.15] font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
          กำลังเตรียมเปิดตัวอย่างเป็นทางการ
          <span className="mt-3 block text-2xl font-semibold text-primary sm:text-3xl lg:text-[2rem]">
            We&apos;re getting ready to open
          </span>
        </h1>

        <p className="mt-6 max-w-xl animate-[fade-up_0.7s_ease-out_0.16s_both] text-base leading-relaxed text-foreground/85 sm:text-lg">
          อีกไม่นานคุณจะได้ค้นหาบ้าน ฝากขาย และปรึกษาพิมได้ที่นี่
          <span className="mt-2 block text-sm leading-relaxed text-muted-foreground sm:text-base">
            Property search, listings, and free consultation with Pim — launching soon.
          </span>
        </p>

        <div className="mt-10 flex animate-[fade-up_0.7s_ease-out_0.24s_both] flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={SITE_CONFIG.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            <MessageCircle className="size-4 shrink-0" aria-hidden />
            ทัก LINE {SITE_CONFIG.lineId}
          </a>
          <a
            href={phoneHref}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Phone className="size-4 shrink-0" aria-hidden />
            โทร {SITE_CONFIG.phone}
          </a>
        </div>

        <p className="mt-12 animate-[fade-up_0.7s_ease-out_0.32s_both] text-xs tracking-wide text-muted-foreground sm:text-sm">
          {SITE_CONFIG.slogan}
        </p>
      </div>
    </main>
  )
}
