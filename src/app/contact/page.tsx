import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, MessageCircle, ShieldAlert } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { PageHeroImage } from "@/components/page-hero-image";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { WaveDivider } from "@/components/wave-divider";
import { ContactForm } from "./contact-form";
import { footerContact } from "@/lib/site";
import { serviceCatalog } from "@/data/services";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Practice Care Source to discuss medical billing and practice support for your team.",
};

const nextSteps = [
  ["01", "Tell us what you need", "Share the general workflow or service your practice wants to discuss."],
  ["02", "We review your enquiry", "Your message gives the team context about your practice and the support you are exploring."],
  ["03", "Discuss a practical next step", "Practice Care Source follows up using the contact details you provide."],
];

const faqs = [
  ["What happens after I send a message?", "Practice Care Source reviews your request and follows up using the contact details you provide."],
  ["Can I ask about more than one service?", "Yes. Choose the service closest to your main question and mention any other areas in your message."],
  ["Should I include patient information?", "No. Do not submit patient names, protected health information (PHI), medical records, or sensitive patient data. Use this form only for general business enquiries."],
  ["Do I need to know exactly which service I need?", "No. Select “Not sure yet” and describe the general business workflow you would like to discuss."],
];

export default function ContactPage() {
  return (
    <main id="main-content">
      <section className="relative isolate overflow-hidden bg-brand-navy pb-10 pt-8 text-white sm:pb-14 lg:pb-16">
        <div className="pointer-events-none absolute -right-36 -top-44 size-[38rem] rounded-full border border-white/10" aria-hidden="true"/>
        <div className="pointer-events-none absolute -right-12 -top-24 size-[28rem] rounded-full border border-brand-sky/15" aria-hidden="true"/>
        <Container className="relative grid items-center gap-10 lg:min-h-[27rem] lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <ScrollReveal className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-7 text-sm font-semibold text-white/55">
              <ol className="flex items-center gap-2"><li><Link href="/" className="hover:text-white">Home</Link></li><li aria-hidden="true">/</li><li aria-current="page" className="text-white">Contact</li></ol>
            </nav>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-sky"><MessageCircle size={16}/> Start a conversation</p>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.5rem]">A better working relationship starts with a <span className="text-brand-sky">conversation.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">Tell us what your practice is working through. Start with the essentials and share only the general business context needed to begin a discussion.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#contact-form" size="lg" showArrow>Send an enquiry</Button>
              <a href={`mailto:${footerContact.email}`} className="inline-flex min-h-14 items-center gap-2 rounded-full border border-white/25 px-6 text-sm font-bold text-white transition-colors hover:border-brand-sky hover:bg-white/10"><Mail size={17}/>{footerContact.email}</a>
            </div>
          </ScrollReveal>
          <PageHeroImage src={serviceCatalog[2].imageSrc} alt="Professional office team coordinating business workflows"/>
        </Container>
        <WaveDivider tone="to-light"/>
      </section>

      <section id="contact-form" className="scroll-mt-24 bg-white py-12 sm:py-16 lg:py-20">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-accent-ink">Before you send</p>
            <h2 className="mt-3 max-w-md font-display text-4xl font-semibold leading-tight text-brand-navy sm:text-5xl">A little context goes a long way.</h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-brand-slate">You do not need to have every detail figured out. Share the service you are exploring and the general workflow you would like to discuss.</p>

            <div className="mt-9 border-y border-brand-border py-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-slate">Prefer email?</p>
              <a href={`mailto:${footerContact.email}`} className="group mt-2 inline-flex items-center gap-3 text-lg font-bold text-brand-navy transition-colors hover:text-brand-accent-ink sm:text-xl">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-background-wash text-brand-accent-ink"><Mail size={19}/></span>
                <span className="break-all">{footerContact.email}</span>
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1"/>
              </a>
            </div>

            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-accent-ink">What happens next</p>
              <ol className="mt-5 space-y-6">
                {nextSteps.map(([number,title,body],index)=>(
                  <li key={number} className="relative flex gap-4">
                    {index < nextSteps.length-1 ? <span className="absolute left-[1.15rem] top-10 h-[calc(100%+0.25rem)] w-px bg-brand-border" aria-hidden="true"/> : null}
                    <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full border border-brand-sky/45 bg-white text-xs font-extrabold text-brand-accent-ink">{number}</span>
                    <span className="pt-0.5"><strong className="block text-sm font-bold text-brand-navy">{title}</strong><span className="mt-1 block text-sm leading-relaxed text-brand-slate">{body}</span></span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-9 flex items-start gap-3 border-l-4 border-brand-accent bg-brand-background-wash/60 px-4 py-4">
              <ShieldAlert size={19} className="mt-0.5 shrink-0 text-brand-accent-ink"/>
              <p className="text-sm leading-relaxed text-brand-slate"><strong className="block text-brand-navy">Business enquiries only. No patient information.</strong> Do not send patient names, PHI, medical records, insurance identifiers, or other sensitive patient details through this form or general email.</p>
            </div>
            <Link href="/security" className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-brand-accent-ink underline decoration-brand-sky underline-offset-4 hover:text-brand-navy">Read information and access guidance <ArrowRight size={15}/></Link>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="relative border border-brand-border bg-brand-background-wash/30 p-5 shadow-[0_24px_70px_rgba(11,27,63,.10)] sm:p-8 lg:p-10">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-navy via-brand-accent to-brand-sky" aria-hidden="true"/>
              <div className="mb-7 border-b border-brand-border pb-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-accent-ink">Business enquiry form</p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-brand-navy sm:text-4xl">Tell us about your practice.</h2>
                <p className="mt-3 text-sm leading-relaxed text-brand-slate">Required fields are marked. Optional details can be left blank.</p>
              </div>
              <ContactForm/>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="border-y border-brand-border bg-brand-background-wash/50 py-12 sm:py-16">
        <Container className="grid gap-9 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <ScrollReveal>
            <SectionHeading eyebrow="Helpful details" title="A few things you may be wondering" description="Quick answers about getting in touch and what to include in a business enquiry."/>
          </ScrollReveal>
          <div className="divide-y divide-brand-border border-y border-brand-border">
            {faqs.map(([question,answer],index)=>(
              <details key={question} className="group py-5" open={index===0}>
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-5 font-display text-xl font-semibold text-brand-navy marker:hidden [&::-webkit-details-marker]:hidden">{question}<span className="grid size-8 shrink-0 place-items-center rounded-full border border-brand-border text-brand-accent-ink transition-transform group-open:rotate-45">+</span></summary>
                <p className="max-w-2xl pb-2 pr-10 pt-3 text-sm leading-relaxed text-brand-slate sm:text-base">{answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-navy py-12 text-white sm:py-16">
        <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-sky">Explore your options</p><h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Not sure which service fits?</h2><p className="mt-3 text-base text-white/70">Review the service areas before starting a conversation.</p></div>
          <Button href="/services" size="lg" showArrow className="shrink-0 self-start">Explore services</Button>
        </Container>
      </section>
    </main>
  );
}
