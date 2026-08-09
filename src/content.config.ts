/**
 * Content collections.
 *
 * De volledige set (`treatments`, `prices`, `portfolio`, `reviews`, `faq`) hoort
 * bij TASK-8; die taak wacht op de content die alleen Vera heeft (TASK-4). De
 * twee die daar niet op wachten staan er al, omdat de pagina's die ze gebruiken
 * hun duur en prijs uit een collection moeten lezen in plaats van uit de opmaak
 * (TASK-7.3 AC #3, TASK-7.4 AC #2, PRD §5.5).
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

export const collections = { treatments, prices };
