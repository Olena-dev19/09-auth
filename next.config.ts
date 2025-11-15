import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "colorlib.com" },
      { protocol: "https", hostname: "ac.goit.global" },
    ],
  },
};

export default nextConfig;
