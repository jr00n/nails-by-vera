---
id: TASK-21
title: >-
  Salonized-boekwidget embedden: zwevende knop op desktop, overlay vanaf elke
  boek-CTA
status: Done
assignee: []
created_date: '2026-08-09 17:23'
updated_date: '2026-08-09 17:33'
labels:
  - boeken
  - conversie
  - privacy
milestone: m-0
dependencies:
  - TASK-9
references:
  - 'https://static-widget.salonized.com/loader.js'
  - 'https://www.nailsbyvera.nl/'
documentation:
  - docs/PRD.md
priority: high
type: feature
ordinal: 28000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
De huidige WordPress-site heeft op elke pagina rechtsonder een zwevende Salonized-knop ("Maak afspraak") die het boekformulier in een overlay opent. Die ontbreekt in het handoff-ontwerp en op de nieuwe site. Hij moet terug, want hij is de enige plek waar een bezoeker kan boeken zonder de site te verlaten: `BookingButton` springt nu naar salonized.com in een nieuw tabblad, terwijl PRD §5.1 juist stelt dat de bezoeker daarvoor niet weg hoort te gaan.

De embed op de huidige site is:

```html
<div class="salonized-booking" data-company="Rd8XQZ8eCoqnqj2zZe4CSHzJ"
     data-color="#ec7b54" data-language="nl" data-position="right" data-outline="shadow"></div>
<script src="https://static-widget.salonized.com/loader.js"></script>
```

**Gekozen vorm** (in overleg met Jeroen, 2026-08-09): de zwevende knop alleen op desktop, want daar is na de hero geen permanente boek-CTA meer — de header zweeft over de hero en scrollt weg. Op mobiel blijft de eigen sticky boekbalk staan en wordt de widget-knop verborgen; anders vallen ze over elkaar. Daarnaast openen de bestaande boek-CTA's het formulier als overlay in plaats van een nieuw tabblad.

**Gemeten gedrag van de widget** (Playwright, 2026-08-09) — dit is de context die de scope bepaalt:

