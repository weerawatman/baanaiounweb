import Image from "next/image"
import { ImageIcon } from "lucide-react"

export interface BentoItem {
  image?: string
  alt: string
  badgeTh: string
  badgeEn: string
}

interface PortfolioBentoProps {
  items: BentoItem[]
}

function BentoCell({
  item,
  className,
  sizes,
}: {
  item: BentoItem
  className: string
  sizes: string
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-muted ${className}`}>
      {item.image ? (
        <Image src={item.image} alt={item.alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <div className="flex h-full min-h-[120px] flex-col items-center justify-center gap-2 p-4 text-center text-muted-foreground">
          <ImageIcon className="size-8 opacity-40" aria-hidden />
          <p className="text-xs">อัปโหลดรูปใน Admin &gt; โปรไฟล์</p>
        </div>
      )}
      <div className="absolute bottom-2 left-2 rounded-md bg-primary/90 px-2 py-1 text-[0.65rem] font-bold text-primary-foreground sm:bottom-3 sm:left-3 sm:px-3 sm:py-1.5 sm:text-xs">
        {item.badgeTh}
        <span className="mt-0.5 block font-medium text-primary-foreground/75">{item.badgeEn}</span>
      </div>
    </div>
  )
}

export default function PortfolioBento({ items }: PortfolioBentoProps) {
  if (items.length === 0) return null

  const [main, ...rest] = items

  return (
    <div
      className="mt-8 grid grid-cols-2 gap-3 sm:gap-4"
      data-testid="portfolio-bento"
    >
      <BentoCell
        item={main}
        className="col-span-2 aspect-[16/10] sm:col-span-1 sm:row-span-2 sm:aspect-auto sm:min-h-[280px]"
        sizes="(max-width: 640px) 100vw, 40vw"
      />
      {rest.map((item) => (
        <BentoCell
          key={item.alt}
          item={item}
          className="aspect-[4/3]"
          sizes="(max-width: 640px) 50vw, 25vw"
        />
      ))}
    </div>
  )
}
