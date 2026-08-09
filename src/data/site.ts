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
 */
export const booking = {
  url: 'https://nailsbyvera.salonized.com/widget_bookings/new',
  label: 'Direct boeken',
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
