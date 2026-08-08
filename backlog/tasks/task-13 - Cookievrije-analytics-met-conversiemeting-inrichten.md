---
id: TASK-13
title: Cookievrije analytics met conversiemeting inrichten
status: To Do
assignee: []
created_date: '2026-08-08 09:43'
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
