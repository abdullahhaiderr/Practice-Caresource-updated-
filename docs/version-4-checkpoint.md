# Version 4 checkpoint: contact form and email workflows

## Delivered
- Replaced the short contact form with the full business inquiry form.
- Added required full name, practice/organization, email, phone, free-text specialty, service of interest, message, and explicit contact consent.
- Kept the specialty field free text because an approved supported-specialty list is not available.
- Aligned service choices with the six current service names, with a “Not sure yet” option.
- Kept the honeypot field and made the server silently accept bot submissions without sending mail.
- Added server-side Zod validation and rejected partial/legacy requests that do not meet the full contact form schema.
- Added a best-effort server check for obvious sensitive identifiers in the message, including SSN-formatted values, labelled MRN/member/patient IDs, and explicitly labelled dates of birth. This is not a complete PHI detector and does not make the form suitable for patient information.
- Enforced a 20 KB request-body cap, JSON content-type check, and same-origin check when an Origin header is supplied.
- Kept a best-effort limit of five valid requests per client key in ten minutes. This is per server process and is not a distributed limit across serverless instances.
- Added optional Cloudflare Turnstile. When the public site key and server secret are both configured, a token is required and is verified server-side with Cloudflare. If only one key is configured, the API fails closed with a configuration error.
- Added a Resend inquiry notification email and a separate receipt email to the submitting address.
- The public success message distinguishes between a successfully accepted receipt email and a request notification that succeeded while the receipt email failed.
- Added a link to the Security and Information Handling page next to the contact form.
- Kept the notice that this is a business inquiry form only and must not be used for patient names, PHI, insurance identifiers, or other sensitive patient information.

## Email configuration required before live delivery
- RESEND_API_KEY must contain a real Resend API key in the deployment environment.
- CONTACT_FROM_EMAIL must be a sender identity verified in the Resend account.
- CONTACT_TO_EMAIL defaults to info@practicecaresource.com, but can be explicitly configured in deployment settings.
- Configure and verify SPF, DKIM, and DMARC for the sending domain.
- To enable Cloudflare Turnstile, configure both NEXT_PUBLIC_TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY. Leave both empty to leave the additional CAPTCHA disabled. An incomplete pair blocks submission.

## Files updated
- src/lib/contact-schema.ts
- src/app/contact/contact-form.tsx
- src/app/contact/page.tsx
- src/app/api/contact/route.ts
- .env.example
- README.md
- CHANGELOG.md
- docs/TODO.md
- docs/version-4-checkpoint.md

## Validation
| Check | Result | Notes |
|---|---|---|
| Source review | Completed | Existing form, Zod schema, Resend route, and contact page reviewed before editing. |
| Change-set review | Completed | Form, route, environment placeholders, same-origin logic, Turnstile flow, and email outcomes reviewed after editing. |
| TypeScript syntax parse | Not run | No local copy of the exact Version 4 GitHub tree was available for an executed parser check. |
| npm install | Not run | No new dependencies were added. |
| TypeScript typecheck | Not run | Requires installed React/Next/Zod/Resend dependencies. |
| Next.js production build | Not run | Requires installed dependencies. |
| Resend admin notification | Not tested | Requires a real API key and verified sender. |
| Customer receipt email | Not tested | Requires a real API key and verified sender. |
| Turnstile verification | Not tested | Requires matching site and secret keys for a configured hostname. |
| Browser, accessibility, and Lighthouse tests | Not run | No browser test suite was executed for this checkpoint. |

No live email delivery, CAPTCHA verification, production build, deployment, or browser test is claimed.
