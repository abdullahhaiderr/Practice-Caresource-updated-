import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Mail,
  MessageSquareText,
} from "lucide-react";
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
  description:
    "Contact Practice Care Source to discuss medical billing and practice support for your team.",
};

const nextSteps = [
  {
    number: "01",
    title: "Tell us what you need",
    body: "Share the general workflow or service your practice wants to discuss.",
  },
  {
    number: "02",
    title: "We review your enquiry",
    body: "Your message gives the team context about your practice and the support you are exploring.",
  },
  {
    number: "03",
    title: "Discuss a practical next step",
    body: "Practice Care Source follows up using the contact details you provide.",
  },
];

const faqs = [
  {
    question: "What happens after I send a message?",
    answer:
      "Practice Care Source reviews your request and follows up using the contact details you provide.",
  },
  {
    question: "Can I ask about more than one service?",
    answer:
      "Yes. Choose the service closest to your main question and mention any other areas in your message.",
  },
  {
    question: "Should I include patient information?",
    answer:
      "No. Do not submit patient names, protected health information (PHI), medical records, or sensitive patient data. Use this form only for general business enquiries.",
  },
  {
    question: "Do I need to know exactly which service I need?",
    answer:
      "No. Select “Not sure yet” and describe the general business workflow you would like to discuss.",
  },
];

