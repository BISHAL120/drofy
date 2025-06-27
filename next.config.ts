import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  experimental: {
    useCache: true,
  },
};

export default nextConfig;
