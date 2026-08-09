---
id: TASK-7.2
title: Pagina 'Over mij' bouwen
status: Done
assignee:
  - '@claude'
created_date: '2026-08-08 08:39'
updated_date: '2026-08-08 16:50'
labels:
  - paginas
milestone: m-0
dependencies: []
documentation:
  - design_handoff_nailsbyvera/Over mij.dc.html
modified_files:
  - src/pages/over-mij.astro
  - src/components/PhotoFrame.astro
  - src/components/SectionHeading.astro
  - src/components/CtaBand.astro
  - src/styles/global.css
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
- [x] #1 De pagina is bereikbaar op /over-mij/ en komt visueel overeen met beide renders van het ontwerp
- [x] #2 De opleidingschips staan er zoals in het ontwerp
- [x] #3 De CTA-band loopt via de BookingButton-component
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Aanpak

Nieuw bestand `src/pages/over-mij.astro`. Met `trailingSlash: 'always'` levert dat
`/over-mij/` op. Volledig compositie uit de componenten van TASK-6/7.1; de
verwachting is dat er geen nieuwe componenten nodig zijn.

Opbouw desktop, van boven naar beneden (bron: `design_handoff_nailsbyvera/Over mij.dc.html`):

1. **Hero** — blush-band met 16px padding rondom een kader van 480px met radius 32px.
   Portret `photos.veraPortret` full-bleed, hetzelfde ink-900-verloop als de home,
   `<Header floating />` erbovenop, links onderin eyebrow "Over mij — Vera Wolff",
   h1 62px "Een trendy nagelstyliste" en de quote eronder. Mobiel 400px / 38px.
2. **"It runs in the family"** — 50/50: kaart links (eyebrow "Hoe Nails by Vera
   ontstaan is", displayregel cursief 38px, twee alinea's, ondertekening
   "– Vera Wolff"), foto rechts (`kersroodHerfst`, radius 32, min-h 520px).
3. **"Dream big"** — 50/50 omgekeerd: foto links (`blauweBloemetjesRoos`, min-h
   460px), kaart rechts met twee alinea's en de drie opleidingschips
   (Magnetic Nail Design · Julia Visser · Tanya Savchenko) via `Chip`.
4. **Fotoraster** — vier kolommen, rijhoogte 220px: `blauweBloemetjes`,
   `rozeOmbreSalon`, `dieproodAmandel`, `frenchGeleBloemetjes`. Op mobiel twee
   kolommen op 150px.
5. **CTA-band** — `CtaBand` met eyebrow "Plan jouw naildate", titel "Kom langs en
   ontspan!" en label "Maak jouw afspraak". Loopt daarmee via `BookingButton` (AC #3).
6. **Footer** uit `Base`, plus `StickyBookingBar` zoals op de home.

## Fotokoppeling

De `image-slot`-id's uit het prototype zijn via het veld `wordpress` in
`src/data/images.ts` één-op-één terug te vinden; alle zeven foto's staan al in het
manifest. Geen nieuwe assets nodig.

| slot | wordpress | key |
|---|---|---|
| om-hero | 2024/08/Photoroom_20240306_101904 | veraPortret |
| om-1 | 2024/07/FullSizeRender | kersroodHerfst |
| om-2 | 2024/08/IMG_1684 | blauweBloemetjesRoos |
| om-g1..g4 | IMG_1879 / IMG_1957 / IMG_1862 / IMG_1551 | blauweBloemetjes, rozeOmbreSalon, dieproodAmandel, frenchGeleBloemetjes |

## Kopstructuur

Eén h1 (hero). De twee verhaalregels zijn in het prototype `<span>`, maar dragen
de sectie en worden h2. Het fotoraster heeft geen kop in het ontwerp en krijgt een
`sr-only` h2, dezelfde oplossing als bij de stappenband op de home. De CTA-band
levert via `SectionHeading` zijn eigen h2.

## Copy

Letterlijk uit de desktoprender (PRD §5.5). Waar de mobiele render kortere copy
toont, geldt de desktopversie — hetzelfde besluit als bij TASK-7.1.

## Verificatie

- `npm run check` en `npm run build` schoon.
- Desktop: headless render op 1280px, sectie voor sectie tegen de linkerrender.
- Mobiel: de iframe-harness uit TASK-7.1 (`<iframe width="390">` over http), met
  `clientWidth`/`scrollWidth` als overflow-meting. Headless Chrome op macOS rendert
  nooit smaller dan 500px, dus `--window-size=390` is geen geldige meting.
- Copy automatisch vergelijken met het prototype.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
**Twee bugs die pas met echte foto's zichtbaar werden.**

