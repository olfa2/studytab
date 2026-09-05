import test from "node:test";
import assert from "node:assert/strict";

/*
 * Die zwei anderen Stellen, an denen ein Fehler personenbezogene Daten
 * betrifft: die Bremse gegen massenhaftes Eintragen und der Abmeldeweg.
 *
 * lib/signups.ts liest Adresse und Schlüssel BEIM LADEN des Moduls in
 * Konstanten. Die Umgebung muss deshalb vor dem Import gesetzt sein —
 * daher `await import` statt eines gewöhnlichen Imports oben. Beide Werte
 * sind erfunden; es geht hier nie ans Netz.
 */
process.env.NEXT_PUBLIC_SUPABASE_URL = "https://beispiel.supabase.co";
process.env.SUPABASE_SERVICE_ROLE_KEY = "test-schluessel-nicht-echt";

const { istSchluessel, zuVieleAnmeldungen, saveSignup, abmelden, ANMELDUNGEN_JE_STUNDE } =
  await import("../lib/signups.ts");

/** Merkt sich jede Anfrage und antwortet, wie der Test es vorgibt. */
function fangeFetchAb(antwort: { ok: boolean; status?: number; koerper?: unknown }) {
  const anfragen: { url: string; init: RequestInit | undefined }[] = [];
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    anfragen.push({ url: String(url), init });
    return {
      ok: antwort.ok,
      status: antwort.status ?? (antwort.ok ? 200 : 500),
      statusText: antwort.ok ? "OK" : "Server Error",
      json: async () => antwort.koerper,
      text: async () => JSON.stringify(antwort.koerper ?? ""),
    };
  }) as typeof fetch;
  return anfragen;
}

/* ------------------------------------------------ Der Abmelde-Schlüssel -- */

test("istSchluessel erkennt eine UUID", () => {
  assert.equal(istSchluessel("3f2504e0-4f89-41d3-9a0c-0305e82c3301"), true);
  assert.equal(istSchluessel("3F2504E0-4F89-41D3-9A0C-0305E82C3301"), true);
});

test("istSchluessel lehnt alles andere ab", () => {
  for (const wert of [
    "",
    "3f2504e0",
    "3f2504e0-4f89-41d3-9a0c",
    "{3f2504e0-4f89-41d3-9a0c-0305e82c3301}",
    "3f2504e0-4f89-41d3-9a0c-0305e82c3301x",
    "zzzzzzzz-4f89-41d3-9a0c-0305e82c3301",
    // Das hier ist der eigentliche Grund für die Prüfung: Ohne sie ginge
    // der Wert ungefiltert in die Adresse der DELETE-Anfrage.
    "3f2504e0-4f89-41d3-9a0c-0305e82c3301 or 1=1",
  ]) {
    assert.equal(istSchluessel(wert), false, `durchgelassen: "${wert}"`);
  }
});

/* --------------------------------------------------------- Die Bremse -- */

test("ohne Absender-Kennung wird nicht begrenzt", async () => {
  const anfragen = fangeFetchAb({ ok: true, koerper: [] });
  assert.equal(await zuVieleAnmeldungen(null), false);
  // Wichtig: gar keine Anfrage. Ohne Kennung gäbe es nichts zu zählen,
  // und eine Abfrage ohne Filter träfe alle Besucher gemeinsam.
  assert.equal(anfragen.length, 0);
});

test("unter der Grenze durchlassen, ab der Grenze bremsen", async () => {
  const knappDrunter = Array.from({ length: ANMELDUNGEN_JE_STUNDE - 1 }, (_, i) => ({ id: i }));
  fangeFetchAb({ ok: true, koerper: knappDrunter });
  assert.equal(await zuVieleAnmeldungen("abc123"), false);

  const genau = Array.from({ length: ANMELDUNGEN_JE_STUNDE }, (_, i) => ({ id: i }));
  fangeFetchAb({ ok: true, koerper: genau });
  assert.equal(await zuVieleAnmeldungen("abc123"), true);
});

