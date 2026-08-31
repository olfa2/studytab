# Umbau der Studytab-Landingpage — Arbeitsauftrag

Dieser Auftrag ist in 18 Phasen gegliedert. **Arbeite genau eine Phase pro
Durchgang ab, dann halte an.** Zeige, was sich geändert hat, und warte auf
Freigabe, bevor du die nächste Phase beginnst. Beginne keine Phase, die noch
nicht freigegeben ist, und fasse keine Phasen zusammen.

---

## Worum es geht

Studytab ist eine iOS-App für Noten, Mitschriften und Karteikarten, gemacht für
das österreichische Schulsystem. Gebaut haben sie drei Schüler aus Österreich.
Die App ist noch nicht veröffentlicht (`site.released === false`), deshalb
sammelt die Seite E-Mail-Adressen für die Start-Benachrichtigung.

**Zielgruppen:** Schüler (kommen über geteilte Links, meist am Handy) und
Presse/Wettbewerbe (Jugend Innovativ, Schulpreise, Lokalzeitung).

**Ziel der Seite:** überzeugen, die App zu wollen. Das ist eine Änderung —
vorher lautete das Ziel „erstmal einfach existieren". Deshalb holt Phase 11 eine
Entscheidung zurück, die unter dem alten Ziel richtig war.

---

## Grundregeln — gelten in jeder Phase

**Texte.** Sämtliche Texte stehen in `lib/site.ts`. Es gibt keinen Text, der nur
im JSX steht, und das soll so bleiben.

**Das Band-System.** Jeder Abschnitt in `app/globals.css` ist ein `.band` mit
gleicher Anatomie: `band__kicker` → `band__title` → `band__lead` → Inhalt.
Größen kommen ausschließlich aus den Tokens `--t-h1` bis `--t-meta`, die in
`:root` und noch einmal im Desktop-Block ab `@media (min-width: 1024px)` gesetzt
sind. **Setze nie eine feste Schriftgröße an einem einzelnen Abschnitt.** Wenn
eine Größe fehlt, gehört sie in die Skala.

**Farben.** Aus `ios/Studyo/DesignSystem/Color+Theme.swift` abgeleitet:

- Grün (`--green`, `--green-deep`) gehört **ausschließlich den Noten** und der
  Bestätigung des Anmeldeformulars. Nie als Marken- oder Flächenfarbe.
- Blau (`--blue`) ist die Aktionsfarbe: Knöpfe und Links.
- Genau ein dunkles Band auf der Seite (Datenschutz).
- Keine Farbverläufe, keine farbigen Schlagschatten.

**Mobil ist maßgeblich** (390 px breit), Desktop ab 1024 px ist die Ableitung.
Die mobile Reihenfolge ist derzeit besser als die auf dem Desktop — beim Umbau
nicht versehentlich angleichen.

**Entwicklungsserver.** `npx next dev --webpack` benutzen, **nicht**
`npm run dev`. Turbopack scheitert auf win32/arm64, weil die nativen
SWC-Bindings von einer Application-Control-Policy blockiert werden; nur die
WASM-Bindings laden, und damit läuft Turbopack nicht.

**Zeilenenden.** `app/globals.css` hat CRLF. Wer die Datei mit einem Skript
bearbeitet, muss sie erhalten.

**Nach jeder Phase:** `npx tsc --noEmit` muss sauber sein, die Seite muss unter
`http://localhost:3000` mit HTTP 200 antworten, und du prüfst bei 390 px und
1440 px.

---

## Block A — Ohne das darf die Seite nirgends auftauchen

### Phase 1 — Teamnamen und Schule eintragen

**Ziel:** `team.names` und `team.school` in `lib/site.ts` durch die echten
Angaben ersetzen.

**Warum:** Der Team-Block ist für Presse und Jurys das Überzeugendste auf der
Seite und sagt derzeit „Vorname, Vorname und Vorname · Schule, Ort".

**Fertig, wenn:** `grep -n "Vorname" lib/site.ts` nichts mehr findet.

**Wenn die Angaben fehlen:** frag danach, statt etwas zu erfinden.

### Phase 2 — Einen erreichbaren Kontakt schaffen

**Ziel:** Die Links auf `/kontakt` müssen ankommen. Entweder eine Route
`app/kontakt/page.tsx` anlegen oder in `lib/site.ts` auf ein `mailto:`
umstellen — betrifft `team.contact.href` und den Fußzeilen-Link.

