"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Practice Care Source page error:", error.digest ?? "No error digest available.");
  }, [error]);

  return (
    <main id="main-content" className="grid min-h-[65vh] place-items-center bg-brand-background py-16">
      <Container size="narrow">
        <div className="mx-auto max-w-xl text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-brand-background-wash text-brand-accent-ink">
            <AlertTriangle size={30} aria-hidden="true" />
          </span>
          <p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-brand-accent-ink">Something went wrong</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-brand-dark sm:text-5xl">
            This page could not load.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-brand-slate">
            The page encountered an unexpected problem. Try again, or return to the homepage.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button type="button" size="lg" onClick={() => reset()}>Try again</Button>
            <Button href="/" size="lg" variant="ghost">Back to home</Button>
          </div>
          <p className="mt-6 text-sm text-brand-slate">
            <Link href="/contact" className="font-semibold text-brand-accent-ink underline underline-offset-4">Contact Practice Care Source</Link>
            {" "}if the problem continues.
          </p>
        </div>
      </Container>
    </main>
  );
}
