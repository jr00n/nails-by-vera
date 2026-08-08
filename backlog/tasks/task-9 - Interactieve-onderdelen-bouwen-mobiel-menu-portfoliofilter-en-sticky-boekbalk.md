---
id: TASK-9
title: >-
  Interactieve onderdelen bouwen: mobiel menu, portfoliofilter en sticky
  boekbalk
status: To Do
assignee: []
created_date: '2026-08-08 08:58'
labels:
  - interactie
  - toegankelijkheid
milestone: m-0
dependencies:
  - TASK-7
documentation:
  - docs/PRD.md
priority: medium
type: feature
ordinal: 16000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
De site is vrijwel volledig stateloos. Dit zijn de drie uitzonderingen, samen ondergebracht omdat ze allemaal de kleine hoeveelheid client-side JavaScript op de site vormen en dezelfde kwaliteitseisen delen.

1. Mobiel menu — op schermen onder 768px bestaat de header uit logo, "Boeken"-knop en een hamburger die een drawer opent. De drawer moet sluiten met Escape, bij een klik buiten de drawer en bij navigatie. Zolang hij open is, blijft de focus erbinnen.

2. Portfoliofilter — pill-chips die de zichtbare afbeeldingen filteren op het category-veld, zonder paginalading. "Alles" is de standaardstand. Belangrijk: zonder JavaScript moeten alle afbeeldingen zichtbaar zijn en de filterrij verborgen. De pagina mag nooit leeg of stuk lijken als het script niet laadt.

3. Sticky boekbalk — op mobiel een meescrollende balk onderaan met de primaire boek-CTA in een `--ink-900` pill. Loopt via de BookingButton-component.

Toegankelijkheid is hier geen sluitpost: dit zijn de enige onderdelen op de site waar toetsenbord- en schermlezergedrag niet vanzelf goed gaat.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Het mobiele menu opent en sluit met muis én toetsenbord, sluit op Escape en bij klik buiten, en houdt de focus vast zolang het open is
- [ ] #2 Het portfoliofilter filtert zonder paginalading op het category-veld
- [ ] #3 Met JavaScript uitgeschakeld zijn alle portfolio-afbeeldingen zichtbaar en is de filterrij verborgen
- [ ] #4 De sticky boekbalk verschijnt alleen onder 768px en overlapt geen content aan de onderkant van de pagina
- [ ] #5 Alle drie de onderdelen zijn volledig met het toetsenbord te bedienen en hebben een zichtbare focus-indicator
- [ ] #6 De totale hoeveelheid client-side JavaScript blijft onder de 10 kB
<!-- AC:END -->
