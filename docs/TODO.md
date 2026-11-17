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

## Security, privacy, and legal confirmation
- Obtain the current approved security overview, safeguards, incident contact, and access-management details before publishing specific controls.
- Confirm whether a Business Associate Agreement or other written agreement is required for each prospective engagement; do not imply one is already in place.
- Confirm any certifications or compliance attestations before making public claims. The /security page currently makes no certification or compliance claim.
- Confirm the legal operator's full legal name, registered address, and contact details for the privacy and terms pages.
- Obtain jurisdiction-specific legal review of /privacy-policy and /terms-of-use. Both pages are drafts and use noindex metadata until approval.
- Confirm applicable privacy/consumer laws, data-controller or responsible-party details, user request procedures, retention/deletion schedules, and any required complaint or regulator information.
- Confirm the actual hosting, email, CAPTCHA, and other vendors, their data-processing terms, and any cross-border processing before finalizing the privacy notice.
- Keep website contact requests limited to general business inquiries. Do not collect patient names or PHI.

## Integrations
- Set RESEND_API_KEY and a verified CONTACT_FROM_EMAIL for email delivery.
- Keep CONTACT_TO_EMAIL set to the confirmed inquiry mailbox, currently info@practicecaresource.com.
- Verify SPF, DKIM, and DMARC records for the sending domain.
- For Turnstile, add the matching NEXT_PUBLIC_TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY values in the deployment environment. Both must be configured together.
- Configure a provider-level WAF or shared rate-limit store for distributed production rate limiting; the in-memory contact limit is per process only.
- Submit a real test request after email and Turnstile configuration; verify both admin notification and customer receipt delivery in Resend and the mailboxes.
- Confirm how support should handle a form submission that appears to contain sensitive patient data.
- Keep optional analytics disabled. If analytics are ever added, implement a consent gate that reads the saved browser preference before loading any analytics code.

## Final release readiness
- Set NEXT_PUBLIC_SITE_URL to the confirmed production HTTPS origin in Vercel. Until then, page canonical URLs are omitted and /sitemap.xml intentionally returns an empty list.
- Verify /robots.txt and /sitemap.xml against the real production domain after deployment.
- Confirm the Vercel project/build settings, custom-domain DNS, redirects, environment variables, and deployment output.
- Complete qualified legal review of /privacy-policy and /terms-of-use. User approval of the draft copy does not replace jurisdiction-specific legal review. Keep both pages noindex until then.
- Confirm the real email sender and test admin notification plus customer receipt with a real Resend configuration.
- Configure the matching Cloudflare Turnstile keys if the site owner wants the additional challenge enabled.
- Consider a shared rate-limit store or provider WAF for distributed production rate limiting; current in-memory limits apply per instance only.
- Test the production pages at mobile, tablet, and desktop widths, including navigation, form submission, privacy preferences, and error states.
- Run a keyboard/screen-reader check, automated accessibility audit, and Lighthouse or equivalent performance review against the deployed site.
- Do not add analytics until an analytics provider is selected and its initialization reads the stored consent preference before loading any tracking code.
- Review and test a Content Security Policy in staging before enabling one; account for the current Next.js runtime, Google-hosted fonts, remote Unsplash images, and optional Cloudflare Turnstile.

## Redesign checkpoints
- Version 1 through Version 6 are complete in the repository; the remaining items above are release configuration, legal review, and live-environment verification rather than another redesign milestone.

## Test limitations
- Run npm ci before full TypeScript and Next.js build checks.
- Test keyboard behavior and mobile navigation in a browser, not only by code review.
- Test the requested viewport widths and available browsers.
- Run an accessibility audit and Lighthouse on representative pages.
- Verify email delivery only after real Resend credentials and a verified sender are configured.
- Review and approve legal drafts before setting their robots metadata to indexable.
