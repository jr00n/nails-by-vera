---
id: TASK-7.3
title: Pagina 'Behandelingen' bouwen
status: Done
assignee:
  - '@claude'
created_date: '2026-08-08 08:39'
updated_date: '2026-08-09 05:35'
labels:
  - paginas
  - geo
milestone: m-0
dependencies: []
documentation:
  - design_handoff_nailsbyvera/Behandelingen.dc.html
modified_files:
  - src/pages/behandelingen.astro
  - src/content.config.ts
  - src/content/treatments.yaml
  - src/components/StatBlock.astro
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
- [x] #1 De pagina komt visueel overeen met beide renders van het ontwerp
- [x] #2 De drie behandelblokken staan afwisselend gespiegeld zoals in het ontwerp
- [x] #3 Duur en prijs per behandeling staan als platte tekst in de HTML en komen uit de content collection
- [x] #4 Elk behandelblok heeft een eigen boek-CTA via de BookingButton-component
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Aanpak

Nieuw bestand `src/pages/behandelingen.astro` (→ `/behandelingen/` via
`trailingSlash: 'always'`), opgebouwd uit de bestaande componenten. Bron:
`design_handoff_nailsbyvera/Behandelingen.dc.html`, links desktop 1280px, rechts
mobiel 390px.

## Opbouw desktop (boven → beneden)

1. **Hero** — blush-band met 16px padding rondom een kader van 460px, radius 32.
   Foto `photos.nudeKortGlans` (slot `bh-hero` = 2024/07/IMG_9294), het
   ink-900-verloop uit het ontwerp, `<Header floating />`, links onderin eyebrow
   "Behandelingen", h1 62px "Geef jouw nagels een nieuwe look!" en de intro.
   Full-bleed zoals de home: dit is een nagelfoto, die kan elke uitsnede aan
   (les uit TASK-7.2). Mobiel 400px / 38px.
2. **Introkaart** — display 28px "Drie behandelingen, eindeloos veel varianten"
   plus drie `Chip`s (Nagelversteviging · Gellak · Nail art).
