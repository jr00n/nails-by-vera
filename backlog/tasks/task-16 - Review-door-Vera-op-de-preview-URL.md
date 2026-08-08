---
id: TASK-16
title: Review door Vera op de preview-URL
status: To Do
assignee: []
created_date: '2026-08-08 09:43'
labels:
  - kwaliteit
  - review
milestone: m-0
dependencies:
  - TASK-15
documentation:
  - docs/PRD.md
priority: high
type: task
ordinal: 23000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Laatste inhoudelijke poort vóór de cutover. Het gaat er niet om of de site technisch werkt — dat is elders afgedekt — maar of Vera zichzelf en haar salon erin herkent.

Belangrijk: de review gebeurt op haar eigen telefoon, niet alleen in de browser-devtools van de ontwikkelaar. Een gesimuleerd 390px-venster is geen echte telefoon; verschillen in fontrendering, tapdoelen, scrollgedrag en de sticky boekbalk komen pas op een echt toestel naar boven. Dit staat als risico in de PRD.

Te controleren met haar:
- Kloppen alle prijzen, behandelingen en behandelduren?
- Kloppen de openingstijden, het adres en het telefoonnummer?
- Zijn de foto's de juiste, en staat er niets bij dat ze liever niet toont?
- Klopt de toon van de teksten?
- Werkt de boekknop naar Salonized zoals verwacht, vanaf haar telefoon?

Feedback wordt verwerkt vóór livegang, niet erna.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Vera heeft alle pagina's bekeken op haar eigen telefoon en op desktop
- [ ] #2 Prijzen, behandelduren, openingstijden, adres en telefoonnummer zijn door haar geverifieerd
- [ ] #3 Zij heeft de boekknop vanaf haar telefoon getest en die komt correct uit bij Salonized
- [ ] #4 Alle feedback is verwerkt of expliciet als 'later' geparkeerd met haar instemming
- [ ] #5 Zij heeft akkoord gegeven op livegang
<!-- AC:END -->