test("bei einer Störung wird durchgelassen, nicht gesperrt", async () => {
  fangeFetchAb({ ok: false, status: 503 });
  // Die Grenze ist Schutz vor Müll, keine Sicherheitssperre. Eine Störung
  // beim Zählen darf keine echte Anmeldung verhindern.
  assert.equal(await zuVieleAnmeldungen("abc123"), false);
});

test("die Zählung fragt nur die letzte Stunde ab", async () => {
  const anfragen = fangeFetchAb({ ok: true, koerper: [] });
  await zuVieleAnmeldungen("abc123");

  const url = anfragen[0].url;
  assert.match(url, /absender_hash=eq\.abc123/);
  assert.match(url, /angemeldet_am=gte\./);

  const seit = new Date(decodeURIComponent(url.match(/angemeldet_am=gte\.([^&]+)/)![1]));
  const abstand = Date.now() - seit.getTime();
  assert.ok(abstand > 59 * 60 * 1000 && abstand < 61 * 60 * 1000,
    `Zeitfenster ist ${Math.round(abstand / 60000)} Minuten statt 60`);
});

/* -------------------------------------------------------- Das Speichern -- */

test("die Adresse wird vereinheitlicht gespeichert", async () => {
  const anfragen = fangeFetchAb({ ok: true });
  await saveSignup("  OliVER@Example.AT  ", "hash1");

  const koerper = JSON.parse(String(anfragen[0].init?.body));
  // Sonst greift die Eindeutigkeit in der Datenbank nicht und dieselbe
  // Person stünde zweimal auf der Liste.
  assert.equal(koerper.email, "oliver@example.at");
  assert.equal(koerper.absender_hash, "hash1");
});

test("doppelte Anmeldungen laufen nicht in einen Fehler", async () => {
  const anfragen = fangeFetchAb({ ok: true });
  await saveSignup("test@example.at");

  const kopf = anfragen[0].init?.headers as Record<string, string>;
  assert.match(kopf.Prefer, /resolution=ignore-duplicates/);
  // Die gespeicherte Zeile enthielte den Abmelde-Schlüssel — wir wollen
  // sie nicht zurück.
  assert.match(kopf.Prefer, /return=minimal/);
});

test("ein Fehler beim Speichern bleibt ein Fehler", async () => {
  fangeFetchAb({ ok: false, status: 500, koerper: "kaputt" });
  await assert.rejects(() => saveSignup("test@example.at"), /500/);
});

/* -------------------------------------------------------- Das Abmelden -- */

test("ein unbrauchbarer Schlüssel geht gar nicht erst an die Datenbank", async () => {
  const anfragen = fangeFetchAb({ ok: true, koerper: [] });
  assert.equal(await abmelden("keine-uuid"), false);
  assert.equal(anfragen.length, 0);
});

test("abmelden meldet, ob wirklich etwas gelöscht wurde", async () => {
  const schluessel = "3f2504e0-4f89-41d3-9a0c-0305e82c3301";

  fangeFetchAb({ ok: true, koerper: [{ id: 1 }] });
  assert.equal(await abmelden(schluessel), true);

  // Zweiter Klick auf denselben Link: schon abgemeldet, kein Fehler.
  fangeFetchAb({ ok: true, koerper: [] });
  assert.equal(await abmelden(schluessel), false);
});

test("abmelden löscht die Zeile, statt ein Häkchen zu setzen", async () => {
  const anfragen = fangeFetchAb({ ok: true, koerper: [{ id: 1 }] });
  await abmelden("3f2504e0-4f89-41d3-9a0c-0305e82c3301");

  // Wer weg will, will weg — mit der Zeile geht auch die Absender-Kennung.
  assert.equal(anfragen[0].init?.method, "DELETE");
  assert.match(anfragen[0].url, /abmelde_schluessel=eq\.3f2504e0/);
});
