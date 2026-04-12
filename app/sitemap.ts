import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://sensdelamarche.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/tgv-inoui", "/tgv-ouigo", "/comment-savoir", "/voiture-1", "/faq", "/a-propos"];
  return pages.map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.8,
  }));
}
