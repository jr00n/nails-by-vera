# Nulmeting vóór de migratie — Nails by Vera

**Doel:** vastleggen hoe de huidige site presteert, zodat we ná de migratie kunnen
aantonen dat er niets verloren is gegaan — in het bijzonder het AI-kanaal, waar
aantoonbaar al klanten vandaan komen.

> ⏳ **Dit is tijdgebonden.** Onderdeel A kan alleen zolang de Google Analytics-koppeling
> met WordPress nog bestaat. Zodra de oude site eruit gaat, is die data weg. Doe dit
> vóór de bouw af is — het hoeft er niet op te wachten.

Uitvoeren doe jij; ik heb geen toegang tot de GA-property of Search Console. Vul de
uitkomsten in dit bestand in, dan staat de baseline in de repo.

**Datum uitgevoerd:** ⬜ nog niet uitgevoerd
**Uitgevoerd door:** —

---

## A. Google Analytics — vóór de cutover

Periode aanhouden: **laatste 12 maanden**, en daarnaast **laatste 3 maanden** voor een
recenter beeld. Noteer beide.

### A1. AI-verwijzingen — het belangrijkste onderdeel
Rapport: *Acquisitie → Verkeersbronnen → Sessies per bron/medium*, of *Verkenningen* met
dimensie **Sessiebron**. Filter op onderstaande hosts:

| Bron | Sessies 12 mnd | Sessies 3 mnd |
|---|---|---|
| `chatgpt.com` | | |
| `chat.openai.com` (oude host) | | |
| `perplexity.ai` | | |
| `gemini.google.com` | | |
| `copilot.microsoft.com` | | |
| `claude.ai` | | |
| Overig AI-achtig (noteer wat je ziet) | | |
| **Totaal** | | |

> Zie je nul sessies terwijl er wél klanten via ChatGPT binnenkwamen? Dat is een
> bekend meetprobleem, geen fout: veel mensen krijgen naam en adres uit een AI-antwoord
> en typen die daarna zelf in Google, of bellen direct. Noteer het getal toch — het is
> een ondergrens, en de vergelijking vóór/ná blijft geldig.

### A2. Totaalbeeld
| Meting | 12 mnd | 3 mnd |
|---|---|---|
| Sessies totaal | | |
| Gebruikers | | |
| Sessies via organisch zoeken | | |
| Sessies via direct | | |
| Sessies via Instagram / Facebook | | |

### A3. Top-landingspagina's
De tien meest bezochte instappagina's, met aantallen. Hiermee controleren we na de
migratie of juist die pagina's blijven werken.

| # | Pagina | Sessies |
|---|---|---|
| 1 | | |
| 2 | | |
| … | | |

> **Let hier op:** verschijnt er een blogpost of productpagina in deze lijst? Dan klopt
> de aanname uit de PRD (§7) niet dat die URL's nooit gebruikt zijn, en moet er alsnog
> een redirect voor komen. Meld dat.

### A4. Doorkliks naar Salonized
De belangrijkste conversie. Te vinden als uitgaande link-event of als klik op
`nailsbyvera.salonized.com`.

| Meting | 12 mnd | 3 mnd |
|---|---|---|
| Doorkliks naar Salonized | | |
| Conversieratio (doorkliks / sessies) | | |

---

## B. Google Search Console — vóór de cutover

Exporteer als CSV en zet in `docs/nulmeting-data/`. Periode: **laatste 12 maanden**.

- ⬜ **Prestaties → Zoekopdrachten** — volledige export
- ⬜ **Prestaties → Pagina's** — volledige export
- ⬜ **Indexering → Pagina's** — aantal geïndexeerde URL's noteren: ______

Noteer hier de posities op de belangrijkste lokale termen:

| Zoekterm | Vertoningen | Klikken | Gem. positie |
|---|---|---|---|
| nagelsalon hengelo | | | |
| gellak hengelo | | | |
| nails by vera | | | |
| biab hengelo | | | |
| nagelstyliste hengelo | | | |

---

## C. AI-steekproef — handmatig

Het meest directe signaal, en het enige dat laat zien of de **feiten** kloppen. Stel
onderstaande vragen in **ChatGPT (met zoekfunctie aan)**, **Perplexity** en **Google**
(let op het AI Overview bovenaan).

Herhaal exact dezelfde vragen op drie momenten: **nu**, **2 weken na livegang** en
**8 weken na livegang**. Gebruik een nieuw/uitgelogd gesprek zonder eerdere context,
anders kleuren voorgaande vragen het antwoord.

### De vijf vaste vragen
1. "Waar kan ik gellak laten zetten in Hengelo?"
2. "Wat kost een BIAB-behandeling bij Nails by Vera?"
3. "Wat zijn de openingstijden van Nails by Vera in Hengelo?"
4. "Hoe maak ik een afspraak bij Nails by Vera?"
5. "Wat is een goede nagelsalon in de buurt van Hengelo?"

### Per vraag vastleggen
| Vraag | Systeem | Wordt de salon genoemd? | Klopt de info? | Wordt de site geciteerd? | Opmerkingen |
|---|---|---|---|---|---|
| 1 | ChatGPT | | | | |
| 1 | Perplexity | | | | |
| 1 | Google AIO | | | | |
| 2 | … | | | | |

**Waar je specifiek op let bij "klopt de info?":**
- Adres — De Genestetstraat 41, Hengelo
- Telefoon — 06-36079000
- Openingstijden — di & do 09:00–17:15, za 09:00–13:00
- Prijzen — komen ze overeen met de prijslijst?
- Boeken — verwijst het naar Salonized?

Een fout antwoord hier kost een klant zonder dat het ooit in de statistieken zichtbaar
wordt. Dat is precies waarom deze steekproef in de meetlijst staat.

---

## D. Google-bedrijfsprofiel — vastleggen hoe het er nu voor staat

Dit profiel is volgens de PRD (§8.3, §8.4) het zwaartepunt van zowel de lokale
vindbaarheid als het AI-kanaal. Leg de uitgangspositie vast:

| Meting | Waarde |
|---|---|
| Aantal reviews | |
| Gemiddelde score | |
| Datum meest recente review | |
| Website-URL in het profiel | |
| Openingstijden correct? | ⬜ ja ⬜ nee |
| Behandelingen/diensten ingevuld? | ⬜ ja ⬜ nee |
| Aantal foto's | |
| Weergaven / zoekopdrachten laatste 3 mnd (uit profielstatistieken) | |

- ⬜ Screenshot van het volledige profiel opslaan in `docs/nulmeting-data/`

---

## E. Technische uitgangspositie

Voor de vergelijking met de acceptatiecriteria uit de PRD (§2). Meet met PageSpeed
Insights op **mobiel**, veldgegevens én labgegevens.

| Pagina | Performance | LCP | CLS | INP |
|---|---|---|---|---|
| `/` | | | | |
| `/behandelingen/` | | | | |
| `/prijzen/` | | | | |
| `/contact/` | | | | |

---

## Checklist afronding

- ⬜ A1 t/m A4 ingevuld
- ⬜ B: CSV's geëxporteerd en weggeschreven
- ⬜ C: steekproef "nu" uitgevoerd en vastgelegd
- ⬜ D: profiel vastgelegd + screenshot
- ⬜ E: technische meting gedaan
- ⬜ Afwijkingen gemeld die de PRD raken (met name A3 — onverwacht verkeer op
  "vervallen" URL's)
- ⬜ DNS-zone geëxporteerd (R2 in de PRD) — hoort formeel bij de cutover, maar leg het
  nu meteen vast als je toch bezig bent
