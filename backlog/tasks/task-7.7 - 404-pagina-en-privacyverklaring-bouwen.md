---
id: TASK-7.7
title: 404-pagina en privacyverklaring bouwen
status: Done
assignee:
  - '@claude'
created_date: '2026-08-08 08:57'
updated_date: '2026-08-09 06:49'
labels:
  - paginas
  - privacy
milestone: m-0
dependencies: []
documentation:
  - docs/PRD.md
modified_files:
  - src/pages/404.astro
  - src/pages/privacy.astro
parent_task_id: TASK-7
priority: medium
type: feature
ordinal: 15000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Twee kleine pagina's die geen ontwerp hebben in het handoff-pakket en afgeleid worden uit het design system.

De 404-pagina doet meer werk dan gebruikelijk. Er zijn ongeveer 55 URL's van de oude site die bewust géén redirect krijgen: 18 Engelstalige stock-blogposts, 36 WooCommerce-demoproducten en een lorem-ipsum-templatepagina. Die zijn nooit actief gebruikt, dus er worden geen redirectregels voor aangemaakt — dat zou de configuratie jarenlang ballast laten meedragen voor pagina's die nooit bestonden. De 404-pagina vangt de enkele bezoeker of bot die er nog langskomt, en moet dus een duidelijke weg terug bieden plus een boek-CTA.

De privacyverklaring is nodig omdat de site cookievrije statistieken bijhoudt via Vercel Web Analytics. Er komt geen cookiebanner — de site plaatst en leest niets op het apparaat van de bezoeker — maar het kortstondig verwerken van het IP-adres is wel een verwerking onder de AVG en hoort vermeld te worden. De verklaring benoemt: welke gegevens worden verwerkt, op welke grondslag (gerechtvaardigd belang), welke verwerkers er zijn (Vercel voor hosting en statistieken, Salonized voor boekingen), en hoe iemand contact opneemt.

De conceptteksten moeten door Vera worden vastgesteld; dat loopt via task-4.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 De 404-pagina staat in de huisstijl en biedt navigatie terug naar de hoofdpagina's plus een boek-CTA
- [x] #2 De privacyverklaring is bereikbaar op /privacy/ en staat in de footer
- [x] #3 De privacyverklaring benoemt de verwerkte gegevens, de grondslag en de verwerkers Vercel en Salonized
- [x] #4 De privacyverklaring is niet geïndexeerd als noindex nódig blijkt, maar is standaard gewoon indexeerbaar
- [x] #5 Beide pagina's zijn responsive en voldoen aan dezelfde toegankelijkheidseisen als de rest van de site
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Aanpak

Twee pagina's zonder ontwerp, afgeleid uit het design system: dezelfde kaart,
knoppen, typografie en leeskolom als de rest. Allebei met de vaste header
(`header="solid"`), want ze hebben geen hero.

## 404 — `src/pages/404.astro`

Astro bouwt dit naar `dist/404.html`; Vercel serveert dat automatisch met status
404 voor onbekende paden. Opbouw: één rij van een tekstkaart (1.1fr) en een foto
(0.9fr), zoals de blokken op Behandelingen. In de kaart: eyebrow "Foutmelding
404", h1, twee alinea's, chips naar alle zes de hoofdpagina's uit `navigation`,
en daaronder `BookingButton` plus een outline-knop naar de homepage.

De chips zijn niet decoratief: op mobiel toont de vaste header geen navigatie
(dat is de drawer uit TASK-9), dus zonder die rij zou een bezoeker op een
telefoon alleen via de footer verder kunnen.

`noindex` erop. Strikt genomen dubbelop bij een 404-status, maar het kost niets.

## Privacyverklaring — `src/pages/privacy.astro`

Leeskolom van 760px (`--container-narrow`). Kopstructuur: h1 plus zeven h2's —
verantwoordelijke, bezoekstatistieken, een afspraak maken, contact opnemen, wie
je gegevens krijgt, waarom er geen banner is, en je rechten. Afsluitend een
blush-kaart met de reikwijdte en de wijzigingsregel.

Inhoud volgt PRD §6.4: cookievrije statistieken via Vercel Web Analytics
(server-side dag-hash, geen opslag op het apparaat), wat er wél wordt
vastgelegd, en de grondslag gerechtvaardigd belang. Salonized krijgt een eigen
paragraaf met de grondslag uitvoering van de overeenkomst. Contactgegevens komen
uit `src/data/site.ts`, met `tel:` en `mailto:`.

