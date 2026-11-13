// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://nailsbyvera.nl',

  // Volledig statische site: geen server, geen adapter (PRD §6.1).
  output: 'static',

  // WordPress gebruikte trailing slashes. Bestaande links en backlinks moeten
  // exact blijven werken, dus die vorm houden we aan (PRD §7).
  trailingSlash: 'always',

  // De stijlgids is intern en noindex; die hoort niet in de sitemap.
  integrations: [sitemap({ filter: (page) => !page.includes('/styleguide/') })],

  vite: {
    plugins: [tailwindcss()],
  },
});