# Familiencockpit v0.13.0

Neu in v0.13.0:

- strukturierte Mindestlaufzeit (Tage/Wochen/Monate/Jahre) und Kündigungsfrist
- automatische Berechnung des Laufzeitendes aus Vertragsbeginn + Mindestlaufzeit
- automatische Berechnung des Kündigungstermins aus Laufzeitende minus Kündigungsfrist
- manuell hinterlegte End- und Kündigungsdaten haben immer Vorrang
- keine pauschalen gesetzlichen Kündigungsregeln: berechnet wird nur aus den eingetragenen Vertragswerten
- Frist-Ampel für überfällige, bis 30 Tage und bis 90 Tage liegende Termine
- bis zu drei wichtige Vertragsfristen direkt im Familiencockpit
- Filter nach Person, Kategorie, Status und Frist
- zusätzliche Kategorien: Wohnen/Nebenkosten, Fahrzeug, Schule/Betreuung sowie Software/Cloud
- bestehende Verträge aus v0.12 bleiben kompatibel

---

# Familiencockpit v0.12.0

Die bisherige Sterbefall-App wird zum **Familiencockpit** weiterentwickelt. Der komplette Todesfall-Assistent bleibt als Modul erhalten.

Neu in v0.12.0:

- neues Familiencockpit-Dashboard statt einer auf den Sterbefall ausgerichteten Startseite
- Hauptbereiche: Familie, Verträge & Abos, Dokumente, Lebens-/Datenmappe, Krankheit & Ernstfall sowie Todesfall
- neues lokales Modul **Verträge & Abos** für die ganze Familie
- pro Vertrag: Personenzuordnung, Kategorie, Anbieter, Vertrags-/Kundennummer, Kosten und Zahlungsintervall, Beginn, Laufzeit, Kündigungstermin/-regel, automatische Verlängerung, Status, Login-URL/Benutzername, Ablageort und Notizen
- Übersicht über aktive Verträge und grob auf Monatskosten umgerechnete regelmäßige Kosten
- nächster hinterlegter Kündigungs- oder Laufzeittermin wird im Cockpit hervorgehoben
- echte Passwörter werden bewusst **noch nicht** gespeichert; dafür ist später ein separat verschlüsselter Tresor vorgesehen
- bestehende lokale Daten bleiben kompatibel: die IndexedDB wird nicht umbenannt
- Backups heißen nun `familiencockpit-backup-...json` und enthalten die Vertragsdaten innerhalb der jeweiligen Personen

Die App bleibt vollständig **local-first**. Cloud-Synchronisation und Benutzerkonten sind in dieser Stufe nicht erforderlich.

---

# Sterbefall Assistent Deutschland v0.11.1

Neu: **Feinprüfung der fünf schwer rekonstruierbaren Bereiche, ohne die Hauptübersicht zu vergrößern.**

- Die Startansicht des Datenchecks bleibt bei maximal drei nächsten Schritten.
- Erst beim Aufklappen eines kritischen Bereichs erscheint eine kurze Kernprüfung.
- Finanzvermögen berücksichtigt jetzt ausdrücklich Schließfächer, Bezahldienste, Krypto/Wallets, Auslands- und Geschäftskonten/Beteiligungen.
- Versicherungen erfassen als wichtigen Hinweis auch Versicherungsnehmer, versicherte Person und Bezugsberechtigung bei Todesfallleistungen.
- Beim Testament wird zwischen privater, notarieller und amtlich verwahrter Regelung unterschieden; privates Aufbewahren ist nicht mit Registrierung im Zentralen Testamentsregister gleichzusetzen.
- Beim digitalen Nachlass werden Passwortmanager **plus** 2FA/Authenticator/Recovery-Zugang und Gerätezugang berücksichtigt; sensible Geheimnisse sollen nicht im Klartext in der App stehen.
- Der Schuldenbereich umfasst nun ausdrücklich Bürgschaften, Leasing, Steuerthemen und private Forderungen.
- Jede kritische Karte enthält optional einen eingeklappten Abschnitt „Wenn Angehörige später nichts finden“ mit einem belastbaren Suchweg bzw. einer Informationsquelle.

