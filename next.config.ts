import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a fully static site to `out/`, so it can be hosted on any static
  // host (Cloudflare Pages) with no server runtime.
  output: "export",
  // The Next image optimizer needs a server; a static export has none.
  images: { unoptimized: true },
  // Emit `about/index.html` rather than `about.html`, which static hosts
  // resolve more predictably.
  trailingSlash: true,
};

export default nextConfig;
