import { Phone, MessageCircle } from "lucide-react"
import WhatsAppIcon from "@/components/shared/WhatsAppIcon"

interface MobileContactBarProps {
  phone: string
  lineUrl: string
  whatsappUrl: string
}

/**
 * Sticky bottom quick-contact bar — mobile only (hidden on md+ where the
 * floating LINE pill in StickyCTA takes over).
 */
export default function MobileContactBar({ phone, lineUrl, whatsappUrl }: MobileContactBarProps) {
  const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`

  const itemClass =
    "flex min-h-[56px] flex-col items-center justify-center gap-0.5 text-[11px] font-semibold"

  return (
    <nav
      aria-label="ติดต่อด่วน | Quick contact"
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_10px_rgba(0,0,0,0.08)] md:hidden"
    >
      <a href={telHref} className={`${itemClass} text-[#1B4D3E]`} aria-label={`โทร ${phone}`}>
        <Phone className="size-5" />
        โทร | Call
      </a>
      <a
        href={lineUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${itemClass} text-[#06C755]`}
        aria-label="แชท LINE"
      >
        <MessageCircle className="size-5" />
        LINE
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${itemClass} text-[#25D366]`}
        aria-label="แชท WhatsApp"
      >
        <WhatsAppIcon className="size-5" />
        WhatsApp
      </a>
    </nav>
  )
}
