# Handoff: Nails by Vera — nieuwe website (Astro)

## Overview
Volledig herontwerp van **nailsbyvera.nl** — een privé-nagelsalon in Hengelo (OV) van Vera Wolff. Doel: weg van WordPress/Elementor, naar een eigen **Astro**-site. Dit pakket bevat de zes hoofdpagina's in de gekozen richting **"Editorial Frames"**: een grote fotohero met daaronder alle content in afgeronde kaders (bento-achtig), gebouwd op het Nails by Vera design system.

Primaire conversie op elke pagina: **Direct boeken** → het bestaande Salonized-widget
(`https://nailsbyvera.salonized.com/widget_bookings/new`).

## About the Design Files
De bestanden in deze bundel zijn **design-referenties in HTML** — prototypes die de bedoelde look en het gedrag tonen, geen productiecode om over te nemen. De opdracht is om deze designs **opnieuw te bouwen in Astro** met de eigen conventies van dat project (`.astro`-componenten, layouts, content collections). Als er nog geen codebase is: zet een schone Astro-app op (Astro 5, geen UI-framework nodig — de site is vrijwel volledig statisch).

Elk `.dc.html`-bestand toont **twee renders naast elkaar**: links de desktopversie (1280px canvas) en rechts de mobiele versie (390px). Dat zijn twee breakpoints van dezelfde pagina, geen twee pagina's. Bouw responsive, met de mobiele render als leidraad voor < 768px.

## Fidelity
**High-fidelity.** Kleuren, typografie, spacing, radii en copy zijn definitief. Alle waarden staan hieronder onder Design Tokens; recreëer pixel-nauwkeurig.

## Screens / Views

### 1. Home — `Editorial Frames.dc.html`
- **Purpose:** eerste indruk + direct boeken.
- **Layout (desktop):**
  - Hero: 16px blush-padding rondom een kaart van `height:720px; border-radius:32px`, full-bleed foto met verloop `linear-gradient(180deg, rgba(28,26,25,.44), rgba(28,26,25,.08) 40%, rgba(28,26,25,.58))`. Nav zweeft bovenop (glasmorph pill), titel linksonder, boekkaart rechtsonder (`rgba(255,255,255,.94)`, blur 14px, radius 24px).
  - Titel: "Nail care / *is self care*" — 86px display, regel 2 cursief.
  - Bento-strip: 3 kolommen — review-kaart, "7 dagen" garantie (blush-200), "1 op 1" privésalon.
  - "Wat ik voor je doe": 4 fotokaarten (foto 150px hoog, radius 16px) met titel, omschrijving, duur + prijs onder een hairline.
  - Donkere stappenband (`--bg-feature`, radius 32px, 3 kolommen: Boek online / Kom langs / Geniet ervan).
  - "Recent werk": 4-koloms raster, rijhoogte 220px, eerste tegel span 2×2, radius 24px.
  - "Hoi, ik ben Vera": foto links (radius 32px), kaart rechts met chips + koraal WhatsApp-kaart eronder.
  - Footer: 4 kolommen (logo/claim, menu, contact, openingstijden) + copyright.
- **Mobile:** hero 520px, alles gestapeld op 12px gutter, servicekaarten 2×2 (foto 96px, geen bodytekst), sticky boekbalk onderaan (`--ink-900` pill).

### 2. Over mij — `Over mij.dc.html`
- **Purpose:** vertrouwen — het verhaal van Vera.
- Hero 480px met portret. Daaronder twee tekst/foto-blokken (50/50, radius 32px): "It runs in the family" en "Dream big" (met chips voor opleidingen: Magnetic Nail Design, Julia Visser, Tanya Savchenko). Vervolgens 4-koloms fotoraster (220px). Afsluitende CTA-band "Kom langs en ontspan!".

### 3. Portfolio — `Portfolio.dc.html`
- **Purpose:** werk laten zien.
- Hero 420px. Filterrij (pill-chips; "Alles" actief = `--ink-900`, wit). Masonry-achtig raster: 4 kolommen, rijhoogte 230px, tegels 0/6 span 2×2, tegels 3/9 span 2. Twee reviewkaarten + een koraal/blush "Zelf zo'n set?"-kaart. CTA-band.
- **Filters zijn nog niet functioneel** — implementeer client-side filtering op een `category`-veld per afbeelding.

