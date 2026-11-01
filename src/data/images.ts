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

import bordeauxGlitter from '../assets/photos/gellak-bordeaux-glitter.jpg';
import gellakGoud from '../assets/photos/gellak-goud.jpg';
import lichtblauweGellak from '../assets/photos/gellak-lichtblauwe.jpg';
import gellakHalloween from '../assets/photos/gellak-nailart-halloween.jpg';
import gellakTomaat from '../assets/photos/gellak-nailart-tomaat.jpg';
import dieproodAmandel from '../assets/photos/versteviging-dieprood-amandel.jpg';
import flakes from '../assets/photos/versteviging-flakes.jpg';
import lilaAmandel from '../assets/photos/versteviging-lila.jpg';
import nailart3dGeel from '../assets/photos/versteviging-nailart-3d-geel.jpg';
import nailart3dGoud from '../assets/photos/versteviging-nailart-3d-goud.jpg';
import nailart3dParels from '../assets/photos/versteviging-nailart-3d-parels.jpg';
import nailart3dRoze from '../assets/photos/versteviging-nailart-3d-roze.jpg';
import nailart3dZomerRoze from '../assets/photos/versteviging-nailart-3d-zomer-roze.jpg';
import nailart3dZomer from '../assets/photos/versteviging-nailart-3d-zomer.jpg';
import blauweBloemetjes from '../assets/photos/versteviging-nailart-blauwe-bloemetjes.jpg';
import nailartBruids from '../assets/photos/versteviging-nailart-bruids.jpg';
import nailartCateyePanter from '../assets/photos/versteviging-nailart-cateye-panter.jpg';
import nailartFrench from '../assets/photos/versteviging-nailart-french.jpg';
import nailartKant from '../assets/photos/versteviging-nailart-kant.jpg';
import nailartLente from '../assets/photos/versteviging-nailart-lente.jpg';
import nailartLuipaard from '../assets/photos/versteviging-nailart-luipaard.jpg';
import nailartPoeh from '../assets/photos/versteviging-nailart-poeh.jpg';
import rozeGeel from '../assets/photos/versteviging-nailart-roze-geel.jpg';
import nailartSmileys from '../assets/photos/versteviging-nailart-smileys.jpg';
import turquoiseMadeliefjes from '../assets/photos/versteviging-nailart-turquoise-madeliefjes.jpg';
import nudeNatuurlijk from '../assets/photos/versteviging-nude-natuurlijk.jpg';
import pink from '../assets/photos/versteviging-pink.jpg';
import veraPortret from '../assets/photos/over-mij.jpg';
import kaartSalon from '../assets/kaart-salon-hengelo.png';

/** Categorie voor het portfoliofilter (PRD §5.3). */
export type PhotoCategory = 'gellak' | 'nailart' | 'versteviging' | 'salon';

export interface Photo {
  src: ImageMetadata;
  /** Nederlandse alt-tekst; leeg alleen voor puur decoratief gebruik. */
  alt: string;
  /** Eén of meer; het portfoliofilter toont de foto onder elke categorie die hier staat. */
  categories: readonly PhotoCategory[];
  /**
   * Oorspronkelijk pad in de WordPress-mediabibliotheek. Ontbreekt bij beeld
   * dat niet uit die bibliotheek komt; dan zegt `bron` waar het vandaan komt.
   */
  wordpress?: string;
  /** Herkomst van beeld dat niet uit WordPress komt, inclusief licentie. */
  bron?: string;
}

