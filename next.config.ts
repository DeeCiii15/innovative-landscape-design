import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/transformations", destination: "/projects", permanent: true },
      { source: "/gallery", destination: "/projects", permanent: true },
      { source: "/gallery/design", destination: "/projects/landscape-design", permanent: true },
      { source: "/gallery/irrigation", destination: "/projects/irrigation", permanent: true },
      { source: "/gallery/hardscapes", destination: "/projects/hardscapes", permanent: true },
      { source: "/gallery/lighting", destination: "/projects/outdoor-lighting", permanent: true },
      { source: "/services", destination: "/services/landscape-design", permanent: true },
      { source: "/services/design", destination: "/services/landscape-design", permanent: true },
      { source: "/services/lighting", destination: "/services/outdoor-lighting", permanent: true },
    ];
  },
};

export default nextConfig;
