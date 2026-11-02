import type { MetadataRoute } from "next";

const SITO = "https://assoumanoidi.it";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/admin/"] },
    sitemap: `${SITO}/sitemap.xml`,
  };
}
