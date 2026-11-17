import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { PrivacyPreferences } from "@/components/privacy-preferences";
import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/lib/site";
import { organizationStructuredData, serializeJsonLd } from "@/lib/structured-data";

const displayFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});
const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteConfig.canonicalUrl ? new URL(siteConfig.canonicalUrl) : undefined,
  title: {
    default: `${siteConfig.brandName} | The source of care for your practice`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description: "Medical billing and practice support for healthcare practices. Contact us to discuss your team's business needs and workflows.",
  applicationName: siteConfig.brandName,
  manifest: "/site.webmanifest",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.brandName,
    title: `${siteConfig.brandName} | The source of care for your practice`,
    description: "Medical billing and practice support for healthcare practices.",
  },
  twitter: {
    card: "summary",
    title: siteConfig.brandName,
    description: "Medical billing and practice support for healthcare practices.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={[displayFont.variable, bodyFont.variable].join(" ")}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationStructuredData()) }} />
        <a
          href="#main-content"
          className="sr-only z-[100] rounded-md bg-brand-background px-4 py-3 text-brand-dark focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
        <PrivacyPreferences />
        <Footer />
      </body>
    </html>
  );
}
