# Familiencockpit v0.16.0

Local-first PWA für Familie, Verträge, Dokumente, Vorsorge, Ansprüche und Ernstfälle.

## Neu in v0.16.0

### Familiencockpit-Status
Das Dashboard zeigt einen kompakten Gesamtstatus und höchstens drei nächste sinnvolle Schritte. Aufklappbar sind die Teilbereiche Stammdaten, Vorsorge, Datenmappe, Anspruchscheck, Notfallkontakte, Verträge und Backup. Der Prozentwert beschreibt nur die Vollständigkeit der im Cockpit gepflegten Informationen.

### Verschlüsselter Zugangstresor
- optionaler lokaler Tresor für Logins, Passwörter, Recovery-Hinweise und sichere Notizen
- Verschlüsselung vollständig im Browser mit WebCrypto / AES-256-GCM
- Schlüsselableitung mit PBKDF2-SHA-256 und 600.000 Iterationen
- Master-Passphrase wird nicht gespeichert
- entschlüsselte Tresordaten und CryptoKey nur in der laufenden Sitzung
- automatische Sperre nach 10 Minuten Inaktivität
- Einträge können einer Person oder der ganzen Familie zugeordnet werden

Bei Verlust der Master-Passphrase können Tresordaten nicht wiederhergestellt werden.

### Verschlüsselte Komplett-Backups
Die Datensicherung erstellt nun standardmäßig eine passwortgeschützte `.fcbak`-Datei (AES-256-GCM). Alte unverschlüsselte JSON-Backups bleiben aus Kompatibilitätsgründen importierbar; der Klartext-Export ist nur noch in einem Warnbereich verfügbar.

### Lizenz-/Quellcodeprinzip
Die Sicherheitsfunktionen wurden eigenständig mit Browser-Standard-APIs implementiert. Es wurde kein Code aus BSL-/Source-available-Projekten übernommen.

## Anspruchscheck
Der v0.15-Regelstand mit 51 Prüfungen und Folgeansprüchen bleibt vollständig erhalten. Regelstand: 30.09.2026.

## Installation
ZIP entpacken und über einen lokalen/HTTPS-Webserver bereitstellen. Für PWA-Installation und Service Worker reicht `file://` nicht zuverlässig aus.
