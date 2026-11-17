import type { Metadata } from "next";
import { HomeHero } from "@/components/home/home-hero";
import { HomeSections } from "@/components/home/home-sections";

export const metadata: Metadata = {
  title: "Practice Care Source | Medical Billing and Practice Support",
  description: "Explore medical billing, credentialing, administrative support, AR recovery, denial management, and website development services from Practice Care Source.",
};

export default function HomePage() {
  return (
    <main id="main-content">
      <HomeHero />
      <HomeSections />
    </main>
  );
}
