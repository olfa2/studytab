/**
 * Erzeugt TEXTE.md aus lib/site.ts.
 *
 * Aufruf: npm run texte
 *
 * Nicht abgetippt, sondern aus der Quelle gelesen: Eine Textsammlung, die
 * von der Seite abweicht, ist schlimmer als keine.
 */
import { writeFileSync } from "node:fs";
import { site, betreiber, featureSections, heroShot, legal } from "../lib/site.ts";

const z = [];
const p = (...t) => z.push(...t);

/** Ein Text mit der Stelle, an der er im Code steht. */
function eintrag(pfad, wert) {
  if (wert === null || wert === "") return;
  const mehrzeilig = String(wert).includes("\n");
  p(`\`${pfad}\``, "");
  if (mehrzeilig) p("```", String(wert), "```", "");
  else p("> " + String(wert), "");
}

function offen(wert) {
  return typeof wert === "string" && wert.includes("‹");
}

p("# Alle Texte der Website", "");
p("Jeder Satz, der auf studytab-real.vercel.app zu sehen ist — in der");
p("Reihenfolge, in der er auf der Seite vorkommt.", "");
p("**Diese Datei ist ein Spiegel, kein Original.** Sie wurde aus");
p("`lib/site.ts` erzeugt. Wer einen Text ändern will, ändert ihn dort —");
p("unter dem Pfad, der über jedem Absatz steht. Eine Änderung hier");
p("landet nicht auf der Seite.", "");
p("Stand: " + new Date().toISOString().slice(0, 10) + " · Adresse: " + site.url, "");
p("---", "");

/* ------------------------------------------------------------ Inhalt ---- */
p("## Inhalt", "");
p("| | Abschnitt | Wo im Code |");
p("|---|---|---|");
p("| 1 | [Kopf](#1-kopf) | `site.name`, `site.release` |");
p("| 2 | [Einstieg](#2-einstieg) | `site.headline`, `site.lede` |");
p("| 3 | [Die vier Funktionsabschnitte](#3-die-vier-funktionsabschnitte) | `featureSections` |");
p("| 4 | [Datenschutz-Band](#4-datenschutz-band) | `site.privacySection` |");
p("| 5 | [Wer dahintersteckt](#5-wer-dahintersteckt) | `site.team` |");
p("| 6 | [Abschluss](#6-abschluss) | `site.closing` |");
p("| 7 | [Fußzeile](#7-fußzeile) | `site.footer` |");
p("| 8 | [Abmeldeseite](#8-abmeldeseite) | `site.abmelden` |");
p("| 9 | [Impressum](#9-impressum) | `legal.impressum` |");
p("| 10 | [Datenschutzerklärung](#10-datenschutzerklärung) | `legal.datenschutz` |");
p("| 11 | [Für geteilte Links](#11-für-geteilte-links) | `site.metaTitle`, `site.og` |");
p("");
p("---", "");

/* -------------------------------------------------------------- Kopf ---- */
p("## 1 · Kopf", "");
eintrag("site.name", site.name);
p("Rechts daneben, solange die App nicht draußen ist:", "");
eintrag("site.release.pending", site.release.pending);
p("Nach dem Start (`site.released = true`) steht dort stattdessen:", "");
eintrag("site.release.link", site.release.link);
p("Die vier Sprungmarken im Kopf sind die Beschriftungen der Abschnitte");
p("aus `featureSections` — sie stehen nicht doppelt im Code.", "");

/* ---------------------------------------------------------- Einstieg ---- */
p("## 2 · Einstieg", "");
p("### Die Zeile über der Schlagzeile", "");
eintrag("site.scanLine", site.scanLine);
p("*Lässt sich mit `site.showScanLine = false` ausblenden.*", "");
p("### Schlagzeile", "");
eintrag("site.headline", site.headline);
p("### Vorspann", "");
eintrag("site.lede", site.lede);
p("### Anmeldeformular", "");
p("| Was | Text | Pfad |");
p("|---|---|---|");
for (const [k, v] of Object.entries(site.signup)) {
  const was = { label: "Beschriftung über dem Feld", labelShort: "Kurzfassung (nur Screenreader)",
    placeholder: "Graue Schrift im Feld", button: "Knopf", pending: "Knopf während des Sendens",
    success: "Nach dem Absenden" }[k] ?? k;
  p(`| ${was} | ${v} | \`site.signup.${k}\` |`);
}
p("");
p("### Die drei Zusicherungen darunter", "");
eintrag("site.zusicherungen", site.zusicherungen.join(" · "));
p("*Alle drei sind belegt: gratis ist eine Entscheidung des Teams,");
p("„Auch offline\" steht in `Store/AppStore.swift`, „Kein Tracking\" in");
p("`Package.resolved`.*", "");
p("### Das Bild daneben", "");
p("| | |");
p("|---|---|");
p(`| Titel im Platzhalter | ${heroShot.title} |`);
p(`| Beschriftung | ${heroShot.caption.replace(/\n/g, " / ")} |`);
p(`| Erwartete Datei | \`public/screenshots/${heroShot.file}\` |`);
p(`| Alt-Text | ${heroShot.alt} |`);
p("");

