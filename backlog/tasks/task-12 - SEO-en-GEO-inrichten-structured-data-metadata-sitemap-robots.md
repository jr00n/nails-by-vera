---
id: TASK-12
title: 'SEO en GEO inrichten: structured data, metadata, sitemap, robots'
status: To Do
assignee: []
created_date: '2026-08-08 09:42'
labels:
  - seo
  - geo
milestone: m-0
dependencies:
  - TASK-7
  - TASK-8
documentation:
  - docs/PRD.md
priority: high
type: feature
ordinal: 19000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Twee doelen die grotendeels dezelfde ingrepen delen: gevonden worden in Google, en correct beschreven worden door generatieve zoekmachines.

Lokale SEO is voor deze salon het zwaartepunt. Vrijwel al het relevante verkeer komt uit lokale zoekopdrachten en de kaartweergave. Daarbij hoort een ongemakkelijke waarheid die de uitvoerder moet kennen: het Google-bedrijfsprofiel weegt voor dit type bedrijf zwaarder dan de website zelf. De site ondersteunt dat profiel, hij vervangt het niet.

Op de site in te richten:
- LocalBusiness/NailSalon structured data met naam, volledig gestructureerd adres, geo-coördinaten, telefoon, openingstijden, url, image, priceRange en sameAs voor Instagram, Facebook en het Google-profiel.
- NAP-consistentie: naam, adres en telefoonnummer exact identiek geschreven op de site, in de structured data en op het bedrijfsprofiel. Een verschil tussen "06-36079000" en "+31 6 36079000" verzwakt het signaal aantoonbaar.
- Per pagina een eigen title en meta description, plus Open Graph-tags.
- Plaatsnaam natuurlijk in titels en koppen waar het past, zonder de warme toon van het ontwerp te verpesten. Geen keyword stuffing.
- Sitemap via @astrojs/sitemap, met /blog/ uitgesloten zolang die leeg is.

Voor GEO: AI-crawlers worden bewust toegestaan in robots.txt — GPTBot, ClaudeBot, PerplexityBot, Google-Extended en vergelijkbare user-agents worden niet geblokkeerd. Voor een salon die klanten zoekt is opgenomen worden in AI-antwoorden een kans, geen bedreiging; er is geen te beschermen content. Dit is een keuze, geen standaardinstelling.

Er komt ook een llms.txt. Wees daar realistisch over: dat is een voorgestelde standaard die door geen enkele grote aanbieder aantoonbaar wordt gebruikt. Het kost tien minuten en kan geen kwaad, maar verwacht er geen meetbaar effect van.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 LocalBusiness/NailSalon structured data staat op de site en valideert zonder fouten in de Rich Results Test
- [ ] #2 Adres, telefoonnummer en openingstijden in de structured data zijn identiek aan de zichtbare tekst op de site
- [ ] #3 Elke pagina heeft een eigen title, meta description en Open Graph-tags
- [ ] #4 sitemap.xml wordt gegenereerd en bevat alle publieke pagina's, met /blog/ uitgesloten zolang die leeg is
- [ ] #5 robots.txt blokkeert GPTBot, ClaudeBot, PerplexityBot en Google-Extended niet
- [ ] #6 llms.txt is aanwezig
- [ ] #7 Alle feiten die een bezoeker of AI zou opvragen — adres, openingstijden, prijzen, behandelduur — staan als platte tekst in de HTML, niet achter JavaScript of in een afbeelding
<!-- AC:END -->
