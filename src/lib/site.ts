import { serviceCatalog } from "@/data/services";

export { serviceNavLinks } from "@/data/services";
export type { ServiceContent as ServiceItem } from "@/data/services";

export type SiteLink = {
  label: string;
  href: string;
};

/** Public site configuration. Unverified values remain null until confirmed. */
function getConfiguredSiteUrl(): string | null {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!candidate) return null;
  try {
    const parsed = new URL(candidate);
    return parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed.origin : null;
  } catch {
    return null;
  }
}

export const siteConfig = {
  brandName: "Practice Care Source",
  contactEmail: "info@practicecaresource.com",
  canonicalUrl: getConfiguredSiteUrl(),
  serviceArea: null as string | null,
  phone: null as { display: string; href: string } | null,
  businessHours: null as string | null,
  socialLinks: {
    linkedin: null as string | null,
    facebook: null as string | null,
    instagram: null as string | null,
  },
  responseTime: null as string | null,
  features: {
    announcementBar: false,
    newsletter: false,
    consultationPopup: false,
    testimonials: false,
    coverageHighlights: false,
    analytics: false,
  },
};

/**
 * Return an absolute URL only after the production origin is explicitly configured.
 * This avoids inventing a canonical domain in metadata or search-engine files.
 */
export function getCanonicalUrl(path: string): string | undefined {
  if (!siteConfig.canonicalUrl) return undefined;
  try {
    const target = new URL(path, siteConfig.canonicalUrl);
    return target.origin === siteConfig.canonicalUrl ? target.toString() : undefined;
  } catch {
    return undefined;
  }
}

export const navigationLinks: SiteLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];
export const services = serviceCatalog;
export const footerContact = {
  email: siteConfig.contactEmail,
  phoneDisplay: siteConfig.phone?.display ?? null,
  phoneHref: siteConfig.phone?.href ?? null,
  tagline: "The source of care for your practice.",
};
export const footerQuickLinks = [...navigationLinks, { label: "Security", href: "/security" }];
export const siteFeatures = siteConfig.features;