/* --------------------------------------------------- Funktionsabschnitte -- */
p("## 3 · Die vier Funktionsabschnitte", "");
p("`featureSections` in `lib/site.ts`. Reihenfolge hier = Reihenfolge auf");
p("der Seite.", "");
for (const [i, s] of featureSections.entries()) {
  p(`### 3.${i + 1} · ${s.kicker}`, "");
  p("**Beschriftung**", "");
  p("> " + s.kicker, "");
  p("**Titel**", "");
  p("> " + s.title, "");
  p("**Text**", "");
  p("> " + s.lead, "");
  p(`**Bilder** — Anordnung \`${s.layout}\`, Bildseite \`${s.media}\`, Akzent \`${s.akzent}\``, "");
  p("| Titel | Beschriftung | Datei | Alt-Text |");
  p("|---|---|---|---|");
  for (const b of s.shots) {
    p(`| ${b.title} | ${b.caption.replace(/\n/g, " / ")} | \`${b.file}\` | ${b.alt} |`);
  }
  p("");
}
p("Unter jedem Bildplatz, solange kein echtes Bild da ist:", "");
eintrag("site.placeholderNote", site.placeholderNote);

/* ------------------------------------------------------- Datenschutz ---- */
p("## 4 · Datenschutz-Band", "");
p("Das dunkle Band. **Jeder Satz hier ist am App-Repo geprüft** — die");
p("Belege stehen als Kommentar in `lib/site.ts`.", "");
eintrag("site.privacySection.kicker", site.privacySection.kicker);
eintrag("site.privacySection.title", site.privacySection.title);
eintrag("site.privacySection.lead", site.privacySection.lead);
p("| Punkt | Text |");
p("|---|---|");
for (const c of site.privacySection.claims) p(`| **${c.title}** | ${c.text} |`);
p("");
p("Darunter, in kleiner Schrift:", "");
eintrag("site.privacy", site.privacy);
p("> ⚠️ **Dieser eine Satz ist wortgleich mit der Datenschutz-Seite in der");
p("> App** (`Views/DatenschutzView.swift`). App und Website dürfen sich");
p("> hier nicht widersprechen — wer ihn ändert, ändert ihn an beiden Stellen.", "");

/* -------------------------------------------------------------- Team ---- */
p("## 5 · Wer dahintersteckt", "");
eintrag("site.team.kicker", site.team.kicker);
eintrag("site.team.title", site.team.title);
eintrag("site.team.text", site.team.text);
eintrag("site.team.names", site.team.names);
eintrag("site.team.school", site.team.school);
eintrag("site.team.contact.label", site.team.contact.label);
p(`Der Link zeigt auf \`${site.team.contact.href}\` — **diese Seite gibt es`);
p("noch nicht**, der Link läuft ins Leere.", "");
p("Solange `site.team.photo` auf `null` steht, steht dort ein Platzhalter:");
p("„Foto / Ein Bild von euch dreien / quer, mindestens 1200 breit\".", "");

/* --------------------------------------------------------- Abschluss ---- */
p("## 6 · Abschluss", "");
eintrag("site.closing.title", site.closing.title);
eintrag("site.closing.text", site.closing.text);
p("Darunter noch einmal dasselbe Anmeldeformular wie im Einstieg.", "");

/* ---------------------------------------------------------- Fußzeile ---- */
p("## 7 · Fußzeile", "");
p("| Beschriftung | Ziel | Gibt es die Seite? |");
p("|---|---|---|");
for (const l of site.footer.links) {
  const da = l.href === "/kontakt" ? "**nein — 404**" : "ja";
  p(`| ${l.label} | \`${l.href}\` | ${da} |`);
}
p("");
eintrag("site.footer.copyright", site.footer.copyright);

