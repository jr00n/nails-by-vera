---
id: TASK-7.5
title: Pagina 'Portfolio' bouwen
status: Done
assignee:
  - '@claude'
created_date: '2026-08-08 08:53'
updated_date: '2026-08-09 06:16'
labels:
  - paginas
milestone: m-0
dependencies: []
documentation:
  - design_handoff_nailsbyvera/Portfolio.dc.html
modified_files:
  - src/pages/portfolio.astro
  - src/content/portfolio.yaml
  - src/content.config.ts
  - src/components/PhotoFrame.astro
parent_task_id: TASK-7
priority: medium
type: feature
ordinal: 13000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Doel is het werk laten zien. Voor een nagelsalon is dit vaak de pagina die de twijfel wegneemt.

Ontwerp: `design_handoff_nailsbyvera/Portfolio.dc.html`.

Opbouw: hero van 420px. Daaronder een filterrij met pill-chips, waarbij "Alles" actief is met `--ink-900` achtergrond en witte tekst. Vervolgens een masonry-achtig raster van vier kolommen met rijhoogte 230px: tegels 0 en 6 beslaan 2×2, tegels 3 en 9 beslaan 2 kolommen. Daarna twee reviewkaarten en een koraal/blush kaart "Zelf zo'n set?". Afsluitend een CTA-band.

Deze taak bouwt de statische pagina inclusief de filterrij als opmaak. De werkende filtering is bewust een aparte taak, samen met de andere interactieve onderdelen — de filterknoppen zijn in het ontwerp nog niet functioneel.

De portfolio-afbeeldingen komen uit de content collection, inclusief het category-veld dat het latere filter gebruikt.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 De pagina komt visueel overeen met beide renders van het ontwerp
- [x] #2 Het rastermet de afwijkende tegelgroottes klopt met het ontwerp
- [x] #3 Afbeeldingen komen uit de portfolio-collection en hebben elk een category
- [x] #4 De filterrij staat er visueel correct in; werkende filtering valt buiten deze taak
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Aanpak

`src/pages/portfolio.astro` (→ `/portfolio/`), compositie uit bestaande
componenten. Nieuw: de collection `portfolio`, die bepaalt welke foto's in het
raster staan, in welke volgorde, hoe groot de tegel is en onder welke categorie
het filter hem straks toont.

## Opbouw desktop

1. **Hero** — kader van 420px, foto `photos.nudeNatuurlijk` (slot `pf-hero` =
   2024/07/IMG_9296), verloop uit het ontwerp plus de twee scrims die op de
   vorige drie pagina's ook nodig bleken. Eyebrow "Portfolio", h1 62px "Recent
   werk uit de salon". Mobiel 400px / 38px.
