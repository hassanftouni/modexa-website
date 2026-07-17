import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Scroll-scrubbed background videos never change in place (new
        // versions get new filenames) — cache them hard so revisits and
        // the blob prefetch hit the browser/CDN cache instantly.
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
