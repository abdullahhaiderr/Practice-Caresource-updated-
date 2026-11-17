# Version 2 checkpoint: global shell and homepage

## Delivered
- Updated the responsive shared header with a verified-information utility strip, sticky main navigation, active-route treatment, service dropdown, and consultation CTA.
- Added keyboard operation for the desktop service dropdown, including Arrow Up, Arrow Down, Home, and End navigation. Escape and focus leaving the menu close it.
- Added a mobile navigation drawer with Escape support, focus trapping, focus return, body scroll locking, route-change dismissal, and a backdrop.
- Rebuilt the homepage hero with a value proposition, consultation and services CTAs, and three process-oriented principles.
- Added a revenue workflow diagram labeled “Illustrative workflow”. It explicitly states it is not a live integration or customer data.
- Added practice challenge cards, all six services from the existing catalog, the six-step process, onboarding sequence, FAQ section, and final consultation CTA.
- Added a three-layer decorative wave divider above the footer and refined footer links, email contact, and the business-only inquiry notice.
- Preserved existing route paths and current service slugs. Did not create unverified specialty pages, testimonials, statistics, or technology claims.

## Files updated
- src/components/navbar.tsx
- src/components/footer.tsx
- src/components/home/home-hero.tsx
- src/components/home/hero-visual.tsx
- src/components/home/home-sections.tsx
- src/components/wave-divider.tsx
- src/app/page.tsx
- README.md
- CHANGELOG.md
- docs/TODO.md

## Design and content decisions
- Used the requested blue-led palette and a dark navy hero with original interface components.
- Kept the “Illustrative workflow” label next to the revenue workflow visual.
- Used the existing service list, without silently renaming or merging services.
- Did not display unverified testimonials, customer statistics, unsupported specialty claims, physical contact details, or free-consultation language.
- The homepage and footer use info@practicecaresource.com as the verified published email address provided in the project brief.

## Checks
| Check | Result | Detail |
|---|---|---|
| Source lint | Passed | Lightweight parser and placeholder check; not ESLint. |
| TypeScript syntax parse | Passed | 34 TypeScript and TSX files parsed without syntax diagnostics. |
| JSON/config parse | Passed | package.json and .21st/design.json parsed successfully. |
| npm ci | Blocked | Installation timed out in this environment. |
| npm run typecheck | Blocked | Missing @types/node, @types/react, and @types/react-dom due incomplete install. |
| npm run build | Blocked | Next.js CLI was unavailable because dependencies were not installed. |
| Browser/responsive tests | Not run | No actual browser automation was available. |
| Accessibility/Lighthouse | Not run | No accessibility or Lighthouse run was available. |
| Live email test | Not run | Requires a Resend API key and verified sender. |

No build, deployment, live email, browser, accessibility, or Lighthouse success is claimed.
