# Umbau der Studytab-Landingpage — Arbeitsauftrag

**Neu geschrieben am 1. September 2026.** Die alte Fassung war ein
Reparaturauftrag für eine zurückhaltende Visitenkarte. `gedanken.md` ist
jetzt die Richtlinie, und sie will etwas anderes: mehr Funktionen, mehr
Werbung, mehr Bewegung. Was aus der alten Fassung erledigt ist, steht unter
„Was schon steht".

Dieser Auftrag ist in 19 Phasen gegliedert. **Arbeite genau eine Phase pro
Durchgang ab, dann halte an.** Zeige, was sich geändert hat, und warte auf
Freigabe. Fasse keine Phasen zusammen.

---

## Worum es geht

Studytab ist eine iOS-App für das österreichische Schulsystem, gebaut von
**Oliver, Jonathan und Anton** an der HTL Spengergasse. Sie ist noch nicht
veröffentlicht, und **es gibt bewusst kein öffentliches Startdatum.**

*Warum keins:* Ein genanntes Datum ist ein Versprechen. Solange der Scanner
ein Platzhalter ist, das Impressum der App leer und Apples Prüfung Tage
dauert, wäre es ein Versprechen auf Verdacht. Reißt es, beschädigt das genau
die Ehrlichkeit, mit der die Seite wirbt. Die Dringlichkeit kommt deshalb
nicht aus einem Zähler, sondern aus dem, was die Seite anbietet: **eine
einzige Mail, genau dann, wenn es losgeht.**

**Zielgruppen:** Schüler (kommen über geteilte Links, meist am Handy) und
Presse/Wettbewerbe (Jugend Innovativ, Schulpreise, Lokalzeitung).

**Ziel der Seite:** überzeugen, die App zu wollen — und bis zum Start
Adressen sammeln.

### Was sich gegenüber der alten Fassung geändert hat

| | vorher | jetzt |
|---|---|---|
| Tonfall | keine Werbesprache | **Werbesprache erwünscht** |
| Funktionen | „Drei Dinge, mehr nicht." | **vier Sektionen** |
| Gestaltung | statisch, ein Akzent | **mehr Farbe, Scroll-Animationen** |
| Handlungsaufruf | Formular, einmal | **Formular, zweimal — und es funktioniert wirklich** |

---

## Die eine Regel, die alles überlebt

> **Keine Behauptung ohne Deckung im Code.**

Werbesprache heißt: *lauter* werden, nicht *unwahrer*. Der Ton darf
übertreiben, die Fakten nicht. Ein Abgleich mit dem App-Repo am 1. September
2026 hat drei Dinge gefunden, die auf der Seite nichts zu suchen haben:

- **Keine KI-Lernkarten.** Im App-Code steht dazu nichts. Sie sind als
  Bezahlfunktion geplant — geplant ist nicht gebaut, und Geplantes gehört
  nicht auf die Seite.
- **Keine Handysperre.** `FokusView.swift` sagt selbst, dass keine iOS-App
  das Telefon sperren darf. Sie hält den Bildschirm wach und **zählt
  Unterbrechungen**. Genau das ist das Verkaufsargument, nicht mehr.
- **Kein echter Kamera-Scanner.** `ScanView.swift` ist im Code als
  Platzhalter markiert: Auslöser-Knopf und Foto-Upload, keine Live-Kamera.

Das ist keine Bremse, sondern euer Vorteil: Die Datenschutz-Aussagen der
Seite sind am Repo geprüft und stimmen alle. Eine Seite, die nur wahre
Sachen laut sagt, hält jeder Nachfrage stand — auch der einer Jury.

---

## Grundregeln — gelten in jeder Phase

**Texte.** Sämtliche Texte stehen in `lib/site.ts`. Es gibt keinen Text, der
nur im JSX steht, und das soll so bleiben. Das gilt auch für neue Sektionen.

**Das Band-System.** Jeder Abschnitt in `app/globals.css` ist ein `.band`
mit gleicher Anatomie: `band__kicker` → `band__title` → `band__lead` →
Inhalt. Größen kommen ausschließlich aus den Tokens `--t-h1` bis `--t-meta`
und `--t-figure`, gesetzt in `:root` und noch einmal ab
`@media (min-width: 1024px)`. **Setze nie eine feste Schriftgröße an einem
einzelnen Abschnitt.** Fehlt eine Größe, gehört sie in die Skala.

