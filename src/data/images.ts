/**
 * Beeldmanifest — alle foto's uit de WordPress-mediabibliotheek (TASK-2).
 *
 * Elke afbeelding staat hier één keer, met haar alt-tekst ernaast. Alt-tekst
 * hoort bij het beeld, niet bij de plek waar het toevallig staat: zo kan
 * dezelfde foto op meerdere pagina's terugkomen zonder dat iemand de
 * beschrijving opnieuw moet verzinnen (PRD §5.6, §6.3).
 *
 * `wordpress` bewaart het oorspronkelijke pad in de mediabibliotheek. De
 * prototypes in design_handoff_nailsbyvera/ verwijzen met die namen naar de
 * foto's; via dit veld is elke tegel in het ontwerp terug te vinden nadat de
 * bestanden beschrijvende namen hebben gekregen. Nodig zolang de pagina's nog
 * gebouwd worden, en daarna nog steeds handig als herkomstbewijs.
 *
 * Gebruik in een pagina of component:
 *
 *   import { Image } from 'astro:assets';
 *   import { photos } from '../data/images';
 *   <Image src={photos.hero.src} alt={photos.hero.alt} widths={[640, 1280, 2560]} />
 *
 * Astro leest breedte en hoogte uit de geïmporteerde ImageMetadata en zet die
 * als width/height op het element — vandaar geen expliciete maten in dit
 * bestand.
 *
 * Voor hero-foto's gelden aparte eisen: die worden op een telefoon staand en op
 * een breed scherm panoramisch bijgesneden, dus niet elke foto kan er een zijn.
 * Formaat, veilige zone en de valkuil met `sizes` staan in
 * `backlog/docs/beeldrichtlijnen-hero.md/`.
 */

import type { ImageMetadata } from 'astro';
// Alleen voor de alt-tekst van de kaart: die noemt het adres, en dat hoort
// nergens een tweede keer uitgeschreven te staan (TASK-8 AC #2).
import { contact } from './site';

import nudeKortGlans from '../assets/photos/nagels-nude-kort-glans.jpeg';
import nudeBuitenBankje from '../assets/photos/nagels-nude-buiten-bankje.jpeg';
import lichtblauweGellak from '../assets/photos/nagels-lichtblauwe-gellak.jpg';
import bordeauxGlitter from '../assets/photos/nagels-bordeaux-glitter.jpg';
import nudeWitteSwirls from '../assets/photos/nagels-nude-witte-swirls.jpg';
import nudeNatuurlijk from '../assets/photos/nagels-nude-natuurlijk.jpg';
import turquoiseMadeliefjes from '../assets/photos/nagels-turquoise-madeliefjes.jpg';
import lilaLangAmandel from '../assets/photos/nagels-lila-lang-amandel.jpg';
import kersroodHerfst from '../assets/photos/nagels-kersrood-herfst.jpeg';
import rozeAmandelRingen from '../assets/photos/nagels-roze-amandel-ringen.jpg';
import nailartSmileys from '../assets/photos/nagels-nailart-smileys.jpeg';
import blauweBloemetjesRoos from '../assets/photos/nagels-blauwe-bloemetjes-roos.jpeg';
import blauweBloemetjes from '../assets/photos/nagels-blauwe-bloemetjes.jpeg';
import rozeOmbreSalon from '../assets/photos/nagels-roze-ombre-salon.jpeg';
import dieproodAmandel from '../assets/photos/nagels-dieprood-amandel.jpeg';
import frenchGeleBloemetjes from '../assets/photos/nagels-french-gele-bloemetjes.jpeg';
import veraPortret from '../assets/photos/vera-portret.jpeg';
import kaartSalon from '../assets/kaart-salon-hengelo.png';

/** Categorie voor het portfoliofilter (PRD §5.3). */
export type PhotoCategory = 'gellak' | 'nailart' | 'versteviging' | 'salon';

export interface Photo {
  src: ImageMetadata;
  /** Nederlandse alt-tekst; leeg alleen voor puur decoratief gebruik. */
  alt: string;
  category: PhotoCategory;
  /**
   * Oorspronkelijk pad in de WordPress-mediabibliotheek. Ontbreekt bij beeld
   * dat niet uit die bibliotheek komt; dan zegt `bron` waar het vandaan komt.
   */
  wordpress?: string;
  /** Herkomst van beeld dat niet uit WordPress komt, inclusief licentie. */
  bron?: string;
}