**Warum:** „Schreib uns" ist der einzige Kontakt-Aufruf der Seite und führt ins
Leere. Im ganzen Projekt steht keine E-Mail-Adresse. Presse kann das Team
derzeit nicht erreichen.

**Fertig, wenn:** ein Klick auf „Schreib uns" und auf „Kontakt" in der Fußzeile
zu einem funktionierenden Ziel führt.

### Phase 3 — Impressum und Datenschutzerklärung

**Ziel:** `app/impressum/page.tsx` und `app/datenschutz/page.tsx` anlegen.

**Warum:** Ein Impressum verlangt § 5 ECG für österreichische Websites. Das
Anmeldeformular erhebt E-Mail-Adressen, also verlangt Art. 13 DSGVO eine
Information bei der Erhebung. Derzeit verlinkt die Seite auf eine
Datenschutzerklärung, die es nicht gibt — einen Abschnitt unter der Überschrift
„Deine Inhalte gehören dir."

**Warnung:** Erfinde keine Rechtstexte und keine Betreiberdaten. Lege das Gerüst
an, markiere die auszufüllenden Stellen deutlich und weise darauf hin, dass die
Inhalte von den drei Betreibern kommen müssen.

**Fertig, wenn:** beide Routen mit HTTP 200 antworten und aus der Fußzeile
erreichbar sind.

---

## Block B — Größte Wirkung, geringster Aufwand

### Phase 4 — Die Schnittzahl unter die Schlagzeile setzen

**Ziel:** `.average__value` von 54 px auf etwa 32 px (mobil) und von 62 px auf
etwa 40 px (Desktop) verkleinern.

**Warum:** Die Zahl ist derzeit in beiden Breiten größer als die Überschrift —
mobil 54 px gegen 34 px, also das 1,59-fache. Sie ist zugleich die einzige
gesättigte Farbe im oberen Seitendrittel und steht allein auf einer umrandeten
Fläche. Deshalb landet der Blick zuerst dort: auf einer erfundenen Note, die
einem neuen Besucher nichts sagt. Die Überschrift muss unbestritten das Größte
auf der Seite sein.

**Fertig, wenn:** in beiden Breiten `--t-h1` größer ist als `.average__value`.

### Phase 5 — Dem Knopf die einzige Farbe oben geben

**Ziel:** In der Schnitt-Karte das Grün auf die normale Schriftfarbe
zurücknehmen; höchstens die Zahl selbst darf noch leicht abgesetzt sein. Der
blaue Anmeldeknopf soll in der ersten Bildschirmhöhe die einzige gesättigte
Farbe sein.

**Warum:** Die auffälligste Farbe der Seite markiert gerade etwas, das man nicht
anklicken kann. Blau bedeutet in diesem System „hier wird gehandelt" — dann muss
es dort auch allein stehen.

**Fertig, wenn:** oberhalb des Screenshot-Bands nur noch der Knopf gesättigt ist.

### Phase 6 — Vorschaubild für geteilte Links

**Ziel:** In `app/layout.tsx` ein Open-Graph-Bild (1200 × 630) und
`metadataBase` ergänzen, dazu eine Twitter-Card. Das Bild entweder über
`app/opengraph-image.tsx` erzeugen oder als Datei unter `public/` ablegen.

**Warum:** Derzeit stehen dort Titel, Beschreibung und Sprache, aber kein Bild.
Wer den Link in WhatsApp, Discord, eine Instagram-Nachricht oder eine
Presse-Mail einfügt, bekommt einen nackten blauen Link. Die Seite ist zum Teilen
gebaut, und genau der Teil fehlt, der Teilen nach etwas aussehen lässt.

**Fertig, wenn:** der gerenderte Quelltext `og:image` mit absoluter URL enthält.

---

## Block C — Das Produktbild

> **Achtung, Kette.** Die Phasen 8, 9 und 10 betreffen dieselbe Stelle. Phase 8
> ist nur die Zwischenlösung, falls Phase 9 verschoben wird; wird Phase 9
> gemacht, entfällt Phase 8 ersatzlos. Phase 10 ersetzt beide, sobald echte
> Bilder vorliegen. **Baue nicht zweimal dasselbe.**

### Phase 7 — Die Karteikarte nach oben holen

