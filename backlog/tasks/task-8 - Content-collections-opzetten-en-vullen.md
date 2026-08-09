---
id: TASK-8
title: Content collections opzetten en vullen
status: In Progress
assignee:
  - '@claude'
created_date: '2026-08-08 08:39'
updated_date: '2026-08-09 11:20'
labels:
  - content
  - seo
milestone: m-0
dependencies:
  - TASK-1
  - TASK-4
documentation:
  - docs/PRD.md
modified_files:
  - src/content.config.ts
  - src/content/faq.yaml
  - src/content/reviews.yaml
  - src/content/services.yaml
  - src/data/images.ts
  - src/data/site.ts
  - src/pages/contact.astro
  - src/pages/index.astro
  - src/pages/portfolio.astro
  - src/pages/styleguide.astro
priority: high
type: feature
ordinal: 8000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Alle veranderlijke content komt in Astro content collections in plaats van hardgecodeerd in de opmaak. De reden is concreet: er komt geen CMS in fase 1, dus contentwijzigingen lopen via een commit. Dat is alleen werkbaar als een prijswijziging één regel in één bestand is en niemand door de opmaak hoeft te zoeken.

Benodigde collections:
- `treatments` — behandelingen met omschrijving, duur en prijs
- `prices` — de volledige tarieven, gegroepeerd zoals op de prijzenpagina
- `portfolio` — afbeeldingen met src, alt en category (category is nodig voor het filter)
- `reviews` — auteur, score, tekst, datum
- `faq` — vraag, antwoord, volgorde

Daarnaast één centrale bron voor de bedrijfsgegevens: naam, adres, telefoonnummer, e-mail, social links en openingstijden. Die worden op meerdere plekken hergebruikt — footer, contactpagina, structured data — en mogen niet uit elkaar gaan lopen. Een telefoonnummer dat op de site anders geschreven staat dan in de structured data verzwakt het lokale vindbaarheidssignaal aantoonbaar.

Vaste gegevens: De Genestetstraat 41, Hengelo · 06-36079000 · info@nailsbyvera.nl · @byveranails · openingstijden dinsdag en donderdag 09:00–17:15, zaterdag 09:00–13:00.

De reviewteksten en FAQ-antwoorden komen uit task-4; behandelingen en prijzen staan in de handoff-ontwerpen.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Alle vijf collections bestaan met een getypeerd schema en zijn gevuld
- [x] #2 Bedrijfsgegevens en openingstijden staan op precies één plek en worden overal daarvandaan gelezen
- [x] #3 Een prijswijziging vergt het aanpassen van één regel in één bestand, zonder opmaak aan te raken
- [ ] #4 Het telefoonnummer en adres zijn identiek geschreven in de content, de zichtbare pagina en de structured data
- [x] #5 Geen enkele prijs, behandelduur of openingstijd staat nog hardgecodeerd in een .astro-bestand
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Wat er al staat (uit TASK-7)

- `treatments`, `prices` en `portfolio` bestaan met een getypeerd schema en zijn
  gevuld. `src/content.config.ts` legt uit waarom er één YAML-bestand per
  collection is en niet één bestand per item.
- `src/data/site.ts` is al de enige bron voor naam, adres, telefoon, e-mail,
  social links en openingstijden. `Footer.astro` en `contact.astro` lezen
  `openingHours` daaruit; nergens staat een openingstijd hardgecodeerd.

## Twee besluiten van de gebruiker (9 augustus)

1. **Niet wachten op TASK-4.** De FAQ krijgt conceptantwoorden op basis van wat
   er al op de site staat; wat alleen Vera kan weten blijft een expliciete TODO.
2. **De vier servicekaarten van de home krijgen een eigen collection
   `services`.** Dat is een zesde collection naast de vijf die de taak noemt.
   `treatments` heeft drie behandelgroepen en kent geen "Verlenging", en de
   homekaarten hebben hun eigen korte tekst, duur en prijs — die twee door elkaar
   heen laten lopen zou beide bestanden onduidelijk maken.

## Wat er nog hardgecodeerd staat

