import Link from "next/link";
import { Container } from "@/components/container";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export function LegalPageShell({
  title,
  summary,
  sections,
}: {
  title: string;
  summary: string;
  sections: LegalSection[];
}) {
  return (
    <main id="main-content">
      <section className="border-b border-brand-border bg-brand-navy py-14 text-white sm:py-16 lg:py-20">
        <Container size="narrow">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm font-semibold text-slate-300">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white">{title}</li>
            </ol>
          </nav>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-200">
            Practice Care Source
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-200 sm:text-lg">
            {summary}
          </p>
        </Container>
      </section>

      <section className="py-10 sm:py-12 lg:py-16">
        <Container size="narrow">
          <aside className="rounded-2xl border border-brand-accent/30 bg-brand-background-wash/45 p-5 sm:p-6">
            <p className="text-sm font-bold text-brand-dark">Draft for business and legal review</p>
            <p className="mt-2 text-sm leading-relaxed text-brand-slate">
              This is a preliminary website-content draft, not legal advice or a statement that Practice Care Source meets any particular privacy or consumer-protection law. Confirm the legal operator, applicable jurisdictions, vendor arrangements, retention periods, and required disclosures with qualified counsel before treating this page as final.
            </p>
            <p className="mt-3 text-xs font-semibold text-brand-accent-ink">
              Approval status: not yet confirmed. Effective date: to be set after review.
            </p>
          </aside>

          <div className="mt-9 space-y-9">
            {sections.map((section, index) => (
              <section key={section.heading} aria-labelledby={`legal-section-${index}`}>
                <h2
                  id={`legal-section-${index}`}
                  className="font-display text-2xl font-semibold leading-tight text-brand-dark sm:text-3xl"
                >
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-[1.8] text-brand-slate">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul className="list-disc space-y-2 pl-6">
                      {section.bullets.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 border-t border-brand-border pt-6 text-sm leading-relaxed text-brand-slate">
            <p>
              Questions about this draft? Contact{" "}
              <a
                href="mailto:info@practicecaresource.com"
                className="font-semibold text-brand-accent-ink underline underline-offset-4"
              >
                info@practicecaresource.com
              </a>.
            </p>
            <p className="mt-3">
              Related information: <Link href="/security" className="font-semibold text-brand-accent-ink underline underline-offset-4">Security and information handling</Link> and <Link href="/contact" className="font-semibold text-brand-accent-ink underline underline-offset-4">Contact</Link>.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
