---
id: TASK-20
title: 'Hero ''Over mij'' terug naar full-bleed met een nieuwe, brede foto'
status: To Do
assignee: []
created_date: '2026-08-08 16:55'
labels:
  - paginas
  - ontwerp
  - beeld
milestone: m-0
dependencies: []
references:
  - src/pages/over-mij.astro
  - src/pages/index.astro
  - src/data/images.ts
documentation:
  - >-
    backlog/docs/beeldrichtlijnen-hero.md/doc-1 -
    Beeldrichtlijnen-—-hero-afbeeldingen.md
  - design_handoff_nailsbyvera/Over mij.dc.html
priority: medium
type: enhancement
ordinal: 27000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
In TASK-7.2 is de hero van `/over-mij/` begrensd op 1280px omdat het enige beschikbare portret (`vera-portret.jpeg`, 1080×1080) op een breed scherm tot een strook van 4:1 werd bijgesneden — er paste alleen nog een mond in beeld. Dat lost de uitsnede op, maar levert een pagina op die visueel uit de toon valt: de homepage heeft een full-bleed hero en Over mij ineens een ingekaderde. Die overgang voelt vreemd.

De gewenste eindsituatie is een full-bleed hero, net als op de home. Dat kan alleen met ander beeldmateriaal: een liggende foto van Vera die zowel de staande uitsnede op een telefoon als de panoramische uitsnede op een breed scherm overleeft. De eisen daarvoor staan in het document 'Beeldrichtlijnen — hero-afbeeldingen'; de kern is minimaal 2560 × 1440px liggend, onderwerp in de middelste 40% × 50%, en de linkeronderhoek vrij en rustig voor de tekst.

Deze taak omvat drie dingen:

1. **De foto regelen.** Vragen aan Vera of er een bruikbare liggende foto is, of er een laten maken. Dit hoort ook thuis in het rijtje van TASK-4.
2. **De hero omzetten naar full-bleed.** De begrenzing op 1280px en de `object-position: 50% 30%` uit TASK-7.2 vervallen dan. De hoogte moet wél meegroeien met de breedte — een vaste 480px loopt op 2560px door naar een uitsnede van 5,3:1. Voorstel: `clamp(480px, 34vw, 720px)`, dan blijft de verhouding in hetzelfde bereik als de homepage.
3. **De extra scrims heroverwegen.** Op `/over-mij/` liggen nu twee extra verlopen omdat het huidige portret een uitsnede op een lichte achtergrond is. Bij een foto die onderaan donker genoeg is, kan de hero terug naar het verloop uit het ontwerp.

Neem meteen de `sizes`-kwestie uit het beeldrichtlijnendocument mee: een full-bleed hero wordt op mobiel in de hoogte passend gemaakt, waardoor `sizes="100vw"` een te kleine variant laat kiezen. Dat geldt ook voor de homepage-hero.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Er is een liggende hero-foto van Vera die voldoet aan de beeldrichtlijnen (minimaal 2560 × 1440px, onderwerp in de veilige zone), opgenomen in src/assets/photos/ en aangemeld in src/data/images.ts met alt-tekst
- [ ] #2 De hero van /over-mij/ loopt full-bleed, net als die van de homepage, en de begrenzing op 1280px is verwijderd
- [ ] #3 De hero-hoogte groeit mee met de schermbreedte, zodat de uitsnede op 2560px niet extremer wordt dan die van de homepage
- [ ] #4 Op 390px, 1280px, 1920px en 2560px staat het onderwerp herkenbaar in beeld en is de tekst over de foto leesbaar
- [ ] #5 De sizes-waarde van beide full-bleed hero's levert op mobiel een variant die scherp genoeg is voor een 2×-scherm
<!-- AC:END -->
