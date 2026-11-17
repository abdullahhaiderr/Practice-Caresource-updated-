# Version 1 audit: project setup and design foundation

## Source and repository comparison

- Starting archive: practicecaresource-main.zip.
- Archive entries: 85 total ZIP entries, including directories; 62 files extracted into the safe working tree.
- The archive contains no .git, .env.local, node_modules, or .next content.
- Every file in the 62-file project snapshot has the same Git blob SHA as the corresponding file on saqibturi/practicecaresource main at audit time.
- The source repository's latest observed main commit was cccb4a0a6b45977b9c6efc20f3b222e77827952d (Remove hero backing and align compact arch).
- Destination: abdullahhaiderr/Practice-Caresource-updated-. GitHub reports the authenticated account has push/admin permissions. The repository was empty and had no main ref at audit time, so there was no destination history or uncommitted remote content to merge.
- The original saqibturi/practicecaresource repository is read-only source context. New commits belong only in the destination repository.

## Confirmed technical stack

- Next.js 15.5.29 with App Router
- React 19.3.1
- TypeScript
- Tailwind CSS 3
- Framer Motion
- lucide-react
- React Hook Form and Zod
- Resend integration for server-side email delivery
- npm lockfile is present

## Route map

| Route | Purpose |
| --- | --- |
| / | Homepage with hero, service cards, process, FAQ, and contact CTA |
| /about | Company approach and onboarding information |
| /contact | Business inquiry form and contact information |
| /services | Service overview and explorer |
| /services/[slug] | Service detail pages using the current service catalog |
| /resources | Resource index |
| /resources/[slug] | Resource article details |
| /api/contact | Contact form POST handler using Resend when configured |
| /api/testimonial | Review submission POST handler using Resend when configured |

## Existing service inventory

The supplied code currently defines these six services and slugs:

| Current title | Slug |
| --- | --- |
| Medical Billing | medical-billing |
| Credentialing & Enrollment | credentialing |
| Virtual Assistant Services | virtual-assistant |
| AR Recovery | ar-recovery |
| Denial Management | denial-management |
| Website Development | website-development |

These names and paths are preserved. They must not be renamed, merged, or retired until the business confirms its current service inventory. In particular, proposed Revenue Cycle Management and Medical Coding categories have not been assumed to be separate services.

## Audit findings and decisions

1. The README did not accurately describe the checked-in application. It claimed that the homepage and several existing routes were deferred placeholders, despite implementation files being present. The README has been rewritten to match the repository.
2. The supplied logo visibly reads “Practice Care Source”, while the source UI used “CareSource”. Site configuration, metadata, and shared UI now follow the supplied logo spelling. Confirm whether this is also the official written and legal brand style.
3. .env.example previously directed contact email to a personal Gmail address. It now documents info@practicecaresource.com as the inquiry recipient and contains empty placeholders only.
4. The project included testimonial quotes and portraits without source or approval evidence in the supplied materials. The testimonial display is disabled in central configuration.
5. The homepage displayed “200+” specialties and “50 States” coverage claims without substantiation in the supplied materials. Coverage highlights are disabled in central configuration.
6. The Contact page displayed an Arlington, Virginia office address, a Pakistan phone number, and Pacific Time operating hours. None could be verified from the supplied materials. Those details are no longer displayed; the email contact remains.
7. Founder attribution to Irtiza Hassan appeared in the About page and article bylines. It has been removed from public display pending confirmation and approved biography details.
8. Candidate Vercel URLs practice-caresource.vercel.app and practicecaresource.vercel.app could not be reached in available checks. NEXT_PUBLIC_SITE_URL remains blank and canonical metadata is not inferred.
9. The project already contains a contact form and Resend API route. A production email delivery test was not possible without verified sender credentials and an API key.
10. No legal pages, cookie consent manager, HTML sitemap, or full accessibility and performance test suite were present in the source snapshot. These are reserved for later versions.
11. Earlier design notes described an orange and cream palette, while the logo and global tokens used blue. The foundation now follows the supplied blue logo and requested navy/royal/sky/mint palette.

## Design foundation established

- Central CSS variables and Tailwind aliases for navy, royal blue, sky blue, mint teal, coral, ice background, white, ink, and muted text.
- Plus Jakarta Sans display font and Inter body font through next/font.
- 1280 px centered container foundation, existing 8 px spacing rhythm, 20 to 24 px card radii, and visible focus styles.
- Reusable WaveDivider with three decorative SVG paths, offscreen animation pause, and reduced-motion support.
- Central public site configuration in src/lib/site.ts, with unverified contact facts as null and unverified page sections feature-gated.

## Checks and verification status

| Check | Result | Notes |
| --- | --- | --- |
| Source comparison | Passed | All 62 ZIP file blob hashes match the source repository main snapshot. |
| npm run lint | Passed | Lightweight syntax and source-hygiene script parsed 37 TypeScript files and checked environment placeholders. This is not ESLint. |
| Configuration validation | Passed | package.json and .21st/design.json parse as JSON; .env.example contains empty secret placeholders. |
| npm ci | Blocked | Dependency installation timed out in this environment. The npm cache did not contain the project dependencies. |
| npm run typecheck | Blocked | TypeScript is present, but installed Next.js, React, and package type definitions are unavailable because dependency installation did not complete. This is not a confirmed application type error. |
| npm run build | Blocked | Next.js CLI is unavailable because dependencies could not be installed (next: not found). |
| Browser, accessibility, and Lighthouse checks | Not run | No browser automation or Lighthouse environment was available in this workspace. |
| Live email delivery | Not run | Resend production credentials and a verified sender were not supplied. |

No deployment, production email delivery, cross-browser test, Lighthouse score, or production build success is claimed. node_modules, .next, local environment files, and generated TypeScript build output are excluded from the repository.
