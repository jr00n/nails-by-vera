---
id: TASK-20
title: 'Hero ''Over mij'' herzien: portret in een cirkel in plaats van een fotohero'
status: Done
assignee: []
created_date: '2026-08-08 16:55'
updated_date: '2026-08-09 15:21'
labels:
  - paginas
  - ontwerp
  - beeld
milestone: m-0
dependencies: []
references:
  - src/pages/over-mij.astro
  - src/data/images.ts
documentation:
  - >-
    backlog/docs/beeldrichtlijnen-hero.md/doc-1 -
    Beeldrichtlijnen-—-hero-afbeeldingen.md
  - design_handoff_nailsbyvera/Over mij.dc.html
modified_files:
  - src/pages/over-mij.astro
  - design_handoff_nailsbyvera/Over mij.dc.html
  - design_handoff_nailsbyvera/Editorial Frames.dc.html
  - design_handoff_nailsbyvera/Portfolio.dc.html
  - design_handoff_nailsbyvera/Behandelingen.dc.html
  - design_handoff_nailsbyvera/Prijzen.dc.html
  - design_handoff_nailsbyvera/Contact.dc.html
  - design_handoff_nailsbyvera/README.md
  - design_handoff_nailsbyvera/uploads/
priority: medium
type: enhancement
ordinal: 27000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
In TASK-7.2 is de hero van `/over-mij/` begrensd op 1280px omdat het enige beschikbare portret (`vera-portret.jpeg`, 1080 × 1080) op een breed scherm tot een strook van 4:1 werd bijgesneden — er paste alleen nog een mond in beeld. Dat loste de uitsnede op, maar leverde een pagina op die visueel uit de toon viel.

De oorspronkelijke oplossing was: een liggende foto van Vera laten maken en de hero terug naar full-bleed brengen, net als op de home.

**Dat is achterhaald.** De ontwerper heeft een herziene versie van `design_handoff_nailsbyvera/Over mij.dc.html` geleverd, waarin alleen de hero van deze pagina afwijkt — de overige vijf prototypes zijn ongewijzigd. De hero is daar geen fotohero meer, maar een lichte kaart (`--bg-page` op een blush-band) met de tekst links en het portret rechts in een cirkel, met een dunne rose-300 ring eromheen en twee chips onder de quote. De navigatie zweeft niet meer over een foto en is dus de gewone, solide header.

Daarmee vervalt de aanleiding voor een nieuwe foto: de cirkel gebruikt precies wat het bestaande portret wél is — vierkant. De foto zit 11% ingezoomd zodat de roze cirkel uit het portret het kader vult en de witte hoeken erbuiten vallen.

Wat blijft: de `sizes`-kwestie uit het beeldrichtlijnendocument. Voor deze hero is die hier opgelost (`110vw` onder de lg-breakpoint, omdat de foto 122% van zijn kader beslaat). Voor de full-bleed hero van de homepage staat hij nog open en is hij overgedragen aan TASK-15.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 De hero van /over-mij/ volgt het herziene ontwerp: lichte kaart, tekst links, portret rechts in een cirkel met rose-300 ring, chips onder de quote
- [x] #2 De navigatie op /over-mij/ is de solide header in plaats van de zwevende variant, en de begrenzing op 1280px is verwijderd
- [x] #3 De blush-band loopt full-bleed en de inhoud blijft op max-w-site staan, zodat de hero op 2560px niet uitrekt
- [x] #4 Op 390px, 1440px, 1920px en 2560px staat het portret volledig in beeld, valt de witte achtergrond van het portret buiten de cirkel en loopt er niets buiten de viewport
- [x] #5 De sizes-waarde van deze hero levert op mobiel een variant die scherp genoeg is voor een 2x-scherm
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Het herziene ontwerp naast het oorspronkelijke leggen en vaststellen wat er precies verandert (alleen de hero van deze pagina; de overige vijf `.dc.html`-bestanden zijn byte-identiek).
2. De fotohero in `src/pages/over-mij.astro` vervangen door de kaart met tekst links en het portret rechts in een cirkel.
3. De zwevende header laten vervallen: `header="none"` en `<Header floating />` eruit, terug naar de solide header uit `Base.astro`.
4. Controleren op 390px, 1440px, 1920px en 2560px.
5. TASK-4 punt 5 (liggende hero-foto) laten vervallen en de openstaande `sizes`-kwestie van de homepage-hero overdragen aan TASK-15.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Het portret zit in een cirkel van 92% van een vierkant kader, met de foto op `-inset-[11%]` (122% van dat kader). Dat is geen willekeurige zoom: `vera-portret.jpeg` is een roze cirkel op een witte achtergrond, en die cirkel beslaat ongeveer 82% van de bestandsbreedte. 100/122 ≈ 82% — daarmee valt de witte rand precies buiten de uitsnede. Bij een ander portret klopt dat getal niet meer; de blush-200 onder de foto vangt op wat er dan doorschijnt.

