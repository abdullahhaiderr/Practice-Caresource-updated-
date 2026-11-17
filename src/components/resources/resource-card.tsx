import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";

export type ResourceCardData = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  coverImage: string;
  coverAlt: string;
  readingMinutes: number;
  searchText?: string;
};

type ResourceCardProps = { article: ResourceCardData; featured?: boolean };

function formatPublishedDate(value: string) {
  if (value.length !== 10 || value[4] !== "-" || value[7] !== "-") return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (!Number.isFinite(date.getTime()) || date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }).format(date);
}

export function ResourceCard({ article, featured = false }: ResourceCardProps) {
  const date = formatPublishedDate(article.publishedAt);
  if (featured) {
    return (
      <article className="group grid overflow-hidden border border-brand-border bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover lg:grid-cols-[0.95fr_1.05fr]">
        <Link href={`/resources/${article.slug}`} className="relative block min-h-64 overflow-hidden bg-brand-background-wash focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-sky" aria-label={`Read featured article: ${article.title}`}>
          <Image src={article.coverImage} alt={article.coverAlt} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"/>
          <span className="absolute left-5 top-5 bg-brand-navy px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white">{article.category}</span>
        </Link>
        <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-11">
          <div className="flex flex-wrap gap-4 text-xs font-bold text-brand-slate">{date ? <time dateTime={article.publishedAt}>{date}</time> : null}<span className="inline-flex items-center gap-1.5"><Clock3 size={14}/>{article.readingMinutes} min read</span></div>
          <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-brand-navy sm:text-4xl">{article.title}</h3>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-slate">{article.excerpt}</p>
          <Link href={`/resources/${article.slug}`} className="mt-7 inline-flex min-h-11 items-center gap-2 self-start border-b-2 border-brand-accent pb-1 text-sm font-bold text-brand-navy">Read article <ArrowUpRight size={17}/></Link>
        </div>
      </article>
    );
  }
  return (
    <article className="group flex h-full min-w-0 flex-col border-b border-brand-border bg-transparent pb-6 transition-colors duration-300 hover:border-brand-sky">
      <Link href={`/resources/${article.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink" aria-label={`Read article: ${article.title}`}>
        <div className="relative aspect-[16/10] overflow-hidden bg-brand-background-wash">
          <Image src={article.coverImage} alt={article.coverAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"/>
          <span className="absolute bottom-3 left-3 bg-white/95 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-brand-navy">{article.category}</span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col pt-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-brand-slate">{date ? <time dateTime={article.publishedAt}>{date}</time> : <span>Practice insight</span>}<span aria-hidden="true">·</span><span className="inline-flex items-center gap-1"><Clock3 size={13}/>{article.readingMinutes} min read</span></div>
        <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-brand-navy transition-colors group-hover:text-brand-accent-ink">{article.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-[1.75] text-brand-slate">{article.excerpt}</p>
        <Link href={`/resources/${article.slug}`} className="mt-5 inline-flex min-h-10 items-center gap-2 self-start text-sm font-bold text-brand-accent-ink">Continue reading <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1"/></Link>
      </div>
    </article>
  );
}
