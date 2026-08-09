---
id: TASK-7.4
title: Pagina 'Prijzen' bouwen
status: Done
assignee:
  - '@claude'
created_date: '2026-08-08 08:40'
updated_date: '2026-08-09 05:54'
labels:
  - paginas
  - geo
milestone: m-0
dependencies: []
documentation:
  - design_handoff_nailsbyvera/Prijzen.dc.html
modified_files:
  - src/pages/prijzen.astro
  - src/content/prices.yaml
  - src/content.config.ts
  - src/components/PriceGroup.astro
  - src/content/treatments.yaml
parent_task_id: TASK-7
priority: medium
type: feature
ordinal: 12000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Doel is de volledige tarieven tonen, zonder verrassingen. Naast bezoekers is dit ook de pagina waar AI-assistenten prijsvragen uit beantwoorden, dus de bedragen moeten als leesbare tekst in de HTML staan.

Ontwerp: `design_handoff_nailsbyvera/Prijzen.dc.html`.

Opbouw: hero van 420px. Vier prijskaarten in een 2×2-raster: Biab/Hard gel/Acrylgel, Nail art, Gellak, en Overige services. Elke regel heeft het label links (gewicht 300, 16px) en de prijs rechts (display 22px), gescheiden door een hairline-rand. Daaronder drie infokaarten. Afsluitend een CTA-band "Ook zo enthousiast?".

De prijzen komen uit de content collection, niet hardgecodeerd — een tariefwijziging moet één regel zijn.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 De pagina komt visueel overeen met beide renders van het ontwerp
- [x] #2 Alle prijzen komen uit de prices-collection
- [x] #3 Prijzen staan als platte tekst in de HTML, niet in een afbeelding
- [x] #4 De CTA-band loopt via de BookingButton-component
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Aanpak

`src/pages/prijzen.astro` (→ `/prijzen/`), volledig compositie uit bestaande
componenten. `PriceGroup` bestaat al sinds TASK-6 en dekt de prijskaart precies
zoals het ontwerp hem tekent: kop 30px, label 16px links, prijs 22px display
rechts, hairlines ertussen, in een `<dl>`.

## Opbouw desktop

1. **Hero** — blush-band met 16px padding rondom een kader van 420px, radius 32.
   Foto `photos.nudeWitteSwirls` (slot `pr-hero` = 2024/07/IMG_0121), verloop uit
   het ontwerp plus de twee scrims die op Over mij en Behandelingen ook nodig
   bleken. Eyebrow "Prijzen", h1 62px "Nagelbehandelingen", intro eronder.
   Mobiel 400px / 38px.
2. **Tarieven** — 2×2-raster van vier `PriceGroup`s (Biab / Hard gel / Acrylgel ·
   Nail art · Gellak · Overige services), `items-start` zodat een korte kaart
   niet meerekt met de lange ernaast. Mobiel onder elkaar.
3. **Drie infokaarten** — Altijd vooraf duidelijk · 7 dagen garantie (blush-200,
   `Card tone="arch"`) · Betalen. Kop 32px desktop, 26px mobiel.
4. **CTA-band** — `CtaBand` met "Ook zo enthousiast?" en knop "Boek jouw
   naildate", dus via `BookingButton` (AC #4).
5. Footer uit `Base` + `StickyBookingBar`.

## Collection (AC #2)

`prices` komt naast `treatments` in `src/content.config.ts`, geladen met de
`file()`-loader uit `src/content/prices.yaml`. Vier groepen met `order`, `title`,
`rows[{label, price, note?}]` en een optionele voetnoot per groep. De pagina
bevat daarmee geen enkel bedrag.