**Farben.** Mehr Farbe ist erlaubt — aber nicht beliebig. Aus
`ios/Studyo/DesignSystem/Color+Theme.swift` bleibt bindend:

- **Grün gehört den Noten.** In der App ist es „bewusst an die beste Note
  gekoppelt und NICHT an die Marke". Nie als Markenfarbe.
- **Blau ist die Aktionsfarbe.** Knöpfe und Links.
- Neue Farben dürfen dazukommen, wenn sie **aus dem App-Design-System**
  stammen — etwa `--card-back` (Ozeanblau, der Hauptakzent der App).
- Keine Farbverläufe außer den in der App vorhandenen, keine farbigen
  Schlagschatten.

**Mobil ist maßgeblich** (390 px breit), Desktop ab 1024 px ist die
Ableitung. Die mobile Reihenfolge nicht versehentlich an den Desktop
angleichen.

**Bewegung.** Entschieden: **produktzeigend, plus genau ein dekoratives
Mittel.** Screenshots sliden herein, der Pfeil vom Scannen zum Zuweisen
läuft, Zahlen zählen hoch — Bewegung, die die App vorführt. Dazu als
einziges Schmuckmittel ein sanftes Einblenden der Abschnitte beim Scrollen.
Kein Parallax, keine wandernden Farbflächen.

*Warum so:* Ihr wollt technisch versiert wirken. Dekorative Effekte sind
der Normalzustand jeder Baukastenseite — sie beweisen nichts. Eine
Animation, die einen Ablauf erklärt, kann nur jemand bauen, der das Produkt
versteht. Das ist der Unterschied, den eine Jury sieht.

**`prefers-reduced-motion` ist Pflicht**, nicht Kür. Jede Animation braucht
eine ruhige Fassung. Der Block steht schon in `app/globals.css`.

**Entwicklungsserver.** `npx next dev --webpack` benutzen, **nicht**
`npm run dev`. Turbopack scheitert auf win32/arm64, weil die nativen
SWC-Bindings von einer Application-Control-Policy blockiert werden.

**Nach jeder Phase:** `npx tsc --noEmit` sauber, alle Routen HTTP 200,
Prüfung bei 390 px und 1440 px.

---

## Was schon steht

Aus der alten Fassung erledigt und weiterhin gültig:

- **Teamnamen und Schule** in `lib/site.ts`
- **Impressum und Datenschutz** als Gerüst mit markierten Lücken
  (`/impressum`, `/datenschutz`, `components/LegalPage.tsx`)
- **Vorschaubild für geteilte Links** — 1200 × 630, `metadataBase`,
  Twitter-Card. Zieht Schlagzeile und Name automatisch aus `lib/site.ts`,
  ändert sich also mit Phase 5 von selbst mit.
- **Die Größenskala** inklusive `--t-figure`
- **Die Screenshot-Liste** — am App-Repo abgeglichen, an Anton und Jonathan
  weitergegeben. Die elf Dateinamen stehen in Phase 8.

---

## Block A — Ohne das darf die Seite nicht live

### Phase 1 — Betreiberdaten und Kontakt

**Ziel:** `site.contact.email` anlegen, die Lücken in `legal.impressum` und
`legal.datenschutz` füllen, `/kontakt` auflösen.

**Warum:** § 5 ECG verlangt ein Impressum, Art. 13 DSGVO eine Information
bei der Erhebung. Beides ist derzeit ein Gerüst. „Schreib uns" im Team-Block
und „Kontakt" in der Fußzeile zeigen ins Leere.

**Wer als Medieninhaber dasteht, ist geklärt:** Von den dreien ist nur
**Jonathan volljährig.** Damit ist er der Einzige, der ohne
Erziehungsberechtigte für Impressum und Datenschutzerklärung haften kann.

**Gebraucht wird also:** Jonathans vollständiger Name, seine ladungsfähige
Anschrift und eine E-Mail-Adresse, die er liest.

**Bevor das jemand einträgt — zwei Dinge, die Jonathan wissen muss:**
1. Die Anschrift steht danach **öffentlich im Netz.** Wenn es keine andere
   gibt, ist es seine Privatadresse.
