---
id: doc-1
title: Beeldrichtlijnen — hero-afbeeldingen
type: specification
created_date: '2026-08-08 16:54'
tags:
  - beeld
  - ontwerp
---
Wat een foto moet kunnen om als hero te werken, en welke bronbestanden we daarvoor
nodig hebben. Geschreven na TASK-7.2, waar het portret van Vera op een breed scherm
tot een strook van 4:1 werd bijgesneden en er alleen een mond in beeld bleef.

## De kern in één zin

Een full-bleed hero wordt op een telefoon **staand** bijgesneden en op een breed
scherm **panoramisch**. Dezelfde foto moet dus zowel 0,7:1 als 3,5:1 aankunnen —
en dat kan alleen als het onderwerp ruim in het midden zit.

## De uitsnedes die daadwerkelijk voorkomen

De hero loopt over de volle breedte, min 12px padding op mobiel en 16px op desktop.
Voor de homepage (520px hoog op mobiel, 720px op desktop):

| Scherm | Kader | Verhouding |
|---|---|---|
| 390px (telefoon) | 366 × 520 | **0,70 : 1** (staand) |
| 1024px | 992 × 720 | 1,38 : 1 |
| 1280px (ontwerpcanvas) | 1248 × 720 | 1,73 : 1 |
| 1920px | 1888 × 720 | 2,62 : 1 |
| 2560px | 2528 × 720 | **3,51 : 1** |

Een hero die op desktop een vaste 480px hoog is, loopt op 2560px door naar 5,3:1.
Dat is geen bruikbaar beeldformaat meer. **Vuistregel: een full-bleed hero moet in
hoogte meegroeien met de breedte**, bijvoorbeeld `clamp(480px, 34vw, 720px)`. Dan
blijft de uitsnede tussen 2,6:1 en 3,5:1 — hetzelfde bereik als de homepage.

## Wat we bij een fotograaf of van Vera nodig hebben

- **Liggend formaat, minimaal 2560 × 1440px** (16:9). Liever 3200 × 1800.
  Kleiner betekent dat de bovenste srcset-stap (2048px breed) wordt opgeschaald.
- **sRGB**, JPEG met hoge kwaliteit. Astro verpakt zelf naar AVIF en WebP, dus
  vooraf comprimeren is niet nodig en kost alleen kwaliteit.
- **Geen tekst of logo in het beeld** — dat overleeft geen enkele uitsnede.
- **Geen uitsnede op een witte of lichte achtergrond.** Het portret dat we nu
  hebben is een Photoroom-cutout; daar staat de witte tekst van de hero op en dat
  is niet leesbaar te krijgen zonder de foto zo ver te verdonkeren dat je hem niet
  meer ziet.

## Veilige zone

Reken met twee zones in het bronbestand:

- **Altijd in beeld** — de middelste **40% van de breedte** en de middelste
  **50% van de hoogte**. Dat is de doorsnede van de smalste (telefoon) en de
  breedste (ultrawide) uitsnede. Het gezicht, de handen, het onderwerp: hier.
- **Vrijhouden voor tekst** — de **linkeronderhoek, ruwweg 55% breed en 45% hoog**.
  Daar staan de eyebrow, de titel en de intro, met een donkere scrim eroverheen.
  Belangrijk detail in die hoek gaat verloren. Een rustige of donkere achtergrond
  op die plek is het prettigst.

## Scrims

Boven op elke hero ligt een verticaal verloop in ink-900 (0,34 → 0,10 op 45% →
0,60), zodat de navigatie bovenin en de tekst onderin leesbaar zijn. Dat verloop
gaat ervan uit dat de foto **onderaan donker is**. Bij een lichte foto zijn extra
scrims nodig; op `/over-mij/` staan er nu twee bij. Beter is een foto die het
verloop niet nodig heeft om te werken.

## Let op bij `sizes`

Een full-bleed hero wordt op mobiel in de **hoogte** passend gemaakt, niet in de
breedte. Met `sizes="100vw"` kiest de browser een kandidaat op basis van de
viewportbreedte (390px → de 768px-variant), terwijl de uitsnede feitelijk om
ruim het dubbele vraagt: bij 366 × 520 uit een 16:9-bron is een bronbreedte van
zo'n 1850px nodig voor een scherpe weergave op een 2×-scherm.

Voor hero's dus een opgehoogde `sizes` meegeven, in de trant van
`sizes="(max-width: 1023px) 250vw, 100vw"`. Dit geldt voor élke full-bleed hero en
hoort meegenomen te worden in de audit (TASK-15).

## Waar het beeld terechtkomt

`src/assets/photos/`, met een beschrijvende bestandsnaam, en aangemeld in
`src/data/images.ts` met alt-tekst, categorie en het oorspronkelijke pad. Alt-tekst
hoort bij het beeld, niet bij de plek waar het staat.
