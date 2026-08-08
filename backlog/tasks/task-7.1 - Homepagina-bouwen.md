---
id: TASK-7.1
title: Homepagina bouwen
status: To Do
assignee: []
created_date: '2026-08-08 08:39'
labels:
  - paginas
milestone: m-0
dependencies: []
documentation:
  - design_handoff_nailsbyvera/Editorial Frames.dc.html
parent_task_id: TASK-7
priority: high
type: feature
ordinal: 9000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
De belangrijkste pagina en meteen de zwaarste: hij dekt het merendeel van de componenten af, waardoor de rest daarna sneller gaat. Doel van de pagina is eerste indruk plus direct boeken.

Ontwerp: `design_handoff_nailsbyvera/Editorial Frames.dc.html`.

Opbouw desktop, van boven naar beneden:
- Hero met 16px blush-padding rondom een kaart van 720px hoog met radius 32px, full-bleed foto met verloop. Navigatie zweeft erbovenop als glasmorph-pill, titel linksonder, boekkaart rechtsonder.
- Titel "Nail care / is self care" in 86px display, tweede regel cursief.
- Bento-strip met drie kolommen: reviewkaart, "7 dagen" garantie, "1 op 1" privésalon.
- "Wat ik voor je doe": vier fotokaarten met titel, omschrijving, duur en prijs.
- Donkere stappenband met drie kolommen: Boek online, Kom langs, Geniet ervan.
- "Recent werk": vier-koloms raster, eerste tegel beslaat 2×2.
- "Hoi, ik ben Vera": foto links, kaart rechts met chips, koraal WhatsApp-kaart eronder.
- Footer met vier kolommen: logo en claim, menu, contact, openingstijden.

Mobiel: hero 520px, alles gestapeld op 12px gutter, servicekaarten in 2×2 met foto's van 96px en zonder bodytekst, en een sticky boekbalk onderaan.

De WhatsApp-kaart linkt naar wa.me met het salonnummer.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 De pagina komt op 1280px visueel overeen met de linkerrender van het ontwerp
- [ ] #2 De pagina komt op 390px visueel overeen met de rechterrender van het ontwerp
- [ ] #3 De hero-afbeelding is de LCP en laadt met hoge prioriteit
- [ ] #4 De boekkaart in de hero en de sticky mobiele balk lopen beide via de BookingButton-component
- [ ] #5 De WhatsApp-kaart opent een wa.me-link met het juiste nummer
- [ ] #6 De footer toont contactgegevens en openingstijden uit de centrale bron, niet hardgecodeerd
<!-- AC:END -->
