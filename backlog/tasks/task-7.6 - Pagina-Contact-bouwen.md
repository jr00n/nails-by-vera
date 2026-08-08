---
id: TASK-7.6
title: Pagina 'Contact' bouwen
status: To Do
assignee: []
created_date: '2026-08-08 08:53'
labels:
  - paginas
  - privacy
milestone: m-0
dependencies: []
documentation:
  - design_handoff_nailsbyvera/Contact.dc.html
parent_task_id: TASK-7
priority: medium
type: feature
ordinal: 14000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Doel is boeken, bereiken en vinden.

Ontwerp: `design_handoff_nailsbyvera/Contact.dc.html`.

Opbouw: hero van 440px. Eerste rij: een grote boekkaart die 60% breed is, plus een informatiekaart met telefoon, e-mail, Instagram en Facebook. Tweede rij: openingstijdenkaart en een kaartbeeld met adreskaart eronder. Afsluitend een CTA-band "Plan jouw route".

Belangrijke afwijking van het ontwerp, en een bewuste keuze: in het prototype is de kaart een fotoplaceholder, en de eerste gedachte was een Google Maps embed. Die embed zet echter cookies, wat een cookiebanner zou vereisen op een site die verder volledig cookievrij is — en hij kost Lighthouse-punten. In plaats daarvan komt er een statische kaartafbeelding met een duidelijke "Route beschrijving"-link naar Google Maps. De functionele behoefte van de bezoeker, de route vinden, is identiek.

Contactgegevens komen uit de centrale bron: telefoon als tel:-link, e-mail als mailto:-link, social als externe links. Adres: De Genestetstraat 41, Hengelo.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 De pagina komt visueel overeen met beide renders van het ontwerp
- [ ] #2 De kaart is een statische afbeelding met routelink; er wordt geen Google Maps embed geladen
- [ ] #3 De pagina zet geen enkele cookie en doet geen verzoek naar een externe host
- [ ] #4 Telefoon en e-mail zijn klikbaar als tel: en mailto:
- [ ] #5 Openingstijden en contactgegevens komen uit de centrale bron
<!-- AC:END -->
