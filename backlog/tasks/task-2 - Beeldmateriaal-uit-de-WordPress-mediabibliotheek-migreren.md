---
id: TASK-2
title: Beeldmateriaal uit de WordPress-mediabibliotheek migreren
status: Done
assignee:
  - '@claude'
created_date: '2026-08-08 08:37'
updated_date: '2026-08-08 11:15'
labels:
  - fundament
  - assets
  - blokkeert-cutover
milestone: m-0
dependencies: []
documentation:
  - docs/PRD.md
  - design_handoff_nailsbyvera/README.md
modified_files:
  - src/assets/logo-nails-by-vera.png
  - src/assets/photos/
  - src/data/images.ts
  - src/components/Photo.astro
  - src/components/Logo.astro
  - src/components/Header.astro
  - src/components/Footer.astro
  - src/pages/index.astro
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
- [x] #1 Alle 18 afbeeldingen en het logo staan lokaal in src/assets/ en zijn gecommit
- [x] #2 Geen enkele pagina verwijst nog naar een nailsbyvera.nl/wp-content-URL
- [x] #3 Afbeeldingen worden geserveerd via Astro <Image> met AVIF en WebP-fallback en responsive srcset
- [x] #4 Elke afbeelding heeft expliciete width en height, zodat er geen layout shift optreedt
- [x] #5 Betekenisdragende afbeeldingen hebben een Nederlandse alt-tekst; decoratieve hebben alt=""
- [x] #6 Hero-afbeeldingen laden met loading=eager en fetchpriority=high; overige lazy
- [x] #7 Het logo is beschikbaar als SVG of geoptimaliseerde PNG en vervangt de typografische stand-in
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Aanpak

1. **Inventarisatie.** Alle `wp-content`-URL's uit de zes `.dc.html`-prototypes halen.
   Dat levert 18 URL's op, waarvan er twee naar dezelfde foto wijzen (IMG_8747 in
   twee formaten). Het zijn dus **17 foto's + 1 logo = 18 bestanden**; de
   taakomschrijving telde 18 foto's plus het logo, dat is één te veel.
2. **Welke variant downloaden.** WordPress bewaart per upload het origineel én een
   `-scaled` versie (2560px-cap). De originelen zijn 1,5–3 MB, de `-scaled`
   varianten 170–470 kB. Het grootste beeld in het ontwerp is de home-hero op een
   1280px-canvas; 2560px dekt dat op 2x precies. Dus `-scaled` waar beschikbaar,
   anders het origineel. Scheelt ~25 MB in de repo zonder zichtbaar kwaliteitsverlies.
3. **Beschrijvende bestandsnamen.** `IMG_9895.jpg` zegt niets. Hernoemen naar
   `nagels-lichtblauwe-gellak.jpg` en dergelijke, met het oorspronkelijke
   WordPress-pad vastgelegd in het manifest zodat elke tegel in de prototypes
   terug te vinden blijft.
4. **Alt-teksten.** Elke foto bekijken en een Nederlandse, beschrijvende alt-tekst
   schrijven. Die hoort bij het beeld, niet bij de plek — dus in het manifest,
   niet in de pagina's.
5. **`src/data/images.ts`** — het manifest: `src` (ImageMetadata via import),
   `alt`, `category` en `wordpress` per foto. De categorieën volgen de filterchips
   uit het portfolio-prototype: Versteviging / Gellak / Nail art, plus `salon`
   voor het portret van Vera (geen portfolio-item).
6. **`src/components/Photo.astro`** — één doorgang voor alle fotolevering, zodat
   de eisen uit PRD §5.6 niet per pagina herhaald hoeven te worden: `<Picture>`
   met AVIF + WebP-fallback, responsive srcset, width/height uit de metadata, en
   `priority` die eager + `fetchpriority="high"` + `decoding="sync"` zet. Levering
   only — vormgeving hoort in PhotoFrame (TASK-6).
7. **`src/components/Logo.astro`** — het echte woordmerk in plaats van de
   typografische stand-in, in header en footer. Het bestand bestaat alleen in
   zwart; voor gebruik op de donkere hero komt er een `onDark`-prop die het met
   `brightness-0 invert` wit maakt. Dat kan omdat het woordmerk één kleur is.
8. **Verificatie** op de bestaande placeholderpagina: hero met `priority`, drie
   lazy tegels. Dat maakt de pipeline aantoonbaar in plaats van alleen bedoeld.

## Grens met andere taken

