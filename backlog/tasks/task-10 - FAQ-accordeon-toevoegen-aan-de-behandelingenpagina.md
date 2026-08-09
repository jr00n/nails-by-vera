---
id: TASK-10
title: FAQ-accordeon toevoegen aan de behandelingenpagina
status: Done
assignee: []
created_date: '2026-08-08 09:42'
updated_date: '2026-08-09 16:29'
labels:
  - geo
  - content
  - toegankelijkheid
milestone: m-0
dependencies:
  - TASK-7.3
  - TASK-8
documentation:
  - docs/PRD.md
priority: high
type: feature
ordinal: 17000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Dit is de enige inhoudelijke uitbreiding op het handoff-ontwerp, en er is een concrete aanleiding voor: er komen aantoonbaar al klanten binnen die de salon via ChatGPT hebben gevonden. Letterlijk geformuleerde vraag-en-antwoordparen zijn precies wat een generatieve zoekmachine ophaalt en citeert. Noch de huidige site, noch het ontwerp bevat ze.

Plaatsing: onderaan `/behandelingen/`, in de stijl van het design system. Geen extra menu-item en geen aparte URL — de vraag ontstaat op die pagina.

Eén bouwkeuze is hier niet vrijblijvend: de accordeon wordt gebouwd op `<details>`/`<summary>`, zodat de antwoorden altijd in de HTML staan. Een crawler of AI-systeem dat geen JavaScript uitvoert moet de antwoorden gewoon kunnen lezen — anders vervalt het hele doel van deze sectie. Als bijvangst is het toetsenbordgedrag en de schermlezerondersteuning dan meteen goed.

De vragen en antwoorden komen uit task-4; zonder die input kan deze taak niet worden afgerond. Startset: duur per behandeling, hoe lang het blijft zitten, wat het ongeveer kost, voorbereiding, parkeren, de 7-dagen-garantie, en avond- of weekendafspraken.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 De FAQ staat onderaan /behandelingen/ en volgt de stijl van het design system
- [x] #2 De accordeon werkt met JavaScript uitgeschakeld en alle antwoorden staan in de HTML-bron
- [x] #3 De sectie is volledig toetsenbordbedienbaar en wordt correct aangekondigd door een schermlezer
- [x] #4 FAQPage structured data staat op de pagina en valideert zonder fouten
- [x] #5 Vragen en antwoorden komen uit de faq-collection, niet hardgecodeerd
- [x] #6 Er is geen extra menu-item toegevoegd
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. `src/components/FaqAccordion.astro` bouwen: één kaart met `<details name="faq">`-items,
   hairline-scheidingen, eigen marker (de browser-marker eruit). Vraag als `<h3>` binnen
   `<summary>`, zodat de kopstructuur klopt en de sectie met koppen te navigeren is.
   Geen JavaScript — het openen/sluiten en het toetsenbordgedrag zitten in `<details>` zelf.
2. `FAQPage`-JSON-LD in hetzelfde component genereren uit dezelfde array die de HTML vult,
   zodat markup en zichtbare tekst niet uit elkaar kunnen lopen. TASK-12 kan het later
   consolideren met de overige structured data.
3. Vragen zonder antwoord overslaan (`voorbereiding` is nog leeg) — in de HTML én in de
   JSON-LD. Een zichtbare vraag zonder antwoord is slechter dan geen vraag.
4. De ontbrekende startsetvraag "wat kost het ongeveer" toevoegen aan `faq.yaml`. Het
   antwoord verwijst naar /prijzen/ en herhaalt geen tarieven (PRD §8.3); daarvoor komt er
   een optioneel `link`-veld in het faq-schema.
5. Sectie onderaan `/behandelingen/` plaatsen, boven de CTA-band. Geen menu-item, geen
   eigen URL.
6. Verifiëren: build, antwoorden aanwezig in de gerenderde HTML-bron, JSON-LD valideren,
   toetsenbordbediening en kopstructuur nalopen.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
**Gebouwd** — `src/components/FaqAccordion.astro`, ingehaakt onderaan `/behandelingen/` boven de CTA-band.

**Bouwkeuzes die verklaring nodig hebben**

