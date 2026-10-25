import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://firebasestorage.googleapis.com/**"),
      new URL("https://storage.googleapis.com/**"),
    ],
  },
  experimental: {
    serverActions: {
      // Blog post cover images are uploaded through a Server Action.
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
