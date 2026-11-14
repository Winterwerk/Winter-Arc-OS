# WINTER ARC OS V2.4.0 – Testbericht

**Stand:** 14. November 2026. **Geprüfter Ausgangscode:** V2.3.0 aus `Winterwerk/Winter-Arc-OS`.

## Erfolgreiche technische Prüfungen

- Alle JavaScript-Dateien passieren `node --check` (Syntax).
- Die 7.3-Vorlage umfasst 5 Trainingstage, 39 Übungsplätze und 70 Grund-Arbeitssätze (A 13, B 14, C 12, D 14, E 17).
- Alle 39 Übungsplätze besitzen entweder einen vorhandenen oder einen ergänzten Zielmuskel-/Technik-Guide.
- Für alle Übungen existiert eine Muskelgruppenzuordnung; Adduktoren werden als eigene Gruppe dokumentiert.
- Der bisherige V2-Speicherzustand kann weiterhin in das neue V2-kompatible Datenformat migriert werden; Test mit gespeicherter Einheit und fünf Plan-Tagen erfolgreich.
- Die 5-Tage-Vorlage wird ausschließlich nach bewusster Aktivierung in „Mehr → Trainingsplan“ verwendet.
- Farmer's Holds besitzen ein Sekundenfeld; der gespeicherte `holdSeconds`-Wert wird nicht als Last×Wiederholungs-Volumen interpretiert und nicht in normale e1RM/PR-Listen eingerechnet.
- `index.html` referenziert die benötigten CSS- und JS-Dateien; sämtliche 21 im Offline-Cache registrierten Assets sind in der Release-Struktur vorhanden.
- Nach dem Wechsel auf die neue V2.4.0-Cache-ID werden die bisherigen Service-Worker-Cache-Varianten bei Aktivierung bereinigt.

## Noch nicht getestet

- Ein echter iPhone-Safari- und Home-Screen-PWA-Durchlauf inklusive Dateneingabe und Rückkehr aus dem Hintergrund.
- Die endgültige Live-Darstellung aller Bildschirmgrößen. Die lokale Browserausführung war in der Testumgebung administrativ blockiert.
- GitHub Pages Deployment nach tatsächlichem Hochladen der Dateien.

## Nach dem Deployment empfohlener Kurztest

1. App öffnen: sichtbare Version V2.4.0; graues/anthrazitfarbenes Design.
2. Menü ☰ öffnen: Navigation zwischen Übersicht, Training, Körper und Analyse.
3. Auf „Workout starten“ drücken: genau eine Übung und der Zielmuskel/Techniktipps werden angezeigt.
4. Übungsliste öffnen und zur nächsten Übung wechseln.
5. In einem Testentwurf Gewicht, Wdh. und RIR eintragen; Satz abhaken, Timer prüfen.
6. App schließen und erneut öffnen: Entwurf sollte erhalten bleiben.
7. Falls aktiviert: Mehr → Trainingsplan → 7.3, danach A bis E prüfen.
8. Erst danach eine reale Trainingseinheit abschließen und die Historie kontrollieren.

**Wichtig:** Nie einen Test mit echten Trainingsdaten oder eigenem Backup in ein öffentliches GitHub-Repository hochladen. Ein vorheriger JSON-Export ist für die Aktualisierung dringend empfohlen.