2. **Filterrij** — "Alles" actief (ink-900, wit, 14px) plus een chip per
   categorie, rechts de Instagram-regel. Alleen opmaak; het filter zelf is
   TASK-9 (AC #4).
3. **Raster** — vier kolommen, rijhoogte 230px, gap 16px. Tegel 1 en 7 zijn
   2×2, tegel 4 en 10 twee kolommen breed (AC #2). Mobiel twee kolommen op
   150px, waar beide afwijkende maten de volle breedte krijgen.
4. **Reviews en boeken** — twee `TestimonialCard`s plus de blush-kaart "Zelf
   zo'n set?" met een `BookingButton`.
5. **CTA-band** — "Genieten van de perfecte nagels?" met knop "Boek nu".
6. Footer uit `Base` + `StickyBookingBar`.

## Collection (AC #3)

`portfolio` naast `treatments` en `prices`: `order`, `photo` (sleutel uit
`src/data/images.ts`), `category` en een optionele `span`. Bestand en alt-tekst
blijven in het beeldmanifest, want die horen bij het beeld en niet bij deze
pagina (PRD §5.6).

## Twee keuzes die van het ontwerp afwijken

**De filterchips volgen uit de content.** De desktoprender toont zes chips,
waaronder "Verlenging" en "French & babyboom" — categorieën die geen enkele
foto in de mediabibliotheek heeft. PRD §5.3 zegt expliciet dat de categorieën
uit de content volgen, en de mobiele render van hetzelfde ontwerp toont precies
de vier die daaruit komen: Alles · Versteviging · Gellak · Nail art. Twee dode
filterknoppen voorkomen weegt zwaarder dan de desktoprender letterlijk volgen.

**Eén tegel krijgt een andere foto.** Het ontwerp zet IMG_8747 twee keer in het
raster (tegel 1 en tegel 9, twee formaten van hetzelfde bestand). Dezelfde foto
twee keer leest als een fout, terwijl er nog ongebruikte sets in de
mediabibliotheek staan; op plek 9 komt daarom de french met gele bloemetjes.

## Kopstructuur

Eén h1 (hero). Het raster en de kaartenrij krijgen een `sr-only` h2, omdat het
ontwerp die secties geen kop geeft; "Zelf zo'n set?" is een h3 binnen de
kaartenrij. `CtaBand` levert zijn eigen h2.

## Verificatie

- `npm run check` en `npm run build` schoon.
- Desktop 1280 en 1920: tegelmaten en -posities met een DOM-script meten tegen
  het ontwerp (552×476 voor 2×2, 552×230 voor breed, 268×230 voor de rest).
- Mobiel 390: overflow-meting en tegelmaten.
- Contrast in de hero per glyph tegen de foto eronder.
- Copy automatisch vergelijken met het prototype.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
**Het ontwerp toont dezelfde foto twee keer.** Tegel 1 en tegel 9 verwijzen allebei naar IMG_8747, in twee formaten van hetzelfde bestand. In een portfolio leest dat als een fout, zeker met vijf ongebruikte sets in de mediabibliotheek. Op plek 9 staat nu de french met gele bloemetjes. Dit is een contentkeuze, geen layoutafwijking — het raster is ongewijzigd.

**De filterrij volgt uit de content, niet uit de desktoprender.** Die render toont zes chips, waaronder 'Verlenging' en 'French & babyboom'. Geen enkele foto in de mediabibliotheek heeft die categorie, dus dat zouden twee knoppen zijn die straks nul resultaten geven. PRD §5.3 zegt expliciet dat de categorieën uit de content volgen, en de mobiele render van hetzelfde ontwerp toont precies de vier die daaruit komen. De pagina leidt de chips nu af uit de collection: Alles · Versteviging · Gellak · Nail art.

De knoppen staan er al als `<button>` met `data-filter`, en elke tegel draagt `data-category`. TASK-9 hoeft daardoor alleen het script toe te voegen en de rij te verbergen als er geen JavaScript is (TASK-9 AC #3); de opmaak hoeft niet herschreven.

**De relatieve datums bij de reviews zijn weggelaten.** Het prototype zet er 'Angelique Luijkman · 7 maanden geleden' en 'Sandra Kamst · 8 maanden geleden' bij. Die zijn relatief aan het moment waarop het ontwerp gemaakt werd en kloppen op de dag van livegang al niet meer — een feitelijke fout op een pagina waar dit project juist op feitelijkheid stuurt (PRD §8.4). De namen en de quotes staan er letterlijk; TASK-4 haalt de reviews met een echte datum op en TASK-8 zet ze in een collection.

**`PhotoFrame` geeft nu overige attributen door aan het kader.** Nodig voor `data-category` op de tegels. Props erven van `HTMLAttributes<'div'>` en de rest wordt gespreid — geen gedragsverandering voor de bestaande aanroepen.

**Hero, vierde pagina, vierde keer dezelfde scrims.** Gemeten per glyph tegen de foto eronder: desktop eyebrow 9,5 · h1 4,6 · intro 4,8; mobiel 6,3 · 5,7 · 6,6. De h1 en de intro zitten op desktop het dichtst bij de grens van alle vier de pagina's tot nu toe; dit is de foto met het lichtste tekstgebied. Nog steeds boven AA, maar dit is de plek om bij de audit (TASK-15) met het blote oog naar te kijken.

**Meetdetail voor wie de pagina naschiet:** in een headless screenshot van de volle pagina zijn de laatste twee tegels soms leeg. Dat is lazy loading tijdens de capture, geen gat in het raster — met een DOM-meting zijn alle twaalf tegels compleet en op hun plek (`complete=true`, correcte x/y).
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## Wat er staat

`/portfolio/` uit "Editorial Frames", op beide breakpoints: hero van 420px → filterrij met de Instagram-regel ernaast → het raster van twaalf tegels met de afwijkende maten → twee reviewkaarten plus "Zelf zo'n set?" → CTA-band "Genieten van de perfecte nagels?" → footer.

De tegels komen uit de nieuwe collection `portfolio`: volgorde, tegelgrootte en de categorie waarop het filter straks selecteert.

## Verificatie

| Criterium | Bewijs |
|---|---|
| #1 Desktop komt overeen | Headless render op 1280px: hero 1248 × 420, h1 62px, chips 14px (actief) en 13px, kaartenrij van drie. Ook op 1920px gecontroleerd: geen overflow |
| #1 Mobiel komt overeen | Echte 390px-render: `clientWidth = scrollWidth = 390`, nul elementen buiten het viewport, hero 400px, h1 38px, raster twee kolommen op 150px |
| #1 Copy letterlijk | 35 van de 45 fragmenten uit de desktoprender teruggevonden. De tien die overblijven zijn de zes footerregels die de gedeelde `Footer` anders formatteert, plus vier bewuste afwijkingen (twee filterchips, twee relatieve reviewdatums) — zie hieronder |
| #2 Rastermaten | Gemeten per tegel: tegel 1 en 7 zijn 552 × 476 (2×2), tegel 4 en 10 zijn 552 × 230 (twee kolommen), de overige acht 268 × 230, rijhoogte 230, gap 16. Eén op één met het ontwerp |
| #3 Uit de portfolio-collection | `getCollection('portfolio')` leest `src/content/portfolio.yaml`; alle twaalf tegels dragen `data-category` in de gebouwde HTML (gellak 4 · nailart 5 · versteviging 3) |
| #4 Filterrij visueel correct | "Alles" actief in ink-900 met witte tekst op 14px, de overige chips in blush-100 met hairline op 13px, exact de vorm uit het ontwerp. De knoppen doen nog niets; filtering is TASK-9 |
| Contrast in de hero | Per glyph tegen de foto eronder: desktop 9,5 / 4,6 / 4,8 · mobiel 6,3 / 5,7 / 6,6 |

`astro check` 0 errors / 0 warnings / 0 hints, build schoon.

## Drie bewuste afwijkingen van het ontwerp

**De filterchips volgen uit de content.** De desktoprender toont zes chips, waaronder "Verlenging" en "French & babyboom" — categorieën die geen enkele foto heeft, dus twee knoppen die straks nul resultaten geven. PRD §5.3 schrijft voor dat de categorieën uit de content volgen, en de mobiele render van hetzelfde ontwerp toont precies de vier die daaruit komen.

**Eén tegel heeft een andere foto.** Het ontwerp zet IMG_8747 twee keer in hetzelfde raster. Op plek 9 staat nu de french met gele bloemetjes, een van de vijf sets die nog ongebruikt in de mediabibliotheek stonden.

**De relatieve datums bij de reviews zijn weg.** "· 7 maanden geleden" was relatief aan het moment waarop het ontwerp gemaakt werd en klopt op de dag van livegang niet meer. Namen en quotes staan er letterlijk; TASK-4 haalt de echte datums op.

## Voorbereid op TASK-9

De filterknoppen zijn al `<button>`s met `data-filter`, de tegels dragen `data-category`, en de rij zit in een container met `data-portfolio-filter`. Die taak hoeft alleen het script toe te voegen en de rij te verbergen zonder JavaScript (TASK-9 AC #3).

`PhotoFrame` geeft daarvoor nu overige attributen door aan het kader (`HTMLAttributes<'div'>` plus spread) — geen gedragsverandering voor bestaande aanroepen.

## Wat nog open staat

- De reviews staan als constanten in de pagina, net als op de home; TASK-8 verhuist ze naar een collection zodra TASK-4 de teksten met datum heeft.
- `src/data/images.ts` heeft ook een `category`-veld uit TASK-2. Dat zegt hetzelfde als de collection; TASK-8 beslist welke van de twee blijft. Er staat een waarschuwing in `portfolio.yaml`.
- Van de vier pagina's tot nu toe heeft deze hero het krapste contrast (h1 4,6 desktop). Meenemen in de audit (TASK-15).
<!-- SECTION:FINAL_SUMMARY:END -->
