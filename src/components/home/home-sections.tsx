import Link from "next/link";
import { ArrowRight, Check, ClipboardCheck, Clock3, FileCheck2, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { WaveDivider } from "@/components/wave-divider";
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
  ["Understand", "Discuss your current workflow, goals, tools, and the areas where support is needed."],
  ["Agree", "Set responsibilities, priorities, systems, approvals, and communication preferences."],
  ["Prepare", "Organize the information and access arrangements your practice approves."],
  ["Work", "Handle assigned tasks through the process confirmed with your team."],
  ["Escalate", "Route missing details, decisions, and questions back to the right practice contact."],
  ["Review", "Discuss open items and refine the workflow as your needs change."],
];

const principles = [
  [ClipboardCheck, "Agreed responsibilities", "Define who prepares, reviews, approves, and follows up."],
  [MessageCircle, "Clear communication", "Choose how questions and exceptions are returned to the team."],
  [ShieldCheck, "Practice-led decisions", "Keep approvals and decisions with the appropriate practice contact."],
  [Users, "Connected support", "Discuss related services where shared workflows make sense."],
];

const onboarding = [
  [MessageCircle, "Initial conversation", "Share the workflow and support your team wants to explore."],
  [ClipboardCheck, "Practice assessment", "Review systems, responsibilities, and the information needed."],
  [FileCheck2, "Scope and setup", "Agree on tasks, access, documentation, approvals, and communication."],
  [Clock3, "Ongoing review", "Set review points for open items and any workflow adjustments."],
];

const faqs = [
  ["Which services can we discuss?", "The current service pages cover medical billing, credentialing and enrollment, virtual assistant services, AR recovery, denial management, and website development. The exact scope is confirmed with your practice."],
  ["Can we start with one service?", "Yes. Start with the workflow you want to discuss. Any responsibilities, access, and handoffs are agreed before work begins."],
  ["Can services be combined?", "Related services can be discussed together. The agreed scope should make responsibilities and review points clear."],
  ["Do you guarantee payer decisions or financial results?", "No. Payer decisions and outcomes depend on the circumstances of each claim and payer. A consultation is a chance to discuss the work and its requirements, not a guarantee."],
  ["What should we include in a consultation request?", "Share general business information about your practice, the service you are exploring, and the workflow you want to discuss."],
  ["Can I submit patient information through this website?", "No. The website form is for general business inquiries only. Do not submit patient names, protected health information, or sensitive patient data."],
];

