# Practice Care Source

A responsive business services website for healthcare practices. This repository follows a six-version redesign workflow and preserves existing service, company, resource, and API routes while the design is updated.

## Stack

- Next.js App Router, React, TypeScript
- Tailwind CSS and CSS custom properties
- Framer Motion and lucide-react
- React Hook Form, Zod, and Resend

## Requirements and setup

Requires Node.js 20.9 or newer.

    npm ci
    cp .env.example .env.local
    npm run dev

In Windows PowerShell:

    Copy-Item .env.example .env.local

Open http://localhost:3000.

## Environment variables

| Variable | Purpose |
| --- | --- |
| RESEND_API_KEY | Resend API key used by the contact API |
| CONTACT_TO_EMAIL | Inquiry notification destination, currently info@practicecaresource.com |
| CONTACT_FROM_EMAIL | Verified sender address configured in Resend |
| NEXT_PUBLIC_SITE_URL | Canonical site URL after the production domain is confirmed |
| TURNSTILE_SECRET_KEY | Optional Turnstile server key |
| NEXT_PUBLIC_TURNSTILE_SITE_KEY | Optional Turnstile site key |

Keep secrets in deployment settings or a local .env.local file. Never commit real secrets.

## Main routes

- /
- /about
- /contact
- /services and /services/[slug]
- /resources and /resources/[slug]
- /api/contact (POST)
- /api/testimonial (POST)
- /security

## Editing content

- Services: src/data/services.ts
- Resources: src/data/resources/articles.ts
- Brand, navigation, contact details and feature flags: src/lib/site.ts
- Structured data helpers: src/lib/structured-data.ts
- Theme tokens: src/app/globals.css and tailwind.config.ts
- Public assets: public/

Do not publish unverified contact details, business hours, testimonials, statistics, certifications, or service claims. The contact form is for general business inquiries only. Visitors must not submit patient names, PHI, or sensitive patient data.

## Checks

    npm run lint
    npm run typecheck
    npm run build

See docs/version-1-audit.md, docs/version-2-checkpoint.md, docs/version-3-checkpoint.md, and docs/TODO.md for audit findings, completed milestones, and unresolved confirmations.