Die Daten werden weiterhin nur als Fundstelle/Übersicht dokumentiert. Ziel ist nicht, sämtliche Dokumente oder Zugangsdaten in der App zu sammeln.

# Sterbefall Assistent Deutschland v0.11.0

Neu: **Kompakter Daten-Vollständigkeitscheck – „Was muss ich wirklich vorbereiten?“**

- Die Startansicht zeigt bewusst nur die **drei wichtigsten offenen Punkte**.
- Schwer später rekonstruierbare Informationen werden priorisiert: Konten/Depots, Versicherungen, Testament-Fundort, digitaler Nachlass sowie private Schulden/Forderungen.
- Sinnvolle Zusatzangaben wie Arbeitgeber, Renten-/Versorgungsübersicht und Immobilien sind zunächst eingeklappt.
- Leicht bzw. regulär wiederbeschaffbare Informationen wie Personenstandsurkunden, Steuer-ID, Rentenversicherungsnummer und Krankenkassendaten erzeugen **keine roten Warnungen**.
- Pro Punkt genügt eine Fundstelle/Ablage und eine kurze Notiz; die App fordert keine unnötigen Dokumentkopien.
- Bestehende Testament- und Digital-Nachlass-Daten werden automatisch als vorbereitet erkannt, wenn die nötige Fundstelle bereits dokumentiert ist.
- Arbeitgeber und Immobilien können anhand des vorhandenen Leistungsprofils automatisch als nicht relevant erkannt werden.
- Die Datenmappe wird beim freigegebenen Stammdatenpaket mit übertragen und ist im normalen Backup enthalten.

Die Prozentanzeige ist eine **Organisationshilfe**. Sie bewertet nicht die rechtliche Wirksamkeit von Dokumenten und bedeutet nicht, dass alle späteren Antragsunterlagen bereits vollständig sind.

# Sterbefall Assistent Deutschland v0.10.0

Neu: **Persönliche Antragsbereitschaft, gemeinsame Fallmappe und priorisierte nächste Schritte**.

- Für jeden relevanten Schritt berechnet die App einen lokalen Vorbereitungsgrad aus bekannten Angaben und markierten Unterlagen.
- Direkt im Schritt werden die nächsten fehlenden Angaben bzw. Unterlagen angezeigt; maximal drei sofort sichtbar, weitere zusammengefasst.
- Eine neue priorisierte To-do-Liste sortiert offene Schritte nach Fristen, Dringlichkeit, Relevanz und Bearbeitungsstatus.
- Fristkritische Punkte (z. B. 30-Tage-Fenster oder Ausschlagungsfrist) werden in der Priorisierung nach vorne gezogen.
- Unterlagen werden in einer gemeinsamen Fallmappe geführt. Eine einmal markierte Sterbeurkunde wird bei anderen passenden Aufgaben wiedererkannt.
- Die vier vorhandenen Antragsassistenten übernehmen Unterlagen aus der Fallmappe; dort bestätigte Unterlagen fließen beim Speichern zurück in die Fallmappe.
- Die Fallakte zeigt zusätzlich, wie viele eindeutige Unterlagen bereits markiert sind und wie viele offene Schritte vollständig vorbereitet sind.
- Bei Wechsel der verstorbenen Person werden Aufgaben, Anträge und Fallmappe bewusst zurückgesetzt, damit keine Unterlagen versehentlich einem anderen Fall zugeordnet werden.

Die Prozentanzeige ist eine **Arbeits- und Vollständigkeitshilfe**, keine Aussage darüber, ob ein rechtlicher Anspruch besteht oder ein Antrag bewilligt wird.

# Sterbefall Assistent Deutschland v0.9.0

Neu: **Persönlicher Anspruchs- und Pflichtenfahrplan** statt bloßer Formularsammlung.

