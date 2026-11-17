import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ClipboardCheck, Eye, Handshake } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { PageHeroImage } from "@/components/page-hero-image";
import { serviceCatalog } from "@/data/services";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { WaveDivider } from "@/components/wave-divider";
import { aboutStructuredData, serializeJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "About",
  description: "Learn how Practice Care Source brings medical billing and practice support together for healthcare providers.",
};

const principles = [
  { icon: ClipboardCheck, title: "Care with the details", body: "Work starts from the information and workflows your practice provides. Questions and missing details are surfaced for review." },
  { icon: Eye, title: "Clarity at every handoff", body: "Responsibilities, communication, and review points are discussed with your practice before work begins." },
  { icon: Handshake, title: "Support that fits", body: "The scope is planned around your team's processes, preferences, and priorities rather than forcing a one-size-fits-all workflow." },
];

const steps = [
  ["Listen first", "Understand the practice, current workflow, goals, and the tasks where support is being explored."],
  ["Define the scope", "Clarify responsibilities, systems, priorities, approvals, and what remains with the practice."],
  ["Agree on handoffs", "Set expectations for communication, questions, missing information, and review."],
  ["Begin the agreed work", "Start within the scope and process the practice has reviewed."],
  ["Review together", "Discuss open items and agree any adjustments with the appropriate practice contact."],
];

