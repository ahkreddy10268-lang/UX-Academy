# UX-Academy logo kit — DRAFT v0.1

Status: **draft master, pending approval of the reconstruction.** Do not ship until approved.

Source of truth: the approved raster reference sheet. Everything here was redrawn from it and
generated from one script, so any approved change regenerates the whole kit consistently.

## What is in the kit

| Folder | Contents |
|---|---|
| `svg/symbol/` | `uxa-symbol-gradient-on-light`, `-gradient-on-dark` (reversed tones), `-black`, `-white`, plus `-small` and `-xs` cuts |
| `svg/lockup/` | Stacked lockup: gradient on light, gradient on dark, black, white |
| `svg/wordmark/` | Outlined wordmark, black and white |
| `icons/` | `favicon.svg` (adapts to dark mode), `favicon.ico` (16/32/48), `apple-touch-icon.png`, `icon-192/512.png`, `icon-maskable-512.png`, `site.webmanifest`, `app-icon-dark/light.svg` |
| `components/react/` | `UxaLogo.tsx` + `uxa-logo-data.ts` (strict TypeScript, React 18+) |
| `components/html/` | `uxa-logo.js` web component + `demo.html` |
| `png/` | 2000 px previews |
| `preview/` | Reference vs reconstruction comparison sheet |
| `data/` | Path and rule data the components are generated from |

## Rules

- **Module s** = U stem width = 304 units. Symbol = 5s × 2.5s (1520 × 760, exactly 2:1).
- **Clear space** = ½s on every side (10% of the symbol's width), around symbol, lockup and wordmark.
- **Colour**: black `#000000`, white `#FFFFFF` and greys only. No coloured gradients, no effects.
- Black (or the gradient) on light backgrounds; white (or the reversed gradient) on dark.
- Never stretch, crop, rotate, recolour or redraw. Always scale proportionally.

## Minimum sizes (symbol width unless noted)

| Use | Screen | Print |
|---|---|---|
| Gradient symbol | 120 px | 25 mm |
| Flat, standard cut | 96 px | 12 mm |
| Flat, small cut | 40–95 px | 8–11 mm |
| Flat, XS cut | 16–39 px | — |
| Full lockup, gradient | 200 px wide | 35 mm wide |
| Full lockup, flat | 140 px wide | 25 mm wide |
| Wordmark alone | 100 px wide | 20 mm wide |

The components apply these automatically when you pass `width` or `height`.

## Components

```tsx
import { UxaLogo } from "./UxaLogo";
<UxaLogo variant="full" width={240} />
<UxaLogo variant="symbol" tone="on-dark" height={40} />
<UxaLogo variant="wordmark" width={180} withClearSpace />
```

```html
<script src="uxa-logo.js" defer></script>
<uxa-logo variant="full" width="240"></uxa-logo>
<uxa-logo variant="symbol" tone="on-dark" width="32"></uxa-logo>
```

Props / attributes: `variant` full | symbol | wordmark · `tone` on-light | on-dark | current ·
`treatment` gradient | flat · `cut` auto | standard | small | xs · `width` / `height` ·
`withClearSpace` (`clear-space`) · `title` (`label`) · `decorative`.

## Typeface

The wordmark uses **Manrope ExtraBold (800)**, tracking −0.7%, as a documented stand-in. The original
typeface is unconfirmed. It is delivered as outlines, so no font file is needed to display the logo.
Manrope is licensed under the SIL Open Font License.

## Open decisions (see the review page)

1. Approve the symbol geometry. 2. Keep or unify the X diagonals (49.4° vs 47.1°).
3. Artboard snapped to 2:1 (0.1% change). 4. Wordmark stand-in. 5. Lockup centred.
6. Knockout gaps in flat versions. 7. Small and XS cuts. 8. Reversed gradient on dark.
9. Clear space = ½s.
