"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { HeroVisual } from "@/components/home/hero-visual";
import { WaveDivider } from "@/components/wave-divider";

const principles = ["Clear workflows", "Agreed responsibilities", "Practice-focused support"];

export function HomeHero() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="relative isolate overflow-hidden bg-brand-navy text-white">
      <div className="pointer-events-none absolute -left-40 top-10 size-[32rem] rounded-full border-[5rem] border-sky-300/10" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-56 right-0 size-[38rem] rounded-full bg-brand-accent/20 blur-3xl" aria-hidden="true" />
      <Container className="relative grid items-center gap-12 py-14 sm:py-16 lg:min-h-[660px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-20">
        <div className="max-w-2xl">
          <motion.p initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.45 }} className="inline-flex items-center gap-2 rounded-full border border-sky-200/25 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-sky-100">
            <span className="size-2 rounded-full bg-brand-mint" aria-hidden="true" /> Practice support, connected
          </motion.p>
          <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.55, delay: 0.06 }} className="mt-6 text-balance font-display text-[clamp(3rem,6vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white">
            Support for the work behind <span className="text-sky-300">every visit.</span>
          </motion.h1>
          <motion.p initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.5, delay: 0.14 }} className="mt-6 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
            Explore medical billing, credentialing, administrative support, and more. Start with the workflow your practice wants to improve and agree on a clear scope together.
          </motion.p>
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.5, delay: 0.2 }} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/contact" size="lg" showArrow>Request a Consultation</Button>
            <Link href="/services" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/30 px-6 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              Explore services <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </motion.div>
          <ul className="mt-9 grid gap-3 border-t border-white/15 pt-6 sm:grid-cols-3">
            {principles.map((item) => <li key={item} className="flex items-center gap-2 text-xs font-semibold text-slate-200 sm:text-sm"><Check size={16} className="shrink-0 text-brand-mint" aria-hidden="true" />{item}</li>)}
          </ul>
        </div>
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 22, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reduceMotion ? 0 : 0.65, delay: 0.15 }} className="relative">
          <HeroVisual />
        </motion.div>
      </Container>
      <WaveDivider tone="to-light" />
    </section>
  );
}
