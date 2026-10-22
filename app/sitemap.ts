import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/tgv-inoui", "/tgv-ouigo", "/comment-savoir", "/voiture-1", "/faq", "/a-propos"];
  return pages.map((p) => ({
    url: `${SITE_URL}${p}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.8,
  }));
}