1. *Het portret in de hero is een uitsnede op een lichte achtergrond.* Het verticale verloop uit het ontwerp (0,34 → 0,10 → 0,60) gaat ervan uit dat de foto onderaan donker is. Bij dit portret is juist het gebied achter het tekstblok licht, waardoor de gouden eyebrow praktisch verdween en de quote flets werd. Twee extra scrims toegevoegd: onderste 75% naar ink-900/60 en een linkerscrim van ink-900/45 tot 55%. Het prototype kón dit niet laten zien — daar staat op die plek een grijze placeholder.

2. *PhotoFrame liet de foto de hoogte bepalen in plaats van andersom.* De `<img>` stond op `h-full` binnen een kader met alleen een `min-h-`. Een percentagehoogte valt dan terug op auto, dus rekte de foto het kader op tot zijn eigen hoogte: het staande portret van 576×1024 werd in een kolom van 552px 981px hoog, waar het ontwerp 520px voorschrijft. De foto staat nu absoluut gepositioneerd, net als de image-slots in het ontwerp. Dit raakt ook de home: het Vera-blok daar staat nu op de bedoelde 440px in plaats van op de natuurlijke hoogte van de foto. Gecontroleerd — die pagina wordt er trouwer van, niet minder.

**Twee kleine uitbreidingen aan het design system.** `--text-d28` toegevoegd (het ontwerp zet de twee verhaalkoppen op 28px mobiel) en `SectionHeading` heeft er een `sizeLg` bij, zodat een kop twee maten kan hebben zoals het ontwerp overal doet. `CtaBand` gebruikt dat meteen: 30px mobiel, 46px desktop. Die twee maten geeft het ontwerp voor de CTA-band op álle pagina's, dus dit corrigeert ook Prijzen, Portfolio, Behandelingen en Contact voordat die gebouwd worden.

**Het fotoraster toont op mobiel vier foto's in 2×2**, waar het ontwerp er twee laat zien. Vier verbergen zou betekenen dat ze wél in de DOM staan en toch gedownload kunnen worden; een tweede rij is hier de eerlijker oplossing.

**De meetmethode uit TASK-7.1 werkt.** De iframe-harness op 390px gaf meteen bruikbare cijfers. Ook de blokhoogtes zijn zo gemeten — dát is hoe de PhotoFrame-bug boven water kwam, want op een screenshot ziet een te hoge foto er alleen maar uit als een ruime foto.

**Naderhand: de hero was op brede schermen onbruikbaar.** Bij de review op ~1920px bleek de full-bleed hero het vierkante portret (1080×1080) tot een strook van 4:1 uit te snijden — er paste alleen nog een mond in beeld. Op het canvas van 1280px waarop het ontwerp is getekend valt dat niet op; daarboven loopt het weg.

Er is geen alternatieve foto: `vera-portret.jpeg` is het enige portret in de gemigreerde mediabibliotheek. Twee ingrepen op dezelfde foto lossen het op:

- De herosectie is begrensd op 1280px, de canvasbreedte van het ontwerp (max-w-site 1200 + 2 × gutter 40). Het kader is daarmee op élk scherm 1248 × 480 — precies de maat uit de handoff. Dit is een bewuste afwijking van de home, waar de hero full-bleed loopt: daar staat een foto van nagels die elke verhouding aankan.
- De uitsnede staat op `object-position: 50% 30%`. Het midden van een vierkant portret is de mond, niet de ogen.

Voorgelegd aan de opdrachtgever met drie gerenderde varianten (begrenzen op 1280 / 1600 breed en 560 hoog / full-bleed met 640px hoogte); de eerste is gekozen omdat die het ontwerp letterlijk volgt.

Gecontroleerd op 1920, 1280 en 390px. Op 390 nog steeds `clientWidth = scrollWidth = 390` en nul elementen buiten het viewport.

De les geldt breder: een full-bleed hero werkt alleen met een foto die tegen elke bijsnijding kan. Bij Portfolio en Contact (TASK-7.5, 7.6) hetzelfde controleren op een breed scherm, niet alleen op 1280.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## Wat er staat

`/over-mij/` uit "Editorial Frames", op beide breakpoints. De pagina vervangt `/over-de-salon/` van de oude site; de redirect is een aparte taak.

Opbouw: hero van 480px met het portret en de zwevende navigatie → "'It runs in the family'" met de foto rechts → "Dream big" met de foto links en de drie opleidingschips → fotoraster van vier tegels op 220px → CTA-band "Kom langs en ontspan!" → footer. Op mobiel alles gestapeld, hero 400px, raster 2×2 op 150px, sticky boekbalk onderaan.

Zoals TASK-7.1 voorspelde was dit vooral compositie: geen nieuwe componenten, alleen twee kleine uitbreidingen aan bestaande (zie hieronder).

## Verificatie

