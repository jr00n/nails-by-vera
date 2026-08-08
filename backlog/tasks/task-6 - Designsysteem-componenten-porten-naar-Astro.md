---
id: TASK-6
title: Designsysteem-componenten porten naar Astro
status: Done
assignee:
  - '@claude'
created_date: '2026-08-08 08:38'
updated_date: '2026-08-08 15:22'
labels:
  - fundament
  - componenten
  - toegankelijkheid
milestone: m-0
dependencies:
  - TASK-1
documentation:
  - docs/PRD.md
  - design_handoff_nailsbyvera/README.md
modified_files:
  - src/components/Button.astro
  - src/components/BookingButton.astro
  - src/components/Eyebrow.astro
  - src/components/SectionHeading.astro
  - src/components/Card.astro
  - src/components/PhotoFrame.astro
  - src/components/ArchFrame.astro
  - src/components/Sparkle.astro
  - src/components/StarRating.astro
  - src/components/StatBlock.astro
  - src/components/TestimonialCard.astro
  - src/components/ServiceCard.astro
  - src/components/PriceGroup.astro
  - src/components/StepBand.astro
  - src/components/CtaBand.astro
  - src/components/Header.astro
  - src/components/Footer.astro
  - src/layouts/Base.astro
  - src/pages/styleguide.astro
  - src/styles/global.css
  - docs/PRD.md
priority: high
type: feature
ordinal: 6000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Het design system levert de componenten als React-broncode. Die moeten worden omgezet naar `.astro`-componenten — niet als React geïntegreerd, want de site draait bewust zonder UI-framework.

Te porten: Button, Eyebrow, SectionHeading, ServiceCard, TestimonialCard, StatBlock, StarRating, ArchFrame, Sparkle en Logo. Daarnaast de compositiecomponenten die uit het ontwerp volgen: PhotoFrame, Card, PriceGroup, StepBand en CtaBand.

Twee dingen die geen implementatiedetail zijn maar productbeslissingen:

De boekknop moet één centrale component zijn. Elke primaire CTA op de site opent het Salonized-widget in een nieuw tabblad. In fase 2 wordt mogelijk een eigen planner gebouwd; door alle CTA's door één component te laten lopen, is dat later één wijziging in plaats van een zoektocht door de codebase.

