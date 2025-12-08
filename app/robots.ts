import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cv", "/admin"],
    },
    sitemap: "https://ahiya.xyz/sitemap.xml",
  };
}
