---
id: TASK-13
title: >-
  Cookievrije analytics inrichten (Cloudflare Web Analytics, alleen
  paginaverkeer)
status: To Do
assignee: []
created_date: '2026-08-08 09:43'
updated_date: '2026-10-04 06:33'
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
De huidige site draait Google Tag Manager en Google Analytics, met de bijbehorende cookiebanner. Die verdwijnen allemaal. Wat ervoor in de plaats komt, mag niets op het apparaat van de bezoeker plaatsen of uitlezen. Dat is de hele reden dat er geen banner meer nodig is.

**Keuze: Cloudflare Web Analytics, alleen paginaverkeer** (besluit B12 in de PRD, 4 oktober 2026). Het past bij de hostingwissel naar Cloudflare (TASK-14) en is gratis. Een klein beacon-script meldt paginaweergaven. Er is geen cookie, geen localStorage en geen fingerprinting, en individuele bezoekers worden niet herkend. Verifieer dit bij de inrichting in de documentatie van Cloudflare, want de privacyverklaring leunt erop.

**Conversiemeting vervalt bewust.** Cloudflare Web Analytics ondersteunt geen custom events, en een aparte analytics-dienst is niet gekozen. De klik op `[data-booking-cta]` wordt dus niet gemeten. Afspraken worden in plaats daarvan gevolgd via het aantal online boekingen in Salonized, vóór en na livegang. Het uitgangspunt daarvoor staat in `docs/nulmeting.md` §A5.

**Inrichting:** voeg het beacon-snippet handmatig toe in de basislayout, alleen in productie, zodat preview-URL's de cijfers niet vervuilen. Gebruik niet de automatische injectie van Cloudflare. Dan staat het in de repo en is het reviewbaar.

**Referrers:** verkeer uit AI-bronnen is deels herkenbaar aan hosts als chatgpt.com en perplexity.ai. Dat getal is een ondergrens, geen totaal. Een deel van de bezoekers haalt naam en adres uit een AI-antwoord en typt die daarna zelf in Google. Dat is niet toe te rekenen, en daar moet niemand later van schrikken.

**Privacyverklaring:** `src/pages/privacy.astro` noemt nu Vercel en Vercel Web Analytics als verwerker en bezoekersteller. Die tekst moet naar Cloudflare. Omdat het inhoudelijke tekst is, moet Vera hem opnieuw vaststellen (R8).

Google Search Console moet vóór livegang gekoppeld zijn aan het nieuwe domein-eigendom, zodat de indexering na de migratie te volgen is. Met de zone op Cloudflare kan de verificatie via een DNS TXT-record.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Cloudflare Web Analytics is actief op de productiesite en toont paginaweergaven en referrers
- [ ] #2 Het beacon laadt alleen in productie, niet op preview-URL's of lokaal
- [ ] #3 De site zet aantoonbaar geen cookie en gebruikt geen opslag voor het volgen van bezoekers, geverifieerd in de browser-devtools. De localStorage-entry van de Salonized-widget na een expliciete boekhandeling valt daarbuiten (zie de comment over TASK-21)
- [ ] #4 Er is geen cookiebanner en geen CMP-script aanwezig
- [ ] #5 Er is geen Google Tag Manager of Google Analytics op de nieuwe site
- [ ] #6 De privacyverklaring noemt Cloudflare (hosting en statistieken) in plaats van Vercel, en de tekst is door Vera vastgesteld
- [ ] #7 Google Search Console is gekoppeld en geverifieerd vóór livegang
- [ ] #8 Het uitgangspunt voor online boekingen in Salonized is vastgelegd in docs/nulmeting.md §A5
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
<!-- COMMENTS:END -->
