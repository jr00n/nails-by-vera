---
id: TASK-1
title: 'Astro-project opzetten met design tokens, fonts en basislayout'
status: Done
assignee:
  - '@claude'
created_date: '2026-08-08 08:37'
updated_date: '2026-08-08 10:24'
labels:
  - fundament
  - astro
milestone: m-0
dependencies: []
documentation:
  - docs/PRD.md
  - design_handoff_nailsbyvera/README.md
modified_files:
  - package.json
  - package-lock.json
  - astro.config.mjs
  - tsconfig.json
  - .gitignore
  - .nvmrc
  - public/favicon.svg
  - src/styles/global.css
  - src/data/site.ts
  - src/layouts/Base.astro
  - src/components/Header.astro
  - src/components/Footer.astro
  - src/pages/index.astro
  - docs/PRD.md
priority: high
type: chore
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Het fundament waar alle andere bouwtaken op rusten. Er is nog geen codebase — dit is een schone start.

De site wordt volledig statisch: zes contentpagina's, geen data-fetching, geen backend. Het ontwerp is high-fidelity en definitief: kleuren, typografie, spacing en radii staan vast in het meegeleverde design system en moeten pixel-nauwkeurig worden overgenomen.

Bewuste keuzes uit de PRD, zodat een latere uitvoerder ze niet opnieuw hoeft af te wegen:
- **Astro 7** met `output: 'static'`. (De PRD schreef oorspronkelijk Astro 5; bij aanvang van de bouw was 7.2 actueel en is in overleg met Jeroen op 7 gezet — zie het implementatieplan.) Geen UI-framework — de enige interactie op de site is een mobiel menu en een portfoliofilter, samen enkele tientallen regels vanilla JS.
- Styling met **Tailwind CSS v4**, geïnstalleerd via `astro add tailwind`. Dat installeert de officiële Vite-plugin; de oude `@astrojs/tailwind`-integratie is vervallen en moet niet gebruikt worden. Vervolgens `@import "tailwindcss"` in `src/styles/global.css`.
- De design tokens gaan als `@theme`-blok in die global stylesheet en worden zo utilities. De tokens blijven de bron van waarheid; Tailwind is alleen de distributie.
- `trailingSlash: 'always'` — WordPress gebruikt trailing slashes en bestaande backlinks moeten exact blijven werken.
- Fonts zelf hosten via @fontsource (Cormorant Garamond + Jost). Niet via Google Fonts laden: dat stuurt het IP van elke bezoeker naar Google en zou een cookiebanner-discussie terugbrengen.

Waarom Tailwind en niet handgeschreven CSS: de prototypes bevatten 1037 inline style-attributen, nul CSS-classes en nul media queries. Er is dus geen bestaande CSS-architectuur om over te nemen, en alle responsive logica moet van nul geschreven worden. Dat laatste is het grootste CSS-werk in het project. Verwacht wel dat ongeveer de helft van de layout in arbitrary values terechtkomt — de grids en hero-hoogtes zijn stuk voor stuk uniek. Dat is verwacht gedrag, geen signaal dat de aanpak niet klopt.

