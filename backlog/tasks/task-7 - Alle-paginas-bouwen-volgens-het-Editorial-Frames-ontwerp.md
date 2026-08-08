---
id: TASK-7
title: Alle pagina's bouwen volgens het Editorial Frames-ontwerp
status: To Do
assignee: []
created_date: '2026-08-08 08:39'
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
- [ ] #1 Alle subtaken zijn afgerond
- [ ] #2 Elke pagina heeft precies één h1 en een logische kopstructuur
- [ ] #3 Elke pagina heeft een eigen title en meta description, geen gedeeld sjabloon
- [ ] #4 Geen enkele pagina scrollt horizontaal op 390px breedte
- [ ] #5 Er is geen code uit support.js of image-slot.js in de productiebundel terechtgekomen
- [ ] #6 De copy komt letterlijk overeen met de handoff-bestanden
<!-- AC:END -->
