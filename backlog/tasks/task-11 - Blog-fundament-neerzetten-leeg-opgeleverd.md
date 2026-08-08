---
id: TASK-11
title: 'Blog-fundament neerzetten, leeg opgeleverd'
status: To Do
assignee: []
created_date: '2026-08-08 09:42'
labels:
  - blog
  - seo
milestone: m-0
dependencies:
  - TASK-6
documentation:
  - docs/PRD.md
priority: low
type: feature
ordinal: 18000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
De 18 bestaande blogposts vervallen: het is Engelstalige stock-content die met het WordPress-thema meekwam, niet van Vera. Maar zij moet later zelf kunnen gaan schrijven zonder dat daar een verbouwing voor nodig is. Daarom wordt de blog nu technisch neergezet, en blijft hij leeg tot er iets te publiceren is.

Er is geen blog-ontwerp in het handoff-pakket. Dat hoeft fase 1 niet op te houden: het ontwerp wordt afgeleid uit het bestaande design system — hero, kaartenraster en tekstkaart in de "Editorial Frames"-stijl.

Het gedrag bij nul artikelen is expliciet onderdeel van de opdracht, geen detail. Een lege blogsectie leest als een verlaten site. Zolang er geen gepubliceerd artikel is, staat er geen "Blog" in de hoofdnavigatie, staat `/blog/` niet in de sitemap en krijgt de route `noindex`. Zodra het eerste artikel verschijnt, komt het menu-item er vanzelf bij. Zo staat er nooit iets halfs live, en is het schrijven van artikel nummer één het enige wat er later nog hoeft te gebeuren.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Er is een blog-collection met schema voor title, description, date, cover en draft
- [ ] #2 De routes /blog/ en /blog/[slug]/ bestaan en volgen de stijl van het design system
- [ ] #3 Bij nul gepubliceerde artikelen staat er geen Blog-item in de navigatie
- [ ] #4 Bij nul gepubliceerde artikelen staat /blog/ niet in de sitemap en heeft de route noindex
- [ ] #5 Na het toevoegen van één testartikel verschijnt het menu-item, de sitemap-vermelding en de indexering automatisch
- [ ] #6 Artikelen krijgen Open Graph-tags en Article structured data
- [ ] #7 Geen van de 18 oude blogposts is overgenomen
<!-- AC:END -->