- **Geen regel JavaScript.** Openen, sluiten, toetsenbord en statusaankondiging komen uit `<details>`/`<summary>` zelf. Een script zou hier het doel van de sectie ondermijnen: alle antwoorden moeten in de HTML-bron staan voor systemen die niet renderen.
- **`name="faq"` op de details** maakt er een echte accordeon van (openen sluit de andere) — een HTML-eigenschap, geen script. Browsers die het nog niet kennen laten er meerdere openstaan; hinderlijk noch stuk.
- **De vraag staat als `<h3>` binnen de `<summary>`.** Toegestaan (summary neemt heading content) en het levert allebei op: de uitklapper houdt zijn naam en `expanded`-status, én de vragen staan als koppen niveau 3 in de boom, zodat een schermlezergebruiker ze met kopsnelnavigatie langsloopt. Gecontroleerd in de AX-boom, zie hieronder.
- **Geen `overflow-hidden` op de kaart**, hoe voor de hand liggend dat ook is bij afgeronde hoeken: de globale focusring staat op `outline-offset: 3px` en zou bij de bovenste en onderste vraag zijn afgeknipt. De hoverstatus zit daarom in de vraag en de marker, niet in een achtergrondvlak.
- **De FAQPage-markup komt uit dezelfde `items`-reeks die de HTML vult.** Twee losse lijsten lopen vroeg of laat uiteen, en Google eist dat gemarkeerde tekst ook zichtbaar op de pagina staat.
- **Het open- en dichtvouwen animeert via `::details-content`**, achter `@supports`. Zonder die selector klapt hij gewoon direct open — precies het standaardgedrag.

**Content**

- De startsetvraag *"wat kost het ongeveer"* ontbrak in `faq.yaml` en is toegevoegd. Het antwoord noemt geen bedragen — die staan in `prices.yaml` en op `/prijzen/`, en een tweede vindplaats gaat afwijken (PRD §8.3). Daarvoor is er een optioneel `link`-veld in het faq-schema bijgekomen; alleen deze vraag gebruikt het.
- Het antwoord bij `parkeren` stond er als "Gratis voor de deur." en is een hele zin geworden. Een generatief systeem citeert één antwoord zonder de vraag erbij; een fragment leest dan als een losse flard.
- Er wordt **niet** op `confirmed` gefilterd — dat staat overal op `false` en zou de sectie leegmaken. Wél overgeslagen: vragen met een leeg antwoord. `voorbereiding` valt daar nu onder en verschijnt vanzelf zodra TASK-4 het antwoord levert.
- De sectiekop is "Alles wat je vooraf wilt weten" en niet "Goed om te weten": zo heet de `sr-only`-kop boven de statkaarten hoger op deze pagina al, en twee bijna gelijke koppen maken kopsnelnavigatie juist onbruikbaar.

**Verificatie** (Playwright tegen de gebouwde site op de previewserver, Chrome for Testing)

- `npm run build` en `npm run astro check`: 0 fouten, 0 waarschuwingen.
- **Met JavaScript uitgeschakeld** (`javaScriptEnabled: false`): zes vragen aanwezig, `<summary>` neemt focus, Enter opent, spatie opent de volgende en sluit de vorige. De sectie is daarmee volledig bedienbaar zonder script.
- **Platte tekst van de gerenderde HTML**: alle zes antwoorden staan er voluit in, ook die van dichte vragen. De pagina laadt geen extra script voor deze sectie.
- **AX-boom via CDP** (`Accessibility.getFullAXTree`): per vraag `DisclosureTriangleGrouped | naam: "Hoe lang duurt een afspraak?" | focusable=true expanded=false` én `heading | level=3`. Dus naam, status én kopniveau — precies wat een schermlezer nodig heeft.
- **JSON-LD**: parseert, `@context`/`@type` correct, en elke `Question` heeft `name` plus een `acceptedAnswer` met `text` — de eigenschappen die Google voor `FAQPage` verplicht stelt. Een externe validator is niet aangeroepen: die heeft een publieke URL nodig, en de site staat nog niet live. Dat hoort bij de previewronde (TASK-16).
- **Beeld**: desktop 1280 en mobiel 390 gecontroleerd; kaart, hairlines, marker (plus wordt streepje) en de focusring vallen goed.

