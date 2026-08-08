# PRD — Nails by Vera, nieuwe website

| | |
|---|---|
| **Product** | nailsbyvera.nl — publieke website |
| **Opdrachtgever** | Vera Wolff, Nails by Vera (privé-nagelsalon, Hengelo OV) |
| **Status** | Besluiten verwerkt — klaar om te bouwen |
| **Datum** | 8 augustus 2026 |
| **Fase** | 1 van 2 (zie §10) |

---

## 1. Samenvatting

De huidige site draait op WordPress met Elementor, een verouderd thema en een reeks
plugins (King Addons, GTM4WP, WooCommerce). Het onderhoud, de laadtijd en de
ontwerpvrijheid zijn daardoor beperkt, en er staat een aanzienlijke hoeveelheid
ongebruikte demo-content in (18 Engelstalige stock-blogposts, 36 WooCommerce
demo-producten, een half afgemaakte templatepagina met lorem ipsum).

Fase 1 vervangt die site door een volledig statische **Astro**-site op **Vercel**, in
het nieuwe ontwerp "Editorial Frames" dat in `design_handoff_nailsbyvera/` is opgeleverd.
Er komt in deze fase **geen eigen dynamiek**: reserveren blijft via het bestaande
**Salonized**-widget. Doel van fase 1 is dus tweeledig en beide delen tellen even zwaar:
WordPress uitfaseren én het nieuwe ontwerp live zetten.

Fase 2 (apart te besluiten, na fase 1) onderzoekt of een eigen boekingsmodule op
Vercel/Supabase rendabel en eenvoudig genoeg is om Salonized te vervangen.

---

## 2. Doelen en succescriteria

### Doelen
1. **WordPress volledig uit de lucht** — geen PHP, geen database, geen plugin-updates,
   geen WordPress-hostingkosten meer.
2. **Nieuw ontwerp live** — de zes pagina's uit het handoff-pakket, pixel-nauwkeurig,
   op desktop en mobiel.
3. **Boeken blijft ononderbroken werken** — elke bezoeker die nu boekt, kan dat na
   livegang net zo makkelijk.
4. **Geen verlies van vindbaarheid** — bestaande, relevante URL's blijven werken of
   krijgen een correcte redirect. Nooit gebruikte demo-URL's mogen wegvallen (§7).
5. **Het bestaande AI-kanaal behouden en versterken** — er komen aantoonbaar al klanten
   binnen die de salon via ChatGPT hebben gevonden. Dat kanaal mag door de migratie niet
   beschadigd raken, en de nieuwe site moet het beter bedienen dan de oude (§8.4).

### Meetbare acceptatiecriteria
| Criterium | Norm |
|---|---|
| Lighthouse mobiel (Performance) | ≥ 95 op elke pagina |
| Lighthouse Accessibility / Best Practices / SEO | ≥ 95 op elke pagina |
| Core Web Vitals (veldnorm) | LCP < 2,0 s · CLS < 0,05 · INP < 200 ms |
| Paginagewicht boven de vouw | < 400 kB (incl. hero-afbeelding) |
| Beschikbaarheid | Vercel-standaard, geen eigen uptime-verplichting |
| Werkende links / redirects | 0 gebroken interne links, 0 404's op de zes gemigreerde pagina's |
| Zoekverkeer | Geen structurele daling in Search Console 8 weken na livegang |
| AI-verkeer | Verwijzingen vanaf `chatgpt.com` / `perplexity.ai` e.d. minimaal op het niveau van de nulmeting, 8 weken na livegang |
| Feitelijke juistheid in AI-antwoorden | Steekproef vóór en na livegang: adres, openingstijden, behandelingen en prijzen worden correct weergegeven (§8.4) |

---

## 3. Doelgroep en gebruikersbehoeften

**Primair:** vrouwen in en rond Hengelo (OV) die een nagelbehandeling zoeken — deels
bestaande klanten die snel opnieuw willen boeken, deels nieuwe bezoekers die eerst
willen zien of het klopt.

**Wat zij op de site komen doen, in volgorde van belang:**
1. **Een afspraak maken.** Op elke pagina, zonder zoeken. De primaire conversie.
2. **Zien wat het werk waard is.** Foto's van echt werk (portfolio, servicekaarten).
3. **Weten wat het kost en hoe lang het duurt.** Prijzen en duur, zonder verrassingen.
4. **Vertrouwen opbouwen.** Wie is Vera, is het een privésalon, wat is de garantie.
5. **Praktische zaken vinden.** Adres, route, openingstijden, telefoon, WhatsApp.

**Belangrijke context:** dit is een eenpersoonssalon aan huis. De toon is persoonlijk
(jij/jouw), warm en geruststellend. Er is bewust **geen beschikbaarheidsagenda** in de
UI — welke tijden vrij zijn hangt af van de gekozen behandeling en leeft in Salonized.

---

## 4. Scope

### 4.1 In scope (fase 1)

**Zes pagina's**, exact zoals opgeleverd in het handoff-pakket:

| Pagina | Bestand in handoff | Nieuwe URL |
|---|---|---|
| Home | `Editorial Frames.dc.html` | `/` |
| Over mij | `Over mij.dc.html` | `/over-mij/` |
| Portfolio | `Portfolio.dc.html` | `/portfolio/` |
| Behandelingen | `Behandelingen.dc.html` | `/behandelingen/` |
| Prijzen | `Prijzen.dc.html` | `/prijzen/` |
| Contact | `Contact.dc.html` | `/contact/` |

Plus een **404-pagina** in dezelfde stijl, een **privacyverklaring** op `/privacy/`
(§6.4) en een **blog-fundament** (§5.7).

**Verder in scope:**
- Design system overzetten naar CSS custom properties + `.astro`-componenten
- Alle beeldmateriaal downloaden uit de WordPress-mediabibliotheek, lokaal opslaan en
  serveren via Astro `<Image>` (AVIF/WebP, responsive `srcset`)
- Zelf-gehoste fonts (`@fontsource`)
- Salonized-koppeling op elke boek-CTA
- Google Maps embed op de contactpagina
- Client-side portfoliofilter
- Mobiel menu (drawer) en sticky boekbalk op mobiel
- **FAQ-accordeon** op de behandelingenpagina (§5.9) — toevoeging op het ontwerp
- **Blog-fundament**: content collection, `/blog/` overzicht en artikelsjabloon,
  ontworpen op basis van het bestaande design system (§5.7)
- Redirect voor de enige gewijzigde URL: `/over-de-salon/` → `/over-mij/` (§7)
- SEO-basis: metatitels/-beschrijvingen, Open Graph, `sitemap.xml`, `robots.txt`,
  `LocalBusiness`/`NailSalon` structured data (§8.3)
