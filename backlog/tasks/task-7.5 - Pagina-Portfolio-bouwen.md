---
id: TASK-7.5
title: Pagina 'Portfolio' bouwen
status: To Do
assignee: []
created_date: '2026-08-08 08:53'
labels:
  - paginas
milestone: m-0
dependencies: []
documentation:
  - design_handoff_nailsbyvera/Portfolio.dc.html
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
- [ ] #1 De pagina komt visueel overeen met beide renders van het ontwerp
- [ ] #2 Het rastermet de afwijkende tegelgroottes klopt met het ontwerp
- [ ] #3 Afbeeldingen komen uit de portfolio-collection en hebben elk een category
- [ ] #4 De filterrij staat er visueel correct in; werkende filtering valt buiten deze taak
<!-- AC:END -->
