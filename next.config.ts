import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // SEO-preserving 301 redirects from old paths to /soul/*
      {
        source: "/building",
        destination: "/soul/building",
        permanent: true,
      },
      {
        source: "/writing",
        destination: "/soul/writing",
        permanent: true,
      },
      {
        source: "/writing/:slug*",
        destination: "/soul/writing/:slug*",
        permanent: true,
      },
      {
        source: "/journey",
        destination: "/soul/journey",
        permanent: true,
      },
      {
        source: "/connect",
        destination: "/soul/connect",
        permanent: true,
      },
      {
        source: "/blueprint/:slug*",
        destination: "/soul/blueprint/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
