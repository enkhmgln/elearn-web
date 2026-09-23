import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  async rewrites() {
    const apiUrl = process.env.API_URL

    if (!apiUrl) {
      return []
    }

    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/api/:path*/`,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
}

export default nextConfig
