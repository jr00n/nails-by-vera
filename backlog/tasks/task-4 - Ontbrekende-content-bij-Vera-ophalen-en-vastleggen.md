---
id: TASK-4
title: Ontbrekende content bij Vera ophalen en vastleggen
status: To Do
assignee: []
created_date: '2026-08-08 08:38'
updated_date: '2026-08-09 16:17'
labels:
  - content
  - blokkerend
milestone: m-0
dependencies: []
documentation:
  - docs/PRD.md
priority: high
type: task
ordinal: 4000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Een aantal onderdelen van de site kan niet gebouwd worden zonder feiten die alleen Vera heeft. Deze taak verzamelt ze in één keer, zodat de bouwtaken niet los van elkaar op haar hoeven te wachten.

Op te halen:

1. FAQ-antwoorden — blokkerend voor de FAQ-sectie. Benodigd: hoe lang een afspraak duurt per behandeling (in minuten), hoe lang het werk blijft zitten, wat de 7-dagen-garantie precies dekt, of er voorbereiding nodig is, waar klanten kunnen parkeren, en of er avond- of weekendafspraken mogelijk zijn. De huidige site vermeldt nergens een behandelduur, terwijl "hoe lang duurt gellak" een van de meest gestelde vragen is — en precies wat een AI-antwoord nodig heeft.

2. Reviewteksten — blokkerend voor de reviewkaarten. Overnemen van de huidige site en het Google-bedrijfsprofiel: auteur, score, tekst, datum.

3. Bevestiging over de vervallende content — de 18 blogposts en 36 WooCommerce-producten zijn thema-demo-content en gaan eruit zonder redirect. Dit is inhoudelijk onderbouwd, maar het is haar site: één keer expliciet laten bevestigen vóór de oude installatie uit de lucht gaat.

4. Akkoord op de privacyverklaring — de tekst moet benoemen welke gegevens worden verwerkt, op welke grondslag, en welke verwerkers er zijn (Vercel, Salonized).

5. De postcode van de salon — blokkerend voor de `PostalAddress` in de structured data (TASK-12). Staat niet in het handoff-pakket en ontbreekt daardoor in `src/data/site.ts`. Zonder postcode is het lokale zoeksignaal onvolledig, en die schrijfwijze moet één op één gelijk zijn aan die op het Google-bedrijfsprofiel (PRD §8.3).

6. De exacte Facebook-URL — het handoff-pakket noemt wel een Facebook-link op de contactpagina, maar niet het adres. `src/data/site.ts` heeft daarvoor een leeg veld staan. Als ze geen actieve Facebook-pagina meer heeft, is "vervalt" ook een antwoord; dan gaat de link eruit in plaats van dat hij leeg blijft staan.

Punt 5 en 6 hebben allebei een TODO in `src/data/site.ts` die naar deze taak verwijst.

Vervallen: het oorspronkelijke punt 5, een liggende hero-foto van Vera. Het herziene ontwerp van `/over-mij/` heeft die niet meer nodig — zie TASK-20 en de opmerking hieronder.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 FAQ-vragen en -antwoorden zijn schriftelijk vastgelegd, inclusief behandelduur in minuten per behandeling
- [ ] #2 Reviewteksten zijn verzameld met auteur, score, tekst en datum
- [ ] #3 Vera heeft expliciet bevestigd dat de blogposts en WooCommerce-producten mogen vervallen
- [ ] #4 Vera heeft de conceptprivacyverklaring gelezen en akkoord gegeven
- [ ] #5 Alle verzamelde content staat in de repository, klaar om in content collections te zetten
- [ ] #6 De postcode van De Genestetstraat 41 is bekend en staat in src/data/site.ts, in dezelfde schrijfwijze als op het Google-bedrijfsprofiel
- [ ] #7 De Facebook-URL staat in src/data/site.ts, of er is vastgelegd dat de Facebook-link vervalt
<!-- AC:END -->

## Comments

<!-- COMMENTS:BEGIN -->
author: @claude
created: 2026-08-09 06:29
---
Bij het bouwen van de contactpagina (TASK-7.6) gaf Nominatim voor 'De Genestetstraat 41, Hengelo' deze postcode terug: **7552 WK** (bijbehorende coördinaten 52.2646111, 6.8235258, wijk Groot Driene).

Dat is punt 6 van deze taak. Bewust **niet** ingevuld in `src/data/site.ts`: PRD §8.3 eist dat de schrijfwijze exact gelijk is aan die op het Google-bedrijfsprofiel, en een geocoder is daar geen bewijs voor. Bij Vera hoeft het alleen nog bevestigd te worden — de vraag wordt daarmee 'klopt 7552 WK?' in plaats van 'wat is de postcode?'.
---

author: claude
created: 2026-08-09 13:27
---
Punt 5 (liggende hero-foto van Vera) en het bijbehorende criterium zijn verwijderd: **er hoeft geen foto meer geregeld te worden.**

Er ligt een herzien ontwerp voor de hero van `/over-mij/` (`Re-design Nails by Vera/Over mij.dc.html`). Die hero is geen fotohero meer, maar een lichte kaart met de tekst links en het portret rechts in een cirkel. Dat gebruikt precies wat `vera-portret.jpeg` wél is — vierkant, 1080 × 1080 — in plaats van wat het niet is. De hero is gebouwd en staat in `src/pages/over-mij.astro`; de afhandeling van de taak zelf loopt via TASK-20.

De overige punten van deze taak veranderen niet.
---

author: claude
created: 2026-08-09 15:15
---
Padcorrectie bij de vorige opmerking: het herziene prototype staat inmiddels gewoon in het handoff-pakket, als `design_handoff_nailsbyvera/Over mij.dc.html`. De losse map ernaast bestaat niet meer.
---

author: claude
created: 2026-08-09 16:17
---
TASK-10 is gebouwd; de accordeon staat live op `/behandelingen/` en draait op `faq.yaml`. Wat dat voor punt 1 van deze taak betekent:

- Er is een zevende vraag bijgekomen die nog ontbrak: **"Wat kost een behandeling ongeveer?"**. Het antwoord noemt bewust geen bedragen en verwijst naar `/prijzen/`; dat hoeft niet langs Vera. De overige zes wél.
- **`voorbereiding` is nog leeg en wordt daarom overgeslagen** — die vraag staat niet op de pagina. Zodra het antwoord er is, verschijnt hij vanzelf; er hoeft niets aan de code te gebeuren.
- De andere zes antwoorden stáán nu op de pagina én in `FAQPage`-structured data, allemaal met `confirmed: false`. Dat is de reden dat dit punt zwaarder weegt dan eerst: het zijn niet langer conceptteksten in een YAML-bestand, maar uitspraken over haar salon in machineleesbaar formaat. Vóór de cutover (TASK-17) moet elk antwoord bevestigd zijn en `confirmed` op `true`.

De scherpste openstaande vragen voor Vera, in volgorde van belang: wat de 7-dagen-garantie precies dekt (breekt én loslaten? ook met nail art erop?), de behandelduur in minuten per behandeling, of er voorbereiding nodig is, en of er buiten de vaste openingstijden iets mogelijk is.
---
<!-- COMMENTS:END -->
