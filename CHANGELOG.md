# Changelog

## Version 1: audit and design foundation
- Compared the supplied ZIP with the source repository and imported the 62-file source snapshot.
- Established the navy, royal blue, sky blue, and mint design tokens and typography.
- Added central public site configuration and gated unverified business claims.
- Added the initial reusable SVG wave component and updated setup documentation.

## Version 2: global shell and homepage
- Refined the utility strip, sticky navigation, desktop service dropdown, and mobile navigation drawer.
- Added keyboard support, Escape dismissal, mobile focus management, scroll locking, and route-change dismissal.
- Rebuilt the homepage hero and added an illustrative revenue workflow visual.
- Added a practice challenge section, six service cards from the existing catalog, a six-step working process, onboarding, FAQs, and consultation CTA.
- Added wave treatment above the footer and improved footer navigation and business inquiry notice.
- Kept testimonials, coverage statistics, unverified specialties, and unsupported technology claims hidden.

## Version 3: service and company information
- Added Organization, Service, FAQPage, ItemList, AboutPage, and conditional breadcrumb structured data.
- Added a standalone Security and Information Handling page with practical pre-access questions and a clear no-PHI notice.
- Added specialty-fit discussion content without claiming an unverified specialty directory or inventing specialties.
- Added service-specific information-access guidance and FAQs on patient data.
- Replaced the About page's partial service summary with the complete current six-service catalog.
- Removed unsupported US service-area wording from the Services overview and About page.
- Added the Security page to footer quick links.
- Documented canonical-domain, specialty-list, certification, and build-validation limitations.

## Version 4: contact form and email workflows
- Replaced the shortened inquiry form with the full business inquiry form and required contact consent.
- Changed specialty to free text and aligned service choices with the existing service catalog.
- Added server-side validation, request-size limits, same-origin checks, a honeypot, and a best-effort per-instance rate limit.
- Added optional Cloudflare Turnstile verification that becomes mandatory when its public and secret keys are configured; an incomplete key pair fails closed.
- Added a separate customer receipt email after the inquiry notification is accepted by Resend.
- Added specific success messaging when the notification succeeds but the receipt email is not accepted.
- Added setup and testing guidance without adding real credentials or claiming a live email test.
- Kept the form limited to general business inquiries and repeated the no-PHI warning.

## Version 5: resources, privacy preferences, legal drafts, and error states
- Removed unpublished date placeholders from resource cards and article headers; actual dates appear only when a valid ISO date is supplied.
- Added a general-information notice to resource article pages and retained the existing search, topic filters, and no-results state.
- Added draft Privacy Policy and Terms of Use pages with noindex metadata until business and legal approval.
- Added a browser-local privacy preference control for future optional analytics choices; it does not set a cookie, load analytics, or activate tracking.
- Added footer links to the legal drafts and branded favicon, app icon, Apple touch icon, and web manifest.
- Added custom not-found, route error, and global error handling pages.
- Documented legal, privacy, hosting/vendor, retention, analytics, and testing confirmations that remain outstanding.

## Version 6: SEO, security, accessibility, performance, and release checks
- Added a canonical URL helper that generates absolute URLs only from the explicitly configured NEXT_PUBLIC_SITE_URL value.
- Added metadata canonical URLs for all public static and dynamic content routes, while keeping draft legal pages noindex.
- Added a robots route that disallows API endpoints and references the sitemap only when the production origin is configured.
- Added a sitemap route for the homepage, service catalog, resource library, and article pages; draft privacy/terms routes are excluded.
- Added baseline security response headers and disabled the Next.js powered-by header. HSTS is conditional on a production build with an HTTPS canonical origin.
- Added same-origin checks and no-store response headers to the testimonial submission API.
- Added GitHub Actions quality checks for npm install, source lint, TypeScript typecheck, and production build.
- Kept analytics disabled and did not add tracking scripts; the privacy preference is not a license to activate analytics without a future consent-gated integration.
- Documented domain, security-policy, email, legal-review, browser, and Lighthouse items that still require real environment or manual verification.
- Verified the first GitHub Actions run: dependency installation, source lint, TypeScript typecheck, and the Next.js production build all passed.
