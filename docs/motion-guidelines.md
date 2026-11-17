# Practice Care Source motion guidelines

## Timing and easing

- Use 180 to 240 ms for hover, focus, and menu transitions.
- Use 450 to 600 ms for scroll reveal and first-load entrance motion.
- Use the shared brand-out easing: cubic-bezier(0.22, 1, 0.36, 1).
- Keep stagger intervals near 100 ms and limit them to small groups.

## What may move

- Reveal section content with a modest 14 to 18 px upward shift and a fade.
- Lift service cards slightly on hover; gently zoom their image and shift the arrow.
- Animate the three decorative SVG wave layers subtly. Wave motion runs only while the component is visible.

## Accessibility and performance

- Respect prefers-reduced-motion. Prefer static content when it is requested.
- Never make important content depend on animation.
- Avoid animating layout-heavy properties; prefer transform and opacity.
- Do not use autoplaying or essential continuous movement.
- Keep transitions short and preserve keyboard focus visibility.
- The WaveDivider uses IntersectionObserver to pause offscreen animation and disables movement for reduced-motion preferences.
