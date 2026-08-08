---
id: TASK-5
title: 'Domein, DNS en e-mail in kaart brengen en oude site veiligstellen'
status: To Do
assignee: []
created_date: '2026-08-08 08:38'
labels:
  - cutover
  - risico
milestone: m-0
dependencies: []
documentation:
  - docs/PRD.md
priority: high
type: task
ordinal: 5000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Voorbereiding op de cutover. Twee risico's uit de PRD staan hier als hoog aangemerkt, en beide zijn onomkeerbaar als het misgaat.

Risico 1 — e-mail valt uit. Op het domein loopt `info@nailsbyvera.nl`. Bij het omzetten naar Vercel mogen alleen de A- en CNAME-records wijzigen; de MX-records moeten ongemoeid blijven. Zonder een vastgelegde uitgangssituatie is een fout hier niet terug te draaien.

Risico 2 — het domein zit bij de WordPress-host. Als domeinregistratie en hosting bij dezelfde partij liggen, moet het domein eerst verhuisd of de DNS losgekoppeld worden vóórdat de hosting wordt opgezegd. Gebeurt dat niet, dan valt met de hosting ook de e-mail weg.

Daarnaast: een volledige back-up van de bestaande WordPress-installatie (bestanden én database) moet veiliggesteld zijn voordat er iets wordt opgezegd. Ook als de content zelf niet meegaat, is dit het enige archief van vijf jaar site.

De DNS-toegang ligt bij Jeroen; er is geen externe partij nodig om dit uit te voeren.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 De complete DNS-zone is geëxporteerd of vastgelegd als screenshot en opgeslagen in de repository
- [ ] #2 De MX-records zijn apart genoteerd, zodat na de cutover geverifieerd kan worden dat ze ongewijzigd zijn
- [ ] #3 Is vastgesteld waar het domein geregistreerd staat en of dat dezelfde partij is als de WordPress-host
- [ ] #4 Als domein en hosting bij dezelfde partij zitten: het benodigde vervolgtraject is beschreven en ingepland
- [ ] #5 Een volledige back-up van de WordPress-installatie (bestanden en database) is gemaakt en op een veilige plek bewaard
- [ ] #6 De back-up is steekproefsgewijs gecontroleerd op volledigheid
<!-- AC:END -->
