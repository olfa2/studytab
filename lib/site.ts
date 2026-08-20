/**
 * Alle Inhalte und Schalter der Landingpage an einer Stelle.
 * Vorlage: Design-Leinwand, Artboard 3a.
 */

export type Screen = {
  /** Kurzname des Screens — steht im Platzhalter */
  title: string;
  /** Zweizeilige Beschreibung im Platzhalter */
  caption: string;
  /**
   * Sobald der echte Screenshot da ist: Datei nach `public/screenshots/` legen
   * und hier den Pfad eintragen, z. B. "/screenshots/startseite.png".
   * Solange `null`, rendert der Platzhalter.
   */
  src: string | null;
  /** Alt-Text für den echten Screenshot */
  alt: string;
};

export const site = {
  name: "Studytab",
  logo: "/studytab-logo.jpg",

  /**
   * false = vor dem Release: Button ist inaktiv, daneben steht "Bald im App Store".
   * true  = nach dem Release: Button verlinkt auf `appStoreUrl`, daneben das App-Store-Badge.
   */
  released: false,
  appStoreUrl: "",

  /** Die Zeile "Aus dem Schulhaus hergekommen?" ein-/ausblenden (Prop `scanZeile` im Design) */
  showScanLine: true,

  /** Sekunden, bis sich die Karteikarte von selbst dreht (Prop `flipSekunden` im Design) */
  flipSeconds: 3.4,

  headline: "Du trägst die Note ein. Den Schnitt hast du schon.",
  /*
   * "Ohne Konto, auch offline" stand hier vorher und war irreführend: Beim
   * Einrichten kommt ein Konto-Schritt, der sich mit "Für jetzt überspringen"
   * umgehen lässt (AccountFlowView.swift). Freiwillig ist es, nicht abwesend.
   */
  lede: "Studytab ist die App für Noten, Mitschriften und Karteikarten — gemacht fürs österreichische Schulsystem. Funktioniert offline, das Konto ist freiwillig.",
  scanLine: "Aus dem Schulhaus hergekommen? Dann bist du richtig.",
  /* Wortgleich mit der Datenschutz-Seite in der App (DatenschutzView.swift) */
  privacy: "Kein Tracking, keine Werbung, kein Verkauf von Daten.",

  average: {
    label: "Dein Schnitt",
    value: "1,7",
    /*
     * "Semester", nicht "Halbjahr": Periode.swift stellt ausdrücklich fest,
     * dass nur Deutschland "Halbjahr" sagt — Österreich und die Schweiz
     * "Semester", unabhängig von der Oberflächensprache.
     */
    term: "1. Semester · 7 Fächer",
    note: "Neu gerechnet, sobald eine Note dazukommt.",
  },

  /**
   * Die Anmeldung für die Start-Benachrichtigung.
   * Sie steht vor dem Release anstelle des Download-Buttons.
   */
  signup: {
    label: "Sag mir Bescheid, wenn Studytab da ist",
    /** Kurzfassung für den Abschluss-Block, dort nur für Screenreader */
    labelShort: "E-Mail-Adresse",
    placeholder: "deine@adresse.at",
    button: "Sag mir Bescheid",
    pending: "Moment …",
    success: "Passt. Du bekommst eine Mail, sobald es losgeht.",
    note: "Eine Mail zum Start. Sonst keine. Abmelden mit einem Klick.",
  },

  /**
   * Der Abschluss-Block ganz unten — die zweite und letzte Gelegenheit
   * zu handeln, nachdem der Hero längst weggescrollt ist.
   */
  closing: {
    title: "Klingt nach etwas, das du brauchst?",
    text: "Trag deine Adresse ein. Wir melden uns genau einmal — wenn Studytab im App Store ist.",
  },

  /**
   * Der Datenschutz-Abschnitt.
   *
   * Jeder Satz hier ist am App-Repo geprüft. Die frühere Fassung
   * ("Ohne Konto · Auf deinem Handy · Wir wissen nicht, wer du bist")
   * war falsch: Seit August 2026 gibt es Konten mit E-Mail und Passwort
   * und automatische Cloud-Synchronisierung.
   *
   * Belege:
   * - Konto überspringbar  → Views/AccountFlowView.swift, Zeile 178
   * - Lokal ohne Konto     → Store/AppStore.swift, ueberspringeAccountEinrichtung()
   * - Server in Frankfurt  → docs/verarbeitungsverzeichnis.md, Abschnitt 7
   * - Keine Tracking-SDKs  → docs/app-store-release-notes.md
   * - Löschung nach 30 Tg. → docs/verarbeitungsverzeichnis.md, Abschnitt 8
   *
   * Punkt 2 und 3 sind wortgleich mit dem "Kurz gesagt" der Datenschutz-Seite
   * in der App (Views/DatenschutzView.swift). Bitte so lassen: App und Seite
   * dürfen sich hier nicht widersprechen.
   */
  privacySection: {
    kicker: "Datenschutz",
    title: "Deine Inhalte gehören dir.",
    lead: "Sie werden nur gespeichert, damit die App funktioniert — für nichts anderes.",
    claims: [
      {
        title: "Konto ist freiwillig",
        text: "Beim Einrichten kannst du auf »Für jetzt überspringen« tippen. Dann läuft Studytab vollständig lokal auf deinem Gerät.",
      },
      {
        title: "Server in der EU",
        text: "Mit Konto liegen deine Inhalte verschlüsselt auf Servern in Frankfurt — damit sie auf einem neuen Gerät wieder da sind.",
      },
      {
        title: "Kein Tracking",
        text: "Keine Werbung, kein Verkauf von Daten. Im ganzen Projekt steckt keine Analyse-, Absturz- oder Werbebibliothek.",
      },
      {
        title: "Jederzeit löschbar",
        text: "Du kannst dein Konto in der App löschen. Nach 30 Tagen ist alles endgültig weg.",
      },
    ],
  },

  /**
   * Wer dahintersteckt. Im Design war dieser Block reserviert und leer.
   *
   * TODO vor dem Livegang: `names`, `school` und `photo` ausfüllen —
   * `text` ist ein Entwurf, schreibt ihn mit euren eigenen Worten um.
   * Solange `photo` null ist, steht dort ein Platzhalter.
   */
  team: {
    kicker: "Wer dahintersteckt",
    title: "Ein Projekt von drei Schülern",
    text: "Wir sind drei Schüler aus Österreich und haben Studytab gebaut, weil wir selbst keine App gefunden haben, die mit Schularbeit, Mitarbeit und Halbjahresschnitt umgehen kann. Alles, was drin ist, benutzen wir jeden Tag selbst. Wenn dir etwas fehlt: schreib uns, wir lesen jede Mail.",
    names: "Vorname, Vorname und Vorname",
    school: "Schule, Ort",
    photo: null as string | null,
    photoAlt: "Die drei Schüler hinter Studytab",
    contact: { label: "Schreib uns", href: "/kontakt" },
  },

  screensSection: {
    title: "So sieht's aus",
    subtitle: "Drei Bildschirme, mehr braucht die App nicht.",
    /** Bildunterschrift, solange noch Platzhalter stehen */
    placeholderNote:
      "Platzhalter — echte Screenshots aus der App (1290 × 2796) kommen hier hinein",
  },

  features: [
    {
      number: "01",
      title: "Noten",
      text: "Trag eine Note ein und sieh sofort deinen Schnitt — pro Fach und pro Halbjahr.",
    },
    {
      number: "02",
      title: "Mitschriften",
      text: "Fotografier deine Hefteinträge ab und finde sie wieder, wenn du sie brauchst.",
    },
    {
      number: "03",
      title: "Karteikarten",
      text: "Leg dir Sets an und lern damit, wann du Zeit hast.",
    },
  ],

  flashcard: {
    frontLabel: "Geschichte · Frage",
    question: "Wann war der Wiener Kongress?",
    hint: "Tippen zum Umdrehen",
    backLabel: "Geschichte · Antwort",
    answer: "1814 / 15",
    backHint: "Gewusst? Dann kommt sie später wieder.",
  },

  footer: {
    links: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    copyright: "© 2026 Studytab",
  },
} as const;

/**
 * Die Screenshot-Slots. Reihenfolge = Reihenfolge auf der Seite.
 * Ein weiterer Screen = ein weiterer Eintrag, sonst nichts.
 */
export const screens: Screen[] = [
  {
    title: "Startseite",
    caption: "Schnitt, Suche,\nneueste Mitschriften",
    src: null,
    alt: "Studytab Startseite mit Notenschnitt und den neuesten Mitschriften",
  },
  {
    title: "Fach",
    caption: "Notenliste und\nSchnitt pro Fach",
    src: null,
    alt: "Studytab Fachansicht mit Notenliste und Schnitt für das Fach",
  },
];

/** Seitenverhältnis eines iPhone-Screenshots (6.7") */
export const SCREENSHOT_RATIO = "1290 / 2796";
export const SCREENSHOT_SIZE = { width: 1290, height: 2796 };
