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
  async redirects() {
    return [
      // Old owner -> new list-property
      { source: '/owners', destination: '/list-property', permanent: true },
      // Old buy -> new find-property
      { source: '/buy', destination: '/find-property', permanent: true },
      // Old rent -> new find-property
      { source: '/rent', destination: '/find-property', permanent: true },
      // Old land -> new find-property
      { source: '/land', destination: '/find-property', permanent: true },
      // Old academy -> new agent-course
      { source: '/academy', destination: '/agent-course', permanent: true },
    ]
  },
}

export default nextConfig
