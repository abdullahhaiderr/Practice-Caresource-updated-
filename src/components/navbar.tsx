"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { ArrowDown, ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { navigationLinks, serviceNavLinks, siteConfig } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const menuId = useId();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLElement>(null);
  const servicePanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobilePanelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !mobilePanelRef.current) return;
      const items = Array.from(
        mobilePanelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  function closeMobile() {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  }

  function handleServiceKeys(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    const links = Array.from(
      event.currentTarget.querySelectorAll<HTMLAnchorElement>("a[href]"),
    );
    if (!links.length) return;
    event.preventDefault();
    const activeIndex = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (event.key === "Home") links[0].focus();
    else if (event.key === "End") links[links.length - 1].focus();
    else links[(activeIndex + (event.key === "ArrowDown" ? 1 : -1) + links.length) % links.length].focus();
  }

  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const linkClass = (href: string) =>
    [
      "inline-flex min-h-12 items-center rounded-lg px-2 text-sm font-bold transition-colors",
      active(href)
        ? "text-brand-accent-ink"
        : "text-brand-dark hover:bg-brand-background-wash hover:text-brand-accent-ink",
    ].join(" ");

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border/80 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="hidden border-b border-brand-border/70 bg-brand-background-wash/70 sm:block">
        <Container className="flex min-h-9 items-center justify-between gap-4 text-xs font-semibold text-brand-slate">
          <span>Medical billing and practice support</span>
          <div className="flex items-center gap-5">
            {siteConfig.serviceArea ? <span>{siteConfig.serviceArea}</span> : null}
            <a className="transition-colors hover:text-brand-accent-ink" href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>
            {Object.entries(siteConfig.socialLinks).map(([network, url]) =>
              url ? (
                <a key={network} href={url} target="_blank" rel="noreferrer" className="capitalize hover:text-brand-accent-ink">
                  {network}
                </a>
              ) : null,
            )}
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex min-h-[76px] items-center justify-between gap-4">
          <Link href="/" aria-label="Practice Care Source home" className="shrink-0 rounded-md focus-visible:outline-none">
            <Image src="/logo.png" alt="Practice Care Source" width={219} height={60} priority className="h-auto w-[174px] sm:w-[200px] lg:w-[219px]" />
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-2 lg:flex">
            {navigationLinks.map((link) =>
              link.label === "Services" ? (
                <div
                  key={link.href}
                  className="relative"
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setServicesOpen(false);
                    }
                  }}
                >
                  <button
                    type="button"
                    className={linkClass(link.href)}
                    aria-haspopup="true"
                    aria-expanded={servicesOpen}
                    aria-controls={menuId}
                    aria-current={active(link.href) ? "page" : undefined}
                    onClick={() => setServicesOpen((value) => !value)}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowDown") {
                        event.preventDefault();
                        setServicesOpen(true);
                        requestAnimationFrame(() => servicePanelRef.current?.querySelector("a")?.focus());
                      }
                    }}
                  >
                    Services
                    <ArrowDown size={15} className={`ml-1 transition-transform ${servicesOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                  {servicesOpen ? (
                    <div
                      ref={servicePanelRef}
                      id={menuId}
                      onKeyDown={handleServiceKeys}
                      className="absolute left-1/2 top-full z-50 mt-2 w-80 -translate-x-1/2 rounded-2xl border border-brand-border bg-white p-2 shadow-card"
                    >
                      <Link href="/services" className="flex min-h-11 items-center justify-between rounded-xl px-4 text-sm font-bold text-brand-accent-ink hover:bg-brand-background-wash">
                        All services <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                      {serviceNavLinks.map((service) => (
                        <Link key={service.href} href={service.href} className="flex min-h-11 items-center justify-between rounded-xl px-4 text-sm font-semibold text-brand-dark hover:bg-brand-background-wash hover:text-brand-accent-ink">
                          {service.label}<ArrowRight size={14} aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link key={link.href} href={link.href} className={linkClass(link.href)} aria-current={active(link.href) ? "page" : undefined}>
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden lg:block">
            <Button href="/contact" size="md" showArrow>Request a Consultation</Button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="grid size-11 place-items-center rounded-full border border-brand-border bg-white text-brand-dark transition-colors hover:bg-brand-background-wash focus-visible:outline-none lg:hidden"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>

      {mobileOpen ? (
        <div className="fixed inset-0 top-[76px] z-40 lg:hidden">
          <button type="button" aria-label="Close navigation menu" className="absolute inset-0 size-full cursor-default bg-brand-navy/35" onClick={closeMobile} />
          <nav
            ref={mobilePanelRef}
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="relative max-h-[calc(100dvh-76px)] overflow-y-auto border-t border-brand-border bg-white px-5 pb-8 pt-4 shadow-xl"
          >
            <div className="grid gap-1">
              {navigationLinks.map((link) =>
                link.label === "Services" ? (
                  <div key={link.href}>
                    <button type="button" className="flex min-h-12 w-full items-center justify-between rounded-xl px-3 text-left font-bold text-brand-dark hover:bg-brand-background-wash" aria-expanded={servicesOpen} aria-controls="mobile-service-links" onClick={() => setServicesOpen((value) => !value)}>
                      Services <ArrowDown size={16} className={servicesOpen ? "rotate-180" : ""} aria-hidden="true" />
                    </button>
                    {servicesOpen ? (
                      <div id="mobile-service-links" className="grid border-l-2 border-brand-accent/30 py-1 pl-3">
                        <Link href="/services" className="flex min-h-11 items-center px-3 text-sm font-bold text-brand-accent-ink" onClick={() => setMobileOpen(false)}>All services</Link>
                        {serviceNavLinks.map((service) => (
                          <Link key={service.href} href={service.href} className="flex min-h-11 items-center px-3 text-sm font-semibold text-brand-slate hover:text-brand-accent-ink" onClick={() => setMobileOpen(false)}>{service.label}</Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <Link key={link.href} href={link.href} className={linkClass(link.href)} aria-current={active(link.href) ? "page" : undefined} onClick={() => setMobileOpen(false)}>{link.label}</Link>
                ),
              )}
              <Button href="/contact" size="lg" showArrow className="mt-3 w-full" onClick={() => setMobileOpen(false)}>Request a Consultation</Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