export function HomeSections() {
  return (
    <>
      <section className="bg-white py-10 sm:py-14 lg:py-16">
        <Container>
          <ScrollReveal>
            <div className="flex flex-col gap-6 border-y border-brand-border py-7 sm:flex-row sm:items-center sm:justify-between sm:py-8">
              <div className="max-w-2xl border-l-4 border-brand-accent pl-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-accent-ink">A practical starting point</p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-brand-navy sm:text-3xl">Not sure where to start?</h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-slate sm:text-base">Tell us what your practice is working through. We can discuss the service scope, current process, and a sensible next step.</p>
              </div>
              <Button href="/contact" size="lg" showArrow className="shrink-0 self-start">Talk with our team</Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-brand-background-wash/55 py-14 sm:py-18 lg:py-22">
        <Container className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <ScrollReveal>
            <SectionHeading eyebrow="Practice challenges" title={<>When the work behind the visit gets <span className="text-brand-accent-ink">complicated.</span></>} description="Administrative and billing workflows involve many small handoffs. Start with the parts your team wants to make easier to track."/>
          </ScrollReveal>
          <div className="grid gap-x-8 sm:grid-cols-2">
            {challenges.map(([title,description],index)=>(
              <ScrollReveal key={title} delay={index*0.035}>
                <article className="group flex min-h-32 gap-4 border-b border-brand-border py-5 transition-colors hover:border-brand-accent sm:py-6">
                  <span className="pt-0.5 font-display text-3xl font-semibold text-brand-accent/55">0{index+1}</span>
                  <span><h3 className="font-display text-xl font-semibold text-brand-navy transition-colors group-hover:text-brand-accent-ink">{title}</h3><p className="mt-2 text-sm leading-relaxed text-brand-slate">{description}</p></span>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-18 lg:py-22">
        <Container>
          <ScrollReveal>
            <SectionHeading eyebrow="How we can help" title={<>Support that fits the work your practice <span className="text-brand-accent-ink">needs to do.</span></>} description="Explore the services currently listed by Practice Care Source. Scope and responsibilities are confirmed with your team before work begins."/>
          </ScrollReveal>
          <div className="mt-10 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCatalog.map((service,index)=>(
              <ScrollReveal key={service.slug} delay={index*0.045} className="h-full">
                <ServiceCard title={service.title} description={service.description} imageSrc={service.imageSrc} imageAlt={service.imageAlt} icon={service.icon} href={`/services/${service.slug}`}/>
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-9 flex justify-center"><Button href="/services" variant="ghost" size="lg" showArrow>View all services</Button></div>
        </Container>
      </section>

      <section id="process" className="bg-brand-navy py-14 text-white sm:py-18 lg:py-22">
        <Container>
          <ScrollReveal>
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-sky">A clear working process</p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">Agree on the workflow <span className="text-brand-sky">before work begins.</span></h2>
              <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">A practical sequence helps everyone understand what is happening, who is responsible, and when the practice needs to review an item.</p>
            </div>
          </ScrollReveal>
          <ol className="mt-12 grid gap-0 sm:grid-cols-2 lg:grid-cols-6">
            {process.map(([title,description],index)=>(
              <li key={title} className="relative border-l border-white/20 py-3 pl-6 sm:py-0 sm:pl-6 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-7 lg:pr-5">
                <span className="absolute -left-[0.4rem] top-4 size-3 rounded-full border-2 border-brand-sky bg-brand-navy sm:top-1 lg:-top-[0.4rem]"/>
                <p className="text-xs font-extrabold tracking-[0.16em] text-brand-sky">0{index+1}</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <TestimonialsSection/>

      <section className="bg-white py-14 sm:py-18 lg:py-22">
        <Container className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-accent-ink">Why start with a conversation?</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-brand-navy sm:text-5xl">A plan shaped around your practice.</h2>
            <p className="mt-5 text-base leading-relaxed text-brand-slate">Every practice has its own systems, review needs, and ways of working. A clear discussion helps define which tasks are in scope and what should remain with your team.</p>
            <Link href="/about" className="mt-7 inline-flex min-h-11 items-center gap-2 font-bold text-brand-accent-ink underline decoration-brand-sky underline-offset-4 hover:text-brand-navy">Learn about our approach <ArrowRight size={17}/></Link>
          </ScrollReveal>
          <div className="grid gap-x-8 sm:grid-cols-2">
            {principles.map(([Icon,title,description],index)=>{
              const ItemIcon=Icon as typeof ClipboardCheck;
              return <ScrollReveal key={title as string} delay={index*0.05}><article className="border-t border-brand-border py-6"><span className="flex size-10 items-center justify-center rounded-xl bg-brand-background-wash text-brand-accent-ink"><ItemIcon size={21}/></span><h3 className="mt-4 font-display text-xl font-semibold text-brand-navy">{title as string}</h3><p className="mt-2 text-sm leading-relaxed text-brand-slate">{description as string}</p></article></ScrollReveal>;
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-brand-border bg-brand-background-wash/45 py-14 sm:py-18 lg:py-20">
        <Container>
          <ScrollReveal><SectionHeading eyebrow="Getting started" title="From the first conversation to a defined scope" description="The onboarding sequence is tailored to the services and tools your practice wants to discuss."/></ScrollReveal>
          <ol className="mt-10 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
            {onboarding.map(([Icon,title,description],index)=>{
              const StepIcon=Icon as typeof MessageCircle;
              return <li key={title as string} className="relative border-l border-brand-border py-4 pl-6 sm:py-0 sm:pl-6 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-7 lg:pr-8"><span className="absolute -left-[0.4rem] top-5 size-3 rounded-full border-2 border-brand-accent bg-brand-background-wash sm:top-1 lg:-top-[0.4rem]"/><span className="grid size-10 place-items-center rounded-xl bg-white text-brand-accent-ink shadow-sm"><StepIcon size={20}/></span><p className="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-brand-accent-ink">Step 0{index+1}</p><h3 className="mt-2 font-display text-xl font-semibold text-brand-navy">{title as string}</h3><p className="mt-2 text-sm leading-relaxed text-brand-slate">{description as string}</p></li>;
            })}
          </ol>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-18 lg:py-22">
        <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-accent-ink">Common questions</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-brand-navy">Good questions to ask before getting started.</h2>
            <p className="mt-4 text-base leading-relaxed text-brand-slate">The right scope depends on your practice and the work you want to discuss.</p>
            <Button href="/contact" size="md" variant="ghost" showArrow className="mt-6">Ask a question</Button>
          </ScrollReveal>
          <div className="divide-y divide-brand-border border-y border-brand-border">
            {faqs.map(([question,answer],index)=><details key={question} className="group py-5" open={index===0}><summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold text-brand-navy marker:hidden [&::-webkit-details-marker]:hidden">{question}<span className="grid size-8 shrink-0 place-items-center rounded-full border border-brand-border text-brand-accent-ink transition-transform group-open:rotate-45">+</span></summary><p className="max-w-3xl pb-2 pr-8 pt-3 text-sm leading-relaxed text-brand-slate sm:text-base">{answer}</p></details>)}
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden bg-brand-navy py-14 text-white sm:py-18 lg:py-22">
        <div className="pointer-events-none absolute -right-24 -top-32 size-[26rem] rounded-full border border-white/10" aria-hidden="true"/>
        <Container className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-sky">Start a conversation</p><h2 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">Let’s discuss the right support for your practice.</h2><p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">Tell us about your business needs and the workflow you want to improve. We’ll use that conversation to understand the scope and possible next steps.</p><p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-white/60"><Check size={15} className="mt-0.5 shrink-0 text-brand-sky"/>Business enquiries only. Do not submit patient names, protected health information (PHI), or sensitive patient data.</p></div>
          <div className="flex shrink-0 flex-col gap-3 self-start"><Button href="/contact" size="lg" showArrow>Request a Consultation</Button><a href={`mailto:${footerContact.email}`} className="text-sm font-semibold text-white/75 underline decoration-brand-sky underline-offset-4">{footerContact.email}</a></div>
        </Container>
      </section>
    </>
  );
}
