---
id: TASK-3
title: Nulmeting van de huidige site vastleggen vóór de cutover
status: To Do
assignee: []
created_date: '2026-08-08 08:37'
labels:
  - meten
  - geo
  - tijdgebonden
  - blokkeert-cutover
milestone: m-0
dependencies: []
documentation:
  - docs/nulmeting.md
  - docs/PRD.md
priority: high
type: task
ordinal: 3000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
TIJDGEBONDEN: dit kan alleen zolang de Google Analytics-koppeling met WordPress nog bestaat. Zodra de oude site eruit gaat, is die data onherroepelijk weg. Deze taak hoeft niet te wachten op de bouw en kan direct opgepakt worden.

Waarom dit ertoe doet: er komen aantoonbaar al klanten binnen die de salon via ChatGPT hebben gevonden. Zonder nulmeting kunnen we na livegang niet vaststellen of dat kanaal intact is gebleven, en zouden we een terugval pas maanden later merken — als we hem al zouden merken.

De volledige, invulbare meetlijst staat klaar in docs/nulmeting.md en bestaat uit vijf onderdelen: GA-cijfers inclusief AI-referrers, Search Console-exports, een handmatige AI-steekproef met vijf vaste vragen, de staat van het Google-bedrijfsprofiel, en de technische uitgangspositie.

Let bij onderdeel A3 (top-landingspagina's) specifiek op: als daar een blogpost of productpagina in voorkomt, klopt de aanname in de PRD (§7) niet dat die URL's nooit gebruikt zijn. Dan moet er alsnog een redirect voor komen en moet dat teruggekoppeld worden.

De AI-steekproef wordt drie keer uitgevoerd met exact dezelfde vragen: nu, 2 weken na livegang en 8 weken na livegang. Deze taak dekt alleen de eerste meting.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Onderdelen A tot en met E van docs/nulmeting.md zijn ingevuld en gecommit
- [ ] #2 Search Console-exports staan als CSV in docs/nulmeting-data/
- [ ] #3 De AI-steekproef is uitgevoerd in ChatGPT, Perplexity en Google AI Overviews, met per vraag vastgelegd of de salon genoemd wordt en of de feiten kloppen
- [ ] #4 De staat van het Google-bedrijfsprofiel is vastgelegd inclusief screenshot
- [ ] #5 Onverwacht verkeer op als 'vervallen' aangemerkte URL's is expliciet gecontroleerd en teruggekoppeld
<!-- AC:END -->