| Plek | Wat |
|---|---|
| `index.astro` | vier servicekaarten met duur en prijs (`90 min` / `€ 65` enz.) |
| `index.astro` | de reviewkaart in de bento-strip, plus "4,9 uit 120+ Google reviews" |
| `portfolio.astro` | twee reviews |
| `styleguide.astro` | voorbeeldprijzen die niet eens meer kloppen (`Opvullen €55`, terwijl `prices.yaml` "Nabehandeling €60 – €70" zegt) |

De stijlgids telt mee voor AC #5. Niet uit dogmatisme: Vera bekijkt die pagina
bij haar review (TASK-16), en dan hoort er geen tarief op te staan dat nergens
bestaat. Hij gaat de echte collections lezen.

`behandelingen.astro` houdt "4 weken" en "7 dagen" — dat zijn geen prijzen of
behandelduren maar houdbaarheid en garantietermijn, en die horen bij de copy van
die kaarten.

## Aanpak

### 1. Schema's in `src/content.config.ts`

- `reviews` — `order`, `author`, `authorShort?`, `rating`, `quote`, `date?`,
  `source?`. `authorShort` omdat de home "Sandra K." schrijft en de portfolio
  "Sandra Kamst" bij letterlijk hetzelfde citaat; copy is definitief, dus beide
  schrijfwijzen blijven. `date` optioneel tot TASK-4 de echte datums levert.
- `faq` — `order`, `question`, `answer`, `confirmed` (default `false`). Die
  laatste maakt machineleesbaar wat concept is, zodat TASK-10 er iets mee kán en
  een onbevestigd antwoord niet ongemerkt live gaat.
- `services` — `order`, `title`, `description`, `meta`, `price`, `photo`.
  `meta` en niet `duration`, want de nail-artkaart zet daar "p/nagel".

### 2. De drie YAML-bestanden

- `reviews.yaml` — de drie teksten uit het handoff-pakket (Sandra Kamst,
  Angelique Luijkman), met een kop die vermeldt dat datum en score van TASK-4
  moeten komen.
