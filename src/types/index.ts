// ─── Property ────────────────────────────────────────────────────────────

export interface Property {
  id: string;
  slug: string;
  title: string;
  type: "SALE" | "RENT" | "LAND";
  subType: "new" | "renovated" | "townhome" | "residential" | "investment";
  price: number;
  priceLabel: string;
  areaSqm: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  emotionalDesc: string;
  pimInsight: string;
  status: "ACTIVE" | "SOLD" | "RENTED";
  featured: boolean;
  images: string[];
  imagePrimary: string;
  location: {
    district: string;
    subdistrict: string;
    lat: number;
    lng: number;
    distanceToAmata: string;
    distanceToHospital: string;
    distanceToMarket: string;
    nearestIndustrialEstate: string;
  };
  amenities: string[];
  videoUrl?: string;
  tags: string[];
  createdAt: string;
}

// ─── Blog ────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  excerpt: string;
  content: string;
  readingTime: string;
  publishedAt: string;
  featuredImage: string;
  relatedPropertyIds: string[];
}

export interface BlogCategory {
  name: string;
  slug: string;
}

// ─── Testimonial ─────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  clientName: string;
  quote: string;
  propertyType: string;
  rating: number;
  avatarUrl: string;
}

// ─── FAQ ─────────────────────────────────────────────────────────────────

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  pageSlug: string;
}