- Cookievrije analytics, zonder cookiebanner (§6.4, §8.1)
- GEO-basis: AI-crawlers toegestaan, feiten in platte HTML, `llms.txt` (§8.4)
- Domeinverhuizing en livegang

### 4.2 Expliciet buiten scope (fase 1)

| Onderdeel | Besluit | Toelichting |
|---|---|---|
| **De 18 bestaande blogposts** | Vervallen | Engelstalige stock-content van het thema ("6 Examples of Brilliant Email Marketing Campaigns"), niet van Vera. Nooit actief gebruikt. Het blog-*fundament* wordt wél gebouwd (§5.7) — alleen de oude inhoud gaat niet mee. |
| **WooCommerce-shop** | Vervalt volledig | Alle 36 producten zijn demo-artikelen. Er wordt niets verkocht. Geen shop, geen betaalprovider, geen voorraad. |
| **`/professional-nail-care/`** | Vervalt | Half afgemaakte templatepagina met lorem ipsum en verzonnen cijfers ("300+ manicuristen"). Nooit actief gebruikt. |
| **Eigen boekingssysteem** | Fase 2 | Zie §10. |
| **CMS / redactieomgeving** | Nee | Besloten: content leeft in content collections, wijzigingen lopen via een commit door de ontwikkelaar. Zie §5.5. |
| **Live Google Reviews-koppeling** | Nee | Besloten: reviewteksten staan statisch in een content collection. Zie §5.8. |
| **Meertaligheid** | Nee | Site is en blijft Nederlands. |
| **Cadeaubonnen, klantaccounts, nieuwsbrief** | Nee | Niet aanwezig, niet gevraagd. |

---

## 5. Functionele eisen

### 5.1 Boeken (F-1) — hoogste prioriteit
- Elke pagina heeft minstens één primaire boek-CTA, boven de vouw bereikbaar.
- CTA opent `https://nailsbyvera.salonized.com/widget_bookings/new` in een **nieuw
  tabblad** (`target="_blank" rel="noopener"`).
- Op mobiel (< 768 px) staat onderaan een **sticky boekbalk** (`--ink-900` pill) die
  meescrolt.
- De UI toont **geen beschikbaarheid**; dat is bewust.
- De CTA-link staat op één centrale plek in de code (`BookingButton.astro`), zodat hij
  in fase 2 in één wijziging naar een eigen planner kan wijzen.

### 5.2 Navigatie (F-2)
- Persistente header op alle pagina's; op de hero zweeft hij als glasmorph-pill.
- Actieve pagina = pill met `--ink-900` achtergrond, witte tekst.
- Mobiel: logo + "Boeken"-knop + hamburger die een drawer opent. Drawer sluit op Esc,
  op klik buiten, en bij navigatie. Focus wordt in de drawer vastgehouden.

### 5.3 Portfolio-filter (F-3)
- Filterrij met pill-chips; "Alles" is de standaardstand.
- Client-side filtering op een `category`-veld per afbeelding — geen paginalading.
- Categorieën volgen uit de content; het filter degradeert netjes zonder JavaScript
  (zonder JS zijn alle afbeeldingen zichtbaar en is de filterrij verborgen).

### 5.4 Contact en vindbaarheid (F-4)
- Telefoon als `tel:`-link, e-mail als `mailto:`-link, Instagram en Facebook als
  externe links.
- WhatsApp-kaart op de home linkt naar `wa.me` met het salonnummer.
- Google Maps embed op `De Genestetstraat 41, Hengelo` — lazy-loaded, en zó ingebed dat
  hij pas na interactie of onder `loading="lazy"` laadt, om de Lighthouse-score en de
  privacy-positie niet te schaden.
- Openingstijden: di & do 09:00–17:15, za 09:00–13:00 — één keer vastgelegd, hergebruikt
  in footer, contactpagina en structured data.

### 5.5 Content (F-5)
- Alle copy is **definitief** en staat letterlijk in de handoff-bestanden. Niet
  herschrijven.
- Prijzen en behandelingsduur staan in een content collection (`treatments`,
  `prices`), niet hardcoded in de opmaak — dat maakt een prijswijziging een eenregelige
  aanpassing.
