# Studytab — Landingpage

Die Downloadseite aus der Design-Leinwand (Artboard 3a) als Next.js-Projekt.
Mobil ist maßgeblich, der Desktop ab 1024 px ist die Ableitung.

## Starten

```bash
npm install
npm run dev
```

Läuft dann auf http://localhost:3000.

| Befehl | was passiert |
| --- | --- |
| `npm run dev` | Entwicklungsserver mit Hot Reload |
| `npm run build` | Produktions-Build |
| `npm start` | Produktions-Build ausliefern (vorher `npm run build`) |

## Wo was steht

```
app/
  layout.tsx        Schriften (Baloo 2, Nunito), <head>, Metadaten
  page.tsx          setzt die vier Blöcke zusammen
  globals.css       das komplette Design — mobil zuerst, Desktop im Media Query
  actions.ts        Server Action für die Start-Benachrichtigung
components/
  Header.tsx        Logo und Wortmarke
  Hero.tsx          Scan-Zeile, Überschrift, Schnitt-Banner, Anmeldung, Screenshots
  DownloadCta.tsx   vor dem Release die Anmeldung, danach der Download-Button
  SignupForm.tsx    das Anmeldeformular
  Screens.tsx       der Screenshot-Streifen
  ScreenshotSlot.tsx  ein iPhone-Rahmen: echter Screenshot oder Platzhalter
  Features.tsx      die drei Punkte
  FlashCard.tsx     die drehende Karteikarte (einzige Animation)
  PrivacySection.tsx  der dunkle Datenschutz-Block
  Team.tsx          "Ein Projekt von drei Schülern"
  ClosingCta.tsx    der Abschluss-Block mit der zweiten Anmeldung
  Footer.tsx        Links und Copyright
lib/
  site.ts           alle Texte und Schalter an einer Stelle
  signups.ts        wo die Anmeldungen landen — der Austauschpunkt
  signup-state.ts   Formularzustand
public/             Logo, später die Screenshots
design/             die Design-Leinwand-Dateien (Quelle, nicht Teil des Builds)
```

Sämtliche Texte stehen in `lib/site.ts`. Es gibt keinen Text, der nur im JSX steht.

## Echte Screenshots einsetzen