export const photos = {
  nudeKortGlans: {
    src: nudeKortGlans,
    alt: 'Hand met korte, natuurlijk ogende nagels in een zachte nudetint met hoogglans',
    category: 'gellak',
    wordpress: '2024/07/IMG_9294',
  },
  nudeBuitenBankje: {
    src: nudeBuitenBankje,
    alt: 'Hand met nude nagels rustend op een grijs houten bankje, mouw van een spijkerjas zichtbaar',
    category: 'gellak',
    wordpress: '2024/07/IMG_8717',
  },
  lichtblauweGellak: {
    src: lichtblauweGellak,
    alt: 'Hand met korte nagels in lichtblauwe gellak en een gouden ring',
    category: 'gellak',
    wordpress: '2024/07/IMG_9895',
  },
  bordeauxGlitter: {
    src: bordeauxGlitter,
    alt: 'Hand met donkerrode nagels met glitter, rustend op een roze handkussen',
    category: 'gellak',
    wordpress: '2024/07/IMG_8747',
  },
  nudeWitteSwirls: {
    src: nudeWitteSwirls,
    alt: 'Nude nagels met witte golvende lijnen als nail art',
    category: 'nailart',
    wordpress: '2024/07/IMG_0121',
  },
  nudeNatuurlijk: {
    src: nudeNatuurlijk,
    alt: 'Hand met korte nagels in een natuurlijke nudetint',
    category: 'gellak',
    wordpress: '2024/07/IMG_9296',
  },
  turquoiseMadeliefjes: {
    src: turquoiseMadeliefjes,
    alt: 'Turquoise nagels met witte madeliefjes als nail art',
    category: 'nailart',
    wordpress: '2024/07/IMG_9888',
  },
  lilaLangAmandel: {
    src: lilaLangAmandel,
    alt: 'Lange amandelvormige nagels in lila met een glanzende afwerking',
    category: 'versteviging',
    wordpress: '2024/07/IMG_9227',
  },
  kersroodHerfst: {
    src: kersroodHerfst,
    alt: 'Hand met kersrode nagels buiten, met gevallen herfstbladeren op de stoep',
    category: 'gellak',
    wordpress: '2024/07/FullSizeRender',
  },
  rozeAmandelRingen: {
    src: rozeAmandelRingen,
    alt: 'Amandelvormige nagels in zacht roze, met zilveren ringen aan de vingers',
    category: 'versteviging',
    wordpress: '2024/08/IMG_1516',
  },
  nailartSmileys: {
    src: nailartSmileys,
    alt: 'Nail art met gele smileys en zwarte hartjes op een witte en nude ondergrond',
    category: 'nailart',
    wordpress: '2024/08/IMG_0354',
  },
  blauweBloemetjesRoos: {
    src: blauweBloemetjesRoos,
    alt: 'Nude nagels met kleine blauwe bloemetjes, hand bij een rode roos',
    category: 'nailart',
    wordpress: '2024/08/IMG_1684',
  },
  blauweBloemetjes: {
    src: blauweBloemetjes,
    alt: 'Nude nagels met kleine blauwe bloemetjes als nail art',
    category: 'nailart',
    wordpress: '2024/08/IMG_1879',
  },
  rozeOmbreSalon: {
    src: rozeOmbreSalon,
    alt: 'Hand met nagels in een roze ombré, gefotografeerd in de salon',
    category: 'gellak',
    wordpress: '2024/08/IMG_1957',
  },
  dieproodAmandel: {
    src: dieproodAmandel,
    alt: 'Amandelvormige nagels in dieprood op een witte satijnen ondergrond',
    category: 'versteviging',
    wordpress: '2024/08/IMG_1862',
  },
  frenchGeleBloemetjes: {
    src: frenchGeleBloemetjes,
    alt: 'Korte nagels met een witte french manicure en kleine gele bloemetjes',
    category: 'nailart',
    wordpress: '2024/08/IMG_1551',
  },
  veraPortret: {
    src: veraPortret,
    alt: 'Portret van Vera, eigenaar van Nails by Vera',
    category: 'salon',
    wordpress: '2024/08/Photoroom_20240306_101904',
  },
  kaartSalon: {
    src: kaartSalon,
    alt: `Kaart van de buurt rond ${contact.street} in ${contact.city}, met de salon in het midden`,
    category: 'salon',
    bron:
      'Samengesteld uit tegels van tile.openstreetmap.org — © OpenStreetMap-bijdragers, ' +
      'tegels CC-BY-SA. Zoomniveau 17, gecentreerd op 52.2646111, 6.8235258. ' +
      'De contactpagina laadt geen enkele externe kaart (TASK-7.6 AC #3); dit ' +
      'bestand is één keer gemaakt en staat in de repo.',
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

/** Alle foto's als lijst — handig voor het portfolioraster en het filter. */
export const photoList = Object.entries(photos).map(([key, photo]) => ({
  key: key as PhotoKey,
  ...photo,
}));
