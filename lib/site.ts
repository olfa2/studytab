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
   * Der Dateiname, unter dem das Bild erwartet wird. Steht im Platzhalter,
   * damit beim Fotografieren niemand raten muss, wie die Datei heißen soll.
   */
  file: string;
  /**
   * Sobald der echte Screenshot da ist: Datei nach `public/screenshots/`
   * legen und hier den Pfad eintragen — also `"/screenshots/" + file`.
   * Solange `null`, rendert der Platzhalter.
   */
  src: string | null;
  /** Alt-Text für den echten Screenshot */
  alt: string;
};

/** Eine der vier Funktions-Sektionen. */
export type FeatureSection = {
  /** Anker und React-Key */
  id: string;
  kicker: string;
  title: string;
  lead: string;
  /**
   * Auf welcher Seite die Bilder im Desktop stehen. Wechselt abwärts ab,
   * sonst rutscht die ganze Seite optisch nach einer Seite.
   */
  media: "left" | "right";
  /**
   * Wie die Bilder liegen. Jede Sektion bekommt eine eigene Anordnung —
   * vier gleich aufgereihte Telefonreihen untereinander sehen aus wie eine
   * Vorlage, nicht wie eine gebaute Seite.
   *
   * `gestaffelt`   nebeneinander, das zweite tiefer gesetzt
   * `gegenueber`   zwei, leicht zueinander gekippt, Lücke für den Pfeil
   * `handkarten`   überlappend aufgefächert, wie Karten in der Hand
   * `haupt-neben`  eines groß, das zweite kleiner und versetzt davor
   */
  layout: "gestaffelt" | "gegenueber" | "handkarten" | "haupt-neben";
  shots: Screen[];
};

