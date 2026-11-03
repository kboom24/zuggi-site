import type { NextConfig } from "next";

/**
 * Zuggi is a fully static site (output: "export").
 * - Cloudflare Pages: `npm run build` -> deploy the `out/` folder (no basePath).
 * - GitHub Pages preview: GITHUB_PAGES=true npm run build -> served under /zuggi-site.
 */
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPages ? process.env.PAGES_BASE_PATH || "/zuggi-site" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
