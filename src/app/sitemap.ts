import type { MetadataRoute } from "next";
import { resourceArticles } from "@/data/resources/articles";
import { serviceCatalog } from "@/data/services";
import { getCanonicalUrl, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.canonicalUrl) return [];

  const publicPaths = [
    "/",
    "/about",
    "/contact",
    "/security",
    "/services",
    ...serviceCatalog.map((service) => `/services/${service.slug}`),
    "/resources",
    ...resourceArticles.map((article) => `/resources/${article.slug}`),
  ];

  return publicPaths.flatMap((path) => {
    const url = getCanonicalUrl(path);
    return url ? [{ url }] : [];
  });
}
