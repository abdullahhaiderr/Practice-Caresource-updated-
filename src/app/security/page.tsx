import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileCheck2, LockKeyhole, ShieldAlert } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ScrollReveal } from "@/components/scroll-reveal";
import { breadcrumbStructuredData, serializeJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security and Information Handling",
  description:
    "Guidance for discussing access, confidential practice information, and business inquiries with Practice Care Source.",
};

const guidance = [
  {
    title: "Agree the scope first",
    description:
      "Before any work involving practice systems or confidential information is considered, document the tasks, responsible people, approval points, and information needed for the work.",
    icon: FileCheck2,
  },
  {
    title: "Review access arrangements",
    description:
      "Ask how access will be granted, limited to approved users, reviewed, and removed when it is no longer needed. Confirm the appropriate safeguards and communication route with your practice.",
    icon: LockKeyhole,
  },
  {
    title: "Confirm required documents",
    description:
      "Discuss which written agreements, security materials, and incident contacts are relevant to your organization before sharing confidential information.",
    icon: ShieldAlert,
  },
];

export default function SecurityPage() {
  const breadcrumb = breadcrumbStructuredData([
    { name: "Home", path: "/" },
    { name: "Security", path: "/security" },
  ]);

  return (
    <main id="main-content">
      {breadcrumb ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd({ "@context": "https://schema.org", ...breadcrumb }) }}
        />
      ) : null}
      <section className="border-b border-brand-border bg-brand-navy py-14 text-white sm:py-16 lg:py-20">
        <Container>
          <ScrollReveal className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm font-semibold text-slate-300">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white">Security</li>
              </ol>
            </nav>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-200">Information and access</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">Discuss information access before work begins.</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
              Practice systems and confidential information require clear scope, authorized access, and agreed responsibilities. Use this page as a conversation checklist, not as a certification or compliance statement.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-14 sm:py-16 lg:py-20">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="Before sharing information"
              title="Questions to resolve with your practice"
              description="The right controls depend on the systems, information, and responsibilities involved. Confirm the arrangements directly before granting access or sharing confidential material."
            />
          </ScrollReveal>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {guidance.map(({ title, description, icon: Icon }, index) => (
              <ScrollReveal key={title} delay={index * 0.05} className="h-full">
                <article className="h-full rounded-2xl border border-brand-border bg-white p-6 shadow-card">
                  <span className="grid size-12 place-items-center rounded-xl bg-brand-background-wash text-brand-accent-ink"><Icon size={23} aria-hidden="true" /></span>
                  <h2 className="mt-5 font-display text-xl font-semibold text-brand-dark">{title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-brand-slate">{description}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-brand-border bg-brand-background-wash/50 py-12 sm:py-14">
        <Container className="grid gap-8 lg:grid-cols-2">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-semibold text-brand-dark sm:text-3xl">Do not send patient information through this website.</h2>
            <p className="mt-4 text-base leading-relaxed text-brand-slate">
              The website contact form and the general inquiry email are for business inquiries only. Do not include patient names, dates of birth, medical record details, insurance member identifiers, protected health information (PHI), or other sensitive patient data.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <h2 className="font-display text-2xl font-semibold text-brand-dark sm:text-3xl">Ask for current documentation.</h2>
            <p className="mt-4 text-base leading-relaxed text-brand-slate">
              This website does not claim a security certification, HIPAA certification, or a particular contractual status. Before sharing confidential information, ask Practice Care Source to confirm the applicable safeguards, agreements, and points of contact for the specific work being discussed.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-brand-slate">
              General inquiries: <a href={`mailto:${siteConfig.contactEmail}`} className="font-semibold text-brand-accent-ink underline underline-offset-4">{siteConfig.contactEmail}</a>
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container>
          <ScrollReveal>
            <div className="rounded-3xl bg-brand-navy p-7 text-white shadow-card sm:p-10">
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">Have a question about the right scope?</h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200">Start with a general business inquiry. Please leave patient and confidential data out of the message.</p>
              <Button href="/contact" size="lg" showArrow className="mt-7">Contact Practice Care Source</Button>
              <Link href="/services" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-200 hover:text-white">Review services <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}
