---
id: TASK-9
title: >-
  Interactieve onderdelen bouwen: mobiel menu, portfoliofilter en sticky
  boekbalk
status: Done
assignee:
  - '@claude'
created_date: '2026-08-08 08:58'
updated_date: '2026-08-09 07:23'
labels:
  - interactie
  - toegankelijkheid
milestone: m-0
dependencies:
  - TASK-7
documentation:
  - docs/PRD.md
modified_files:
  - src/components/Header.astro
  - src/components/StickyBookingBar.astro
  - src/layouts/Base.astro
  - src/pages/portfolio.astro
  - src/styles/global.css
priority: medium
type: feature
ordinal: 16000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
De site is vrijwel volledig stateloos. Dit zijn de drie uitzonderingen, samen ondergebracht omdat ze allemaal de kleine hoeveelheid client-side JavaScript op de site vormen en dezelfde kwaliteitseisen delen.

1. Mobiel menu — op schermen onder 768px bestaat de header uit logo, "Boeken"-knop en een hamburger die een drawer opent. De drawer moet sluiten met Escape, bij een klik buiten de drawer en bij navigatie. Zolang hij open is, blijft de focus erbinnen.

2. Portfoliofilter — pill-chips die de zichtbare afbeeldingen filteren op het category-veld, zonder paginalading. "Alles" is de standaardstand. Belangrijk: zonder JavaScript moeten alle afbeeldingen zichtbaar zijn en de filterrij verborgen. De pagina mag nooit leeg of stuk lijken als het script niet laadt.

3. Sticky boekbalk — op mobiel een meescrollende balk onderaan met de primaire boek-CTA in een `--ink-900` pill. Loopt via de BookingButton-component.

Toegankelijkheid is hier geen sluitpost: dit zijn de enige onderdelen op de site waar toetsenbord- en schermlezergedrag niet vanzelf goed gaat.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Het mobiele menu opent en sluit met muis én toetsenbord, sluit op Escape en bij klik buiten, en houdt de focus vast zolang het open is
- [x] #2 Het portfoliofilter filtert zonder paginalading op het category-veld
- [x] #3 Met JavaScript uitgeschakeld zijn alle portfolio-afbeeldingen zichtbaar en is de filterrij verborgen
- [x] #4 De sticky boekbalk verschijnt alleen onder 768px en overlapt geen content aan de onderkant van de pagina
- [x] #5 Alle drie de onderdelen zijn volledig met het toetsenbord te bedienen en hebben een zichtbare focus-indicator
- [x] #6 De totale hoeveelheid client-side JavaScript blijft onder de 10 kB
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Uitgangspunten uit de bestaande code

- `Header.astro` rendert nu logo + nav (`hidden lg:block`) + `BookingButton`. De
  hamburger ontbreekt bewust; de comment verwijst al naar deze taak.
- `portfolio.astro` heeft de filterrij al staan als `<button data-filter="…">`
  met `aria-pressed`, in een `<div data-portfolio-filter>`.
- `StickyBookingBar.astro` bestaat al en wordt door alle zes contentpagina's
  aangeroepen, maar staat op `lg:hidden` (= onder 1024px) terwijl PRD §5.1 en
  AC #4 onder 768px voorschrijven. De spacer staat bovendien binnen `<main>`,
  dus onderaan de pagina dekt de balk de footer alsnog af.
- Er staat nog geen enkele `<script>` in `src/`. Dit wordt de eerste client-side
  JS van de site.

## Aanpak

### 1. Progressive enhancement als mechanisme (global.css + Base.astro)

Eén inline scriptje in de `<head>` zet `js` op `<html>`. In `global.css`:
`html:not(.js) [data-js-only] { display: none }` (specificiteit 0,2,0 — wint van
een Tailwind-utility zonder `!important`). Dit dekt AC #3 zonder flits of
layoutsprong, en dekt meteen ook de hamburger: een knop die zonder JS niets doet
hoort er niet te staan.

### 2. Mobiel menu (Header.astro)

- Hamburger naast de boekknop, `lg:hidden`, `data-js-only`, met
  `aria-expanded`/`aria-controls`. Vorm uit de mobiele render: pill met
  `bg-white/16`, blur, drie lijnen 18/18/12px. Tweede variant in `ink-900` voor
  de solide header.
- Drawer als `fixed inset-0 z-50` binnen `<header>`, met overlay en een paneel
  rechts (`role="dialog" aria-modal="true"`), gesloten via het `hidden`-attribuut.
- Floating header van `z-30` naar `z-50`, anders schildert de sticky boekbalk
  (`z-40`) over de drawer heen.
- Script (~40 regels): openen/sluiten, Escape, klik op de overlay, klik op een
  link in het paneel, `pageshow` (bfcache), focus naar het paneel en terug naar
  de hamburger, Tab-trap over de focusbare elementen, `overflow:hidden` op body
  zolang hij open is.