**Openstaand — hierom staat de taak nog niet op Done**

Geen enkel antwoord is door Vera bevestigd; `confirmed` staat overal op `false` (TASK-4 punt 1). De sectie zet nu conceptteksten over haar salon als feit in machineleesbaar formaat. Vóór de cutover (TASK-17) moet dat rondgekomen zijn.

**Correctie op de alinea hierboven:** de taak is wél afgesloten. In overleg besloten dat de contentbevestiging niet bij TASK-10 hoort maar bij de ronde die Jeroen met Vera langs alle content doet; als daar iets uit komt, wordt er een nieuwe taak voor gemaakt. De borging staat in TASK-4 (punt 1, opmerking #4): elk antwoord bevestigd en `confirmed` op `true` vóór de cutover van TASK-17.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Een FAQ-accordeon onderaan `/behandelingen/`, gebouwd op `<details>`/`<summary>` en zonder een regel JavaScript. Dat laatste is de kern en geen detail: alle antwoorden staan daardoor onvoorwaardelijk in de HTML-bron, ook voor een systeem dat de pagina niet rendert — de hele aanleiding voor deze sectie (PRD §5.9, §8.4). Toetsenbordbediening en de statusaankondiging komen uit hetzelfde element en hoefden niet nagebouwd te worden.

**Gewijzigd**

- `src/components/FaqAccordion.astro` (nieuw) — de sectie plus de `FAQPage`-JSON-LD, opgebouwd uit dezelfde reeks die de HTML vult, zodat markup en zichtbare tekst niet uit elkaar kunnen lopen.
- `src/pages/behandelingen.astro` — sectie ingehaakt boven de CTA-band. Geen menu-item, geen eigen URL.
- `src/content/faq.yaml` — de ontbrekende startsetvraag over de kosten toegevoegd (verwijst naar `/prijzen/`, noemt geen bedragen); het parkeerantwoord uitgeschreven tot een hele zin, omdat een generatief systeem één antwoord los citeert.
- `src/content.config.ts` — optioneel `link`-veld in het faq-schema, voor vragen waarvan het echte antwoord elders op de site staat.

**Keuzes met gevolgen**

- `name="faq"` maakt er een echte accordeon van zonder script; oudere browsers laten er meerdere openstaan, wat niets breekt.
- De vraag staat als `<h3>` binnen de `<summary>`. In de AX-boom levert dat allebei op: een uitklapper mét naam en `expanded`-status, én een kop niveau 3 voor kopsnelnavigatie.
- Geen `overflow-hidden` op de kaart — dat knipte de focusring (`outline-offset: 3px`) af bij de bovenste en onderste vraag. De hoverstatus zit daarom in de vraag en de marker.
- Er wordt niet op `confirmed` gefilterd (dat staat overal op `false` en zou de sectie leegmaken); vragen met een leeg antwoord worden wél overgeslagen. `voorbereiding` verschijnt vanzelf zodra dat antwoord er is.

**Getest**

`npm run build` en `astro check` schoon. Met Playwright tegen de gebouwde site: met JavaScript uitgeschakeld nemen de summaries focus en werken Enter en spatie; alle zes antwoorden staan voluit in de platte tekst van de bron; de AX-boom toont per vraag `DisclosureTriangleGrouped` (naam, `expanded`, focusable) én `heading level=3`; de JSON-LD parseert en bevat per `Question` een `name` en een `acceptedAnswer.text`. Beeld gecontroleerd op 1280 en 390.

**Risico dat elders geborgd is**

Geen van de antwoorden is door Vera bevestigd. Ze staan nu als `FAQPage`-markup op de pagina, dus als machineleesbare uitspraken over haar salon. Dat wordt opgepakt in de contentronde met Vera; de harde eis staat in TASK-4 (punt 1) — bevestigd en `confirmed: true` vóór de cutover van TASK-17. Een externe schemavalidator is nog niet gedraaid omdat die een publieke URL nodig heeft; dat hoort bij TASK-16.
<!-- SECTION:FINAL_SUMMARY:END -->
