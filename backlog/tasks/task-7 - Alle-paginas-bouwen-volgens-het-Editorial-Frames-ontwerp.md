---
id: TASK-7
title: Alle pagina's bouwen volgens het Editorial Frames-ontwerp
status: Done
assignee:
  - '@claude'
created_date: '2026-08-08 08:39'
updated_date: '2026-08-09 06:50'
labels:
  - paginas
  - ontwerp
milestone: m-0
dependencies:
  - TASK-6
documentation:
  - docs/PRD.md
  - design_handoff_nailsbyvera/README.md
priority: high
type: feature
ordinal: 7000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Overkoepelende taak voor de zes contentpagina's plus de 404-pagina en de privacyverklaring. De subtaken zijn per pagina opgesplitst omdat elke pagina zelfstandig te bouwen en te reviewen is, maar ze delen dezelfde layout, componenten en ontwerpregels — die staan hier één keer beschreven zodat ze niet in zeven beschrijvingen herhaald hoeven te worden.

Ontwerptrouw is high-fidelity. Kleuren, typografie, spacing, radii en copy zijn definitief; niets ervan is een suggestie. De copy is letterlijk overgenomen van de huidige site en mag niet herschreven worden.

Hoe de ontwerpbestanden gelezen moeten worden: elk `.dc.html`-bestand toont twee renders naast elkaar. Links is de desktopversie op een canvas van 1280px, rechts de mobiele versie op 390px. Dat zijn twee breakpoints van dezelfde pagina — geen twee verschillende pagina's. Dit is de meest gemaakte leesfout bij dit soort handoffs.

Breakpoints: vanaf 1024px de desktopversie, onder 768px de mobiele versie, daartussen twee kolommen voor de servicekaarten.

De prototypebestanden `support.js` en `image-slot.js` zijn runtime van de ontwerpomgeving en horen niet in productie. De `.dc.html`-bestanden zijn referentie, geen over te nemen productiecode.

Elke pagina heeft minstens één primaire boek-CTA die boven de vouw bereikbaar is, en die loopt via de centrale BookingButton-component.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Alle subtaken zijn afgerond
- [x] #2 Elke pagina heeft precies één h1 en een logische kopstructuur
- [x] #3 Elke pagina heeft een eigen title en meta description, geen gedeeld sjabloon
- [x] #4 Geen enkele pagina scrollt horizontaal op 390px breedte
- [x] #5 Er is geen code uit support.js of image-slot.js in de productiebundel terechtgekomen
- [x] #6 De copy komt letterlijk overeen met de handoff-bestanden
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## Alle acht de pagina's staan

Zes contentpagina's uit "Editorial Frames" plus de 404 en de privacyverklaring, elk in een eigen subtaak gebouwd en geverifieerd:

| Subtaak | Pagina |
|---|---|
| 7.1 | `/` — home |
| 7.2 | `/over-mij/` |
| 7.3 | `/behandelingen/` |
| 7.4 | `/prijzen/` |
| 7.5 | `/portfolio/` |
| 7.6 | `/contact/` |
| 7.7 | `/404.html` en `/privacy/` |

## Verificatie van de overkoepelende criteria

Gemeten over alle acht de gebouwde pagina's tegelijk, niet per pagina beredeneerd:

| Criterium | Bewijs |
|---|---|
| #1 Subtaken afgerond | Alle zeven staan op Done, elk met eigen verificatie in de subtaak |
| #2 Eén h1, logische kopstructuur | Precies één `<h1>` op elke pagina; de kopniveaus lopen op zonder een niveau over te slaan. Waar het ontwerp een sectie geen kop geeft, staat er een `sr-only` h2 in plaats van een gat |
| #3 Eigen title en description | Acht unieke titles en acht unieke descriptions op acht pagina's — geen gedeeld sjabloon |
| #4 Geen horizontale scroll op 390px | Elke pagina in een echte 390px-render: `clientWidth = scrollWidth = 390` en nul elementen die buiten het viewport steken |
| #5 Geen prototype-runtime in de bundel | `dist/` doorzocht op `support.js`, `image-slot`, `x-import`, `x-dc`, `DCLogic` en `component-from-global-scope`: geen enkel spoor in HTML, JS of CSS |
| #6 Copy letterlijk | Per pagina automatisch vergeleken met de desktoprender. Home, Over mij, Behandelingen, Prijzen en Contact komen volledig overeen op de footerregels na, die de gedeelde `Footer` anders formatteert. Portfolio wijkt op vier plekken bewust af (twee filterchips zonder foto's, twee relatieve reviewdatums); dat staat toegelicht in 7.5 |

`astro check` 0 errors / 0 warnings / 0 hints; de build levert negen pagina's (acht plus de stijlgids).

## Wat er onderweg is bijgekomen

- Drie content collections: `treatments`, `prices` en `portfolio`. Een prijswijziging is daarmee één regel in één YAML-bestand. TASK-8 zet `reviews` en `faq` ernaast zodra TASK-4 de content heeft.
- Een statische kaart uit OpenStreetMap-tegels op de contactpagina, zodat die pagina geen enkel extern verzoek doet en de site cookievrij blijft.
- Kleine uitbreidingen aan het design system: `--text-d28`, `sizeLg` op `SectionHeading`, `size` op `StatBlock`, `note` op `PriceGroup`, `quality` op `Photo`, attribuutdoorgifte op `PhotoFrame`, en een optioneel `bron`-veld in het beeldmanifest.

## Terugkerend patroon om mee te nemen naar de audit

Op alle vijf de pagina's met een fotohero was het verloop uit het ontwerp niet genoeg: die prototypes tonen op die plek een grijze placeholder, terwijl de echte foto's juist licht zijn waar de tekst staat. Elke hero heeft daarom extra scrims gekregen, per glyph nagemeten tegen de foto eronder. De krapste waarden staan op Contact (h1 4,3 desktop / 3,8 mobiel) en Portfolio (4,6 / 5,7) — ruim boven de 3:1 die voor grote tekst geldt, maar het is de moeite waard om bij TASK-15 met het blote oog te beoordelen, en te overwegen of die hero een eigen component wordt.

## Wat hierna nog aan deze pagina's gebeurt

TASK-9 (mobiele drawer, portfoliofilter, boekbalk), TASK-10 (FAQ onderaan Behandelingen), TASK-8 (teksten naar collections), TASK-12 (structured data en metadata) en TASK-15 (toegankelijkheids- en performanceaudit).
<!-- SECTION:FINAL_SUMMARY:END -->
