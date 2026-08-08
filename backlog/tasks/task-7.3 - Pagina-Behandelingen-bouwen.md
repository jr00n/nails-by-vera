---
id: TASK-7.3
title: Pagina 'Behandelingen' bouwen
status: To Do
assignee: []
created_date: '2026-08-08 08:39'
labels:
  - paginas
  - geo
milestone: m-0
dependencies: []
documentation:
  - design_handoff_nailsbyvera/Behandelingen.dc.html
parent_task_id: TASK-7
priority: medium
type: feature
ordinal: 11000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Doel is uitleggen wat elke behandelgroep inhoudt. Deze pagina is ook de belangrijkste bron voor vragen die bezoekers en AI-assistenten stellen over duur, houdbaarheid en prijs — de FAQ komt er later onderaan bij, in een aparte taak.

Ontwerp: `design_handoff_nailsbyvera/Behandelingen.dc.html`.

Opbouw: hero van 460px. Introkaart met drie chips. Daarna drie afwisselende blokken die om en om gespiegeld zijn — tekstkaart plus foto — voor Nagelversteviging (Biab, Gel, Acrylgel), Gellak en Nail art. Elk blok heeft bullets met een gouden ✦ en een "Boek nu"-knop. Daaronder drie statkaarten: 4 weken, 7 dagen, Advies. Afsluitend een CTA-band met de quote "Step into luxury, walk out with style".

Belangrijk voor vindbaarheid: duur en prijs moeten als leesbare tekst in de HTML staan, niet in een afbeelding en niet achter JavaScript. De huidige site vermeldt nergens een behandelduur — dat is precies het soort feit dat bezoekers en AI-antwoorden zoeken, en het nieuwe ontwerp lost dat op.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 De pagina komt visueel overeen met beide renders van het ontwerp
- [ ] #2 De drie behandelblokken staan afwisselend gespiegeld zoals in het ontwerp
- [ ] #3 Duur en prijs per behandeling staan als platte tekst in de HTML en komen uit de content collection
- [ ] #4 Elk behandelblok heeft een eigen boek-CTA via de BookingButton-component
<!-- AC:END -->