- Twee requests, samen ~14,7 kB, uitsluitend naar `static-widget.salonized.com` en `widget.salonized.com`. Geen derde partijen.
- **Geen cookies**, niet bij het laden en niet bij het openen van het formulier.
- **Wél `localStorage.bookingUserDetails`**: de loader leest en schrijft dat zodra het formulier gebruikersgegevens teruggeeft. Dit raakt TASK-13 AC #2 rechtstreeks en moet in de privacyverklaring.
- De loader zet een `position: fixed` iframe met **z-index 2147480999**. De eigen sticky boekbalk staat op z-40 en verliest dus altijd.
- De loader luistert op elke klik op een `<a>` en reageert op de hash `#sz-booking-open` / `-close` / `-toggle`, en zet `window.szBooking` globaal met `showWidget()`. Daarmee kan elke bestaande knop het formulier openen zonder dat de zwevende knop overgenomen hoeft te worden.
- `data-color` bepaalt de knopkleur; de widget tekent daar witte tekst op. De waarde van de huidige site (#ec7b54) haalt met wit ongeveer 2,9:1 en blijft onder WCAG AA. Dat is in een third-party iframe niet te corrigeren, alleen via de meegegeven kleur.
- **Domeinbinding**: op een testdomein antwoordt het paneel met 403 Forbidden. De widget moet dus werken vanaf `nailsbyvera.nl` én vanaf het Vercel-previewdomein; als Salonized per domein whitelist, moet dat geregeld worden vóór de review van TASK-16.

Raakvlakken: TASK-13 (AC #2 over localStorage, en AC #4 — de conversiemeting meet nu een doorklik die straks een overlay wordt), TASK-15 (performance en toegankelijkheid), en de privacyverklaring uit TASK-7.7 die Salonized al als verwerker noemt.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 De zwevende Salonized-knop staat op desktop op de zes contentpagina's en niet op de 404, de privacyverklaring en de stijlgids
- [x] #2 Onder de md-breakpoint is de zwevende knop niet zichtbaar en staat alleen de eigen sticky boekbalk er, zonder overlap
- [x] #3 Elke bestaande boek-CTA opent het boekformulier als overlay op de site in plaats van een nieuw tabblad
- [x] #4 Zonder JavaScript, of wanneer het widget-script niet laadt, gaan alle boek-CTA's nog steeds naar de Salonized-boekpagina
- [x] #5 De site zet geen cookies met de widget geladen, en het gebruik van localStorage door Salonized is benoemd in de privacyverklaring
- [x] #6 De knopkleur haalt WCAG AA voor de tekst die de widget erop tekent
- [x] #7 Het boekformulier opent zonder 403 vanaf het previewdomein en is daarmee klaar voor de review
- [x] #8 De boekings-URL en de widget-configuratie staan in src/data/site.ts en niet verspreid door de opmaak
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Widget-configuratie bij `booking` in `src/data/site.ts` zetten: company-id, kleur, taal, positie. De
   `url` blijft staan als val-terug voor wanneer het script niet laadt.
2. `src/components/BookingWidget.astro`: de `.salonized-booking`-div plus de loader, en een klein
   inline script dat kliks op `[data-booking-cta]` — het attribuut dat `BookingButton` al zet —
   omleidt naar `window.szBooking.showWidget()`. Alleen omleiden als die er is, zodat de knop
   zonder script of zonder widget een gewone link naar de boekpagina blijft.
3. De zwevende knop onder de md-breakpoint verbergen met CSS op het knop-iframe
   (`iframe[src*="/button"]`, te onderscheiden van het paneel-iframe dat `/widget?` gebruikt).
   Nagaan of de loader daar inline styles overheen zet en zo nodig de specificiteit ophogen.
4. Kleur kiezen die met witte tekst AA haalt; de #ec7b54 van de huidige site haalt dat niet.
5. Component naast `StickyBookingBar` plaatsen op de zes contentpagina's, niet op 404,
   privacyverklaring en stijlgids.
6. De privacyverklaring uitbreiden met de localStorage van Salonized.
7. Verifiëren: geen cookies, knop weg op mobiel en aanwezig op desktop, overlay opent vanaf een
   eigen knop, val-terug werkt met het script geblokkeerd, en het paneel laden vanaf een
   origin `nailsbyvera.nl` om de 403 uit te sluiten.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
**Gebouwd** — `src/components/BookingWidget.astro`, plus `bookingWidget` in `src/data/site.ts`, op de zes contentpagina's naast `StickyBookingBar`.

**Twee dingen, bewust los van elkaar**

1. De zwevende knop rechtsonder, alleen op desktop.
2. Een klikafvanger op `[data-booking-cta]` — het attribuut dat `BookingButton` al zette — die het formulier als overlay opent.

**Keuzes**

- **De knop blijft een echte link.** De afvanger onderschept alleen als `window.szBooking` er daadwerkelijk is. Laadt het script niet (adblocker, geen netwerk, CDN plat), dan gebeurt er niets bijzonders en gaat de bezoeker naar de boekpagina. De voor de hand liggende route — `href="#sz-booking-open"`, waar Salonized zelf op luistert — is daarom niet gebruikt: dan is de href geen werkende URL meer en vervalt precies die val-terug. Modificatietoetsen en middelklik worden met rust gelaten.
- **Kleur `#1c1a19` in plaats van de `#ec7b54` van de huidige site.** De widget tekent witte tekst op `data-color` en dat haalt met #ec7b54 2,79:1. Geen enkele koraaltint uit het palet redt het (coral-500 2,51 · coral-600 3,10); pas ver buiten de merkkleur komt wit boven 4,5. Ink-900 haalt 17,34 en is precies wat de eigen sticky boekbalk en de CTA-band al doen, dus de knop leest als onderdeel van dezelfde site.
- **Verbergen op mobiel via de src van het iframe.** De loader hangt het aan `body` zonder class of id. `/button` is de knop, `/widget` het formulier dat erna opent — dat laatste moet op mobiel juist wél verschijnen, dus die twee mogen niet op één selector vallen. `!important` is nodig omdat de loader positie en afmetingen inline zet.

**Verificatie** (Playwright tegen de gebouwde dist, geserveerd alsof hij op het echte domein staat)

- **Desktop 1280**: zwevende knop zichtbaar op (1068, 833); sticky balk verborgen. Klik op een boek-CTA opent het formulier als overlay op de pagina, met de echte dienstenlijst erin.
- **Mobiel 390**: zwevende knop verborgen, sticky balk zichtbaar op (12, 780). Geen overlap. De overlay opent daar net zo goed.
- **Widget-script geblokkeerd**: geen knop, en de CTA navigeert gewoon naar de Salonized-boekpagina in een nieuw tabblad.
- **Zonder JavaScript**: `href` is `https://nailsbyvera.salonized.com/widget_bookings/new`.
- **Cookies**: nul, met de widget geladen én na het openen van het formulier. Bijvangst die de andere kant op wijst: bij de óúde route — doorklikken naar salonized.com — zet `widget.salonized.com` wél een `_dd_s`-cookie. De overlay is op dit punt dus schoner dan de doorklik die hij vervangt.
- **Previewdomein**: dezelfde dist geserveerd vanaf een fictief `nails-by-vera-abc123.vercel.app` werkt onveranderd. Salonized bindt de widget niet aan een domein; er hoeft niets gewhitelist te worden.
- `astro check` 0/0/0, build schoon, en de embed staat op precies de zes contentpagina's — niet op de 404, de privacyverklaring of de stijlgids.

**Over de 403 uit de taakomschrijving**

Die was een dwaalspoor van de meetopstelling, niet van de widget. Een headless browser krijgt van Salonized 403 op élk domein — ook op de echte, live nailsbyvera.nl, waar zelfs het knop-iframe "403 Forbidden" toonde. Met een gewone user-agent verdwijnt het overal. Er is dus niets te regelen met Salonized; wie dit later opnieuw meet, moet niet op deze 403 gaan zoeken.

**Privacyverklaring**

`/privacy/` klopte op twee punten niet meer en is bijgewerkt: boeken opent geen nieuw tabblad meer maar een venster op de site, en de bewering dat er niets op het apparaat wordt opgeslagen is vervangen door wat er echt gebeurt — Salonized bewaart naam en contactgegevens lokaal in de browser, maar pas als iemand zelf het formulier invult. De alinea over de cookiebanner benoemt nu waarom dat buiten de toestemmingsplicht valt in plaats van te doen alsof het er niet is.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
De Salonized-boekwidget van de huidige WordPress-site staat weer op de site, maar in twee delen die los van elkaar werken: de zwevende knop rechtsonder op desktop, en een klikafvanger die élke bestaande boek-CTA het formulier als overlay laat openen in plaats van naar een nieuw tabblad te springen. Dat tweede is de eigenlijke winst — PRD §5.1 stelt dat de bezoeker de site niet hoort te verlaten om te boeken, en dat deed hij tot nu toe wel.

**Gewijzigd**

- `src/components/BookingWidget.astro` (nieuw) — de embed, de klikafvanger en de CSS die de zwevende knop op mobiel weghaalt.
- `src/data/site.ts` — `bookingWidget` met company-id, kleur, taal en positie; `booking.url` blijft staan als val-terug.
- De zes contentpagina's — component naast `StickyBookingBar`. Niet op de 404, de privacyverklaring en de stijlgids.
- `src/pages/privacy.astro` — boeken opent geen nieuw tabblad meer, en de localStorage die Salonized gebruikt staat er nu in plaats van de bewering dat er niets op het apparaat komt.

**Keuzes met gevolgen**

- De boekknoppen blijven echte links; de klik wordt alleen onderschept als het widget-script daadwerkelijk geladen is. Daarom níét via `href="#sz-booking-open"`, waar Salonized zelf op luistert: dan is de href geen werkende URL meer en verdwijnt de val-terug.
- Knopkleur ink-900 in plaats van de #ec7b54 van de huidige site. De widget tekent witte tekst op die kleur en haalt dan 2,79:1; geen enkele koraaltint uit het palet komt boven 4,5. Ink-900 haalt 17,34 en is wat de sticky boekbalk en de CTA-band al doen.
- Op mobiel is de zwevende knop verborgen, want hij staat `position: fixed` met z-index 2147480999 en zou de eigen sticky balk (z-40) altijd overdekken.

**Getest**

Playwright tegen de gebouwde dist, geserveerd alsof hij op het echte domein draait. Desktop: knop zichtbaar, overlay opent met de echte dienstenlijst. Mobiel: knop weg, sticky balk zichtbaar, geen overlap, overlay opent. Script geblokkeerd of JavaScript uit: de CTA gaat gewoon naar de Salonized-boekpagina. Nul cookies in alle gevallen — waar de oude doorklik naar salonized.com juist wél een `_dd_s`-cookie zet. Vanaf een fictief `*.vercel.app`-domein werkt alles onveranderd, dus er hoeft niets gewhitelist te worden.

**Losse eindjes voor andere taken**

De 403 die in de taakomschrijving stond was een artefact van de headless browser, niet van de widget: de echte live site geeft hem net zo goed, en met een gewone user-agent verdwijnt hij overal. Er is niets te regelen met Salonized. Wat wel openstaat, staat in de opmerking bij TASK-13: AC #2 ("schrijft niets naar localStorage") is met deze widget niet meer letterlijk waar te maken en moet herschreven worden naar wat het echt wil bewaken, en AC #4 moet het conversie-event aan de klik op `[data-booking-cta]` hangen in plaats van aan een doorklik die er niet meer is.
<!-- SECTION:FINAL_SUMMARY:END -->
