# Nails by Vera — Design System

The brand & UI foundation for migrating **nailsbyvera.nl** from WordPress/Elementor to a
bespoke **Astro** site. This system captures the look, voice, and components of Vera's
private nail salon so new pages can be built natively instead of inside Elementor.

> **Source of truth:** the live site — https://nailsbyvera.nl (home, over-de-salon,
> portfolio, behandelingen, prijzen, contact). Booking runs through Salonized
> (`nailsbyvera.salonized.com`). The original is Elementor 4.x with Google Fonts.
> A full-page screenshot is in `uploads/nailsbyvera.nl_-small.png`.

---

## Brand at a glance
Nails by Vera is a **private, one-woman nail salon** in Hengelo, Overijssel. The brand
is soft, feminine and reassuring — *"Nail care is self care"*. Premium but warm and
personal; the customer is always addressed directly as **jij/jouw**.

---

## CONTENT FUNDAMENTALS — how the copy is written
- **Language:** Dutch body copy with the occasional **English display line** as a
  romantic flourish — "Look good and feel even better", "Enjoy your coffee",
  "Nail care is self care". Headings can be EN; paragraphs are NL.
- **Person:** always second person — **jij / jouw / je**. Never corporate "wij" except
  the warm royal-we "wij geloven in perfecte nagels".
- **Tone:** warm, personal, reassuring. Lots of gentle encouragement and the recurring
  reassurance pattern *"Geen zorgen, ik …"* / *"Kun je niet kiezen? …"*.
- **Casing:** sentence case for body; **wide-tracked UPPERCASE eyebrows** introduce each
  section ("WELKOM", "WAT WE DOEN", "TOP KWALITEIT", "REVIEWS").
- **Punctuation:** exclamation marks are frequent and friendly. Em-dashes and ellipses
  used for a soft, spoken rhythm. Occasional accented emphasis ("nóg leuker!").
- **No emoji.** Sparkle/gold *graphics* carry the decorative load instead.
- **Examples:**
  - Hero: *"Jouw nagels spreken als jouw persoonlijke visitekaartje. Geef jouw
    zelfvertrouwen een boost met die prachtige nagels!"*
  - Reassurance: *"Geen zorgen, ik geef je graag persoonlijk advies!"*
  - CTA labels: "Plan jouw NAILDATE", "Boek nu", "Alle behandelingen", "Route beschrijving".

---

## VISUAL FOUNDATIONS
- **Palette:** a warm blush/cream base (`--blush-50/100/200`) under near-black warm ink
  text. **Coral** (`#ED8967`) is the single action color — every booking CTA. **Gold**
  (`#C7A24E`) is the decorative metal: sparkles, botanical line-art, review stars. One
  **charcoal band** (`#666666`) provides the only dark contrast moment on the page.
- **Type:** high-contrast serif display — **Cormorant Garamond** (500/600, with italics
  for romantic phrases) — over a light geometric sans body — **Jost** (300/400/500).
  *(Both are Google-Fonts matches to the original Elementor fonts — confirm/replace, see
  CAVEATS.)*
- **Backgrounds:** soft, near-white blush gradients; no photographic full-bleed heroes
  except the bottom 6-up nail grid. Decorative **gold botanical leaf line-art** and
  **scattered gold sparkles/specks** float in section corners (these are PNG assets —
  see ICONOGRAPHY).
- **Signature motif:** the **arch frame** — photos sit in a shape with a fully rounded
  top and squared base (`--radius-arch`). Often layered with a thin gold-rose arch
  *outline* behind the filled photo.
- **Corners & cards:** soft. Buttons use a small 4px radius (the coral CTA) or full pill
  (outline). Service cards are **sharp-cornered** with a hairline border. Testimonial
  cards are centered, hairline-bordered.
- **Borders:** hairline `rgba(28,26,25,0.12)` and dusty-rose `#E9C3B6`. Thin vertical
  rules separate stat figures from their labels.
- **Shadows:** soft, warm, low-contrast and large-radius — photos float on
  `--shadow-soft`; cards barely lift. No hard or neutral-grey shadows.
- **Hover / press:** gentle. Buttons lift **−2px** and deepen to `--coral-600` on hover,
  scale to **0.985** on press (no bounce). Service cards lift −6px. Text links grow a
  coral underline left-to-right and shift the arrow +4px.
- **Motion:** calm `cubic-bezier(.22,1,.36,1)` ease, ~280ms. Fades and soft slides; no
  springy bounces, no infinite loops.
- **Transparency / blur:** the sticky header is translucent blush with a backdrop blur.
  Otherwise surfaces are opaque.
- **Imagery vibe:** warm, bright, soft-focus nail close-ups; pastel polish tones; gold
  jewelry; cozy salon. Nothing cool-toned or high-contrast.
- **Layout:** centered `--container` (1200px) with generous `--section-y` rhythm;
  two-column alternating image/text bands; sticky top nav; centered section intros.

---

## ICONOGRAPHY
- **No icon font.** The brand barely uses UI icons. The visual "icons" are:
  - **Hand-drawn nail illustrations** atop each service card (Versteviging, Verlenging,
    Natural nails, Nail art) — these are PNG line-drawings from the original site.
  - **Gold four-point sparkles** scattered as decoration — recreated as the
    `Sparkle` component (simple geometric, on-brand). Real site also uses gold specks.
  - **Gold botanical leaf line-art** — decorative PNGs in section corners.
  - **Five gold stars** for reviews — `StarRating` component.
- **No emoji, no unicode glyph icons.** A trailing **→** arrow is the only glyph, on links/CTAs.
- **Assets needed (could not be auto-downloaded — cross-origin):** upload these from the
  WordPress media library (`/wp-content/uploads/…`) into `assets/`:
  - `NbyV-logo-black.png` (logo) — the `Logo` component is a **typeset stand-in** until then.
  - Service icons: `4gt4f4.png`, `uefhv.png`, `euvnev.png` (nail line-drawings).
  - Gold botanical leaves + sparkle specks: `rigbunrg.png`, `ioutgweg.png`, `2f3f@400x.png`.
  - Photography: hero shots (`IMG_9294`, `IMG_8717`, `IMG_9895`…), arch polish photos
    (`foto-met-boog-*.png`), and the 6-up nail grid (`IMG_8747`, `IMG_0121`, `IMG_9296`,
    `IMG_9888`, `IMG_9227`).

---

## Index / manifest
**Global CSS** (consumers link this one file): `styles.css` → imports:
- `tokens/fonts.css` · `tokens/colors.css` · `tokens/typography.css` ·
  `tokens/spacing.css` · `tokens/effects.css`

**Components** (`window.NailsByVeraDesignSystem_5e657c.*`):
- `components/core/` — `Button`, `Eyebrow`, `SectionHeading`, `ArchFrame`, `ServiceCard`,
  `StarRating`, `TestimonialCard`, `StatBlock`, `Sparkle`
- `components/brand/` — `Logo` (typeset stand-in)

**UI kit:** `ui_kits/website/` — full homepage recreation (`index.html`).

**Foundation cards:** `guidelines/*.card.html` — Colors, Type, Spacing, Brand.

**Other:** `SKILL.md` (portable skill), `uploads/` (reference screenshot).

---

## CAVEATS — please confirm
1. **Fonts are matches, not the originals.** Cormorant Garamond + Jost were chosen from
   the site's look; the Elementor font config couldn't be read from binaries. Confirm or
   send the real families/files.
2. **Brand assets are placeholders.** The logo, service icons, gold botanicals and all
   photography need to be uploaded (list above) — they're cross-origin and couldn't be
   fetched automatically.