2. Er haftet allein für das, was auf der Seite steht — auch für das, was
   Oliver und Anton schreiben.

**Deshalb vorher fragen:** ob die HTL Spengergasse das Projekt als
Medieninhaber trägt. Bei Schulprojekten ist das der übliche Weg, es verteilt
die Verantwortung und erspart die Privatadresse. Ein Nein kostet nichts.

**Abkürzung:** `ios/Studyo/Views/ImpressumView.swift` hat
**Unternehmensgegenstand und Blattlinie schon ausformuliert**, deutsch und
englisch. Übernehmen statt neu schreiben. Und: `enum Betreiber` in der App
hat dieselben Lücken — einmal ausfüllen deckt App und Website.

**Fertig, wenn:** beide Rechtstexte ohne Warnkasten auskommen und ein Klick
auf „Schreib uns" ankommt.

### Phase 2 — Die Anmeldung muss wirklich speichern

**Ziel:** `lib/signups.ts` durch eine Speicherung ersetzen, die auf Vercel
funktioniert.

**Warum:** Die Funktion schreibt in eine Datei. Vercels Dateisystem ist
schreibgeschützt — **jede Anmeldung bricht dort mit „Hat gerade nicht
geklappt" ab.** Ihr verliert genau die Adressen, für die die Seite gebaut
ist. Der Code markiert die Stelle selbst als Austauschpunkt.

**Naheliegend:** Ihr benutzt für die App bereits **Supabase**. Eine Tabelle
mehr kostet nichts und hält die Daten dort, wo eure anderen auch liegen —
und die Datenschutzerklärung muss dann nur einen Dienst nennen statt zwei.

**Fertig, wenn:** eine Anmeldung auf der Vercel-Adresse ankommt und
nachweislich gespeichert ist.

### Phase 3 — Namensumstellung gegenprüfen

**Ziel:** Sicherstellen, dass Website und App denselben Namen sagen.