- Stammdaten wurden um ein wiederverwendbares Leistungsprofil erweitert (gesetzliche Rente, Beamtenstatus, betriebliche Versorgung, Versicherungen, Arbeitgeber, Immobilien und laufende Sozial-/Familienleistungen).
- Beim Sterbefall werden bekannte Angaben automatisch übernommen; nur fehlende fallbezogene Punkte werden nachgefragt.
- Jeder Schritt erhält eine transparente Einordnung: **wahrscheinlich relevant**, **prüfen** oder **derzeit nicht passend**.
- Zu jeder Einordnung zeigt die App die Begründung und noch fehlende Angaben. Unklare Fälle werden nicht automatisch ausgeblendet.
- Der Fahrplan zeigt eine kompakte Zusammenfassung der relevanten und noch zu prüfenden Punkte.
- Der Vorschuss zum Sterbevierteljahr berechnet bei vorhandenem Sterbedatum das konkrete 30-Tage-Fenster.
- Bei Erbausschlagung wird das Kenntnisdatum separat erfasst und daraus die reguläre 6-Wochen-Frist berechnet.
- Für die Erbschaftsteuer-Anzeige kann das Kenntnisdatum des Erwerbs hinterlegt und die 3-Monats-Frist berechnet werden.
- Nicht passende Punkte bleiben in einem aufklappbaren Bereich sichtbar, damit die Entscheidung der App nachvollziehbar bleibt.
- Das Leistungsprofil wird bei der verschlüsselbaren Datenfreigabe mit übertragen, wenn Stammdaten freigegeben werden.

Die Bewertung ist bewusst eine Vorauswahl und keine verbindliche Behördenentscheidung.

# Sterbefall Assistent Deutschland v0.8.5

Neu: Rechtliche Hinweise direkt an den Vorsorgedokumenten.

Bei Vorsorgevollmacht, Patientenverfügung, Betreuungsverfügung, Bankvollmacht,
Schweigepflichtentbindung, Bestattungswünschen, Organspende und Testament wird jetzt erklärt:

- wann das Dokument rechtlich/praktisch relevant wird,
- was besonders zu beachten ist,
- welche Formanforderungen typischerweise gelten,
- bei den wichtigsten Dokumenten mit Link zur offiziellen Quelle.

Zusätzlich enthält die Vorsorgevollmacht eine **interne Nutzungsregel**:
sofort / erst bei eigener Handlungsunfähigkeit / nur auf ausdrückliche Aufforderung / eigene Vereinbarung.
Diese Regel bleibt bewusst in der App und wird nicht in die Vollmachtsurkunde gedruckt, weil die Vollmacht
im Außenverhältnis grundsätzlich ab Ausstellung wirksam bleibt.

# Sterbefall Assistent Deutschland v0.8.4

Neu: Daten an Angehörige weitergeben.

- Personendaten oder ein ausgefülltes Dokument können als Freigabelink übertragen werden.
- Der Link öffnet direkt die PWA und zeigt vor dem Import eine Vorschau.
- Bestehende passende Personen können ergänzt oder Daten als neue Person übernommen werden.
- Standardmäßig kann der Link mit einer PIN per AES-GCM verschlüsselt werden.
- Die PIN wird nicht in den Link eingebettet und sollte getrennt übermittelt werden.
- Der Datenteil liegt im URL-Fragment (`#share=...`) und wird dadurch nicht an GitHub Pages gesendet.
- Fotos, Scans, PDF-Anhänge und andere große Binärdateien werden bewusst nicht in Freigabelinks aufgenommen.
- E-Mail, System-Teilen und Link-kopieren werden unterstützt.

# Sterbefall Assistent Deutschland v0.8.3

Neu: Verständnishilfe direkt in den Dokumentformularen.

Bei erklärungsbedürftigen medizinischen und rechtlichen Angaben erscheint ein kleines `?`.
Beim Antippen öffnet sich direkt unter dem Feld eine kurze Erklärung in einfacher Sprache.
Enthalten sind Hilfen insbesondere für Patientenverfügung, Vorsorgevollmacht, Betreuungsverfügung,
Schweigepflichtentbindung, Organspende und Testament-Vorbereitung.

Die Hilfetexte erscheinen nur in der App und werden nicht in das ausgedruckte Dokument übernommen.

# Sterbefall Assistent Deutschland v0.8.2

Hotfix Links: Beim Sterbevierteljahr führt der primäre Button jetzt direkt zum offiziellen PDF-Antrag des Renten Service der Deutschen Post (Teil 7 – Vorschusszahlung). Informationsseiten und Antragsseiten sind in der Oberfläche getrennt und eindeutig beschriftet.

# Sterbefall Assistent Deutschland v0.8.1