- Portfolio-afbeeldingen staan in een collection met `src`, `alt`, `category`.
- **Contentwijzigingen lopen via een commit** — er komt geen CMS. Dat is een bewuste
  keuze: de wijzigingen zijn zeldzaam (prijzen, een paar foto's) en een CMS kost
  onderhoud en een extra inlogketen. Randvoorwaarde: de collections moeten zó
  leesbaar zijn dat een prijswijziging één regel in één bestand is, zonder de opmaak
  aan te raken. Als het aantal wijzigingen later oploopt, is een git-based CMS
  (Sveltia/Decap) er in een halve dag bovenop te zetten zonder de content te verhuizen.

### 5.6 Beeldmateriaal (F-6)
- 18 afbeeldingen uit `nailsbyvera.nl/wp-content/uploads/` downloaden naar
  `src/assets/`. Géén hotlinks naar de oude WordPress-server — die gaat uit.
- Serveren via Astro `<Image>`: AVIF met WebP-fallback, responsive `srcset`, expliciete
  `width`/`height` tegen layout shift.
- Hero-afbeeldingen `loading="eager"` + `fetchpriority="high"`; de rest lazy.
- Elke afbeelding krijgt een betekenisvolle Nederlandse `alt`-tekst.
- Het echte logo (`NbyV-logo-black.png`) vervangt de typografische stand-in uit het
  design system; bij voorkeur als SVG.

### 5.7 Blog-fundament (F-7)
De 18 bestaande posts vervallen, maar Vera moet later zelf kunnen gaan schrijven zonder
dat daar een verbouwing voor nodig is. Daarom wordt de blog nu wél technisch neergezet.

- Content collection `blog` met schema: `title`, `description`, `date`, `cover`,
  `draft`. Artikelen in Markdown/MDX.
- Route `/blog/` (overzicht, kaartenraster) en `/blog/[slug]/` (artikel).
- **Ontwerp wordt afgeleid uit het bestaande design system** — hero, kaartenraster en
  tekstkaart in de "Editorial Frames"-stijl. Er komt geen aparte ontwerpronde; het
  handoff-pakket bevat geen blog-ontwerp en dat hoeft fase 1 niet op te houden.
- **De blog start leeg.** Zolang er nul gepubliceerde artikelen zijn:
  - staat er géén "Blog" in de hoofdnavigatie;
  - staat `/blog/` niet in de sitemap en krijgt hij `noindex`.

  Zodra het eerste artikel gepubliceerd is, verschijnt het menu-item vanzelf. Zo staat
  er nooit een lege sectie live, en is het schrijven van artikel nummer één het enige
  wat er later nog hoeft te gebeuren.
- Artikelen krijgen Open Graph-tags en `Article` structured data.

### 5.8 Reviews (F-8)
- De reviewkaarten in het ontwerp worden gevuld met **echte reviewteksten uit een
  content collection** (`reviews`: `author`, `rating`, `text`, `date`).
- Geen live koppeling met de Google Places API — dat vraagt een Google Cloud-account
  met creditcard en geeft maximaal vijf reviews terug.
- Consequentie die geaccepteerd is: nieuwe reviews groeien niet vanzelf mee en worden
  periodiek handmatig bijgewerkt. Actiepunt bij oplevering: de reviewteksten die nu op
  de site en op het Google-bedrijfsprofiel staan overnemen in de collection.

### 5.9 FAQ (F-9)
Toegevoegd op grond van het werkende AI-kanaal (§8.4). **Niet aanwezig in het
handoff-ontwerp** — dit is de enige inhoudelijke uitbreiding daarop.

- **Plaatsing:** accordeon onderaan `/behandelingen/`, in de stijl van het design
  system. Geen extra menu-item, geen aparte URL — de vraag ontstaat op die pagina.
- Content collection `faq` met `question`, `answer`, `order`. Antwoorden in Markdown.
- **`FAQPage` structured data** op de behandelingenpagina.
- **Werkt zonder JavaScript:** gebouwd op `<details>`/`<summary>`, zodat de antwoorden
  altijd in de HTML staan. Dat is hier essentieel — een crawler of generatief systeem
  dat geen JS uitvoert, moet de antwoorden gewoon kunnen lezen.
- Toetsenbordbedienbaar en correct aangekondigd door schermlezers (volgt uit
  `<details>`).
- **Vragen om mee te starten** (definitieve set en antwoorden komen van Vera — zij heeft
  de feiten):
  - Hoe lang duurt een afspraak voor gellak, BIAB of nail art?
  - Hoe lang blijft het zitten?
  - Wat kost een behandeling ongeveer?
  - Moet ik iets voorbereiden voordat ik kom?
  - Waar kan ik parkeren?
  - Wat als een nagel binnen een week afbreekt? (de 7-dagen-garantie)
  - Kan ik ook 's avonds of in het weekend terecht?

> **Blokkerend voor oplevering van deze sectie:** de antwoorden. Ik kan de vragen
> voorstellen en het onderdeel bouwen, maar de feiten — duur in minuten, wat de garantie
> precies dekt, parkeren — moeten van Vera komen. Zonder haar input geen FAQ. Zie R10.

---

## 6. Niet-functionele eisen

### 6.1 Techniek
| Onderdeel | Keuze |
|---|---|
| Framework | **Astro 7**, `output: 'static'`. Dit document schreef aanvankelijk Astro 5 voor; bij de start van de bouw (8 augustus 2026) was 7.2 de actuele release en 5.18.2 de laatste 5.x. Op 7 gezet omdat geen enkele breaking change uit 6 of 7 dit project raakt — geen `@astrojs/db`, geen legacy content collections, geen `ViewTransitions`, geen custom markdown- of Vite-plugins — en een nieuw project niet met twee majors achterstand hoort te beginnen. Zie TASK-1. |
| UI-framework | Geen. De site is vrijwel volledig statisch; de twee interactieve stukken (menu, filter) zijn ~30 regels vanilla JS. |
| Styling | **Tailwind CSS v4**, via `astro add tailwind` (de officiële Vite-plugin; de oude `@astrojs/tailwind`-integratie is vervallen). De design tokens gaan als `@theme`-blok in `src/styles/global.css` en worden zo utilities — de tokens blijven de bron van waarheid, Tailwind is de distributie. Onderbouwing in §6.5. |
| Hosting | **Vercel Pro** ($20/mnd). Besloten: Hobby mag volgens de voorwaarden niet commercieel, en dit is een site die klanten werft. Pro geeft daarnaast preview-URL's per PR en cookievrije Web Analytics zonder extra dienst. Render vervalt daarmee als alternatief. |
| Repository | Deze git-repo, `main` = productie |
| CI/CD | Vercel Git-integratie: elke push naar `main` deployt naar productie, elke PR krijgt een preview-URL |
| Node | LTS 22, vastgezet in `package.json` (`engines.node: "22.x"`) en in `.nvmrc`. Astro 7 vereist minimaal Node 22.12. |

### 6.2 Ontwerptrouw
- **High fidelity.** Kleuren, typografie, spacing, radii en copy zijn definitief.
  Recreëer pixel-nauwkeurig volgens de tokens in `design_handoff_nailsbyvera/_ds/`.
- Elk `.dc.html`-bestand toont twee renders naast elkaar: **links desktop (1280 px),
  rechts mobiel (390 px)** — twee breakpoints van dezelfde pagina, geen twee pagina's.
- Breakpoints: ≥ 1024 px = desktopversie · < 768 px = mobiele versie · daartussen 2
  kolommen voor de servicekaarten.
- Motion: `cubic-bezier(.22,1,.36,1)`, ~280 ms. Geen bounce, geen loops. Respecteer
  `prefers-reduced-motion`.

### 6.3 Toegankelijkheid
- Streven naar **WCAG 2.2 niveau AA**.
- Alle interactieve elementen bedienbaar met toetsenbord, met zichtbare focus-indicator.
- **Contrast — nagerekend bij de bouw (TASK-6), met twee correcties op wat hier
  eerder stond.** De gemeten waarden:

  | Combinatie | Ratio | Oordeel |
  |---|---|---|
  | wit op `--coral-500` #ED8967 | **2,51:1** | zakt door AA voor élke tekstgrootte |
  | wit op `--coral-600` #E0744F (hover) | 3,10:1 | alleen grote tekst |
  | `--rose-500` #D29A8C op `--bg-page` | **2,26:1** | zakt door AA |
  | `--ink-400` #9A918E op `--bg-page` | 2,89:1 | zakt door AA |
  | `--ink-600` #6B6462 op `--bg-page` | 5,44:1 | voldoet |
  | `--ink-900` op `--coral-500` | 6,91:1 | voldoet ruim |

  De eerdere versie van deze paragraaf stelde dat wit op coral voor grote tekst wél
  voldeed. Dat klopt niet: contrast is onafhankelijk van de tekstgrootte, dus een
  knop groter of vetter zetten lost er niets aan op. De rose eyebrow-kleur was
  helemaal niet gesignaleerd, terwijl die er het slechtst uit komt — en op 12–13px
  staat.

  **Besloten (TASK-6):**
  - Knoptekst op koraal wordt **`--ink-900`** in plaats van wit (6,91:1). De
    merkkleur blijft ongewijzigd; het ontwerp gebruikt dit patroon zelf al bij de
    boekpill in de hero. Vastgelegd als `--color-on-accent`.
  - Voor eyebrows komt er een diepere rose **`--rose-600` #9E513E**, die AA haalt op
    alle vier de lichte ondergronden (page 5,33 · blush-100 4,96 · blush-200 4,51 ·
    wit 5,68). `--rose-500` blijft ongewijzigd voor decoratieve lijnen en randen.
  - Knopmaat blijft **14px/400 zoals in de prototypes**. De eis van ≥16px/500 stond
    er om het coralcontrast te repareren; die reden vervalt met de donkere
    knoptekst, en grotere knoppen zouden alleen ten koste van de ontwerptrouw gaan.
  - `--ink-400` wordt nergens voor tekst gebruikt — ook niet voor meta zoals
    behandelduur of bronvermelding bij een review. Dat zijn feiten die bezoekers
    opzoeken (§8.4), geen decoratie.
- Semantische HTML: één `<h1>` per pagina, logische kopstructuur, landmarks,
  skip-to-content link.
- Afbeeldingen met betekenis krijgen `alt`; decoratieve krijgen `alt=""`.

### 6.4 Privacy — waarom er geen cookiebanner komt

De huidige site heeft een banner omdat er Google Tag Manager en Google Analytics op
draaien, plus WordPress-plugins die cookies zetten. Die verdwijnen allemaal. Wat
overblijft, zet niets op het apparaat van de bezoeker:

| Bron | Nu | Straks |
|---|---|---|
| Google Tag Manager / Analytics | Cookies, toestemming vereist | Verdwijnt |
| WordPress + plugins | Diverse cookies | Verdwijnt |
| Google Fonts (extern geladen) | IP naar Google | Zelf gehost, geen externe call |
| Google Maps embed | Cookies, toestemming vereist | Vervangen door statische kaart + routelink |
| Statistieken | — | Vercel Web Analytics: **geen cookies, geen localStorage** |
| Salonized | — | Nieuw tabblad; hun cookies, hun banner, hun verantwoordelijkheid |

**Hoe Vercel Web Analytics werkt** (geverifieerd in hun documentatie): bezoekers worden
niet met een cookie herkend, maar met een hash die server-side uit de inkomende request
wordt afgeleid. Die hash is één dag geldig en reset daarna. Er wordt niets op het
apparaat opgeslagen of uitgelezen, en bezoekers zijn niet te volgen tussen dagen of
tussen websites. Opgeslagen worden: tijdstip, URL, referrer, land/regio/stad, OS,
browser en apparaattype — geaggregeerd, zonder IP-opslag.

**De juridische redenering, met de nuance erbij.** De toestemmingsplicht voor cookies
komt uit de ePrivacy-richtlijn, in Nederland artikel 11.7a Telecommunicatiewet. Die
bepaling gaat over het *plaatsen van of toegang krijgen tot gegevens op de randapparatuur*
van de gebruiker. Vercel doet dat niet: de hash ontstaat server-side uit gegevens die de
browser sowieso meestuurt. Op die grond is een toestemmingsbanner niet nodig.

> ⚠️ **Nuance die ik in de vorige versie te stellig had opgeschreven.** Dit is een goed
> verdedigbare positie, geen zwart-wit zekerheid. De EDPB heeft de reikwijdte van die
> bepaling de laatste jaren opgerekt richting technieken die op fingerprinting lijken, en
> een hash uit IP + user-agent zit tegen die grens aan. Daar komt bij dat het kortstondig
> verwerken van het IP-adres sowieso een AVG-verwerking is — die heeft een grondslag
> nodig (gerechtvaardigd belang) en hoort vermeld te worden. Praktisch gevolg voor deze
> site: geen banner, wél een **privacyverklaring** die benoemt dat er cookievrije
> statistieken worden bijgehouden. Ik ben geen jurist; als Vera absolute zekerheid wil,
> is de enige onbetwistbare variant om helemaal geen client-side analytics te draaien.

**Consequenties voor de bouw:**
- Privacyverklaring op `/privacy/` — kort, in dezelfde huisstijl. Toevoegen aan de
  scope in §4.1 en aan de footer.
- Geen cookiebanner, geen CMP-script.
- Verwerkersovereenkomst (DPA) met Vercel regelen bij het afsluiten van het
  Pro-abonnement.
- Google Maps embed wordt een **statische kaartafbeelding met een "Route
  beschrijving"-link** naar Google Maps. Geen cookies, sneller, en de functionele
  behoefte (route vinden) is identiek.

### 6.5 Stylingkeuze — waarom Tailwind, en waar het schuurt

Deze keuze is gemaakt op basis van een meting aan de handoff-bestanden, niet op een
vuistregel. De uitkomst:

| Meting over de zes `.dc.html`-bestanden | Uitkomst |
|---|---|
| Media queries | **0** |
| Inline style-attributen | **1037** |
| CSS-classes | **0** |

Dat is bepalend. De prototypes bevatten geen herbruikbare CSS-architectuur — het zijn
volledig inline gestylede documenten. Er valt dus niets "over te nemen": die 1037
declaraties moeten hoe dan ook vertaald worden, naar utilities óf naar zelfgeschreven
classes. Het vertaalwerk bestaat in beide scenario's.

Zwaarwegender: **alle responsive logica moet van nul geschreven worden.** De twee renders
per bestand zijn twee losse eindtoestanden, geen werkende breakpoints. Voor zes pagina's
over drie breakpoints is dat het grootste CSS-werk in het project, en precies waar
Tailwinds breakpoint-prefixes efficiënter zijn dan handgeschreven media queries.

**Waar het schuurt, en dat is bewust geaccepteerd.** Het ontwerp is maar half
systematisch. Naast de gedeclareerde spacingschaal (4/8/12/16/20/24/32/40/48) wordt er
volop 9, 10, 11, 18, 28, 36 en 38px gebruikt. De grids zijn stuk voor stuk uniek
(`1.3fr 1fr 1fr 1fr`, `minmax(0,1.1fr) minmax(0,0.9fr)`, `0.85fr/1.15fr`) en elke hero
heeft een eigen hoogte (720/520/480/460/440/420px). Dat wordt
`grid-cols-[1.3fr_1fr_1fr_1fr]` en `h-[720px]` — arbitrary values, voor ruwweg de helft
van de layout. Daar zijn arbitrary values voor bedoeld, maar wie verwacht dat alles in
nette utilities past, komt bedrogen uit.

De type-schaal, kleuren en radii zijn wél keurig systematisch en gaan één op één de
`@theme` in.

**Randvoorwaarde:** de tokens blijven de bron van waarheid. Kleuren, radii en
typografische maten worden in `@theme` gedefinieerd en overal via utilities gebruikt.
Een hardgecodeerde `#ED8967` in de opmaak is een fout, ook al levert die hetzelfde
resultaat op het scherm.

---

## 7. URL-structuur en redirects

Redirects worden ingericht in `vercel.json` als **301 (permanent)**.

### Behouden URL's (1-op-1)
```
/                 → /
/behandelingen/   → /behandelingen/
/prijzen/         → /prijzen/
/portfolio/       → /portfolio/
/contact/         → /contact/
```

### Te herschrijven
```
/over-de-salon/   → /over-mij/            301
```

### Te laten vervallen — géén redirect
Deze URL's zijn nooit actief gebruikt: het is demo-content die met het WordPress-thema
meekwam. Er is niets naartoe gelinkt en er kwam geen verkeer op. Ze krijgen daarom
**geen redirectregel**; ze vallen simpelweg weg en landen op de eigen 404-pagina.

```
/product/*                                    (36 demo-producten)
/shop/, /cart/, /checkout/, /mijn-account/
<18 blog-slugs>                               (Engelstalige stock-posts)
/category/*, /tag/*
/professional-nail-care/                      (lorem-ipsum templatepagina)
/feed/, /comments/feed/
```

Dat scheelt ~55 regels in `vercel.json` en voorkomt dat de configuratie jarenlang
ballast meedraagt voor pagina's die nooit bestonden. De nette 404-pagina in huisstijl
vangt de enkele bezoeker of bot die er nog langskomt, met een duidelijke weg terug naar
de site en een boek-CTA.

> **Let op de naamsbotsing:** `/blog/` wordt een *nieuwe*, eigen route (§5.7). De 18
> oude artikel-slugs stonden op de root (`/gels-vs-acrylics-which-one-wins/`), niet
> onder `/blog/`, dus er is geen conflict. Wel controleren bij oplevering dat geen
> nieuwe slug per ongeluk botst met een oude.

**Verificatie bij livegang:** in Search Console nakijken of een van deze URL's
onverwacht tóch verkeer of externe backlinks had. Zo ja, alsnog een gerichte 301
toevoegen — dat is dan een regel of twee, geen lijst van 55.

### Overig
- `www.nailsbyvera.nl` → `nailsbyvera.nl` (of andersom — houd de huidige canonical aan).
- Trailing slash: WordPress gebruikt trailing slashes. Astro configureren met
  `trailingSlash: 'always'` zodat bestaande links en backlinks exact blijven werken.
- Nieuwe `sitemap.xml` via `@astrojs/sitemap`, met `/blog/` uitgesloten zolang die leeg
  is (§5.7). Oude `wp-sitemap*.xml` mag 404'en.
- Sitemap opnieuw indienen in Google Search Console bij livegang.

---

## 8. Meten, vindbaarheid en AI-zichtbaarheid

### 8.1 Analytics
- **Vercel Web Analytics** — cookievrij (§6.4). Zit bij het gekozen Pro-abonnement (B4)
  inbegrepen, geen extra dienst of configuratie nodig.
- Meten van de boek-CTA als custom event, zodat het effect van het nieuwe ontwerp op
  de conversie zichtbaar is. Zonder dit weten we niet of de herbouw iets opleverde.
- Google Search Console koppelen vóór livegang, om de indexering na de migratie te
  volgen.
- **Nulmeting:** vóór livegang de huidige cijfers vastleggen (sessies, doorkliks naar
  Salonized, top-landingspagina's) uit de bestaande GTM/GA-koppeling — daarna is die
  bron weg.

> **Analytics beïnvloedt de ranking niet.** Google gebruikt de data uit Analytics niet
> als rankingsignaal. Het weglaten van GA kost dus geen zichtbaarheid; het kost alleen
> data-detail. Search Console geeft bovendien de gegevens die er voor SEO écht toe doen
> (zoekwoorden, vertoningen, posities) — die had GA nooit.

### 8.2 Wat het schrappen van de cookiebanner voor SEO betekent

Netto positief, en niet marginaal:

| Effect | Waarom |
|---|---|
| **Snellere pagina's** | Een CMP-script is doorgaans 50–150 kB JavaScript dat vóór de content laadt. Dat verdwijnt volledig. |
| **Betere CLS** | Banners duwen content weg bij het inladen — een van de meest voorkomende oorzaken van layout shift. |
| **Betere INP** | Geen consent-logica die op elke interactie meeluistert. |
| **Geen interstitial-risico** | Google beschouwt overlays die op mobiel de content afdekken als "intrusive interstitial" en kan daarop afwaarderen. Dat risico vervalt. |

Dit is een van de redenen dat de norm van Lighthouse ≥ 95 (§2) haalbaar is. Op de
huidige WordPress-site is die norm met banner, GTM en Elementor praktisch onbereikbaar.

### 8.3 Lokale SEO — het zwaartepunt voor deze salon

Voor een privésalon in Hengelo komt vrijwel al het relevante zoekverkeer uit lokale
zoekopdrachten ("nagelsalon Hengelo", "gellak in de buurt") en uit de kaartweergave.
Daarbij geldt een ongemakkelijke waarheid die in de PRD hoort te staan:

> **Het Google-bedrijfsprofiel weegt voor dit type bedrijf zwaarder dan de website
> zelf.** De site ondersteunt dat profiel; hij vervangt het niet. Een perfecte site met
> een verwaarloosd bedrijfsprofiel presteert lokaal slechter dan andersom.

Wat we op de site inrichten:
- **`LocalBusiness` / `NailSalon` structured data** met `name`, `address` (volledig
  gestructureerd), `geo` (lat/lon), `telephone`, `openingHoursSpecification`, `url`,
  `image`, `priceRange` en `sameAs` (Instagram, Facebook, Google-profiel).
- **NAP-consistentie**: naam, adres en telefoonnummer exact identiek geschreven op de
  site, in de structured data en op het Google-bedrijfsprofiel. Afwijkingen (bijv.
  "06-36079000" versus "+31 6 36079000") verzwakken het lokale signaal. Eén bron in de
  code, overal hergebruikt (§5.4).
- **Openingstijden op één plek** — footer, contactpagina en schema komen uit hetzelfde
  bestand, zodat ze niet uit elkaar kunnen lopen.
- **Plaatsnaam natuurlijk in titels en koppen** waar het past ("Nagelsalon in Hengelo"),
  zonder de warme toon van het ontwerp te verpesten. Geen keyword stuffing.
- Per pagina een eigen `<title>` en `meta description`; niet één sjabloon voor alles.

**Buiten de site, wel op de actielijst** (kost niets, levert het meeste op):
Google-bedrijfsprofiel actueel maken — openingstijden, foto's, behandelingen, en de
website-URL naar de nieuwe site. Dit valt strikt genomen buiten de bouwscope, maar het
zou vreemd zijn de site op te leveren zonder het te noemen. Zie R7.

### 8.4 GEO — zichtbaarheid in generatieve zoekmachines

**Dit is geen theoretisch kanaal.** Er zijn al klanten die de salon via ChatGPT hebben
gevonden en vervolgens een afspraak hebben gemaakt. Daarmee verandert de status van GEO
in dit project: het is geen "leuk meegenomen"-optimalisatie meer, maar een **werkend
acquisitiekanaal dat de migratie moet overleven**. Dat heeft twee gevolgen die zwaarder
wegen dan alle losse tips hieronder:

1. **Wat nu werkt, mag niet stukgaan.** Het kanaal draait op het Google-bedrijfsprofiel,
   de reviews daar, en een consistent beeld van de salon als *entiteit* (naam, adres,
   telefoon, openingstijden). Dat beeld is over jaren opgebouwd. De grootste GEO-risico's
   bij deze migratie zijn dan ook niet technisch-inhoudelijk maar administratief: een
   website-URL in het bedrijfsprofiel die na de cutover niet meer klopt, of een adres of
   telefoonnummer dat op de nieuwe site nét anders geschreven staat. Zie het risico
   "entiteit raakt inconsistent" in §11.
2. **De site kan het kanaal beter gaan bedienen dan nu.** Generatieve systemen met
   live-zoekfunctie (ChatGPT search, Perplexity, AI Overviews) halen bij een concrete
   vraag de bronpagina op. Als de pagina het antwoord letterlijk bevat, wordt het
   geciteerd; zo niet, dan valt het systeem terug op het bedrijfsprofiel of op een
   gok. De huidige site vermeldt bijvoorbeeld **nergens hoe lang een afspraak duurt** —
   terwijl "hoe lang duurt gellak" een typische vraag is. Het nieuwe ontwerp zet duur én
   prijs wél bij elke behandeling (§5.5), en verbetert daarmee de positie meteen.

**Voorstel: AI-crawlers toestaan.** In `robots.txt` `GPTBot`, `ClaudeBot`,
`PerplexityBot`, `Google-Extended` en vergelijkbare user-agents **niet** blokkeren. Voor
een salon die klanten zoekt is opgenomen worden in AI-antwoorden een kans, geen
bedreiging — er is geen te beschermen content, alleen te verspreiden informatie. (Voor
een uitgever met betaalde artikelen zou het antwoord andersom zijn.) Dit is een bewuste
keuze en geen standaardinstelling; als Vera het liever niet wil, is het één regel.

**Wat AI-modellen nodig hebben om de salon correct te beschrijven** — en dat overlapt
sterk met goede SEO:
- **Feiten die letterlijk en consistent op de pagina staan.** Adres, telefoonnummer,
  openingstijden, prijzen en behandelduur als tekst, niet verstopt in een afbeelding of
  achter JavaScript. Omdat de site statisch is, staat alles gewoon in de HTML — dat is
  hier een groot voordeel ten opzichte van een JS-zware site.
- **Structured data.** Dezelfde `LocalBusiness`-markup uit §8.3 wordt door generatieve
  systemen gebruikt om entiteiten betrouwbaar te herkennen.
- **Semantische HTML en duidelijke koppen.** Een model dat de pagina in stukken knipt,
  vindt zo makkelijker het antwoord op "wat kost gellak bij Nails by Vera".
- **Expliciete antwoorden op echte vragen.** Waar de copy het toelaat: hoe lang blijft
  het zitten, wat kost het, hoe boek ik, waar is het. Het handoff-ontwerp doet dit al
  goed (statkaarten "4 weken", "7 dagen garantie", prijstabellen met duur).

**Besloten: een FAQ-accordeon onderaan Behandelingen** (B11). Dit is de enige
inhoudelijke uitbreiding op het handoff-ontwerp. Noch de huidige site, noch het ontwerp
bevat veelgestelde vragen — terwijl letterlijk geformuleerde vraag-en-antwoordparen
precies zijn wat een generatief systeem ophaalt en citeert. Zie de aparte eis F-9
(§5.9).

**Wat ik bewust níét als zekerheid opschrijf:** `llms.txt` is een voorgestelde standaard
die nog door geen enkele grote aanbieder aantoonbaar wordt gebruikt. Het bestand kost
tien minuten en kan geen kwaad, dus we nemen het mee — maar niet met de verwachting dat
het meetbaar iets oplevert. Wie anders beweert, loopt op de feiten vooruit.

**Waar het zwaartepunt ligt.** AI-antwoorden over lokale bedrijven leunen zwaar op
Google-bedrijfsprofielen, kaartdata en reviews — dat is precies wat hier al blijkt te
werken. De site goed inrichten versterkt dat, maar vervangt het niet. Concreet betekent
dit dat het onderhouden van het bedrijfsprofiel en het blijven verzamelen van reviews
(R7) méér oplevert dan welke technische ingreep op de site ook. Dat is een oncomfortabele
conclusie voor een websiteproject, maar het is wel de juiste.

### 8.5 Meetbaar maken

Omdat het AI-kanaal al werkt, is een **nulmeting vóór de cutover geen formaliteit** —
zonder die meting kunnen we na livegang niet vaststellen of het kanaal intact is
gebleven. De uitvoerbare meetlijst staat in **`docs/nulmeting.md`**; hieronder de
samenvatting. Vast te leggen zolang de huidige GA-koppeling nog bestaat:

| Meting | Waar | Wanneer |
|---|---|---|
| Verkeer met referrer `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com` | Huidige GA | Vóór cutover |
| Totaal verkeer, top-landingspagina's, doorkliks naar Salonized | Huidige GA | Vóór cutover |
| Vertoningen en posities op lokale termen | Search Console | Vóór cutover |
| Steekproef: stel ChatGPT, Perplexity en Google AI Overviews 5 vaste vragen ("waar kan ik gellak laten zetten in Hengelo", "wat kost X bij Nails by Vera", "openingstijden Nails by Vera") en leg de antwoorden vast | Handmatig | Vóór cutover, en 2 + 8 weken erna |

Die laatste rij is laagtechnisch maar het meest direct: het laat zien of de salon
genoemd wordt, en of de genoemde feiten kloppen. Een AI-antwoord met verkeerde
openingstijden kost een klant zonder dat er ooit een bezoek in de statistieken
verschijnt.

Doorlopend na livegang:
- Search Console maandelijks op vertoningen en posities voor lokale termen.
- Vercel Analytics op referrers — AI-verkeer is deels herkenbaar, maar niet volledig:
  een deel van de bezoekers krijgt een naam of adres uit een AI-antwoord en typt dat
  vervolgens zelf in Google. Dat verkeer is niet toe te rekenen. Het gemeten aantal is
  daarom een ondergrens, geen totaal.
- De boek-CTA als custom event blijft de enige echte succesmaat: zichtbaarheid zonder
  afspraken is geen resultaat.

---

## 9. Besluiten en resterende punten

### 9.1 Genomen besluiten

| # | Punt | Besluit |
|---|---|---|
| B1 | Oude blogposts en webshop | Beide vervallen. De 18 posts en 36 producten waren thema-demo-content en zijn nooit actief gebruikt. Het blog-*fundament* wordt wél gebouwd, leeg (§5.7). |
| B2 | Blog-ontwerp | Afgeleid uit het bestaande design system, geen aparte ontwerpronde. |
| B3 | Contentbeheer | Via commit; geen CMS in fase 1 (§5.5). |
| B4 | Hosting | Vercel Pro, $20/mnd (§6.1). |
| B5 | Reviews | Statisch in een content collection (§5.8). |
| B6 | Vervallen URL's | Geen redirects — ze mogen 404'en op de eigen 404-pagina (§7). |
| B7 | DNS | Jeroen heeft toegang tot de domeinregistratie en voert de cutover zelf uit. |
| B8 | Planning | Geen harde deadline. De fasering in §10 staat op volgorde van afhankelijkheid, niet op doorlooptijd. |
| B9 | Cookiebanner | Vervalt. Er blijft niets over dat gegevens op het apparaat plaatst of uitleest (§6.4). Wél een privacyverklaring op `/privacy/`. |
| B10 | AI-crawlers | Toegestaan in `robots.txt` — de salon wil gevonden worden in AI-antwoorden (§8.4). Eén regel om terug te draaien als Vera dat liever niet wil. |
| B11 | FAQ | Accordeon onderaan Behandelingen, met `FAQPage` structured data (§5.9). Enige inhoudelijke uitbreiding op het handoff-ontwerp; toegevoegd omdat het AI-kanaal aantoonbaar werkt. |

### 9.2 Resterende punten

| # | Punt | Status |
|---|---|---|
| R1 | Lettertypes Cormorant Garamond + Jost zijn *matches*, niet aantoonbaar de originelen uit Elementor | Geen actie nodig. Het nieuwe ontwerp is er volledig op gebouwd; ze zijn daarmee de facto de nieuwe merkfonts. Alleen relevant als Vera bezwaar heeft. |
| R2 | E-mail op het domein | `info@nailsbyvera.nl` moet blijven werken. Bij de DNS-wijziging **alleen A/CNAME aanpassen en de MX-records ongemoeid laten**. Vóór de wijziging de complete DNS-zone vastleggen (screenshot of export). Zie ook §11. |
| R3 | Domein en WordPress-hosting bij dezelfde partij? | Uit te zoeken vóór de cutover. Zit de domeinregistratie bij de WordPress-host, dan moet het domein eerst verhuisd of de DNS losgekoppeld worden — anders valt bij het opzeggen ook de e-mail weg. |
| R4 | Back-up oude site | Vóór het opzeggen van de WordPress-hosting een volledige back-up (bestanden + database) veiligstellen en bewaren. |
| R5 | Reviewteksten verzamelen | De teksten van de huidige site en het Google-bedrijfsprofiel overnemen in de `reviews`-collection. Benodigd vóór oplevering. |
| R6 | Bevestiging door Vera | Het schrappen van blog en shop is inhoudelijk onderbouwd, maar het is haar site. Eén keer expliciet laten bevestigen vóór de oude installatie uit de lucht gaat. |
| R7 | Google-bedrijfsprofiel | Valt buiten de bouwscope, maar levert lokaal méér op dan de site zelf (§8.3). Bij livegang: website-URL bijwerken, openingstijden en behandelingen controleren, foto's aanvullen. Actiepunt voor Vera. |
| R8 | Privacyverklaring — tekst | De pagina wordt gebouwd, maar de tekst moet inhoudelijk kloppen: welke gegevens, welke grondslag, welke verwerkers (Vercel, Salonized). Concept opstellen en door Vera laten vaststellen. |
| R9 | Verwerkersovereenkomst Vercel | Regelen bij het afsluiten van het Pro-abonnement (§6.4). |
| R10 | **FAQ-antwoorden van Vera** | Blokkerend voor F-9 (§5.9). Benodigd: duur per behandeling in minuten, wat de 7-dagen-garantie precies dekt, parkeergelegenheid, avond/weekend. Zonder deze feiten kan de sectie niet opgeleverd worden. |
| R11 | **Nulmeting uitvoeren** | Blokkerend, en tijdgebonden: kan alleen zolang de GA-koppeling met WordPress nog bestaat. Meetlijst staat klaar in `docs/nulmeting.md`. |
| R12 | Reviews blijven verzamelen | Geen bouwactie, wel de hoogst renderende doorlopende inspanning voor zowel lokale SEO als GEO (§8.4). Klanten na een behandeling om een Google-review vragen. |

---

## 10. Fasering

### Fase 1 — Statische Astro-site (dit document)
Zoals hierboven beschreven. Salonized blijft het boekingssysteem.

**Werkstroom, op volgorde van afhankelijkheid** (geen harde deadline — klaar is klaar):
1. Astro-project opzetten, tokens en fonts inrichten, basislayout
2. Componenten porten uit het design system (Button, Eyebrow, SectionHeading,
   ServiceCard, TestimonialCard, StatBlock, StarRating, ArchFrame, Sparkle, Logo)
3. Assets downloaden en optimaliseren — **moet af zijn vóór de WordPress-hosting
   opgezegd wordt**, want de bronbestanden staan daar
4. Home bouwen (dekt het merendeel van de componenten af)
5. Overige vijf pagina's + 404 + privacyverklaring
6. Interactie: mobiel menu, portfoliofilter, sticky boekbalk
7. Blog-fundament: collection, `/blog/`-route, artikelsjabloon (leeg, `noindex`)
7b. FAQ-accordeon op Behandelingen, met `FAQPage` markup (§5.9) — vereist de antwoorden
    van Vera (R10)
8. Content vullen: prijzen, behandelingen, portfolio-categorieën, reviewteksten (R5)
9. SEO + GEO: structured data, sitemap, `robots.txt`, `llms.txt`, analytics met
   custom event op de boek-CTA (§8)
9b. **Nulmeting vastleggen** — GA-cijfers inclusief AI-referrers, Search Console, en de
    handmatige AI-steekproef (§8.5). Kan en mag nu al, hoeft niet te wachten op de bouw;
    móét gebeuren vóór de GA-koppeling met WordPress verdwijnt
10. Redirect voor `/over-de-salon/` in `vercel.json`
11. Review op preview-URL door Vera, op haar eigen telefoon en op desktop
12. Toegankelijkheids- en Lighthouse-controle, correcties
13. Cutover: DNS-zone vastleggen (R2) → back-up oude site (R4) → A/CNAME omzetten,
    MX ongemoeid → e-mail testen → site verifiëren → Search Console
14. Direct na livegang: Google-bedrijfsprofiel bijwerken (R7) en sitemap indienen
15. Nazorg: 2 weken monitoren (404's, Search Console, e-mail), daarna pas de
    WordPress-hosting opzeggen

**Definition of done:** alle acceptatiecriteria uit §2 gehaald, de `/over-mij/`-redirect
geverifieerd, e-mail op het domein aantoonbaar werkend, en de oude WordPress-installatie
veiliggesteld en uit de lucht.

### Fase 2 — Eigen boekingsmodule (apart te besluiten)
Wordt pas gestart ná fase 1 en na een expliciete go. Te beantwoorden vraag: is een
eigen planner op Vercel + Supabase rendabel en eenvoudig genoeg om Salonized te
vervangen?

**Wat er dan minimaal moet zijn** — dit is de meetlat voor "eenvoudig genoeg", niet
de opdracht:
- Behandelingen met duur en prijs
- Beschikbaarheid afgeleid van openingstijden, bestaande afspraken en handmatige
  blokkades — inclusief de regel dat de benodigde tijd per behandeling verschilt
- Boeken met bevestiging per e-mail, en per SMS of WhatsApp
- Herinnering vooraf, en annuleren/verzetten door de klant
- Agenda voor Vera, ook op haar telefoon
- No-show-beleid, eventueel aanbetaling (dan ook een betaalprovider)
- Synchronisatie met haar persoonlijke agenda
- AVG: persoonsgegevens van klanten, verwerkersovereenkomst, bewaartermijnen
- Migratie van bestaande klanten en afspraken uit Salonized

**Eerlijke inschatting vooraf:** Salonized kost enkele tientjes per maand en dekt dit
allemaal, inclusief support als er iets misgaat op een zaterdagochtend. Een eigen
module is technisch goed te bouwen, maar het onderhoud, de betrouwbaarheid van
notificaties en de AVG-verantwoordelijkheid komen dan bij ons te liggen. De afweging
in fase 2 is daarom niet primair "kunnen we het bouwen" — dat kan — maar "willen we
dit beheren". Fase 1 is zo ingericht dat die keuze open blijft: één component bepaalt
waar de boekknop naartoe wijst.

---

## 11. Risico's

| Risico | Impact | Beheersing |
|---|---|---|
| E-mail valt uit bij DNS-wijziging | Hoog | Alleen A/CNAME wijzigen, MX-records vooraf exporteren en ongemoeid laten; direct na de omzetting een testmail sturen én ontvangen op `info@nailsbyvera.nl` (R2) |
| Domein blijkt bij de WordPress-host te zitten | Hoog | Uitzoeken vóór de cutover (R3). Zo ja: eerst domein verhuizen of DNS loskoppelen, pas daarna de hosting opzeggen |
| **Entiteit raakt inconsistent en het werkende AI-kanaal verzwakt** | Hoog | Het kanaal draait op een consistent beeld van de salon over site, bedrijfsprofiel en reviews. Beheersing: NAP exact gelijk houden (§8.3), website-URL in het bedrijfsprofiel direct na cutover bijwerken (R7), en de steekproef uit §8.5 vóór én na livegang uitvoeren zodat een afwijking binnen twee weken opvalt |
| Verlies van zoekposities na migratie | Middel | De zes echte pagina's houden hun URL (op `/over-mij/` na, die krijgt een 301), trailing slashes blijven behouden, sitemap opnieuw indienen, 8 weken monitoren in Search Console |
| Een vervallen URL blijkt tóch verkeer te hebben | Laag | Bewuste keuze om ~55 URL's te laten 404'en (B6). Vangnet: in Search Console controleren op verkeer en backlinks; zo nodig alsnog een gerichte 301 toevoegen |
| Oude site te vroeg opgezegd | Hoog | Assets eerst binnenhalen (stap 3), volledige back-up vóór cutover (R4), hosting pas opzeggen na 2 weken stabiel draaien |
| Discussie over de cookievrije analytics | Laag | De positie is verdedigbaar maar niet zwart-wit (§6.4). Beheersing: privacyverklaring die het benoemt, DPA met Vercel. Terugvaloptie als Vera zekerheid wil: analytics volledig uitzetten — dat kost data, geen functionaliteit |
| Ontwerp wijkt af op echte apparaten | Middel | Review door Vera op haar eigen telefoon, niet alleen in de browser-devtools |
| Salonized-widget wijzigt of blokkeert embedden | Laag | We linken naar het widget in een nieuw tabblad in plaats van in te bedden — minder afhankelijk |
| Afbeeldingen ontbreken na WordPress-afsluiting | Middel | Alle 18 assets downloaden en committen vóór de cutover; geen hotlinks |

---

## 12. Referenties

- Design handoff: `design_handoff_nailsbyvera/README.md` — pagina-voor-pagina
  specificatie, definitieve tokens en copy
- Design system: `design_handoff_nailsbyvera/_ds/nails-by-vera-design-system-.../`
  — `tokens/*.css`, `styles.css`, componentbroncode
- Huidige site: https://nailsbyvera.nl
- Boekingssysteem: https://nailsbyvera.salonized.com/widget_bookings/new
- Vaste gegevens: De Genestetstraat 41, Hengelo · 06-36079000 · info@nailsbyvera.nl ·
  @byveranails · di & do 09:00–17:15, za 09:00–13:00
- **Nulmeting:** `docs/nulmeting.md` — uit te voeren vóór de GA-koppeling verdwijnt (R11)

> **Let op:** `support.js` en `image-slot.js` in het handoff-pakket zijn runtime van de
> prototype-omgeving en horen **niet** in productie. De `.dc.html`-bestanden zijn
> ontwerpreferenties, geen over te nemen productiecode.