export default function ContactPage() {
  return (
    <main id="main-content">
      <section className="relative isolate overflow-hidden bg-brand-navy pb-12 pt-7 text-white sm:pb-16 sm:pt-9 lg:pb-18 lg:pt-10">
        <div className="pointer-events-none absolute -right-32 -top-40 size-[36rem] rounded-full border border-white/10" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-8 -top-20 size-[28rem] rounded-full border border-brand-sky/15" aria-hidden="true" />
        <Container className="relative grid items-center gap-10 lg:min-h-[27rem] lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] lg:gap-14">
          <ScrollReveal className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-7">
              <ol className="flex items-center gap-2 text-sm font-semibold text-white/65">
                <li>
                  <Link href="/" className="rounded-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white">Contact</li>
              </ol>
            </nav>
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-sky">
              <MessageSquareText size={16} aria-hidden="true" />
              Start a conversation
            </p>
            <h1 className="max-w-3xl text-balance font-display text-5xl font-semibold leading-[0.99] tracking-tight text-white sm:text-6xl lg:text-[4.2rem]">
              Let’s find a clearer next step for <span className="text-brand-sky">your practice.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              Tell us what kind of support you are exploring. Start with a few details, then share the workflow you would like to discuss.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button href="#contact-form" size="lg" showArrow>
                Request a conversation
              </Button>
              <a
                href={`mailto:${footerContact.email}`}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 px-5 text-sm font-bold text-white transition-colors hover:border-brand-sky hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
              >
                <Mail size={17} aria-hidden="true" />
                Email us
              </a>
            </div>
          </ScrollReveal>
          <PageHeroImage
            src={serviceCatalog[2].imageSrc}
            alt="A team member coordinating work in a professional office"
          />
        </Container>
      </section>
      <WaveDivider tone="to-light" />

      <section id="contact-form" className="scroll-mt-24 py-10 sm:py-14 lg:py-16">
        <Container className="grid items-start gap-8 lg:grid-cols-[minmax(17rem,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
          <ScrollReveal className="space-y-5">
            <div className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-accent-ink">
                Get in touch
              </p>
              <h2 className="font-display text-3xl font-semibold leading-tight text-brand-navy sm:text-4xl">
                A simple way to start.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-slate sm:text-base">
                A little context helps the team understand what you are looking for. You do not need to have every detail figured out.
              </p>
            </div>

            <a
              href={`mailto:${footerContact.email}`}
              className="group flex items-start gap-4 rounded-2xl border border-brand-border bg-white p-5 shadow-[0_8px_26px_rgb(11_27_63_/_0.05)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-brand-sky/65 hover:shadow-card-hover motion-reduce:transform-none motion-reduce:transition-none"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-background-wash text-brand-accent-ink transition-colors group-hover:bg-brand-accent group-hover:text-white">
                <Mail size={21} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-bold uppercase tracking-[0.13em] text-brand-slate">Email</span>
                <span className="mt-1 block break-all font-semibold text-brand-navy">{footerContact.email}</span>
                <span className="mt-1 block text-xs text-brand-slate">Use your email app instead of the form</span>
              </span>
              <ArrowRight size={17} className="mt-1 shrink-0 text-brand-accent-ink transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>

            <div className="rounded-3xl bg-brand-navy p-6 text-white shadow-card sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-sky">What happens next</p>
              <h3 className="mt-2 font-display text-2xl font-semibold">A clear three-step path.</h3>
              <ol className="mt-6 space-y-5">
                {nextSteps.map((item, index) => (
                  <li key={item.number} className="flex gap-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-brand-sky/35 bg-white/5 text-xs font-bold text-brand-sky">
                      {item.number}
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-white">{item.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-white/65">{item.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-brand-border bg-brand-background-wash/55 p-5">
              <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-brand-accent-ink" aria-hidden="true" />
              <div>
                <p className="text-sm font-bold text-brand-navy">No patient information, please</p>
                <p className="mt-1 text-sm leading-relaxed text-brand-slate">
                  This is a business enquiry channel only. Do not send patient names, PHI, medical records, insurance identifiers or sensitive patient details.
                </p>
                <Link href="/security" className="mt-3 inline-flex min-h-9 items-center gap-2 text-sm font-bold text-brand-accent-ink underline decoration-brand-accent/40 underline-offset-4 hover:decoration-brand-accent">
                  Information and access guidance <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.07}>
            <div className="relative overflow-hidden rounded-3xl border border-brand-border bg-white p-5 shadow-[0_18px_55px_rgb(11_27_63_/_0.09)] sm:p-8 lg:p-9">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-navy via-brand-accent to-brand-sky" aria-hidden="true" />
              <div className="mb-7">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-accent-ink">Business enquiry</p>
                <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-brand-navy sm:text-4xl">
                  Tell us about your practice.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-slate">
                  Two short steps. Required fields are marked, and you can leave the optional details blank.
                </p>
              </div>
              <ContactForm />
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="border-y border-brand-border/75 bg-brand-background-wash/45 py-11 sm:py-14 lg:py-16">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="Helpful details"
              title="A few things you may be wondering"
              description="Quick answers about getting in touch and what to include in a business enquiry."
              className="mb-8 sm:mb-10"
            />
          </ScrollReveal>

          <div className="grid auto-rows-fr gap-4 md:grid-cols-2 lg:gap-5">
            {faqs.map(({ question, answer }, index) => (
              <ScrollReveal key={question} delay={index * 0.06} className="h-full">
                <article className="group flex h-full items-start gap-4 rounded-2xl border border-brand-border bg-white p-5 shadow-[0_8px_26px_rgb(11_27_63_/_0.045)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-brand-sky/60 hover:shadow-card-hover motion-reduce:transform-none motion-reduce:transition-none sm:p-7">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-background-wash text-sm font-bold text-brand-accent-ink transition-colors group-hover:bg-brand-accent group-hover:text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-display text-xl font-semibold leading-snug text-brand-navy sm:text-2xl">{question}</span>
                    <span className="mt-3 block text-sm leading-relaxed text-brand-slate sm:text-base">{answer}</span>
                  </span>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <WaveDivider tone="to-dark" />
      <section className="relative isolate overflow-hidden bg-brand-dark py-12 text-white sm:py-16 lg:py-20">
        <div className="pointer-events-none absolute -right-28 -top-40 size-[30rem] rounded-full border border-brand-sky/15" aria-hidden="true" />
        <Container className="relative">
          <ScrollReveal>
            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-sky">
                  Practice Care Source
                </p>
                <h2 className="text-balance font-display text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Start with the workflow you want to improve.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
                  Explore the services or send a general business enquiry when you are ready to talk through the next step.
                </p>
              </div>
              <Button href="/services" size="lg" showArrow className="shrink-0 self-start">
                Explore services
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}
