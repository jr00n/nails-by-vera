---
id: TASK-19
title: 'Nazorg: monitoren en pas daarna WordPress opzeggen'
status: To Do
assignee: []
created_date: '2026-08-08 09:44'
labels:
  - nazorg
  - meten
milestone: m-0
dependencies:
  - TASK-17
documentation:
  - docs/nulmeting.md
  - docs/PRD.md
priority: medium
type: task
ordinal: 26000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Het project is niet af bij livegang. Deze taak bewaakt twee weken lang of de migratie daadwerkelijk zonder verlies is verlopen, en sluit pas daarna de oude omgeving af.

De volgorde is bewust: de WordPress-hosting wordt pas opgezegd na twee weken stabiel draaien. Zolang die nog staat, is terugvallen mogelijk. Voorwaarde is wel dat de assets binnen zijn (task-2) en de back-up gemaakt is (task-5) — zonder die twee is opzeggen onomkeerbaar verlies.

Te monitoren:
- 404's op het live domein. Duikt er een oude URL op met echt verkeer, dan klopte de aanname niet dat hij nooit gebruikt is en komt er alsnog een gerichte 301.
- Search Console: indexering en posities op lokale termen.
- E-mail op het domein blijft werken.
- Referrers uit AI-bronnen, af te zetten tegen de nulmeting.

De AI-steekproef uit docs/nulmeting.md wordt herhaald op 2 en 8 weken na livegang, met exact dezelfde vijf vragen en een uitgelogd gesprek. Een AI-antwoord met verkeerde openingstijden kost een klant zonder dat dat ooit in de statistieken zichtbaar wordt — daarom wordt hier op feitelijke juistheid gelet, niet alleen op aanwezigheid.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Twee weken lang zijn 404's, Search Console en e-mail gemonitord zonder onopgeloste problemen
- [ ] #2 De AI-steekproef is herhaald op 2 en 8 weken en de uitkomsten staan naast de nulmeting
- [ ] #3 AI-referrers liggen minimaal op het niveau van de nulmeting, of een afwijking is verklaard
- [ ] #4 Onverwacht verkeer op vervallen URL's is afgehandeld met een gerichte redirect waar nodig
- [ ] #5 De back-up van de oude site is geverifieerd aanwezig
- [ ] #6 De WordPress-hosting is opgezegd
- [ ] #7 Het PRD is bijgewerkt met de daadwerkelijke uitkomsten tegenover de acceptatiecriteria
<!-- AC:END -->