export default function AboutPage() {
  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:serializeJsonLd(aboutStructuredData())}}/>
      <section className="relative isolate overflow-hidden bg-brand-navy pb-10 pt-8 text-white sm:pb-14 lg:pb-16">
        <div className="pointer-events-none absolute -right-36 -top-44 size-[38rem] rounded-full border border-white/10" aria-hidden="true"/>
        <Container className="relative grid items-center gap-10 lg:min-h-[27rem] lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <ScrollReveal className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-7 text-sm font-semibold text-white/55"><ol className="flex items-center gap-2"><li><Link href="/" className="hover:text-white">Home</Link></li><li aria-hidden="true">/</li><li aria-current="page" className="text-white">About</li></ol></nav>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-sky">About Practice Care Source</p>
            <h1 className="mt-5 text-balance font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.4rem]">Practice support built around <span className="text-brand-sky">the people doing the work.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">Practice Care Source brings medical billing and related practice support together for healthcare providers, with clear responsibilities and thoughtful coordination around each team's way of working.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Button href="/contact" size="lg" showArrow>Start a conversation</Button><Link href="/services" className="inline-flex min-h-14 items-center gap-2 rounded-full border border-white/25 px-6 text-sm font-bold text-white hover:bg-white/10">Explore services <ArrowRight size={16}/></Link></div>
          </ScrollReveal>
          <PageHeroImage src={serviceCatalog[0].imageSrc} alt="Healthcare professional reviewing information in a clinic"/>
        </Container>
        <WaveDivider tone="to-light"/>
      </section>

      <section id="our-approach" className="py-14 sm:py-18 lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <ScrollReveal className="relative">
            <div className="relative aspect-[4/5] max-h-[34rem] overflow-hidden rounded-t-[48%] rounded-b-[1.5rem] bg-brand-background-wash">
              <Image src={serviceCatalog[2].imageSrc} alt="Professional team working together in an office" fill sizes="(max-width: 1024px) 90vw, 40vw" className="object-cover"/>
            </div>
            <div className="absolute -bottom-5 -right-4 hidden max-w-[15rem] border border-brand-border bg-white p-5 shadow-card sm:block"><p className="font-display text-xl font-semibold text-brand-navy">Human communication.</p><p className="mt-1 text-sm text-brand-slate">Clear scope and agreed handoffs.</p></div>
          </ScrollReveal>
          <ScrollReveal>
            <SectionHeading eyebrow="Our approach" title="A working relationship should feel clear, not complicated." description="Every practice has its own systems, responsibilities, and priorities. A useful starting point is to understand the work before deciding how support should fit."/>
            <p className="mt-6 max-w-2xl text-base leading-[1.85] text-brand-slate sm:text-lg">The service scope, responsibilities, and review points are discussed with each practice before work begins. This gives both teams a shared understanding of what is included, where practice input is needed, and how questions should be handled.</p>
            <Link href="/contact" className="mt-7 inline-flex min-h-11 items-center gap-2 font-bold text-brand-accent-ink underline decoration-brand-sky underline-offset-4">Talk through your workflow <ArrowRight size={17}/></Link>
          </ScrollReveal>
        </Container>
      </section>

      <section className="border-y border-brand-border bg-brand-background-wash/45 py-14 sm:py-18 lg:py-22">
        <Container>
          <ScrollReveal><SectionHeading eyebrow="What guides our work" title="Three principles. One thoughtful approach." description="These principles shape how the work is scoped, communicated, and reviewed."/></ScrollReveal>
          <div className="mt-10 divide-y divide-brand-border border-y border-brand-border">
            {principles.map(({icon:Icon,title,body},index)=>(
              <ScrollReveal key={title} delay={index*0.06}>
                <article className="grid gap-4 py-7 sm:grid-cols-[5rem_0.7fr_1.3fr] sm:items-center sm:gap-8">
                  <span className="font-display text-4xl font-semibold text-brand-accent/45">0{index+1}</span>
                  <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-white text-brand-accent-ink shadow-sm"><Icon size={21}/></span><h3 className="font-display text-2xl font-semibold text-brand-navy">{title}</h3></div>
                  <p className="max-w-2xl text-base leading-relaxed text-brand-slate">{body}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-navy py-14 text-white sm:py-18 lg:py-22">
        <Container>
          <ScrollReveal><SectionHeading eyebrow="A connected service mix" title="Different needs, one place to start." description="Explore the services currently listed by Practice Care Source. The right combination depends on your practice and the work you want to discuss."/></ScrollReveal>
          <div className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCatalog.map((service,index)=>(
              <Link key={service.slug} href={`/services/${service.slug}`} className="group flex min-h-20 items-center justify-between gap-4 border-b border-white/15 py-5 transition-colors hover:border-brand-sky">
                <span><span className="block text-xs font-bold tracking-[0.15em] text-brand-sky/75">0{index+1}</span><span className="mt-1 block font-display text-xl font-semibold text-white group-hover:text-brand-sky">{service.shortTitle}</span></span>
                <ArrowRight size={18} className="shrink-0 text-white/50 transition-transform group-hover:translate-x-1 group-hover:text-brand-sky"/>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-18 lg:py-22">
        <Container>
          <ScrollReveal><SectionHeading eyebrow="How we begin" title="From first conversation to a clear scope" description="The onboarding sequence is tailored to the services and tools your practice wants to discuss."/></ScrollReveal>
          <ol className="mt-10 grid gap-0 lg:grid-cols-5">
            {steps.map(([title,body],index)=>(
              <li key={title} className="relative border-l border-brand-border py-2 pl-6 sm:pl-8 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-8 lg:pr-5">
                <span className="absolute -left-[0.45rem] top-2 grid size-4 place-items-center rounded-full border-4 border-white bg-brand-accent lg:-top-[0.45rem]">{""}</span>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-accent-ink">Step 0{index+1}</p>
                <h3 className="mt-3 font-display text-xl font-semibold text-brand-navy">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-slate">{body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-brand-background-wash/50 py-12 sm:py-16">
        <Container className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-accent-ink">Let's talk</p><h2 className="mt-3 font-display text-3xl font-semibold text-brand-navy sm:text-4xl">Start with the work your practice wants to improve.</h2><p className="mt-3 text-base text-brand-slate">Share the context and discuss a practical next step.</p></div>
          <Button href="/contact" size="lg" showArrow className="shrink-0 self-start">Request a consultation</Button>
        </Container>
      </section>
    </main>
  );
}
