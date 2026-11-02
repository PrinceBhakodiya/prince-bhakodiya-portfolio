import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export served by nginx on the prince-instances VM (see deploy.sh).
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