export const site = {
  name: "Studytab",
  logo: "/studytab-logo.jpg",

  /**
   * Die öffentliche Adresse der Seite. Steht hier an genau einer Stelle,
   * weil `metadataBase` in app/layout.tsx daraus jede absolute URL baut —
   * auch die des Vorschaubilds für geteilte Links.
   *
   * Hier stand `https://studytab.at`. Die Domain ist nicht registriert, und
   * eine Adresse, die es nicht gibt, liefert kein Bild: Jeder geteilte Link
   * hätte in WhatsApp, Discord oder einer Presse-Mail einen leeren Platz
   * gezeigt. Solange die echte Domain fehlt, muss hier die Adresse stehen,
   * unter der die Seite tatsächlich erreichbar ist.
   *
   * SOBALD studytab.at läuft: diese eine Zeile umstellen, sonst nichts.
   */
  url: "https://studytab-real.vercel.app",

  /**
   * Der Seitentitel. Steht im Tab, in der Suche und im Vorschaubild.
   *
   * Nicht die Schlagzeile: In der Suche zählen die Wörter, nach denen
   * jemand sucht, und niemand sucht nach „ganze Schule". Deshalb hier die
   * Funktionen und das Land — knapp unter 60 Zeichen, sonst schneidet
   * Google ab.
   */
  metaTitle: "Studytab — Noten, Mitschriften und Lernzeit für Österreich",

  /**
   * Die Release-Angabe. Sie steht im Kopf und im Vorschaubild — deshalb
   * hier an einer Stelle statt zweimal im JSX. Phase 12 ersetzt „Bald"
   * durch einen Zeitraum und muss dafür nur diesen Wert anfassen.
   */
  release: {
    pending: "Bald im App Store",
    link: "Im App Store",
  },

  /**
   * Das Vorschaubild für geteilte Links (1200 × 630), gezeichnet in
   * app/opengraph-image.tsx. Schlagzeile und Name kommen von oben,
   * hier steht nur, was sonst nirgends vorkommt.
   */
  og: {
    alt: "Studytab — die App für Noten, Mitschriften, Karteikarten und Lernzeit, gemacht fürs österreichische Schulsystem",
    features: "Noten · Mitschriften · Karteikarten · Lernzeit",
  },

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

  /*
   * Die Schlagzeile verspricht das Ganze, nicht eine Funktion — das ist die
   * Entscheidung hinter dem Umbau. Kurz genug, dass sie nach einmal Lesen
   * hängenbleibt, und kurz genug fürs Vorschaubild beim Teilen.
   *
   * Der frühere Satz "Du trägst die Note ein. Den Schnitt hast du schon."
   * ist nicht verloren: Er steht jetzt über der Noten-Sektion, also genau
   * dort, wo er wörtlich zutrifft.
   */
  headline: "Deine ganze Schule. Auf einem Bildschirm.",
  /*
   * Ein breites Versprechen muss im selben Atemzug belegt werden, sonst ist
   * es schwächer als ein konkretes. Der Beleg ist der einzige echte
   * Funktionsunterschied und steht deshalb im ersten Satz statt im
   * Nebensatz: Periode.swift hält fest, dass nur Deutschland "Halbjahr"
   * sagt — Österreich und die Schweiz "Semester". Eine deutsche App
   * rechnet einem Österreicher buchstäblich das Falsche aus.
   *
   * "Ohne Konto, auch offline" stand hier früher und war irreführend: Beim
   * Einrichten kommt ein Konto-Schritt, der sich mit "Für jetzt
   * überspringen" umgehen lässt (AccountFlowView.swift). Freiwillig ist es,
   * nicht abwesend — und es steht jetzt im Datenschutz-Band, wo es hingehört.
   */
  lede: "Noten, Mitschriften, Karteikarten und deine Lernzeit — alles in einer App. Und gerechnet wird mit Semester, so wie es in Österreich zählt.",
  scanLine: "Aus dem Schulhaus hergekommen? Dann bist du richtig.",

  /**
   * Die drei Zusicherungen unter dem Anmeldeformular.
   *
   * Sie stehen als Reihe und nicht als einzelne Zeilen: „Studytab ist
   * gratis." allein stand vorher direkt über der Feldbeschriftung, und
   * zwei fast gleich starke Zeilen übereinander heben sich gegenseitig
   * auf — keine gewinnt. In einer Dreierreihe trägt jede ihren Teil.
   *
   * Alle drei sind belegt:
   * - Gratis        → Entscheidung des Teams, Stand 1. September 2026
   * - Auch offline  → Store/AppStore.swift: ohne Konto vollständig lokal
   * - Kein Tracking → Package.resolved: keine Analyse- oder Werbe-Pakete
   *
   * „Gratis" bewusst ohne „für immer" oder „keine In-App-Käufe": Später
   * sollen einzelne Zusatzfunktionen im Abo dazukommen. Das Wort bleibt
   * dann wahr — man lädt die App gratis und benutzt sie gratis. Ein
   * Versprechen auf ewig müsste man zurücknehmen.
   */
  zusicherungen: ["Gratis", "Auch offline", "Kein Tracking"],

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
    /*
     * Unter dem Feld stand eine graue Zeile ("Eine Mail zum Start. Sonst
     * keine. Der Abmeldelink steht darin."). Sie ist entfallen, weil die
     * Zusicherungs-Reihe darunter denselben Platz besser nutzt.
     *
     * Was damit weg ist: der Hinweis, WOFÜR die Adresse verwendet wird.
     * Die Feldbeschriftung sagt es zwar sinngemäß ("Sag mir Bescheid,
     * wenn Studytab da ist"), und die Datenschutzerklärung steht in der
     * Fußzeile — aber wer das wieder ausdrücklich hinschreiben will,
     * ergänzt hier `note` und in SignupForm.tsx die Zeile dazu.
     */
  },

  /**
   * Die Abmeldeseite hinter dem Link aus der Start-Mail.
   *
   * Sie fragt einmal nach, statt beim Aufrufen sofort zu löschen: Das
   * Löschen ist endgültig, und Mailprogramme rufen Links im Hintergrund
   * auf, um Vorschauen zu bauen. Ohne Nachfrage hätte so ein Abruf Leute
   * abgemeldet, die nie geklickt haben.
   */
  abmelden: {
    kicker: "Abmelden",
    title: "Willst du dich abmelden?",
    lead: "Dann löschen wir deine Adresse aus der Liste. Du bekommst keine Nachricht mehr von uns — auch nicht die zum Start.",
    button: "Ja, abmelden",
    pending: "Moment …",
    fertigTitle: "Erledigt.",
    fertigText: "Deine Adresse ist gelöscht. Wenn du es dir anders überlegst, kannst du dich jederzeit wieder eintragen.",
    fehlerTitle: "Das hat nicht geklappt.",
    fehlerText: "Probier es später noch einmal, oder schreib uns — dann machen wir es von Hand.",
    /** Für einen Link, der nicht nach einem Schlüssel aussieht */
    ungueltigTitle: "Dieser Link stimmt nicht.",
    ungueltigText: "Vielleicht wurde er beim Kopieren abgeschnitten. Nimm den vollständigen Link aus der Mail.",
    zurueck: "Zur Startseite",
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
    /*
     * "Halbjahresschnitt" stand hier und widersprach dem, womit die Seite
     * wirbt: Österreich rechnet mit Semester, und genau das ist unser
     * Argument. Ein Widerspruch ausgerechnet im Team-Block, den Presse und
     * Jurys am genauesten lesen, wäre der teuerste auf der ganzen Seite.
     */
    text: "Wir sind drei Schüler aus Österreich und haben Studytab gebaut, weil wir selbst keine App gefunden haben, die mit Schularbeit, Mitarbeit und Semesterschnitt umgehen kann. Alles, was drin ist, benutzen wir jeden Tag selbst. Wenn dir etwas fehlt: schreib uns, wir lesen jede Mail.",
    names: "Oliver, Jonathan und Anton",
    school: "HTL Spengergasse, Wien",
    photo: null as string | null,
    photoAlt: "Die drei Schüler hinter Studytab",
    contact: { label: "Schreib uns", href: "/kontakt" },
  },

  /** Steht unter jedem Bildplatz, solange noch kein echtes Bild da ist. */
  placeholderNote:
    "Platzhalter — hier kommen die echten Screenshots aus der App hinein (1290 × 2796)",

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
 * Das Bild im Einstieg. Steht allein, weil es nicht zu einer Funktion
 * gehört, sondern die ganze App zeigt.
 */
