# WINTER ARC OS · V2.4.0

**Anthracite Focus UI + optionale WINTER ARC 7.3 Fünf-Tage-Vorlage.**

## Neu in 2.4

- Dunkel-anthrazitfarbene, kontrastreiche Oberfläche ohne blaues Standarddesign.
- Seitenmenü: auf dem Desktop sichtbar, auf dem iPhone per ☰ ein- und ausklappbar.
- **Workout starten → Fokusmodus**: exakt eine Übung mit Zielmuskel, drei Technikpunkten, letzten Leistungswerten, Satzeingaben und Timer.
- **Übungen-Menü**: alle folgenden Übungen mit erledigten Sätzen; Navigation vor/zurück und direkter Sprung zu einer Übung.
- **Unverbindlicher nächster Satz**: aus letztem vergleichbaren ersten Satz, Zielbereich und dokumentierter RIR berechneter Vorschlag. Dieser überschreibt keine Eingaben und ist bewusst kein Vorhersagemodell.
- **WINTER ARC 7.3**: persönlicher 5-Tage-Plan mit 70 Grund-Arbeitssätzen, der über Mehr → Trainingsplan **optional aktiviert** werden kann. Der vorherige Plan wird beim Wechsel archiviert; historische Trainingseinheiten bleiben erhalten.
- Farmer's Holds mit Sekunden-Eingabe und separatem holdSeconds-Merkmal. Haltezeiten werden nicht als Last×Wiederholungen-Volumen berechnet.
- Alle vorhandenen V2.3-Module und lokalen Trainingsdaten bleiben verfügbar.

**Update-Anleitung:** `ANLEITUNG-GITHUB-UPDATE-2.4.txt`. Vor dem Aktualisieren ein privates JSON-Backup exportieren. Kein Upload persönlicher JSON-Daten in das öffentliche GitHub-Repository.

**Datenkompatibilität:** Der Speicherschlüssel `winterArcOS_v2` und das V2-Datenformat bleiben unverändert. Die neuen Planfelder sind optional. Kein erzwungener Planwechsel und keine automatische Löschung vorhandener Daten. 

**Tests:** JavaScript-Syntax, Import- und Planstruktur, Dateibezüge, Persistenzmigration und Rechenregeln können lokal geprüft werden; ein echtes Safari-/iPhone-Livetesting war nicht möglich. Siehe `TESTBERICHT-2.4.md`.

---

# Historische Dokumentation · V2.3.0

**Offlinefähige, lokale Trainings-, Körper- und Kraftanalyse-Web-App für iPhone und GitHub Pages.** Keine Kamera, keine Foto-/Video-Uploads und keine externen Konten. Alle persönlichen Daten verbleiben in der lokalen Browser-/PWA-Speicherung; Export/Import erfolgt nur nach eigener Auswahl.

## Neu in V2.3 (vollständiger Umfang)

1. **Letzte Satzwerte übernehmen:** für jede Übung die letzte protokollierte Einheit anzeigen; einzelne Sätze oder alle noch nicht abgeschlossenen Arbeitssätze über einen Button mit Gewicht, Wiederholungen und RIR übernehmen. Trainingsdaten bleiben unverändert, bis der Satz aktiv abgehakt und das Training gespeichert wird.
2. **Flexible Arbeitssätze:** in der laufenden Einheit bis zu 20 Sätze je Übung ergänzen, einen Satz gezielt entfernen und alle nachfolgenden Satzwerte korrekt nachrücken lassen; ursprünglicher Plan bleibt unverändert.
3. **Übungen umsortieren und überspringen:** per ↑/↓ bewegen und für diese Einheit ausblenden; Wiederherstellen möglich. Bei bereits abgeschlossenen Sätzen erfolgt eine Rückfrage. Daten werden nur bei gespeichertem Trainingsabschluss in die Historie übernommen.
4. **Individuelle Satzpausen:** globaler Standard 150 Sekunden, je Übung 30–600 Sekunden separat einstellbar und lokal gespeichert. Der Timer aus V2.2 bleibt mit Pause/Weiter/+30 Sekunden/Fertig erhalten. Aufwärmsätze starten keinen Timer.
5. **Große Offline-Übungsbibliothek:** derzeit 126 Übungsvarianten; Suche, Muskelgruppen- und Equipment-Filter, passende Alternativen. Übungen lassen sich in den A/B/C-Plan übernehmen. Geräte-IDs und Gewichte bleiben für Analysen unterscheidbar.
6. **Reduziertes Dashboard:** nächstes Training, Wochenfortschritt, letzte Leistung, Kalender und Direktnavigation. Zusätzliche Bereiche wie Daily Coach, Morgenroutine und Gewichtserfassung sind weiterhin erreichbar, aber eingeklappt.
7. **Trainingsabschluss:** Zusammenfassung für jede gespeicherte Einheit mit Arbeitssätzen, Dauer (nur neue Einheiten), Last×Wiederholungen, den trainierten Muskelgruppen, übungsbezogenen Rekorden und Satzliste.
8. **Aufwärm- und Scheibenrechner:** Zielgewicht, Stangengewicht, gewünschte Prozentstufen sowie verfügbare Scheibengrößen anpassbar. Der Rechner gibt Vorschläge für Aufwärmsätze und eine Beladung pro Seite aus; keine verpflichtenden Aufwärmsätze.
9. **Planvorlagen:** Ganzkörper 3×, Upper/Lower als 3-Tage-Variante, Push/Pull/Legs und Strength Foundations. Die Vorlagen sind danach bearbeitbar; der ältere WINTER ARC 5.2 Plan bleibt abrufbar. Planwechsel fragt nach Bestätigung.
10. **Erweitertes Rekordsystem:** Bestes Satzgewicht, Wiederholungen bei dieser Höchstlast, höchstes einzelnes Satzvolumen und höchstes Gesamtvolumen einer Einheit pro Übung. Getrennt von der historischen Strongman-Legendenliste.
11. **Persönliche Übungsnotizen:** Griff, Sitzhöhe, Geräteeinstellungen, Technikpunkte und andere Notizen bleiben über Trainingseinheiten lokal gespeichert.
12. **Fortschrittsdiagramme:** 30/90/180 Tage und gesamte Historie für Körpermaße, Übungsgewichte und wöchentliches Trainingsvolumen.

