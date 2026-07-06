// ─── Property ────────────────────────────────────────────────────────────

export interface Property {
  id: string
  slug: string
  title: string
  type: "SALE" | "RENT" | "LAND"
  subType: "new" | "renovated" | "townhome" | "residential" | "investment"
  price: number
  priceLabel: string
  areaSqm: number
  bedrooms: number
  bathrooms: number
  description: string
  emotionalDesc: string
  pimInsight: string
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
  category: string
  categorySlug: string
  excerpt: string
  content: string
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
  answer: string
  pageSlug: string
}

// ─── Agent profile (singleton, editable from /admin/profile) ──────────────

export interface Profile {
  name: string
  fullName: string
  role: string
  bio: string
  vision: string
  avatarUrl: string
  heroImageUrl: string
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
}
