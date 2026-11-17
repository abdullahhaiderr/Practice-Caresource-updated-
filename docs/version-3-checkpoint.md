# Version 3 checkpoint: service and company information

## Delivered

- Preserved all six current service slugs and their detail routes.
- Added structured data for the Organization, service detail pages, service FAQ content, the services list, and the About page.
- Added breadcrumb structured data where a verified canonical URL is configured. The visible breadcrumb navigation remains available regardless of domain configuration.
- Added a specialty-fit discussion section to the Services page and an additional specialty-fit FAQ to each service detail page.
- Did not create specialty-specific pages or publish a specialty directory because the repository contains no confirmed list of supported specialties.
- Added an information-and-access section to every service detail page and a standalone /security page linked from the footer.
- Clarified that the website contact form and general inquiry email are not for patient data or PHI.
- Stated explicitly that the website does not make a security certification, HIPAA certification, or contractual-status claim.
- Replaced the About page's partial hard-coded service list with all six services from the central service catalog.
- Removed the unverified “US healthcare providers” / “US practices” wording from the About and Services overview copy.
- Retained the existing service descriptions and URLs rather than inventing new company facts, performance statistics, specialty coverage, or certifications.

## Scope decisions

- The only service inventory used is the existing source catalog: Medical Billing, Credentialing & Enrollment, Virtual Assistant Services, AR Recovery, Denial Management, and Website Development.
- Specialty fit is discussed case-by-case in neutral language. No specialty availability is promised because no approved specialty list is present in the project source.
- The Security page provides questions to resolve before sharing information. It is not a security certification, HIPAA attestation, BAA, privacy policy, or guarantee of any control.
- Breadcrumb schema omits absolute breadcrumb URLs until NEXT_PUBLIC_SITE_URL is configured with the confirmed production domain.
- A similarly named third-party “Practice Care Solutions” online presence was not treated as Practice Care Source and was not used to add facts.

## Files updated or added

- src/lib/structured-data.ts
- src/app/layout.tsx
- src/app/security/page.tsx
- src/lib/site.ts
- src/app/about/page.tsx
- src/app/services/page.tsx
- src/app/services/[slug]/page.tsx
- README.md
- CHANGELOG.md
- docs/TODO.md
- docs/version-3-checkpoint.md

## Validation

| Check | Result | Notes |
|---|---|---|
| GitHub source tree review | Completed | V2 main branch and source files reviewed before edits. |
| Change-set review | Completed | Updated files and new route inspected at source level. |
| TypeScript syntax check | Not run | No final local checkout/build environment was available for this turn. |
| npm install | Not run | This was not rerun for Version 3. |
| TypeScript typecheck | Not run | Requires full dependencies and a local build environment. |
| Next.js production build | Not run | Requires installed dependencies. |
| Browser, accessibility, and Lighthouse tests | Not run | No browser test suite was available. |
| Live security controls or compliance documentation | Not verified | This page intentionally makes no certification or compliance claims. |

No successful build, deployment, live security control, HIPAA certification, BAA, or browser test is claimed.
