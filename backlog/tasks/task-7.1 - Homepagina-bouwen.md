---
id: TASK-7.1
title: Homepagina bouwen
status: Done
assignee:
  - '@claude'
created_date: '2026-08-08 08:39'
updated_date: '2026-08-08 16:15'
labels:
  - paginas
milestone: m-0
dependencies: []
documentation:
  - design_handoff_nailsbyvera/Editorial Frames.dc.html
modified_files:
  - src/pages/index.astro
  - src/components/Header.astro
  - src/components/Footer.astro
  - src/components/StickyBookingBar.astro
  - src/components/Chip.astro
  - src/components/Card.astro
  - src/components/ServiceCard.astro
  - src/layouts/Base.astro
parent_task_id: TASK-7
priority: high
type: feature
ordinal: 9000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
De belangrijkste pagina en meteen de zwaarste: hij dekt het merendeel van de componenten af, waardoor de rest daarna sneller gaat. Doel van de pagina is eerste indruk plus direct boeken.

Ontwerp: `design_handoff_nailsbyvera/Editorial Frames.dc.html`.

Opbouw desktop, van boven naar beneden:
- Hero met 16px blush-padding rondom een kaart van 720px hoog met radius 32px, full-bleed foto met verloop. Navigatie zweeft erbovenop als glasmorph-pill, titel linksonder, boekkaart rechtsonder.
- Titel "Nail care / is self care" in 86px display, tweede regel cursief.
- Bento-strip met drie kolommen: reviewkaart, "7 dagen" garantie, "1 op 1" privésalon.
- "Wat ik voor je doe": vier fotokaarten met titel, omschrijving, duur en prijs.
- Donkere stappenband met drie kolommen: Boek online, Kom langs, Geniet ervan.
- "Recent werk": vier-koloms raster, eerste tegel beslaat 2×2.
- "Hoi, ik ben Vera": foto links, kaart rechts met chips, koraal WhatsApp-kaart eronder.
- Footer met vier kolommen: logo en claim, menu, contact, openingstijden.

Mobiel: hero 520px, alles gestapeld op 12px gutter, servicekaarten in 2×2 met foto's van 96px en zonder bodytekst, en een sticky boekbalk onderaan.

De WhatsApp-kaart linkt naar wa.me met het salonnummer.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 De pagina komt op 1280px visueel overeen met de linkerrender van het ontwerp
- [x] #2 De pagina komt op 390px visueel overeen met de rechterrender van het ontwerp
- [x] #3 De hero-afbeelding is de LCP en laadt met hoge prioriteit
- [x] #4 De boekkaart in de hero en de sticky mobiele balk lopen beide via de BookingButton-component
- [x] #5 De WhatsApp-kaart opent een wa.me-link met het juiste nummer
- [x] #6 De footer toont contactgegevens en openingstijden uit de centrale bron, niet hardgecodeerd
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Aanpak

De pagina is opgebouwd uit de componenten uit TASK-6; er is vrijwel geen nieuwe
opmaak nodig geweest, alleen compositie. Volgorde: hero → bento-strip →
behandelkaarten → stappenband → recent werk → over Vera → footer.

**Structuur van de header.** Het ontwerp laat de navigatie over de hero zweven,
niet als losse balk erboven (PRD §5.2). Daarom heeft `Header.astro` er een
`floating`-variant bij gekregen en `Base.astro` een prop `header="none"`: de
pagina plaatst de navigatie dan zelf binnen haar hero. Dat geldt straks voor alle
zes contentpagina's; alleen 404, privacy en de stijlgids houden de vaste balk.

**De boekkaart in de hero.** Op desktop zweeft die rechtsonder ín de foto, op
mobiel staat hij eronder op de blush-ondergrond. Eén exemplaar in de HTML dat
alleen anders gepositioneerd wordt — twee exemplaren met een display-schakelaar
zou een dubbel geteld element opleveren bij de conversiemeting (PRD §8.1).

**Nieuwe componenten:** `StickyBookingBar.astro` (de meescrollende balk op
mobiel, inclusief de spacer die voorkomt dat hij de footer afdekt) en
`Chip.astro` (het pilletje met "Gecertificeerd", "HEMA-vrij"; komt ook terug op
Over mij en Behandelingen).

**Footer naar vier kolommen.** De prototypes tekenen op de home een compacte
footer van één regel; de handoff-README beschrijft vier kolommen. De README is
gevolgd, want dit is de footer van álle pagina's en één regel is te weinig voor
contact plus openingstijden. Gegevens komen uit `src/data/site.ts`.

## Meten op 390px

