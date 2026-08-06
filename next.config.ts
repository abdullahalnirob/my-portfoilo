import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Project screenshots are hosted on ImgBB.
    remotePatterns: [
      new URL("https://i.ibb.co.com/**"),
      new URL("https://i.ibb.co/**"),
    ],
  },
};

export default nextConfig;
