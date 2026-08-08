---
id: TASK-15
title: Toegankelijkheid en performance auditen en corrigeren
status: To Do
assignee: []
created_date: '2026-08-08 09:43'
labels:
  - kwaliteit
  - toegankelijkheid
  - performance
milestone: m-0
dependencies:
  - TASK-9
  - TASK-12
documentation:
  - docs/PRD.md
priority: high
type: task
ordinal: 22000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Kwaliteitspoort vóór livegang. De normen uit de PRD zijn geen streefwaarden maar acceptatiecriteria — de site gaat niet live als ze niet gehaald worden.

Dat ze haalbaar zijn, komt grotendeels doordat er geen cookiebanner meer is: een CMP-script is doorgaans 50 tot 150 kB blokkerende JavaScript en een van de grootste veroorzakers van layout shift. Op de huidige WordPress-site met banner, GTM en Elementor is de norm van 95 praktisch onbereikbaar.

Toegankelijkheid streeft naar WCAG 2.2 niveau AA. Twee bekende risicoplekken uit het ontwerp moeten expliciet nagelopen worden: `--ink-400` (#9A918E) op de blush-achtergrond haalt AA niet voor bodytekst, en coral #ED8967 met witte tekst haalt AA alleen voor grote tekst — knoptekst moet dus minimaal 16px met gewicht 500 zijn.

Deze taak omvat ook het corrigeren van wat de audit oplevert, niet alleen het rapporteren ervan.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Lighthouse mobiel scoort minimaal 95 op Performance, Accessibility, Best Practices en SEO op elke pagina
- [ ] #2 LCP blijft onder 2,0 seconden, CLS onder 0,05 en INP onder 200 ms
- [ ] #3 Het paginagewicht boven de vouw blijft onder 400 kB inclusief hero-afbeelding
- [ ] #4 Alle tekst voldoet aan WCAG 2.2 AA-contrast; --ink-400 wordt nergens voor bodytekst gebruikt
- [ ] #5 De hele site is met alleen het toetsenbord te bedienen, met zichtbare focus-indicator en werkende skip-to-content link
- [ ] #6 Een schermlezertest op de home- en contactpagina levert geen blokkerende problemen op
- [ ] #7 Geen enkele pagina scrollt horizontaal op 390px
- [ ] #8 Gevonden problemen zijn opgelost, niet alleen gerapporteerd
<!-- AC:END -->
