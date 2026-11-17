import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { Container } from "@/components/container";
import { WaveDivider } from "@/components/wave-divider";
import { footerContact, footerQuickLinks, services, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <>
      <div className="bg-white"><WaveDivider tone="to-dark" /></div>
      <footer className="bg-brand-navy text-white">
        <Container className="pb-9 pt-4 sm:pb-12">
          <div className="grid gap-10 border-b border-white/15 pb-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_0.9fr_1fr] lg:gap-8 lg:pb-14">
            <div className="max-w-sm">
              <Link href="/" aria-label="Practice Care Source home" className="inline-flex rounded-xl bg-white p-2">
                <Image src="/logo.png" alt="Practice Care Source" width={219} height={60} className="h-auto w-[190px]" />
              </Link>
              <p className="mt-5 text-sm leading-relaxed text-slate-300">{footerContact.tagline}</p>
              {siteConfig.serviceArea ? <p className="mt-3 text-xs text-slate-400">{siteConfig.serviceArea}</p> : null}
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold">Explore</h2>
              <ul className="mt-4 space-y-3">{footerQuickLinks.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-slate-300 transition-colors hover:text-white">{link.label}</Link></li>)}</ul>
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold">Services</h2>
              <ul className="mt-4 space-y-3">{services.map((service) => <li key={service.slug}><Link href={`/services/${service.slug}`} className="text-sm text-slate-300 transition-colors hover:text-white">{service.shortTitle}</Link></li>)}</ul>
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold">Get in touch</h2>
              <a href={`mailto:${footerContact.email}`} className="mt-4 inline-flex items-start gap-2 text-sm text-slate-300 transition-colors hover:text-white"><Mail size={17} className="mt-0.5 shrink-0" aria-hidden="true" />{footerContact.email}<ArrowUpRight size={14} className="mt-0.5" aria-hidden="true" /></a>
              <div><Link href="/contact" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-accent px-5 text-sm font-bold text-white transition-colors hover:bg-brand-accent-hover">Request a Consultation <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-6 text-xs leading-relaxed text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Practice Care Source. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link href="/privacy-policy" className="underline decoration-white/35 underline-offset-4 hover:text-white">Privacy policy</Link>
              <Link href="/terms-of-use" className="underline decoration-white/35 underline-offset-4 hover:text-white">Terms of use</Link>
              <span>Website inquiries are for business purposes only. Do not submit patient information.</span>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
}