Headless Chrome op macOS dwingt een vensterbreedte van minimaal 500px af, dus
`--window-size=390` geeft geen echte 390px-render — het levert een 500px-pagina
op die tot 390px wordt bijgesneden, wat er precies uitziet als horizontale
overflow. Dat kostte een verkeerde diagnose.

De werkende methode: een pagina met een `<iframe width="390">` naar de site. Een
iframe krijgt wél een eigen viewport van exact die breedte. Same-origin kun je er
bovendien in meten:

```js
const doc = frame.contentDocument;
doc.documentElement.clientWidth;   // 390
doc.documentElement.scrollWidth;   // ook 390 = geen overflow
```

Voor een screenshot volstaat cross-origin (renderen mag, meten niet) — mits de
harness zelf over http geserveerd wordt; vanaf `file://` blokkeert Chrome de
http-iframe. Deze methode is hergebruikbaar voor TASK-7.2 t/m 7.7 en TASK-15.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
**Waar het ontwerp zichzelf tegenspreekt, en wat er gekozen is**

1. *Meta-regel op de behandelkaarten.* De desktoprender zet daar "Nieuwe set / Nieuwe set / Nieuwe set / vanaf", de mobiele render "90 min / 120 min / 60 min / p/nagel". Één slot, twee waarden. Gekozen voor de duur, omdat PRD §8.4 expliciet benoemt dat de huidige site nérgens vermeldt hoe lang een afspraak duurt terwijl "hoe lang duurt gellak" een typische vraag is. Drie keer "Nieuwe set" voegt daar niets aan toe.
2. *Footer.* Prototype toont één regel, README beschrijft vier kolommen. README gevolgd — zie het plan.
3. *Mobiele copy is korter* dan de desktopcopy ("Eén klant tegelijk, in mijn eigen salon" vs de volledige zin). Eén HTML-pagina kan maar één tekst hebben; de desktopversie is aangehouden, want dat is de volledige copy.

**Toegevoegd wat niet in het ontwerp staat**

- Een `sr-only` h2 "Zo werkt het" boven de stappenband. Die sectie heeft in het ontwerp geen kop, waardoor er een landmark zonder titel zou ontstaan. Onzichtbaar, maar de kopstructuur klopt er wél mee.
- `Card` heeft een `arch`-tone gekregen (blush-200 met rose-300 rand). Dat is wat het prototype voor de "7 dagen"-kaart voorschrijft; TASK-6 had alleen blush-100.
- De "Stuur me gerust een appje"-regel op de koraalkaart erft ink-900 in plaats van het wit uit het ontwerp — dezelfde 2,51:1-correctie als bij de knoppen (TASK-6).
- Servicekaart-titel is op mobiel 20px in plaats van 22px, conform het prototype. Bij 22px liep "Nagelversteviging" tot tegen de rand van de smalle kaart.

**Valkuil bij het meten op 390px** — zie het implementatieplan. Headless Chrome op macOS rendert nooit smaller dan 500px; een screenshot op `--window-size=390` is dus een bijgesneden 500px-pagina en lijkt sprekend op horizontale overflow. Ik heb daar eerst een half uur naar een niet-bestaande bug gezocht. De iframe-methode uit het plan geeft wel een echte 390px-viewport.

**Navigatie op mobiel ontbreekt nog in de header.** Het ontwerp toont daar logo + boekknop + hamburger; de drawer achter die hamburger is TASK-9. Er staat bewust geen niet-werkende knop. Tot TASK-9 af is, loopt de navigatie op mobiel via de footer — die is compleet. Kort noemen bij de review met Vera als zij eerder meekijkt.

**De hero-tekst staat op een foto.** Wit op een donker verloop is niet te meten met een contrasttool en Lighthouse controleert het niet. Bij de audit (TASK-15) met het blote oog beoordelen, in elk geval op een telefoon in de zon.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## Wat er staat

De homepagina uit "Editorial Frames", op beide breakpoints. Vrijwel volledig samengesteld uit de componenten van TASK-6 — er was nauwelijks nieuwe opmaak nodig, wat de belofte van die taak bevestigt: de vijf resterende pagina's zijn hierna vooral compositie.

Opbouw: hero met zwevende navigatie, boekkaart en de titel "Nail care / *is self care*" → bento-strip met review, "7 dagen" en "1 op 1" → vier behandelkaarten → donkere stappenband → "Recent werk" in een 4×2-raster met een 2×2-tegel linksboven → "Hoi, ik ben Vera" met chips en de koraal WhatsApp-kaart → footer in vier kolommen.

