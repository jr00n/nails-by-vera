---
id: TASK-13
title: 'Cookievrije analytics inrichten (Vercel Web Analytics, alleen paginaverkeer)'
status: Done
assignee: []
created_date: '2026-08-08 09:43'
updated_date: '2026-11-13 16:12'
labels:
  - meten
  - privacy
milestone: m-0
dependencies:
  - TASK-7
documentation:
  - docs/PRD.md
priority: high
type: feature
ordinal: 20000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
De oude site draaide Google Tag Manager en Google Analytics, met de bijbehorende cookiebanner. Die verdwijnen allemaal. Wat ervoor in de plaats komt, mag niets op het apparaat van de bezoeker plaatsen of uitlezen. Dat is de hele reden dat er geen banner nodig is.

**Keuze: Vercel Web Analytics, alleen paginaverkeer** (besluit van Jeroen, 13 november 2026; vervangt het eerdere besluit voor Cloudflare Web Analytics van 4 oktober 2026). De site draait op Vercel, dus het is één regel code en er is geen aparte dienst of DNS-wijziging nodig. Het script meldt paginaweergaven zonder cookie en zonder individuele bezoekers te herkennen.

**Conversiemeting vervalt bewust.** Er worden geen custom events gemeten. Afspraken worden gevolgd via het aantal online boekingen in Salonized, voor en na livegang (uitgangspunt in `docs/nulmeting.md` §A5).

**Inrichting:** de `Analytics`-component uit `@vercel/analytics/astro` staat in `src/layouts/Base.astro` en laadt niet op noindex-pagina's. Preview-deployments worden door Vercel apart als omgeving geregistreerd en zijn in het dashboard te filteren.

**Referrers:** verkeer uit AI-bronnen is deels herkenbaar aan hosts als chatgpt.com en perplexity.ai. Dat getal is een ondergrens, geen totaal. Een deel van de bezoekers haalt naam en adres uit een AI-antwoord en typt die daarna zelf in Google.

**Privacyverklaring:** `src/pages/privacy.astro` noemt Vercel Web Analytics al als bezoekersteller, dus die tekst klopt nu met de code.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Vercel Web Analytics is actief op de productiesite en toont paginaweergaven (geverifieerd 2026-11-13: 1 bezoeker, 4 pageviews)
- [x] #2 De productiesite stuurt geen Set-Cookie-header (gecontroleerd op nailsbyvera.nl)
- [x] #3 Er is geen cookiebanner, geen CMP-script, geen Google Tag Manager en geen Google Analytics in de code
- [x] #4 De privacyverklaring noemt Vercel Web Analytics als bezoekersteller
- [x] #5 Google Search Console is gekoppeld als Domein-property met Vera als eigenaar en de sitemap is ingediend
<!-- AC:END -->

## Comments

<!-- COMMENTS:BEGIN -->
author: claude
created: 2026-08-09 17:24
---
Twee criteria van deze taak raken aan TASK-21, waarin de Salonized-boekwidget op de site komt. Gemeten gedrag van die widget (Playwright, 2026-08-09):

- **AC #2 klopt straks niet meer letterlijk.** De widget zet géén cookies — niet bij het laden en niet bij het openen van het formulier — maar hij schrijft wél `localStorage.bookingUserDetails` zodra iemand het boekformulier gebruikt. Dat is functionele opslag na een expliciete handeling van de bezoeker, geen tracking, en het is geen grond voor een cookiebanner. Maar "schrijft niets naar localStorage" is dan niet meer waar te maken. Dit criterium moet herschreven worden naar wat het echt wil bewaken: geen opslag voor het volgen van bezoekers, en geen opslag zonder dat de bezoeker er zelf om vraagt. De privacyverklaring moet het benoemen.
- **AC #4 meet straks iets anders.** "De doorklik naar Salonized" is nu een navigatie naar een nieuw tabblad. Met de widget openen de boek-CTA's het formulier in een overlay op de site zelf, dus er valt geen doorklik meer te meten — het custom event moet aan de klik op `[data-booking-cta]` hangen, niet aan het verlaten van de pagina. Dat attribuut staat al op elke boekknop via `BookingButton`.

Verder: de widget laadt twee requests van samen ~14,7 kB, uitsluitend van `*.salonized.com`, en brengt geen derde partijen mee. Voor AC #6 en de cookievrije opzet verandert er dus niets.
---

created: 2026-10-04 06:33
---
**Scope gewijzigd (2026-10-04, besluit van Jeroen):** Vercel Web Analytics is vervangen door Cloudflare Web Analytics, en de conversiemeting vervalt.

De oude AC #4 (doorklik naar Salonized als custom event) is geschrapt. De opmerking in de vorige comment over `[data-booking-cta]` is daarmee niet meer van toepassing.

De localStorage-nuance uit die comment is wel verwerkt in de nieuwe AC over opslag.
---

created: 2026-11-13 16:12
---
Omgezet van Cloudflare naar Vercel en afgesloten op 2026-11-13 (commit 638da5e). Vervolgpunten die buiten deze taak vallen: Vera moet de bijgewerkte privacyverklaring nog vaststellen (R8), de localStorage-opslag door de Salonized-widget na een boekhandeling is niet in de browser-devtools nagelopen, en het Salonized-uitgangspunt in docs/nulmeting.md §A5 is niet opnieuw gecontroleerd. De Search Console-koppeling is door Jeroen gemeld als gedaan en is niet door Claude geverifieerd.
---
<!-- COMMENTS:END -->