### 3. Portfoliofilter (portfolio.astro)

- `data-js-only` op de filterrij.
- Chips gelijktrekken: de handoff geeft actief en inactief dezelfde maat
  (13px, padding 8px 16px vs 8px 14px + 1px rand). De huidige "Alles" is groter
  dan de render. Alle chips krijgen dus dezelfde basisklassen en de actieve staat
  loopt via de `aria-pressed:`-variant van Tailwind — geen klassenwisseling in JS
  en geen reflow bij het filteren.
- Script (~15 regels): klik zet `aria-pressed` en toont/verbergt de tegels op
  `data-category`. De tegels hebben dat attribuut al.

### 4. Sticky boekbalk (StickyBookingBar.astro)

- `lg:hidden` → `md:hidden` (AC #4, PRD §5.1).
- De in-flow spacer eruit; in plaats daarvan onder 768px
  `body:has([data-sticky-booking]) { padding-bottom: 80px }`. Die ruimte valt dan
  ná de footer in plaats van ervoor, waardoor de balk ook helemaal onderaan de
  pagina niets afdekt.

## Verificatie

`astro check` + build, daarna in de browser op 390px: openen/sluiten met muis en
toetsenbord, Escape, klik buiten, focus-trap rondlopen, filteren, en de pagina
met JavaScript uit. Tot slot de totale JS in `dist/` meten voor AC #6.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## De valkuil van deze taak: cascade-lagen gaan vóór specificiteit

Het verbergen-zonder-JavaScript stond eerst in `@layer base`, met de redenering
dat `html:not(.js) [data-js-only]` (0,2,0) wint van een utility als `.flex`
(0,1,0). Dat klopt binnen één laag, maar niet ertussen: een laag die later komt
wint van elke selector in een eerdere laag, hoe specifiek ook. De filterrij bleef
daardoor gewoon staan zonder JavaScript — zichtbaar in de eerste no-JS-test, niet
in de code.

De regels staan nu búiten elke `@layer`. Ongelaagde CSS staat boven alle lagen,
dus ook boven Tailwinds utilities, en er is geen `!important` nodig. Wie hier
later iets aan toevoegt: dit is de reden dat die twee regels onderaan het bestand
buiten de laagstructuur hangen.

## Hoe er getest is

Het venster van de testbrowser bleef op 1728px staan, hoe vaak het ook geresized
werd. Een viewport van 390px kwam er alsnog door de pagina in een `<iframe>` van
390px te laden: media queries kijken naar de iframe-viewport, en omdat het
dezelfde origin is, kan er ook echt in gescript worden. Toetsaanslagen en kliks
gingen wél via de echte muis en het echte toetsenbord, zodat de focus-trap en de
Enter/Escape-afhandeling niet met synthetische events zijn afgevinkt.

Twee dingen om te weten als iemand dit nadoet:

- Voor het no-JS-geval is een kopie van `dist/portfolio/index.html` gebruikt met
  alle `<script>`-tags eruit. Een `<iframe sandbox>` (die JavaScript ook uitzet)
  rendert in deze opstelling helemaal niets — daar is geen tijd in gestoken.
- In een tab die niet op de voorgrond staat, staan CSS-animaties stil op frame 0.
  De drawer meet dan `translateX(100%)` en lijkt buiten beeld te staan. Met
  `element.getAnimations().forEach(a => a.finish())` is de eindstand alsnog te
  meten. Bij een echte gebruiker speelt dit niet: die klikt in een tab die vóór
  staat.

## Twee dingen meegenomen die strikt genomen buiten de opsomming vielen

- De sticky boekbalk stond op `lg:hidden` (onder 1024px) terwijl PRD §5.1 en
  AC #4 onder 768px voorschrijven. Nu `md:hidden`. Tussen 768 en 1024 is de
  boek-CTA in de header bereikbaar.
- De filterchips zijn gelijkgetrokken. "Alles" stond op `px-5 py-[10px] text-b14`
  terwijl de handoff alle chips op 13px met 8px verticale padding tekent; het
  verschil tussen actief en inactief zit daar alleen in de kleur en in 16px vs
  14px horizontale padding (de actieve chip heeft geen rand). Zonder die
  gelijktrekking zou de rij bij elke filterklik verspringen.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## De drie interactieve onderdelen staan

De site had tot nu toe geen enkele regel client-side JavaScript. Dit zijn de
eerste twee scripts, samen 1,93 kB op de zwaarste pagina, allebei zo gebouwd dat
de pagina zonder JavaScript nog steeds klopt.

### Mobiel menu (`Header.astro`)

Onder de lg-breakpoint staat er nu een hamburger naast de boekknop, in de vorm
uit de mobiele render (drie lijnen 18/18/12px in een glasmorph-pill op de hero,
met een hairline-variant op de solide balk). Daarachter zit een drawer aan de
rechterkant met de volledige navigatie, een boekknop en het telefoonnummer.

Hij sluit op Escape, op een klik naast het paneel, op de sluitknop en zodra er
genavigeerd wordt — dat laatste ook bij terugkeer uit de bfcache. Zolang hij open
staat blijft de focus in het paneel, scrollt de pagina eronder niet mee en gaat
de focus bij sluiten terug naar de hamburger. Groeit het venster tijdens het
openstaan voorbij lg, dan sluit hij zichzelf; anders zou de pagina vergrendeld
achterblijven achter een drawer die daar niet meer bestaat.

De zwevende header ging van `z-30` naar `z-50`: die vormt een eigen stapelcontext
en zonder die verhoging schilderde de sticky boekbalk (`z-40`) over de open
drawer heen.

### Portfoliofilter (`portfolio.astro`)

De chips filteren de tegels op hun `data-category`, zonder paginalading. De
actieve staat loopt via `aria-pressed` en de gelijknamige Tailwind-variant, dus
het script wisselt geen klassen — het zet alleen het attribuut dat de
schermlezer toch al nodig heeft.

### Sticky boekbalk (`StickyBookingBar.astro`)

Van `lg:hidden` naar `md:hidden`, zoals PRD §5.1 voorschrijft. De spacer die in
de pagina stond is vervangen door `body:has([data-sticky-booking])` met 80px
padding onder de md-breakpoint: die ruimte valt ná de footer in plaats van
ervoor, waar hij niets oploste.

### Progressive enhancement (`Base.astro` + `global.css`)

Eén inline regel in de `<head>` zet `js` op `<html>`; `[data-js-only]` verdwijnt
zonder die klasse. Dat dekt de filterrij én de hamburger, en het verdwijnt vóór
de eerste paint in plaats van erna. De regel staat búiten elke `@layer`, en dat
is geen slordigheid maar noodzaak — zie de implementatienotities.

## Verificatie

`astro check`: 0 errors / 0 warnings / 0 hints. Alles hieronder is in een echte
browser gemeten, op een viewport van 390px, met echte muis- en toetsaanslagen.

| Criterium | Bewijs |
|---|---|
| #1 Menu opent/sluit, Escape, klik buiten, focus vast | Klik en Enter openen hem (`aria-expanded` volgt mee). 10× Tab landt weer op het eerste element, Shift+Tab vanaf het eerste springt naar het laatste, en de focus blijft in beide richtingen binnen het paneel. Escape sluit hem, zet de focus terug op de hamburger en heft de scrollvergrendeling op. Een klik op de overlay sluit hem ook. Een klik op "Contact" sloot de drawer en leverde `/contact/` op met de drawer dicht |
| #2 Filtert zonder paginalading | Klik op "Gellak": 4 tegels zichtbaar, 8 verborgen, `location.pathname` onveranderd. Klik op "Nail art": 5 tegels. Terug naar "Alles": alle 12 weer zichtbaar |
| #3 Zonder JavaScript | `/portfolio/` met alle `<script>`-tags eruit: filterrij `display:none`, hamburger `display:none`, en alle 12 tegels zichtbaar |
| #4 Boekbalk alleen onder 768px, geen overlap | Gemeten op 390 / 767 / 768 / 1023 / 1024px: balk en de 80px bodypadding bestaan op 390 en 767 en zijn weg vanaf 768. Helemaal onderaan `/portfolio/` eindigt de copyrightregel op y=420 en begint de balk op y=436 — 16px ertussen |
| #5 Toetsenbord en zichtbare focus | Menu volledig met het toetsenbord bediend (zie #1); de chips zijn per Tab bereikbaar en Enter activeert ze. De koraal focusring is op beide met een uitsnede vastgelegd |
| #6 Onder de 10 kB | Geen enkel los `.js`-bestand in `dist/`; Astro zet beide scripts inline. Zwaarste pagina (portfolio) 1976 bytes = 1,93 kB, de rest 1449 bytes |

Geen console-errors op enige geteste pagina.

## Wat een reviewer moet weten

- Tussen 768 en 1024px is de hamburger óók zichtbaar. Dat moet: de
  desktopnavigatie verschijnt pas vanaf lg, dus zonder hamburger heeft een tablet
  daar helemaal geen menu. De boekbalk verdwijnt daar wél, want de boekknop staat
  in de header.
- De drawer heeft geen sluitanimatie. Hij gaat dicht met het `hidden`-attribuut
  en dat kent geen uitloop. Een animatie erbij vraagt om een tweede toestand in
  de opmaak; dat leek de winst niet waard.
- De focus gaat bij openen naar het logo in het paneel, het eerste focusbare
  element. Als dat bij de audit onlogisch blijkt, is de sluitknop het alternatief.
<!-- SECTION:FINAL_SUMMARY:END -->
