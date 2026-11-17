import Image from "next/image";
import { ArrowDownRight, CheckCircle2, FileCheck2 } from "lucide-react";
import { serviceCatalog } from "@/data/services";

const steps = [
  ["01", "Review", "Understand the work and source details"],
  ["02", "Coordinate", "Keep questions and handoffs visible"],
  ["03", "Follow through", "Document next actions for review"],
];

export function HeroVisual() {
  return (
    <figure className="relative mx-auto w-full max-w-[36rem] pb-7 pl-4 sm:pl-7">
      <div className="absolute -right-4 -top-5 h-36 w-36 rounded-full border border-brand-sky/30 sm:-right-7 sm:-top-8 sm:h-48 sm:w-48" aria-hidden="true"/>
      <div className="relative aspect-[5/4] overflow-hidden rounded-t-[46%] rounded-b-[1.6rem] border border-white/20 bg-brand-dark-soft shadow-[0_28px_80px_rgba(0,0,0,.35)]">
        <Image src={serviceCatalog[0].imageSrc} alt="Healthcare professional reviewing information in a clinical office" fill priority sizes="(max-width: 1024px) 100vw, 44vw" className="object-cover transition-transform duration-[1200ms] hover:scale-[1.035]"/>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/5 to-brand-navy/10"/>
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-sky">Practice operations</p>
          <p className="mt-2 max-w-md font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">Thoughtful support for the work behind every visit.</p>
        </div>
      </div>
      <div className="relative -mt-8 mr-2 ml-8 border border-white/15 bg-white p-4 shadow-2xl sm:-mt-10 sm:ml-14 sm:mr-0 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3 border-b border-brand-border pb-3">
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-brand-navy"><FileCheck2 size={15} className="text-brand-accent-ink"/> Workflow snapshot</span>
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-brand-slate">Illustrative</span>
        </div>
        <ol className="grid gap-3 sm:grid-cols-3">
          {steps.map(([number,title,body],index)=>(
            <li key={number} className="flex items-start gap-2 sm:block">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-background-wash text-[0.65rem] font-extrabold text-brand-accent-ink sm:mb-2">{number}</span>
              <span><strong className="block text-sm font-bold text-brand-navy">{title}</strong><span className="mt-0.5 block text-xs leading-relaxed text-brand-slate">{body}</span></span>
              {index===2 ? <CheckCircle2 className="ml-auto hidden shrink-0 text-brand-accent-ink sm:block" size={17}/> : null}
            </li>
          ))}
        </ol>
        <p className="mt-3 text-[0.68rem] leading-relaxed text-brand-slate">Illustrative workflow only. Not a live system integration or customer data.</p>
      </div>
      <span className="absolute right-0 top-[46%] hidden size-12 place-items-center rounded-full bg-brand-accent text-white shadow-lg sm:grid"><ArrowDownRight size={22}/></span>
    </figure>
  );
}
