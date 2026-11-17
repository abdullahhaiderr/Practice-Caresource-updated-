import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";

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

type ResourceCardProps = {
  article: ResourceCardData;
  featured?: boolean;
};

function formatPublishedDate(value: string) {
  if (value.length !== 10 || value[4] !== "-" || value[7] !== "-") return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    !Number.isFinite(date.getTime()) ||
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) return null;
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function ArticleMeta({ article, dark = false }: { article: ResourceCardData; dark?: boolean }) {
  const publishedDate = formatPublishedDate(article.publishedAt);
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold ${dark ? "text-white/70" : "text-brand-slate"}`}>
      <span className={dark ? "text-brand-sky" : "text-brand-accent-ink"}>{article.category}</span>
      {publishedDate ? <time dateTime={article.publishedAt}>{publishedDate}</time> : null}
      <span className="inline-flex items-center gap-1.5">
        <Clock3 size={14} aria-hidden="true" />
        {article.readingMinutes} min read
      </span>
    </div>
  );
}

export function ResourceCard({ article, featured = false }: ResourceCardProps) {
  if (featured) {
    return (
      <article className="group grid h-full overflow-hidden rounded-3xl border border-brand-border bg-brand-navy text-white shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-brand-out hover:-translate-y-1 hover:border-brand-sky/60 hover:shadow-card-hover motion-reduce:transform-none motion-reduce:transition-none lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr]">
        <Link
          href={`/resources/${article.slug}`}
          className="relative block min-h-64 overflow-hidden bg-brand-dark-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-sky sm:min-h-80 lg:min-h-[23rem]"
          aria-label={`Read featured article: ${article.title}`}
        >
          <Image
            src={article.coverImage}
            alt={article.coverAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045] motion-reduce:transform-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/5 to-transparent" />
          <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-brand-navy/85 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
            Featured read
          </span>
        </Link>
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <ArticleMeta article={article} dark />
          <Link href={`/resources/${article.slug}`} className="group/title mt-5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky">
            <h3 className="max-w-2xl font-display text-3xl font-semibold leading-[1.08] tracking-tight text-white transition-colors group-hover/title:text-brand-sky sm:text-4xl">
              {article.title}
            </h3>
          </Link>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
            {article.excerpt}
          </p>
          <Link
            href={`/resources/${article.slug}`}
            className="mt-7 inline-flex min-h-11 items-center gap-3 self-start rounded-full bg-brand-accent px-5 text-sm font-bold text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-brand-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy motion-reduce:transform-none"
          >
            Read featured article
            <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-brand-border bg-white shadow-[0_8px_26px_rgb(11_27_63_/_0.055)] transition-[transform,box-shadow,border-color] duration-300 ease-brand-out hover:-translate-y-1 hover:border-brand-sky/65 hover:shadow-card-hover motion-reduce:transform-none motion-reduce:transition-none">
      <Link
        href={`/resources/${article.slug}`}
        className="flex h-full flex-col rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-accent-ink"
        aria-label={`Read article: ${article.title}`}
      >
        <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-brand-background-wash">
          <Image
            src={article.coverImage}
            alt={article.coverAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045] motion-reduce:transform-none"
          />
          <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-brand-navy shadow-sm">
            {article.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="min-h-[1.25rem]">
            <ArticleMeta article={{ ...article, category: "Article" }} />
          </div>
          <h3 className="mt-4 min-h-[3.4rem] font-display text-xl font-semibold leading-snug text-brand-navy transition-colors duration-200 group-hover:text-brand-accent sm:text-2xl">
            {article.title}
          </h3>
          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-brand-slate sm:text-[0.9375rem]">
            {article.excerpt}
          </p>
          <div className="mt-6 flex items-center justify-between gap-3 border-t border-brand-border pt-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-slate">
              <Clock3 size={14} aria-hidden="true" /> {article.readingMinutes} min read
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-brand-accent-ink">
              Read article
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
