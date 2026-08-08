---
id: TASK-2
title: Beeldmateriaal uit de WordPress-mediabibliotheek migreren
status: To Do
assignee: []
created_date: '2026-08-08 08:37'
labels:
  - fundament
  - assets
  - blokkeert-cutover
milestone: m-0
dependencies: []
documentation:
  - docs/PRD.md
  - design_handoff_nailsbyvera/README.md
priority: high
type: chore
ordinal: 2000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
De prototypes laden alle foto's rechtstreeks van `https://nailsbyvera.nl/wp-content/uploads/...`. Die server gaat uit. Zolang deze taak niet af is, kan de WordPress-hosting niet worden opgezegd zonder de site te breken — vandaar de hoge prioriteit, los van de bouwvolgorde.

Het gaat om 18 afbeeldingen plus het logo. In de prototypes staat het logo als typografische stand-in; het echte bestand is `2024/06/NbyV-logo-black.png`, bij voorkeur om te zetten naar SVG.

Foto's: `2024/07/IMG_9294`, `IMG_8717`, `IMG_9895`, `IMG_8747`, `IMG_0121`, `IMG_9296`, `IMG_9888`, `IMG_9227`, `FullSizeRender` · `2024/08/IMG_1516`, `IMG_0354`, `IMG_1684`, `IMG_1879`, `IMG_1957`, `IMG_1862`, `IMG_1551`, `Photoroom_20240306_101904`.

Alt-teksten zijn onderdeel van deze taak, niet van een latere: ze horen bij het beeld en zijn nodig voor de toegankelijkheidsnorm (WCAG 2.2 AA) uit de PRD. Nederlands, beschrijvend voor betekenisdragende beelden, leeg voor decoratieve.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Alle 18 afbeeldingen en het logo staan lokaal in src/assets/ en zijn gecommit
- [ ] #2 Geen enkele pagina verwijst nog naar een nailsbyvera.nl/wp-content-URL
- [ ] #3 Afbeeldingen worden geserveerd via Astro <Image> met AVIF en WebP-fallback en responsive srcset
- [ ] #4 Elke afbeelding heeft expliciete width en height, zodat er geen layout shift optreedt
- [ ] #5 Betekenisdragende afbeeldingen hebben een Nederlandse alt-tekst; decoratieve hebben alt=""
- [ ] #6 Hero-afbeeldingen laden met loading=eager en fetchpriority=high; overige lazy
- [ ] #7 Het logo is beschikbaar als SVG of geoptimaliseerde PNG en vervangt de typografische stand-in
<!-- AC:END -->