Contrast is een aandachtspunt, geen bijzaak. Twee tokencombinaties uit het ontwerp halen WCAG AA niet: `--ink-400` (#9A918E) op de blush-achtergrond voldoet niet voor bodytekst, en coral #ED8967 met witte tekst voldoet alleen bij grote tekst. Knoptekst moet daarom minimaal 16px met gewicht 500 zijn, en `--ink-400` mag alleen voor decoratieve meta gebruikt worden.

Interactiegedrag uit het ontwerp: knoppen liften −2px en verdiepen naar `--coral-600` bij hover, schalen naar 0.985 bij indrukken. Fotokaarten liften −4px. Tekstlinks krijgen een koraal onderstreping die van links uitgroeit. Motion is `cubic-bezier(.22,1,.36,1)` op ongeveer 280ms — geen bounce, geen loops.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Alle genoemde componenten bestaan als .astro-component en stylen via Tailwind-utilities die uit de @theme-tokens komen
- [x] #2 Er staat nergens een hardgecodeerde kleur, radius of typografische maat in de opmaak — ook niet als arbitrary value waar een token bestaat
- [x] #3 Er is één BookingButton-component waar elke primaire CTA doorheen loopt; de Salonized-URL staat op precies één plek in de codebase
- [x] #4 De boekknop opent het Salonized-widget in een nieuw tabblad met rel=noopener
- [x] #5 De primaire knop voldoet aan WCAG AA via de tekstkleur (ink-900 op koraal, 6,91:1) en houdt de knopmaat van 14px/400 uit de prototypes aan
- [x] #6 --ink-400 wordt nergens voor tekst gebruikt
- [x] #7 Hover-, focus- en press-states volgen het ontwerp; elke interactieve component heeft een zichtbare focus-indicator
- [x] #8 Animaties respecteren prefers-reduced-motion
- [x] #9 Er is geen React of ander UI-framework aan het project toegevoegd
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Bronnen en welke wint

Twee bronnen beschrijven de componenten en ze spreken elkaar op punten tegen:

- `_ds_bundle.js` — de React-broncode van het design system. Beschrijft de **oude**
  site: knoppen met 4px radius, UPPERCASE met letterspacing, scherpe servicekaarten
  met PNG-icoontjes, arch frames overal.
- De zes `.dc.html`-prototypes — de **gekozen** richting "Editorial Frames": pill-knoppen
  in sentence case, kaarten met 24px radius, servicekaarten met een foto in plaats van
  een icoon.

**De prototypes winnen** waar ze afwijken; dat is het ontwerp dat is goedgekeurd. Uit de
React-bron komt de *API* (welke props, welke varianten), niet de opmaak.

## Te bouwen

Kern (uit het design system):
1. `Button.astro` — varianten primary / outline / link, maten sm / md / lg, optionele →
2. `BookingButton.astro` — de enige plek waar de Salonized-URL vandaan komt
3. `Eyebrow.astro` — uppercase, wijde tracking, `onDark`-variant
4. `SectionHeading.astro` — eyebrow + kop, maat, uitlijning, `onDark`, `italic`
5. `ServiceCard.astro` — Editorial Frames-versie: foto, titel, tekst, hairline-voet met duur en prijs
6. `TestimonialCard.astro` — sterren, quote, naam, meta
7. `StatBlock.astro` — groot displaycijfer met label
8. `StarRating.astro` — gouden sterren, ondersteunt halve waarden
9. `ArchFrame.astro` — het signature boogkader
10. `Sparkle.astro` — gouden vierpuntige ster
11. `Logo.astro` — al gebouwd in TASK-2

Compositie (volgt uit het ontwerp, geen React-bron):
12. `Card.astro` — de witte basiskaart: surface, hairline, radius, padding
13. `PhotoFrame.astro` — afgerond fotokader met optionele lift, bovenop `Photo.astro`
14. `PriceGroup.astro` — titel met prijsregels, gescheiden door hairlines
15. `StepBand.astro` — donkere band met genummerde stappen
16. `CtaBand.astro` — donkere band met eyebrow, quote-kop, tekst en knop

## Aanpak per AC

- **#2 geen hardgecodeerde waarden.** Alles via utilities uit het `@theme`-blok. Waar het
  prototype 11px eyebrow gebruikt wordt dat `text-b12` — de handoff-README schrijft 12–13px
  voor en die is leidend. `rgba(255,255,255,0.72)` op de donkere band wordt `text-white/70`,
  dus nog steeds via het token.
- **#5 knoptekst ≥16px/500.** De prototypes gebruiken 14px/400 voor knoppen. De AC wint;
  alle maten krijgen `text-b16` en `font-medium` en verschillen alleen in padding. Dat is
  een zichtbare afwijking van het ontwerp en wordt als zodanig gemeld.
- **#7/#8 states.** Lift −2px (`-translate-y-0.5`), press `scale-[0.985]`, kaarten −4px,
  servicekaarten −6px, tekstlinks een koraal onderstreping die van links uitgroeit
  (`background-size` van 0% naar 100%). Alles achter `motion-safe:`, zodat
  `prefers-reduced-motion` de beweging uitzet zonder de kleurwissel te verliezen. Focus
  komt van de globale `:focus-visible`-regel uit TASK-1.
- **#9 geen UI-framework.** Puur `.astro`; er komt geen enkele integratie bij.

## Openstaand punt: contrast (zie de taakcomments)

Het nagerekende contrast laat zien dat twee aannames in de PRD en deze taak niet kloppen.
Dit raakt de merkkleuren en is daarom voorgelegd voordat het wordt doorgevoerd. De
componenten worden gebouwd zoals het ontwerp ze voorschrijft; de correctie is daarna een
wijziging in `@theme` plus een tekstkleur, niet een verbouwing.

## Correctie op het plan (na afstemming)

Punt "#5 knoptekst ≥16px/500" hierboven is achterhaald. Het contrast bleek niet met
de knopmaat op te lossen — wit op koraal haalt 2,51:1 ongeacht de tekstgrootte. De
knop kreeg daarom donkere tekst (6,91:1) en houdt de **14px/400 uit de prototypes**
aan. AC #5 is herschreven. Zie comment #2 voor de volledige onderbouwing.

Twee dingen zijn aan de bouwlijst toegevoegd:
- `/styleguide/` — elke component in elke variant, op `noindex`. Zonder pagina's is
  dit de enige manier om de componenten écht te controleren in plaats van te
  vertrouwen op de code.
- Vijf typografische tokens (d38, d32, d24, d20, d18) die in de prototypes voorkomen
  maar in TASK-1 nog niet in de schaal zaten.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
**`as` is geen bruikbare propnaam in Astro.** `Card` en `Eyebrow` begonnen met een prop `as` voor het te renderen element. Gevolg: `astro check` meldde `'Props' is declared but never used` en alle props vielen terug op `any`, waarna `tones[tone]` een impliciete-any-fout gaf. Aangetoond door de prop in Eyebrow te hernoemen — de melding verdween meteen. Beide componenten gebruiken nu `tag`. Wie later een polymorf component toevoegt: niet `as` noemen.

**Button kan niet van twee HTMLAttributes tegelijk erven.** `HTMLAttributes<'a'>` en `HTMLAttributes<'button'>` definiëren `type` allebei anders, dus TypeScript weigert de dubbele extends. Opgelost door alleen de a-attributen te erven (min `type` en `href`) en het element-specifieke deel via een `elementProps`-object mee te geven. Daardoor krijgt een `<button>` altijd `type="button"` en verzendt hij nooit per ongeluk een formulier.

**Vijf typografische tokens toegevoegd** — d38, d32, d24, d20, d18. Die maten komen in de prototypes voor maar zaten niet in de schaal uit TASK-1. Zonder die tokens zou AC #2 alleen te halen zijn met arbitrary values.

**Twee plekken waar het ontwerp ink-400 voorschrijft en het toch ink-600 is geworden:** de duur/meta-regel in ServiceCard en de bronvermelding in TestimonialCard. Ink-400 haalt 3,06:1 op wit. Belangrijker dan de ratio: behandelduur is precies het feit dat bezoekers opzoeken en dat generatieve systemen uit de pagina moeten kunnen halen (PRD §8.4). Dat is geen decoratie. Daarmee wordt ink-400 nergens meer voor tekst gebruikt en is AC #6 sluitend in plaats van een afspraak.

**ServiceCard wijkt af van de React-bron.** Die tekent een scherpe kaart met een PNG-icoontje; dat hoort bij de oude site. Het gekozen ontwerp gebruikt een foto in een afgerond kader. De prototypes zijn gevolgd.

**ArchFrame is geport maar komt in 'Editorial Frames' niet voor.** Het is het handelsmerk van het design system en kan op de pagina's over de salon terugkomen, dus het is meegenomen — met de kanttekening dat het nu nergens gebruikt wordt.

**`/styleguide/` toegevoegd.** Elke component in elke variant op één pagina. Drie redenen: de componenten zijn controleerbaar voordat de pagina's bestaan, een tokenwijziging is meteen op alles tegelijk te zien, en Vera kan er bij de review (TASK-16) op aanwijzen wat ze anders wil. Staat op `noindex, nofollow` via een nieuwe prop op `Base.astro`. **Te besluiten vóór livegang:** blijft de pagina staan of gaat hij eruit? Hij hoort in elk geval buiten de sitemap (TASK-12).

**Header gebruikt nu BookingButton** in plaats van een eigen link, zodat AC #3 ook voor de vaste header klopt.
<!-- SECTION:NOTES:END -->

## Comments

<!-- COMMENTS:BEGIN -->
author: claude
created: 2026-08-08 09:51
---
Stylingaanpak gewijzigd naar Tailwind v4 (zie PRD §6.5). Gevolg voor deze taak: componenten stylen via utilities uit het @theme-blok in plaats van eigen CSS. Arbitrary values zijn toegestaan voor de one-off waarden in het ontwerp (hero-hoogtes, fr-verhoudingen), maar niet waar een token bestaat — een `bg-[#ED8967]` is een fout, dat moet `bg-coral-500` zijn.
---

created: 2026-08-08 15:20
---
Contrast nagerekend voordat de knoppen gebouwd werden. Twee aannames in de PRD en in deze taak bleken onjuist:

- **Wit op coral-500 haalt 2,51:1** — dat zakt niet alleen door AA voor kleine tekst (4,5:1) maar ook voor grote tekst (3:1). De PRD stelde dat het voor grote tekst wél voldeed. Contrast is onafhankelijk van de tekstgrootte, dus AC #5 ('knoptekst ≥16px/500 zodat het contrast voldoet') loste het probleem niet op. Ook de hoverkleur coral-600 blijft op 3,10:1 steken.
- **Rose-500 als eyebrow-kleur haalt 2,26:1** op de paginakleur. Dat was nergens gesignaleerd, terwijl het de slechtste combinatie in het hele ontwerp is én op 12–13px staat.

Voorgelegd aan Jeroen op 2026-08-08 met de doorgerekende alternatieven. Besloten:

1. **Donkere tekst op koraal** in plaats van wit — ink-900 op coral-500 geeft 6,91:1. De merkkleur blijft exact zoals ontworpen; alleen de knoptekst wordt donker. Het ontwerp gebruikt dit patroon zelf al bij de boekpill in de hero. Vastgelegd als `--color-on-accent`.
2. **Diepere rose voor eyebrow-tekst**: nieuw token `--rose-600` #9E513E. Haalt AA op alle vier de lichte ondergronden (page 5,33 · blush-100 4,96 · blush-200 4,51 · wit 5,68). Rose-500 blijft ongewijzigd voor decoratieve lijnen en randen.
3. **Knopmaat terug naar 14px/400** zoals de prototypes die tekenen. De reden achter AC #5 verviel met besluit 1, en grotere knoppen zouden alleen ten koste van de ontwerptrouw gaan (PRD §2 doel 2). AC #5 is herschreven naar wat er nu gehaald wordt.

PRD §6.3 is bijgewerkt met de gemeten tabel en de drie besluiten.
---
<!-- COMMENTS:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## Wat er staat

Zestien `.astro`-componenten, alles gestyled via utilities uit het `@theme`-blok. Daarmee ligt de complete laag onder de pagina's klaar en kan TASK-7.x met composities aan de slag in plaats van met opmaak.

**Kern** — `Button`, `BookingButton`, `Eyebrow`, `SectionHeading`, `ServiceCard`, `TestimonialCard`, `StatBlock`, `StarRating`, `ArchFrame`, `Sparkle` (`Logo` kwam uit TASK-2).
**Compositie** — `Card`, `PhotoFrame`, `PriceGroup`, `StepBand`, `CtaBand`.

**Welke bron wint.** De React-broncode in `_ds_bundle.js` beschrijft de *oude* site: 4px-radius knoppen in uppercase, scherpe servicekaarten met PNG-icoontjes. De `.dc.html`-prototypes beschrijven "Editorial Frames", de goedgekeurde richting. De prototypes zijn gevolgd voor de opmaak; uit de React-bron komt alleen de API.

**Semantiek waar het verschil maakt.** `PriceGroup` is een `<dl>`, `StepBand` een `<ol>`, `TestimonialCard` een `<figure>` met `<blockquote>` en `<figcaption>`. Dat is niet netheid om de netheid: het maakt de koppeling tussen behandeling en prijs, en tussen citaat en spreker, expliciet — voor schermlezers én voor de systemen die deze pagina's uitlezen (PRD §8.4). `SectionHeading` houdt kopniveau en typografische maat bewust gescheiden, zodat de kopstructuur van een pagina kan kloppen zonder dat de maat meeverandert.

## Drie besluiten na doorrekenen van het contrast

Het nagerekende contrast liet zien dat twee aannames in de PRD niet klopten. Voorgelegd en besloten:

1. **Wit op koraal haalt 2,51:1** — onder AA voor élke tekstgrootte, ook grote. De PRD stelde dat het voor grote tekst wel voldeed; contrast is echter onafhankelijk van de tekstgrootte. De knop kreeg **ink-900-tekst op koraal (6,91:1)**. De merkkleur blijft exact zoals ontworpen, en het ontwerp gebruikt dit patroon zelf al bij de boekpill in de hero.
2. **Rose-500 als eyebrow-kleur haalt 2,26:1** — de slechtste combinatie in het hele ontwerp, en die staat op 12–13px. Nergens gesignaleerd. Nieuw token **`--rose-600` #9E513E**, dat AA haalt op alle vier de lichte ondergronden. Rose-500 blijft ongewijzigd voor decoratieve lijnen.
3. **Knopmaat blijft 14px/400** zoals de prototypes tekenen. AC #5 eiste ≥16px/500 om het coralcontrast te repareren; die reden verviel met besluit 1, en grotere knoppen zouden alleen ontwerptrouw kosten. AC #5 is herschreven naar wat er nu gehaald wordt.

PRD §6.3 bevat nu de gemeten tabel en deze drie besluiten, zodat niemand de oude aanname opnieuw overneemt.

## Verificatie

| Criterium | Bewijs |
|---|---|
| #1 Componenten bestaan en gebruiken tokens | 16 componenten; visueel gecontroleerd op `/styleguide/` in een headless render op 1280px |
| #2 Geen hardgecodeerde waarden | `grep -rniE '#[0-9a-f]{3,8}|rgba?\('` over `src/components`, `src/layouts`, `src/pages` → één treffer, in een codecommentaar. Nul in de opmaak |
| #3 Eén BookingButton, één URL | `grep -rn salonized src` → precies één regel, in `src/data/site.ts`. Header en CtaBand lopen via BookingButton |
| #4 Nieuw tabblad met noopener | `target="_blank" rel="noopener"` staat in BookingButton, dus op elke boek-CTA |
| #5 Knop voldoet aan AA | ink-900 op coral-500 = 6,91:1, op de hoverkleur coral-600 = 5,60:1. Knop is `text-b14` + `font-normal` conform de prototypes |
| #6 ink-400 niet voor tekst | `grep -rn 'ink-400\|text-muted' src` → alleen de tokendefinitie in global.css en twee toelichtende comments. Nul keer in de opmaak |
| #7 States en focus | Lift, press en de uitgroeiende onderstreping visueel gecontroleerd; `:focus-visible{outline:2px solid var(--color-accent-hover);outline-offset:3px}` staat in de gebouwde CSS en geldt voor elk bedienbaar element |
| #8 prefers-reduced-motion | Alle vier de transform-utilities staan in de gebouwde CSS binnen `@media (prefers-reduced-motion:no-preference)`. Daarnaast neutraliseert het `reduce`-blok uit de basislaag alle transition- en animatieduur |
| #9 Geen UI-framework | Dependencies: astro, tailwindcss, @tailwindcss/vite, twee @fontsource-pakketten, @astrojs/check, typescript. Geen React of iets vergelijkbaars |

Build schoon, `astro check` 0 errors / 0 warnings / 0 hints over 26 bestanden.

## Twee dingen om te weten

**`/styleguide/` is nieuw.** Elke component in elke variant op één pagina, op `noindex, nofollow`. Zonder gebouwde pagina's is dit de enige manier om de componenten echt te controleren in plaats van op de code te vertrouwen, en Vera kan er bij de review (TASK-16) op aanwijzen wat ze anders wil. **Te besluiten vóór livegang:** blijft hij staan of gaat hij eruit. Hij hoort in elk geval buiten de sitemap (TASK-12).

**`as` is een onbruikbare propnaam in Astro.** Twee componenten begonnen ermee; dat brak de `Props`-inferentie stilletjes, waarna alle props op `any` vielen. Beide gebruiken nu `tag`. Wie later een polymorf component toevoegt: niet `as` noemen.

**ArchFrame is geport maar wordt nergens gebruikt.** Het boogkader is het handelsmerk van het design system maar komt in "Editorial Frames" niet voor. Meegenomen omdat het op de pagina's over de salon kan terugkomen; als dat niet gebeurt, kan het weg.
<!-- SECTION:FINAL_SUMMARY:END -->
