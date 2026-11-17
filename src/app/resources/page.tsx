import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, BookOpenText, Clock3 } from "lucide-react";
import { Container } from "@/components/container";
import { ResourcesExplorer } from "@/components/resources/resources-explorer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { WaveDivider } from "@/components/wave-divider";
import { resourceArticles, resourceCategories, getReadingMinutes } from "@/data/resources/articles";
import { serviceCatalog } from "@/data/services";
import { getCanonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Practice Resources",
  description: "Practical information about medical billing, credentialing, denials, accounts receivable, and practice support.",
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
  searchText: [article.introduction, ...article.takeaways, ...article.sections.flatMap((section) => [section.title, ...section.paragraphs, ...(section.bullets ?? [])])].join(" "),
}));

export default function ResourcesPage() {
  const featured = resourceArticles[0];
  return (
    <main id="main-content">
      <section className="relative isolate overflow-hidden bg-brand-navy pb-12 pt-8 text-white sm:pb-16 lg:pb-20">
        <div className="pointer-events-none absolute -right-32 -top-44 size-[38rem] rounded-full border border-white/10" aria-hidden="true"/>
        <Container className="relative grid items-center gap-10 lg:min-h-[29rem] lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <ScrollReveal className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-7 text-sm font-semibold text-white/55"><ol className="flex items-center gap-2"><li><Link href="/" className="hover:text-white">Home</Link></li><li aria-hidden="true">/</li><li aria-current="page" className="text-white">Resources</li></ol></nav>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-sky"><BookOpenText size={16}/> Practice Care Source library</p>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.5rem]">Useful knowledge for the work <span className="text-brand-sky">behind the practice.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">Explore clear, practical reading on billing, enrollment, denials, and the workflows that keep a healthcare practice moving.</p>
            <a href="#resource-library" className="mt-8 inline-flex min-h-14 items-center gap-3 rounded-full bg-brand-accent px-6 text-sm font-bold text-white shadow-lg shadow-black/20 transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-brand-accent-hover">Browse the library <ArrowDown size={17}/></a>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="relative mx-auto w-full max-w-[35rem] lg:ml-auto">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/15 bg-brand-dark-soft shadow-2xl shadow-black/30">
              <Image src={featured.coverImage} alt={featured.coverAlt} fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover transition-transform duration-700 hover:scale-[1.04]"/>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-brand-navy/5 to-transparent"/>
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-sky">Featured article</span>
                <h2 className="mt-3 max-w-lg font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">{featured.title}</h2>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-white/70"><span>{featured.category}</span><span className="inline-flex items-center gap-1.5"><Clock3 size={14}/>{getReadingMinutes(featured)} min read</span></div>
                <Link href={`/resources/${featured.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white underline decoration-brand-sky underline-offset-4">Read featured article <ArrowRight size={16}/></Link>
              </div>
            </div>
          </ScrollReveal>
        </Container>
        <WaveDivider tone="to-light"/>
      </section>

      <section className="bg-white py-10 sm:py-14 lg:py-16">
        <Container>
          <ScrollReveal>
            <div className="grid gap-5 border-b border-brand-border pb-8 sm:grid-cols-3 sm:gap-8">
              {[
                ["Billing & claims","Understand common billing steps, claim review and follow-up."],
                ["Credentialing","Organize provider information, applications and payer requests."],
                ["Denials & AR","Make open work easier to review, document and coordinate."],
              ].map(([title,body],index)=>(
                <div key={title} className="flex gap-4 sm:border-l sm:border-brand-border sm:pl-6 first:sm:border-0 first:sm:pl-0">
                  <span className="font-display text-3xl font-semibold text-brand-accent/55">0{index+1}</span>
                  <span><strong className="block font-display text-xl text-brand-navy">{title}</strong><span className="mt-1 block text-sm leading-relaxed text-brand-slate">{body}</span></span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section id="resource-library" className="scroll-mt-24 bg-brand-background-wash/45 py-12 sm:py-16 lg:py-20" aria-label="Resource library">
        <Container>
          <ScrollReveal><SectionHeading eyebrow="Explore the library" title="Find the article that fits your next question" description="Search across the current articles or filter by topic. Each resource is general information, so confirm current requirements before acting."/></ScrollReveal>
          <div className="mt-9"><ResourcesExplorer articles={resourceCards} categories={resourceCategories} featuredSlug={featured.slug}/></div>
          <p className="mt-10 border-t border-brand-border pt-5 text-xs leading-relaxed text-brand-slate">Resources are provided for general educational purposes. They are not medical, legal, coding, reimbursement, or payer-specific advice. Confirm current requirements with the relevant payer, authority, and qualified advisers.</p>
        </Container>
      </section>
    </main>
  );
}
