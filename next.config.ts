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
    optimizeCss: false, // Disables LightningCSS
  },
};

export default nextConfig;
