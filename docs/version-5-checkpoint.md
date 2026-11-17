# Version 5 checkpoint: resources, privacy preferences, legal drafts, app icons, and error states

## Delivered

### Resources
- Removed visible `[PUBLISH DATE]` placeholders from resource cards and article headers. A date is rendered only when the article data contains a valid calendar date in YYYY-MM-DD form.
- Kept the existing resource content, topic filters, search behavior, reading-time labels, and empty-results message.
- Added a general-information notice to each resource detail page reminding visitors to verify current payer/jurisdiction requirements and not to treat the article as professional advice.
- Date metadata is included in Article/Open Graph fields only when a real ISO date is present.

### Privacy preferences
- Added a small privacy-choice notice for visitors without a saved preference.
- Added a panel to save or change a choice about optional analytics.
- Stores a versioned preference in browser local storage; it does not set a cookie and stores no contact-form content.
- The current site does not have an analytics integration enabled. Saving an optional-analytics preference does not load a script or activate tracking.
- Added accessible labels, status feedback, keyboard-operable controls, and a persistent bottom-corner privacy preferences entry point.
- No analytics, advertising, or third-party tracking script was added.

### Legal draft pages
- Added /privacy-policy and /terms-of-use.
- Both pages prominently say that they are drafts for business and legal review, not legal advice or a claim of compliance.
- Both use noindex metadata until legal and business approval.
- Drafts disclose unresolved details such as legal operator identity, jurisdiction, retention/deletion rules, actual vendors and their locations, and other required notices instead of inventing those details.
- Added links to both drafts in the site footer.

### Icons and app metadata
- Added favicon.svg, icon.svg, apple-touch-icon.png, and site.webmanifest.
- Added application manifest and favicon/Apple-touch-icon references to Next.js metadata.
- Icon art uses the current navy, white, sky, and mint palette.

### Error states
- Added a branded not-found page.
- Added an App Router error boundary with retry and home navigation.
- Added a global error fallback that can render when the root layout itself fails.

## Files updated
- src/components/privacy-preferences.tsx
- src/components/legal-page.tsx
- src/app/privacy-policy/page.tsx
- src/app/terms-of-use/page.tsx
- src/app/not-found.tsx
- src/app/error.tsx
- src/app/global-error.tsx
- src/app/layout.tsx
- src/components/footer.tsx
- src/components/resources/resource-card.tsx
- src/app/resources/[slug]/page.tsx
- public/favicon.svg
- public/icon.svg
- public/apple-touch-icon.png
- public/site.webmanifest
- README.md
- CHANGELOG.md
- docs/TODO.md
- docs/version-5-checkpoint.md

## Validation

| Check | Result | Notes |
|---|---|---|
| Source review | Completed | Existing resources, metadata, layout, footer, feature flags, and environment usage reviewed. |
| Resource date handling | Source-reviewed | Placeholder dates are not rendered; valid dates are formatted and used only when supplied. |
| Privacy preference flow | Source-reviewed | Browser local storage stores the preference; no analytics or cookie code was added. |
| Legal draft review | Source-reviewed | Draft status and unresolved operator/jurisdiction/vendor/retention details are explicit; routes are noindex. |
| Error-state review | Source-reviewed | not-found, route error, and global error components added. |
| Icon/manifest review | Source-reviewed | SVG assets, Apple PNG, manifest, and metadata paths aligned. |
| Automated source lint | Not run | Requires the repository's dependencies to be installed; no build/test output is claimed. |
| TypeScript typecheck | Not run | Requires installed React/Next/TypeScript dependencies. |
| Next.js production build | Not run | Requires installed dependencies. |
| Browser/mobile/accessibility tests | Not run | No browser automation or accessibility audit was executed. |

## Not completed / approval required
- The Privacy Policy and Terms of Use are drafts, not approved legal documents. Do not remove the draft notice or enable indexing until the business identity, jurisdictions, vendors, retention rules, and applicable legal provisions have been reviewed.
- No analytics platform was installed. The saved preference is groundwork for future consent-gated analytics only.
- No deployment or production test is claimed by this checkpoint.
