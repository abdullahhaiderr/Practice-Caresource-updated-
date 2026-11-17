# Practice Care Source design context

## Brand

The supplied logo is the visual source of truth for this foundation. Use the displayed spelling “Practice Care Source” until the business confirms whether its official written brand style differs. The visual tone should feel dependable, clear, modern, and human. Avoid unsupported performance claims, testimonials, certifications, privacy claims, and business details.

## Palette

Use a blue-led palette derived from the supplied logo:
- Deep navy: #0B1B3F
- Royal blue: #2F5BFF
- Sky blue: #4DA3FF
- Mint teal: #14C8A8
- Warm coral: #FF6B4A, used sparingly
- Ice background: #F5F8FF
- White: #FFFFFF
- Ink: #0F172A
- Muted text: #5B6B88

Use CSS variables in src/app/globals.css as the source of truth and Tailwind aliases in tailwind.config.ts. Check contrast when adding new combinations. Royal blue is an action color; dark navy is preferred for text on pale surfaces.

## Type

Use Plus Jakarta Sans for headings and Inter for body text through next/font. Keep body copy at least 16px where practical and preserve a clear hierarchy.

## Layout and components

Use a centered 12-column responsive layout with a maximum width near 1280px, an 8px spacing rhythm, generous section spacing, 20 to 24px card corners, and input corners near 14px. Prefer semantic reusable components, restrained shadows, and clear keyboard focus styles.

## Motion and waves

Use Framer Motion for subtle movement where it already fits the project. The reusable WaveDivider has three decorative SVG layers, pauses when outside the viewport, and stops movement for reduced-motion preferences. Read docs/motion-guidelines.md before adding continuous motion.

## Unverified content

Keep testimonials, customer counts, nationwide coverage claims, phone details, office information, business hours, and social links hidden until the business confirms them. Central feature and content settings live in src/lib/site.ts.
