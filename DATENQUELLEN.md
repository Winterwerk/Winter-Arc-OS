# WINTER ARC OS 2.1 – Datenquellen der Gewichts-Benchmarks

Datenstand: 03.11.2026. Die Werte sind Momentaufnahmen, keine gesundheitlichen Empfehlungen und keine Aussagen über individuelle Muskelmasse oder Fettanteile.

## Offizielle Wettkampflimits

- IFBB Pro League, *Pro Competition Rules*, Stand 30.09.2026: https://www.ifbbpro.com/rules/
- NPC Worldwide, *NPC Worldwide Rules*, Stand 25.10.2026: https://www.ifbbpro.com/npc-worldwide/rules/

Diese Quellen beschreiben **Maximalgewichte bei der Einwaage**, keine Durchschnitts- oder Zielgewichte. *Men's Open* besitzt kein oberes Gewichtslimit. *Men's 212* ist auf 212 lb begrenzt. Die Classic-Physique-Tabellen der IFBB Pro League und NPC Worldwide sind **nicht identisch**.

Für genau 201 cm gilt die oberste Tabellenzeile **über 200,7 cm**:
- IFBB Pro League Classic Physique: **128,8 kg** (284 lb)
- NPC Worldwide Amateur Classic Physique: **124,3 kg** (274 lb)

## Historische und berichtete Athletengewichte

| Athlet | Angabe | Einordnung | Quelle |
|---|---:|---|---|
| Urs Kalecinski | ca. 118 kg | Open-Debüt 2025 (Wettkampf, Bericht) | https://www.repone.de/news/national/urs-kalecinski-spricht-ueber-seine-comeback-plaene/ |
| Urs Kalecinski | ca. 133,8 kg | Offseason, Interviewbericht Oktober 2026 (ca. 295 lb) | https://fitnessvolt.com/urs-kalecinski-hints-2027-new-york-pro-and-pittsburgh-pro/ |
| Arnold Schwarzenegger | ca. 106,6 kg | Mr. Olympia 1975, historischer Bericht (235 lb) | https://thebarbell.com/1975-mr-olympia/ |
| Lou Ferrigno | ca. 121,6 kg | Mr. Olympia 1975, historischer Bericht (268 lb) | https://thebarbell.com/1975-mr-olympia/ |
| Dorian Yates | ca. 120,2 kg | Mr. Olympia 1997, historischer Bericht (265 lb) | https://gmvbodybuilding.com/v-213c-download/ |
| Dorian Yates | ca. 138,3 kg | Historischer Offseason-Profilwert (305 lb) | https://www.muscleandfitness.com/flexonline/the-heavy-duty-life-and-career-of-dorian-yates/ |
| Ronnie Coleman | ca. 134,3 kg | Profilwert für Wettkampfphase (296 lb), kein genaues Datum | https://www.muscleandfitness.com/athlete/ronnie-coleman/ |
| Chris Bumstead | ca. 102,1 kg | Historisches Classic-Physique-Bühnengewicht aus Interview von 2018 (225 lb) | https://www.muscleandfitness.com/athletes-celebrities/interviews/how-chris-bumstead-could-become-first-classic-physique-superstar/ |

**Alle Athletengewichte sind journalistisch berichtete, historische oder von Athleten selbst genannte Angaben.** Keiner der hier verwendeten Werte ist als amtlich bestätigtes offizielles Wettkampf-Waageprotokoll gekennzeichnet. Quellen und Genauigkeitskennzeichnung sind in der App sichtbar.

Größenquellen: historische Gewichts-/Athletenprofile wie oben; für Urs 180,5 cm nach berichteter Athletenangabe: https://www.gannikus.de/hot-stuff/urs-kalecinski-das-deutsch-polnische-wunderkind-im-portraet/.

**Mike Gaiera / Tren Twins:** Mangels einer eindeutig verifizierten Gewichtsangabe keine Zahl eingepflegt. Profi-Status und Wettkampfwerte werden nicht aus sozialen Medien oder einem ungeprüften Steckbrief erfunden.

## Implementierung

- `benchmarks.js` enthält die Offline-Daten und Filterfunktionen.
- Körpergröße wird unter **Analyse → Wettkampflimits** bearbeitet und bleibt im privaten lokalen Speicher.
- Das eigene Vergleichsgewicht wird ausschließlich aus dem zuletzt dokumentierten Gewicht im lokalen Körperlog ausgelesen.
- Es werden keine persönlichen Daten an Websites der Athleten oder Verbände übertragen. Ein vom Nutzer aktiv geöffnetes Quellenlink ist eine externe Website.
- Die Tabellen müssen bei Änderungen der offiziellen Regeln redaktionell aktualisiert werden.
