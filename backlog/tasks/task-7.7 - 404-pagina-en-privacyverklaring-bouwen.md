---
id: TASK-7.7
title: 404-pagina en privacyverklaring bouwen
status: To Do
assignee: []
created_date: '2026-08-08 08:57'
labels:
  - paginas
  - privacy
milestone: m-0
dependencies: []
documentation:
  - docs/PRD.md
parent_task_id: TASK-7
priority: medium
type: feature
ordinal: 15000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Twee kleine pagina's die geen ontwerp hebben in het handoff-pakket en afgeleid worden uit het design system.

De 404-pagina doet meer werk dan gebruikelijk. Er zijn ongeveer 55 URL's van de oude site die bewust géén redirect krijgen: 18 Engelstalige stock-blogposts, 36 WooCommerce-demoproducten en een lorem-ipsum-templatepagina. Die zijn nooit actief gebruikt, dus er worden geen redirectregels voor aangemaakt — dat zou de configuratie jarenlang ballast laten meedragen voor pagina's die nooit bestonden. De 404-pagina vangt de enkele bezoeker of bot die er nog langskomt, en moet dus een duidelijke weg terug bieden plus een boek-CTA.

De privacyverklaring is nodig omdat de site cookievrije statistieken bijhoudt via Vercel Web Analytics. Er komt geen cookiebanner — de site plaatst en leest niets op het apparaat van de bezoeker — maar het kortstondig verwerken van het IP-adres is wel een verwerking onder de AVG en hoort vermeld te worden. De verklaring benoemt: welke gegevens worden verwerkt, op welke grondslag (gerechtvaardigd belang), welke verwerkers er zijn (Vercel voor hosting en statistieken, Salonized voor boekingen), en hoe iemand contact opneemt.

De conceptteksten moeten door Vera worden vastgesteld; dat loopt via task-4.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 De 404-pagina staat in de huisstijl en biedt navigatie terug naar de hoofdpagina's plus een boek-CTA
- [ ] #2 De privacyverklaring is bereikbaar op /privacy/ en staat in de footer
- [ ] #3 De privacyverklaring benoemt de verwerkte gegevens, de grondslag en de verwerkers Vercel en Salonized
- [ ] #4 De privacyverklaring is niet geïndexeerd als noindex nódig blijkt, maar is standaard gewoon indexeerbaar
- [ ] #5 Beide pagina's zijn responsive en voldoen aan dezelfde toegankelijkheidseisen als de rest van de site
<!-- AC:END -->