## Funktionen aus V2.2 bleiben erhalten

- A/B/C-Logger mit RIR, Aufwärmsätzen, Intensitätstechniken und optionalem 5.2-Plan
- Automatischer Satzpausentimer, alternatives Equipment, Ausführungslexikon und Grundlagen des Bodybuildings
- Strength Legends: Offline-Archiv mit Quellen für Strongman- und Bodybuilding-Leistungen; keine erfundenen Perzentile
- Interaktiver Front-/Rücken-Körperatlas, Muskel-Heatmaps aus dokumentierten Arbeitssätzen und Umfangübersicht
- Körpergewicht, 16 Umfangfelder, Kalender, Personal Records, Daily Coach, Morgenroutine, Lauf-/AirBike-/Diensttracking
- JSON-Backup, V1-/V2-Datenmigration, Offline-PWA und Local-first-Verarbeitung
- Ältere Classic-Physique-Gewichtslimits in `benchmarks.js` verbleiben als Referenzdatei, werden in der aktuellen Analyse aber **nicht** angezeigt; das Kraft-Ranking ist das aktive Vergleichsmodul.

## Speicher und Kompatibilität

- **Unveränderter Local-Storage-Key:** `winterArcOS_v2` (Version 2 des Datenformats; die App-Anzeige ist V2.3). Vorhandene V2.1-/V2.2-Daten werden übernommen.
- **V1-Migration:** Falls nur `winterArcOS_v1` existiert, wird eine Kopie in V2 angelegt. Der V1-Schlüssel bleibt bestehen.
- Neue Felder `exerciseNotes`, `settings.exerciseRest`, `settings.programLabels` und zusätzliche `draft`-Informationen sind optional; die Migration ergänzt fehlende Defaults.
- Ein JSON-Import ersetzt **alle** aktuell lokal gespeicherten V2-Daten. Vorher unbedingt ein aktuelles Backup exportieren.
- Aktive Übungsänderungen, Setzahländerungen und übersprungene Slots werden als Draft gespeichert, aber verändern die Programmbibliothek nicht. Die vorherige Trainingseinheit wird nur aus tatsächlich abgeschlossenen und gespeicherten Arbeitssätzen gebildet.
- Historische Workouts bekommen keine erfundene Dauer; die neue Trainingsdauer basiert auf dem Start-Zeitstempel des Entwurfs.
- `strength.js` ist ein datiertes Offline-Archiv, keine live aktualisierte Rekorddatenbank.

## Installation

1. Die Dateien aus diesem ZIP entpacken.
2. **Den Inhalt des entpackten Ordners**, nicht die ZIP, in das Repo-Root `Winterwerk/Winter-Arc-OS` auf `main` hochladen. Vorhandene gleichnamige Dateien ersetzen. Insbesondere `library.js` und `training-tools.js` sind neu.
3. GitHub Pages: Settings → Pages → Deploy from a branch → `main` / `(root)`; danach die dort angegebene URL öffnen.
4. In Safari die Seite neu laden. Im Kopf muss **V2.3.0** stehen. Bei alter Anzeige alte PWA schließen und die Safari-Version prüfen.
5. Daten kontrollieren: Training, Körper und Analyse. Fehlende Daten nur mit einem persönlichen Backup unter Mehr → Backup → JSON importieren (ersetzt aktuelle lokale Daten).

**Nie** persönliche JSON-Backups oder Gesundheits-/Körperdaten auf GitHub hochladen – das Repository ist öffentlich.

## Technische Informationen

- Statische ES-Module, kein Build-Schritt und kein Backend.
- `app.js`: Bedienung; `training-tools.js`: reine Set-, PR-, Rechner- und Filterfunktionen; `library.js`: Übungsbibliothek und Pläne; `store.js`: Speicherschicht; `lexicon.js`: Hinweise; `atlas.js` und `charts.js`: Visualisierungen; `strength.js`: Rekorde; `sw.js`: Offline-Cache V2.3.0.
- Kein Account, keine Cloud-Synchronisierung, keine Bezahlschranke, keine App-Store-App.
- Offline-Modus ist nur nach erfolgreicher Bereitstellung und Service-Worker-Installation verfügbar. Externe Quellenlinks benötigen Netzwerk.

## Grenzen

- Muskel-Heatmaps und Regenerationshinweise sind Näherungen, keine Messung von Muskelwachstum oder medizinisches Gutachten.
- Gewichts-, Volumen- und e1RM-Rekorde verschiedener Maschinen und Übungsvarianten sind nicht direkt gleichwertig.
- Ein Warm-up-Rechner berücksichtigt weder individuelle Belastungsverträglichkeit noch spezielle Verletzungen; Ergebnisse sind Vorschläge.
- Alle technischen Prüfungen finden ohne echten iPhone-Safari-Lauf statt; der letzte Gerätetest ist nach Deployment nötig.
