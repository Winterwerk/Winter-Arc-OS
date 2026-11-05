# WINTER ARC OS · 2.1.0

**Offlinefähige, private Trainings- und Körper-Tracking-Web-App für GitHub Pages und iPhone.**

## Neu in V2.1 – Physique Benchmarks (Stand 03.11.2026)

Unter **Analyse** gibt es einen neuen Abschnitt **Wettkampflimits & Profi-Vergleich**:

- Körpergröße separat ändern (Vorgabe 201 cm, lokal gespeichert)
- Das zuletzt in der App erfasste Körpergewicht mit dem größenabhängigen Gewichtslimit der **IFBB Pro League Classic Physique** und **NPC Worldwide Classic Physique (Amateur)** vergleichen
- Für 201 cm gilt wegen der Kategorie >200,7 cm: **Pro 128,8 kg**, **NPC Worldwide Amateur 124,3 kg** (Regeln von September/Oktober 2026)
- Men's Open ohne Gewichtslimit, Men's 212 bis ca. 96,2 kg (212 lb)
- Offizielle Klassentabelle aufklappen
- Historische / datierte Profi-Gewichte nach **Bühne** oder **Offseason** filtern; Quelle und Genauigkeit je Datensatz sichtbar
- Kein fiktiver Mike-Gaiera-Wert: Es liegt keine hinreichend belastbare, eindeutig zuzuordnende Angabe vor
- Diese Gewichte sind keine Empfehlungen, Vorgaben für Muskelmasse oder gesundheitlichen Zielwerte

**Quellen (eingebettet und in der App verlinkt):**
- https://www.ifbbpro.com/rules/
- https://www.ifbbpro.com/npc-worldwide/rules/
- https://www.repone.de/news/national/urs-kalecinski-spricht-ueber-seine-comeback-plaene/
- https://fitnessvolt.com/urs-kalecinski-hints-2027-new-york-pro-and-pittsburgh-pro/
- https://thebarbell.com/1975-mr-olympia/
- https://gmvbodybuilding.com/v-213c-download/
- https://www.muscleandfitness.com/flexonline/the-heavy-duty-life-and-career-of-dorian-yates/
- https://www.muscleandfitness.com/athlete/ronnie-coleman/
- https://www.muscleandfitness.com/athletes-celebrities/interviews/how-chris-bumstead-could-become-first-classic-physique-superstar/

Die Referenzdaten sind **offline in `benchmarks.js`** abgelegt. Die Quelllinks benötigen eine Internetverbindung. Sämtliche Profi-Wettkampfgewichte sind Presse-/Athleten- bzw. historische Profilangaben und keine offiziell bestätigten Wettkampf-Waageprotokolle. Regeländerungen müssen später manuell aktualisiert werden.

## Funktionen

- **Training A/B/C:** bestehende oder neue Pläne, Satzlogger mit Gewicht, Wdh., RIR, Methode, Aufwärmsätzen, Trainingsnotizen und lokaler Entwurfsspeicherung
- **WINTER ARC 5.2:** optionaler Planwechsel unter **Mehr**; bestehende Pläne werden bei Migration ausdrücklich **nicht** ungefragt überschrieben
- **Körperatlas:** anklickbare Front-/Rücken-Silhouette, direkte wöchentliche Arbeitssätze als Farbintensität, separates Umfangmodus
- **17 Körperfelder:** Gewicht plus 16 Umfangmesspunkte, grafische Zeitverläufe
- **Kalender:** Training A/B/C, Körpermessungen und Ausdauer pro Tag
- **Strength Intelligence:** persönliche Bestleistungen, Satzgewichte, vorsichtige e1RM-Schätzung nur bis zehn Wiederholungen
- **Daily Coach:** Schlaf-, Schicht-, Ermüdungs- und Rücken-Check-in; einfache, transparente Hinweise, keine medizinische Bewertung
- **Weitere Funktionen:** Lauf- und AirBike-Protokoll, Dienstbelastung, Morgenroutine, Trainingshistorie, Planeditor
- **Private Daten:** nur lokal im Browser/PWA-Kontext, JSON-Import/Export, keine Nutzerkonten, keine Datenbank und kein Tracking

## Wichtige Unterschiede zur alten Version