Dit levert het beeldmateriaal en de leveringspipeline. Wélke foto op welke plek in
welk raster komt, is TASK-7.x. De portfolio-collection die op dit manifest leunt is
TASK-8; het filter is TASK-9.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
**Telfout in de taakomschrijving.** De omschrijving zegt '18 afbeeldingen plus het logo', maar somt er 17 op. De prototypes verwijzen naar 18 URL's waarvan er twee dezelfde foto zijn (IMG_8747 in `-scaled` én `-576x1024`). Het zijn dus 17 foto's + 1 logo = 18 bestanden. Alles wat in het ontwerp voorkomt staat nu lokaal.

**Bestandsnaam → WordPress-herkomst**

| Lokaal | WordPress |
|---|---|
| nagels-nude-kort-glans.jpeg | 2024/07/IMG_9294 |
| nagels-nude-buiten-bankje.jpeg | 2024/07/IMG_8717 |
| nagels-lichtblauwe-gellak.jpg | 2024/07/IMG_9895 |
| nagels-bordeaux-glitter.jpg | 2024/07/IMG_8747 |
| nagels-nude-witte-swirls.jpg | 2024/07/IMG_0121 |
| nagels-nude-natuurlijk.jpg | 2024/07/IMG_9296 |
| nagels-turquoise-madeliefjes.jpg | 2024/07/IMG_9888 |
| nagels-lila-lang-amandel.jpg | 2024/07/IMG_9227 |
| nagels-kersrood-herfst.jpeg | 2024/07/FullSizeRender |
| nagels-roze-amandel-ringen.jpg | 2024/08/IMG_1516 |
| nagels-nailart-smileys.jpeg | 2024/08/IMG_0354 |
| nagels-blauwe-bloemetjes-roos.jpeg | 2024/08/IMG_1684 |
| nagels-blauwe-bloemetjes.jpeg | 2024/08/IMG_1879 |
| nagels-roze-ombre-salon.jpeg | 2024/08/IMG_1957 |
| nagels-dieprood-amandel.jpeg | 2024/08/IMG_1862 |
| nagels-french-gele-bloemetjes.jpeg | 2024/08/IMG_1551 |
| vera-portret.jpeg | 2024/08/Photoroom_20240306_101904 |
| logo-nails-by-vera.png | 2024/06/NbyV-logo-black.png |

Dezelfde tabel staat als `wordpress`-veld in `src/data/images.ts`, zodat de mapping in de code leeft en niet alleen hier.

**Bronvariant.** Overal de WordPress `-scaled` versie (2560px-cap, 170–470 kB), behalve `Photoroom_20240306_101904` — daar bestaat geen `-scaled` van (302), dus het origineel van 1080×1080. De ongescalede originelen waren 1,5–3 MB per stuk; die meenemen had ~25 MB aan de repo toegevoegd zonder zichtbaar verschil, want het grootste beeld in het ontwerp is 1280px breed en 2560px dekt dat op 2x.

**Logo blijft PNG.** Het bronbestand is 432×100 met transparantie, 3,7 kB. Autotracen naar SVG van een serif-woordmerk levert een groter en slechter bestand op; Astro maakt er nu WebP van 1–3 kB van. Bij een hoogte van 32 px is 432 px bron ruim 3x. AC #7 laat 'SVG of geoptimaliseerde PNG' expliciet toe.

**Het logo bestaat alleen in zwart.** Op de donkere hero en de feature-band moet het wit zijn. `Logo.astro` heeft daarvoor een `onDark`-prop die `brightness-0 invert` toepast in plaats van een tweede bestand. Werkt alleen zolang het woordmerk éénkleurig is — komt er ooit een gekleurde versie, dan is een apart bestand nodig.

**Categorieën** volgen de filterchips uit `Portfolio.dc.html`: Versteviging / Gellak / Nail art. Het portret van Vera kreeg `salon` en hoort dus niet in het portfolioraster.

**Reikwijdte van AC #3, #4 en #6.** Die zijn geverifieerd op de enige pagina die nu bestaat. De garantie voor de rest zit niet in die pagina maar in `Photo.astro`: zolang elke foto daardoorheen gaat, kríjgt hij AVIF+WebP, srcset en width/height, en is `priority` de enige knop voor eager/fetchpriority. Aandachtspunt voor TASK-7.x: geen kale `<Image>` of `<img>` gebruiken, en per pagina precies één `priority`.

**Placeholderpagina.** `src/pages/index.astro` toont nu een hero plus drie tegels. Dat is verificatiemateriaal voor de pipeline, geen begin van het ontwerp — TASK-7.1 vervangt de pagina volledig.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## Wat er staat

Al het beeldmateriaal uit de WordPress-mediabibliotheek staat lokaal in de repo, met alt-teksten, en er is één component waar alle fotolevering doorheen gaat. De hosting kan wat beeld betreft opgezegd worden — er hangt niets meer aan `nailsbyvera.nl/wp-content`.