export const photos = {
  bordeauxGlitter: {
    src: bordeauxGlitter,
    alt: 'Hand met bordeauxrode nagels met glitter, rustend op een zacht roze kussen',
    categories: ['gellak'],
    bron: 'Eigen foto Nails by Vera.',
  },
  gellakGoud: {
    src: gellakGoud,
    alt: 'Hand met korte nagels in een zachte nudetint met warme glans, naast de mouw van een spijkerjas',
    categories: ['gellak'],
    bron: 'Eigen foto Nails by Vera.',
  },
  lichtblauweGellak: {
    src: lichtblauweGellak,
    alt: 'Hand met korte nagels in lichtblauwe gellak en een gouden ring',
    categories: ['gellak'],
    bron: 'Eigen foto Nails by Vera.',
  },
  gellakHalloween: {
    src: gellakHalloween,
    alt: 'Hand met korte nagels met halloween nail art: rode strepen, kleine gezichtjes en zwart-witte ruiten',
    categories: ['gellak', 'nailart'],
    bron: 'Eigen foto Nails by Vera.',
  },
  gellakTomaat: {
    src: gellakTomaat,
    alt: 'Hand met korte nagels met kleine nail artdetails, waaronder een rood tomaatje, en een getatoeëerd hartje op de vinger',
    categories: ['gellak', 'nailart'],
    bron: 'Eigen foto Nails by Vera.',
  },
  dieproodAmandel: {
    src: dieproodAmandel,
    alt: 'Amandelvormige nagels in dieprood op een witte satijnen ondergrond',
    categories: ['versteviging'],
    bron: 'Eigen foto Nails by Vera.',
  },
  flakes: {
    src: flakes,
    alt: 'Hand met amandelvormige nagels in zachtroze met kleine gekleurde flakes',
    categories: ['versteviging'],
    bron: 'Eigen foto Nails by Vera.',
  },
  lilaAmandel: {
    src: lilaAmandel,
    alt: 'Lange amandelvormige nagels in lila met een glanzende afwerking',
    categories: ['versteviging'],
    bron: 'Eigen foto Nails by Vera.',
  },
  nailart3dGeel: {
    src: nailart3dGeel,
    alt: 'Lange, doorschijnend roze nagels met gele french-randjes en zilveren ringen aan de vingers',
    categories: ['versteviging', 'nailart'],
    bron: 'Eigen foto Nails by Vera.',
  },
  nailart3dGoud: {
    src: nailart3dGoud,
    alt: 'Hand met korte nagels in zachte nude- en parelmoertinten met kleine nail artdetails',
    categories: ['versteviging', 'nailart'],
    bron: 'Eigen foto Nails by Vera.',
  },
  nailart3dParels: {
    src: nailart3dParels,
    alt: 'Hand met roze nagels met 3D-parels en een witte french-rand, met een zilveren ring',
    categories: ['versteviging', 'nailart'],
    bron: 'Eigen foto Nails by Vera.',
  },
  nailart3dRoze: {
    src: nailart3dRoze,
    alt: 'Handen met amandelvormige nagels in roze met witte french-randjes en kleine 3D-details',
    categories: ['versteviging', 'nailart'],
    bron: 'Eigen foto Nails by Vera.',
  },
  nailart3dZomerRoze: {
    src: nailart3dZomerRoze,
    alt: 'Hand met nagels met roze en gele bloemetjes als nail art, voor een rood topje',
    categories: ['versteviging', 'nailart'],
    bron: 'Eigen foto Nails by Vera.',
  },
  nailart3dZomer: {
    src: nailart3dZomer,
    alt: 'Hand met nude nagels met kleine roze 3D-bloemetjes, voor een geel topje en een spijkerbroek',
    categories: ['versteviging', 'nailart'],
    bron: 'Eigen foto Nails by Vera.',
  },
  blauweBloemetjes: {
    src: blauweBloemetjes,
    alt: 'Nude nagels met kleine blauwe bloemetjes, hand bij rode rozen',
    categories: ['versteviging', 'nailart'],
    bron: 'Eigen foto Nails by Vera.',
  },
  nailartBruids: {
    src: nailartBruids,
    alt: 'Hand met melkwitte amandelvormige nagels met zilveren glitter en subtiele witte swirls',
    categories: ['versteviging', 'nailart'],
    bron: 'Eigen foto Nails by Vera.',
  },
  nailartCateyePanter: {
    src: nailartCateyePanter,
    alt: 'Hand met bordeauxbruine nagels met cat-eye en panterprint op twee nagels, voor een mintgroen topje',
    categories: ['versteviging', 'nailart'],
    bron: 'Eigen foto Nails by Vera.',
  },
  nailartFrench: {
    src: nailartFrench,
    alt: 'Hand met korte nude nagels met een fijne witte french manicure',
    categories: ['versteviging', 'nailart'],
    bron: 'Eigen foto Nails by Vera.',
  },
  nailartKant: {
    src: nailartKant,
    alt: 'Handen met zilveren ringen en nude nagels met bruine panterprint als nail art',
    categories: ['versteviging', 'nailart'],
    bron: 'Eigen foto Nails by Vera.',
  },
  nailartLente: {
    src: nailartLente,
    alt: 'Hand met nude nagels met kleine groene en witte lentemotieven',
    categories: ['versteviging', 'nailart'],
    bron: 'Eigen foto Nails by Vera.',
  },
  nailartLuipaard: {
    src: nailartLuipaard,
    alt: 'Hand met nude nagels met luipaardprint en een witte french-rand, voor een saliegroene trui',
    categories: ['versteviging', 'nailart'],
    bron: 'Eigen foto Nails by Vera.',
  },
  nailartPoeh: {
    src: nailartPoeh,
    alt: 'Handen met lange amandelvormige nagels met gele en roze french-randjes, bijtjes en kleine nail artdetails',
    categories: ['versteviging', 'nailart'],
    bron: 'Eigen foto Nails by Vera.',
  },
  rozeGeel: {
    src: rozeGeel,
    alt: 'Hand met lange amandelvormige nagels in zachtroze, voor een grijs topje en een spijkerbroek',
    categories: ['versteviging', 'nailart'],
    bron: 'Eigen foto Nails by Vera.',
  },
  nailartSmileys: {
    src: nailartSmileys,
    alt: 'Nail art met gele smileys en zwarte hartjes op een witte en nude ondergrond',
    categories: ['versteviging', 'nailart'],
    bron: 'Eigen foto Nails by Vera.',
  },
  turquoiseMadeliefjes: {
    src: turquoiseMadeliefjes,
    alt: 'Turquoise nagels met witte madeliefjes als nail art',
    categories: ['versteviging', 'nailart'],
    bron: 'Eigen foto Nails by Vera.',
  },
  nudeNatuurlijk: {
    src: nudeNatuurlijk,
    alt: 'Hand met korte nagels in een natuurlijke nudetint, rustend tegen een lichte achtergrond',
    categories: ['versteviging'],
    bron: 'Eigen foto Nails by Vera.',
  },
  pink: {
    src: pink,
    alt: 'Hand met korte nagels in felroze, buiten, met herfstbladeren op de stoep',
    categories: ['versteviging'],
    bron: 'Eigen foto Nails by Vera.',
  },
  veraPortret: {
    src: veraPortret,
    alt: 'Portret van Vera, eigenaar van Nails by Vera',
    categories: ['salon'],
    bron: 'Eigen foto Nails by Vera.',
  },
  kaartSalon: {
    src: kaartSalon,
    alt: `Kaart van de buurt rond ${contact.street} in ${contact.city}, met de salon in het midden`,
    categories: ['salon'],
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
