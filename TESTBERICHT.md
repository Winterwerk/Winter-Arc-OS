# WINTER ARC OS 2.3 – Testbericht

Stand 07.11.2026. Tests ohne externe Netzwerkdienste, lokale statische App-Quelldateien. Es wurden keine persönlichen Nutzerdaten an einen Server gesendet.

## Statische Tests

- JavaScript-Syntaxprüfung über Node.js für alle `.js`-Dateien.
- Manifest als JSON geprüft, Archivintegrität beim ZIP-Erstellen geprüft.
- Bibliothek und alle vier Trainingsplanvorlagen über reine Modulfunktionen geladen.
- Testfälle für Migration V1→V2 und V2.2→V2.3 und Entwurfsaktionen.

## Isolierter Browser-Test (Chromium)

Der direkte Aufruf eines lokalen HTTP-Servers wurde durch die Umgebung blockiert. Daher wurden dieselben ES-Module über isolierte Blob-Modul-URLs in einem Browserkontext geladen, mit einer Test-Implementierung von `localStorage`.

Geprüft wurden:
- Start mit leerem Speicher und alter V1-Datensicherung
- Trainingsansicht, zusätzliche und gelöschte Arbeitssätze
- Übungsspezifische Pause und persistente Übungsnotiz
- Satzwerte eintragen, abhaken und Satzpausentimer auslösen
- Übungen umsortieren, überspringen und wiederherstellen
- Aufwärm- und Scheibenrechner
- Trainingsabschluss mit Satzzahl, Dauer und Last×Wiederholungen
- Rekord- und Analyseansicht mit Zeitfenster
- Bibliothekssuche, Planergänzung und Aktivieren einer PPL-Vorlage
- Keine uncaught JavaScript errors in den Testdurchläufen

## Nicht getestet

- Echter Safari-Test auf dem iPhone nach GitHub-Pages-Upload
- Betriebssystem-Hintergrundbetrieb des Timers unter iOS (der Countdown basiert auf der absoluten Zeit und wird beim Vordergrundwechsel aktualisiert)
- Reale Push-Benachrichtigungen: nicht implementiert
- Automatische Cloud-Sicherung: nicht implementiert
- Live-Aktualisierung von Strongman-Rekorden: nicht implementiert

Der letzte reale Gerätetest sollte nach Deployment anhand der separaten iPhone-Anleitung erfolgen.
