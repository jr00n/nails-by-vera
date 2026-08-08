---
id: TASK-7.2
title: Pagina 'Over mij' bouwen
status: To Do
assignee: []
created_date: '2026-08-08 08:39'
labels:
  - paginas
milestone: m-0
dependencies: []
documentation:
  - design_handoff_nailsbyvera/Over mij.dc.html
parent_task_id: TASK-7
priority: medium
type: feature
ordinal: 10000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Doel van de pagina is vertrouwen wekken via het verhaal van Vera. Voor een privésalon aan huis is dat een wezenlijk onderdeel van de conversie, geen bijzaak.

Ontwerp: `design_handoff_nailsbyvera/Over mij.dc.html`.

Opbouw: hero van 480px met portret. Daaronder twee tekst- en fotoblokken in 50/50-verdeling met radius 32px: "It runs in the family" en "Dream big", de tweede met chips voor de gevolgde opleidingen (Magnetic Nail Design, Julia Visser, Tanya Savchenko). Vervolgens een vier-koloms fotoraster met rijhoogte 220px. Afsluitend een CTA-band "Kom langs en ontspan!".

Let op de URL: deze pagina vervangt `/over-de-salon/` van de oude site en komt op `/over-mij/`. Dit is de enige URL die verandert; de bijbehorende redirect wordt in een aparte taak ingericht.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 De pagina is bereikbaar op /over-mij/ en komt visueel overeen met beide renders van het ontwerp
- [ ] #2 De opleidingschips staan er zoals in het ontwerp
- [ ] #3 De CTA-band loopt via de BookingButton-component
<!-- AC:END -->