De tokens staan als CSS in het handoff-pakket onder `_ds/nails-by-vera-design-system-*/tokens/`. Let op: de kleurwaarden in de handoff-README zijn leidend waar die afwijken van de oudere tokenbestanden (met name `--bg-feature`, dat in dit ontwerp #1C1A19 is).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Astro 7 draait lokaal met `output: 'static'` en een vastgezette Node-versie in package.json
- [x] #2 Tailwind v4 is geïnstalleerd via de officiële Vite-plugin; @astrojs/tailwind komt nergens in het project voor
- [x] #3 Alle design tokens staan in een @theme-blok en zijn als utilities beschikbaar
- [x] #4 Cormorant Garamond en Jost worden zelf gehost; de pagina doet geen enkel netwerkverzoek naar een externe host
- [x] #5 trailingSlash staat op 'always'
- [x] #6 Een basislayout met head, header en footer rendert een lege pagina in de juiste achtergrondkleur en typografie
- [x] #7 Er is een .gitignore met node_modules, dist en .env
- [x] #8 Een productiebuild slaagt zonder waarschuwingen
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Besluit vooraf: Astro 7 in plaats van Astro 5

PRD §6.1 en AC #1 schreven Astro 5 voor. Actuele release is 7.2.0 (laatste 5.x = 5.18.2).
Voorgelegd aan Jeroen op 2026-08-08, akkoord voor **Astro 7**. Geen enkele breaking change
uit 6 of 7 raakt dit project: geen `@astrojs/db`, geen legacy content collections, geen
`ViewTransitions`, geen custom markdown-plugins, geen custom Vite-plugins. Astro 6 eist
Node ≥22.12.0 — lokaal draait 22.17.1. AC #1 en PRD §6.1 worden mee aangepast.

## Stappen

1. **Scaffold met de hand** (niet `npm create astro`): de projectmap is niet leeg
   (`backlog/`, `docs/`, `design_handoff_nailsbyvera/`, `.git`) en de wizard is
   interactief. Handmatig: `package.json` (met `engines.node: "22.x"` voor Vercel),
   `tsconfig.json` (extends `astro/tsconfigs/strict`), `.gitignore`, `src/env.d.ts`.
2. `npm install astro@^7` → `npx astro add tailwind --yes`. Dat installeert
   `tailwindcss` + `@tailwindcss/vite` en zet de Vite-plugin in `astro.config.mjs`.
   Daarna verifiëren dat `@astrojs/tailwind` nergens voorkomt (AC #2).
3. **`astro.config.mjs`**: `output: 'static'`, `trailingSlash: 'always'`,
   `site: 'https://nailsbyvera.nl'`, `@tailwindcss/vite` als Vite-plugin.
4. **Fonts**: `@fontsource-variable/cormorant-garamond` en `@fontsource-variable/jost`
   (beide 5.3.0). Variabele varianten schelen requests t.o.v. losse gewichten; nodig
   zijn Cormorant 500 + italic 500 en Jost 300/400/500. Alleen de latin-subset
   importeren in `global.css`. Geen `@import` naar `fonts.googleapis.com` — het
   `tokens/fonts.css` uit de handoff bevat die regel wél en gaat dus **niet** mee.
5. **`src/styles/global.css`** met `@import "tailwindcss"` + één `@theme static { … }`.
   `static` is nodig omdat de semantische aliassen (`--color-bg-page:
   var(--color-blush-50)`) anders kunnen breken als de basisvariabele wegge-tree-shaked
   wordt.

   Tokenmapping naar Tailwind-namespaces (de tokens blijven de bron van waarheid,
   Tailwind is de distributie — PRD §6.5):
   - Kleuren → `--color-*` (`bg-bg-page`, `text-ink-600`, `border-hair`, …)
   - Fonts → `--font-display`, `--font-body`
   - Typografische maten → `--text-*`, met bijbehorende `--text-*--line-height`
   - Radii → `--radius-card|frame|card-mobile|photo|pill|arch`
   - Schaduwen → `--shadow-soft|card|coral|xs`
   - Motion → `--ease-brand` + `--default-transition-duration/-timing-function`
   - Spacing: Tailwinds standaardschaal (`--spacing: 0.25rem`) dekt 4/8/12/16/20/24/
     32/40/48/56/64 al exact; niet overschrijven. Wel `--container`/`--gutter` als
     eigen vars.

   **Kleurwaarden: de handoff-README is leidend** waar die afwijkt van de oudere
   `tokens/*.css`. Concreet afwijkend: `blush-100` #FBEDE7, `blush-200` #F6E1D9,
   `gold-300` #E4CC8F, `gold-600` #B08F3F, `ink-700` #4A4442, `ink-600` #6B6462,
   `ink-400` #9A918E, en `bg-feature` **#1C1A19** (tokenbestand had `var(--grey-700)`
   = #666666, dat is fout voor dit ontwerp). De afwijkingen worden in de CSS per regel
   becommentarieerd zodat niemand ze later "terugcorrigeert".

   **Typeschaal.** De handoff werkt met vaste px per breakpoint (display 86/62/46/44/
   40/34/30/26/22, body 17/16/15/14/13), niet met de clamp-schaal uit
   `tokens/typography.css`. Omdat het ontwerp pixel-nauwkeurig moet zijn, gaat de
   px-schaal de `@theme` in als `--text-d86 … --text-d22` en `--text-b17 … --text-b13`,
   met line-height ingebakken (koppen 1.02–1.15, body 1.7–1.85). Zo blijft
   `text-[86px]` overbodig.
6. **Layout en componenten**: `src/layouts/Base.astro` (html/head met meta, title,
   description, `lang="nl"`, skip-to-content link, `<slot/>`), `src/components/
   Header.astro` en `Footer.astro`. Bewust minimaal en semantisch — de definitieve
   opmaak (glasmorph-pill over de hero, 4-koloms footer, mobiel menu) hoort bij
   TASK-6/7/9. Wat hier moet kloppen: achtergrondkleur `--bg-page`, `--font-body` op
   body, `--font-display` op koppen, tokens overal via utilities.
7. **`src/data/site.ts`**: NAP-gegevens (naam, adres, telefoon, e-mail, socials,
   openingstijden, Salonized-URL) op één plek. Nodig om de footer te kunnen renderen,
   en PRD §8.3 eist sowieso één bron voor NAP. Klein en bewust vooruitlopend op
   TASK-8/12.
8. **`src/pages/index.astro`**: expliciete placeholder die aangeeft dat TASK-7.1 de
   echte home bouwt.
9. **Verificatie**:
   - `npx astro build` → moet slagen zonder waarschuwingen (AC #8)
   - `grep` over `dist/` op `http://`, `https://`, `fonts.googleapis`, `fonts.gstatic`
     → nul externe hosts (AC #4)
   - inspectie van de gebouwde CSS: alle tokenvariabelen aanwezig, utilities werken
     (AC #3)
   - `npx astro dev` starten en de pagina ophalen (AC #1, #6)
   - `astro.config.mjs` op `trailingSlash: 'always'` (AC #5), `.gitignore` (AC #7)

## Buiten scope van deze taak

Componenten porten (TASK-6), pagina's bouwen (TASK-7.x), afbeeldingen (TASK-2),
content collections (TASK-8), mobiel menu/filter/sticky balk (TASK-9), sitemap en
structured data (TASK-12), analytics (TASK-13), `vercel.json` en redirects (TASK-14).
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
**Afwijkingen van het plan tijdens uitvoering**

1. *Fontsubsets.* Het plan ging uit van 'alleen de latin-subset importeren'. De variabele @fontsource-pakketten leveren geen losse subset-CSS: `wght.css` bevat alle subsets met `unicode-range`. Aanpak nu: die bestanden importeren. Gevolg: `dist/_astro/` bevat ook de cyrillische en Vietnamese woff2's (~300 kB dood gewicht op de CDN), maar de browser haalt ze door de unicode-range nooit op. Alleen latin/latin-ext wordt daadwerkelijk aangevraagd. Netto pagina-gewicht ongewijzigd.
2. *Jost italic niet meegenomen* — het ontwerp gebruikt cursief alleen in de displayregels (Cormorant). Scheelt drie bestanden.
3. *`astro add tailwind` faalde de eerste keer* op `ENOENT: mkdir src/styles` omdat `src/` nog niet bestond; het commando maakt de map niet recursief aan. Opgelost door de mappen vooraf aan te maken en het commando opnieuw te draaien.
4. *CSS-buildwaarschuwing door een commentaarblok.* Het pad `…design-system-*/tokens/…` in een CSS-comment bevat de tekenreeks `*/` en sloot het commentaar vroegtijdig af — Lightning CSS gaf 'Invalid dangling combinator in selector'. Het pad staat nu zonder glob in het commentaar. Let hierop bij het documenteren van globs in CSS.
5. *`@astrojs/check` + `typescript` toegevoegd als devDependency.* Stond niet in het plan, maar `npm run check` was al als script opgenomen en typecontrole hoort bij het fundament. Draait schoon over 7 bestanden.
6. *Favicon.* `Base.astro` verwijst naar `/favicon.svg`; er staat nu een tijdelijke SVG in huisstijlkleuren in `public/`. Vervangen door het echte logo in TASK-2.

**Gaten in de brongegevens (voor TASK-4)**

`src/data/site.ts` bevat twee lege velden met een TODO, omdat de gegevens nergens in het handoff-pakket of de PRD staan en niet verzonnen mogen worden:
- `contact.postalCode` — nodig voor `PostalAddress` in de structured data (TASK-12)
- `social.facebook` — de contactpagina toont wel een Facebook-link, maar het adres staat er niet bij

**Aandachtspunt voor TASK-14 (Vercel)**

`trailingSlash: 'always'` laat Astro bestanden als `/pagina/index.html` genereren. In `astro dev` levert de vorm zonder slash een 404 op, geen 301 — geverifieerd met een tijdelijke testpagina (`/slashtest/` → 200, `/slashtest` → 404). De 301 moet dus van het platform komen: zet de trailing-slash-instelling van het Vercel-project op 'always' (of leg het vast in `vercel.json`), anders krijgt een bezoeker met een oude link zonder slash een 404 in plaats van een redirect.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## Wat er staat

Een schoon Astro-project met het complete design system als Tailwind-tokens, zelf-gehoste fonts en een werkende basislayout. Alle andere bouwtaken kunnen hierop verder.

**Stack**
- Astro 7.2 (`output: 'static'`, `trailingSlash: 'always'`, `site: https://nailsbyvera.nl`), Node vastgezet op 22.x in `engines` en `.nvmrc`
- Tailwind CSS 4.3 via `astro add tailwind` → `@tailwindcss/vite`. `@astrojs/tailwind` komt nergens voor
- `@fontsource-variable/cormorant-garamond` (normaal + cursief) en `@fontsource-variable/jost`, lokaal gebundeld
- `@astrojs/check` + TypeScript voor `npm run check`

**Design tokens** — `src/styles/global.css`, één `@theme static`-blok. `static` is bewust: de semantische aliassen verwijzen met `var()` naar het basispalet, en zonder `static` kan Tailwind een basisvariabele weglaten die nergens rechtstreeks als utility wordt gebruikt.

Mapping naar Tailwind-namespaces zodat alles als utility beschikbaar is:
- `--color-*` — basispalet (blush/rose/coral/gold/ink) plus semantische aliassen (`page`, `soft`, `arch`, `feature`, `surface`, `heading`, `copy`, `muted`, `eyebrow`, `accent`, `hair`, `line`)
- `--font-display` / `--font-body`
- `--text-d86 … --text-d22` (Cormorant) en `--text-b17 … --text-b12` (Jost), elk met ingebakken line-height. Het ontwerp is px-gedreven per breakpoint, dus die schaal is overgenomen in plaats van de clamp-schaal uit `tokens/typography.css`
- `--radius-btn|photo|card-m|card|frame|pill|arch`, `--shadow-xs|soft|card|coral`, `--tracking-*`, `--leading-*`
- `--ease-brand` plus `--default-transition-duration/-timing-function`, zodat een kale `transition` meteen de merkbeweging heeft
- `--spacing-gutter` (40px) en `--spacing-gutter-m` (20px), `--container-site` (1200px), `--container-narrow` (760px)

De spacingschaal van Tailwind is niet overschreven: die dekt 4/8/12/16/20/24/32/40/48/56/64 al exact.

**Kleurwaarden: de handoff-README is leidend** waar die afwijkt van de oudere `tokens`-bestanden. Elke afwijking staat als commentaar bij de regel, zodat niemand ze later "terugcorrigeert". De belangrijkste: `--bg-feature` is #1C1A19, niet #666666 — het tokenbestand koppelde de donkere band aan `--grey-700`, wat een grijze in plaats van bijna-zwarte band zou opleveren.

**Basislaag** — body op `--color-page` en Jost 300/16px/1.7, koppen op Cormorant 500, `text-wrap: pretty` op alinea's, een zichtbare `:focus-visible`-indicator en `prefers-reduced-motion`-respect.

**Layout** — `Base.astro` (head, skip-to-content, `<slot/>`), `Header.astro` (logo, navigatie met actieve pagina, boek-CTA) en `Footer.astro` (contact, openingstijden, menu). Bewust sober: de definitieve vormgeving hoort bij TASK-6/7/9.

**`src/data/site.ts`** — één bron voor NAP, openingstijden, socials, navigatie en de Salonized-URL. Vooruitlopend op TASK-8/12, maar nodig om de footer te kunnen renderen en PRD §8.3 eist het sowieso.

## Afwijking van de opdracht

De taak en PRD §6.1 schreven **Astro 5** voor; het is **Astro 7** geworden. Bij de start van de bouw was 7.2 actueel en 5.18.2 de laatste 5.x. Geen enkele breaking change uit 6 of 7 raakt dit project. Voorgelegd en akkoord bevonden; PRD §6.1, AC #1 en de taakomschrijving zijn bijgewerkt.

## Verificatie

| Criterium | Bewijs |
|---|---|
| #1 Astro 7, static, Node vast | `astro build` meldt `output: "static"`; dev-server op :4321 gaf 200 op `/`; `engines.node: "22.x"` |
| #2 Tailwind via Vite-plugin | `grep -rn "@astrojs/tailwind"` over `package.json`, `package-lock.json`, `astro.config.mjs` en `src/` → geen treffers; `@tailwindcss/vite` staat in de config |
| #3 Tokens als utilities | 25 tokenvariabelen teruggevonden in de gebouwde CSS; utilities `max-w-site`, `px-gutter-m`, `lg:px-gutter`, `rounded-pill`, `text-d62`, `text-b17`, `bg-ink-900`, `bg-accent`, `border-hair`, `tracking-eyebrow`, `text-eyebrow`, `font-display` allemaal gegenereerd. `.text-d62` levert `font-size:var(--text-d62);line-height:var(--text-d62--line-height)` |
| #4 Geen externe hosts | Alle 13 `url()`-verwijzingen in de CSS wijzen naar `/_astro/…woff2`; 0 treffers op `googleapis`/`gstatic`. De enige externe strings in `dist/` zijn de Tailwind-licentiecomment, de SVG-namespace en de Salonized-link (bewust, `target="_blank" rel="noopener"`) |
| #5 trailingSlash | Config-waarde plus gedragstest met een tijdelijke pagina: `/slashtest/` → 200, `/slashtest` → 404 |
| #6 Basislayout rendert | Headless Chrome-screenshot van de productiebuild op 1280px: blush achtergrond, Cormorant-koppen inclusief de cursieve displayregel, Jost 300 body, rose eyebrow, koraal CTA-pill, ink-900 actieve nav-pill, hairline-scheidingen |
| #7 .gitignore | `node_modules/`, `dist/`, `.astro/`, `.env`, `.vercel/`, `.DS_Store` |
| #8 Build zonder waarschuwingen | `astro build` schoon (er was één CSS-waarschuwing door een `*/` in een commentaarpad; verholpen). `astro check`: 0 errors, 0 warnings, 0 hints over 7 bestanden |

## Openstaand

- `contact.postalCode` en `social.facebook` staan leeg met een TODO — die gegevens staan nergens in het handoff-pakket. Opvragen in TASK-4, nodig voor de structured data in TASK-12.
- Het Vercel-project moet zelf op trailing slash 'always' worden gezet, anders geeft een oude link zónder slash een 404 in plaats van een 301 (TASK-14).
- Favicon is een tijdelijke SVG; vervangen door het echte logo in TASK-2.
- Er is nog niet gecommit.
<!-- SECTION:FINAL_SUMMARY:END -->