Die Handy-Screenshots sind noch Platzhalter — gestrichelter Rahmen, im echten
Format 1290 × 2796 (iPhone 6,7"), damit später nichts verrutscht.

1. Screenshot als PNG nach `public/screenshots/` legen, z. B. `startseite.png`.
2. In `lib/site.ts` beim passenden Eintrag `src` setzen:

```ts
export const screens: Screen[] = [
  {
    title: "Startseite",
    caption: "Schnitt, Suche,\nneueste Mitschriften",
    src: "/screenshots/startseite.png", // war null
    alt: "Studytab Startseite mit Notenschnitt und den neuesten Mitschriften",
  },
  // ...
];
```

Sobald bei allen Einträgen ein `src` steht, verschwindet die Zeile
„Platzhalter — echte Screenshots …" unter dem Streifen von selbst.

Ein weiterer Screen ist ein weiterer Eintrag im Array — mobil scrollt der
Streifen seitlich, auf dem Desktop stehen die Rahmen nebeneinander.

## Die Schalter in `lib/site.ts`

| Schalter | Wirkung |
| --- | --- |
| `released: false` | im Hero steht die Anmeldung für die Start-Benachrichtigung |
| `released: true` | stattdessen der Download-Button auf `appStoreUrl` + Badge-Platzhalter |
| `appStoreUrl` | Ziel des Buttons nach dem Release |
| `showScanLine` | die Zeile „Aus dem Schulhaus hergekommen?" ein-/ausblenden |
| `flipSeconds` | Sekunden, bis sich die Karteikarte von selbst dreht |

## Die Anmeldungen — wichtig vor dem Livegang

`lib/signups.ts` schreibt jede Adresse als eine Zeile JSON nach
`.data/signups.jsonl`. Das läuft lokal sofort und ohne Konto irgendwo,
**funktioniert aber auf Vercel oder Netlify nicht** — dort ist das
Dateisystem schreibgeschützt. Vor dem Deploy den Rumpf von `saveSignup()`
durch einen echten Speicher ersetzen (Resend, Supabase, Airtable, Google
Sheet — was ihr ohnehin nutzt). Der Rest der Seite bleibt unverändert.

`.data/` steht in `.gitignore`. Bitte so lassen: da liegen E-Mail-Adressen.

Gegen Bots steht ein unsichtbares Honigtopf-Feld im Formular. Eine
Ratenbegrenzung gibt es noch nicht — die kommt sinnvollerweise dort dazu,
wo auch der echte Speicher hinkommt.

## Wahrheitsgehalt — am App-Repo geprüft

Alle Aussagen auf der Seite sind gegen `../schoolorganisationtool`
abgeglichen. Wer hier Text ändert, prüft ihn bitte genauso.

**Korrigiert, weil falsch:**

| stand da | stimmt nicht, weil | steht jetzt da |
| --- | --- | --- |
| „Ohne Konto, auch offline" | Konten gibt es seit 08/2026; der Konto-Schritt lässt sich überspringen, aber er existiert | „Funktioniert offline, das Konto ist freiwillig" |
| „Deine Noten … liegen nicht auf einem Server" | mit Konto synchronisiert die App automatisch zu Supabase | „Mit Konto liegen deine Inhalte verschlüsselt auf Servern in Frankfurt" |
| „Auch uns nicht" (Datenschutz-Titel) | mit Konto liegen die Inhalte bei uns, nur eben zugriffsgeschützt | „Deine Inhalte gehören dir." |
| „keine Weitergabe deiner Daten" | Supabase ist Auftragsverarbeiter | „kein Verkauf von Daten" (Wortlaut der App) |
| „1. Halbjahr" | `Periode.swift`: nur Deutschland sagt Halbjahr, Österreich sagt Semester | „1. Semester" |

**Geprüft und bestätigt:** offline nutzbar · Konto überspringbar · keine
Analyse-, Absturz- oder Werbebibliothek im Projekt · Server in Frankfurt ·
Kontolöschung mit 30 Tagen Frist · Notentypen SA / MA / Test.

**Quellen:** `docs/app-store-release-notes.md`,
`docs/verarbeitungsverzeichnis.md`, `ios/Studyo/Views/DatenschutzView.swift`,
`ios/Studyo/Views/AccountFlowView.swift`, `ios/Studyo/Store/AppStore.swift`,
`ios/Studyo/Models/Periode.swift`.

### Offen — braucht eine Entscheidung

**Der Name.** Das App-Repo kennt ausschließlich **Studyo**: README, Bundle,
Datenschutztext, jede Swift-Datei. Diese Seite heißt durchgehend
**Studytab**. Im Design-Projekt liegen beide Logos. Eines von beidem ist
falsch — solange das nicht geklärt ist, widersprechen sich App und Seite
für jede Person, die beides sieht.

**`site.team`** — `names`, `school` und `photo` sind Platzhalter, `text` ist
ein Entwurf.

**Fünf Notensysteme.** Die App kann AT, DE, CH, US und UK und spricht
Deutsch und Englisch. Die Seite positioniert nur Österreich. Als Fokus
vertretbar, aber es ist eine Entscheidung, keine Beschreibung.

**Nicht erwähnte Funktionen:** Planer, Suche, Lern-Streak und Lernziel,
Notenrechner, Scan-Ansicht. Die Seite zeigt drei von acht.

**Konto ab 14** ohne Zustimmung der Erziehungsberechtigten
(§ 4 Abs. 4 DSG, siehe Verarbeitungsverzeichnis). Steht nirgends auf der
Seite.

## Noch offen

- **App-Store-Badge**: im Zustand `released: true` steht dort ein Platzhalter.
  Das offizielle Badge kommt von Apple und muss in der vorgeschriebenen
  Fassung eingesetzt werden.
- **Logo**: `public/studytab-logo.jpg` ist das App-Icon (1254 × 1254) aus dem
  Design-Projekt. Die dortige `studytab-logo.png` ließ sich nicht vollständig
  abrufen — wenn du die Originaldatei hast, einfach ersetzen und in
  `lib/site.ts` den Pfad anpassen.
- **Impressum, Datenschutz, Kontakt** verlinken auf `/impressum`,
  `/datenschutz`, `/kontakt`. Diese Seiten gibt es noch nicht.
- Im Footer ist der Block „Ein Projekt von drei Schülern" wie im Design
  bewusst leer gelassen (`.footer__reserved`).
