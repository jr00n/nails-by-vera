---
id: TASK-8
title: Content collections opzetten en vullen
status: To Do
assignee: []
created_date: '2026-08-08 08:39'
labels:
  - content
  - seo
milestone: m-0
dependencies:
  - TASK-1
  - TASK-4
documentation:
  - docs/PRD.md
priority: high
type: feature
ordinal: 8000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Alle veranderlijke content komt in Astro content collections in plaats van hardgecodeerd in de opmaak. De reden is concreet: er komt geen CMS in fase 1, dus contentwijzigingen lopen via een commit. Dat is alleen werkbaar als een prijswijziging één regel in één bestand is en niemand door de opmaak hoeft te zoeken.

Benodigde collections:
- `treatments` — behandelingen met omschrijving, duur en prijs
- `prices` — de volledige tarieven, gegroepeerd zoals op de prijzenpagina
- `portfolio` — afbeeldingen met src, alt en category (category is nodig voor het filter)
- `reviews` — auteur, score, tekst, datum
- `faq` — vraag, antwoord, volgorde

Daarnaast één centrale bron voor de bedrijfsgegevens: naam, adres, telefoonnummer, e-mail, social links en openingstijden. Die worden op meerdere plekken hergebruikt — footer, contactpagina, structured data — en mogen niet uit elkaar gaan lopen. Een telefoonnummer dat op de site anders geschreven staat dan in de structured data verzwakt het lokale vindbaarheidssignaal aantoonbaar.

Vaste gegevens: De Genestetstraat 41, Hengelo · 06-36079000 · info@nailsbyvera.nl · @byveranails · openingstijden dinsdag en donderdag 09:00–17:15, zaterdag 09:00–13:00.

De reviewteksten en FAQ-antwoorden komen uit task-4; behandelingen en prijzen staan in de handoff-ontwerpen.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Alle vijf collections bestaan met een getypeerd schema en zijn gevuld
- [ ] #2 Bedrijfsgegevens en openingstijden staan op precies één plek en worden overal daarvandaan gelezen
- [ ] #3 Een prijswijziging vergt het aanpassen van één regel in één bestand, zonder opmaak aan te raken
- [ ] #4 Het telefoonnummer en adres zijn identiek geschreven in de content, de zichtbare pagina en de structured data
- [ ] #5 Geen enkele prijs, behandelduur of openingstijd staat nog hardgecodeerd in een .astro-bestand
<!-- AC:END -->
