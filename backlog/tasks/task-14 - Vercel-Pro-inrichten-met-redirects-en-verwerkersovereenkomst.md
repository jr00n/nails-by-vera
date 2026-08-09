---
id: TASK-14
title: Vercel Pro inrichten met redirects en verwerkersovereenkomst
status: To Do
assignee: []
created_date: '2026-08-08 09:43'
updated_date: '2026-08-09 06:55'
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

## Comments

<!-- COMMENTS:BEGIN -->
author: @claude
created: 2026-08-09 06:54
---
**Zet Trailing Slash op 'Always' — anders is het 404-gedrag niet deterministisch.**

Gemeten tijdens TASK-7.7, op zowel `astro dev` als `astro preview`:

| URL | status | eigen 404-pagina |
|---|---|---|
| `/onbekend/` | 404 | ja |
| `/onbekend` | 404 | nee — Astro's diagnosepagina '404: Not Found (trailingSlash is set to "always")' |

Die diagnosepagina komt van de Astro-server en zit niet in de build: `dist/` bevat alleen onze eigen `404.html`. Lokaal is het dus geen bug, maar het laat wel zien dat een pad zónder slash bijzondere afhandeling nodig heeft, en dat is op Vercel een instelling.

Concreet voor deze taak: zet **Trailing Slash = Always** in de projectinstellingen, of leg het vast in `vercel.json` met `"trailingSlash": true` (vastleggen in de repo heeft de voorkeur, dan reist het mee met een nieuw project). Daarmee wordt `/onbekend` naar `/onbekend/` geleid en serveert Vercel `404.html` voor onbekende paden.

Controleren op de preview-URL vóór de cutover, met minimaal deze vier gevallen: `/onbekend`, `/onbekend/`, een bestaande pagina zónder slash (`/prijzen`) en een van de oude WordPress-URL's die bewust geen redirect krijgt.
---

author: @claude
created: 2026-08-09 06:55
---
`vercel.json` is aangemaakt met `"trailingSlash": true` (plus het `$schema`-veld voor autocompletion in de editor). Daarmee staat de instelling in de repo in plaats van in een projectinstelling die je bij een nieuw project opnieuw moet zetten.

Wat er béwust nóg niet in staat, want dat hoort bij deze taak zelf:
- de 301 van `/over-de-salon/` naar `/over-mij/` (AC #3);
- de keuze www of apex (AC #5).

Beide kunnen in hetzelfde bestand onder `redirects`. Verificatie op de preview-URL blijft staan zoals in de vorige comment beschreven — lokaal is `trailingSlash` in `vercel.json` niet te testen, want `astro preview` leest dat bestand niet.
---
<!-- COMMENTS:END -->