Beziehungsangaben wurden korrigiert: In Formularen und Antragsunterlagen wird eine gespeicherte Person nicht mehr als „Ich“ bezeichnet. Die Beziehung wird relativ zur Person berechnet, für die das Formular erstellt wird. Beispiel: Wird die Vorsorge der Mutter bearbeitet, erscheint die eigene Person – abhängig von der Anrede – als Sohn oder Tochter. Im Sterbefall kann die Beziehung zum Verstorbenen zusätzlich ausdrücklich gewählt und korrigiert werden.

# Sterbefall Assistent Deutschland v0.8

Neu in v0.8: **Anträge vorbereiten**

Im Sterbefall-Bereich können vier besonders wichtige Leistungen direkt vorbereitet werden:

- Vorschuss für das Sterbevierteljahr (Renten Service Deutsche Post)
- Witwen-/Witwerrente (DRV R0500)
- Halb-/Vollwaisenrente (DRV R0500 + R0610)
- Übernahme erforderlicher Bestattungskosten nach § 74 SGB XII

Die App übernimmt vorhandene Daten von verstorbener und antragstellender Person automatisch. Bankverbindung, Rentenversicherungsnummer, Steuer-ID und Krankenkasse können lokal für weitere Anträge wiederverwendet werden. Für jeden Antrag gibt es eine Unterlagen-Checkliste, einen Fortschritt, eine druckbare Antragsmappe und Links zum offiziellen Verfahren.

Status in der Fallakte: Offen → Vorbereitet → Beantragt → Erledigt.

Wichtig: Für DRV und Renten Service ersetzt die Antragsmappe nicht das offizielle Formular bzw. eAntrag. Bei § 74 SGB XII gibt es kein bundeseinheitliches Formular; die App erzeugt daher ein nutzbares Anschreiben und eine Daten-/Unterlagenübersicht.

# Sterbefall Assistent Deutschland v0.7

Neu: Der Sterbefall-Bereich ist jetzt ein geführter Angehörigen-Assistent mit aufklappbaren Aufgaben, Fristen, typischen Unterlagen, zuständiger Stelle, offiziellen Links und drei Statusstufen (offen / beantragt / erledigt).

Besonders ergänzt wurden:
- Vorschuss Sterbevierteljahr
- Witwen-/Witwerrente
- Halb-/Vollwaisenrente
- Erziehungsrente
- Leistungen der gesetzlichen Unfallversicherung
- Übernahme von Bestattungskosten nach § 74 SGB XII
- Betriebsrente / Zusatzversorgung
- Beamtenrechtliche Hinterbliebenenversorgung
- Lebens-/Sterbegeldversicherung
- Erbausschlagung
- Erbschein
- Erbschaftsteuer-Anzeige
- Grundbuchberichtigung
- Kindergeld/Kinderzuschlag
- Prüfung von Wohngeld/Grundsicherungsgeld/Sozialhilfe

Die Fallakte fragt einige Eckdaten ab und blendet offensichtlich unpassende Anträge aus.

# Sterbefall Assistent Deutschland v0.6.3

## Neu
- In den druckbaren Formularen wurde der sichtbare „ENTWURF“-Hinweis entfernt.
- Ausgefüllte lokale PDFs werden nach der Erzeugung nicht nur heruntergeladen, sondern können über die System-Teilen-Funktion versendet werden.
- Auf Android kann dabei – sofern installiert/verfügbar – auch Google Drive im Teilen-Menü gewählt werden.
- Für jedes Vorsorgedokument können Foto/Scan oder PDF der unterschriebenen Fassung lokal hinterlegt werden.
- Für die physische Ablage gibt es getrennte Felder „Aufbewahrungsort“ und „Ordner / Register“.
- Hinterlegte Kopien können angesehen, geteilt oder wieder entfernt werden.
- Die Dateien bleiben local-first in IndexedDB auf dem Gerät.

## Hinweis
Das Testament bleibt bewusst ein Vorbereitungsblatt. Ein ausgedruckter Computertext ist nicht automatisch ein wirksames eigenhändiges Testament.

## GitHub Pages
Den kompletten Inhalt einschließlich `forms/` hochladen. Danach wegen des aktualisierten Service Workers einmal Strg+F5 ausführen.
