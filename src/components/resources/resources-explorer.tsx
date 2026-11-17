"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ResourceCard, type ResourceCardData } from "@/components/resources/resource-card";

type ResourcesExplorerProps = {
  articles: ResourceCardData[];
  categories: string[];
  featuredSlug: string;
};

export function ResourcesExplorer({ articles, categories, featuredSlug }: ResourcesExplorerProps) {
  const [activeCategory, setActiveCategory] = useState("All topics");
  const [query, setQuery] = useState("");
  const isDefaultView = activeCategory === "All topics" && query.trim() === "";

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return articles.filter((article) => {
      const matchesCategory = activeCategory === "All topics" || article.category === activeCategory;
      const searchable = `${article.title} ${article.excerpt} ${article.category} ${article.searchText ?? ""}`.toLocaleLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [activeCategory, articles, query]);

  const featuredArticle = articles.find((article) => article.slug === featuredSlug);
  const gridArticles = isDefaultView && featuredArticle
    ? filteredArticles.filter((article) => article.slug !== featuredSlug)
    : filteredArticles;

  return (
    <div>
      <div className="grid gap-6 rounded-3xl border border-brand-border bg-white p-5 shadow-[0_12px_36px_rgb(11_27_63_/_0.055)] sm:p-7 lg:grid-cols-[minmax(15rem,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-10">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-accent-ink">Find what you need</p>
          <label htmlFor="resource-search" className="mb-2 block font-display text-2xl font-semibold text-brand-navy">
            Search the library
          </label>
          <div className="relative">
            <Search size={19} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-slate" aria-hidden="true" />
            <input
              id="resource-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try billing, denials, enrollment…"
              className="min-h-13 w-full rounded-xl border border-brand-border bg-brand-background-wash/45 py-3 pl-11 pr-4 text-sm text-brand-navy placeholder:text-brand-slate/75 transition-colors focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
            />
          </div>
          <p className="mt-2 text-xs leading-relaxed text-brand-slate">Search article titles, summaries and topics.</p>
        </div>
        <div>
          <p id="resource-category-label" className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-slate">Explore by topic</p>
          <div className="flex flex-wrap gap-2" role="group" aria-labelledby="resource-category-label">
            {["All topics", ...categories].map((category) => {
              const selected = activeCategory === category;
              const count = category === "All topics" ? articles.length : articles.filter((article) => article.category === category).length;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveCategory(category)}
                  className={[
                    "inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-xs font-bold transition-[background-color,border-color,color,transform] duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink sm:text-sm motion-reduce:transform-none",
                    selected
                      ? "border-brand-navy bg-brand-navy text-white shadow-sm"
                      : "border-brand-border bg-white text-brand-navy hover:border-brand-sky hover:bg-brand-background-wash/60",
                  ].join(" ")}
                >
                  {category}
                  <span className={selected ? "text-white/70" : "text-brand-slate"}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {isDefaultView && featuredArticle ? (
        <ScrollReveal className="mt-8 sm:mt-10">
          <ResourceCard article={featuredArticle} featured />
        </ScrollReveal>
      ) : null}

      <div className="mb-5 mt-8 flex flex-wrap items-center justify-between gap-3 sm:mt-10">
        <div>
          <h2 className="font-display text-2xl font-semibold text-brand-navy sm:text-3xl">
            {isDefaultView ? "Latest insights" : "Matching articles"}
          </h2>
          <p className="mt-1 text-sm text-brand-slate" aria-live="polite">
            {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"} found
          </p>
        </div>
        {!isDefaultView ? (
          <button
            type="button"
            onClick={() => { setQuery(""); setActiveCategory("All topics"); }}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-bold text-brand-accent-ink underline decoration-brand-accent/60 underline-offset-4 hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink"
          >
            <X size={15} aria-hidden="true" /> Clear filters
          </button>
        ) : null}
      </div>

      {gridArticles.length ? (
        <div className="grid auto-rows-fr items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {gridArticles.map((article, index) => (
            <ScrollReveal key={article.slug} delay={index * 0.06} amount={0.1} className="h-full min-w-0">
              <ResourceCard article={article} />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-brand-border bg-brand-background-wash/45 px-6 py-14 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-white text-brand-accent-ink shadow-sm">
            <Search size={21} aria-hidden="true" />
          </span>
          <p className="mt-5 font-display text-2xl font-semibold text-brand-navy">No articles match that search.</p>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-brand-slate">Try another phrase or choose a different topic to browse the current library.</p>
          <button
            type="button"
            onClick={() => { setQuery(""); setActiveCategory("All topics"); }}
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-brand-accent px-5 text-sm font-bold text-white transition-colors hover:bg-brand-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink focus-visible:ring-offset-2"
          >
            Show all articles
          </button>
        </div>
      )}
    </div>
  );
}
