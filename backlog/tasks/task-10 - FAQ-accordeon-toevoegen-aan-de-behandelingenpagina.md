---
id: TASK-10
title: FAQ-accordeon toevoegen aan de behandelingenpagina
status: To Do
assignee: []
created_date: '2026-08-08 09:42'
labels:
  - geo
  - content
  - toegankelijkheid
milestone: m-0
dependencies:
  - TASK-7.3
  - TASK-8
documentation:
  - docs/PRD.md
priority: high
type: feature
ordinal: 17000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Dit is de enige inhoudelijke uitbreiding op het handoff-ontwerp, en er is een concrete aanleiding voor: er komen aantoonbaar al klanten binnen die de salon via ChatGPT hebben gevonden. Letterlijk geformuleerde vraag-en-antwoordparen zijn precies wat een generatieve zoekmachine ophaalt en citeert. Noch de huidige site, noch het ontwerp bevat ze.

Plaatsing: onderaan `/behandelingen/`, in de stijl van het design system. Geen extra menu-item en geen aparte URL — de vraag ontstaat op die pagina.

Eén bouwkeuze is hier niet vrijblijvend: de accordeon wordt gebouwd op `<details>`/`<summary>`, zodat de antwoorden altijd in de HTML staan. Een crawler of AI-systeem dat geen JavaScript uitvoert moet de antwoorden gewoon kunnen lezen — anders vervalt het hele doel van deze sectie. Als bijvangst is het toetsenbordgedrag en de schermlezerondersteuning dan meteen goed.

De vragen en antwoorden komen uit task-4; zonder die input kan deze taak niet worden afgerond. Startset: duur per behandeling, hoe lang het blijft zitten, wat het ongeveer kost, voorbereiding, parkeren, de 7-dagen-garantie, en avond- of weekendafspraken.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 De FAQ staat onderaan /behandelingen/ en volgt de stijl van het design system
- [ ] #2 De accordeon werkt met JavaScript uitgeschakeld en alle antwoorden staan in de HTML-bron
- [ ] #3 De sectie is volledig toetsenbordbedienbaar en wordt correct aangekondigd door een schermlezer
- [ ] #4 FAQPage structured data staat op de pagina en valideert zonder fouten
- [ ] #5 Vragen en antwoorden komen uit de faq-collection, niet hardgecodeerd
- [ ] #6 Er is geen extra menu-item toegevoegd
<!-- AC:END -->
