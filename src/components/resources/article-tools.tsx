"use client";

import { useState } from "react";
import { Check, Printer, Share2 } from "lucide-react";

export function ArticleTools({ title }: { title: string }) {
  const [status, setStatus] = useState("");

  async function shareArticle() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        setStatus("Share options opened.");
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setStatus("Article link copied.");
    } catch {
      setStatus("Copy the article URL from your browser address bar.");
    }
  }

  return (
    <div className="article-tools print:hidden">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={shareArticle}
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-brand-border bg-white px-4 text-xs font-bold text-brand-navy transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-brand-sky hover:bg-brand-background-wash focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink motion-reduce:transform-none"
        >
          <Share2 size={15} aria-hidden="true" />
          Share article
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-brand-border bg-white px-4 text-xs font-bold text-brand-navy transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-brand-sky hover:bg-brand-background-wash focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink motion-reduce:transform-none"
        >
          <Printer size={15} aria-hidden="true" />
          Print
        </button>
      </div>
      {status ? (
        <p role="status" aria-live="polite" className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-accent-ink">
          <Check size={14} aria-hidden="true" />
          {status}
        </p>
      ) : null}
    </div>
  );
}