De drie scrims uit de oude hero zijn verdwenen. Die waren er alleen omdat er witte tekst over een lichte foto stond; nu staat de tekst op de kaart en niet op de foto.

`sizes` is `(min-width: 1024px) 584px, 110vw`. Boven de 100vw omdat de foto 122% van zijn kader beslaat en dat kader op mobiel bijna de volle schermbreedte is. Met `100vw` koos de browser de 480w-variant; nu wordt het 1024w — de grootste die er is, want het bronbestand is 1080px breed.

Geverifieerd met headless Chrome-screenshots op 1440, 1920 en 2560. Op 390 lukt dat niet rechtstreeks: headless Chrome op macOS gaat niet onder een CSS-viewport van 500px. Die render is gemaakt via een `<iframe width="390">` in een pagina van 500px, wat wél een echte viewport van 390px geeft.

De chips ('Salon sinds oktober 2023', 'Hengelo (OV)') staan alleen op desktop, zoals in het ontwerp. Beide feiten staan op mobiel elders op de pagina — oktober 2023 in het 'Dream big'-verhaal, Hengelo in de footer.
<!-- SECTION:NOTES:END -->

## Comments

<!-- COMMENTS:BEGIN -->
author: claude
created: 2026-08-09 15:14
---
Het herziene prototype is in het handoff-pakket gezet in plaats van ernaast: `design_handoff_nailsbyvera/Over mij.dc.html` is vervangen door de nieuwe versie en de losse kopie van het hele pakket is verwijderd.

Het bestand van de ontwerper is daarbij niet aangepast. Het verwijst voor het portret naar `uploads/vera-portret.jpeg` — een relatief pad, waar de rest van het pakket naar `nailsbyvera.nl/wp-content/uploads/...` wijst. Dat ene bestand staat daarom nu in `design_handoff_nailsbyvera/uploads/`, zodat het prototype blijft renderen zonder dat er in de deliverable geknipt hoeft te worden.
---

author: claude
created: 2026-08-09 15:21
---
De handoff-prototypes laadden hun foto's rechtstreeks van `nailsbyvera.nl/wp-content/uploads/...` — 17 unieke bestanden over zes pagina's. Die verwijzingen zijn vervangen door lokale kopieën in `design_handoff_nailsbyvera/uploads/` (4,5 MB), zodat het pakket blijft renderen als de oude WordPress-installatie uit de lucht gaat (TASK-19).

De mapping liep via het `wordpress`-veld in `src/data/images.ts`; de kopieën zijn de gemigreerde bestanden uit `src/assets/photos/`, niet opnieuw opgehaalde WordPress-varianten. De maatachtervoegsels (`-scaled`, `-576x1024`) zijn daarbij vervallen. Alle zes prototypes zijn vanaf schijf gerenderd om te controleren dat er geen beeld ontbreekt; de Assets-paragraaf in de README klopte niet meer en is bijgewerkt.
---
<!-- COMMENTS:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
De hero van `/over-mij/` is herbouwd volgens de herziene versie van `design_handoff_nailsbyvera/Over mij.dc.html` en is daarmee geen fotohero meer.

**Wat er verandert**
- Een lichte kaart op een blush-band: tekst links (eyebrow, h1, quote in cursieve display, twee chips), portret rechts in een cirkel met een rose-300 ring.
- De zwevende navigatie vervalt; de pagina gebruikt weer de solide header uit `Base.astro`. Daarmee is `/over-mij/` de enige contentpagina zonder zwevende nav — dat is de bedoeling van het ontwerp.
- De begrenzing op 1280px, de `object-position: 50% 30%` en de drie scrims uit TASK-7.2 zijn verdwenen. De band loopt full-bleed, de inhoud blijft op `max-w-site`.
- Op mobiel staat het portret boven de tekst; de `h1` blijft het eerste element in de DOM.
- Het prototype in het handoff-pakket is vervangen door de herziene versie; het portret waar dat bestand relatief naar verwijst staat in `design_handoff_nailsbyvera/uploads/`.

**Waarom dit de taak afsluit**
De oorspronkelijke opzet — een liggende foto laten maken en de hero full-bleed maken — is vervangen. De cirkelvorm gebruikt het bestaande vierkante portret zoals het is, dus er is geen nieuw beeldmateriaal meer nodig. Punt 5 en het bijbehorende criterium in TASK-4 zijn daarom verwijderd.

**Verificatie**
`astro check` (0 fouten) en `npm run build` slagen. Visueel gecontroleerd op 390px, 1440px, 1920px en 2560px: het portret staat volledig in beeld, de witte achtergrond van het bronbestand valt buiten de cirkel en er loopt niets buiten de viewport. De `srcset` levert op mobiel de 1024w-variant.

**Overgedragen**
De `sizes`-waarde van de full-bleed homepage-hero is nog niet nagelopen. Dat criterium staat nu bij TASK-15 (toegankelijkheid en performance).
<!-- SECTION:FINAL_SUMMARY:END -->
