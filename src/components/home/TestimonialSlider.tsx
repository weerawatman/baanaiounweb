"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { Star } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { getPropertyCategoryLabelTh } from "@/content/form-options"
import { type Testimonial } from "@/types"

interface TestimonialSliderProps {
  testimonials: Testimonial[]
}

export default function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)
    onSelect()
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  return (
    <section className="bg-background py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-2xl font-bold text-primary md:text-3xl">
            เสียงจากลูกค้าบ้านไออุ่น
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            ความไว้วางใจคือรางวัลที่ดีที่สุดของพิม
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="min-w-0 flex-[0_0_100%] px-4">
                <div className="flex flex-col items-center gap-5 rounded-2xl bg-muted p-8 text-center shadow-[0_10px_30px_rgba(45,90,39,0.04)] md:p-10">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={18} className="fill-secondary text-secondary" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="max-w-2xl text-base leading-relaxed text-foreground italic md:text-lg">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  {/* Avatar + name */}
                  <div className="flex flex-col items-center gap-2">
                    <Avatar size="lg" className="size-14">
                      <AvatarImage src={testimonial.avatarUrl} alt={testimonial.clientName} />
                      <AvatarFallback>{testimonial.clientName.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-primary">
                        {testimonial.clientName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {getPropertyCategoryLabelTh(testimonial.propertyType)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation dots */}
        <div className="mt-6 flex justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                index === selectedIndex ? "bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
