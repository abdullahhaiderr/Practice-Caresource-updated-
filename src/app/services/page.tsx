import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/site";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { PageHeroImage } from "@/components/page-hero-image";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { WaveDivider } from "@/components/wave-divider";
import { serviceCatalog } from "@/data/services";
import { ServiceExplorer } from "./service-explorer";
import { servicesIndexStructuredData, serializeJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore medical billing, credentialing, virtual assistant, AR recovery, denial management, and website development support from Practice Care Source.",
  alternates: { canonical: getCanonicalUrl("/services") },
};

export default function ServicesPage() {
  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(servicesIndexStructuredData(serviceCatalog)) }} />
      <section className="relative isolate overflow-hidden bg-brand-navy py-8 text-white sm:py-10 lg:py-12">
        <Container className="relative grid items-center gap-10 lg:min-h-[29rem] lg:grid-cols-[1.08fr_0.92fr]">
          <ScrollReveal className="max-w-3xl lg:max-w-none">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center gap-2 text-sm font-semibold text-white/60">
                <li>
                  <Link href="/" className="rounded-sm transition-colors hover:text-brand-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white">Services</li>
              </ol>
            </nav>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-brand-accent-ink">
              Practice support, connected
            </p>
            <h1 className="text-balance font-display text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Everything Your Practice Needs, <span className="text-brand-sky">Under One Roof</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">
              From billing and enrollment to administrative and digital support, explore the services currently listed by Practice Care Source and discuss which tasks fit your practice.
            </p>
            <div className="mt-6 flex min-h-14 flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contact" size="lg" showArrow>
                Request a Consultation
              </Button>
              <Button href="#all-services" variant="outline" size="lg">
                Explore all services
              </Button>
            </div>
          </ScrollReveal>
          <PageHeroImage src={serviceCatalog[2].imageSrc} alt="A team member coordinating work in a professional office" />
        </Container>
      </section>

      <section id="all-services" className="py-10 sm:py-12 lg:py-16">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="Our services"
              title="Support for the work behind every visit"
              description="Choose a service to see how the day-to-day work can be organized around your practice and its existing processes."
            />
          </ScrollReveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCatalog.map((service, index) => (
              <ScrollReveal key={service.slug} delay={index * 0.035}>
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  imageSrc={service.imageSrc}
                  imageAlt={service.imageAlt}
                  icon={service.icon}
                  href={`/services/${service.slug}`}
                />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-brand-border/75 bg-brand-background-wash/30 py-10 sm:py-12 lg:py-16">
        <Container>
          <ScrollReveal>
            <div className="grid gap-6 rounded-3xl border border-brand-accent/20 bg-white p-6 shadow-card sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-accent-ink">Specialty and practice fit</p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-brand-dark sm:text-3xl">Start with the workflow your specialty needs.</h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-slate sm:text-base">
                  Specialty requirements and payer workflows can differ. Share your specialty and the general tasks you want to discuss so the possible service scope can be reviewed before work begins. Do not include patient information.
                </p>
              </div>
              <Button href="/contact" size="lg" showArrow className="self-start">Discuss your needs</Button>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <SectionHeading
              eyebrow="Find your starting point"
              title="Explore the work that fits your practice"
              description="Select a service to review what it can include and who it may be useful for. Details and responsibilities are confirmed with your team before work starts."
            />
          </ScrollReveal>
          <ScrollReveal className="mt-7 sm:mt-9">
            <ServiceExplorer />
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-brand-dark py-10 text-brand-background sm:py-12 lg:py-16">
        <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <ScrollReveal>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-brand-accent">
              One connected team
            </p>
            <h2 className="text-balance font-display text-4xl font-semibold leading-[1.02] tracking-tight text-brand-background sm:text-5xl lg:text-6xl">
              Why bring it under one roof?
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-background/75 sm:text-lg">
              Billing, enrollment, and administrative coordination all affect how a practice works. Practice Care Source can help you plan the right combination and keep the handoffs clear.
            </p>
            <Link
              href="/contact"
              className="group mt-7 inline-flex min-h-12 items-center gap-2 rounded-pill bg-brand-accent px-6 text-sm font-bold text-brand-background transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-brand-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-background focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              Talk through your needs
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {serviceCatalog.map((service, index) => {
                const Icon = service.icon;
                return (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group flex min-h-[5.25rem] items-center gap-3 rounded-2xl border border-brand-background/15 bg-brand-background/5 p-4 transition-[background-color,border-color,transform] hover:-translate-y-0.5 hover:border-brand-accent/55 hover:bg-brand-background/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-accent text-brand-background" aria-hidden="true">
                        <Icon size={19} strokeWidth={1.9} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.68rem] font-bold uppercase tracking-[0.14em] text-brand-background/55">
                          0{index + 1}
                        </span>
                        <span className="mt-0.5 block text-sm font-bold leading-snug text-brand-background group-hover:text-brand-accent sm:text-base">
                          {service.shortTitle}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}