/* --------------------------------------------------------- Abmelden ---- */
p("## 8 · Abmeldeseite", "");
p("Hinter dem Link aus der Start-Mail. Sie fragt einmal nach, statt beim");
p("Aufrufen sofort zu löschen — Mailprogramme rufen Links im Hintergrund");
p("auf, um Vorschauen zu bauen.", "");
p("| Was | Text | Pfad |");
p("|---|---|---|");
const abmeldeNamen = {
  kicker: "Beschriftung", title: "Überschrift", lead: "Text", button: "Knopf",
  pending: "Knopf während des Sendens", fertigTitle: "Nach dem Abmelden — Überschrift",
  fertigText: "Nach dem Abmelden — Text", fehlerTitle: "Bei einem Fehler — Überschrift",
  fehlerText: "Bei einem Fehler — Text", ungueltigTitle: "Bei kaputtem Link — Überschrift",
  ungueltigText: "Bei kaputtem Link — Text", zurueck: "Link zurück",
};
for (const [k, v] of Object.entries(site.abmelden)) {
  p(`| ${abmeldeNamen[k] ?? k} | ${v} | \`site.abmelden.${k}\` |`);
}
p("");

/* ------------------------------------------------------ Rechtstexte ---- */
function rechtstext(nummer, name, doc, pfad) {
  p(`## ${nummer} · ${name}`, "");
  eintrag(`${pfad}.kicker`, doc.kicker);
  eintrag(`${pfad}.title`, doc.title);
  eintrag(`${pfad}.lead`, doc.lead);
  p("**Warnkasten oben** *(verschwindet von selbst, sobald keine Lücke mehr offen ist)*", "");
  p("> **" + doc.notice.title + "**  ");
  p("> " + doc.notice.text, "");
  for (const [i, s] of doc.sections.entries()) {
    p(`### ${nummer}.${i + 1} · ${s.heading}`, "");
    p("*" + s.note + "*", "");
    if (s.angaben) {
      p("| Angabe | Wert |");
      p("|---|---|");
      for (const a of s.angaben) {
        p(`| ${a.label} | ${offen(a.wert) ? "🔴 " + a.wert : a.wert} |`);
      }
      p("");
    }
    if (s.facts) {
      p("**Steht schon fest:**", "");
      for (const f of s.facts) p("- " + f);
      p("");
    }
    if (s.todo?.length) {
      p("**" + legal.todoLabel + ":**", "");
      for (const t of s.todo) p("- [ ] " + t);
      p("");
    }
  }
}
rechtstext(9, "Impressum", legal.impressum, "legal.impressum");
rechtstext(10, "Datenschutzerklärung", legal.datenschutz, "legal.datenschutz");

p("### Die Betreiberangaben", "");
p("Stehen **einmal** in `lib/site.ts` unter `betreiber` und erscheinen in");
p("beiden Rechtstexten. Zwei Kopien liefen früher oder später auseinander.", "");
p("| Angabe | Wert | Pfad |");
p("|---|---|---|");
for (const [k, v] of Object.entries(betreiber)) {
  p(`| ${k} | ${offen(v) ? "🔴 " + v : v} | \`betreiber.${k}\` |`);
}
p("");
p("🔴 = noch auszufüllen. Medieninhaber ist Jonathan: Von den dreien ist");
p("er der Einzige, der volljährig ist und damit allein haften kann.", "");

/* ------------------------------------------------------ Geteilte Links -- */
p("## 11 · Für geteilte Links", "");
p("Was in der Suche und in der Vorschau steht, wenn jemand den Link in");
p("WhatsApp oder Discord schickt.", "");
p("| Was | Text | Pfad |");
p("|---|---|---|");
p(`| Seitentitel | ${site.metaTitle} | \`site.metaTitle\` |`);
p(`| Beschreibung | ${site.lede} | \`site.lede\` |`);
p(`| Alt-Text des Bildes | ${site.og.alt} | \`site.og.alt\` |`);
p(`| Zeile im Bild | ${site.og.features} | \`site.og.features\` |`);
p("");
p("*Der Seitentitel ist absichtlich nicht die Schlagzeile: In der Suche");
p("zählen die Wörter, nach denen jemand sucht, und niemand sucht nach");
p("„ganze Schule\".*", "");

p("---", "");
p("## Was noch fehlt", "");
p("| | wer |");
p("|---|---|");
p("| Elf Screenshots + Teamfoto | Anton und Jonathan |");
p("| Die drei Betreiberangaben | Jonathan — **blockiert den Livegang** |");
p("| Eine Kontaktadresse (zwei Links laufen ins Leere) | einer von euch |");
p("| Ein Startzeitraum statt „Bald\" | ihr drei |");
p("");

writeFileSync("TEXTE.md", z.join("\n").replace(/\n{3,}/g, "\n\n") + "\n");
console.log("ok — TEXTE.md geschrieben");