- V2 nutzt einen eigenen lokalen Datenspeicher `winterArcOS_v2`. Der bisherige Speicher `winterArcOS_v1` bleibt bestehen.
- Bei gleichem Ursprung und gleichem Safari-/PWA-Speicherkontext werden gültige V1-Daten beim ersten Start automatisch in V2 **kopiert**.
- Sonst: Unter **Mehr → JSON importieren** das alte V1-Backup auswählen. Der Import **ersetzt die aktuellen V2-Daten** erst nach Bestätigung.
- Das persönliche Backup enthält Trainings-/Körper-/Dienstangaben. **Niemals in dieses öffentliche GitHub-Repository hochladen.**
- Die in der alten App eingestellten A/B/C-Pläne bleiben nach Import erhalten. **Mehr → 5.2-Plan aktivieren** schaltet den neuen Trainingsplan ein, ohne historische Workout-Einträge zu löschen.

## Installation

Die vollständige Schritt-für-Schritt-Anleitung steht in `ANLEITUNG-iPHONE.txt`. Die HTML-Datei kann wegen JavaScript-Modulen nicht einfach zuverlässig als lokale Datei in `Dateien` gestartet werden. Sie benötigt Hosting über GitHub Pages oder einen vergleichbaren Webserver.

### GitHub Pages

1. Inhalte dieser ZIP entpacken.
2. **Alle hier enthaltenen Programmdateien** in das Hauptverzeichnis (`/`) des Repositories `Winterwerk/Winter-Arc-OS` hochladen. Der ZIP-Inhalt darf **nicht** in einem zusätzlichen Unterordner landen.
3. GitHub: **Settings → Pages → Deploy from a branch → main → / (root)**.
4. Die von GitHub Pages angezeigte Webadresse auf dem iPhone in Safari öffnen.
5. Über **Teilen → Zum Home-Bildschirm hinzufügen** als PWA installieren.

## Kompatibilität

- GitHub Pages: ohne Build-Schritt, Node, Framework, Server oder externe Libraries.
- Browser: aktuelle iPhone-Safari-Versionen und moderne Chromium/Firefox-Browser.
- Nutzerdaten: kompatibel zu den in V1.2 exportierten JSON-Backups (`version: 1`).
- Offline: die PWA kann nach erfolgreicher Erstinstallation statische Assets zwischenspeichern. JSON-Backups bleiben trotzdem notwendig.

## Hinweise zu Anzeigen und Benchmarks

- Muskel-Heatmap: zählt direkte Arbeitssätze; indirekte Arbeit wird als heuristische 0,5-Satz-Anteile ausgewiesen.
- Das ist **keine** Messung von tatsächlichem Muskelwachstum, Regeneration oder Sehnenstärke.
- Geräte- und Übungsvarianten sowie Trainingsmethoden können nicht ohne Weiteres miteinander verglichen werden.
- Externe Profi-Vergleichsgewichte: nur datierte und quellenverlinkte Presse-/Athletenangaben (in **Analyse**), keine fingierten Wettkampf-Waageprotokolle und keine Kraft-Vergleichswerte.
- Die App ersetzt keine ärztliche Diagnostik oder individuelle medizinische Belastungsfreigabe.

## Quellcode

| Datei | Aufgabe |
|---|---|
| `index.html` | HTML und Einstiegspunkt |
| `style.css` | Dark-Mode-Oberfläche / Mobile UI |
| `app.js` | Ansichten, Formulare, Training, Coaching, Ereignisse |
| `store.js` | Lokale Speicherung, V1→V2-Migration, Backup |
| `data.js` | Standardplan 5.2, Muskel- und Körperfelder |
| `atlas.js` | Muskelatlas und Satzzuordnung |
| `charts.js` | Diagramme |
| `benchmarks.js` | Offizielle Gewichtsklassen und Profi-Gewichtsvergleiche |
| `DATENQUELLEN.md` | Quellen und Grenzen der Referenzdaten |
| `sw.js` | Offline-Cache für statische Dateien |
| `manifest.webmanifest` | PWA-Einstellungen |
| `icon-180.png`, `icon-192.png`, `icon-512.png` | App-Icons |
| `.nojekyll` | Optionale GitHub-Pages-Kompatibilitätsdatei |

## Versionierung und Fehlerbehebung

- Vor Upload immer ein lokales JSON-Backup sichern.
- Nach Veröffentlichung die neue Seite **mit Internetverbindung** öffnen, ggf. App vollständig schließen und erneut öffnen, damit der neue Service Worker übernommen wird.
- Wenn alte Daten fehlen: in der **richtigen** App-Instanz prüfen (Safari-Tab und Home-Bildschirm-PWA können unterschiedliche Speicher haben), sonst die JSON-Datei importieren.
- Bei Fehlern Screenshot, genaue Schritte und ggf. relevante Fehlermeldung sichern. Keine privaten Backups im öffentlichen GitHub-Issue posten.

Version: **2.1.0** · 03.11.2026
