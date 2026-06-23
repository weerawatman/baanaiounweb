import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      // Placeholder images (dev/staging)
      { protocol: "https", hostname: "placehold.co" },
      // Supabase Storage (production)
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
      // Cloudinary (optional CDN)
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
}

export default nextConfig
