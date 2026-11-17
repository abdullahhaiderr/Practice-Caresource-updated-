import Image from "next/image";

type PageHeroImageProps = { src: string; alt: string };

export function PageHeroImage({ src, alt }: PageHeroImageProps) {
  return (
    <div role="img" aria-label={alt} className="pointer-events-none relative order-last mx-auto h-64 w-full max-w-md lg:absolute lg:right-0 lg:top-[-2.5rem] lg:order-none lg:h-[31rem] lg:w-[40%] lg:max-w-[36rem]">
      <div className="absolute -right-4 -top-4 h-28 w-28 rounded-full border border-brand-sky/30 sm:-right-6 sm:-top-6 sm:h-40 sm:w-40" aria-hidden="true"/>
      <div className="group absolute inset-0 overflow-hidden rounded-t-[48%] rounded-b-[1.5rem] border border-white/20 bg-brand-dark-soft shadow-[0_28px_80px_rgba(0,0,0,.28)]">
        <Image src={src} alt="" fill priority sizes="(min-width: 1024px) 40vw, (min-width: 640px) 440px, 100vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"/>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/55 via-transparent to-brand-navy/10"/>
      </div>
    </div>
  );
}
