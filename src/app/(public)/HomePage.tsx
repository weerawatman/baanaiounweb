import HeroSection from "@/components/home/HeroSection"
import ServiceShortcuts from "@/components/home/ServiceShortcuts"
import FeaturedProperties from "@/components/home/FeaturedProperties"
import TrustPillars, { type TrustPillarImages } from "@/components/home/TrustPillars"
import { type Property } from "@/types"

interface HomePageProps {
  properties: Property[]
  heroImage?: string
  trustImages: TrustPillarImages
}

/**
 * โครงหน้าแรกตาม mockup (example_page/หน้าแรก.html):
 * Hero (search box + ปุ่ม CTA ใต้กล่อง) → บริการของเรา → ทรัพย์แนะนำคัดพิเศษ →
 * ความไว้วางใจจากลูกค้า
 */
export default function HomePage({ properties, heroImage, trustImages }: HomePageProps) {
  const districts = [
    ...new Set(properties.map((p) => p.location.district).filter(Boolean)),
  ].sort()

  return (
    <>
      <HeroSection heroImage={heroImage} districts={districts} />

      <ServiceShortcuts />

      <FeaturedProperties properties={properties} />

      <TrustPillars images={trustImages} />
    </>
  )
}