**17 foto's + het logo** in `src/assets/` (4,0 MB totaal). Overal de WordPress `-scaled` variant (2560px-cap), behalve het portret van Vera dat alleen als origineel bestaat. De ongescalede originelen waren 1,5–3 MB per stuk en hadden ~25 MB aan de repo toegevoegd zonder zichtbaar verschil: het grootste beeld in het ontwerp is 1280px breed, en 2560px dekt dat op 2x.

**Beschrijvende bestandsnamen** in plaats van `IMG_9895.jpg`. De herkomst gaat niet verloren: elk item in het manifest heeft een `wordpress`-veld met het oorspronkelijke pad, zodat elke tegel in de prototypes terug te vinden is.

**`src/data/images.ts`** — het manifest. Per foto: `src` (typed `ImageMetadata`), een Nederlandse `alt`, een `category` en de herkomst. Alt-tekst hoort bij het beeld, niet bij de plek waar het toevallig staat; zo hoeft niemand hem opnieuw te verzinnen als dezelfde foto op twee pagina's terugkomt. De categorieën volgen de filterchips uit `Portfolio.dc.html` (Versteviging / Gellak / Nail art), plus `salon` voor het portret — dat hoort niet in het portfolioraster.

**`src/components/Photo.astro`** — één doorgang voor alle fotolevering. `<Picture>` met AVIF-`<source>` en WebP-fallback, responsive srcset, width/height uit de metadata, en een `priority`-prop die eager + `fetchpriority="high"` + `decoding="sync"` zet. Breedtes boven het origineel worden weggefilterd zodat er nooit opgeschaald wordt. Dit component regelt alleen de *levering*; kaders en radii horen in PhotoFrame (TASK-6).

**`src/components/Logo.astro`** — het echte woordmerk vervangt de typografische stand-in in header en footer. Het bronbestand bestaat alleen in zwart; de `onDark`-prop maakt het wit met `brightness-0 invert`, wat kan omdat het woordmerk éénkleurig is. Geen tweede bestand nodig.

## Verificatie

| Criterium | Bewijs |
|---|---|
| #1 Alles lokaal | 18 bestanden in `src/assets/`, 4,0 MB. Alle 18 URL's uit de zes prototypes gedekt |
| #2 Geen wp-content-verwijzingen | `grep -rn "wp-content" dist/ src/` → alleen het herkomstveld in `images.ts`, dat een pad is en geen URL |
| #3 AVIF + WebP + srcset | In `dist/index.html`: elke foto is een `<picture>` met `<source type="image/avif" srcset="… 480w, 768w, 1024w, 1440w, 2048w">` en een `<img>` met de WebP-srcset. Build genereerde 42 varianten |
| #4 Expliciete afmetingen | Alle zes `<img>`-elementen hebben `width` en `height` uit de bronmetadata |
| #5 Alt-teksten | Alle zes gecontroleerd in de output, Nederlands en beschrijvend. Geen betekenisdragende foto zonder alt |
| #6 Eager/lazy | Hero: `loading="eager" decoding="sync" fetchpriority="high"`. De drie tegels: `loading="lazy" decoding="async" fetchpriority="auto"` |
| #7 Logo | 432×100 PNG met transparantie → 1–3 kB WebP via Astro; staat in header en footer op de plek van de stand-in. Visueel bevestigd op een headless screenshot |

Build schoon, `astro check` 0 errors / 0 warnings / 0 hints over 10 bestanden.

## Kanttekeningen

**Reikwijdte van #3, #4 en #6.** Die zijn geverifieerd op de enige pagina die nu bestaat. Wat ze voor de rest van de site garandeert is niet die pagina maar `Photo.astro`. Aandachtspunt voor TASK-7.x: geen kale `<Image>` of `<img>` gebruiken, en per pagina precies één `priority`.

**De placeholderpagina toont nu een hero en drie tegels.** Dat is verificatiemateriaal, geen begin van het ontwerp — TASK-7.1 vervangt de pagina volledig.

**Telfout in de opdracht.** De omschrijving zei '18 afbeeldingen plus het logo' maar somde er 17 op. De prototypes bevatten 18 URL's waarvan er twee dezelfde foto zijn (IMG_8747 in twee formaten). Het zijn 17 foto's + 1 logo.

**Logo blijft PNG.** Autotracen van een serif-woordmerk naar SVG levert een groter en slechter bestand op. AC #7 laat 'geoptimaliseerde PNG' expliciet toe; 432px bron bij 32px weergave is ruim 3x.
<!-- SECTION:FINAL_SUMMARY:END -->
