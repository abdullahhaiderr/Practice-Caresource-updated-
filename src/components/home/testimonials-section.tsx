"use client";

import Image from "next/image";
import { useState } from "react";
import { Pause, Play, Quote } from "lucide-react";
import { Container } from "@/components/container";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";

const testimonials = [
  { name: "Emily Carter", image: "/testimonials/emily-carter.jpg", quote: "The billing team keeps our claims organized and explains what needs attention. Communication is clear, and we know who to contact with questions." },
  { name: "Olivia", image: "/testimonials/olivia.jpg", quote: "CareSource took time to understand our billing workflow. It’s helpful to have clear updates and a consistent point of contact." },
  { name: "Sophia Mitchell", image: "/testimonials/sophia-mitchell.jpg", quote: "The billing support fits into our existing process. Follow-up is clear, and we know what needs our team’s review." },
  { name: "James Anderson", image: "/testimonials/james-anderson.jpg", quote: "The team communicates clearly about billing questions and next steps. It’s easier to keep track of open items." },
  { name: "Ethan Walker", image: "/testimonials/ethan-walker.jpg", quote: "We appreciate the straightforward updates and organized billing support. Responsibilities are clear when questions come up." },
  { name: "Michael Brooks", image: "/testimonials/michael-brooks.jpg", quote: "CareSource helps us keep billing tasks organized. The team lets us know what information is needed and what comes next." },
  { name: "Daniel", image: "/testimonials/daniel.jpg", quote: "The handoffs are clear, and our team knows what to review. That makes it easier to coordinate billing support with our existing process." },
  { name: "Ryan Mitchell", image: "/testimonials/ryan-mitchell.jpg", quote: "The billing support follows our practice’s workflow. Communication and follow-up have been clear." },
];

function ReviewTrack({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className="flex w-max shrink-0 items-stretch gap-5 pr-5" aria-hidden={duplicate || undefined}>
      {testimonials.map((item) => (
        <li key={item.name} className="w-[min(82vw,22rem)] shrink-0 sm:w-[21rem]">
          <article className="flex h-[23rem] flex-col rounded-[1.4rem] border border-white/15 bg-white/[0.07] p-6 text-white shadow-[0_18px_50px_rgba(0,0,0,.18)] backdrop-blur-sm transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-brand-sky/55 hover:bg-white/[0.11] sm:p-7">
            <div className="flex items-center justify-between">
              <span className="grid size-11 place-items-center rounded-xl bg-brand-sky/15 text-brand-sky"><Quote size={20} aria-hidden="true" /></span>
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">Client perspective</span>
            </div>
            <blockquote className="mt-7 flex-1 text-[0.98rem] leading-[1.8] text-white/85">“{item.quote}”</blockquote>
            <div className="mt-6 flex items-center gap-3 border-t border-white/15 pt-5">
              <Image src={item.image} alt="" width={52} height={52} className="size-[52px] rounded-full border-2 border-white/15 object-cover"/>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">{item.name}</p>
                <p className="mt-0.5 text-xs text-white/55">Medical billing client</p>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

export function TestimonialsSection() {
  const [paused, setPaused] = useState(false);
  return (
    <section className="overflow-hidden bg-brand-navy py-16 text-white sm:py-20 lg:py-24" aria-label="Client testimonials">
      <Container>
        <ScrollReveal>
          <div className="flex flex-col gap-6 border-b border-white/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-sky">Client experiences</p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl">Good work is felt in the <span className="text-brand-sky">everyday details.</span></h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">Hear how clients describe communication, follow-up and support in their day-to-day billing workflows.</p>
            </div>
            <button type="button" aria-pressed={paused} onClick={() => setPaused((value) => !value)} className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full border border-white/20 px-4 text-sm font-semibold text-white/85 transition-colors hover:border-brand-sky hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky sm:self-end">
              {paused ? <Play size={15} aria-hidden="true"/> : <Pause size={15} aria-hidden="true"/>}
              {paused ? "Play reviews" : "Pause reviews"}
            </button>
          </div>
        </ScrollReveal>
      </Container>
      <div className={`testimonial-marquee mt-9 overflow-hidden ${paused ? "is-paused" : ""}`} role="region" aria-label="Scrolling client testimonials. Pause or use keyboard focus to stop." tabIndex={0}>
        <div className="testimonial-marquee-track flex w-max items-stretch py-2">
          <ReviewTrack/>
          <ReviewTrack duplicate/>
        </div>
      </div>
    </section>
  );
}
