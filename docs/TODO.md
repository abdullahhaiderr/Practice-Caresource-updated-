# Practice Care Source TODO

## Business confirmation required
- Confirm the official written and legal brand name. The supplied logo reads “Practice Care Source”.
- Confirm the canonical production domain before setting NEXT_PUBLIC_SITE_URL or publishing canonical metadata.
- Confirm whether all currently listed services are offered: Medical Billing, Credentialing & Enrollment, Virtual Assistant Services, AR Recovery, Denial Management, and Website Development.
- Confirm the intended service area and approved supported-specialty list before publishing geographic or specialty coverage claims. The current site deliberately does not publish a specialty directory.
- Confirm public phone, office address, business hours, and social URLs.
- Approve any owner or team biography before displaying personal attribution.
- Supply approved testimonial copy and usage permissions before enabling testimonial content.
- Verify numerical claims and coverage statements before publishing statistics.
- Confirm whether a free consultation is actually offered before using “free” in public CTA copy.

## Security and privacy confirmation
- Obtain the current approved security overview, safeguards, incident contact, and access-management details before publishing specific controls.
- Confirm whether a Business Associate Agreement or other written agreement is required for each prospective engagement; do not imply one is already in place.
- Confirm any certifications or compliance attestations before making public claims. The /security page currently makes no certification or compliance claim.
- Keep website contact requests limited to general business inquiries. Do not collect patient names or PHI.

## Integrations
- Set RESEND_API_KEY and a verified CONTACT_FROM_EMAIL for email delivery.
- Keep CONTACT_TO_EMAIL set to the confirmed inquiry mailbox, currently info@practicecaresource.com.
- Verify SPF, DKIM, and DMARC records for the sending domain.
- For Turnstile, add the matching NEXT_PUBLIC_TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY values in the deployment environment. Both must be configured together.
- Configure a provider-level WAF or shared rate-limit store for distributed production rate limiting; the in-memory contact limit is per process only.
- Submit a real test request after email and Turnstile configuration; verify both admin notification and customer receipt delivery in Resend and the mailboxes.
- Confirm how support should handle a form submission that appears to contain sensitive patient data.

## Remaining redesign work
- Version 5: resources enhancements, reviewed legal drafts, consent preferences, app icons, and error states.
- Version 6: SEO, analytics after consent, security, responsive, accessibility, performance, and release checks.

## Test limitations
- Run npm ci before full TypeScript and Next.js build checks.
- Test keyboard behavior and mobile navigation in a browser, not only by code review.
- Test the requested viewport widths and available browsers.
- Run an accessibility audit and Lighthouse on representative pages.
- Verify email delivery only after real Resend credentials and a verified sender are configured.