| Criterium | Bewijs |
|---|---|
| #1 Bereikbaar op /over-mij/ | `trailingSlash: 'always'`, build levert `dist/over-mij/index.html`, preview geeft 200 |
| #1 Desktop komt overeen | Headless render op 1280px, sectie voor sectie tegen de linkerrender. Gemeten: hero 480px, blok 1 en 2 op 552px kolombreedte, rastertegels 268×220, h1 62px, verhaalkoppen 38px, CTA-kop 46px |
| #1 Mobiel komt overeen | Echte 390px-render via de iframe-harness uit TASK-7.1. `clientWidth=390`, `scrollWidth=390`, nul elementen buiten het viewport |
| #2 Opleidingschips | `Magnetic Nail Design` · `Julia Visser` · `Tanya Savchenko`, via `Chip`, in de build teruggevonden |
| #3 CTA via BookingButton | Drie boek-CTA's op de pagina (header, CTA-band, sticky balk), alle drie `data-booking-cta` met de Salonized-URL, `target="_blank" rel="noopener"` |
| Copy letterlijk | 61 tekstfragmenten uit de desktoprender automatisch vergeleken met de gebouwde HTML — allemaal identiek |
| Kopstructuur | Eén h1, daarna h2's; het fotoraster heeft een `sr-only` h2 omdat het ontwerp die sectie geen kop geeft |
| Eigen title en description | "Over mij · Nails by Vera", eigen description over het verhaal en de opleidingen |

`astro check` 0 errors / 0 warnings / 0 hints, build schoon.

## Twee dingen die pas met echte foto's zichtbaar werden

**Het portret is een uitsnede op een lichte achtergrond.** Het verloop uit het ontwerp gaat ervan uit dat de foto onderaan donker is; hier is juist het gebied achter het tekstblok licht, waardoor de gouden eyebrow praktisch verdween. Twee extra scrims toegevoegd (onderste 75% en een linkerscrim). Het prototype kón dit niet tonen — daar staat op die plek een grijze placeholder. Dit is dezelfde categorie als de contrastcorrecties in TASK-6: het ontwerp gevolgd waar het kan, gecorrigeerd waar het onleesbaar wordt.

**`PhotoFrame` liet de foto de hoogte bepalen in plaats van andersom.** De `<img>` stond op `h-full` in een kader met alleen een `min-h-`; een percentagehoogte valt dan terug op auto en de foto rekt het kader op. Het staande portret van 576×1024 werd zo 981px hoog in een kolom van 552px, waar het ontwerp 520px voorschrijft. De foto staat nu absoluut gepositioneerd, precies zoals de image-slots in het ontwerp. **Dit raakt ook de homepage:** het Vera-blok daar staat nu op de bedoelde 440px in plaats van op de natuurlijke hoogte van de foto — die pagina is opnieuw gerenderd en wordt er trouwer van. Ook de stijlgids gecontroleerd.

Deze bug is niet op een screenshot te zien: een te hoge foto ziet er gewoon uit als een ruime foto. Hij kwam boven water door de blokhoogtes met een DOM-script te meten. Dat loont voor 7.3 t/m 7.7 net zo goed.

## Uitbreidingen aan het design system

- `--text-d28` toegevoegd; het ontwerp zet de twee verhaalkoppen op 28px mobiel.
- `SectionHeading` heeft een `sizeLg`, zodat een kop de twee maten kan hebben die het ontwerp overal geeft.
- `CtaBand` gebruikt dat: 30px mobiel, 46px desktop. Die twee maten schrijft het ontwerp voor op álle pagina's, dus dit staat goed voordat Prijzen, Portfolio, Behandelingen en Contact gebouwd worden.

## Afwijking van het ontwerp

Het fotoraster toont op mobiel vier foto's in 2×2, waar het ontwerp er twee laat zien. Twee verbergen betekent dat ze wél in de DOM staan; een tweede rij is eerlijker.

## Wat nog open staat

Onveranderd ten opzichte van TASK-7.1: de mobiele navigatiedrawer is TASK-9, de teksten verhuizen naar content collections in TASK-8, en witte tekst op een foto blijft iets om bij de audit (TASK-15) met het blote oog te beoordelen — ook al is dit portret nu duidelijk beter afgedekt dan bij de eerste render.

## Naderhand: hero herkaderd

Bij de review op ~1920px bleek de full-bleed hero het vierkante portret tot een strook van 4:1 uit te snijden — alleen een mond in beeld. Op het canvas van 1280px waarop het ontwerp getekend is valt dat niet op.

Er is geen andere foto beschikbaar: `vera-portret.jpeg` is het enige portret in de mediabibliotheek. Opgelost door de herosectie te begrenzen op 1280px (de canvasbreedte van het ontwerp, dus een kader van 1248 × 480 op élk scherm) en de uitsnede op `50% 30%` te zetten — het midden van een vierkant portret is de mond, niet de ogen. Bewuste afwijking van de home, waar de hero wél full-bleed loopt omdat daar een foto van nagels staat die elke verhouding aankan.

Opnieuw gecontroleerd op 1920, 1280 en 390px; op 390 nog steeds geen horizontale overflow.
<!-- SECTION:FINAL_SUMMARY:END -->
