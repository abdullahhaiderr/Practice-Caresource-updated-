# Visual review correction: Resources and Contact

## Why this pass was needed
The previous implementation did not carry the supplied design references through consistently on the Resources and Contact routes. The Resources card grids also placed cards inside a reveal wrapper whose animated inner element did not stretch to the wrapper's full height. This meant the cards did not reliably fill the same grid row height, even when their outer grid cells were set to `h-full`.

## Reference direction applied
- **MediNest:** a clean corporate header/hero presentation, clear hierarchy and concise calls to action.
- **MediTrust:** considered information cards, a clear Contact information/form composition, and grouped supporting details.
- **Crafto IT Business:** a confident image-led hero, a dark corporate surface, layered restrained visual details, and a soft wave transition into the content.
- **Existing Practice Care Source assets and palette:** retained the supplied logo, current deep navy, royal blue, sky blue and mint tokens, existing fonts, existing image sources, and current content routes.

These are design references, not source templates. No competitor text, code, logos, or proprietary image assets were copied.

## Resources changes
- Replaced the flat light hero with a more confident photo-led navy hero and direct paths to browse the article library or ask about a workflow.
- Added three short topic panels grounded in the current article subjects: billing and claims, credentialing, and denials and AR.
- Rebuilt the featured article as a horizontal editorial card with a distinct image panel and content panel.
- Standardized article-card image ratio, title area, excerpt treatment, and bottom reading-time/action row so cards align consistently.
- Fixed the shared scroll reveal layout so the animated inner surface stretches with full-height grid cells.
- Expanded search to use the existing article body, key takeaways, and section text while preserving topic filters, empty state, current article titles, and routes.
- Added share/copy-link and print controls to article detail pages, plus print-friendly article styling.

## Contact changes
- Rebuilt the Contact hero around a clear message, image panel, primary form CTA and verified email path.
- Balanced the form against useful supporting content: the verified email address, a three-step explanation of what happens next, and a dedicated no-PHI notice linking to the Security page.
- Retained the four existing contact FAQs with a consistent, animated two-column card layout.
- Replaced the one-screen long form with two steps. The first collects name, practice/organization and work email; phone is optional. The second collects service interest, optional free-text specialty, general message and contact consent.
- Kept the current Resend notification and confirmation workflow, existing Zod server validation, same-origin check, request-size limit, honeypot, limited obvious-identifier check, per-instance rate limit and optional fail-closed Turnstile validation.
- Optional phone and specialty are explicitly reported as “Not provided” in the business notification when left blank.

## Business and safety boundaries
- Only the verified public email `info@practicecaresource.com` is shown as a direct contact channel.
- No physical address, phone number, office hours, response-time promise, testimonial, performance statistic, client logo, payer relationship, or specialty coverage claim was added.
- The contact form remains for general business enquiries only. Visitors are told not to submit PHI, patient identifiers, or sensitive patient data.
- The original resource article copy and slugs remain in place. Unconfirmed publish dates remain hidden.
- Analytics remain disabled and no new third-party analytics or marketing scripts were added.

## Validation status
- Source-level review completed after edits.
- No dependency was added.
- Automated lint, TypeScript and production build should be read from the GitHub Actions run for this commit once it finishes.
- No browser screenshot, responsive-device, accessibility, Lighthouse, live Vercel, or live email test is claimed by this source change alone.
- The previous Vercel reference URL could not be fetched from the connected Vercel scope in this session. The redesign therefore applies the supplied design brief and reference principles but cannot claim a pixel-by-pixel comparison to that live deployment.
