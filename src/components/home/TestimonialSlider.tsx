"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MOCK_TESTIMONIALS } from "@/data/testimonials";

export default function TestimonialSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B4D3E]">
            เสียงจากลูกค้าบ้านไออุ่น
          </h2>
          <p className="mt-3 text-gray-600 text-sm md:text-base">
            ความไว้วางใจคือรางวัลที่ดีที่สุดของพิม
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex">
            {MOCK_TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-[0_0_100%] min-w-0 px-4"
              >
                <div className="bg-[#F5F0E8] rounded-2xl p-8 md:p-10 flex flex-col items-center text-center gap-5">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="fill-[#D4A843] text-[#D4A843]"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-700 text-base md:text-lg leading-relaxed italic max-w-2xl">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  {/* Avatar + name */}
                  <div className="flex flex-col items-center gap-2">
                    <Avatar size="lg" className="size-14">
                      <AvatarImage
                        src={testimonial.avatarUrl}
                        alt={testimonial.clientName}
                      />
                      <AvatarFallback>
                        {testimonial.clientName.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-[#1B4D3E] text-sm">
                        {testimonial.clientName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {testimonial.propertyType}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-6">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === selectedIndex
                  ? "bg-[#1B4D3E]"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
