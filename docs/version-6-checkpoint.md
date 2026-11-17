# Version 6 checkpoint: SEO, security, accessibility, performance, and release checks

## Delivered

### SEO and crawl controls
- Added a getCanonicalUrl helper that returns an absolute URL only when NEXT_PUBLIC_SITE_URL has been configured and validated as an HTTP or HTTPS origin.
- Added canonical metadata for the homepage, About, Contact, Services, service detail, Resources, article detail, and Security pages.
- Added Open Graph site URL metadata when a production origin is configured.
- Added /robots.txt: public pages are allowed and /api/ is disallowed; the sitemap reference is included only after a canonical origin is configured.
- Added /sitemap.xml for public website routes, all current service detail routes, and resource article routes. Privacy Policy and Terms of Use drafts are intentionally excluded.
- If NEXT_PUBLIC_SITE_URL is not configured, the sitemap returns an empty array and canonical URLs are omitted rather than guessing a site domain.

### Security baseline
- Added X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, and X-Permitted-Cross-Domain-Policies response headers.
- Disabled the Next.js X-Powered-By response header.
- HSTS is emitted only for production builds with a configured HTTPS canonical origin; it is not forced on preview or non-HTTPS environments.
- Added same-origin checks and Cache-Control: no-store responses to the testimonial submission API.
- Kept contact-form validation, request-size controls, honeypot, Turnstile verification, and email privacy safeguards from Version 4.
- Did not add a static Content Security Policy without staging validation. The current site has Next runtime behavior, Google-hosted fonts, Unsplash images, and optional Cloudflare Turnstile sources that must be covered without breaking the site.

### Analytics and privacy
- No analytics or tracking code was added.
- Optional analytics remain disabled in the central site configuration.
- The privacy preference records a future optional-analytics choice but does not load or activate a tracking provider.
- Privacy Policy and Terms of Use remain noindex and excluded from the sitemap until qualified legal review and business details are complete. The owner's approval of website draft content does not replace legal review.

### Accessibility and performance source review
- Kept the existing skip-to-content link, focus-visible outlines, labelled form fields, accessible mobile navigation, and reduced-motion styles.
- Retained responsive image sizing and Next.js image optimization for remote Unsplash assets.
- Retained Next/font font loading and reduced-motion-aware hero animation.
- Added reproducible CI checks so source syntax, TypeScript, and build validation can run on GitHub rather than being represented as completed without execution.

### Continuous integration
- Added .github/workflows/quality.yml to run on pushes and pull requests to main.
- Workflow steps: npm ci, npm run lint, npm run typecheck, and npm run build on Node.js 20.
- The workflow result must be checked after the commit is pushed; adding a workflow does not itself prove that its first run passes.

## Files added or updated
- src/lib/site.ts
- next.config.ts
- src/app/robots.ts
- src/app/sitemap.ts
- src/app/layout.tsx
- src/app/page.tsx
- src/app/about/page.tsx
- src/app/contact/page.tsx
- src/app/services/page.tsx
- src/app/services/[slug]/page.tsx
- src/app/resources/page.tsx
- src/app/resources/[slug]/page.tsx
- src/app/security/page.tsx
- src/app/api/testimonial/route.ts
- .github/workflows/quality.yml
- README.md
- CHANGELOG.md
- docs/TODO.md
- docs/version-6-checkpoint.md

## Validation

| Check | Result | Notes |
|---|---|---|
| Canonical URL behavior | Source-reviewed | URLs are only emitted when NEXT_PUBLIC_SITE_URL is provided. |
| Sitemap and robots | Source-reviewed | Public routes are listed; draft legal pages are excluded; API path is disallowed from crawling. |
| Security headers | Source-reviewed | Header configuration and production HTTPS-only HSTS condition checked. |
| Testimonial API guard | Source-reviewed | Origin validation and no-store responses added. |
| Accessibility/performance source review | Source-reviewed | Existing skip link, focus states, reduced motion, responsive images, and font/image behavior reviewed. |
| GitHub Actions workflow | Added | First workflow execution needs to complete after commit; no passing CI is claimed yet. |
| TypeScript typecheck | Pending CI | Not run locally in this environment. |
| Next.js production build | Pending CI | Not run locally in this environment. |
| Browser, mobile, screen-reader, and Lighthouse tests | Not run | Requires an actual deployed or locally running site. |
| Production domain, DNS, and Vercel deployment | Not verified | The canonical domain remains unconfirmed in the repository settings. |
| Resend and Turnstile live tests | Not run | Require actual production credentials and test submissions. |

## Release configuration that remains
- Set NEXT_PUBLIC_SITE_URL to the real production HTTPS origin in Vercel.
- Check the first GitHub Actions run and resolve any lint, typecheck, or build failure before deployment.
- Verify the production domain, DNS, redirects, and deployment status.
- Complete qualified legal review of the Privacy Policy and Terms of Use; keep them noindex until approved.
- Test Resend notification and customer receipt with real verified sender settings.
- Configure Turnstile keys if the extra challenge is to be enabled.
- Test responsive behavior, keyboard navigation, a screen reader, privacy preferences, contact/review forms, error pages, and Lighthouse on the deployed site.
- Configure a shared rate limiter or provider WAF for reliable distributed rate limiting.
- Review any future Content Security Policy in staging before enabling it.

No successful Vercel deployment, production build, live email, CAPTCHA verification, browser audit, or Lighthouse result is claimed by this repository change.
