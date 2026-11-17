# Practice Care Source

A responsive business services website for healthcare practices. This repository follows a six-version redesign workflow and preserves existing service, company, resource, and API routes while the design is updated.

## Stack

- Next.js App Router, React, TypeScript
- Tailwind CSS and CSS custom properties
- Framer Motion and lucide-react
- React Hook Form, Zod, and Resend
- Optional Cloudflare Turnstile protection for the inquiry form

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
| CONTACT_TO_EMAIL | Inquiry notification destination; defaults to info@practicecaresource.com |
| CONTACT_FROM_EMAIL | Sender address verified in Resend |
| NEXT_PUBLIC_SITE_URL | Canonical site URL after the production domain is confirmed |
| NEXT_PUBLIC_TURNSTILE_SITE_KEY | Optional public Cloudflare Turnstile site key |
| TURNSTILE_SECRET_KEY | Matching Cloudflare Turnstile server secret |

Set the two Turnstile values together or leave both empty. When configured, the contact form loads the Turnstile widget and the server verifies the token with Cloudflare before sending email. An incomplete pair blocks form delivery instead of silently disabling the protection.

Keep secrets in deployment settings or a local .env.local file. Never commit real secrets.

## Contact form behavior

- The form collects a business contact, practice/organization, free-text specialty, service of interest, message, and required contact consent.
- Specialty is free text because a confirmed specialty directory has not been supplied.
- The API validates the full form on the server, enforces a request body limit and same-origin checks when an Origin header is present, and uses a hidden honeypot.
- The API rejects several obvious identifier formats (for example, SSN-formatted values, labelled MRN/member IDs, and explicitly labelled dates of birth). This is only a limited safeguard; it cannot identify every form of patient information.
- A best-effort in-memory limit allows up to five requests per client key within ten minutes per running server instance. Serverless instances do not share this memory; use a provider-level WAF or a shared rate-limit store for a distributed production limit.
- When Turnstile is configured, a valid server-verified token is required.
- Resend sends an inquiry notification to CONTACT_TO_EMAIL and attempts a separate receipt email to the sender. The success response distinguishes whether the receipt email was accepted by Resend.
- The inquiry form is for general business information only. Do not submit patient names, dates of birth, medical record details, insurance identifiers, protected health information (PHI), or other sensitive patient data.

To test delivery, configure a Resend API key and a verified CONTACT_FROM_EMAIL sender, then submit a real business test inquiry. Check both the notification and receipt in the relevant mailboxes and Resend logs. No live delivery result is claimed by this repository change alone.

## Main routes

- /
- /about
- /contact
- /services and /services/[slug]
- /resources and /resources/[slug]
- /security
- /api/contact (POST)
- /api/testimonial (POST)

## Editing content

- Services: src/data/services.ts
- Resources: src/data/resources/articles.ts
- Brand, navigation, contact details and feature flags: src/lib/site.ts
- Structured data helpers: src/lib/structured-data.ts
- Theme tokens: src/app/globals.css and tailwind.config.ts
- Public assets: public/

Do not publish unverified contact details, business hours, testimonials, statistics, certifications, or service claims.

## Checks

    npm run lint
    npm run typecheck
    npm run build

See docs/version-1-audit.md and docs/version-2-checkpoint.md through docs/version-4-checkpoint.md, along with docs/TODO.md, for audit findings, completed milestones, and unresolved confirmations.