**Ziel:** `components/FlashCard.tsx` aus dem Funktionen-Band in den Einstieg
verschieben, dorthin, wo bisher die Schnitt-Karte steht.

**Warum:** Die Karteikarte ist das einzige Element der Seite, das sich bewegt,
das man antippen kann und das die App vorführt statt sie zu beschreiben — genau
das leistet sonst ein Screenshot. Ohne Fotos ist sie das beste Produktbild, das
vorhanden ist. Derzeit steckt sie im dritten Abschnitt rechts, wo die wenigsten
sie je sehen.

**Zu klären:** Wohin die Schnitt-Karte wandert. Ins Funktionen-Band zum Punkt
„Noten" wäre naheliegend. Schlage etwas vor und halte an.

**Fertig, wenn:** die Karteikarte in der ersten Bildschirmhöhe steht und sich
weiterhin drehen lässt, auch per Tastatur.

### Phase 8 — Zwischenlösung: Screenshot-Abschnitt entfernen

**Nur ausführen, wenn Phase 9 verschoben wird.**

**Ziel:** `components/Screens.tsx` vorübergehend aus `app/page.tsx` nehmen.

**Warum:** Ein Telefonrahmen ist 268 px breit bei einem Seitenverhältnis von
1290:2796 — rund 600 px hoch, zweimal nebeneinander. Dieser Block aus leeren,
schraffierten Kästen ist der größte Gegenstand der ganzen Seite, dazu fast
schwarz gerahmt und mit Schlagschatten betont; beides sind Mittel zum
Hervorheben. Ein fehlender Abschnitt fällt niemandem auf, 600 px Leere unter der
Überschrift „So sieht's aus" schon.

**Fertig, wenn:** die Seite ohne den Abschnitt schlüssig bleibt.

### Phase 9 — Den App-Bildschirm zeichnen

**Ziel:** Eine vereinfachte Startseite der App in HTML und CSS nachbauen und in
den Telefonrahmen setzen, statt auf Fotos zu warten.

**Warum:** Farben, Schriften und Radien der App liegen bereits als Tokens in
`app/globals.css`. Damit lässt sich ein erkennbares Abbild bauen, das den Rahmen
füllt und zeigt, wie die App aussieht.

**Warnung:** Das muss klar als Illustration lesbar sein und darf keinen echten
Screenshot vortäuschen. Beschrifte es entsprechend.

**Fertig, wenn:** die Rahmen gefüllt sind und `screens[].src` weiterhin `null`
sein darf, ohne dass Schraffur sichtbar wird.

### Phase 10 — Echte Screenshots einsetzen

**Erst ausführen, wenn die Bilddateien vorliegen.**

**Ziel:** Screenshots nach `public/screenshots/` legen und in `lib/site.ts` bei
`screens[].src` eintragen. Ersetzt das Ergebnis von Phase 8 oder 9.

**Warum:** Bei einer App überzeugt ein Screenshot mehr als jeder Satz darüber.

**Nebenbei prüfen:** `screens[]` hat zwei Einträge, die README spricht von drei.
Klären, was stimmt.

**Fertig, wenn:** echte Bilder im Rahmen stehen und der Platzhalter-Hinweis
darunter verschwunden ist.

---

## Block D — Überzeugen statt nur informieren

### Phase 11 — Den Handlungsaufruf am Seitenende wiederholen

**Ziel:** Nach dem Team-Block eine zweite Anmeldemöglichkeit einsetzen. Der Text
dafür steht ungenutzt in `lib/site.ts` unter `closing`.

**Warum:** Der Aufruf kommt derzeit nur ein einziges Mal vor, ganz oben. Wer bis
zum Team-Block liest — also die Leute, die überzeugt sind — findet dort keine
Möglichkeit mehr zu handeln und müsste zurückscrollen. Das tut niemand.

**Hinweis:** Dieser Block wurde bewusst entfernt, als das Ziel „erstmal einfach
existieren" lautete. Mit dem neuen Ziel gehört er zurück.

**Fertig, wenn:** das Formular zweimal auf der Seite steht und beide Fassungen
funktionieren.

### Phase 12 — „Bald" durch einen Zeitraum ersetzen

**Ziel:** Die Statuszeile im Kopf und alle weiteren Vorkommen von „Bald im App
Store" auf eine konkrete Angabe umstellen, etwa „Herbst 2026".

**Warum:** „Bald" ist nicht zitierbar. Presse braucht eine Angabe, die in einen
Satz passt.

