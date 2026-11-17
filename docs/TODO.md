# Practice Care Source TODO and verification register

## Business confirmation required

- Confirm the official legal and written brand style. The supplied logo reads “Practice Care Source”; the source code previously used “CareSource”.
- Confirm the canonical production domain. Candidate URLs in the brief could not be reached during the audit. Keep NEXT_PUBLIC_SITE_URL blank until confirmed.
- Confirm which services are currently offered. The current catalog is Medical Billing, Credentialing & Enrollment, Virtual Assistant Services, AR Recovery, Denial Management, and Website Development. Proposed Revenue Cycle Management and Medical Coding categories remain unresolved.
- Confirm the intended service area before publishing it as a verified company fact. The brief says United States only, but asks that current company information be verified.
- Confirm whether a public business phone number, office address, or business hours should be displayed. These are currently hidden.
- Confirm founder/owner name and approve any biography before publishing person-specific claims.
- Supply approved testimonial text, client permissions, and image permissions before enabling testimonials.
- Substantiate the 200+ specialties, 50 States, end-to-end RCM, and dedicated billing manager claims before enabling coverage highlights.
- Confirm which specialties the business actually supports before publishing specialty pages or capability claims.
- Confirm whether “free consultation” or only “consultation” is an accurate offer. Current CTA wording avoids promising a free audit.
- Confirm social account URLs before displaying social links.
- Confirm the actual response-time expectation, if one should be published.

## Configuration and integration

- Set RESEND_API_KEY in the deployment environment.
- Configure a verified CONTACT_FROM_EMAIL sender with Resend.
- Keep CONTACT_TO_EMAIL=info@practicecaresource.com unless the business changes its contact destination.
- Configure and verify SPF, DKIM, and DMARC for the sending domain before production mail testing.
- Decide whether Turnstile is required and provide its site and secret keys if enabled.
- Confirm that no inquiry form should accept patient names, PHI, or sensitive patient data. The UI notice is explicit; server-side controls and tests remain part of Version 4.

## Later implementation versions

- Version 2: complete shared shell, responsive navigation and homepage, workflow illustration, hero waves, validated section hierarchy, and CTA patterns.
- Version 3: complete service and company pages, specialties, FAQs, security information, breadcrumbs, and structured data using verified content.
- Version 4: expand contact form fields and test validation, spam controls, failure/success handling, and both Resend email messages.
- Version 5: resources improvements, legal drafts, consent preferences, icons, manifest, error states, and HTML sitemap.
- Version 6: canonical SEO, sitemap.xml, robots.txt, structured data, analytics after consent, accessibility, performance, security, link, responsive, and release checks.

## Known technical verification

- Run npm run lint, npm run typecheck, and npm run build for each completed milestone and record actual output.
- Add browser automation and accessibility tooling only after confirming compatibility with the current dependency set.
- Test keyboard behavior for dropdowns, mobile navigation, accordions, cookie preferences, search, and forms.
- Test viewport widths 320, 375, 768, 1024, 1280, and 1536 pixels.
- Verify Chrome, Safari, Firefox, Edge, iOS Safari, and Android Chrome where actual test environments are available. Record unavailable browsers instead of claiming coverage.