`PriceGroup` krijgt er één prop bij: `note`, voor de regel onder de nail
art-kaart ("Nail art wordt per set geprijsd — de tijd plan ik gewoon voor je
in."). Het ontwerp zet die in ink-400; dat wordt ink-600, dezelfde correctie als
bij de meta-regel van `ServiceCard` in TASK-6.

## Kopstructuur

Eén h1 (hero), daarna h2 per prijskaart (`level={2}` op `PriceGroup`) en h2 per
infokaart. Geen `sr-only` kop nodig: elke kaart heeft in het ontwerp al een
echte kop.

## Copy

Letterlijk uit de desktoprender (PRD §5.5), inclusief de schrijfwijze van de
bedragen (€75 – €80, euroteken zonder spatie).

## Verificatie

- `npm run check` en `npm run build` schoon.
- Desktop 1280 en 1920: maten en posities met een DOM-script meten.
- Mobiel 390: overflow-meting via `clientWidth`/`scrollWidth`.
- Contrast in de hero per glyph meten tegen de foto eronder.
- Alle 21 prijsregels als `<dt>`/`<dd>`-paar uit de gebouwde HTML halen en
  vergelijken met het prototype.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
**De snelste pagina tot nu toe, omdat `PriceGroup` al klopte.** Het component uit TASK-6 dekt de prijskaart van het ontwerp precies: kop 30px, label 16px, prijs 22px display, hairlines, en een `<dl>` zodat de koppeling tussen behandeling en bedrag ook zonder opmaak overeind blijft. Eén prop toegevoegd (`note`) voor de voetnoot onder de nail art-kaart; verder niets aangepast.

**Het 2×2-raster staat op `items-start`.** De nail art-kaart heeft zeven regels, de andere vier of vijf. Zonder `items-start` rekt elke kaart mee met de langste in zijn rij en ontstaat er witruimte onder de korte tarieven. Het prototype doet hetzelfde (`align-items:start`), dus dit is het ontwerp volgen, niet ervan afwijken.

**Prijzen staan nu op twee plekken — bewust, met een waarschuwing.** `prices.yaml` heeft alle 21 losse regels; `treatments.yaml` heeft per behandelgroep het bereik (€60 – €80) voor de feitenregel op de behandelingenpagina. Automatisch afleiden lijkt aantrekkelijk maar gaat mis: een groep bevat ook regels als '+ Reparatie tijdens behandeling, vanaf €2,50', en die hoort niet in het bereik van een nieuwe set. Er staat daarom een expliciete waarschuwing bovenin `treatments.yaml`: wie een tarief wijzigt, controleert daar of het bereik nog klopt. Iets voor TASK-8 om nog eens tegen het licht te houden.

**Hero: derde pagina, derde keer dezelfde scrims.** `nagels-nude-witte-swirls` is opnieuw licht op de plek waar de tekst staat. Dezelfde twee scrims als op Behandelingen toegepast, en het resultaat is ruimer dan daar — desktop eyebrow 4,6 · h1 8,3 · intro 8,6; mobiel 6,4 · 9,4 · 8,9. Dat het patroon zich nu drie keer herhaalt is een signaal: bij Portfolio en Contact (TASK-7.5, 7.6) hoort dit standaard gecontroleerd te worden, en het is de moeite waard om er bij de audit (TASK-15) naar te kijken als een eigen hero-component.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## Wat er staat

`/prijzen/` uit "Editorial Frames", op beide breakpoints: hero van 420px → de vier prijskaarten in een 2×2-raster (Biab / Hard gel / Acrylgel · Nail art · Gellak · Overige services) → drie infokaarten (Altijd vooraf duidelijk · 7 dagen garantie · Betalen) → CTA-band "Ook zo enthousiast?" → footer. Op mobiel alles onder elkaar.

Alle 21 tarieven komen uit de nieuwe collection `prices`; de pagina bevat geen enkel bedrag.

## Verificatie

| Criterium | Bewijs |
|---|---|
| #1 Desktop komt overeen | Headless render op 1280px. Gemeten: hero 1248 × 420, kaarten 552 breed op x 80 en 648, h1 62px, kaartkoppen 30px, labels 16px, prijzen 22px, infokoppen 32px, CTA-kop 46px. Ook op 1920px: geen overflow |
| #1 Mobiel komt overeen | Echte 390px-render. `clientWidth = scrollWidth = 390`, nul elementen buiten het viewport, hero 400px, h1 38px, kaartkoppen 30px, infokoppen 26px |
| #1 Copy letterlijk | 78 van de 84 tekstfragmenten uit de desktoprender teruggevonden in de build; de zes die overblijven zijn footerregels die de gedeelde `Footer` anders formatteert — identiek op de andere pagina's, dus geen regressie |
| #2 Uit de prices-collection | `getCollection('prices')` leest `src/content/prices.yaml` via de `file()`-loader. `src/pages/prijzen.astro` bevat geen enkel euroteken |
| #3 Platte tekst | 21 `<dt>`/`<dd>`-paren uit `dist/prijzen/index.html` gehaald en één voor één vergeleken met het prototype — labels en bedragen identiek, inclusief de reeksen "€75 – €80" en de komma-notatie "€12,50". Geen afbeelding, geen JavaScript |
| #4 CTA via BookingButton | Drie `data-booking-cta`-links: header, CTA-band ("Boek jouw naildate") en sticky balk, alle drie met de Salonized-URL en `target="_blank" rel="noopener"` |
| Kopstructuur | Eén h1, daarna h2 per prijskaart en per infokaart. Geen `sr-only` kop nodig — elke kaart heeft in het ontwerp al een echte kop |
| Contrast in de hero | Per glyph gemeten tegen de foto eronder — desktop 4,6 / 8,3 / 8,6 · mobiel 6,4 / 9,4 / 8,9 |

`astro check` 0 errors / 0 warnings / 0 hints, build schoon.

## Wijziging aan een bestaand component

`PriceGroup` heeft een `note`-prop gekregen voor de voetnoot onder de nail art-kaart. Het ontwerp zet die regel in ink-400 (3,06:1); hier staat ink-600, dezelfde correctie als bij de meta-regel van `ServiceCard` in TASK-6 — een toelichting bij een prijs is een feit dat mensen lezen, geen decoratie.

## Let op bij een tariefwijziging

De bedragen staan op twee plekken: `prices.yaml` heeft alle losse regels, `treatments.yaml` het bereik per behandelgroep voor de feitenregel op de behandelingenpagina. Automatisch afleiden gaat mis omdat een groep ook bijkomende regels bevat ("+ Reparatie, vanaf €2,50"). Er staat een waarschuwing bovenin `treatments.yaml`; iets voor TASK-8 om nog eens te bekijken.

## Wat nog open staat

- Onveranderd: mobiele navigatiedrawer TASK-9, structured data (waaronder `Offer`-markup op deze prijzen) TASK-12, eindaudit TASK-15.
- Het scrim-patroon in de hero is nu drie pagina's op rij hetzelfde. Bij Portfolio en Contact standaard controleren; mogelijk kandidaat voor een eigen hero-component bij de audit.
<!-- SECTION:FINAL_SUMMARY:END -->
