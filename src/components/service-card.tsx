import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ServiceCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon: LucideIcon;
  href?: string;
};

export function ServiceCard({ title, description, imageSrc, imageAlt, icon: Icon, href = "/services" }: ServiceCardProps) {
  return (
    <article className="service-story-card group relative flex h-full min-h-[27rem] flex-col overflow-hidden rounded-[1.5rem] border border-brand-border bg-white shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-brand-out hover:-translate-y-1.5 hover:border-brand-sky/55 hover:shadow-card-hover motion-reduce:transform-none motion-reduce:transition-none">
      <Link href={href} className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-sky" aria-label={`Explore ${title}`}>
        <div className="relative h-56 shrink-0 overflow-hidden bg-brand-background-wash sm:h-60">
          <Image src={imageSrc} alt={imageAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.075] motion-reduce:transform-none"/>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/5 to-transparent"/>
          <span className="absolute bottom-4 left-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-brand-navy/75 px-3 py-2 text-xs font-bold text-white backdrop-blur-sm">
            <Icon size={15} aria-hidden="true"/>{title}
          </span>
          <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white text-brand-navy shadow-lg transition-transform duration-300 group-hover:rotate-45 group-hover:scale-105 motion-reduce:transform-none"><ArrowUpRight size={19} aria-hidden="true"/></span>
        </div>
        <div className="flex flex-1 flex-col px-6 pb-6 pt-6 sm:px-7 sm:pb-7">
          <h3 className="font-display text-2xl font-semibold leading-tight text-brand-navy sm:text-[1.7rem]">{title}</h3>
          <p className="mt-3 flex-1 text-[0.96rem] leading-[1.75] text-brand-slate">{description}</p>
          <span className="mt-6 inline-flex items-center gap-2 border-t border-brand-border pt-4 text-sm font-bold text-brand-accent-ink">
            Explore service <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
