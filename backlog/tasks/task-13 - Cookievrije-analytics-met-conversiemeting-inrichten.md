---
id: TASK-13
title: Cookievrije analytics met conversiemeting inrichten
status: To Do
assignee: []
created_date: '2026-08-08 09:43'
updated_date: '2026-08-09 17:24'
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
De huidige site draait Google Tag Manager en Google Analytics, met bijbehorende cookiebanner. Die verdwijnen allemaal. Wat ervoor in de plaats komt, mag niets op het apparaat van de bezoeker plaatsen of uitlezen — dat is de hele reden dat er geen banner meer nodig is.

Vercel Web Analytics is geverifieerd cookievrij: bezoekers worden herkend via een hash die server-side uit de inkomende request wordt afgeleid, één dag geldig, daarna gereset. Er wordt niets opgeslagen op het apparaat en bezoekers zijn niet te volgen tussen dagen of tussen sites.

Het belangrijkste onderdeel is niet het paginaverkeer maar de conversie: de doorklik naar Salonized moet als custom event gemeten worden. Zonder die meting weten we na livegang niet of het nieuwe ontwerp iets heeft opgeleverd — en zichtbaarheid zonder afspraken is geen resultaat.

Let ook op de referrers. Verkeer uit AI-bronnen is deels herkenbaar aan hosts als chatgpt.com en perplexity.ai. Dat getal is een ondergrens, geen totaal: een deel van de bezoekers krijgt naam en adres uit een AI-antwoord en typt die daarna zelf in Google. Dat is niet toe te rekenen, en daar moet niemand later van schrikken.

Google Search Console moet vóór livegang gekoppeld zijn aan het nieuwe domein-eigendom, zodat de indexering na de migratie te volgen is.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Vercel Web Analytics is actief op de productiesite
- [ ] #2 De site zet aantoonbaar geen enkele cookie en schrijft niets naar localStorage — geverifieerd in de browser-devtools
- [ ] #3 Er is geen cookiebanner en geen CMP-script aanwezig
- [ ] #4 De doorklik naar Salonized wordt als custom event gemeten en is zichtbaar in het dashboard
- [ ] #5 Google Search Console is gekoppeld en geverifieerd vóór livegang
- [ ] #6 Er is geen Google Tag Manager of Google Analytics op de nieuwe site
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
<!-- COMMENTS:END -->