**Wenn der Zeitraum unklar ist:** frag danach.

### Phase 13 — Die Preisfrage beantworten

**Ziel:** In einem Satz beantworten, was die App kostet — vermutlich im Einstieg
oder direkt beim Anmeldeformular.

**Warum:** Die Frage stellt sich jeder, und auf der ganzen Seite steht nirgends
etwas dazu. Wenn die App gratis ist, ist das ein Argument und gehört hin.

### Phase 14 — Österreich nach oben holen

**Ziel:** Schularbeit, Mitarbeit und Semesterschnitt in Sichtweite der
Schlagzeile bringen, statt sie in der zweiten Hälfte des Einleitungsabsatzes zu
lassen.

**Warum:** Das ist kein Marketing-Winkel, sondern der echte
Funktionsunterschied — eine deutsche Konkurrenz-App rechnet mit „Halbjahr"
buchstäblich das Falsche aus. Der stärkste Grund für die Existenz der App steht
derzeit in einem Nebensatz, den beim Überfliegen niemand liest.

---

## Block E — Feinschliff

### Phase 15 — Eine Pressezeile im Team-Block

**Ziel:** E-Mail-Adresse und ein Logo zum Herunterladen im Team-Band ergänzen.
Zwei Zeilen, kein eigener Abschnitt.

**Warum:** Presse und Wettbewerbe wurden als Zielgruppe genannt, brauchen aber
keinen eigenen Bereich — nur einen erreichbaren Weg und zitierbare Fakten.

### Phase 16 — Über die Schulhaus-Zeile entscheiden

**Ziel:** `site.scanLine` („Aus dem Schulhaus hergekommen? Dann bist du
richtig.") behalten oder streichen. Der Schalter `showScanLine` steuert sie.

**Warum:** Die Zeile funktioniert nur, wenn es tatsächlich Plakate oder QR-Codes
in der Schule gibt. Wer über einen geteilten Link kommt, versteht sie nicht.

**Vorgehen:** Frag, ob eine Plakat-Aktion geplant ist, und entscheide danach.

### Phase 17 — Dem dunklen Band Konkurrenz geben

**Ziel:** Entweder bekommt der Handlungsaufruf eine ähnlich klare Fläche wie das
Datenschutz-Band, oder das dunkle Band wird ruhiger.

**Warum:** Solange der Datenschutz der einzige farbliche Bruch der Seite ist,
liegt die lauteste Geste auf einer Beruhigung statt auf einem Angebot. Das
Design sagt dann „wir sind sicher" lauter als „du willst das".

**Vorgehen:** Beide Wege sind vertretbar. Schlage einen vor, begründe ihn und
halte an.

### Phase 18 — Mehr Kontrast zwischen Überschrift und Text

**Ziel:** Prüfen, ob eine schmalere oder festere Überschriftenschrift neben dem
runden Nunito den Titeln mehr Gewicht gibt.

**Warum:** Baloo 2 und Nunito sind beide rund und weich, zwischen Überschrift
und Fließtext entsteht kaum Spannung. Für Schüler passt der freundliche Ton, für
eine Jury fehlt der Überschrift dadurch etwas Autorität.

**Warnung:** Der unsicherste Punkt der Liste. Baue eine Variante zum Ansehen und
entscheide erst danach. Wenn es nicht überzeugt, bleibt alles wie es ist — das
ist ein gültiges Ergebnis.

---

## Was nicht angetastet wird

- **Der Tonfall.** Nüchtern, konkret, ohne Superlative, keine Werbesprache.
  „Eine Mail zum Start. Sonst keine." bleibt genau so.
- **Die belegten Datenschutz-Aussagen** in `lib/site.ts`. Jeder der vier Punkte
  ist gegen den App-Code geprüft, die Belege stehen als Kommentar dabei. Punkt 2
  und 3 sind wortgleich mit der Datenschutz-Seite in der App und müssen es
  bleiben — App und Seite dürfen sich nicht widersprechen.
- **Der Aufbau des Team-Bands.** Bild links, Text rechts, viel Luft. Das
  Verhältnis stimmt.
- **Die mobile Reihenfolge.** Sie ist besser als die auf dem Desktop.
- **„Drei Dinge, mehr nicht."** Die Zurückhaltung ist ein Verkaufsargument.
  Keine vierte Funktion dazuschreiben.
