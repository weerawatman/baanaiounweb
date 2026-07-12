// ─── Property ────────────────────────────────────────────────────────────

export interface Property {
  id: string
  slug: string
  title: string
  titleEn: string
  type: "SALE" | "RENT" | "LAND"
  subType: "house" | "townhome" | "condo" | "land"
  price: number
  priceLabel: string
  priceLabelEn: string
  areaSqm: number
  bedrooms: number
  bathrooms: number
  description: string
  descriptionEn: string
  emotionalDesc: string
  emotionalDescEn: string
  pimInsight: string
  pimInsightEn: string
  status: "ACTIVE" | "SOLD" | "RENTED"
  featured: boolean
  images: string[]
  imagePrimary: string
  location: {
    district: string
    subdistrict: string
    lat: number
    lng: number
    distanceToAmata: string
    distanceToHospital: string
    distanceToMarket: string
    nearestIndustrialEstate: string
  }
  amenities: string[]
  videoUrl?: string
  tags: string[]
  createdAt: string
}

// ─── Blog ────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string
  slug: string
  title: string
  titleEn: string
  category: string
  categorySlug: string
  excerpt: string
  excerptEn: string
  content: string
  contentEn: string
  readingTime: string
  publishedAt: string
  featuredImage: string
  relatedPropertyIds: string[]
}

export interface BlogCategory {
  name: string
  nameEn?: string
  slug: string
}

// ─── Testimonial ─────────────────────────────────────────────────────────

export interface Testimonial {
  id: string
  clientName: string
  quote: string
  quoteEn: string
  propertyType: string
  rating: number
  avatarUrl: string
}

// ─── Success story (before/after renovation) ───────────────────────────

export interface SuccessStory {
  id: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  location: string
  beforeImageUrl: string
  afterImageUrl: string
}

// ─── FAQ ─────────────────────────────────────────────────────────────────

export interface FAQ {
  id: string
  question: string
  questionEn: string
  answer: string
  answerEn: string
  pageSlug: string
}

// ─── Agent profile (singleton, editable from /admin/profile) ──────────────

export interface Profile {
  name: string
  fullName: string
  role: string
  roleEn: string
  bio: string
  bioEn: string
  vision: string
  visionEn: string
  avatarUrl: string
  heroImageUrl: string
  homeHeroImage: string
  trustRenovationImage: string
  trustNetworkImage: string
  trustShopperImage: string
  matchTeamImage: string
  aboutTimeline2002Image: string
  aboutTimeline2016Image: string
  aboutTimeline2020Image: string
  aboutTimeline2026Image: string
  servicesHeroImage: string
  agentCourseHeroImage: string
  coAgentHeroImage: string
  blogHeroImage: string
  findPropertyHeroImage: string
  findPropertyBento1Image: string
  findPropertyBento2Image: string
  findPropertyBento3Image: string
  listPropertyHeroImage: string
  listPropertyBento1Image: string
  listPropertyBento2Image: string
  listPropertyBento3Image: string
  aboutMidBannerImage: string
  servicesWhyChooseImage: string
  coAgentSplitImage: string
  agentCourseBannerImage: string
  phone: string
  lineId: string
  lineUrl: string
  email: string
  facebook: string
  tiktok: string
  youtube: string
  siteName: string
  slogan: string
  address: string
  mapLat: number | null
  mapLng: number | null
}