export const heroShot: Screen = {
  title: "Startseite",
  caption: "Schnitt, Suche,\nneueste Mitschriften",
  file: "start.png",
  src: null,
  alt: "Die Startseite von Studytab mit Notenschnitt, Suche und den neuesten Mitschriften",
};

/**
 * Die vier Funktions-Sektionen. Reihenfolge = Reihenfolge auf der Seite.
 *
 * Elf Bildplätze insgesamt (mit `heroShot` oben). Alle stehen auf
 * `src: null` und rendern deshalb den Platzhalter — mit dem erwarteten
 * Dateinamen darin, damit beim Fotografieren niemand raten muss.
 *
 * Sobald ein Bild da ist: Datei nach `public/screenshots/` legen und
 * `src` auf `"/screenshots/" + file` setzen. Sonst ändert sich nichts,
 * der Rahmen und die Maße bleiben.
 *
 * Die Texte sind auf die Schlagzeile hin überarbeitet: Die vier Sektionen
 * lösen "Deine ganze Schule" der Reihe nach ein, statt es zu wiederholen.
 * Der Ton darf werben — behaupten darf er nichts, was die App nicht kann.
 * Wo eine Formulierung an einer Datei der App hängt, steht sie im Kommentar
 * darüber. Wer hier etwas umschreibt, prüft die Datei mit.
 */
