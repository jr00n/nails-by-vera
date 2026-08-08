---
id: TASK-6
title: Designsysteem-componenten porten naar Astro
status: To Do
assignee: []
created_date: '2026-08-08 08:38'
updated_date: '2026-08-08 09:51'
labels:
  - fundament
  - componenten
  - toegankelijkheid
milestone: m-0
dependencies:
  - TASK-1
documentation:
  - docs/PRD.md
  - design_handoff_nailsbyvera/README.md
priority: high
type: feature
ordinal: 6000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Het design system levert de componenten als React-broncode. Die moeten worden omgezet naar `.astro`-componenten — niet als React geïntegreerd, want de site draait bewust zonder UI-framework.

Te porten: Button, Eyebrow, SectionHeading, ServiceCard, TestimonialCard, StatBlock, StarRating, ArchFrame, Sparkle en Logo. Daarnaast de compositiecomponenten die uit het ontwerp volgen: PhotoFrame, Card, PriceGroup, StepBand en CtaBand.

Twee dingen die geen implementatiedetail zijn maar productbeslissingen:

De boekknop moet één centrale component zijn. Elke primaire CTA op de site opent het Salonized-widget in een nieuw tabblad. In fase 2 wordt mogelijk een eigen planner gebouwd; door alle CTA's door één component te laten lopen, is dat later één wijziging in plaats van een zoektocht door de codebase.

Contrast is een aandachtspunt, geen bijzaak. Twee tokencombinaties uit het ontwerp halen WCAG AA niet: `--ink-400` (#9A918E) op de blush-achtergrond voldoet niet voor bodytekst, en coral #ED8967 met witte tekst voldoet alleen bij grote tekst. Knoptekst moet daarom minimaal 16px met gewicht 500 zijn, en `--ink-400` mag alleen voor decoratieve meta gebruikt worden.

Interactiegedrag uit het ontwerp: knoppen liften −2px en verdiepen naar `--coral-600` bij hover, schalen naar 0.985 bij indrukken. Fotokaarten liften −4px. Tekstlinks krijgen een koraal onderstreping die van links uitgroeit. Motion is `cubic-bezier(.22,1,.36,1)` op ongeveer 280ms — geen bounce, geen loops.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Alle genoemde componenten bestaan als .astro-component en stylen via Tailwind-utilities die uit de @theme-tokens komen
- [ ] #2 Er staat nergens een hardgecodeerde kleur, radius of typografische maat in de opmaak — ook niet als arbitrary value waar een token bestaat
- [ ] #3 Er is één BookingButton-component waar elke primaire CTA doorheen loopt; de Salonized-URL staat op precies één plek in de codebase
- [ ] #4 De boekknop opent het Salonized-widget in een nieuw tabblad met rel=noopener
- [ ] #5 Knoptekst is minimaal 16px met gewicht 500, zodat het contrast met coral aan WCAG AA voldoet
- [ ] #6 --ink-400 wordt nergens voor bodytekst gebruikt
- [ ] #7 Hover-, focus- en press-states volgen het ontwerp; elke interactieve component heeft een zichtbare focus-indicator
- [ ] #8 Animaties respecteren prefers-reduced-motion
- [ ] #9 Er is geen React of ander UI-framework aan het project toegevoegd
<!-- AC:END -->

## Comments

<!-- COMMENTS:BEGIN -->
author: claude
created: 2026-08-08 09:51
---
Stylingaanpak gewijzigd naar Tailwind v4 (zie PRD §6.5). Gevolg voor deze taak: componenten stylen via utilities uit het @theme-blok in plaats van eigen CSS. Arbitrary values zijn toegestaan voor de one-off waarden in het ontwerp (hero-hoogtes, fr-verhoudingen), maar niet waar een token bestaat — een `bg-[#ED8967]` is een fout, dat moet `bg-coral-500` zijn.
---
<!-- COMMENTS:END -->
