---
id: TASK-14
title: Cloudflare inrichten met redirects en verwerkersovereenkomst
status: To Do
assignee: []
created_date: '2026-08-08 09:43'
updated_date: '2026-10-04 06:30'
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

Hosting is **Cloudflare op het gratis plan**, met Workers static assets. Eerder stond hier Vercel Pro ($20/mnd). Dat was nodig omdat Vercel Hobby niet commercieel gebruikt mag worden. Deze site is volledig statisch (`output: 'static'`, geen adapter), en het gratis plan van Cloudflare staat commercieel gebruik toe, met onbeperkte bandbreedte, onbeperkte statische requests en onbeperkte preview-deploys. Cloudflare stuurt nieuwe projecten richting Workers in plaats van Pages. Voor statische bestanden zijn beide gratis.

Bij het afsluiten hoort ook een verwerkersovereenkomst, want de site verwerkt persoonsgegevens, hoe minimaal ook. De DPA van Cloudflare lijkt standaard in de self-serve-voorwaarden te zitten. Verifieer dat en leg vast waar hij staat.

**Wat er in de repo verandert:**
- `vercel.json` vervalt.
- `wrangler.jsonc` komt erbij, met `assets.directory: "./dist"`, `html_handling: "auto-trailing-slash"` en `not_found_handling: "404-page"`.
- `public/_redirects` komt erbij, met de 301.
- `astro.config.mjs` blijft ongewijzigd: `trailingSlash: 'always'` en `output: 'static'` blijven staan.

**Redirects:** er is er precies één nodig. `/over-de-salon/` wordt `/over-mij/` als 301, in `public/_redirects`. Neem ook de variant zonder slash mee (`/over-de-salon`). Verder blijven alle URL's identiek. De ongeveer 55 URL's van blogposts, producten en shop-pagina's krijgen bewust geen redirectregel; zie de 404-taak voor de onderbouwing.

Trailing slashes moeten behouden blijven. WordPress gebruikt ze, en bestaande backlinks mogen niet op een redirect landen.

**www en apex:** `_redirects` matcht alleen op pad en niet op host. De doorverwijzing tussen www en apex gaat daarom via een Cloudflare Redirect Rule op de zone, aansluitend op de huidige canonical (`https://nailsbyvera.nl`).

**Gevolg voor de cutover (TASK-17):** een custom domain op het apex-domein vereist dat de DNS-zone op Cloudflare staat. De nameservers verhuizen dus naar Cloudflare. Dat is ingrijpender dan alleen A- en CNAME-records omzetten. Alle records uit de nulmeting van TASK-5 (MX, SPF, DKIM, DMARC, overige TXT) moeten vóór de omzetting in Cloudflare staan. De zone kan in Cloudflare volledig worden voorbereid voordat de nameservers wisselen.

**Gevolg voor analytics (TASK-13):** Cloudflare Web Analytics is gratis en cookievrij, maar ondersteunt voor zover bekend geen custom events. De conversiemeting op `[data-booking-cta]` kan daar dus niet in. Daarover moet in TASK-13 een keuze worden gemaakt.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Het project draait op Cloudflare (gratis plan, Workers static assets) en is gekoppeld aan de git-repository
- [ ] #2 Elke pull request krijgt automatisch een preview-URL en pushes naar main deployen naar productie
- [ ] #3 De redirect /over-de-salon/ (en /over-de-salon) naar /over-mij/ werkt als 301 via public/_redirects en is geverifieerd op de preview-URL
- [ ] #4 Trailing slashes blijven behouden: /prijzen/ laadt direct zonder tussenliggende redirect; /prijzen gaat naar /prijzen/
- [ ] #5 Onbekende paden (/onbekend en /onbekend/) geven status 404 met de eigen 404.html, geverifieerd op de preview-URL, net als een oude WordPress-URL zonder redirect
- [ ] #6 www en apex wijzen naar elkaar conform de huidige canonical, via een Cloudflare Redirect Rule
- [ ] #7 Er zijn geen redirectregels aangemaakt voor blog-, product- of shop-URL's
- [ ] #8 vercel.json is verwijderd en de hostingconfiguratie staat in wrangler.jsonc in de repo
- [ ] #9 De verwerkersovereenkomst met Cloudflare is geverifieerd en vastgelegd
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

created: 2026-10-04 06:30
---
**Hostingkeuze gewijzigd: Cloudflare in plaats van Vercel Pro** (2026-10-04, op verzoek van Jeroen).

De reden is de prijs: $20 per maand voor een volledig statische site, terwijl het gratis plan van Cloudflare commercieel gebruik toestaat.

De eerdere comments over `vercel.json` met `"trailingSlash": true` zijn daarmee vervallen. Het testprotocol daaruit blijft wel staan en is overgenomen in de AC's: `/onbekend`, `/onbekend/`, `/prijzen` en een oude WordPress-URL controleren op de preview-URL.

Nog bij te werken buiten deze taak:
- TASK-17: nameserververhuizing in plaats van alleen A- en CNAME-records omzetten.
- TASK-13: analytics-keuze, want custom events voor conversie zitten niet in Cloudflare Web Analytics.
- PRD §6.1, §6.4, B4, R8 en R9: Vercel vervangen door Cloudflare.
---
<!-- COMMENTS:END -->