**Warum:** Die App heißt im Code durchgehend **Studyo** — auch in ihren
beiden Rechtstexten („Wie Studyo mit deinen Daten umgeht", „Wer hinter
Studyo steht"). Die Umbenennung auf Studytab ist beschlossen. Rechtstexte
mit falschem Produktnamen sind ein echtes Problem, kein Schönheitsfehler.

**Auf Website-Seite zu prüfen:** ob `legal.datenschutz` auf die
App-Erklärung verweist und ob der Verweis nach der Umbenennung noch stimmt.

**Fertig, wenn:** `grep -ri "studyo"` in beiden Projekten nur noch
historische Kommentare findet.

---

## Block B — Die neue Botschaft

### Phase 4 — Die Start-Mail vorbereiten

**Ziel:** Den Weg von der Anmeldung bis zur einen Mail zu Ende denken und
den Teil bauen, der heute schon gebraucht wird.

**Warum:** Adressen sammeln nützt nur, wenn am Starttag jemand
draufdrücken kann. Der Versand ist aber **kein Werkzeug, das heute laufen
muss** — er läuft genau einmal. Deshalb wird hier nur so viel gebaut, wie
nötig ist, und nicht mehr.

**Was jetzt gebaut wird:**
1. Ein Feld `bestaetigt_am` in der Tabelle aus Phase 2, damit später
   nachvollziehbar ist, wer wann zugestimmt hat.
2. Ein Feld `benachrichtigt_am`, das leer bleibt, bis die Mail raus ist.
   Ohne das verschickt ein zweiter Durchlauf alles doppelt.
3. Ein **Abmeldeweg**. Ein Zufallsschlüssel je Adresse und eine Route
   `/abmelden/[schluessel]`, die den Eintrag löscht.

**Warum Punkt 3 nicht warten darf:** Unter dem Anmeldefeld steht heute
schon „Abmelden mit einem Klick." — und es gibt keinen. Das ist eine
Behauptung ohne Deckung, auf einer Seite, deren Verkaufsargument
Ehrlichkeit ist. Entweder der Weg wird gebaut oder der Satz muss weg.

**Was später kommt, nicht jetzt:** der eigentliche Versand. Bei ein paar
hundert Adressen genügt am Starttag ein kleines Skript, das die Liste
ausliest und über einen Dienst verschickt — mit `studytab.at` als
Absender, weil vorher kaum ein Anbieter zustellt. **Heute wäre das
gebaute Infrastruktur für einen einzigen Knopfdruck in Monaten.**

**Fertig, wenn:** eine Anmeldung mit Zustimmungszeitpunkt gespeichert wird
und ein Klick auf den Abmeldelink den Eintrag wirklich löscht.

### Phase 5 — Neue Schlagzeile

**Ziel:** Schlagzeile und Lede auf die Botschaft „Überblick über deine ganze
Schule" umstellen. Werbesprache ist erlaubt.

**Warum:** Entschieden ist der breite Aufhänger — nicht Noten, nicht das
Lernfeature, sondern das Ganze.

**Die Gefahr dabei, und wie man sie umgeht:** „Macht Schule einfacher"
könnte über jeder Schul-App der Welt stehen. Ein breites Versprechen muss
im selben Atemzug **konkret belegt** werden, sonst ist es schwächer als der
alte Satz. Der Beleg steht bereit und ist einzigartig: **Studytab rechnet
mit Semester, nicht mit Halbjahr.** Eine deutsche App rechnet einem
Österreicher buchstäblich das Falsche aus. Das ist kein Marketingwinkel,
sondern ein Funktionsunterschied — und er gehört in Sichtweite der
Schlagzeile, nicht in einen Nebensatz.

**Nebenbei zu reparieren:** `features[0].text` sagt „pro Halbjahr" und
`team.text` sagt „Halbjahresschnitt". Beides widerspricht dem eigenen
Argument.

**Fertig, wenn:** die Schlagzeile groß verspricht und der Beleg dafür ohne
Scrollen sichtbar ist.

### Phase 6 — Die Preisfrage beantworten

**Ziel:** In einem Satz sagen, dass Studytab gratis ist.

**Warum:** Die Frage stellt sich jeder, und auf der ganzen Seite steht
nirgends etwas dazu. Gratis ist ein Argument und gehört groß hin.

**Warnung:** Später sollen Bezahlfunktionen dazukommen (Monatsabo, etwa für
generierte Lernkarten). **Diese Absicht darf nicht auf die Seite** — weder
als Versprechen noch als Andeutung. „Studytab ist gratis" ist heute wahr
und morgen für alles, was heute drin ist, immer noch wahr. Ein „vorerst
gratis" sät nur Misstrauen, ein Versprechen auf künftige Funktionen wäre
eine Behauptung ohne Deckung.

---

## Block C — Das neue Layout

> **Achtung, Reihenfolge.** Phase 7 baut die Gerüste, die Phasen 9 bis 12
> füllen sie. Ohne Screenshots aus Phase 8 sind 9 bis 12 leere Kästen.
> **Nicht vorziehen.**

### Phase 7 — Vier Funktionssektionen anlegen

**Ziel:** Das dreiteilige `Features`-Band durch vier eigene Bänder ersetzen:
Fächer · Mitschriften scannen · Lernen · Noten. Erst das Gerüst, Texte und
Bildplätze, noch keine Bilder.

**Warum:** `gedanken.md` will jede Funktion in einer eigenen Sektion mit
eigenen Bildern statt drei Zeilen nebeneinander.

**Der Bildseitenwechsel bleibt:** `band--split` entscheidet über die
Markup-Reihenfolge, welche Seite das Bild bekommt. Abwärts abwechseln.

**Fertig, wenn:** vier Bänder stehen, jedes mit Kicker, Titel, Lead und
einem markierten Bildplatz.

### Phase 8 — Screenshots aufnehmen und einsetzen

**Ziel:** Die elf Bilder aufnehmen, nach `public/screenshots/` legen und in
`lib/site.ts` eintragen.

| Datei | Was drauf ist |
|---|---|
| `start.png` | Startseite: Schnitt, Suche, neueste Mitschriften |
| `faecher-liste.png` | Fächerliste, 6–7 Fächer, jedes mit Schnitt |
| `fach-anlegen.png` | Fach hinzufügen, Formular offen |
| `scannen.png` | Der Scan-Screen |
| `fach-zuweisen.png` | Ein Schritt weiter: Scan benannt, Fach-Auswahl offen |
| `fokus.png` | Laufende Lernsession, Zeit läuft |
| `track.png` | Track-Tab, Wochenbalken und Verlauf |
| `lernen.png` | Karteikarten, mitten im Umdrehen |
| `streak.png` | Streak, Serie auf 12–30 Tagen |
| `fach-noten.png` | Fach offen, Reiter Noten, „Semester" lesbar |
| `note-eintragen.png` | Note eintragen: Schularbeit/Mitarbeit, Gewichtung |

**Aufnahmebedingungen:** iPhone 6.7″ (1290 × 2796) · Statusleiste überall
9:41 · helles Erscheinungsbild · Sprache Deutsch, Schulsystem **Österreich**
(sonst steht „Halbjahr" statt „Semester" da) · Demo-Daten vorher anlegen ·
keine echten Namen. **Alle Bilder in einer Sitzung**, sonst wandern Daten
und Uhrzeit.

**Dazu, keine Screenshots:** Foto von den dreien (quer, mind. 1200 px) und
das App-Icon als PNG in 1024 × 1024.

**Zwingend:** Screenshots von **`origin/main`** aufnehmen. Der lokale
Arbeitsbaum steht auf `agent/einstellungen-vereinfacht` und kennt
`FokusView`, `TrackView` und `SessionAbschlussView` nicht — dort fehlen
genau die zwei stärksten Bilder. Am saubersten über
`git worktree add ../studytab-main main`, dann bleibt der aktuelle Zweig
unangetastet.

**Fertig, wenn:** kein Platzhalter mehr sichtbar ist.

### Phase 9 — Sektion „Fächer"

**Bilder:** `faecher-liste.png`, `fach-anlegen.png` — nebeneinander gereiht.
**Inhalt:** Fächer anlegen, verwalten, jedes mit eigenem Schnitt.

### Phase 10 — Sektion „Mitschriften scannen"

**Bilder:** `scannen.png`, `fach-zuweisen.png` — mit dem **animierten
Pfeil** dazwischen, der vom
Scannen zum Zuweisen läuft.

**Warum diese Sektion die aufwendigste sein darf:** Sie erklärt einen
**Ablauf** statt eines Zustands. Das ist die beste Bildidee der ganzen
Liste und der Ort, an dem sich Animationsaufwand auszahlt.

**Warnung:** Kein Wort über KI-Lernkarten. Und nichts, was eine
Live-Kamera vortäuscht — es gibt einen Auslöser und Foto-Upload.

### Phase 11 — Sektion „Lernen"

**Bilder:** `fokus.png`, `track.png`, `lernen.png`, `streak.png` — schief
übereinander, wie Karten in der Hand.

**Warum hier trotzdem Sorgfalt hin muss:** `gedanken.md` nennt das
Lernfeature „nebensächlich". Der Code sagt das Gegenteil — eine laufende
Session mit gezählten Unterbrechungen und ein Track-Tab mit Wochenbalken
haben die wenigsten Schul-Apps. Für eine Jury ist das der beste Beleg für
echte Software. Es führt die Seite nicht an, aber es verdient die besten
Bilder.

**Warnung:** Keine Handysperre behaupten. Und die Streak zählt Tage, an
denen die App offen war — nicht Lernzeit. Der Text daneben darf nichts
anderes sagen.

### Phase 12 — Sektion „Noten"

**Bilder:** `fach-noten.png`, `note-eintragen.png`.
**Inhalt:** Noten pro Fach, Schnitt **pro Semester**. Hier gehört Grün hin —
es ist die Farbe der Note, und das ist die einzige Stelle, an der es
hingehört.

**Achtung:** Es gibt keinen Noten-Tab mehr. Noten liegen im Fach
(`FachDetailView`, dritter Reiter), der Gesamtschnitt im Profil.

---

## Block D — Bewegung und Farbe

### Phase 13 — Abschnitte beim Scrollen einblenden

**Ziel:** Das eine dekorative Mittel. Sanft, kurz, einmal pro Abschnitt.

**Warnung:** Nichts, was beim ersten Bildschirm verzögert. Was oben steht,
steht sofort da.

### Phase 14 — Screenshots hereinsliden

**Ziel:** Bilder kommen von der Seite herein, aus der Richtung, auf der sie
liegen. **Abwechseln**, nicht alle gleich.

### Phase 15 — Der Pfeil vom Scannen zum Zuweisen

**Ziel:** Die Animation aus Phase 10 bauen. Läuft, wenn die Sektion in
Sicht kommt.

### Phase 16 — Mehr Farbe, diszipliniert

**Ziel:** Den vier Sektionen Farbe geben, ohne das System zu brechen.

**Erlaubt:** Farben aus `Color+Theme.swift` — etwa `--card-back`
(Ozeanblau). Flächen, Kicker, Rahmen.
**Nicht erlaubt:** Grün als Markenfarbe, erfundene Farben, Verläufe,
farbige Schlagschatten.

**Prüfung:** Kontrast nach WCAG AA für jeden Text auf jeder neuen Fläche.

---

## Block E — Abschluss

### Phase 17 — Zweite Anmeldung am Seitenende

**Ziel:** Nach dem Team-Block das Anmeldeformular wiederholen. Der Text
steht ungenutzt in `lib/site.ts` unter `closing`.

**Warum:** Wer bis unten liest, ist überzeugt — und findet dort derzeit
keine Möglichkeit zu handeln.

### Phase 18 — Social Media

**Ziel:** Links zu TikTok, YouTube und Instagram in der Fußzeile.

**Warnung:** **Erst verlinken, wenn dort etwas steht.** Ein Link auf ein
leeres Profil schadet mehr als kein Link.

### Phase 19 — Pressezeile und Prüfdurchgang

**Ziel:** E-Mail und Logo zum Herunterladen im Team-Band. Dann einmal
komplett prüfen: `prefers-reduced-motion`, Ladezeit auf einem alten
Schulhandy, Kontraste, alle Routen, Vorschaubild auf der echten Domain.

---

## Was nicht angetastet wird

- **Die belegten Datenschutz-Aussagen.** Am App-Repo geprüft, Belege stehen
  als Kommentar dabei. `site.privacy` und der Titel des Datenschutz-Bandes
  sind **wortgleich** mit `DatenschutzView.swift` in der App und müssen es
  bleiben. App und Seite dürfen sich nicht widersprechen.
- **Grün gehört den Noten.** Auch bei mehr Farbe.
- **Alle Texte in `lib/site.ts`.** Auch neue.
- **Die Skala.** Keine festen Schriftgrößen an einzelnen Abschnitten.
- **Der Aufbau des Team-Bands.** Bild links, Text rechts, viel Luft.
- **Die mobile Reihenfolge.**
- **Keine Behauptung ohne Deckung im Code.** Die Regel, die alles überlebt.

---

## Offene Punkte, die niemand vergessen darf

| | Stand 1. September 2026 |
|---|---|
| **Domain** | `studytab.at` ist beschlossen, aber **das Geld dafür fehlt gerade.** `site.url` steht so lange auf der Vercel-Adresse — eine Zeile umstellen, sobald die Domain läuft. Kostet als `.at` im Jahr etwa so viel wie zweimal Kino; wenn ihr Preise vergleicht, achtet auf den Verlängerungspreis, nicht auf das erste Jahr. |
| **E-Mail** | Ohne Domain kein `@studytab.at`. **Blockiert Phase 1.** Zwischenlösung: ein gemeinsames Gratis-Postfach, damit das Impressum nicht an fehlenden 15 Euro hängt. |
| **Betreiberdaten** | Jonathan ist der Einzige, der als Medieninhaber infrage kommt. Es fehlen sein voller Name und die Anschrift — und die Antwort der Schule, ob sie das Projekt trägt. |
| **Team-Foto** | `site.team.photo` ist bis heute `null`. Es braucht kein Fotograf zu sein: quer, mindestens 1200 px breit, ihr drei. |
| **Screenshots** | Liste ist an Anton und Jonathan raus. Wichtig: von `origin/main` aufnehmen, sonst fehlen `fokus.png` und `track.png` — die zwei besten Bilder. |
| **App-Umbenennung** | Erledigt sich — Anton und Jonathan machen das. |
| **Kein Startdatum** | Bewusst so. Wenn eines genannt wird, dann erst, wenn die App eingereicht und geprüft ist — nicht vorher. |
