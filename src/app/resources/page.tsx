import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/site";
import Image from "next/image";
import { ArrowDown, ClipboardList, FileCheck2, RefreshCw } from "lucide-react";
import { Container } from "@/components/container";
import { ResourcesExplorer } from "@/components/resources/resources-explorer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { WaveDivider } from "@/components/wave-divider";
import { resourceArticles, resourceCategories, getReadingMinutes } from "@/data/resources/articles";
import { serviceCatalog } from "@/data/services";

export const metadata: Metadata = {
  title: "Practice Resources",
  description:
    "Practical, general information about medical billing, credentialing, denials, accounts receivable, and practice support.",
  openGraph: {
    title: "Practice Resources | Practice Care Source",
    description:
      "Explore practical resources about medical billing, credentialing, denials, AR follow-up, and practice support.",
    type: "website",
  },
  alternates: { canonical: getCanonicalUrl("/resources") },
};

const resourceCards = resourceArticles.map((article) => ({
  slug: article.slug,
  title: article.title,
  excerpt: article.excerpt,
  category: article.category,
  publishedAt: article.publishedAt,
  coverImage: article.coverImage,
  coverAlt: article.coverAlt,
  readingMinutes: getReadingMinutes(article),
  searchText: [
    article.introduction,
    ...article.takeaways,
    ...article.sections.flatMap((section) => [
      section.title,
      ...section.paragraphs,
      ...(section.bullets ?? []),
    ]),
  ].join(" "),
}));

const resourceThemes = [
  {
    icon: FileCheck2,
    label: "Billing & claims",
    description: "Understand common billing steps, handoffs and claim follow-up.",
  },
  {
    icon: ClipboardList,
    label: "Credentialing",
    description: "Organize provider information, applications and payer requests.",
  },
  {
    icon: RefreshCw,
    label: "Denials & AR",
    description: "Make open work easier to review, document and coordinate.",
  },
];

export default function ResourcesPage() {
  return (
    <main id="main-content">
      <section className="relative isolate overflow-hidden bg-brand-navy pb-12 pt-7 text-white sm:pb-16 sm:pt-9 lg:pb-20 lg:pt-10">
        <div className="pointer-events-none absolute -right-28 -top-40 size-[34rem] rounded-full border border-white/10" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-10 -top-24 size-[25rem] rounded-full border border-brand-sky/15" aria-hidden="true" />
        <Container className="relative grid items-center gap-10 lg:min-h-[27rem] lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] lg:gap-14">
          <ScrollReveal className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-7">
              <ol className="flex flex-wrap items-center gap-2 text-sm font-semibold text-white/65">
                <li><a href="/" className="rounded-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky">Home</a></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white">Resources</li>
              </ol>
            </nav>
            <div className="mb-6 inline-flex min-h-10 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 text-xs font-bold uppercase tracking-[0.14em] text-brand-sky backdrop-blur-sm">
              <ClipboardList size={16} aria-hidden="true" />
              Practice Care Source library
            </div>
            <h1 className="max-w-3xl text-balance font-display text-5xl font-semibold leading-[0.99] tracking-tight text-white sm:text-6xl lg:text-[4.25rem]">
              Better context for the work behind <span className="text-brand-sky">your practice.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              Clear, practical reading on billing, enrollment, denials and the everyday workflows that support a healthcare practice.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#resource-library" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-accent px-5 text-sm font-bold text-white shadow-lg shadow-black/15 transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-brand-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy motion-reduce:transform-none">
                Explore the library <ArrowDown size={16} aria-hidden="true" />
              </a>
              <a href="/contact" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 px-5 text-sm font-bold text-white transition-colors hover:border-brand-sky hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky">
                Ask about a workflow
              </a>
            </div>
          </ScrollReveal>
          <div className="relative mx-auto w-full max-w-[34rem] lg:ml-auto">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-white/15 bg-brand-dark-soft shadow-2xl shadow-black/20">
              <Image
                src={serviceCatalog[2].imageSrc}
                alt="A team coordinating work together in a professional office"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/65 via-brand-navy/5 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-4 rounded-2xl border border-white/20 bg-brand-navy/85 p-4 backdrop-blur-sm sm:-left-5 sm:right-8">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-sky/15 text-brand-sky">
                  <FileCheck2 size={21} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-white">Useful, focused guidance</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-white/65">Start with the question your team needs to answer.</span>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <WaveDivider tone="to-light" />

      <section className="pb-7 pt-2 sm:pb-10" aria-label="Resource topics">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {resourceThemes.map((theme, index) => {
              const Icon = theme.icon;
              return (
                <ScrollReveal key={theme.label} delay={index * 0.07} className="h-full">
                  <article className="group flex h-full items-start gap-4 rounded-2xl border border-brand-border bg-white p-5 shadow-[0_8px_26px_rgb(11_27_63_/_0.045)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-sky/60 hover:shadow-card-hover motion-reduce:transform-none motion-reduce:transition-none sm:p-6">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-background-wash text-brand-accent-ink transition-colors duration-200 group-hover:bg-brand-accent group-hover:text-white">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-display text-xl font-semibold text-brand-navy">{theme.label}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-brand-slate">{theme.description}</span>
                    </span>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section id="resource-library" className="scroll-mt-24 py-10 sm:py-14 lg:py-16" aria-label="Resource library">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="Browse the library"
              title="Find the article that fits your next question"
              description="Search across the current articles or filter by topic. Each resource is written as general information; confirm current requirements before acting."
              className="mb-8 sm:mb-10"
            />
          </ScrollReveal>
          <ResourcesExplorer
            articles={resourceCards}
            categories={resourceCategories}
            featuredSlug={resourceArticles[0].slug}
          />
        </Container>
      </section>
    </main>
  );
}
