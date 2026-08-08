---
id: TASK-7.4
title: Pagina 'Prijzen' bouwen
status: To Do
assignee: []
created_date: '2026-08-08 08:40'
labels:
  - paginas
  - geo
milestone: m-0
dependencies: []
documentation:
  - design_handoff_nailsbyvera/Prijzen.dc.html
parent_task_id: TASK-7
priority: medium
type: feature
ordinal: 12000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Doel is de volledige tarieven tonen, zonder verrassingen. Naast bezoekers is dit ook de pagina waar AI-assistenten prijsvragen uit beantwoorden, dus de bedragen moeten als leesbare tekst in de HTML staan.

Ontwerp: `design_handoff_nailsbyvera/Prijzen.dc.html`.

Opbouw: hero van 420px. Vier prijskaarten in een 2×2-raster: Biab/Hard gel/Acrylgel, Nail art, Gellak, en Overige services. Elke regel heeft het label links (gewicht 300, 16px) en de prijs rechts (display 22px), gescheiden door een hairline-rand. Daaronder drie infokaarten. Afsluitend een CTA-band "Ook zo enthousiast?".

De prijzen komen uit de content collection, niet hardgecodeerd — een tariefwijziging moet één regel zijn.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 De pagina komt visueel overeen met beide renders van het ontwerp
- [ ] #2 Alle prijzen komen uit de prices-collection
- [ ] #3 Prijzen staan als platte tekst in de HTML, niet in een afbeelding
- [ ] #4 De CTA-band loopt via de BookingButton-component
<!-- AC:END -->
