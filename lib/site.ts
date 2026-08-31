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
   * TODO vor dem Livegang: `photo` ausfüllen — `text` ist ein Entwurf,
   * schreibt ihn mit euren eigenen Worten um.
   * Solange `photo` null ist, steht dort ein Platzhalter.
   */
  team: {
    kicker: "Wer dahintersteckt",
    title: "Ein Projekt von drei Schülern",
    text: "Wir sind drei Schüler aus Österreich und haben Studytab gebaut, weil wir selbst keine App gefunden haben, die mit Schularbeit, Mitarbeit und Halbjahresschnitt umgehen kann. Alles, was drin ist, benutzen wir jeden Tag selbst. Wenn dir etwas fehlt: schreib uns, wir lesen jede Mail.",
    names: "Oliver, Jonathan und Anton",
    school: "HTL Spengergasse, Wien",
    photo: null as string | null,
    photoAlt: "Die drei Schüler hinter Studytab",
    contact: { label: "Schreib uns", href: "/kontakt" },
  },

  screensSection: {
    kicker: "Die App",
    title: "So sieht's aus",
    /*
     * Hier stand "Drei Bildschirme, mehr braucht die App nicht." — `screens`
     * unten hat aber zwei Einträge. Auf einer Seite, die mit Ehrlichkeit
     * wirbt, darf keine nachzählbare Angabe falsch sein. Jetzt ohne Zahl,
     * dann stimmt der Satz unabhängig davon, wie viele Slots gefüllt sind.
     */
    subtitle: "Ein Blick hinein, bevor du sie installierst.",
    /** Bildunterschrift, solange noch Platzhalter stehen */
    placeholderNote:
      "Platzhalter — echte Screenshots aus der App (1290 × 2796) kommen hier hinein",
  },

  /**
   * Der Rahmen um die drei Funktionen. Der Abschnitt hatte bisher keinen
   * eigenen Kopf — die drei Punkte standen ohne Überschrift im Raum.
   */
  featuresSection: {
    kicker: "Was drin ist",
    title: "Drei Dinge, mehr nicht.",
    lead: "Noten, Mitschriften und Karteikarten — zugeschnitten auf das, was in Österreich zählt: Schularbeit, Mitarbeit, Semesterschnitt.",
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

/* ==========================================================================
   Impressum und Datenschutzerklärung

   Beides ist ein GERÜST, kein fertiger Rechtstext. Die Gliederung steht,
   die Angaben fehlen. Sie müssen von Oliver, Jonathan und Anton kommen:
   erfundene Betreiberdaten oder abgeschriebene Textbausteine wären
   schlechter als eine fehlende Seite — vor allem auf einer Seite, die
   mit Ehrlichkeit wirbt.

   `note`  erklärt, was in den Abschnitt gehört und warum.
   `facts` sind Sätze, die schon feststehen, weil sie am Code geprüft sind.
   `todo`  sind die Lücken. Solange irgendwo ein `todo` steht, zeigt die
           Seite oben einen Warnkasten und markiert jede offene Stelle.
   ========================================================================== */

export type LegalSection = {
  heading: string;
  /** Wozu der Abschnitt da ist. Hilfstext, kein Rechtstext. */
  note: string;
  /** Was schon feststeht — am Projekt nachgeprüft, nicht behauptet. */
  facts?: string[];
  /** Die offenen Stellen. Leeres Array = dieser Abschnitt ist fertig. */
  todo: string[];
};

export type LegalDoc = {
  kicker: string;
  title: string;
  lead: string;
  /** Der Warnkasten oben. Verschwindet von selbst, sobald kein `todo` mehr offen ist. */
  notice: { title: string; text: string };
  sections: LegalSection[];
  backLabel: string;
};

export const legal: {
  todoLabel: string;
  impressum: LegalDoc;
  datenschutz: LegalDoc;
} = {
  todoLabel: "Von euch auszufüllen",

  impressum: {
    kicker: "Pflichtangaben",
    title: "Impressum",
    lead: "Angaben nach § 5 E-Commerce-Gesetz und § 25 Mediengesetz.",
    notice: {
      title: "Dieses Impressum gilt noch nicht.",
      text: "Es ist ein Gerüst: Die Abschnitte stehen, die Angaben fehlen. Jede markierte Stelle muss ausgefüllt werden. Solange hier etwas offen ist, sollte die Seite nicht öffentlich verlinkt werden.",
    },
    backLabel: "Zurück zur Startseite",
    sections: [
      {
        heading: "Medieninhaber und Diensteanbieter",
        note: "Wer die Seite betreibt, mit einer Anschrift, an die man tatsächlich zustellen kann. Ein Postfach genügt dafür nicht.",
        todo: [
          "Vollständige Namen aller drei — im Impressum reichen Vornamen nicht.",
          "Anschrift mit Straße, Hausnummer, Postleitzahl und Ort. Wenn es keine andere gibt, ist das eine Privatadresse. Das ist der unangenehme Teil, und genau deshalb steht der nächste Abschnitt hier.",
        ],
      },
      {
        heading: "Wer haftet, wenn ihr noch nicht volljährig seid",
        note: "Keine Formalität, sondern die Frage, die vor dem Livegang zuerst geklärt gehört: Ein Impressum braucht jemanden, der rechtlich einsteht. Bei Minderjährigen sind das üblicherweise die Erziehungsberechtigten, die dann mit Namen und Anschrift als Medieninhaber dastehen.",
        todo: [
          "Klären, ob alle drei volljährig sind.",
          "Falls nicht: mit den Erziehungsberechtigten sprechen — oder mit der HTL Spengergasse, ob die Schule das Projekt trägt. Bei Schulprojekten ist das der übliche Weg und erspart euch die Privatadresse im Netz.",
        ],
      },
      {
        heading: "Kontakt",
        note: "§ 5 ECG verlangt eine E-Mail-Adresse, unter der ihr wirklich erreichbar seid. Für Presse ist sie ohnehin die wichtigste Angabe auf dieser Seite.",
        todo: [
          "Die E-Mail-Adresse eintragen. Sie fehlt im ganzen Projekt noch — auch »Schreib uns« im Team-Block und »Kontakt« in der Fußzeile zeigen derzeit ins Leere.",
        ],
      },
      {
        heading: "Worum es auf dieser Seite geht",
        note: "Ein Satz zum Gegenstand der Website. Der folgende ist aus dem Seiteninhalt abgeleitet, nicht erfunden — prüft ihn und übernehmt oder ersetzt ihn.",
        facts: [
          "Diese Website informiert über Studytab, eine iOS-App für Noten, Mitschriften und Karteikarten, und nimmt vor dem Start E-Mail-Adressen für eine einmalige Benachrichtigung entgegen.",
        ],
        todo: ["Satz bestätigen oder umschreiben."],
      },
      {
        heading: "Unternehmerische Angaben",
        note: "Firmenbuchnummer, UID, Gewerbeberechtigung, Kammer und Aufsichtsbehörde verlangt § 5 ECG nur von Unternehmen. Ob ein Schulprojekt ohne Einnahmen darunterfällt, entscheidet man nicht nach Gefühl.",
        todo: [
          "Spätestens klären, sobald die App etwas kostet oder ihr auf anderem Weg Geld einnehmt.",
          "Solange sie gratis ist und nichts verkauft wird, ist die Frage vermutlich gegenstandslos — lasst euch das aber bestätigen, etwa von einer Lehrkraft für Recht oder der Wirtschaftskammer.",
        ],
      },
      {
        heading: "Blattlinie (§ 25 Mediengesetz)",
        note: "Eine Zeile zur grundlegenden Richtung der Seite: worüber sie informiert und für wen.",
        todo: ["Einen Satz schreiben."],
      },
      {
        heading: "Haftung und Urheberrecht",
        note: "Hier stehen auf vielen Seiten abgeschriebene Textbausteine. Übernehmt keine: Entweder ihr versteht, was dort steht, oder es steht besser gar nicht da. Pflicht ist dieser Abschnitt nicht.",
        todo: [
          "Entscheiden, ob ihr ihn überhaupt wollt — und wenn ja, selbst formulieren.",
        ],
      },
    ],
  },

  datenschutz: {
    kicker: "Pflichtangaben",
    title: "Datenschutzerklärung",
    lead: "Was mit deiner E-Mail-Adresse passiert, wenn du dich für die Start-Benachrichtigung anmeldest.",
    notice: {
      title: "Auch das hier ist noch ein Gerüst.",
      text: "Die Gliederung folgt Art. 13 DSGVO, die Angaben müssen von den drei Betreibern kommen. Erfundene Sätze wären hier besonders heikel: Eine Datenschutzerklärung, die etwas anderes behauptet als der Code tut, ist schlechter als gar keine.",
    },
    backLabel: "Zurück zur Startseite",
    sections: [
      {
        heading: "Diese Seite und die App sind zweierlei",
        note: "Damit nichts durcheinandergerät: Auf dieser Website wird genau eine Sache erhoben, nämlich die E-Mail-Adresse für die Start-Benachrichtigung. Was die App mit Noten, Mitschriften und Karteikarten macht, steht in der Datenschutz-Seite der App und gehört hier höchstens als Verweis hin.",
        todo: [
          "Entscheiden, ob die Datenschutz-Seite aus der App hier verlinkt oder wiederholt wird. Widersprechen dürfen sich die beiden nicht.",
        ],
      },
      {
        heading: "Verantwortlicher",
        note: "Art. 13 Abs. 1 lit. a: wer über diese Daten entscheidet — Name, Anschrift, E-Mail-Adresse. Dieselben Angaben wie im Impressum.",
        todo: ["Übernehmen, sobald das Impressum steht."],
      },
      {
        heading: "Welche Daten erhoben werden",
        note: "Beide Sätze sind am Code nachgeprüft: app/actions.ts und lib/signups.ts.",
        facts: [
          "Genau ein Feld: die E-Mail-Adresse aus dem Anmeldeformular, dazu der Zeitpunkt der Anmeldung.",
          "Das Formular hat ein zweites, unsichtbares Feld, das Bots abfängt. Wird es ausgefüllt, wird nichts gespeichert.",
        ],
        todo: ["Gegenprüfen, sobald sich am Formular etwas ändert."],
      },
      {
        heading: "Zweck und Rechtsgrundlage",
        note: "Art. 13 Abs. 1 lit. c. Zweck ist die einmalige Nachricht zum Start; als Rechtsgrundlage kommt die Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO in Betracht. Das ist der rechtlich heikelste Punkt der Seite — er gehört bestätigt, nicht abgeschrieben.",
        todo: [
          "Die Formulierung von jemandem prüfen lassen, der sich damit auskennt.",
          "Unter dem Anmeldefeld steht »Abmelden mit einem Klick.« — einen Abmeldeweg gibt es aber noch nicht. Entweder ihr baut ihn, oder der Satz muss weg. Ungedeckt darf er nicht stehen bleiben.",
        ],
      },
      {
        heading: "Wie lange gespeichert wird",
        note: "Art. 13 Abs. 2 lit. a verlangt eine Frist oder wenigstens ein Kriterium, nach dem sich die Frist bestimmt.",
        todo: [
          "Frist festlegen. Naheliegend: bis zur Start-Mail, danach löschen.",
          "Festlegen, was passiert, wenn die App doch nicht erscheint.",
        ],
      },
      {
        heading: "Wo die Adressen liegen",
        note: "Das ändert sich, sobald ein Hoster oder ein Mailversand dazukommt — lib/signups.ts ist im Code ausdrücklich als Austauschpunkt markiert. Ab dann braucht es hier den Namen des Dienstes und einen Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.",
        facts: [
          "Stand heute schreibt die Seite jede Adresse in eine Datei auf dem Server, auf dem sie läuft. Ein Dienstleister ist nicht beteiligt.",
        ],
        todo: [
          "Eintragen, sobald feststeht, wo die Seite läuft und womit die Mails verschickt werden.",
          "Die Server-Logs des Hosters prüfen: IP-Adressen werden dort fast immer gespeichert, und dann gehören sie hier hinein.",
        ],
      },
      {
        heading: "Deine Rechte",
        note: "Art. 13 Abs. 2 lit. b bis d: Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch und der jederzeitige Widerruf der Einwilligung — dazu das Recht, sich bei der Aufsichtsbehörde zu beschweren.",
        todo: [
          "Ausformulieren und angeben, an welche Adresse man sich dafür wendet.",
          "Die Österreichische Datenschutzbehörde als Beschwerdestelle nennen. Anschrift auf dsb.gv.at nachschlagen, nicht aus dem Gedächtnis eintragen.",
        ],
      },
      {
        heading: "Kein Tracking, keine Cookies",
        note: "Keine Behauptung, sondern nachzählbar: Das Projekt hängt an drei Paketen — next, react und react-dom. Ein Analyse- oder Werbewerkzeug ist nirgends eingebunden.",
        facts: [
          "Die Seite setzt keine Analyse- oder Werbe-Cookies und lädt keine Tracking-Bibliothek.",
        ],
        todo: [
          "Gilt genau so lange, bis jemand ein Analyse-Werkzeug einbaut. Dann muss dieser Abschnitt als Erstes geändert werden.",
        ],
      },
    ],
  },
};
