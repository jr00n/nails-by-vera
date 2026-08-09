/**
 * Vaste gegevens van de salon — één bron voor de hele site.
 *
 * NAP-consistentie (naam, adres, telefoon) is een harde eis: dezelfde
 * schrijfwijze op de site, in de structured data en op het Google-bedrijfs-
 * profiel. Afwijkingen verzwakken het lokale zoeksignaal en het AI-kanaal
 * (PRD §8.3, §8.4). Wijzig deze waarden dus nooit alleen op één plek.
 */

export const site = {
  name: 'Nails by Vera',
  tagline: 'Nagelstyliste · Hengelo (OV)',
  description:
    'Privé-nagelsalon in Hengelo (OV). Gellak, BIAB, acrylgel en nail art — één klant tegelijk, met alle aandacht voor jouw nagels.',
  url: 'https://nailsbyvera.nl',
  locale: 'nl-NL',
} as const;

export const contact = {
  street: 'De Genestetstraat 41',
  /** TODO (TASK-4): postcode opvragen bij Vera — nodig voor de PostalAddress
   *  in de structured data (TASK-12). Staat niet in het handoff-pakket. */
  postalCode: '',
  city: 'Hengelo',
  region: 'Overijssel',
  country: 'NL',
  /** Weergavevorm zoals in het ontwerp */
  phoneDisplay: '06 – 36 07 90 00',
  /** Vorm voor tel:-links en structured data */
  phoneHref: '+31636079000',
  email: 'info@nailsbyvera.nl',
  whatsapp: 'https://wa.me/31636079000',
  /**
   * Routebeschrijving. Een link naar Google Maps, geen embed: een embed zet
   * cookies en zou een banner terugbrengen op een site die verder cookievrij is
   * (PRD §6.4). De bezoeker wil de route, en die krijgt hij hiermee net zo goed.
   */
  routeUrl:
    'https://www.google.com/maps/dir/?api=1&destination=De+Genestetstraat+41%2C+Hengelo',
} as const;

export const social = {
  instagram: 'https://www.instagram.com/byveranails/',
  instagramHandle: '@byveranails',
  /** TODO (TASK-4): exacte Facebook-URL opvragen. Het handoff-pakket noemt wel
   *  een Facebook-link op de contactpagina, maar niet het adres. Zolang dit leeg
   *  is, toont de contactpagina de naam zonder link. */
  facebook: '',
  /** Zoals het op de contactpagina van het ontwerp staat. */
  facebookHandle: 'vera-nagelstudio',
} as const;

/**
 * De samenvatting van de Google-reviews, zoals de bento-strip op de home hem
 * toont. Losse getallen ernaast omdat de `aggregateRating` in de structured data
 * geen tekst maar cijfers wil (TASK-12) — en die twee horen niet uit elkaar te
 * lopen, net zomin als het telefoonnummer dat doet (PRD §8.3).
 *
 * TODO (TASK-4): score en aantal komen uit het ontwerp en zijn niet tegen het
 * echte Google-bedrijfsprofiel gecontroleerd. Vóór de structured data live gaat
 * moeten ze kloppen; een te hoge score in `aggregateRating` is een onjuistheid
 * die Google zelf kan naslaan.
 */
export const reviewSummary = {
  /** Letterlijk zoals het ontwerp het schrijft; copy is definitief (PRD §5.5). */
  label: '4,9 uit 120+ Google reviews',
  average: 4.9,
  /** Ondergrens: het ontwerp schrijft "120+". */
  count: 120,
} as const;

/**
 * Openingstijden. Één bron voor footer, contactpagina en
 * openingHoursSpecification in de structured data (PRD §5.4).
 * `day` volgt schema.org, `label` is de Nederlandse weergave.
 */
export const openingHours = [
  { day: 'Tuesday', label: 'Dinsdag', from: '09:00', to: '17:15' },
  { day: 'Thursday', label: 'Donderdag', from: '09:00', to: '17:15' },
  { day: 'Saturday', label: 'Zaterdag', from: '09:00', to: '13:00' },
] as const;

/**
 * De boekings-URL staat hier en wordt alleen via BookingButton gebruikt, zodat
 * fase 2 (een eigen planner) één wijziging op één plek is (PRD §5.1).
 *
 * `url` blijft de val-terug en verdwijnt dus niet met de komst van de widget:
 * elke boekknop is een echte link naar deze pagina, en pas als het widget-script
 * geladen is wordt de klik onderschept en opent het formulier als overlay. Laadt
 * het script niet — geblokkeerd, offline, Salonized plat — dan werkt de knop nog
 * gewoon (TASK-21).
 */
export const booking = {
  url: 'https://nailsbyvera.salonized.com/widget_bookings/new',
  label: 'Direct boeken',
} as const;

/**
 * De Salonized-boekwidget (TASK-21). Zelfde salon als `booking.url` hierboven,
 * maar dan als overlay op de site in plaats van een sprong naar hun domein.
 *
 * `company` is de publieke widget-sleutel uit de embed van de huidige site; die
 * hoort niet geheim te zijn, hij staat in de HTML van elke pagina daar.
 *
 * `color` wijkt bewust af van de #ec7b54 van de huidige site. De widget tekent
 * daar witte tekst op en dat haalt 2,79:1 — ver onder AA, en het zit in een
 * third-party iframe dus achteraf te corrigeren valt er niets. Geen enkele
 * koraaltint uit ons palet redt het (coral-500 2,51 · coral-600 3,10); alleen
 * ver buiten de merkkleur komt wit boven de 4,5. Ink-900 haalt 17,34 en is
 * precies wat de eigen sticky boekbalk al doet: donkere pill, witte tekst. Zo is
 * de zwevende knop toegankelijk én herkenbaar als onderdeel van dezelfde site.
 */
export const bookingWidget = {
  company: 'Rd8XQZ8eCoqnqj2zZe4CSHzJ',
  color: '#1c1a19',
  language: 'nl',
  position: 'right',
  outline: 'shadow',
} as const;

/**
 * Hoofdnavigatie. `/blog/` ontbreekt bewust: dat menu-item verschijnt pas
 * zodra er een gepubliceerd artikel is (PRD §5.7, TASK-11).
 */
export const navigation = [
  { href: '/', label: 'Home' },
  { href: '/over-mij/', label: 'Over mij' },
  { href: '/portfolio/', label: 'Portfolio' },
  { href: '/behandelingen/', label: 'Behandelingen' },
  { href: '/prijzen/', label: 'Prijzen' },
  { href: '/contact/', label: 'Contact' },
] as const;
