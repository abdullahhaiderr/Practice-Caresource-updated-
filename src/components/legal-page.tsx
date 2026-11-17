import Link from "next/link";
import { Container } from "@/components/container";
import { WaveDivider } from "@/components/wave-divider";

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
      <section className="relative isolate overflow-hidden bg-brand-navy py-12 text-white sm:py-16 lg:py-20">
        <div className="pointer-events-none absolute -right-32 -top-40 size-[32rem] rounded-full border border-white/10" aria-hidden="true"/>
        <Container size="narrow" className="relative">
          <nav aria-label="Breadcrumb" className="mb-7 text-sm font-semibold text-white/55">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="transition-colors hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white">{title}</li>
            </ol>
          </nav>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-sky">Practice Care Source · Legal information</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">{summary}</p>
        </Container>
      </section>
      <WaveDivider tone="to-light"/>

      <section className="bg-white py-10 sm:py-14 lg:py-18">
        <Container className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
          <aside className="self-start lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-accent-ink">On this page</p>
            <nav aria-label="Legal page contents" className="mt-4 border-l border-brand-border pl-4">
              <ol className="space-y-3">
                {sections.map((section,index)=>(
                  <li key={section.heading}>
                    <a href={`#legal-section-${index}`} className="text-sm leading-relaxed text-brand-slate transition-colors hover:text-brand-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink">{section.heading}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="min-w-0">
            <aside className="border-l-4 border-brand-accent bg-brand-background-wash/65 px-5 py-5 sm:px-6" aria-label="Draft legal notice">
              <p className="text-sm font-bold text-brand-navy">Draft for business and qualified legal review</p>
              <p className="mt-2 text-sm leading-relaxed text-brand-slate">
                This is a preliminary website-content draft, not legal advice or a statement that Practice Care Source meets any particular privacy or consumer-protection law. Confirm the legal operator, applicable jurisdictions, vendor arrangements, retention periods, and required disclosures with qualified counsel before treating this page as final.
              </p>
              <p className="mt-3 text-xs font-semibold text-brand-accent-ink">Approval status: not yet confirmed. Effective date: to be set after review.</p>
            </aside>

            <div className="mt-10 divide-y divide-brand-border border-y border-brand-border">
              {sections.map((section,index)=>(
                <section key={section.heading} id={`legal-section-${index}`} aria-labelledby={`legal-heading-${index}`} className="scroll-mt-28 py-8 sm:py-9">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-accent-ink">Section {String(index+1).padStart(2,"0")}</p>
                  <h2 id={`legal-heading-${index}`} className="mt-2 font-display text-2xl font-semibold leading-tight text-brand-navy sm:text-3xl">{section.heading}</h2>
                  <div className="mt-4 max-w-[72ch] space-y-4 text-base leading-[1.85] text-brand-slate">
                    {section.paragraphs.map((paragraph,paragraphIndex)=><p key={paragraphIndex}>{paragraph}</p>)}
                    {section.bullets ? <ul className="list-disc space-y-2 pl-6">{section.bullets.map(item=><li key={item}>{item}</li>)}</ul> : null}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-9 border-t border-brand-border pt-6 text-sm leading-relaxed text-brand-slate">
              <p>Questions about this draft? Contact <a href="mailto:info@practicecaresource.com" className="font-semibold text-brand-accent-ink underline underline-offset-4">info@practicecaresource.com</a>.</p>
              <p className="mt-3">Related information: <Link href="/security" className="font-semibold text-brand-accent-ink underline underline-offset-4">Security and information handling</Link> and <Link href="/contact" className="font-semibold text-brand-accent-ink underline underline-offset-4">Contact</Link>.</p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