**Twee structurele toevoegingen die alle volgende pagina's raken.** `Header.astro` heeft een `floating`-variant gekregen en `Base.astro` een prop `header="none"`, zodat een pagina de navigatie zelf over haar hero kan plaatsen — dat is de vorm op alle zes contentpagina's (PRD §5.2). En `StickyBookingBar.astro` regelt de meescrollende boekbalk op mobiel, inclusief de spacer die voorkomt dat hij de footer afdekt.

**De boekkaart bestaat één keer in de HTML.** Op desktop zweeft hij rechtsonder in de foto, op mobiel staat hij eronder — hetzelfde element, alleen anders gepositioneerd. Twee exemplaren met een display-schakelaar zouden bij de conversiemeting dubbel tellen (PRD §8.1).

## Verificatie

| Criterium | Bewijs |
|---|---|
| #1 Desktop komt overeen | Headless render op 1280px van de productiebuild, sectie voor sectie vergeleken met de linkerrender: hero 720px met radius 32px, nav-pill, boekkaart 340px rechtsonder, bento 3 kolommen, 4 behandelkaarten, stappenband, 4×2-raster met 2×2-tegel, Vera-blok op 1.1fr/0.9fr |
| #2 Mobiel komt overeen | Echte 390px-render via een iframe-harness: hero 520px met de boekkaart eronder, behandelkaarten 2×2 met foto's van 96px en zonder bodytekst, stappenband gestapeld, sticky boekbalk onderaan |
| Geen horizontale scroll | Gemeten in het iframe: `clientWidth=390`, `scrollWidth=390`, nul elementen buiten het viewport |
| #3 Hero is LCP met prioriteit | Eerste `<img>` in de DOM: `loading="eager" fetchpriority="high"`, 2560×1440 met srcset. De rest `loading="lazy"` |
| #4 Boek-CTA's via BookingButton | Drie CTA's (header, hero-kaart, sticky balk), alle drie met `data-booking-cta`, `target="_blank"` en `rel="noopener"`. De Salonized-URL staat nog steeds op één plek |
| #5 WhatsApp | `<a href="https://wa.me/31636079000" target="_blank" rel="noopener">` |
| #6 Footer uit centrale bron | Adres, telefoon, e-mail, Instagram en openingstijden komen uit `src/data/site.ts`; niets hardgecodeerd |
| Kopstructuur | Eén h1, daaronder h2's per sectie en h3's voor de behandelkaarten |
| Copy letterlijk | 20 zinnen automatisch vergeleken met het prototype — allemaal identiek |

Build schoon, `astro check` 0 errors / 0 warnings / 0 hints.

## Keuzes waar het ontwerp zichzelf tegensprak

**De meta-regel op de behandelkaarten.** Desktop zegt "Nieuwe set" (drie keer) en "vanaf"; mobiel zegt "90 min / 120 min / 60 min / p/nagel". Eén slot, twee waarden. De duur gekozen, omdat PRD §8.4 er expliciet op wijst dat de huidige site nérgens vermeldt hoe lang een afspraak duurt terwijl dat een van de meest gestelde vragen is. Drie keer "Nieuwe set" voegt daar niets aan toe.

**De footer.** Prototype toont één regel, de handoff-README beschrijft vier kolommen. README gevolgd: dit is de footer van álle pagina's en één regel is te weinig voor contact plus openingstijden.

**Mobiele copy is korter dan desktop.** Eén HTML-pagina kan maar één tekst hebben; de volledige desktopcopy is aangehouden.

## Wat nog open staat

**Navigatie op mobiel ontbreekt in de header.** Het ontwerp toont daar een hamburger; de drawer erachter is TASK-9. Er staat bewust geen niet-werkende knop. Tot dan loopt de navigatie op mobiel via de footer, die compleet is. Als Vera eerder meekijkt, is dit het eerste wat ze zal opmerken.

**De hero-tekst staat op een foto.** Wit op een donker verloop is niet met een contrasttool te meten en Lighthouse controleert het niet. Bij de audit (TASK-15) met het blote oog beoordelen, op een telefoon in de zon.

**Teksten staan nog als constanten in de pagina.** Ze verhuizen naar content collections in TASK-8; de reviewtekst is een voorbeeldtekst uit het prototype en moet vervangen worden door een echte Google-review (R5).

## Voor de volgende pagina's

Headless Chrome op macOS rendert nooit smaller dan 500px, dus `--window-size=390` levert een bijgesneden 500px-pagina op die er precies uitziet als horizontale overflow. Dat kostte hier een verkeerde diagnose. De werkende methode — een `<iframe width="390">` in een over http geserveerde harness — staat in het implementatieplan en is direct herbruikbaar voor TASK-7.2 t/m 7.7 en TASK-15.
<!-- SECTION:FINAL_SUMMARY:END -->
