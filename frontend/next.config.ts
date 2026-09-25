import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cpus: 2,
  },
  images: {
    qualities: [75, 80, 90],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "www.transparenttextures.com" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
