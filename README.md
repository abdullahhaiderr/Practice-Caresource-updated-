# Practice Care Source website

A responsive business services website for Practice Care Source. The current project uses the supplied source snapshot and preserves the existing service, company, contact, and resource routes while the six-version redesign is completed.

## Stack

- Next.js 15 App Router
- React 19 and TypeScript
- Tailwind CSS 3 design tokens
- Framer Motion with reduced-motion support
- lucide-react icons
- React Hook Form and Zod validation
- Resend for configured business inquiry email

## Requirements

- Node.js 20.9 or newer
- npm 10 or compatible package manager

## Getting started

```bash
npm ci
cp .env.example .env.local
npm run dev
```

On Windows PowerShell, create the local environment file with:

```powershell
Copy-Item .env.example .env.local
```

Open `http://localhost:3000` after the development server starts.

## Environment variables

| Variable | Purpose | Required for local build |
| --- | --- | --- |
| `RESEND_API_KEY` | Resend API key for sending business inquiry email | No |
| `CONTACT_TO_EMAIL` | Notification destination. Defaults are documented as `info@practicecaresource.com` | No |
| `CONTACT_FROM_EMAIL` | Verified sender address configured in Resend | No |
| `NEXT_PUBLIC_SITE_URL` | Verified canonical production URL, without a trailing slash | No |
| `TURNSTILE_SECRET_KEY` | Optional Cloudflare Turnstile server secret | No |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Optional Cloudflare Turnstile site key | No |

Never commit `.env.local`, API keys, credentials, or production secrets. The repository includes only empty placeholders in `.env.example`.

## Project structure

- `src/app/`: App Router pages and API routes
- `src/components/`: shared navigation, footer, cards, hero, motion, and layout components
- `src/data/services.ts`: current service inventory and service detail content
- `src/data/resources/articles.ts`: resource article content
- `src/lib/site.ts`: public site configuration, content flags, navigation, and contact details
- `src/lib/contact-schema.ts`: shared contact form validation
- `public/`: approved local brand and page assets
- `docs/`: audit findings and motion guidance
- `.21st/`: design tokens and design decisions

## Current routes

- `/`
- `/about`
- `/contact`
- `/services`
- `/services/[slug]`
- `/resources`
- `/resources/[slug]`
- `/api/contact` (POST)
- `/api/testimonial` (POST)

## Editing services and site details

Update service content in `src/data/services.ts`. Update navigation, brand configuration, contact details, canonical URL, and feature flags in `src/lib/site.ts`. Keep unverified business facts set to `null` or feature-gated until the business confirms them.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```

See `docs/version-1-audit.md` for the current route map, findings, risks, and unresolved business information. See `docs/TODO.md` for items that require confirmation or later-version implementation.

## Version workflow

Each completed redesign checkpoint is documented in `CHANGELOG.md` and committed directly to the `main` branch of the destination GitHub repository. Continue only after the checkpoint is reviewed, unless the project owner explicitly asks to complete all remaining versions in one run.