### 4. Behandelingen — `Behandelingen.dc.html`
- **Purpose:** uitleg per behandelgroep.
- Hero 460px. Introkaart met drie chips. Drie afwisselende blokken (tekstkaart + foto, om en om gespiegeld): Nagelversteviging (Biab/Gel/Acrylgel), Gellak, Nail art — elk met bullets (goud ✦) en een "Boek nu"-knop. Daaronder 3 statkaarten (4 weken / 7 dagen / Advies). CTA-band met de quote "Step into luxury, walk out with style".

### 5. Prijzen — `Prijzen.dc.html`
- **Purpose:** volledige tarieven.
- Hero 420px. Vier prijskaarten in een 2×2-raster: Biab/Hard gel/Acrylgel, Nail art, Gellak, Overige services. Elke rij: label links (300 gewicht, 16px), prijs rechts (display 22px), gescheiden door `border-top: 1px solid var(--border-hair)`. Daaronder 3 infokaarten. CTA-band "Ook zo enthousiast?".

### 6. Contact — `Contact.dc.html`
- **Purpose:** boeken, bereiken, vinden.
- Hero 440px. Rij 1: grote boekkaart (60%) + informatiekaart (telefoon, e-mail, Instagram, Facebook). Rij 2: openingstijdenkaart + kaartbeeld met adreskaart eronder. CTA-band "Plan jouw route".
- **De kaart is nu een fotoplaceholder** — vervang door een Google Maps embed op `De Genestetstraat 41, Hengelo`.

## Interactions & Behavior
- **Navigatie:** persistente header, actieve pagina = pill met `--ink-900` achtergrond en witte tekst. Op mobiel: logo + "Boeken"-knop + hamburger (menu-drawer nog te bouwen).
- **Boeken:** elke primaire knop opent het Salonized-widget in een nieuw tabblad. Er is bewust **geen beschikbaarheid** in de UI — die hangt af van de gekozen behandeling en leeft in Salonized.
- **Hover:** knoppen `translateY(-2px)` + `--coral-600`; press `scale(.985)`. Kaarten met foto: subtiele lift (−4px). Tekstlinks: koraal onderstreping die van links uitgroeit, pijl +4px.
- **Motion:** `cubic-bezier(.22,1,.36,1)`, ~280ms. Geen bounce, geen loops.
- **Responsive:** desktop ≥1024px zoals de linkerrender; <768px zoals de rechterrender (alles 1-koloms, rasters 2-koloms, sticky boekbalk). Tussenliggend: 2 kolommen voor de servicekaarten.

## State Management
Vrijwel stateloos — statische Astro-pagina's. Uitzonderingen:
- Portfolio-filter (client-side, `useState`-equivalent of een klein island).
- Mobiel menu open/dicht.
- Eventueel een FAQ-accordeon als die later terugkomt.
Geen data-fetching; content mag in content collections of frontmatter.

## Design Tokens
Bron: het bijgeleverde design system (`_ds/nails-by-vera-design-system-.../tokens/*.css`). Neem deze over als CSS custom properties.

**Kleuren**
- `--bg-page` #FFF6F2 · `--bg-feature` #1C1A19 (donkere banden) · `--surface-card` #FFFFFF
- `--blush-100` #FBEDE7 · `--blush-200` #F6E1D9
- `--coral-500` #ED8967 (primaire actie) · `--coral-600` #E0744F (hover)
- `--rose-300` #E9C3B6 · `--rose-500` #D29A8C (eyebrows)
- `--gold-300` #E4CC8F · `--gold-500` #C7A24E · `--gold-600` #B08F3F (decoratie, sterren, ✦)
- `--ink-900` #1C1A19 · `--ink-700` #4A4442 · `--ink-600` #6B6462 · `--ink-400` #9A918E
- `--border-hair` rgba(28,26,25,0.12)