export const featureSections: FeatureSection[] = [
  {
    id: "faecher",
    kicker: "Deine Fächer",
    /*
     * Der Titel hieß "Alles, was du hast — an einem Ort." — und war damit
     * die Schlagzeile ein zweites Mal, drei Bildschirmhöhen später. Wer
     * "Deine ganze Schule. Auf einem Bildschirm." gelesen hat, weiß das
     * schon; die erste Sektion muss das Versprechen einlösen, nicht
     * bestätigen. Sie zeigt jetzt, WORAN alles hängt: am Fach.
     */
    title: "Ein Fach. Und alles, was dazugehört.",
    lead: "Leg deine Fächer einmal an — danach hat jedes seinen eigenen Schnitt, seine eigenen Mitschriften, seine eigenen Karteikarten. Du tippst auf Mathe und hast alles, was Mathe ist.",
    media: "right",
    layout: "gestaffelt",
    shots: [
      {
        title: "Fächerliste",
        caption: "Alle Fächer,\njedes mit Schnitt",
        file: "faecher-liste.png",
        src: null,
        alt: "Die Fächerliste in Studytab, jedes Fach mit seinem Notenschnitt",
      },
      {
        title: "Fach anlegen",
        caption: "Name, Farbe,\nfertig",
        file: "fach-anlegen.png",
        src: null,
        alt: "Ein neues Fach wird in Studytab angelegt",
      },
    ],
  },
  {
    id: "mitschriften",
    kicker: "Mitschriften",
    title: "Abfotografiert. Eingeordnet. Wiedergefunden.",
    lead: "Heft aufschlagen, Foto machen, Fach auswählen. Mehr ist es nicht. Und am Abend vor der Schularbeit suchst du nicht erst, wo die Stunde von letzter Woche geblieben ist.",
    media: "left",
    layout: "gegenueber",
    shots: [
      {
        title: "Aufnehmen",
        caption: "Seite abfotografieren\noder Foto auswählen",
        file: "scannen.png",
        src: null,
        alt: "Eine Heftseite wird in Studytab aufgenommen",
      },
      {
        title: "Einordnen",
        caption: "Benennen und\neinem Fach zuweisen",
        file: "fach-zuweisen.png",
        src: null,
        alt: "Eine aufgenommene Mitschrift wird in Studytab einem Fach zugewiesen",
      },
    ],
  },
  {
    id: "lernen",
    kicker: "Lernen",
    title: "Dranbleiben, auch wenn's zäh wird.",
    /*
     * "Unterbrechungen mitgezählt" statt "Handy gesperrt": FokusView.swift
     * hält fest, dass keine iOS-App das Telefon sperren darf. Sie hält den
     * Bildschirm wach und zählt, wie oft man rausgeht — und genau das ist
     * das Verkaufsargument, weil es ehrlich ist.
     *
     * "wie viele Tage du schon dabei bist" statt "gelernt hast": Die Streak
     * zählt laut StreakView.swift die Tage, an denen die App offen war.
     *
     * Die Karteikarten stehen jetzt im ersten Satz. Vorher sprach der Lead
     * nur von Zeit — daneben lag aber ein Screenshot des Lernmodus, den
     * kein Wort erklärt hat. Vier Bilder, drei erklärt: Das fällt genau
     * dem auf, der genau hinschaut.
     */
    lead: "Karteikarten für den Stoff, Sessions für die Zeit. Studytab sperrt dein Handy nicht — das darf keine App auf dem iPhone. Es zählt stattdessen mit, wie oft du rausgehst, und zeigt dir danach schwarz auf weiß, wie lange du wirklich am Stück gearbeitet hast — und wie viele Tage du schon dabei bist.",
    media: "right",
    layout: "handkarten",
    shots: [
      {
        title: "Fokus",
        caption: "Laufende Session,\nUnterbrechungen gezählt",
        file: "fokus.png",
        src: null,
        alt: "Eine laufende Lernsession in Studytab mit gezählten Unterbrechungen",
      },
      {
        title: "Track",
        caption: "Wochenbalken und\nVerlauf",
        file: "track.png",
        src: null,
        alt: "Der Track-Tab in Studytab mit Wochenbalken der Lernzeit",
      },
      {
        title: "Karteikarten",
        caption: "Sets anlegen\nund lernen",
        file: "lernen.png",
        src: null,
        alt: "Der Karteikarten-Lernmodus in Studytab",
      },
      {
        title: "Streak",
        caption: "Serie, Bestwert\nund Kalender",
        file: "streak.png",
        src: null,
        alt: "Die Streak-Übersicht in Studytab mit laufender Serie und Kalender",
      },
    ],
  },
  {
    id: "noten",
    kicker: "Noten",
    title: "Du trägst die Note ein. Den Schnitt hast du schon.",
    /*
     * Der stärkste Satz der Seite und der einzige echte Funktions-
     * unterschied: Periode.swift stellt ausdrücklich fest, dass nur
     * Deutschland "Halbjahr" sagt — Österreich und die Schweiz "Semester".
     * Eine deutsche App rechnet einem Österreicher das Falsche aus.
     *
     * Der Lead stand vorher fast wörtlich schon oben im Einstieg ("gerechnet
     * wird mit Semester, so wie es in Österreich zählt"). Ein Argument, das
     * man zweimal im selben Wortlaut liest, klingt beim zweiten Mal nach
     * Füllsel statt nach Beweis. Oben steht die Behauptung, hier die
     * Rechnung dahinter.
     */
    lead: "Jede Note mit ihrer Gewichtung — eine Schularbeit zählt anders als eine Mitarbeitsnote, und der Schnitt rechnet sich sofort neu. Und zwar pro Semester, so wie dein Zeugnis es tut. Nicht pro Halbjahr, wie die Apps von nebenan.",
    media: "left",
    layout: "haupt-neben",
    shots: [
      {
        title: "Noten im Fach",
        caption: "Notenliste und\nSchnitt pro Semester",
        file: "fach-noten.png",
        src: null,
        alt: "Die Notenliste eines Fachs in Studytab mit dem Schnitt für das Semester",
      },
      {
        title: "Note eintragen",
        caption: "Schularbeit oder\nMitarbeit, gewichtet",
        file: "note-eintragen.png",
        src: null,
        alt: "Eine neue Note wird in Studytab eingetragen",
      },
    ],
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
  /** Beschriftete Angaben. Werte in ‹ › sind noch Platzhalter. */
  angaben?: { label: string; wert: string }[];
  /** Die offenen Stellen. Leeres Array = dieser Abschnitt ist fertig. */
  todo: string[];
};

/**
 * Die Betreiberangaben — einmal hier, verwendet von Impressum UND
 * Datenschutzerklärung. Zwei Kopien laufen früher oder später auseinander,
 * und dann steht in einem der beiden Rechtstexte eine veraltete Adresse.
 * Genau so löst es die App auch (`enum Betreiber` in ImpressumView.swift),
 * und die ‹ ›-Schreibweise für offene Stellen ist von dort übernommen.
 *
 * Medieninhaber ist Jonathan: Von den dreien ist er der Einzige, der
 * volljährig ist und damit allein haften kann.
 */
export const betreiber = {
  name: "‹Jonathans vollständiger Vor- und Nachname›",
  adresse: "‹Straße Hausnummer, PLZ Ort, Österreich›",
  email: "‹Kontakt-E-Mail eintragen›",
} as const;

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
        note: "Wer die Seite betreibt, mit einer Anschrift, an die man tatsächlich zustellen kann. Ein Postfach genügt dafür nicht. Medieninhaber ist Jonathan — von den dreien ist er der Einzige, der volljährig ist und damit allein haften kann.",
        angaben: [
          { label: "Name", wert: betreiber.name },
          { label: "Anschrift", wert: betreiber.adresse },
          { label: "E-Mail", wert: betreiber.email },
        ],
        todo: [
          "Die drei Angaben oben ersetzen. Sie stehen in lib/site.ts unter `betreiber` — an einer Stelle, Impressum und Datenschutz ziehen mit.",
          "Jonathan muss wissen: Die Anschrift steht danach öffentlich im Netz, und er haftet allein für alles auf der Seite — auch für das, was Oliver und Anton schreiben.",
        ],
      },
      {
        heading: "Kontakt",
        note: "§ 5 ECG verlangt eine E-Mail-Adresse, unter der ihr wirklich erreichbar seid. Für Presse ist sie ohnehin die wichtigste Angabe auf dieser Seite. Sie muss nicht auf studytab.at enden — ein gemeinsames Gratis-Postfach erfüllt die Vorschrift genauso.",
        todo: [
          "Adresse eintragen. Sie fehlt im ganzen Projekt noch — auch »Schreib uns« im Team-Block und »Kontakt« in der Fußzeile zeigen derzeit ins Leere.",
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
        note: "Art. 13 Abs. 1 lit. a: wer über diese Daten entscheidet. Dieselben Angaben wie im Impressum — sie stehen im Code nur einmal und erscheinen hier automatisch mit.",
        angaben: [
          { label: "Name", wert: betreiber.name },
          { label: "Anschrift", wert: betreiber.adresse },
          { label: "E-Mail", wert: betreiber.email },
        ],
        todo: ["Füllt sich von selbst, sobald `betreiber` in lib/site.ts steht."],
      },
      {
        heading: "Welche Daten erhoben werden",
        note: "Alle vier Sätze sind am Code nachgeprüft: app/actions.ts, lib/signups.ts und lib/absender.ts.",
        facts: [
          "Genau ein Feld gibst du an: die E-Mail-Adresse aus dem Anmeldeformular. Dazu wird der Zeitpunkt der Anmeldung gespeichert.",
          "Das Formular hat ein zweites, unsichtbares Feld, das Bots abfängt. Wird es ausgefüllt, wird nichts gespeichert.",
          "Damit niemand das Formular massenhaft mit erfundenen Adressen befüllt, wird zu jeder Anmeldung eine Kennung des Absenders abgelegt. Sie ist ein nicht zurückrechenbarer Prüfwert aus deiner IP-Adresse und einem Geheimnis des Servers — die IP-Adresse selbst wird weder gespeichert noch protokolliert.",
          "Diese Kennung dient allein dem Zählen der Anmeldungen pro Stunde. Sie lässt sich keiner Person zuordnen und verschwindet mit deiner Abmeldung.",
        ],
        todo: [
          "Gegenprüfen, sobald sich am Formular etwas ändert.",
          "Formulierung zur Absender-Kennung von jemandem prüfen lassen: Rechtsgrundlage ist hier nicht die Einwilligung, sondern das berechtigte Interesse nach Art. 6 Abs. 1 lit. f DSGVO — Schutz vor Missbrauch.",
        ],
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
