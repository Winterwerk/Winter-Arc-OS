# WINTER ARC OS – V1.2

Kostenlose, auf dem iPhone verwendbare Trainings-Web-App für GitHub Pages. Keine externen Bibliotheken, API-Keys, Accounts oder Datenbanken.

## NEU: Daily Coach (V1.2)
- **Startseite = Daily Coach.** Beim Check-in Schicht (Früh, Tag, Nacht, Ausruhtag, Frei), Schlaf in Stunden, Ermüdung 0–10, Rücken 0–10 und neue neurologische Warnsymptome erfassen.
- **Empfehlungslogik** verarbeitet lokal deine tatsächlich protokollierten A/B/C-Einheiten, Laufarten, Long Run, die letzten sieben Tage sowie grobe Erholungsindikatoren. Sie schlägt A/B/C, Easy Run, Zone 2, Long Run oder Erholung vor und zeigt die Gründe.
- **Tagesempfehlung** öffnet die passende Trainingseinheit; bei erhöhter Ermüdung mit reduziertem Satzumfang. Bisher nicht abgeschlossenes Training vor Wechsel prüfen.
- **Optionaler 7-Tage-Dienstplan** mit Schichtart und geplanten Long Runs zur Vermeidung unnötiger Überschneidungen mit schwerem Beintraining.
- Alles bleibt in `localStorage` und wird im JSON-Backup mitgesichert. Keine KI und keine verlässliche medizinische Risikoanalyse. **Abweichende Empfehlungen jederzeit manuell überschreiben.**
- Bei fehlenden Trainingsdaten sind Vorschläge vorläufig; die App kennt keine Garmin-Daten und kennt nur protokollierte Trainingstage.

## Was ist bereits enthalten?
- A/B/C-Hybrid-Split: Oberkörper, Unterkörper/Knie/Hüfte/Core, Ganzkörper.
- **Einstieg** (reduziertes Volumen) und **Aufbau** (Zielvolumen) manuell umschaltbar unter **Mehr**.
- Training mit separaten Aufwärmsätzen, Gewicht und Wiederholungen je Satz, RIR, Methode (Normal, Rest-Pause, Myo-Reps, Lengthened Partials, 1,5-Wdh.) und Notizen.
- Vorherige Trainingsgewichte an derselben Übung als Orientierung und Verlaufsgrafik.
- Lauftracking: Easy Run, Zone 2, Long Run und AirBike 4×4, inkl. Distanz, Minuten, Durchschnittspuls und RPE.
- Ziel: Halbmarathon 06.06.2027 bei 5:30 min/km (in der App änderbar).
- Körpermessungen mit Kurven.
- Abhakbare fünfteilige Morgenroutine (tagesbezogen).
- Polizeidienst / Rücken: Schichtart, Tragedauer der Schutzweste, Verspannungs-/Ermüdungswert, Schlaf und Notizen.
- Lokale Datensicherung als JSON; JSON-Import; installierbare Offline-Web-App nach dem ersten Laden.

## iPhone-Setup (kein PC nötig)
1. ZIP im iPhone-Browser herunterladen, in der App **Dateien** speichern und antippen, um sie zu entpacken.
2. In Safari bei `https://github.com/new` das öffentliche Repo **winter-arc-os** erstellen. README beim Erstellen deaktivieren.
3. Auf die neu erstellte Repository-Seite gehen. **uploading an existing file** oder **Add file → Upload files** öffnen. Aus dem entpackten Ordner die **einzelnen Dateien** auswählen (NICHT die ZIP-Datei und NICHT einen übergeordneten Ordner). Falls nötig: Safari → Desktop-Website anfordern. **Commit changes**.
4. Für eine funktionierende App müssen `index.html`, `app.js`, `style.css`, `manifest.webmanifest`, `sw.js`, `icon-180.png`, `icon-192.png`, `icon-512.png` im Repository-Hauptverzeichnis liegen. `README.md` ist optional, `.nojekyll` kann entfallen.
5. **Settings → Pages → Source: Deploy from a branch → Branch: main → Folder: / (root) → Save**.
6. Nach erfolgreicher Veröffentlichung die URL `https://DEINNAME.github.io/winter-arc-os/` in **Safari** öffnen. Die Erstveröffentlichung kann bis zu etwa 20 Minuten dauern.
7. Safari → **Teilen → Zum Home-Bildschirm hinzufügen → Als Web-App öffnen → Hinzufügen**.
8. Ab jetzt im Home-Bildschirm-Symbol protokollieren. **Mehr → Backup erstellen (JSON)** testen und regelmäßig eine Kopie in **Dateien** sichern. Zum Wiederherstellen **Mehr → Backup importieren**.

## Wichtig zum Datenspeicher
- Der **öffentliche GitHub-Code** enthält **keine** Trainings-, Körper- oder Dienstdaten. Diese werden nur lokal in `localStorage` des jeweiligen iPhone-Web-App-Kontexts gespeichert.
- Kein automatischer Sync zwischen Safari-Tab und Home-Bildschirm-App, kein Sync mit GitHub oder iCloud. Beim Wechsel unbedingt **Backup exportieren und importieren**.
- Die App selbst ist öffentlich erreichbar und besitzt **keine Zugangskontrolle**. Der Quellcode ist ebenfalls öffentlich. Persönliche Protokolle bleiben lokal, sofern sie nicht ausdrücklich in den Quellcode oder GitHub eingecheckt werden.
- Bei gelöschten Website-/App-Daten oder Geräteneuinstallation gehen ohne Backup möglicherweise alle Daten verloren. JSON-Backups sicher aufbewahren und gelegentlich den Wiederimport testen.
- Offline-Funktion nach erfolgreichem ersten Online-Laden; Änderungen an der App erfordern Internet. Nach Software-Updates kann ein erneutes Öffnen bei Internetverbindung nötig sein.

## Trainingshinweis
Allgemeines Trainingstagebuch, kein Medizinprodukt. Bei der bekannten Bandscheibenhistorie Belastungen symptomverträglich gestalten und auffällige Symptome medizinisch abklären. Die Trainingsstufe **Einstieg** ist vorgewählt; nicht direkt das volle Zielvolumen erzwingen.

## Bearbeiten
`app.js`: Training, Eingabemasken und Speicherung. `style.css`: Design. `index.html`: Meta/Layout. `sw.js`: Offline-Cache-Version. `manifest.webmanifest`: App-Konfiguration. Änderungen im Browser über GitHub **Edit file → Commit changes** speichern. Nach Updates bei Bedarf die Cache-Version in `sw.js` anheben.

## Upgrade von V1.1 auf V1.2
- Auf dem **gleichen Repository und unter der gleichen GitHub-Pages-Adresse** `app.js`, `style.css`, `sw.js`, `index.html` sowie ggf. weitere Projektdateien durch die neuen Versionen ersetzen. Keine ZIP als Einzeldatei in GitHub Pages hochladen.
- **Zuerst Backup** in der alten App erstellen. Die V1.2 akzeptiert Backups des bisherigen Formats V1.1 (`version:1`) und lädt bestehende lokale Daten weiter, **sofern die Web-App am selben Ursprung und im selben Speicher-Kontext läuft**.
- Danach online die veröffentlichte Seite aufrufen; App ggf. vollständig schließen und erneut öffnen, damit der neue Service-Worker seine Assets lädt. Beim Wechsel von Safari zur Home-Bildschirm-App sind Speicherstände nicht zwingend synchron; in diesem Fall per JSON-Backup übertragen.
- Die Empfehlungshistorie und künftige Dienste werden zusätzlich im `coach`-Objekt gespeichert.
