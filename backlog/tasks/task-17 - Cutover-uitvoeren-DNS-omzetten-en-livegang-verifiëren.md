---
id: TASK-17
title: 'Cutover uitvoeren: DNS omzetten en livegang verifiëren'
status: To Do
assignee: []
created_date: '2026-08-08 09:44'
updated_date: '2026-10-04 06:30'
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

De volgorde is niet vrijblijvend. E-mail is het grootste risico: op het domein loopt `info@nailsbyvera.nl`. Omdat de hosting op Cloudflare draait (TASK-14), verhuizen de **nameservers** naar Cloudflare, en dat raakt de hele zone. Het gaat dus niet alleen om de A- en CNAME-records. Elk record dat in Cloudflare ontbreekt op het moment van omzetten, valt weg. De MX-records en de mailgerelateerde TXT-records (SPF, DKIM, DMARC) moeten exact overeenkomen met de vastgelegde uitgangssituatie uit TASK-5. Direct na de omzetting moet een testmail zowel verzonden als ontvangen worden. Niet aannemen dat het goed ging.

Stappen:
1. Controleer dat de DNS-zone is vastgelegd en dat de back-up van de oude site bestaat (TASK-5).
2. Zet de zone vooraf compleet op in Cloudflare. Neem alle records over uit de nulmeting en zet mailrecords op "DNS only" (grijze wolk). Vergelijk record voor record met de export.
3. Verlaag bij de huidige DNS-host vooraf de TTL's, als dat kan.
4. Wijzig de nameservers bij de registrar naar die van Cloudflare.
5. Koppel het custom domain aan het Worker-project en activeer de Redirect Rule tussen www en apex.
6. Verifieer de e-mail met een testmail heen en terug.
7. Controleer alle zes de pagina's op het live domein, plus de redirect van /over-de-salon/.
8. Controleer dat er geen cookies gezet worden.
9. Dien de nieuwe sitemap in bij Google Search Console.

De oude WordPress-hosting wordt op dit moment nog niet opgezegd. Dat gebeurt pas na de nazorgperiode.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 De site is live op nailsbyvera.nl vanaf Cloudflare
- [ ] #2 De DNS-zone in Cloudflare is vóór de nameserverwissel record voor record vergeleken met de export uit TASK-5
- [ ] #3 Een testmail naar info@nailsbyvera.nl is verzonden én ontvangen na de DNS-wijziging
- [ ] #4 De MX-, SPF-, DKIM- en DMARC-records zijn aantoonbaar ongewijzigd ten opzichte van de vastgelegde uitgangssituatie
- [ ] #5 Alle zes pagina's laden correct op het live domein met behoud van trailing slash
- [ ] #6 De redirect /over-de-salon/ naar /over-mij/ werkt op productie
- [ ] #7 De site zet geen cookies, geverifieerd op het live domein
- [ ] #8 De nieuwe sitemap is ingediend in Google Search Console
- [ ] #9 De WordPress-hosting is nog niet opgezegd
<!-- AC:END -->