Geen `noindex`: de verklaring is gewoon indexeerbaar (AC #4).

## Wat er bewust níét in staat

Geen zin dat er verwerkersovereenkomsten gesloten zijn — die met Vercel wordt
bij het Pro-abonnement geregeld (TASK-14) en is er dus nog niet. Geen uitspraak
over verwerking buiten de EER of standaardcontractbepalingen: dat is niet te
onderbouwen zonder de DPA erbij. Beide staan als TODO in het bestand en als
open punt in de notities.

De tekst is een concept tot Vera hem vaststelt (TASK-4 AC #4).

## Verificatie

- `npm run check` en `npm run build` schoon.
- `/privacy/` geeft 200, een onbekend pad geeft 404 in `astro preview`.
- Desktop 1280 en mobiel 390: kolombreedte, kopstructuur en overflow met een
  DOM-script.
- Controleren dat de privacypagina géén robots-meta heeft en de 404 wél.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
**De privacyverklaring is een concept.** Vera moet hem vaststellen (TASK-4 AC #4). Hij staat nu op `/privacy/` zodat ze hem gewoon kan lezen zoals een bezoeker hem ziet, in plaats van in een los document. De site gaat pas live bij de cutover (TASK-17), dus er staat niets ongelezen publiek.

**Twee zinnen bewust niet geschreven.** Er staat níet dat er verwerkersovereenkomsten gesloten zijn — die met Vercel wordt bij het Pro-abonnement geregeld (TASK-14) en bestaat dus nog niet. En er staat niets over verwerking buiten de EER of standaardcontractbepalingen, want dat is niet te onderbouwen zonder die DPA erbij. Allebei staan ze als TODO bovenin `privacy.astro`. Wie TASK-14 afrondt, hoort hier terug te komen.

Dezelfde voorwaarde geldt voor de alinea over statistieken: die beschrijft iets wat pas een feit is als TASK-13 de analytics aanzet. Staat dat op de dag van livegang nog uit, dan moet die paragraaf eruit.

**De datum staat vast in de code, niet via `new Date()`.** Een gegenereerde datum zou bij elke deploy meeschuiven en suggereren dat de tekst is bijgewerkt terwijl er niets veranderd is. Nu is 'laatst bijgewerkt' een bewuste handeling.

**De chips op de 404 zijn geen decoratie.** Op mobiel toont de vaste header geen navigatie — dat is de drawer uit TASK-9 — dus zonder die rij zou een bezoeker op een telefoon alleen via de footer verder kunnen. Precies de bezoeker die hier terechtkomt heeft die weg terug nodig.

**Meetdetail:** `astro preview` opnieuw starten na een `npm run build` in dezelfde sessie. De preview-server serveert `dist/`, en tijdens een herbouw verdwijnt die map even; daarna blijft hij hangen in plaats van te herstellen. Dat kostte hier een vastgelopen render.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## Wat er staat

Twee pagina's zonder handoff-ontwerp, afgeleid uit het design system.

**`/404.html`** — tekstkaart met een foto ernaast: eyebrow "Foutmelding 404", kop "Deze pagina bestaat niet meer", uitleg dat er bij de vernieuwing pagina's vervallen zijn, chips naar alle zes de hoofdpagina's, en een boek-CTA plus een knop naar de homepage. Astro bouwt het naar `dist/404.html`, dat Vercel automatisch met status 404 serveert.

**`/privacy/`** — leeskolom van 760px met h1 en zeven h2's: wie verantwoordelijk is, de cookievrije bezoekstatistieken, een afspraak maken via Salonized, contact opnemen, wie je gegevens krijgt, waarom er geen cookiebanner is, en je rechten. Contactgegevens komen uit `src/data/site.ts`.

## Verificatie

| Criterium | Bewijs |
|---|---|
| #1 404 in de huisstijl, navigatie plus boek-CTA | Render op 1280 en 390px. Acht links in de hoofdinhoud: zes chips naar de hoofdpagina's, de Salonized-boekknop en een knop naar `/` |
| #2 Bereikbaar op /privacy/ en in de footer | `astro preview` geeft 200 op `/privacy/`, de build levert `dist/privacy/index.html`. De footer linkte er al naar — die link wees tot nu toe naar niets en werkt nu |
| #3 Gegevens, grondslag en verwerkers | De verklaring benoemt wat er wordt vastgelegd (tijdstip, pagina, referrer, land/regio/stad, apparaat, OS, browser; IP kortstondig verwerkt, niet bewaard), de grondslagen (gerechtvaardigd belang voor statistieken, uitvoering van de overeenkomst voor de boeking) en beide verwerkers met hun rol: Vercel voor hosting en statistieken, Salonized voor het afsprakensysteem |
| #4 Indexeerbaar | Geen robots-meta op `/privacy/`; de 404 heeft er wél een (`noindex, nofollow`) |
| #5 Responsive en toegankelijk | Op 390px: `clientWidth = scrollWidth = 390` en nul elementen buiten het viewport op beide pagina's. Kopstructuur één h1 gevolgd door h2's, geen niveau overgeslagen. Onbekend pad geeft 404 in preview |

`astro check` 0 errors / 0 warnings / 0 hints, build schoon (9 pagina's).

## Wat bewust niet in de tekst staat

Geen zin dat er verwerkersovereenkomsten gesloten zijn: die met Vercel wordt bij het Pro-abonnement geregeld (TASK-14) en bestaat nog niet. Geen uitspraak over verwerking buiten de EER of standaardcontractbepalingen, want dat is zonder die DPA niet te onderbouwen. Beide staan als TODO bovenin `privacy.astro`.

## Wat nog open staat

- **De tekst is een concept** tot Vera hem vaststelt (TASK-4 AC #4). Hij staat op `/privacy/` zodat ze hem kan lezen zoals een bezoeker hem ziet; de site gaat pas live bij de cutover.
- De alinea over statistieken beschrijft iets wat pas een feit is als TASK-13 de analytics aanzet. Staat dat bij livegang nog uit, dan moet die paragraaf eruit.
- Zodra de DPA met Vercel er is (TASK-14): de zin over verwerkersovereenkomsten toevoegen en de datum bovenaan bijwerken.

Hiermee zijn alle subtaken van TASK-7 afgerond.
<!-- SECTION:FINAL_SUMMARY:END -->
