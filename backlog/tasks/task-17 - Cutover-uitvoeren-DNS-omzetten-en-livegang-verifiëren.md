---
id: TASK-17
title: 'Cutover uitvoeren: DNS omzetten en livegang verifiëren'
status: To Do
assignee: []
created_date: '2026-08-08 09:44'
labels:
  - cutover
  - risico
milestone: m-0
dependencies:
  - TASK-2
  - TASK-3
  - TASK-5
  - TASK-13
  - TASK-14
  - TASK-16
documentation:
  - docs/PRD.md
priority: high
type: task
ordinal: 24000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Het moment zelf. Alle voorbereiding staat in andere taken; deze taak voert uit en verifieert.

De volgorde is niet vrijblijvend. E-mail is het grootste risico: op het domein loopt `info@nailsbyvera.nl`, en bij het omzetten mogen alleen de A- en CNAME-records wijzigen. De MX-records blijven ongemoeid. Direct na de omzetting moet een testmail zowel verzonden als ontvangen worden — niet aannemen dat het goed ging.

Stappen:
1. Controleer dat de DNS-zone is vastgelegd en de back-up van de oude site bestaat (task-5)
2. Zet de A- en CNAME-records om naar Vercel; laat MX ongewijzigd
3. Verifieer de e-mail met een testmail heen en terug
4. Controleer alle zes de pagina's op het live domein, plus de redirect van /over-de-salon/
5. Controleer dat er geen cookies gezet worden
6. Dien de nieuwe sitemap in bij Google Search Console

De oude WordPress-hosting wordt op dit moment nog niet opgezegd. Dat gebeurt pas na de nazorgperiode.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 De site is live op nailsbyvera.nl vanaf Vercel
- [ ] #2 Een testmail naar info@nailsbyvera.nl is verzonden én ontvangen na de DNS-wijziging
- [ ] #3 De MX-records zijn aantoonbaar ongewijzigd ten opzichte van de vastgelegde uitgangssituatie
- [ ] #4 Alle zes pagina's laden correct op het live domein met behoud van trailing slash
- [ ] #5 De redirect /over-de-salon/ naar /over-mij/ werkt op productie
- [ ] #6 De site zet geen cookies, geverifieerd op het live domein
- [ ] #7 De nieuwe sitemap is ingediend in Google Search Console
- [ ] #8 De WordPress-hosting is nog niet opgezegd
<!-- AC:END -->
