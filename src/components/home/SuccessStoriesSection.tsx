"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import BeforeAfterSlider from "@/components/shared/BeforeAfterSlider"
import { filterDisplayableSuccessStoryViews } from "@/lib/success-stories-display"
import { type SuccessStory } from "@/types"

interface SuccessStoriesSectionProps {
  stories: SuccessStory[]
}

export default function SuccessStoriesSection({ stories }: SuccessStoriesSectionProps) {
  const displayableStories = filterDisplayableSuccessStoryViews(stories)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: displayableStories.length > 1 })
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

  if (displayableStories.length === 0) return null

  return (
    <section className="bg-muted py-8 lg:py-10" data-testid="success-stories-section">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-2xl font-bold text-primary md:text-3xl">
            ผลงานจริง ก่อน-หลังรีโนเวท
          </h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Real Results: Before &amp; After Renovations
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex">
            {displayableStories.map((story) => (
              <div key={story.id} className="min-w-0 flex-[0_0_100%] px-2">
                <div className="flex flex-col gap-6 rounded-2xl bg-card p-4 shadow-[0_10px_30px_rgba(45,90,39,0.04)] md:p-6">
                  <BeforeAfterSlider
                    beforeUrl={story.beforeImageUrl}
                    afterUrl={story.afterImageUrl}
                    beforeAlt={`Before renovation ${story.location}`}
                    afterAlt={`After renovation ${story.location}`}
                  />
                  <div className="text-center md:text-left">
                    <h3 className="text-lg font-bold text-primary">{story.title}</h3>
                    {story.titleEn && (
                      <p className="text-sm text-muted-foreground">{story.titleEn}</p>
                    )}
                    {story.location && (
                      <p className="mt-1 text-xs text-secondary">{story.location}</p>
                    )}
                    {story.description && (
                      <p className="mt-3 text-sm leading-relaxed text-foreground">
                        {story.description}
                      </p>
                    )}
                    {story.descriptionEn && (
                      <p className="mt-1 text-sm text-muted-foreground">{story.descriptionEn}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {scrollSnaps.length > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                aria-label={`Go to story ${index + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  index === selectedIndex ? "bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
