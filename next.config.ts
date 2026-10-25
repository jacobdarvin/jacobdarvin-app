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
      // Post videos, audio and cover images are uploaded through a Server Action.
      bodySizeLimit: "100mb",
    },
  },
};

export default nextConfig;
