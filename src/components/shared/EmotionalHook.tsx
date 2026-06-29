import { Heart } from "lucide-react"

interface EmotionalHookProps {
  quote: string
  quoteEn?: string
  message: string
  messageEn?: string
  className?: string
}

export default function EmotionalHook({
  quote,
  quoteEn,
  message,
  messageEn,
  className,
}: EmotionalHookProps) {
  return (
    <section className={`bg-[#F5F0E8] py-16 sm:py-20 ${className ?? ""}`}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div
          className="flex flex-col items-center gap-6 text-center"
          style={{ animation: "fade-up 0.6s ease both" }}
        >
          <Heart className="size-8 text-[#D4A843]" />
          <blockquote className="text-xl font-bold leading-relaxed text-[#1B4D3E] sm:text-2xl">
            &ldquo;{quote}&rdquo;
          </blockquote>
          {quoteEn && (
            <blockquote className="text-base font-medium italic leading-relaxed text-[#D4A843]/80">
              &ldquo;{quoteEn}&rdquo;
            </blockquote>
          )}
          <p className="max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">{message}</p>
          {messageEn && (
            <p className="max-w-2xl text-sm leading-relaxed text-gray-500">{messageEn}</p>
          )}
        </div>
      </div>
    </section>
  )
}
