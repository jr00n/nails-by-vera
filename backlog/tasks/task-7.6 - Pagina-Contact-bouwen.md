---
id: TASK-7.6
title: Pagina 'Contact' bouwen
status: Done
assignee:
  - '@claude'
created_date: '2026-08-08 08:53'
updated_date: '2026-08-09 06:29'
labels:
  - paginas
  - privacy
milestone: m-0
dependencies: []
documentation:
  - design_handoff_nailsbyvera/Contact.dc.html
modified_files:
  - src/pages/contact.astro
  - src/assets/kaart-salon-hengelo.png
  - src/data/images.ts
  - src/data/site.ts
  - src/components/Photo.astro
  - src/components/PhotoFrame.astro
parent_task_id: TASK-7
priority: medium
type: feature
ordinal: 14000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Doel is boeken, bereiken en vinden.

Ontwerp: `design_handoff_nailsbyvera/Contact.dc.html`.

Opbouw: hero van 440px. Eerste rij: een grote boekkaart die 60% breed is, plus een informatiekaart met telefoon, e-mail, Instagram en Facebook. Tweede rij: openingstijdenkaart en een kaartbeeld met adreskaart eronder. Afsluitend een CTA-band "Plan jouw route".

Belangrijke afwijking van het ontwerp, en een bewuste keuze: in het prototype is de kaart een fotoplaceholder, en de eerste gedachte was een Google Maps embed. Die embed zet echter cookies, wat een cookiebanner zou vereisen op een site die verder volledig cookievrij is — en hij kost Lighthouse-punten. In plaats daarvan komt er een statische kaartafbeelding met een duidelijke "Route beschrijving"-link naar Google Maps. De functionele behoefte van de bezoeker, de route vinden, is identiek.

Contactgegevens komen uit de centrale bron: telefoon als tel:-link, e-mail als mailto:-link, social als externe links. Adres: De Genestetstraat 41, Hengelo.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 De pagina komt visueel overeen met beide renders van het ontwerp
- [x] #2 De kaart is een statische afbeelding met routelink; er wordt geen Google Maps embed geladen
- [x] #3 De pagina zet geen enkele cookie en doet geen verzoek naar een externe host
- [x] #4 Telefoon en e-mail zijn klikbaar als tel: en mailto:
- [x] #5 Openingstijden en contactgegevens komen uit de centrale bron
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Aanpak

`src/pages/contact.astro` (→ `/contact/`), compositie uit bestaande componenten.
Het echte werk zit in twee dingen die geen ander scherm had: een statische
kaart zonder externe verzoeken, en alle gegevens uit één bron.

## Opbouw desktop

1. **Hero** — kader van 440px, foto `photos.nudeBuitenBankje` (slot `ct-hero` =
   2024/07/IMG_8717), verloop uit het ontwerp plus de scrims. Eyebrow "Contact",
   h1 62px. Mobiel 400px / 38px.
2. **Rij 1** — 1.15fr boekkaart (eyebrow, kop 40px, alinea, `BookingButton` lg
   plus een outline-knop naar WhatsApp) en 0.85fr informatiekaart met telefoon,
   e-mail, Instagram en Facebook als `<dl>`, waarde in display 22px.
3. **Rij 2** — 0.85fr openingstijdenkaart (eyebrow, kop 34px, alinea, de tijden
   als `<dl>` met een afsluitende regel voor de gesloten dagen) en 1.15fr een
   kolom met de kaart en daaronder de adreskaart met de routeknop.
4. **CTA-band** — "Plan jouw route" met `href`, zodat `CtaBand` een gewone knop
   maakt in plaats van een boekknop. Dit is de enige CTA op de site die niet
   naar Salonized gaat.
5. Footer uit `Base` + `StickyBookingBar`.

## De kaart (AC #2, #3)

Geen embed en geen externe host. Eenmalig 24 tegels van
`tile.openstreetmap.org` opgehaald op zoomniveau 17, gecentreerd op de
coördinaten die Nominatim voor De Genestetstraat 41 geeft (52.2646111,
6.8235258), aan elkaar geplakt tot één PNG van 1280 × 640 en opgeslagen als
`src/assets/kaart-salon-hengelo.png`. De speld is geen onderdeel van het beeld
maar een gepositioneerd element in het midden van het kader; de attributie
"© OpenStreetMap-bijdragers" staat rechtsonder in de kaart en is een voorwaarde
van de tegellicentie.

`Photo` krijgt een `quality`-prop, want op de standaardkwaliteit lopen de
straatnamen dicht. `images.ts` krijgt een optioneel `bron`-veld: niet al het
beeld komt meer uit de WordPress-bibliotheek.

