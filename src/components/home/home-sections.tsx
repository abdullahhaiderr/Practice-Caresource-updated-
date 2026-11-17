import Link from "next/link";
import { ArrowRight, Check, ClipboardCheck, Clock3, FileCheck2, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { serviceCatalog } from "@/data/services";
import { footerContact } from "@/lib/site";

const challenges = [
  ["Claims that need follow-up", "Keep returned items, missing details, and payer responses visible to the right people."],
  ["Aging accounts receivable", "Organize outstanding account work into a reviewable queue with documented next steps."],
  ["Recurring denials", "Record denial reasons and coordinate supporting information for practice review."],
  ["Enrollment administration", "Keep provider information, documents, and application follow-up organized."],
  ["Busy front-office workflows", "Agree on routine administrative tasks, message routes, and escalation points."],
  ["Disconnected handoffs", "Make responsibilities and review points easier for the practice team to follow."],
];

const process = [
  ["Understand the practice", "Discuss your current workflow, goals, tools, and the areas where support is needed."],
  ["Agree on scope", "Set responsibilities, priorities, systems, approvals, and communication preferences."],
  ["Prepare the work", "Organize the information and access arrangements your practice approves."],
  ["Work the agreed queue", "Handle assigned tasks through the process confirmed with your team."],
  ["Escalate exceptions", "Route missing details, decisions, and questions back to the right practice contact."],
  ["Review and adjust", "Discuss open items and refine the workflow as your needs change."],
];

const faqs = [
  ["Which services can we discuss?", "The current service pages cover medical billing, credentialing and enrollment, virtual assistant services, AR recovery, denial management, and website development. The exact scope is confirmed with your practice."],
  ["Can we start with one service?", "Yes. Start with the workflow you want to discuss. Any responsibilities, access, and handoffs are agreed before work begins."],
  ["Can services be combined?", "Related services can be discussed together. The agreed scope should make responsibilities and review points clear."],
  ["Do you guarantee payer decisions or financial results?", "No. Payer decisions and outcomes depend on the circumstances of each claim and payer. A consultation is a chance to discuss the work and its requirements, not a guarantee."],
  ["What should we include in a consultation request?", "Share general business information about your practice, the service you are exploring, and the workflow you want to discuss."],
  ["Can I submit patient information through this website?", "No. The website form is for general business inquiries only. Do not submit patient names, protected health information, or sensitive patient data."],
];

function ChallengeCard({ title, description, index }: { title: string; description: string; index: number }) {
  return (
    <article className="h-full rounded-2xl border border-brand-border bg-white p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-accent/35 hover:shadow-card-hover">
      <span className="grid size-11 place-items-center rounded-xl bg-brand-background-wash text-brand-accent-ink"><span className="font-display text-sm font-bold">0{index + 1}</span></span>
      <h3 className="mt-5 font-display text-lg font-semibold text-brand-dark">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-brand-slate">{description}</p>
    </article>
  );
}

export function HomeSections() {
  return (
    <>
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <Container>
          <ScrollReveal>
            <div className="flex flex-col gap-5 rounded-3xl border border-brand-border bg-brand-background-wash/70 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-accent-ink">A practical starting point</p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-brand-dark sm:text-3xl">Not sure where to start?</h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-slate sm:text-base">Tell us what your practice is working through. We can discuss the service scope, current process, and a sensible next step.</p>
              </div>
              <Button href="/contact" size="lg" showArrow className="shrink-0">Talk with our team</Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-brand-background-wash/55 py-14 sm:py-16 lg:py-20">
        <Container>
          <ScrollReveal>
            <SectionHeading eyebrow="Practice challenges" title={<>When the work behind the visit gets <span className="text-brand-accent-ink">complicated.</span></>} description="Administrative and billing workflows involve many small handoffs. Start with the parts your team wants to make easier to track." />
          </ScrollReveal>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {challenges.map(([title, description], index) => <ScrollReveal key={title} delay={index * 0.035}><ChallengeCard title={title} description={description} index={index} /></ScrollReveal>)}
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <Container>
          <ScrollReveal>
            <SectionHeading eyebrow="How we can help" title={<>Support that fits the work your practice <span className="text-brand-accent-ink">needs to do.</span></>} description="Explore the services currently listed by Practice Care Source. Scope and responsibilities are confirmed with your team before work begins." />
          </ScrollReveal>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCatalog.map((service, index) => (
              <ScrollReveal key={service.slug} delay={index * 0.035}>
                <ServiceCard title={service.title} description={service.description} imageSrc={service.imageSrc} imageAlt={service.imageAlt} icon={service.icon} href={`/services/${service.slug}`} />
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-8 flex justify-center"><Button href="/services" variant="ghost" size="lg" showArrow>View all services</Button></div>
        </Container>
      </section>

      <section id="process" className="border-y border-brand-border bg-brand-background-wash/45 py-14 sm:py-16 lg:py-20">
        <Container>
          <ScrollReveal>
            <SectionHeading eyebrow="A clear working process" title={<>Agree on the workflow <span className="text-brand-accent-ink">before work begins.</span></>} description="A practical sequence helps everyone understand what is happening, who is responsible, and when the practice needs to review an item." />
          </ScrollReveal>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {process.map(([title, description], index) => (
              <li key={title} className="relative rounded-2xl border border-brand-border bg-white p-6 shadow-card">
                <span className="font-display text-3xl font-bold tracking-tight text-brand-accent/35">0{index + 1}</span>
                <h3 className="mt-4 font-display text-lg font-semibold text-brand-dark">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-slate">{description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-brand-navy py-14 text-white sm:py-16 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-200">Why start with a conversation?</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">A plan shaped around your practice.</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-200">Every practice has its own systems, review needs, and ways of working. A clear discussion helps define which tasks are in scope and what should remain with your team.</p>
            <Link href="/about" className="mt-7 inline-flex min-h-11 items-center gap-2 font-bold text-sky-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Learn about our approach <ArrowRight size={17} aria-hidden="true" /></Link>
          </ScrollReveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              [ClipboardCheck, "Agreed responsibilities", "Define who prepares, reviews, approves, and follows up."],
              [MessageCircle, "Clear communication", "Choose how questions and exceptions are returned to the team."],
              [ShieldCheck, "Practice-led decisions", "Keep approvals and decisions with the appropriate practice contact."],
              [Users, "Connected support", "Discuss related services where shared workflows make sense."],
            ].map(([Icon, title, description]) => {
              const CardIcon = Icon as typeof ClipboardCheck;
              return <div key={title as string} className="rounded-2xl border border-white/15 bg-white/5 p-5"><CardIcon size={22} className="text-brand-mint" aria-hidden="true" /><h3 className="mt-4 font-display font-semibold text-white">{title as string}</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">{description as string}</p></div>;
            })}
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <Container>
          <ScrollReveal><SectionHeading eyebrow="Getting started" title="From the first conversation to a defined scope" description="The onboarding sequence is tailored to the services and tools your practice wants to discuss." /></ScrollReveal>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [MessageCircle, "Initial conversation", "Share the workflow and support your team wants to explore."],
              [ClipboardCheck, "Practice assessment", "Review systems, responsibilities, and the information needed."],
              [FileCheck2, "Scope and setup", "Agree on tasks, access, documentation, approvals, and communication."],
              [Clock3, "Ongoing review", "Set review points for open items and any workflow adjustments."],
            ].map(([Icon, title, description], index) => {
              const StepIcon = Icon as typeof MessageCircle;
              return <article key={title as string} className="rounded-2xl border border-brand-border bg-brand-background-wash/50 p-5"><span className="grid size-11 place-items-center rounded-xl bg-white text-brand-accent-ink shadow-sm"><StepIcon size={21} aria-hidden="true" /></span><p className="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-brand-accent-ink">Step 0{index + 1}</p><h3 className="mt-2 font-display text-lg font-semibold text-brand-dark">{title as string}</h3><p className="mt-2 text-sm leading-relaxed text-brand-slate">{description as string}</p></article>;
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-brand-border bg-brand-background-wash/45 py-14 sm:py-16 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-accent-ink">Common questions</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-brand-dark">Good questions to ask before getting started.</h2>
            <p className="mt-4 text-sm leading-relaxed text-brand-slate">The right scope depends on your practice and the work you want to discuss.</p>
            <Button href="/contact" size="md" variant="ghost" showArrow className="mt-6">Ask a question</Button>
          </ScrollReveal>
          <div className="divide-y divide-brand-border border-y border-brand-border bg-white px-5 sm:px-7">
            {faqs.map(([question, answer], index) => <details key={question} className="group py-5" open={index === 0}><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink sm:text-lg [&::-webkit-details-marker]:hidden">{question}<span className="grid size-8 shrink-0 place-items-center rounded-full border border-brand-border text-brand-accent-ink"><span className="group-open:hidden">+</span><span className="hidden group-open:inline">−</span></span></summary><p className="max-w-3xl pb-1 pr-8 pt-3 text-sm leading-relaxed text-brand-slate sm:text-base">{answer}</p></details>)}
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <Container>
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-brand-navy px-6 py-10 text-white shadow-card sm:px-10 sm:py-14 lg:px-14">
              <div className="pointer-events-none absolute -right-20 -top-28 size-80 rounded-full border-[4rem] border-sky-300/10" aria-hidden="true" />
              <div className="relative max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-200">Start a conversation</p>
                <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">Let’s discuss the right support for your practice.</h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200">Tell us about your business needs and the workflow you want to improve. We’ll use that conversation to understand the scope and possible next steps.</p>
                <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button href="/contact" size="lg" showArrow>Request a Consultation</Button>
                  <a href={`mailto:${footerContact.email}`} className="inline-flex min-h-12 items-center font-semibold text-sky-100 underline decoration-sky-300/60 underline-offset-4 hover:text-white">{footerContact.email}</a>
                </div>
                <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-slate-300"><Check size={15} className="mt-0.5 shrink-0 text-brand-mint" aria-hidden="true" />Business inquiries only. Do not submit patient names, protected health information (PHI), or sensitive patient data.</p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