**Typografie**
- Display: **Cormorant Garamond**, 500, cursief voor romantische regels. Maten: 86 (hero home) / 62 (pagina-hero) / 46 (CTA) / 44 (sectiekop) / 40 / 34 / 30 / 26 / 22.
- Body: **Jost**, 300 (lopende tekst), 400 (knoppen). Maten: 17 / 16 / 15 / 14 / 13.
- Eyebrow: Jost 300, 12–13px, `letter-spacing:.2em`, uppercase, `--rose-500` (licht) of `--gold-300` (donker).
- Line-height: koppen 1.02–1.15; body 1.7–1.85. `text-wrap: pretty` op langere alinea's.

**Spacing** — 4/8/12/16/20/24/32/40/48/56/64. Pagina-gutter desktop 40px, mobiel 12–20px. Kaartpadding 30–40px desktop, 22px mobiel.

**Radius** — kaders 24px (kaart), 32px (grote fotokaders/banden), 20px (mobiele kaart), 16px (foto in kaart), 999px (pills/knoppen). Knop primair: 4px in het design system, in dit ontwerp pill.

**Shadows** — `--shadow-card` (zacht, warm, grote radius), `--shadow-soft` voor foto's. Geen neutrale grijze schaduwen.

## Assets
Alle foto's komen uit de bestaande WordPress-mediabibliotheek. Ze zijn inmiddels gemigreerd naar `src/assets/photos/` en worden via Astro's `<Image>` geserveerd (AVIF/WebP, responsive srcset) — zie `src/data/images.ts`, waar per foto het oorspronkelijke WordPress-pad staat.

De prototypes laadden die foto's oorspronkelijk rechtstreeks van `nailsbyvera.nl`. Dat is vervangen door lokale kopieën in `uploads/`, zodat ze blijven werken als de oude site uit de lucht gaat.

Gebruikte bestanden: `2024/06/NbyV-logo-black.png` (logo); `2024/07/IMG_9294`, `IMG_8717`, `IMG_9895`, `IMG_8747`, `IMG_0121`, `IMG_9296`, `IMG_9888`, `IMG_9227`, `FullSizeRender`; `2024/08/IMG_1516`, `IMG_0354`, `IMG_1684`, `IMG_1879`, `IMG_1957`, `IMG_1862`, `IMG_1551`, `Photoroom_20240306_101904`.

Het logo is in de prototypes een **typografische stand-in** (`Logo`-component uit het design system). Gebruik het echte PNG/SVG.

Fonts: Cormorant Garamond + Jost via Google Fonts — zelf hosten met `@fontsource` voor snelheid.

## Content
Alle copy is letterlijk overgenomen van de huidige site (home, over-de-salon, portfolio, behandelingen, prijzen, contact). Tone of voice: Nederlands, tweede persoon (jij/jouw), warm en geruststellend, met af en toe een Engelse displayregel. Geen emoji.

Vaste gegevens: De Genestetstraat 41, Hengelo · 06-36079000 · info@nailsbyvera.nl · @byveranails · openingstijden di & do 09:00–17:15, za 09:00–13:00.

## Files
- `Editorial Frames.dc.html` — home
- `Over mij.dc.html`
- `Portfolio.dc.html`
- `Behandelingen.dc.html`
- `Prijzen.dc.html`
- `Contact.dc.html`
- `design-system/` — tokens (`tokens/*.css`), `styles.css` en de React-broncode van de componenten (Button, SectionHeading, ServiceCard, TestimonialCard, StatBlock, StarRating, ArchFrame, Sparkle, Logo). Port deze naar `.astro`-componenten.
- `support.js`, `image-slot.js` — runtime van de prototype-omgeving, **niet meenemen naar productie**.

## Suggested Astro structure
```
src/
  layouts/Base.astro            # head, fonts, Header, Footer
  components/Header.astro  Footer.astro  BookingButton.astro
             PhotoFrame.astro  Card.astro  Eyebrow.astro
             ServiceCard.astro  PriceGroup.astro  StepBand.astro  CtaBand.astro
  pages/index.astro  over-mij.astro  portfolio.astro
        behandelingen.astro  prijzen.astro  contact.astro
  styles/tokens.css
```
Houd de oude URL's aan of zet redirects: `/over-de-salon/` → `/over-mij/`.
