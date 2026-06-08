import type { NextConfig } from "next"

const ERP_API = process.env.NEXT_PUBLIC_API_URL ?? "https://erp.vita-core.org"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Same-origin proxy to the ERP backend — keeps a single Supabase source of truth.
  // No /api routes are defined locally; everything goes to FreshLink.
  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${ERP_API}/api/:path*` },
    ]
  },
  // Loosen these — the legacy monolith uses inline scripts/styles we don't need to fight.
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
}

export default nextConfig
