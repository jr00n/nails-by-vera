---
id: TASK-14
title: Vercel Pro inrichten met redirects en verwerkersovereenkomst
status: To Do
assignee: []
created_date: '2026-08-08 09:43'
labels:
  - hosting
  - cutover
  - privacy
milestone: m-0
dependencies:
  - TASK-1
documentation:
  - docs/PRD.md
priority: high
type: chore
ordinal: 21000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Hosting inrichten en de URL-afspraken vastleggen, zodat er bij de cutover niets meer bedacht hoeft te worden.

Hosting is Vercel Pro, 20 dollar per maand. Hobby is technisch identiek maar mag volgens de voorwaarden niet commercieel gebruikt worden, en dit is een site die klanten werft. Pro geeft daarnaast preview-URL's per pull request en cookievrije Web Analytics zonder extra dienst.

Bij het afsluiten hoort ook een verwerkersovereenkomst met Vercel; die is nodig omdat de site persoonsgegevens verwerkt, hoe minimaal ook.

Redirects: er is er precies één nodig. `/over-de-salon/` wordt `/over-mij/` als 301. Verder blijven alle URL's identiek. De ongeveer 55 URL's van blogposts, producten en shop-pagina's krijgen bewust geen redirectregel — zie de 404-taak voor de onderbouwing.

Trailing slashes moeten behouden blijven. WordPress gebruikt ze, en bestaande backlinks mogen niet op een redirect landen.

Ook regelen: www naar apex of andersom, aansluitend op de huidige canonical.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Het project draait op Vercel Pro en is gekoppeld aan de git-repository
- [ ] #2 Elke pull request krijgt automatisch een preview-URL en pushes naar main deployen naar productie
- [ ] #3 De redirect /over-de-salon/ naar /over-mij/ werkt als 301 en is geverifieerd op de preview-URL
- [ ] #4 Trailing slashes blijven behouden: /prijzen/ laadt direct, zonder tussenliggende redirect
- [ ] #5 www en apex wijzen naar elkaar conform de huidige canonical
- [ ] #6 Er zijn geen redirectregels aangemaakt voor blog-, product- of shop-URL's
- [ ] #7 De verwerkersovereenkomst met Vercel is geregeld
<!-- AC:END -->