3. **Drie behandelblokken**, om en om gespiegeld (AC #2): 1.1fr/0.9fr met
   tekstkaart links en foto rechts, blok 2 omgekeerd. Elke kaart: eyebrow,
   h2 40px, alinea, bullets met `Sparkle` (de gouden ✦), feitenregel met duur en
   prijs, en een eigen `BookingButton` "Boek nu" (AC #4).
   Foto's: `rozeAmandelRingen` (IMG_1516), `bordeauxGlitter` (IMG_8747),
   `nailartSmileys` (IMG_0354) — allemaal al in het manifest.
4. **Drie statkaarten** — 4 weken · 7 dagen (blush-200, `Card tone="arch"`) ·
   Advies, via `StatBlock`. Het ontwerp zet het cijfer op 38px waar `StatBlock`
   44px doet; component krijgt daarvoor een `size`-prop (zelfde soort uitbreiding
   als `sizeLg` op `SectionHeading` in TASK-7.2).
5. **CTA-band** — `CtaBand`, titel "Step into luxury, walk out with style",
   label "Plan jouw afspraak!".
6. Footer uit `Base` + `StickyBookingBar`.

## Duur en prijs (AC #3)

Het Behandelingen-ontwerp toont zelf geen duur en geen prijs per groep; alleen
de nail art-bullets noemen bedragen. AC #3 en PRD §8.4 eisen ze wél als platte
tekst. Daarom krijgt elk blok een feitenregel onder de bullets, met een hairline
erboven — dezelfde vorm als de voetregel van `ServiceCard`. Dit is een bewuste,
kleine uitbreiding op het ontwerp.

Waarden uitsluitend uit het handoff-pakket, niets verzonnen:

| Groep | Duur | Prijs | Bron |
|---|---|---|---|
| Nagelversteviging | 90 – 120 min | €60 – €80 | duur: mobiele render home (90/120 min); prijs: Prijzen.dc.html |
| Gellak | 60 min | €35 – €55 | idem |
| Nail art | tijd wordt ingepland bij je afspraak | €7,50 – €35 | Prijzen.dc.html ("Nail art wordt per set geprijsd — de tijd plan ik gewoon voor je in.") |

De definitieve duur in minuten moet nog van Vera komen (TASK-4 AC #1). Dat komt
als TODO in het databestand te staan.

## Content collection

AC #3 vraagt dat duur en prijs uit de content collection komen; die bestaat nog
niet (TASK-8, geblokkeerd door TASK-4). In plaats van de home/Over mij-aanpak
(constanten in de pagina) komt hier alvast één collection:
`src/content.config.ts` met `treatments`, geladen met de `file()`-loader uit
`src/content/treatments.yaml` — één bestand, één regel per prijswijziging (de
randvoorwaarde uit PRD §5.5). Schema: `order`, `eyebrow`, `title`, `intro`,
`bullets[]`, `duration`, `price`, `photo` (sleutel uit `src/data/images.ts`).
TASK-8 breidt dit uit met `prices`, `portfolio`, `reviews` en `faq`.

## Kopstructuur

Eén h1 (hero). De introkaart en de drie behandeltitels worden h2 (in het
prototype spans). De statkaarten krijgen een `sr-only` h2 omdat het ontwerp die
sectie geen kop geeft — zelfde oplossing als bij de stappenband en het
fotoraster. `CtaBand` levert zijn eigen h2.

## Copy

Letterlijk uit de desktoprender (PRD §5.5). Waar de mobiele render korter is,
wint desktop — zelfde besluit als 7.1 en 7.2.

## Verificatie

- `npm run check` en `npm run build` schoon.
- Desktop: headless render op 1280 én 1920px, sectie voor sectie tegen de
  linkerrender; blokhoogtes met een DOM-script meten (de PhotoFrame-les uit 7.2).
- Mobiel: de iframe-harness op 390px, `clientWidth`/`scrollWidth` als
  overflow-meting.
- Copy automatisch vergelijken met het prototype.
- Duur en prijs in de gebouwde HTML terugvinden als platte tekst.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
**De eerste content collection staat er.** AC #3 vraagt dat duur en prijs uit een content collection komen; die bestond nog niet (TASK-8, geblokkeerd door TASK-4). In plaats van de aanpak van 7.1 en 7.2 — constanten in de pagina, later verhuizen — is `treatments` nu gebouwd: `src/content.config.ts` met de `file()`-loader op `src/content/treatments.yaml`. Eén bestand, één regel per prijswijziging, precies de randvoorwaarde uit PRD §5.5. TASK-8 zet daar `prices`, `portfolio`, `reviews` en `faq` naast en hoeft dit niet over te doen.

Twee details voor wie dat oppakt: `z` komt uit `astro/zod`, want de re-export uit `astro:content` is in Astro 7 afgeschreven. En de fotosleutel is een `z.enum` over de sleutels van `src/data/images.ts`, zodat een typefout de build breekt in plaats van stil een gat te laten.

**Duur en prijs staan wel op de pagina, maar het ontwerp geeft ze niet.** De Behandelingen-render toont per groep geen duur en geen prijs; alleen de nail art-bullets noemen bedragen. AC #3 en PRD §8.4 eisen ze wél. Elk blok heeft daarom een feitenregel onder de bullets gekregen, met een hairline erboven — dezelfde vorm als de voetregel van `ServiceCard`. Een `<dl>` met Duur en Prijs, zodat de koppeling tussen label en waarde ook zonder opmaak klopt.

De waarden komen uit het handoff-pakket, er is niets verzonnen: prijzen uit `Prijzen.dc.html` (samengevat tot het bereik per groep), duur uit de mobiele render van de home (90 / 120 / 60 min). Nail art heeft geen duur — de prijzenpagina zegt daarover 'de tijd plan ik gewoon voor je in', dus daar staat 'Per set ingepland'.

Dit blijft een afgeleide, geen bevestigd feit. TASK-4 AC #1 haalt de definitieve minuten bij Vera op; er staat een TODO bovenin `treatments.yaml` die daarnaar verwijst.

**Hero: dezelfde valkuil als bij Over mij, maar erger op mobiel.** `nagels-nude-kort-glans` is linksonder licht, precies waar het tekstblok staat. Met alleen het verloop uit het ontwerp bleef de h1 op 1,2:1 steken en was de gouden eyebrow praktisch onzichtbaar. Twee extra scrims toegevoegd; de onderste is op mobiel zwaarder (70% vanaf de onderrand) omdat de foto daar anders wordt bijgesneden en het lichte deel dan juist achter de tekst valt.

Gemeten per glyph tegen de foto eronder, niet op het oog: desktop eyebrow 5,0 · h1 4,8 · intro 7,3; mobiel 7,2 · 4,8 · 7,5. De meetmethode — de pagina twee keer renderen, één keer met het tekstblok op `visibility:hidden`, en de glyphpixels uit het verschil halen — is bruikbaar voor Portfolio en Contact, waar ook witte tekst op een foto staat.

**Twee afwijkingen van het ontwerp, allebei bewust.**

De statkaarten (4 weken · 7 dagen · Advies) staan ook op mobiel; de mobiele render laat ze weg. Dat zijn precies de feiten waar §8.4 om vraagt, en verbergen betekent dat ze wél in de DOM staan. Zelfde afweging als bij het fotoraster op Over mij.

De inhoudskolom is 1120px breed en niet de 1200px van het prototype: `max-w-site` (1200) is inclusief de gutter van 2 × 40px. Dat is hoe home en Over mij al staan; consistentie tussen de pagina's weegt hier zwaarder dan 80px.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## Wat er staat

`/behandelingen/` uit "Editorial Frames", op beide breakpoints. Van boven naar beneden: hero van 460px met de zwevende navigatie → introkaart met drie chips → drie behandelblokken, om en om gespiegeld, elk met bullets, een feitenregel met duur en prijs en een eigen "Boek nu" → drie statkaarten (4 weken · 7 dagen · Advies) → CTA-band "Step into luxury, walk out with style" → footer. Op mobiel alles gestapeld, hero 400px, foto boven de kaart, sticky boekbalk onderaan.

De FAQ die hier onderaan bij komt is TASK-10.

## Verificatie

| Criterium | Bewijs |
|---|---|
| #1 Desktop komt overeen | Headless render op 1280px. Gemeten: hero 1248 × 460, inhoudskolom 1120 gecentreerd, kolomverdeling 607/497 (1.1fr/0.9fr), h1 62px, behandelkoppen 40px, introkop 28px, statcijfers 38px. Ook op 1920px gecontroleerd: geen overflow, hero houdt stand |
| #1 Mobiel komt overeen | Echte 390px-render. `clientWidth = scrollWidth = 390`, nul elementen buiten het viewport, hero 400px, h1 38px, foto 280px boven elke kaart |
| #1 Copy letterlijk | 59 van de 65 tekstfragmenten uit de desktoprender automatisch teruggevonden in de build. De zes die overblijven zijn footerregels die de gedeelde `Footer` anders formatteert — identiek op home en Over mij, dus geen regressie van deze taak |
| #2 Afwisselend gespiegeld | Gemeten x-posities: blok 1 kaart op 80 / foto op 703, blok 2 foto op 80 / kaart op 593, blok 3 kaart op 80 / foto op 703 |
| #3 Duur en prijs als platte tekst | In `dist/behandelingen/index.html`: "90 – 120 min / €60 – €80", "60 min / €35 – €55", "Per set ingepland / €7,50 – €35" — in een `<dl>`, geen afbeelding, geen JavaScript |
| #3 Uit de content collection | `getCollection('treatments')` leest `src/content/treatments.yaml` via de `file()`-loader; de pagina bevat geen enkele prijs of duur |
| #4 Boek-CTA per blok | Zes `data-booking-cta`-links op de pagina: drie keer "Boek nu" (één per blok), plus header, CTA-band en sticky balk. Alle zes met de Salonized-URL, `target="_blank" rel="noopener"` |
| Kopstructuur | Eén h1, daarna h2's; de statkaarten hebben een `sr-only` h2 omdat het ontwerp die sectie geen kop geeft |
| Contrast in de hero | Per glyph gemeten tegen de foto eronder — desktop 5,0 / 4,8 / 7,3 · mobiel 7,2 / 4,8 / 7,5 |

`astro check` 0 errors / 0 warnings / 0 hints, build schoon.

## De eerste content collection

AC #3 vraagt om een content collection en die bestond nog niet. `treatments` staat er nu: `src/content.config.ts` met de `file()`-loader op één YAML-bestand. Dat is de randvoorwaarde uit PRD §5.5 — een prijswijziging is één regel in één bestand, zonder de opmaak aan te raken. TASK-8 zet `prices`, `portfolio`, `reviews` en `faq` ernaast en hoeft dit niet over te doen.

## Toegevoegd aan het ontwerp

Het Behandelingen-ontwerp toont per groep géén duur en géén prijs, terwijl AC #3 en PRD §8.4 ze eisen. Elk blok heeft daarom een feitenregel onder de bullets gekregen, in de vorm van de voetregel van `ServiceCard`. De waarden komen uit het handoff-pakket zelf: prijzen uit `Prijzen.dc.html`, duur uit de mobiele render van de home.

## Uitbreiding aan het design system

`StatBlock` heeft een `size`-prop (`d44` standaard, `d38` voor deze pagina). Home en stijlgids blijven op 44px — gecontroleerd in de render.

## Wat nog open staat

- **De behandelduur is afgeleid, niet bevestigd.** 90–120 / 60 minuten komen uit het ontwerp, niet van Vera. TASK-4 AC #1 haalt de definitieve minuten op; er staat een TODO bovenin `treatments.yaml`.
- Twee bewuste afwijkingen: de statkaarten staan ook op mobiel (het ontwerp laat ze daar weg — het zijn feiten, geen decoratie), en de inhoudskolom is 1120px in plaats van 1200px, zoals op home en Over mij.
- Onveranderd: mobiele navigatiedrawer is TASK-9, structured data TASK-12, de eindaudit TASK-15.
<!-- SECTION:FINAL_SUMMARY:END -->
