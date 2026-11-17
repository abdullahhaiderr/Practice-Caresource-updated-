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

## Visual correction: Resources and Contact experience
- Reworked the Resources hero with a photo-led navy presentation, cobalt calls to action, a wave transition, and three concise topic panels based on the current article library.
- Rebuilt the featured article as a horizontal editorial composition and standardized regular article card image ratios, title space, excerpt height, and bottom metadata/action alignment.
- Expanded resource search to cover article body text as well as title, excerpt, and category; retained all existing filters and article routes.
- Fixed the shared reveal wrapper so its animated surface stretches to the height of grid items, correcting the root cause of uneven card heights.
- Reworked Contact into a stronger image-led hero, verified email contact card, “what happens next” steps, clear PHI boundary, and balanced form/FAQ panels.
- Split the contact form into two steps; made phone and specialty optional while keeping required server-side validation, contact consent, honeypot, Turnstile and Resend notifications/receipts.
- Added article share/copy and print controls, with print-friendly article styling.
- Kept current business facts, existing service and article slugs, no-PHI safeguards, and the actual contact email. No address, phone number, testimonials, dates or response-time promise were invented.


## Full redesign reset: homepage and visual foundation
- Reconnected the supplied ZIP's original client testimonial content and portrait assets in a dedicated, accessible horizontal review experience, with pause control and reduced-motion fallback.
- Rebuilt service cards as image-led editorial panels with more intentional image treatment, hierarchy, depth and hover feedback.
- Slowed the three layered hero waves to 18, 25 and 33 seconds for calm continuous motion; added a manual pause state to the testimonial rail.
- Preserved the approved global header and footer while beginning the content-page redesign from the supplied ZIP and design references.


## Sitewide editorial design pass
- Replaced the homepage's generic workflow card stack with an art-directed photographic composition and a clearly labelled illustrative workflow panel.
- Refined shared page hero imagery with an arch crop, restrained framing, layered depth and slower image zoom.
- Shifted Services and individual service detail heroes to the same dark, image-led visual language with the existing slow wave transition.
- Reworked Security guidance from repetitive cards into a numbered editorial list.

- Added the slow testimonial marquee motion with pause-on-hover/focus and a manual pause control; reduced-motion users retain a manually scrollable row.
- Retained the existing footer wave and slowed the three layered wave motions to 18, 25 and 33 seconds.

- Reworked the Privacy Policy and Terms of Use presentation into an accessible editorial reading layout with section navigation; retained their draft notice and existing `noindex` metadata.

- Rebuilt the homepage content sections with an editorial list, connected service imagery, a non-card process timeline, restored testimonials, and more varied section compositions.

- Enabled the ZIP-supplied testimonial section through the central site feature flag after the owner's explicit approval.

- Updated individual resource article heroes to use the same photographic, dark-and-wave visual treatment while keeping the reading experience clear and accessible.

- Removed build-time Google Font downloads and switched to polished system font stacks so production builds do not depend on an external font fetch; the display/body font roles remain separately configurable through CSS variables.
