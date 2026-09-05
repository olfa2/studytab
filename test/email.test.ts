import test from "node:test";
import assert from "node:assert/strict";

import { looksLikeEmail } from "../lib/email.ts";

/*
 * Die Adressprüfung ist die erste von drei Stellen, an denen ein Fehler
 * personenbezogene Daten betrifft: Was hier durchrutscht, landet in der
 * Datenbank; was hier fälschlich abgewiesen wird, ist ein Mensch, den wir
 * zum Start nicht erreichen.
 *
 * Die Prüfung ist bewusst großzügig — sicher feststellen lässt sich die
 * Zustellbarkeit nur durch eine Mail dorthin. Die Tests halten diese
 * Großzügigkeit fest, damit sie niemand später versehentlich verschärft.
 */

test("nimmt gewöhnliche Adressen an", () => {
  for (const adresse of [
    "oliver@example.at",
    "a@b.co",
    "vorname.nachname@schule.ac.at",
    "jemand+studytab@gmail.com",
    "MiXeD@Case.AT",
    "zahlen123@domain456.de",
  ]) {
    assert.equal(looksLikeEmail(adresse), true, `abgelehnt: ${adresse}`);
  }
});

test("lehnt ab, was keine Adresse ist", () => {
  for (const eingabe of [
    "",
    "oliver",
    "oliver@",
    "@example.at",
    "oliver@example",           // keine Endung
    "oliver@example.a",         // Endung zu kurz
    "oliver @example.at",       // Leerzeichen
    "oliver@exa mple.at",
    "oliver@@example.at",
    "oliver@example.at extra",
  ]) {
    assert.equal(looksLikeEmail(eingabe), false, `durchgelassen: "${eingabe}"`);
  }
});

test("hält die Längengrenze aus RFC 5321 ein", () => {
  // 254 Zeichen sind erlaubt, 255 nicht — kein Mailserver stellt mehr zu.
  const rest = "@example.at";
  const gerade = "a".repeat(254 - rest.length) + rest;
  const einsZuViel = "a".repeat(255 - rest.length) + rest;

  assert.equal(gerade.length, 254);
  assert.equal(einsZuViel.length, 255);
  assert.equal(looksLikeEmail(gerade), true);
  assert.equal(looksLikeEmail(einsZuViel), false);
});

test("prüft nur die Form, nicht die Umgebung", () => {
  // Keine Netzwerkanfrage, kein Zeitbezug, kein Zufall: Zweimal dieselbe
  // Eingabe muss zweimal dasselbe ergeben, sonst ist die Funktion nicht
  // die reine Prüfung, für die sie ausgelagert wurde.
  assert.equal(looksLikeEmail("test@studytab.at"), looksLikeEmail("test@studytab.at"));
});