## Eén bron voor de gegevens (AC #4, #5)

Telefoon, e-mail, adres, socials, openingstijden en de route-URL komen uit
`src/data/site.ts`. Nieuw daar: `contact.routeUrl` (Google Maps-routelink) en
`social.facebookHandle`. De Facebook-URL is nog onbekend (TASK-4 AC #8); zolang
die leeg is toont de kaart de naam zonder link.

De regel met gesloten dagen wordt afgeleid uit `openingHours` in plaats van
hardgecodeerd, zodat hij meeverandert als Vera er een dag bij neemt.

## Verificatie

- `npm run check` en `npm run build` schoon.
- Desktop 1280 en 1920, mobiel 390: maten en overflow met een DOM-script.
- AC #3 bewijzen door de gebouwde HTML en CSS af te zoeken op alles wat een
  verzoek veroorzaakt (`src`, `srcset`, `link href`, `iframe`, `url()`).
- `tel:` en `mailto:` uit de gebouwde HTML halen.
- Contrast in de hero per glyph tegen de foto eronder.
- Copy automatisch vergelijken met het prototype.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
**De kaart is zelf samengesteld uit OpenStreetMap-tegels.** Er bestaat geen gratis statische-kaart-API zonder sleutel die dit dekt — de endpoint van Wikimedia geeft 403 — dus zijn de tegels rechtstreeks opgehaald en aan elkaar geplakt: 24 tegels op zoomniveau 17, gecentreerd op 52.2646111, 6.8235258, samen 1280 × 640. Dat gebeurde één keer, op het moment dat de asset gemaakt werd; de bezoeker haalt niets op.

De coördinaten komen van Nominatim voor 'De Genestetstraat 41, Hengelo'. De speld is geen onderdeel van het beeld maar een element in het midden van het kader — zo blijft de kaart een gewone afbeelding en is de markering in merkkleur.

Attributie is verplicht onder de tegellicentie (CC-BY-SA, data ODbL) en staat rechtsonder in de kaart, met een link naar openstreetmap.org/copyright. De herkomst en het zoomniveau staan bij de afbeelding in `src/data/images.ts`, zodat de kaart later opnieuw te maken is.

**Twee kleine uitbreidingen die de kaart nodig had.** `Photo` heeft een `quality`-prop: op de standaardkwaliteit liepen de straatnamen dicht, met 80 zijn ze leesbaar (gecontroleerd op de gerenderde pagina). En `images.ts` heeft een optioneel `bron`-veld gekregen, met `wordpress` nu optioneel — niet al het beeld komt meer uit de WordPress-bibliotheek.

**De gesloten dagen worden afgeleid, niet getypt.** Het ontwerp zet er 'Ma, wo, vr & zo — Gesloten' neer. Die regel volgt nu uit `openingHours`: alle weekdagen die er niet in staan. Neemt Vera er een dag bij, dan klopt de regel vanzelf mee — en anders had je twee plekken die uit elkaar kunnen lopen.

De tijden zelf komen ook uit die bron en staan er daarom als '09:00 – 17:15' waar het prototype '9:00 – 17:15' schrijft. Consistentie met de footer en straks met de structured data weegt zwaarder dan die nul (PRD §8.3).

**Facebook staat er zonder link.** Het ontwerp toont 'vera-nagelstudio', maar het handoff-pakket geeft geen URL en `site.ts` heeft dat veld leeg (TASK-4 AC #8). De naam staat er nu als tekst; zodra de URL bekend is, wordt het vanzelf een link — de pagina kijkt of `social.facebook` gevuld is.

**Nominatim gaf ook de postcode: 7552 WK.** Dat is precies wat TASK-4 AC #7 nog mist. Niet ingevuld in `site.ts`: PRD §8.3 eist dat de schrijfwijze exact gelijk is aan die op het Google-bedrijfsprofiel, en dat is niet iets om uit een geocoder over te nemen. Wel gemeld, zodat het bij Vera alleen nog bevestigd hoeft te worden.

**Hero, vijfde pagina.** De h1 staat hier hoger in het kader dan op de andere pagina's — drie regels kop plus een lange intro — en juist daar zijn de scrims het zwakst. Op desktop is de onderste scrim daarom zwaarder gezet (50% tot 90% van de hoogte, tegen 45% tot 70% elders). Gemeten per glyph: desktop eyebrow 7,3 · h1 4,3 · intro 7,5; mobiel 11,3 · 3,8 · 6,8. De h1 haalt daarmee op beide breakpoints ruim de 3:1 die voor grote tekst geldt, maar dit is de krapste van de vijf pagina's — net als Portfolio iets voor de audit (TASK-15).
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## Wat er staat

`/contact/` uit "Editorial Frames", op beide breakpoints: hero van 440px → boekkaart plus informatiekaart → openingstijdenkaart plus de kaart met adreskaart eronder → CTA-band "Plan jouw route" → footer.

Alle gegevens komen uit `src/data/site.ts`. De kaart is een statisch beeld in de repo; de pagina laadt niets van buiten.

## Verificatie

| Criterium | Bewijs |
|---|---|
| #1 Desktop komt overeen | Headless render op 1280px: hero 1248 × 440, kolommen 635/469 in rij 1 en 469/635 in rij 2 (1.15fr/0.85fr, gespiegeld), h1 62px, koppen 40 / 30 / 34 / 46px. Ook op 1920px: geen overflow |
| #1 Mobiel komt overeen | Echte 390px-render: `clientWidth = scrollWidth = 390`, nul elementen buiten het viewport, hero 400px, h1 38px, kaart 240px |
| #1 Copy letterlijk | 54 van de 59 fragmenten uit de desktoprender teruggevonden; de vijf die overblijven zijn footerregels die de gedeelde `Footer` anders formatteert — net als op de andere pagina's |
| #2 Statische kaart met routelink | `src/assets/kaart-salon-hengelo.png`, samengesteld uit 24 OpenStreetMap-tegels. Nul `<iframe>`-elementen in de gebouwde HTML; de routeknop is een gewone link naar Google Maps |
| #3 Geen externe verzoeken | `dist/contact/index.html` en de CSS-bundel afgezocht op alles wat een verzoek veroorzaakt — `src`, `srcset`, `link href`, `iframe`, `url()`: geen enkele externe host. Nul `<script>`-elementen, dus ook geen cookie-zettende code. De enige externe URL's staan in `href`-attributen, en die doen pas iets als de bezoeker klikt |
| #4 tel: en mailto: | `tel:+31636079000` en `mailto:info@nailsbyvera.nl` teruggevonden in de gebouwde HTML, beide uit `contact` in `site.ts` |
| #5 Uit de centrale bron | Telefoon, e-mail, adres, socials, openingstijden en route-URL komen alle uit `src/data/site.ts`. De regel met gesloten dagen wordt afgeleid uit `openingHours` |
| Contrast in de hero | Per glyph tegen de foto eronder: desktop 7,3 / 4,3 / 7,5 · mobiel 11,3 / 3,8 / 6,8 |

`astro check` 0 errors / 0 warnings / 0 hints, build schoon.

## De kaart

Er is geen sleutelloze statische-kaart-API die dit dekt (de endpoint van Wikimedia geeft 403), dus de tegels zijn eenmalig opgehaald en aan elkaar geplakt: 24 tegels op zoomniveau 17, gecentreerd op de coördinaten die Nominatim voor De Genestetstraat 41 geeft, samen 1280 × 640. De speld is een gepositioneerd element in het midden van het kader en geen onderdeel van het beeld. De attributie "© OpenStreetMap-bijdragers" staat rechtsonder in de kaart — dat is een voorwaarde van de tegellicentie, geen versiering. Herkomst en zoomniveau staan bij de afbeelding in `src/data/images.ts`.

Daarvoor waren twee kleine uitbreidingen nodig: `Photo` heeft een `quality`-prop (op de standaardkwaliteit liepen de straatnamen dicht), en `images.ts` accepteert nu beeld zonder WordPress-herkomst via een optioneel `bron`-veld.

## Gevonden tijdens het werk

Nominatim gaf ook de postcode van de salon: **7552 WK**. Dat is wat TASK-4 AC #7 nog mist. Bewust niet ingevuld in `site.ts` — PRD §8.3 eist dat de schrijfwijze exact gelijk is aan die op het Google-bedrijfsprofiel, en dat hoort bevestigd te worden in plaats van uit een geocoder overgenomen.

## Wat nog open staat

- Facebook staat er zonder link tot de URL bekend is (TASK-4 AC #8); de pagina maakt er vanzelf een link van zodra `social.facebook` gevuld is.
- Onveranderd: mobiele navigatiedrawer TASK-9, structured data TASK-12, eindaudit TASK-15.
- Deze hero heeft het krapste h1-contrast van de vijf pagina's (4,3 desktop, 3,8 mobiel — ruim boven de 3:1 voor grote tekst, maar het krapst). Meenemen in de audit.
<!-- SECTION:FINAL_SUMMARY:END -->
