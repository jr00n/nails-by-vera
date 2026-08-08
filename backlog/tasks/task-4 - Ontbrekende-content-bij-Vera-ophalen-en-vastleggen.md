---
id: TASK-4
title: Ontbrekende content bij Vera ophalen en vastleggen
status: To Do
assignee: []
created_date: '2026-08-08 08:38'
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
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 FAQ-vragen en -antwoorden zijn schriftelijk vastgelegd, inclusief behandelduur in minuten per behandeling
- [ ] #2 Reviewteksten zijn verzameld met auteur, score, tekst en datum
- [ ] #3 Vera heeft expliciet bevestigd dat de blogposts en WooCommerce-producten mogen vervallen
- [ ] #4 Vera heeft de conceptprivacyverklaring gelezen en akkoord gegeven
- [ ] #5 Alle verzamelde content staat in de repository, klaar om in content collections te zetten
<!-- AC:END -->
