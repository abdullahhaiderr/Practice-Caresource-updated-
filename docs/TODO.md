# Practice Care Source TODO

## Business confirmation required
- Confirm the official written and legal brand name. The supplied logo reads “Practice Care Source”.
- Confirm the canonical production domain before setting NEXT_PUBLIC_SITE_URL or publishing canonical metadata.
- Confirm whether all currently listed services are offered: Medical Billing, Credentialing & Enrollment, Virtual Assistant Services, AR Recovery, Denial Management, and Website Development.
- Confirm the intended service area, supported specialties, public phone, office address, business hours, and social URLs.
- Approve any owner or team biography before displaying personal attribution.
- Supply approved testimonial copy and usage permissions before enabling testimonial content.
- Verify numerical claims and coverage statements before publishing statistics.
- Confirm whether a free consultation is actually offered before using “free” in public CTA copy.

## Integrations
- Set RESEND_API_KEY and a verified CONTACT_FROM_EMAIL for email delivery.
- Verify SPF, DKIM, and DMARC records for the sending domain.
- Configure Turnstile only if the business has approved it and both keys are available.
- Keep contact forms limited to general business inquiries. Do not collect patient names or PHI.

## Remaining redesign work
- Version 3: service and company pages, specialties, searchable FAQ, security content, breadcrumbs, and structured data, using verified company information.
- Version 4: complete the expanded lead form and test notification and sender confirmation workflows.
- Version 5: resources enhancements, reviewed legal drafts, consent preferences, app icons, and error states.
- Version 6: SEO, analytics after consent, security, responsive, accessibility, performance, and release checks.

## Test limitations
- Run npm ci before full TypeScript and Next.js build checks.
- Test keyboard behavior and mobile navigation in a browser, not only by code review.
- Test the requested viewport widths and available browsers.
- Run an accessibility audit and Lighthouse on representative pages.