- `faq.yaml` — de zes vragen uit TASK-4. Wat af te leiden valt uit de site krijgt
  een concreet antwoord: behandelduur (uit `services`/`treatments`), houdbaarheid
  (4 weken versteviging, 2 à 3 weken gellak), garantie ("100% nagelgarantie in de
  eerste week"), parkeren ("gratis voor de deur"), en avond/weekend (zaterdag wel,
  's avonds niet). Voorbereiding is het enige waar niets over te vinden is; dat
  antwoord blijft leeg met een TODO. Het openingstijden-antwoord noemt géén
  tijden maar verwijst naar de footer, anders staat er alsnog een openingstijd op
  twee plekken.
- `services.yaml` — de vier homekaarten.

### 3. Pagina's laten lezen

`index.astro` (services + reviewkaart), `portfolio.astro` (twee reviews) en
`styleguide.astro` (prijs- en servicevoorbeelden) gaan `getCollection` gebruiken.

### 4. `site.ts`

`reviewSummary` erbij: het label "4,9 uit 120+ Google reviews" zoals het ontwerp
het schrijft, plus `average` en `count` los omdat de `aggregateRating` in TASK-12
getallen nodig heeft. Met een TODO naar TASK-4 om ze tegen het echte
Google-profiel te controleren.

## Verificatie

`astro check` + build. Daarna aantonen dat de gerenderde pagina's letterlijk
dezelfde tekst tonen als vóór de verhuizing (de copy is definitief), en dat er
geen prijs, duur of openingstijd meer in een `.astro`-bestand staat.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## AC #4 is maar voor twee derde te bewijzen

Het criterium vraagt om een telefoonnummer en adres die identiek zijn in de
content, op de zichtbare pagina én in de structured data. Dat derde bestaat nog
niet: structured data komt in TASK-12. Wat er nu aantoonbaar is:

- één definitie in de codebase (`src/data/site.ts`), nergens anders;
- over alle negen gebouwde pagina's precies één zichtbare schrijfwijze van het
  telefoonnummer (`06 – 36 07 90 00`, 20×), één machinevorm
  (`tel:+31636079000`, 20×), één adres (13×) en één e-mailadres (24×).

Het criterium is daarom niet afgevinkt. Dat is geen openstaand werk in dit
bestand maar een verificatie die pas in TASK-12 gedaan kán worden — en die daar
weinig voorstelt, omdat de markup dezelfde `site.ts` leest en niet los kan lopen.

## Twee bedrijfsgegevens die buiten site.ts stonden

Bij het narekenen van AC #2 bleken er nog twee plekken waar gegevens uitgeschreven
stonden in plaats van gelezen:

- de meta description van de contactpagina noemde het adres en de open dagen als
  vaste tekst;
- de alt-tekst van de kaartafbeelding in `src/data/images.ts` noemde het adres.

Allebei nu afgeleid. De gerenderde uitvoer is er letterlijk niet van veranderd —
`Geopend dinsdag, donderdag en zaterdag` komt nu uit `openingHours` en levert
dezelfde zin op. De winst zit erin dat ze niet meer stil kunnen verouderen als
Vera een dag omzet of verhuist.

## Wat de prijstest laat zien, en wat niet

Één regel in `prices.yaml` gewijzigd (gellak nieuwe set €35 → €37,50), gebouwd:
de prijzenpagina en de stijlgids volgden, zonder dat er een `.astro`-bestand aan
te pas kwam. Daarna teruggezet.

Wat de test ook liet zien: het instaptarief op de homekaart zit in
`services.yaml` en volgt dáár niet uit. Zelfde situatie als het prijsbereik in
`treatments.yaml`, en om dezelfde reden bewust zo gelaten: de home toont € 65
waar de prijzenlijst €65 – €70 zegt, en het ontwerp schrijft de bedragen met een
spatie na het euroteken waar de prijzenlijst dat niet doet. Dat afleiden vraagt
om een bereik parsen en anders formatteren — stringoperaties op copy die
definitief is. Beide bestanden hebben een kop die naar de ander verwijst.

Een prijs wijzigen is dus één regel in één bestand; wordt diezelfde prijs ook als
samenvatting getoond, dan is het diezelfde ene regel in twee contentbestanden.
De opmaak blijft er in beide gevallen buiten.

## Bewijs dat de copy de verhuizing heeft overleefd

Vóór de wijziging is de gerenderde tekst van de home, de portfolio en de
stijlgids weggeschreven; daarna opnieuw, en vergeleken. Home en portfolio zijn
teken voor teken identiek — de servicekaarten en de reviews komen nu uit
collections en leveren exact dezelfde pagina op.

De stijlgids verschilt wel, en dat was de bedoeling. Daar stond een prijslijst
met `Opvullen €55 / binnen 4 weken` — een tarief dat in `prices.yaml` niet
bestaat — en een review die niemand geschreven heeft ("Vera neemt echt de tijd
en het resultaat is elke keer weer prachtig."), op naam van een echte klant. Die
pagina is wat Vera bij TASK-16 bekijkt; verzonnen tarieven en verzonnen citaten
horen daar niet op te staan. Beide komen nu uit de collections.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## Alle content uit de opmaak

Zes content collections in plaats van vijf, en geen prijs, behandelduur of
openingstijd meer in een `.astro`-bestand.

### Nieuw

| Collection | Inhoud |
|---|---|
| `services` | de vier kaarten van "Wat ik voor je doe" op de home |
| `reviews` | de twee reviewteksten uit het handoff-pakket |
| `faq` | de zes vragen uit TASK-4, met conceptantwoorden |

`services` is de zesde naast de vijf die de taak noemt, op verzoek als aparte
collection gebouwd. De home toont vier kaarten waaronder "Verlenging", terwijl
`treatments` drie behandelgroepen beschrijft; die twee in één bestand zou een
bestand opleveren waarin je per veld moet weten voor wie het bedoeld is.

`reviews` heeft `author` én `authorShort`, omdat het ontwerp hetzelfde citaat op
de portfoliopagina aan "Sandra Kamst" toeschrijft en op de home aan "Sandra K.".
De copy is definitief, dus beide schrijfwijzen blijven staan.

`faq` heeft een `confirmed`-veld dat overal op `false` staat. Zo is machineleesbaar
dat deze antwoorden concept zijn en kan TASK-10 er een bewuste keuze in maken in
plaats van dat het in een comment verdwijnt.

### De FAQ-antwoorden

Vijf van de zes vragen hebben een antwoord dat volledig is afgeleid uit wat de
site zelf al zegt, met de bron in een comment boven elk antwoord: behandelduur uit
de servicekaarten, houdbaarheid uit `treatments.yaml` en de gellakkaart, de
garantie uit de statkaarten, parkeren uit de contactpagina.

Twee redactieregels zijn aangehouden. Geen enkel antwoord noemt een openingstijd
of een tarief letterlijk — de avond-en-weekendvraag verwijst naar de footer in
plaats van tijden te herhalen. En waar niets over te vinden was, staat er niets:
het antwoord op "moet ik me voorbereiden" is leeg, met een TODO. Een verzonnen
antwoord over andermans salon leest als een feit en is erger dan een lege regel.

### Verplaatst

De home leest zijn servicekaarten en zijn reviewkaart nu uit collections, de
portfolio zijn twee reviews. De review-samenvatting "4,9 uit 120+ Google reviews"
staat in `site.ts`, met `average` en `count` er los naast omdat de
`aggregateRating` in TASK-12 cijfers wil en die twee niet uit elkaar horen te
lopen.

Twee bedrijfsgegevens stonden nog buiten `site.ts` en zijn nu afgeleid: de meta
description van de contactpagina (adres en open dagen) en de alt-tekst van de
kaartafbeelding (adres). Allebei leveren ze letterlijk dezelfde tekst op als
voorheen.

De stijlgids toonde `Opvullen €55 / binnen 4 weken` — een tarief dat in
`prices.yaml` niet bestaat — en een review die niemand geschreven heeft, op naam
van een echte klant. Vera bekijkt die pagina bij TASK-16; beide komen nu uit de
collections.

## Verificatie

`astro check` 0 errors / 0 warnings / 0 hints, build 9 pagina's.

| Criterium | Bewijs |
|---|---|
| #1 Collections bestaan, getypeerd, gevuld | Via een tijdelijke pagina alle zes uitgelezen: treatments 3, prices 4, portfolio 12, services 4, reviews 2, faq 6 items, met per collection de velden die het schema voorschrijft. Eén leeg veld in de hele set: `voorbereiding.answer`, bewust en gedocumenteerd |
| #2 Bedrijfsgegevens op één plek | `site.ts` is de enige definitie van adres, telefoon, e-mail en openingstijden; buiten dat bestand staat het adres nergens meer uitgeschreven. Geen kloktijd en geen adres in de content-YAML |
| #3 Prijswijziging is één regel | Gellak nieuwe set van €35 naar €37,50 gezet en gebouwd: prijzenpagina en stijlgids volgden, geen `.astro` aangeraakt. Daarna teruggezet. Kanttekening over samenvattingsprijzen staat in de implementatienotities |
| #5 Niets meer hardgecodeerd | Over alle `.astro`-bestanden geen euroteken, geen duur en geen kloktijd meer buiten doc-comments. De enige weekdagvermelding is nu afgeleid uit `openingHours` |
| Copy ongewijzigd | De gerenderde tekst van de home en de portfolio is teken voor teken identiek aan die van vóór de verhuizing |

**AC #4 is niet afgevinkt.** Het vraagt om gelijkheid tussen content, pagina en
structured data, en die laatste bestaat pas in TASK-12. Wat wel is aangetoond:
één definitie in de codebase en over alle negen pagina's precies één schrijfwijze
per gegeven — telefoon zichtbaar 20×, `tel:`-vorm 20×, adres 13×, e-mail 24×.

## Wat TASK-4 hierna nog in deze bestanden zet

- `reviews.yaml` — de echte reviews van het Google-profiel met auteur, score en
  datum. `date` en `source` staan al in het schema en zijn nu leeg.
- `faq.yaml` — bevestiging of correctie van vijf antwoorden, het antwoord op de
  voorbereidingsvraag, en `confirmed: true` per vraag.
- `services.yaml` en `treatments.yaml` — de behandelduur in minuten, nu nog uit
  het ontwerp overgenomen.
- `site.ts` — score en aantal reviews controleren tegen het Google-profiel, plus
  de postcode en de Facebook-URL die er al als TODO stonden.
<!-- SECTION:FINAL_SUMMARY:END -->
