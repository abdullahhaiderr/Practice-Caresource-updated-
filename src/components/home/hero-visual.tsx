import { CheckCircle2, CircleDot, FileCheck2 } from "lucide-react";

const stages = [
  { title: "Claims received", detail: "Information enters the agreed work queue", icon: FileCheck2, tone: "bg-sky-50 text-sky-700" },
  { title: "Claim validation", detail: "Details are reviewed and exceptions flagged", icon: CheckCircle2, tone: "bg-emerald-50 text-emerald-700" },
  { title: "Payment follow-up", detail: "Responses and next steps are documented", icon: CircleDot, tone: "bg-indigo-50 text-indigo-700" },
];

export function HeroVisual() {
  return (
    <figure className="relative mx-auto w-full max-w-xl rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-xl sm:p-6">
      <div className="flex items-center justify-between gap-3 border-b border-white/15 pb-4">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-200">Workflow preview</p><h2 className="mt-1 font-display text-xl font-semibold text-white sm:text-2xl">Revenue workflow</h2></div>
        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-sky-100">Illustrative</span>
      </div>
      <ol className="mt-5 space-y-3">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return <li key={stage.title} className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white p-4 shadow-lg sm:p-5"><span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${stage.tone}`}><Icon size={22} aria-hidden="true" /></span><span className="min-w-0 flex-1"><span className="block text-sm font-bold text-slate-900 sm:text-base">{stage.title}</span><span className="mt-1 block text-xs leading-relaxed text-slate-600 sm:text-sm">{stage.detail}</span></span><span className="text-xs font-bold tabular-nums text-slate-400">0{index + 1}</span></li>;
        })}
      </ol>
      <figcaption className="mt-4 text-xs leading-relaxed text-sky-100/80">Illustrative workflow only. This is not a live system integration or customer data.</figcaption>
      <div className="pointer-events-none absolute -right-5 -top-5 size-20 rounded-full border border-sky-200/35" aria-hidden="true" />
    </figure>
  );
}
