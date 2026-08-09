/**
 * Content collections (TASK-8).
 *
 * Zes stuks: de vijf die de taak noemt — `treatments`, `prices`, `portfolio`,
 * `reviews`, `faq` — plus `services` voor de vier kaarten van de homepagina.
 * Die laatste is er bewust naast gezet en niet in `treatments` geschoven: de
 * home toont vier kaarten waaronder "Verlenging", `treatments` beschrijft drie
 * behandelgroepen, en beide hebben hun eigen tekst, duur en prijs. Eén bestand
 * voor twee pagina's met verschillende behoeften wordt een bestand waarin je
 * per veld moet weten voor wie het bedoeld is.
 *
 * Eén YAML-bestand per collection in plaats van een bestand per item: de
 * randvoorwaarde uit PRD §5.5 is dat een prijswijziging één regel in één bestand
 * is. Bij deze omvang is opsplitsen alleen maar zoekwerk.
 */
// `z` komt uit 'astro/zod' en niet uit 'astro:content': die re-export is in
// Astro 7 afgeschreven.
import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';
import { photos, type PhotoKey } from './data/images';

// z.enum wil een niet-lege tuple; Object.keys levert string[]. De cast is veilig
// omdat het manifest nooit leeg is, en levert wél de winst op: een typefout in
// een fotosleutel breekt de build in plaats van stilletjes een gat te laten.
const photoKeys = Object.keys(photos) as [PhotoKey, ...PhotoKey[]];

const treatments = defineCollection({
  loader: file('src/content/treatments.yaml'),
  schema: z.object({
    /** Volgorde op de behandelingenpagina. */
    order: z.number().int().positive(),
    /** Het labeltje boven de titel, bijvoorbeeld "Biab / Gel / Acrylgel". */
    eyebrow: z.string(),
    title: z.string(),
    /** Korte naam voor chips en links, los van de wervende titel. */
    label: z.string(),
    intro: z.string(),
    bullets: z.array(z.string()).min(1),
    /** Behandelduur als leesbare tekst — een feit dat bezoekers opzoeken (PRD §8.4). */
    duration: z.string(),
    /** Prijs of prijsbereik, in dezelfde schrijfwijze als de prijzenpagina. */
    price: z.string(),
    /** Sleutel uit src/data/images.ts. */
    photo: z.enum(photoKeys),
  }),
});

const prices = defineCollection({
  loader: file('src/content/prices.yaml'),
  schema: z.object({
    /** Volgorde in het raster op de prijzenpagina. */
    order: z.number().int().positive(),
    title: z.string(),
    rows: z
      .array(
        z.object({
          label: z.string(),
          price: z.string(),
          /** Toelichting onder het label, bijvoorbeeld "incl. nabehandeling". */
          note: z.string().optional(),
        }),
      )
      .min(1),
    /** Voetnoot onder de kaart. */
    note: z.string().optional(),
  }),
});

const portfolio = defineCollection({
  loader: file('src/content/portfolio.yaml'),
  schema: z.object({
    /** Volgorde in het raster. */
    order: z.number().int().positive(),
    /** Sleutel uit src/data/images.ts; daar staan bestand en alt-tekst. */
    photo: z.enum(photoKeys),
    /** Waarde waarop het filter selecteert (PRD §5.3, TASK-9). */
    category: z.enum(['versteviging', 'gellak', 'nailart']),
    /** Tegelgrootte in het raster; standaard één tegel. */
    span: z.enum(['large', 'wide']).optional(),
  }),
});

/**
 * De vier kaarten van "Wat ik voor je doe" op de homepagina.
 *
 * Losse duur en prijs per kaart, want die staan er als samenvatting: de home
 * toont het instaptarief van een groep, de prijzenpagina alle losse regels.
 * Wie in `prices.yaml` een tarief wijzigt, controleert hier of dat instaptarief
 * nog klopt — net als bij het bereik in `treatments.yaml`.
 */
const services = defineCollection({
  loader: file('src/content/services.yaml'),
  schema: z.object({
    /** Volgorde in het raster op de home. */
    order: z.number().int().positive(),
    title: z.string(),
    /** Korte omschrijving; op mobiel laat het ontwerp die weg. */
    description: z.string(),
    /**
     * Linkerkant van de voetregel. Heet `meta` en niet `duration` omdat de
     * nail-artkaart daar geen tijd maar "p/nagel" zet.
     */
    meta: z.string(),
    price: z.string(),
    /** Sleutel uit src/data/images.ts. */
    photo: z.enum(photoKeys),
  }),
});

/**
 * Klantreviews.
 *
 * `author` en `authorShort` allebei, omdat het ontwerp bij letterlijk hetzelfde
 * citaat op de portfoliopagina "Sandra Kamst" schrijft en op de home "Sandra K.".
 * De copy is definitief (PRD §5.5), dus die twee schrijfwijzen blijven allebei
 * staan in plaats van dat er één gekozen wordt.
 *
 * `date` en `source` zijn optioneel zolang TASK-4 de echte reviewgegevens nog
 * niet heeft opgehaald. TASK-12 heeft ze wél nodig voor de `Review`-markup.
 */
const reviews = defineCollection({
  loader: file('src/content/reviews.yaml'),
  schema: z.object({
    /** Volgorde waarin de reviews getoond worden. */
    order: z.number().int().positive(),
    author: z.string(),
    /** Kortere schrijfwijze voor krappe kaarten, bijvoorbeeld "Sandra K.". */
    authorShort: z.string().optional(),
    rating: z.number().int().min(1).max(5),
    quote: z.string(),
    /** Datum van de review. Ontbreekt tot TASK-4 hem levert. */
    date: z.coerce.date().optional(),
    source: z.enum(['google', 'facebook', 'site']).optional(),
  }),
});

/**
 * De veelgestelde vragen. TASK-10 bouwt hier de accordeon op.
 *
 * `confirmed` is geen sierveld: de antwoorden hieronder zijn afgeleid uit wat er
 * al op de site staat en zijn nog niet door Vera bevestigd (TASK-4). Zo is dat
 * machineleesbaar in plaats van dat het in een comment verdwijnt, en kan TASK-10
 * er een bewuste keuze in maken. Zolang alles op `false` staat, is dat wel een
 * val: filteren op `confirmed` levert nu een lege FAQ op.
 */
const faq = defineCollection({
  loader: file('src/content/faq.yaml'),
  schema: z.object({
    /** Volgorde in de accordeon. */
    order: z.number().int().positive(),
    question: z.string(),
    /** Leeg zolang er niets over te zeggen valt zonder te gokken. */
    answer: z.string(),
    /** `true` zodra Vera het antwoord heeft bevestigd (TASK-4). */
    confirmed: z.boolean().default(false),
  }),
});

export const collections = {
  treatments,
  prices,
  portfolio,
  services,
  reviews,
  faq,
};
