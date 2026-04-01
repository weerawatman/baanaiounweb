"use client";

import HeroSection from "@/components/home/HeroSection";
import SearchBar from "@/components/home/SearchBar";
import ServiceShortcuts from "@/components/home/ServiceShortcuts";
import CoreValues from "@/components/home/CoreValues";
import TestimonialSlider from "@/components/home/TestimonialSlider";
import FAQSection from "@/components/home/FAQSection";
import SectionTitle from "@/components/layout/SectionTitle";
import { MOCK_PROPERTIES } from "@/lib/mock-data";
import PropertyCard from "@/components/property/PropertyCard";

export default function HomePage() {
  const featuredProperties = MOCK_PROPERTIES.filter((p) => p.featured);

  return (
    <>
      <HeroSection />

      <section className="py-8 px-4">
        <SearchBar />
      </section>

      <section className="py-12 px-4 max-w-6xl mx-auto">
        <SectionTitle
          title="บริการของเรา"
          subtitle="พิมพร้อมดูแลคุณทุกขั้นตอน"
        />
        <ServiceShortcuts />
      </section>

      <section className="py-12 px-4 max-w-6xl mx-auto">
        <SectionTitle
          title="ทรัพย์แนะนำ"
          subtitle="คัดมาแล้วโดยพิม ทุกหลังน่าอยู่"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      <CoreValues />

      <section className="py-12 px-4 max-w-6xl mx-auto">
        <SectionTitle
          title="เสียงจากลูกค้า"
          subtitle="คนที่เคยใช้บริการบ้านไออุ่น"
        />
        <TestimonialSlider />
      </section>

      <section className="py-12 px-4 max-w-4xl mx-auto">
        <SectionTitle
          title="คำถามที่พบบ่อย"
          subtitle="สงสัยอะไร ถามพิมได้เลยค่ะ"
        />
        <FAQSection />
      </section>
    </>
  );
}
