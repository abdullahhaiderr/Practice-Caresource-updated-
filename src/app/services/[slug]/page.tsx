import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/site";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { PageHeroImage } from "@/components/page-hero-image";
import { getServiceBySlug, serviceCatalog, type ServiceContent } from "@/data/services";
import { serviceStructuredData, serializeJsonLd } from "@/lib/structured-data";
import { WaveDivider } from "@/components/wave-divider";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviceCatalog.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service not found" };

  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: getCanonicalUrl(`/services/${service.slug}`) },
    openGraph: {
      title: `${service.title} | Practice Care Source`,
      description: service.description,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const specialtyFaq = {
    question: "Can you support the workflows used by my specialty?",
    answer: "Practice workflows and requirements differ. Tell us about your specialty and the tasks you want to discuss so the possible scope can be reviewed before work begins.",
  };
  const patientDataFaq = {
    question: "Can I send patient information through this website?",
    answer: "No. The website contact form and general inquiry email are for business inquiries only. Do not send patient names, protected health information (PHI), or other sensitive patient data.",
  };
  const serviceFaqs = [...service.faqs, specialtyFaq, patientDataFaq];
  const structuredData = serviceStructuredData(service);

  const relatedServices = service.relatedServices
    .map((relatedSlug) => getServiceBySlug(relatedSlug))
    .filter((related): related is ServiceContent => Boolean(related));

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
      <section className="relative isolate overflow-hidden bg-brand-navy py-8 text-white sm:py-10 lg:py-12">
        <Container className="relative grid items-center gap-10 lg:min-h-[29rem] lg:grid-cols-[1.08fr_0.92fr]">
          <ScrollReveal className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-sm font-semibold text-white/60">
                <li>
                  <Link href="/" className="rounded-sm transition-colors hover:text-brand-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink">Home</Link>
                </li>
                <li aria-hidden="true"><ChevronRight size={15} /></li>
                <li>
                  <Link href="/services" className="rounded-sm transition-colors hover:text-brand-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink">Services</Link>
                </li>
                <li aria-hidden="true"><ChevronRight size={15} /></li>
                <li aria-current="page" className="text-white">{service.shortTitle}</li>
              </ol>
            </nav>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-brand-accent-ink">
              Practice Care Source practice support
            </p>
            <h1 className="text-balance font-display text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {service.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">
              {service.overview}
            </p>
            <div className="mt-6 flex min-h-14 flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contact" size="lg" showArrow>Request a Consultation</Button>
              <Link href="/services" className="inline-flex min-h-12 items-center gap-2 px-3 text-sm font-bold text-white transition-colors hover:text-brand-sky focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky">
                View all services <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>
          <PageHeroImage src={service.imageSrc} alt={service.imageAlt} />
        </Container>
      </section>

      <section className="py-10 sm:py-12 lg:py-16">
        <Container className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <ScrollReveal>
            <SectionHeading
              eyebrow="What's included"
              title="A clear scope, built around your workflow"
              description="The exact tasks are agreed with your practice. Common areas of support may include:"
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.whatsIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3 border-b border-brand-border bg-transparent py-4 pr-3 text-sm leading-relaxed text-brand-slate transition-colors hover:border-brand-accent">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-accent/15 text-brand-accent-ink" aria-hidden="true">
                    <Check size={15} strokeWidth={2.3} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <aside className="h-full border-l-2 border-brand-sky bg-brand-background-wash/45 p-6 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.15em] text-brand-accent-ink">Who it's for</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-brand-dark sm:text-4xl">
                Built for real practice workflows
              </h2>
              <p className="mt-4 text-base leading-relaxed text-brand-slate">{service.whoItsFor}</p>
              <div className="mt-8 border-t border-brand-border pt-6">
                <h3 className="font-display text-2xl font-semibold text-brand-dark">Why it matters</h3>
                <ul className="mt-4 space-y-3">
                  {service.whyItMatters.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-slate">
                      <Check size={16} className="mt-1 shrink-0 text-brand-accent-ink" aria-hidden="true" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </ScrollReveal>
        </Container>
      </section>

      <section className="border-y border-brand-border/75 bg-brand-background-wash/30 py-10 sm:py-12 lg:py-16">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="How we do it"
              title="A practical process, with clear handoffs"
              description="We agree on responsibilities and review points with your practice before the work moves forward."
              align="center"
            />
          </ScrollReveal>
          <div className="mt-8 grid gap-x-7 sm:grid-cols-2 lg:grid-cols-4">
            {service.howWeWork.map((step, index) => (
              <ScrollReveal key={step.title} delay={index * 0.04}>
                <article className="h-full border-t-2 border-brand-border bg-transparent py-6 transition-colors duration-300 hover:border-brand-accent sm:py-7">
                  <span className="grid size-10 place-items-center rounded-xl bg-brand-dark text-sm font-bold text-brand-background" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-brand-dark">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-slate">{step.description}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-brand-border bg-brand-background-wash/50 py-10 sm:py-12 lg:py-14">
        <Container className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-accent-ink">Information and access</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-brand-dark sm:text-3xl">Agree on access before sharing practice information.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-slate sm:text-base">
              Before any work involving practice systems or confidential information is considered, discuss the task scope, approved access, review responsibilities, safeguards, and any agreements that may be required. Do not send patient information through this website or general inquiry email.
            </p>
          </ScrollReveal>
          <Link href="/security" className="inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-brand-border bg-white px-5 text-sm font-bold text-brand-accent-ink transition-colors hover:border-brand-accent hover:bg-brand-background-wash focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink">
            Security information <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Container>
      </section>

      <section className="py-10 sm:py-12 lg:py-16">
        <Container size="narrow">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Common questions"
              title={`A few things to know about ${service.shortTitle.toLowerCase()}`}
              align="center"
            />
            <div className="mt-6 divide-y divide-brand-border border-y border-brand-border">
              {serviceFaqs.map((faq) => (
                <details key={faq.question} className="group py-1">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 font-bold text-brand-dark transition-colors hover:text-brand-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink">
                    {faq.question}
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-background-wash/50 text-brand-accent-ink transition-transform group-open:rotate-180" aria-hidden="true">
                      <ChevronRight size={17} className="rotate-90" />
                    </span>
                  </summary>
                  <p className="max-w-3xl pb-5 pr-10 text-sm leading-relaxed text-brand-slate sm:text-base">{faq.answer}</p>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="border-y border-brand-border/75 bg-brand-background-wash/30 py-10 sm:py-12 lg:py-16">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="Connected support"
              title="Related services"
              description="Explore other areas that may fit alongside this work."
            />
          </ScrollReveal>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {relatedServices.map((related, index) => (
              <ScrollReveal key={related.slug} delay={index * 0.05}>
                <ServiceCard
                  title={related.title}
                  description={related.description}
                  imageSrc={related.imageSrc}
                  imageAlt={related.imageAlt}
                  icon={related.icon}
                  href={`/services/${related.slug}`}
                />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-12 lg:py-16">
        <Container>
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl bg-brand-dark px-7 py-8 text-brand-background sm:px-10 sm:py-10 lg:px-16 lg:py-12">
              <div className="pointer-events-none absolute -right-10 -top-20 size-64 rounded-full border border-brand-accent/35" aria-hidden="true" />
              <div className="relative max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-accent">The source of care for your practice</p>
                <h2 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.02] text-brand-background sm:text-5xl">
                  Let's talk about what your team needs.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-background/75 sm:text-lg">
                  Share what you would like to improve, and we can discuss a practical next step for your practice.
                </p>
                <Button href="/contact" size="lg" className="mt-7" showArrow>Request a Consultation</Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}

