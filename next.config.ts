import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Sur GitHub Pages sans domaine perso, le site est servi sous /<nom-du-repo>.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
