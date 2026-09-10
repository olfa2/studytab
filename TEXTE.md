# Alle Texte der Website

Jeder Satz, der auf studytab-real.vercel.app zu sehen ist — in der
Reihenfolge, in der er auf der Seite vorkommt.

**Diese Datei ist ein Spiegel, kein Original.** Sie wurde aus
`lib/site.ts` erzeugt. Wer einen Text ändern will, ändert ihn dort —
unter dem Pfad, der über jedem Absatz steht. Eine Änderung hier
landet nicht auf der Seite.

Stand: 2026-09-10 · Adresse: https://studytab-real.vercel.app

---

## Inhalt

| | Abschnitt | Wo im Code |
|---|---|---|
| 1 | [Kopf](#1-kopf) | `site.name`, `site.release` |
| 2 | [Einstieg](#2-einstieg) | `site.headline`, `site.lede` |
| 3 | [Die vier Funktionsabschnitte](#3-die-vier-funktionsabschnitte) | `featureSections` |
| 4 | [Datenschutz-Band](#4-datenschutz-band) | `site.privacySection` |
| 5 | [Wer dahintersteckt](#5-wer-dahintersteckt) | `site.team` |
| 6 | [Abschluss](#6-abschluss) | `site.closing` |
| 7 | [Fußzeile](#7-fußzeile) | `site.footer` |
| 8 | [Abmeldeseite](#8-abmeldeseite) | `site.abmelden` |
| 9 | [Impressum](#9-impressum) | `legal.impressum` |
| 10 | [Datenschutzerklärung](#10-datenschutzerklärung) | `legal.datenschutz` |
| 11 | [Für geteilte Links](#11-für-geteilte-links) | `site.metaTitle`, `site.og` |

---

## 1 · Kopf

`site.name`

> Studytab

Rechts daneben, solange die App nicht draußen ist:

`site.release.pending`

> Bald im App Store

Nach dem Start (`site.released = true`) steht dort stattdessen:

`site.release.link`

> Im App Store

Die vier Sprungmarken im Kopf sind die Beschriftungen der Abschnitte
aus `featureSections` — sie stehen nicht doppelt im Code.

## 2 · Einstieg

### Die Zeile über der Schlagzeile

`site.scanLine`

> Aus dem Schulhaus hergekommen? Dann bist du richtig.

*Lässt sich mit `site.showScanLine = false` ausblenden.*

### Schlagzeile

`site.headline`

> Deine ganze Schule in einer App.

### Vorspann

`site.lede`

> Noten, Mitschriften, Karteikarten und deine Lernzeit.

### Anmeldeformular

| Was | Text | Pfad |
|---|---|---|
| Beschriftung über dem Feld | E-Mail eintragen — wir melden uns, sobald die App im App Store verfügbar ist | `site.signup.label` |
| Kurzfassung (nur Screenreader) | E-Mail-Adresse | `site.signup.labelShort` |
| Graue Schrift im Feld | deine@adresse.at | `site.signup.placeholder` |
| Knopf | Sag mir Bescheid | `site.signup.button` |
| Knopf während des Sendens | Moment … | `site.signup.pending` |
| Nach dem Absenden | Passt. Du bekommst eine Mail, sobald es losgeht. | `site.signup.success` |

### Die drei Zusicherungen darunter

`site.zusicherungen`

> Gratis · Auch offline · Kein Tracking

*Alle drei sind belegt: gratis ist eine Entscheidung des Teams,
„Auch offline" steht in `Store/AppStore.swift`, „Kein Tracking" in
`Package.resolved`.*

### Das Bild daneben

| | |
|---|---|
| Titel | Startseite |
| Beschriftung | Schnitt, Suche, / neueste Mitschriften |
| Datei | `public/screenshots/start.jpg` |
| Alt-Text | Die Startseite von Studytab mit Suche, den neuesten Mitschriften und den Fächern |

## 3 · Die vier Funktionsabschnitte

`featureSections` in `lib/site.ts`. Reihenfolge hier = Reihenfolge auf
der Seite.

### 3.1 · Deine Fächer

**Beschriftung**

> Deine Fächer

**Titel**

> Erstelle und verwalte deine Fächer.

**Text**

> Jedes Fach bekommt einen Namen und eine Farbe. Und danach seinen eigenen Schnitt, seine eigenen Mitschriften und seine eigenen Karteikarten.

**Bilder** — Anordnung `gestaffelt`, Bildseite `right`, Akzent `ozean`

| Titel | Beschriftung | Datei | Alt-Text |
|---|---|---|---|
| Fächerliste | Alle Fächer, / jedes mit Schnitt | `faecher-liste.jpg` | Die Fächerliste in Studytab, jedes Fach mit seinem Notenschnitt |
| Fach anlegen | Name, Farbe, / fertig | `fach-anlegen.jpg` | Ein neues Fach wird in Studytab angelegt |

### 3.2 · Mitschriften

**Beschriftung**

> Mitschriften

**Titel**

> Abfotografiert. Eingeordnet. Wiedergefunden.

**Text**

> Heft aufschlagen, Foto machen, Fach auswählen. Am Abend vor der Schularbeit suchst du dann nicht erst, wo die Stunde von letzter Woche geblieben ist.

**Bilder** — Anordnung `gegenueber`, Bildseite `left`, Akzent `ozean`

| Titel | Beschriftung | Datei | Alt-Text |
|---|---|---|---|
| Aufnehmen | Seite abfotografieren / oder Foto auswählen | `scannen.jpg` | Eine Heftseite wird in Studytab aufgenommen |
| Einordnen | Benennen und / einem Fach zuweisen | `fach-zuweisen.jpg` | Eine aufgenommene Mitschrift wird in Studytab einem Fach zugewiesen |

### 3.3 · Lernen

**Beschriftung**

> Lernen

**Titel**

> Lern in Sessions.

**Text**

> Starte eine Lernsession und lern mit deinen Karteikarten — die legst du direkt dort an. Studytab zählt die Zeit mit, führt eine Serie über deine Lerntage und zeigt dir im Wochenverlauf, wie viel zusammengekommen ist.

**Bilder** — Anordnung `handkarten`, Bildseite `right`, Akzent `ozean`

| Titel | Beschriftung | Datei | Alt-Text |
|---|---|---|---|
| Fokus | Laufende Session, / Unterbrechungen gezählt | `fokus.jpg` | Eine laufende Lernsession in Studytab mit gezählten Unterbrechungen |
| Track | Wochenbalken und / Verlauf | `track.jpg` | Der Track-Tab in Studytab mit Wochenbalken der Lernzeit |
| Karteikarten | Sets anlegen / und lernen | `lernen.jpg` | Der Karteikarten-Lernmodus in Studytab |
| Streak | Serie, Bestwert / und Kalender | `streak.jpg` | Die Streak-Übersicht in Studytab mit laufender Serie und Kalender |

### 3.4 · Noten

**Beschriftung**

> Noten

**Titel**

> Jederzeit Überblick über deine Noten.

**Text**

> Trag eine Note ein — der Schnitt rechnet sich sofort neu. Schularbeiten zählen dabei anders als Tests oder Mitarbeit.

**Bilder** — Anordnung `haupt-neben`, Bildseite `right`, Akzent `note`

| Titel | Beschriftung | Datei | Alt-Text |
|---|---|---|---|
| Noten im Fach | Notenliste und / aktueller Schnitt | `fach-noten.jpg` | Die Notenliste eines Fachs in Studytab mit dem aktuellen Schnitt |
| Note eintragen | Schularbeit oder / Mitarbeit, gewichtet | `note-eintragen.jpg` | Eine neue Note wird in Studytab eingetragen |

Unter jedem Bildplatz, solange kein echtes Bild da ist:

`site.placeholderNote`

> Platzhalter — hier kommen die echten Screenshots aus der App hinein (1290 × 2796)

## 4 · Datenschutz-Band

Das dunkle Band. **Jeder Satz hier ist am App-Repo geprüft** — die
Belege stehen als Kommentar in `lib/site.ts`.

`site.privacySection.kicker`

> Datenschutz

`site.privacySection.title`

> Deine Inhalte gehören dir.

`site.privacySection.lead`

> Sie werden nur gespeichert, damit die App funktioniert — für nichts anderes.

| Punkt | Text |
|---|---|
| **Server in der EU** | Mit Konto liegen deine Inhalte verschlüsselt auf Servern in Frankfurt — damit sie auf einem neuen Gerät wieder da sind. |
| **Kein Tracking** | Keine Werbung, kein Verkauf von Daten. Im ganzen Projekt steckt keine Analyse-, Absturz- oder Werbebibliothek. |
| **Jederzeit löschbar** | Du kannst dein Konto in der App löschen. Nach 30 Tagen ist alles endgültig weg. |

Darunter, in kleiner Schrift:

`site.privacy`

> Kein Tracking, keine Werbung, kein Verkauf von Daten.

> ⚠️ **Dieser eine Satz ist wortgleich mit der Datenschutz-Seite in der
> App** (`Views/DatenschutzView.swift`). App und Website dürfen sich
> hier nicht widersprechen — wer ihn ändert, ändert ihn an beiden Stellen.

## 5 · Wer dahintersteckt

`site.team.kicker`

> Wer dahintersteckt

`site.team.title`

> Ein Projekt von drei Schülern

`site.team.text`

> Wir sind drei Schüler aus Österreich und haben Studytab gebaut, weil wir selbst keine App gefunden haben, die mit Schularbeit, Mitarbeit und Semesterschnitt umgehen kann. Alles, was drin ist, benutzen wir jeden Tag selbst. Wenn dir etwas fehlt: schreib uns, wir lesen jede Mail.

`site.team.names`

> Oliver, Jonathan und Anton

`site.team.school`

> HTL Spengergasse, Wien

`site.team.contact.label`

> Schreib uns

Der Link zeigt auf `/kontakt` — **diese Seite gibt es
noch nicht**, der Link läuft ins Leere.

Solange `site.team.photo` auf `null` steht, steht dort ein Platzhalter:
„Foto / Ein Bild von euch dreien / quer, mindestens 1200 breit".

## 6 · Abschluss

`site.closing.title`

> Klingt nach etwas, das du brauchst?

`site.closing.text`

> Trag deine Adresse ein. Wir melden uns genau einmal — wenn Studytab im App Store ist.

Darunter noch einmal dasselbe Anmeldeformular wie im Einstieg.

## 7 · Fußzeile

| Beschriftung | Ziel | Gibt es die Seite? |
|---|---|---|
| Impressum | `/impressum` | ja |
| Datenschutz | `/datenschutz` | ja |
| Kontakt | `/kontakt` | **nein — 404** |

`site.footer.copyright`

> © 2026 Studytab

## 8 · Abmeldeseite

Hinter dem Link aus der Start-Mail. Sie fragt einmal nach, statt beim
Aufrufen sofort zu löschen — Mailprogramme rufen Links im Hintergrund
auf, um Vorschauen zu bauen.

| Was | Text | Pfad |
|---|---|---|
| Beschriftung | Abmelden | `site.abmelden.kicker` |
| Überschrift | Willst du dich abmelden? | `site.abmelden.title` |
| Text | Dann löschen wir deine Adresse aus der Liste. Du bekommst keine Nachricht mehr von uns — auch nicht die zum Start. | `site.abmelden.lead` |
| Knopf | Ja, abmelden | `site.abmelden.button` |
| Knopf während des Sendens | Moment … | `site.abmelden.pending` |
| Nach dem Abmelden — Überschrift | Erledigt. | `site.abmelden.fertigTitle` |
| Nach dem Abmelden — Text | Deine Adresse ist gelöscht. Wenn du es dir anders überlegst, kannst du dich jederzeit wieder eintragen. | `site.abmelden.fertigText` |
| Bei einem Fehler — Überschrift | Das hat nicht geklappt. | `site.abmelden.fehlerTitle` |
| Bei einem Fehler — Text | Probier es später noch einmal, oder schreib uns — dann machen wir es von Hand. | `site.abmelden.fehlerText` |
| Bei kaputtem Link — Überschrift | Dieser Link stimmt nicht. | `site.abmelden.ungueltigTitle` |
| Bei kaputtem Link — Text | Vielleicht wurde er beim Kopieren abgeschnitten. Nimm den vollständigen Link aus der Mail. | `site.abmelden.ungueltigText` |
| Link zurück | Zur Startseite | `site.abmelden.zurueck` |

## 9 · Impressum

`legal.impressum.kicker`

> Pflichtangaben

`legal.impressum.title`

> Impressum

`legal.impressum.lead`

> Angaben nach § 5 E-Commerce-Gesetz und § 25 Mediengesetz.

**Warnkasten oben** *(verschwindet von selbst, sobald keine Lücke mehr offen ist)*

> **Dieses Impressum gilt noch nicht.**  
> Es ist ein Gerüst: Die Abschnitte stehen, die Angaben fehlen. Jede markierte Stelle muss ausgefüllt werden. Solange hier etwas offen ist, sollte die Seite nicht öffentlich verlinkt werden.

### 9.1 · Medieninhaber und Diensteanbieter

*Wer die Seite betreibt, mit einer Anschrift, an die man tatsächlich zustellen kann. Ein Postfach genügt dafür nicht. Medieninhaber ist Jonathan — von den dreien ist er der Einzige, der volljährig ist und damit allein haften kann.*

| Angabe | Wert |
|---|---|
| Name | 🔴 ‹Jonathans vollständiger Vor- und Nachname› |
| Anschrift | 🔴 ‹Straße Hausnummer, PLZ Ort, Österreich› |
| E-Mail | 🔴 ‹Kontakt-E-Mail eintragen› |

**Von euch auszufüllen:**

- [ ] Die drei Angaben oben ersetzen. Sie stehen in lib/site.ts unter `betreiber` — an einer Stelle, Impressum und Datenschutz ziehen mit.
- [ ] Jonathan muss wissen: Die Anschrift steht danach öffentlich im Netz, und er haftet allein für alles auf der Seite — auch für das, was Oliver und Anton schreiben.

### 9.2 · Kontakt

*§ 5 ECG verlangt eine E-Mail-Adresse, unter der ihr wirklich erreichbar seid. Für Presse ist sie ohnehin die wichtigste Angabe auf dieser Seite. Sie muss nicht auf studytab.at enden — ein gemeinsames Gratis-Postfach erfüllt die Vorschrift genauso.*

**Von euch auszufüllen:**

- [ ] Adresse eintragen. Sie fehlt im ganzen Projekt noch — auch »Schreib uns« im Team-Block und »Kontakt« in der Fußzeile zeigen derzeit ins Leere.

### 9.3 · Worum es auf dieser Seite geht

*Ein Satz zum Gegenstand der Website. Der folgende ist aus dem Seiteninhalt abgeleitet, nicht erfunden — prüft ihn und übernehmt oder ersetzt ihn.*

**Steht schon fest:**

- Diese Website informiert über Studytab, eine iOS-App für Noten, Mitschriften und Karteikarten, und nimmt vor dem Start E-Mail-Adressen für eine einmalige Benachrichtigung entgegen.

**Von euch auszufüllen:**

- [ ] Satz bestätigen oder umschreiben.

### 9.4 · Unternehmerische Angaben

*Firmenbuchnummer, UID, Gewerbeberechtigung, Kammer und Aufsichtsbehörde verlangt § 5 ECG nur von Unternehmen. Ob ein Schulprojekt ohne Einnahmen darunterfällt, entscheidet man nicht nach Gefühl.*

**Von euch auszufüllen:**

- [ ] Spätestens klären, sobald die App etwas kostet oder ihr auf anderem Weg Geld einnehmt.
- [ ] Solange sie gratis ist und nichts verkauft wird, ist die Frage vermutlich gegenstandslos — lasst euch das aber bestätigen, etwa von einer Lehrkraft für Recht oder der Wirtschaftskammer.

### 9.5 · Blattlinie (§ 25 Mediengesetz)

*Eine Zeile zur grundlegenden Richtung der Seite: worüber sie informiert und für wen.*

**Von euch auszufüllen:**

- [ ] Einen Satz schreiben.

### 9.6 · Haftung und Urheberrecht

*Hier stehen auf vielen Seiten abgeschriebene Textbausteine. Übernehmt keine: Entweder ihr versteht, was dort steht, oder es steht besser gar nicht da. Pflicht ist dieser Abschnitt nicht.*

**Von euch auszufüllen:**

- [ ] Entscheiden, ob ihr ihn überhaupt wollt — und wenn ja, selbst formulieren.

## 10 · Datenschutzerklärung

`legal.datenschutz.kicker`

> Pflichtangaben

`legal.datenschutz.title`

> Datenschutzerklärung

`legal.datenschutz.lead`

> Was mit deiner E-Mail-Adresse passiert, wenn du dich für die Start-Benachrichtigung anmeldest.

**Warnkasten oben** *(verschwindet von selbst, sobald keine Lücke mehr offen ist)*

> **Auch das hier ist noch ein Gerüst.**  
> Die Gliederung folgt Art. 13 DSGVO, die Angaben müssen von den drei Betreibern kommen. Erfundene Sätze wären hier besonders heikel: Eine Datenschutzerklärung, die etwas anderes behauptet als der Code tut, ist schlechter als gar keine.

### 10.1 · Diese Seite und die App sind zweierlei

*Damit nichts durcheinandergerät: Auf dieser Website wird genau eine Sache erhoben, nämlich die E-Mail-Adresse für die Start-Benachrichtigung. Was die App mit Noten, Mitschriften und Karteikarten macht, steht in der Datenschutz-Seite der App und gehört hier höchstens als Verweis hin.*

**Von euch auszufüllen:**

- [ ] Entscheiden, ob die Datenschutz-Seite aus der App hier verlinkt oder wiederholt wird. Widersprechen dürfen sich die beiden nicht.

### 10.2 · Verantwortlicher

*Art. 13 Abs. 1 lit. a: wer über diese Daten entscheidet. Dieselben Angaben wie im Impressum — sie stehen im Code nur einmal und erscheinen hier automatisch mit.*

| Angabe | Wert |
|---|---|
| Name | 🔴 ‹Jonathans vollständiger Vor- und Nachname› |
| Anschrift | 🔴 ‹Straße Hausnummer, PLZ Ort, Österreich› |
| E-Mail | 🔴 ‹Kontakt-E-Mail eintragen› |

**Von euch auszufüllen:**

- [ ] Füllt sich von selbst, sobald `betreiber` in lib/site.ts steht.

### 10.3 · Welche Daten erhoben werden

*Alle vier Sätze sind am Code nachgeprüft: app/actions.ts, lib/signups.ts und lib/absender.ts.*

**Steht schon fest:**

- Genau ein Feld gibst du an: die E-Mail-Adresse aus dem Anmeldeformular. Dazu wird der Zeitpunkt der Anmeldung gespeichert.
- Das Formular hat ein zweites, unsichtbares Feld, das Bots abfängt. Wird es ausgefüllt, wird nichts gespeichert.
- Damit niemand das Formular massenhaft mit erfundenen Adressen befüllt, wird zu jeder Anmeldung eine Kennung des Absenders abgelegt. Sie ist ein nicht zurückrechenbarer Prüfwert aus deiner IP-Adresse und einem Geheimnis des Servers — die IP-Adresse selbst wird weder gespeichert noch protokolliert.
- Diese Kennung dient allein dem Zählen der Anmeldungen pro Stunde. Sie lässt sich keiner Person zuordnen und verschwindet mit deiner Abmeldung.

**Von euch auszufüllen:**

- [ ] Gegenprüfen, sobald sich am Formular etwas ändert.
- [ ] Formulierung zur Absender-Kennung von jemandem prüfen lassen: Rechtsgrundlage ist hier nicht die Einwilligung, sondern das berechtigte Interesse nach Art. 6 Abs. 1 lit. f DSGVO — Schutz vor Missbrauch.

### 10.4 · Zweck und Rechtsgrundlage

*Art. 13 Abs. 1 lit. c. Zweck ist die einmalige Nachricht zum Start; als Rechtsgrundlage kommt die Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO in Betracht. Das ist der rechtlich heikelste Punkt der Seite — er gehört bestätigt, nicht abgeschrieben.*

**Von euch auszufüllen:**

- [ ] Die Formulierung von jemandem prüfen lassen, der sich damit auskennt.
- [ ] Unter dem Anmeldefeld steht »Abmelden mit einem Klick.« — einen Abmeldeweg gibt es aber noch nicht. Entweder ihr baut ihn, oder der Satz muss weg. Ungedeckt darf er nicht stehen bleiben.

### 10.5 · Wie lange gespeichert wird

*Art. 13 Abs. 2 lit. a verlangt eine Frist oder wenigstens ein Kriterium, nach dem sich die Frist bestimmt.*

**Von euch auszufüllen:**

- [ ] Frist festlegen. Naheliegend: bis zur Start-Mail, danach löschen.
- [ ] Festlegen, was passiert, wenn die App doch nicht erscheint.

### 10.6 · Wo die Adressen liegen

*Das ändert sich, sobald ein Hoster oder ein Mailversand dazukommt — lib/signups.ts ist im Code ausdrücklich als Austauschpunkt markiert. Ab dann braucht es hier den Namen des Dienstes und einen Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.*

**Steht schon fest:**

- Stand heute schreibt die Seite jede Adresse in eine Datei auf dem Server, auf dem sie läuft. Ein Dienstleister ist nicht beteiligt.

**Von euch auszufüllen:**

- [ ] Eintragen, sobald feststeht, wo die Seite läuft und womit die Mails verschickt werden.
- [ ] Die Server-Logs des Hosters prüfen: IP-Adressen werden dort fast immer gespeichert, und dann gehören sie hier hinein.

### 10.7 · Deine Rechte

*Art. 13 Abs. 2 lit. b bis d: Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch und der jederzeitige Widerruf der Einwilligung — dazu das Recht, sich bei der Aufsichtsbehörde zu beschweren.*

**Von euch auszufüllen:**

- [ ] Ausformulieren und angeben, an welche Adresse man sich dafür wendet.
- [ ] Die Österreichische Datenschutzbehörde als Beschwerdestelle nennen. Anschrift auf dsb.gv.at nachschlagen, nicht aus dem Gedächtnis eintragen.

### 10.8 · Kein Tracking, keine Cookies

*Keine Behauptung, sondern nachzählbar: Das Projekt hängt an drei Paketen — next, react und react-dom. Ein Analyse- oder Werbewerkzeug ist nirgends eingebunden.*

**Steht schon fest:**

- Die Seite setzt keine Analyse- oder Werbe-Cookies und lädt keine Tracking-Bibliothek.

**Von euch auszufüllen:**

- [ ] Gilt genau so lange, bis jemand ein Analyse-Werkzeug einbaut. Dann muss dieser Abschnitt als Erstes geändert werden.

### Die Betreiberangaben

Stehen **einmal** in `lib/site.ts` unter `betreiber` und erscheinen in
beiden Rechtstexten. Zwei Kopien liefen früher oder später auseinander.

| Angabe | Wert | Pfad |
|---|---|---|
| name | 🔴 ‹Jonathans vollständiger Vor- und Nachname› | `betreiber.name` |
| adresse | 🔴 ‹Straße Hausnummer, PLZ Ort, Österreich› | `betreiber.adresse` |
| email | 🔴 ‹Kontakt-E-Mail eintragen› | `betreiber.email` |

🔴 = noch auszufüllen. Medieninhaber ist Jonathan: Von den dreien ist
er der Einzige, der volljährig ist und damit allein haften kann.

## 11 · Für geteilte Links

Was in der Suche und in der Vorschau steht, wenn jemand den Link in
WhatsApp oder Discord schickt.

| Was | Text | Pfad |
|---|---|---|
| Seitentitel | Studytab — Noten, Mitschriften und Lernzeit für Österreich | `site.metaTitle` |
| Beschreibung | Noten, Mitschriften, Karteikarten und deine Lernzeit. | `site.lede` |
| Alt-Text des Bildes | Studytab — die App für Noten, Mitschriften, Karteikarten und Lernzeit, gemacht fürs österreichische Schulsystem | `site.og.alt` |
| Zeile im Bild | Noten · Mitschriften · Karteikarten · Lernzeit | `site.og.features` |

*Der Seitentitel ist absichtlich nicht die Schlagzeile: In der Suche
zählen die Wörter, nach denen jemand sucht, und niemand sucht nach
„ganze Schule".*

---

## Was noch fehlt

| | wer |
|---|---|
| Elf Screenshots + Teamfoto | Anton und Jonathan |
| Die drei Betreiberangaben | Jonathan — **blockiert den Livegang** |
| Eine Kontaktadresse (zwei Links laufen ins Leere) | einer von euch |
| Ein Startzeitraum statt „Bald" | ihr drei |

