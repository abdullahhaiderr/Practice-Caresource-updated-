import { siteConfig } from "@/lib/site";
import type { ServiceContent } from "@/data/services";

const schemaContext = "https://schema.org";

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export function organizationStructuredData() {
  return {
    "@context": schemaContext,
    "@type": "Organization",
    ...(siteConfig.canonicalUrl ? {
      "@id": `${siteConfig.canonicalUrl}/#organization`,
      url: siteConfig.canonicalUrl,
    } : {}),
    name: siteConfig.brandName,
    email: siteConfig.contactEmail,
    description:
      "Medical billing and practice support services, including credentialing, administrative support, accounts receivable follow-up, denial management, and website development.",
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function breadcrumbStructuredData(items: BreadcrumbItem[]) {
  const canonicalUrl = siteConfig.canonicalUrl;
  if (!canonicalUrl) return null;
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, canonicalUrl).toString(),
    })),
  };
}

export function serviceStructuredData(service: ServiceContent) {
  const specialtyFaq = {
    question: "Can you support the workflows used by my specialty?",
    answer:
      "Practice workflows and requirements differ. Tell us about your specialty and the tasks you want to discuss so the possible scope can be reviewed before work begins.",
  };
  const patientDataFaq = {
    question: "Can I send patient information through this website?",
    answer:
      "No. The website contact form and general inquiry email are for business inquiries only. Do not send patient names, protected health information (PHI), or other sensitive patient data.",
  };
  const faqs = [...service.faqs, specialtyFaq, patientDataFaq];

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Service",
      name: service.title,
      serviceType: service.title,
      description: service.description,
      provider: {
        "@type": "Organization",
        name: siteConfig.brandName,
        email: siteConfig.contactEmail,
        ...(siteConfig.canonicalUrl
          ? { "@id": `${siteConfig.canonicalUrl}/#organization` }
          : {}),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  const breadcrumb = breadcrumbStructuredData([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.shortTitle, path: `/services/${service.slug}` },
  ]);
  if (breadcrumb) graph.push(breadcrumb);
  return { "@context": schemaContext, "@graph": graph };
}

export function servicesIndexStructuredData(services: ServiceContent[]) {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "ItemList",
      name: "Practice Care Source services",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.title,
        ...(siteConfig.canonicalUrl
          ? { url: new URL(`/services/${service.slug}`, siteConfig.canonicalUrl).toString() }
          : {}),
      })),
    },
  ];
  const breadcrumb = breadcrumbStructuredData([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ]);
  if (breadcrumb) graph.push(breadcrumb);
  return { "@context": schemaContext, "@graph": graph };
}

export function aboutStructuredData() {
  const breadcrumb = breadcrumbStructuredData([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);
  return {
    "@context": schemaContext,
    "@graph": [
      {
        "@type": "AboutPage",
        name: `About ${siteConfig.brandName}`,
        description:
          "Learn about Practice Care Source's approach to medical billing and practice support.",
        mainEntity: {
          "@type": "Organization",
          name: siteConfig.brandName,
          email: siteConfig.contactEmail,
          ...(siteConfig.canonicalUrl
            ? { "@id": `${siteConfig.canonicalUrl}/#organization` }
            : {}),
        },
      },
      ...(breadcrumb ? [breadcrumb] : []),
    ],
  };
}
