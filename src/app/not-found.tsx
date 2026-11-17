import { SearchX } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <main id="main-content" className="grid min-h-[65vh] place-items-center bg-brand-background py-16">
      <Container size="narrow">
        <div className="mx-auto max-w-xl text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-brand-background-wash text-brand-accent-ink">
            <SearchX size={30} aria-hidden="true" />
          </span>
          <p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-brand-accent-ink">404 · Page not found</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-brand-dark sm:text-5xl">
            This page is not here.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-brand-slate">
            The link may be outdated, or the page may have moved. You can return to the homepage or browse the service and resource sections.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/" size="lg">Back to home</Button>
            <Button href="/resources" size="lg" variant="ghost">Browse resources</Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
