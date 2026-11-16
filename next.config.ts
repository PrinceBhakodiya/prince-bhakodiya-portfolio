import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export served by nginx on the prince-instances VM (see deploy.sh).
  output: "export",
  // Every page becomes folder/index.html, so plain nginx serves clean URLs like /blog/vayu/
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
