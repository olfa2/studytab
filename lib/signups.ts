/**
 * Speichert eine Anmeldung für die Start-Benachrichtigung.
 *
 * Vorher schrieb diese Funktion in `.data/signups.jsonl`. Das lief lokal
 * sofort, wäre auf Vercel aber still gescheitert: Dort ist das Dateisystem
 * schreibgeschützt, jede Anmeldung hätte mit einer Fehlermeldung geendet
 * und die Adresse wäre weg gewesen. Jetzt geht sie nach Supabase.
 *
 * ────────────────────────────────────────────────────────────────────
 *  KEIN SUPABASE-PAKET.
 *
 *  Supabase spricht PostgREST, also gewöhnliches HTTP — `fetch` genügt.
 *  Das ist Absicht: Die Datenschutzerklärung der Seite sagt, das Projekt
 *  hänge an drei Paketen (next, react, react-dom). Ein viertes nur für
 *  einen einzigen INSERT würde diesen Satz unwahr machen.
 * ────────────────────────────────────────────────────────────────────
 *
 * Zum Schlüssel: `SUPABASE_SERVICE_ROLE_KEY` umgeht sämtliche
 * Zugriffsregeln der Datenbank. Drei Dinge halten ihn vom Browser fern:
 *
 * 1. Kein `NEXT_PUBLIC_` davor — Next setzt solche Werte gar nicht erst
 *    ins Client-Bündel ein. Im Browser wäre er schlicht `undefined`.
 * 2. Aufgerufen wird diese Datei nur aus app/actions.ts, und die trägt
 *    `"use server"`.
 * 3. Die Wache unten, falls doch jemand von einer Client-Komponente aus
 *    hierher importiert.
 *
 * Das übliche Mittel wäre `import "server-only"`. Das ist aber ein
 * viertes npm-Paket, und die Datenschutzerklärung der Seite zählt
 * ausdrücklich drei — der Satz soll wahr bleiben.
 */

if (typeof window !== "undefined") {
  throw new Error(
    "lib/signups.ts gehört auf den Server. Wird sie im Browser geladen, " +
      "stimmt etwas mit den Importen nicht.",
  );
}

const BASIS = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SCHLUESSEL = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** So viele Anmeldungen darf ein Absender pro Stunde auslösen. */
export const ANMELDUNGEN_JE_STUNDE = 5;

/**
 * Adresse und Schlüssel, oder ein Fehler mit klarer Ansage. Beides kommt
 * hier zusammen heraus, damit TypeScript danach weiß, dass keins davon
 * `undefined` ist — und damit die Fehlermeldung nur einmal existiert.
 */
function umgebung(): { basis: string; kopf: Record<string, string> } {
  if (!BASIS || !SCHLUESSEL) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL oder SUPABASE_SERVICE_ROLE_KEY fehlt. " +
        "Lokal gehören beide in .env.local, auf Vercel unter " +
        "Settings → Environment Variables.",
    );
  }

  return {
    basis: BASIS,
    kopf: {
      apikey: SCHLUESSEL,
      Authorization: `Bearer ${SCHLUESSEL}`,
      "Content-Type": "application/json",
    },
  };
}

/**
 * Hat dieser Absender in der letzten Stunde schon zu viele Adressen
 * eingetragen?
 *
 * Gezählt werden nur erfolgreiche Anmeldungen, nicht Versuche — genau die
 * richten den Schaden an, den wir verhindern wollen: Müll in der Liste.
 *
 * Ohne Kennung (lokal, oder wenn der Hoster den Kopf nicht setzt) wird
 * nicht begrenzt. Lieber keine Grenze als eine, die alle Besucher
 * gemeinsam trifft.
 */
export async function zuVieleAnmeldungen(
  absender: string | null,
): Promise<boolean> {
  if (!absender) return false;
  const { basis, kopf } = umgebung();

  const seit = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const antwort = await fetch(
    `${basis}/rest/v1/anmeldungen?select=id` +
      `&absender_hash=eq.${absender}&angemeldet_am=gte.${seit}` +
      `&limit=${ANMELDUNGEN_JE_STUNDE}`,
    { headers: kopf, cache: "no-store" },
  );

  // Im Zweifel durchlassen: Eine Störung beim Zählen darf keine echte
  // Anmeldung verhindern. Die Grenze ist Schutz, keine Sicherheitssperre.
  if (!antwort.ok) return false;

  const zeilen = (await antwort.json()) as unknown[];
  return zeilen.length >= ANMELDUNGEN_JE_STUNDE;
}

export async function saveSignup(
  email: string,
  absender: string | null = null,
): Promise<void> {
  const { basis, kopf } = umgebung();

  // Kleingeschrieben und ohne Leerzeichen — sonst greift die Eindeutigkeit
  // in der Datenbank nicht, und dieselbe Person stünde zweimal drin.
  const adresse = email.trim().toLowerCase();

  const antwort = await fetch(
    `${basis}/rest/v1/anmeldungen?on_conflict=email`,
    {
      method: "POST",
      headers: {
        ...kopf,
        /*
         * `ignore-duplicates`: Wer sich zweimal anmeldet, soll nicht in
         * einen Fehler laufen. Für ihn hat es beim ersten Mal geklappt,
         * und das stimmt ja auch — die Adresse steht auf der Liste.
         *
         * `return=minimal`: Wir brauchen die gespeicherte Zeile nicht
         * zurück, und sie enthielte den Abmelde-Schlüssel.
         */
        Prefer: "resolution=ignore-duplicates,return=minimal",
      },
      body: JSON.stringify({ email: adresse, absender_hash: absender }),
      cache: "no-store",
    },
  );

  if (!antwort.ok) {
    // Der Text geht ins Server-Log, nicht an den Besucher — er könnte
    // Auskunft über die Tabellenstruktur geben.
    const grund = await antwort.text().catch(() => "");
    throw new Error(
      `Supabase antwortete mit ${antwort.status} ${antwort.statusText}: ${grund}`,
    );
  }
}

/** Sieht ein Abmelde-Schlüssel überhaupt nach einer UUID aus? */
export function istSchluessel(wert: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    wert,
  );
}

/**
 * Meldet die Adresse hinter diesem Schlüssel ab — durch Löschen der Zeile,
 * nicht durch ein Häkchen. Wer weg will, will weg: Eine Adresse, die
 * niemand mehr anschreiben darf, hat keinen Grund, gespeichert zu bleiben.
 * Damit geht auch die Absender-Kennung mit.
 *
 * Gibt `true` zurück, wenn wirklich etwas gelöscht wurde.
 *
 * Ein unbekannter Schlüssel ist kein Fehler: Wer zweimal auf denselben
 * Link klickt, ist beim zweiten Mal einfach schon abgemeldet.
 */
export async function abmelden(schluessel: string): Promise<boolean> {
  if (!istSchluessel(schluessel)) return false;
  const { basis, kopf } = umgebung();

  const antwort = await fetch(
    `${basis}/rest/v1/anmeldungen?abmelde_schluessel=eq.${schluessel}`,
    {
      method: "DELETE",
      // `return=representation` sagt uns, ob tatsächlich eine Zeile
      // getroffen wurde — sonst käme immer 204, egal ob es sie gab.
      headers: { ...kopf, Prefer: "return=representation" },
      cache: "no-store",
    },
  );

  if (!antwort.ok) {
    const grund = await antwort.text().catch(() => "");
    throw new Error(
      `Abmeldung fehlgeschlagen: ${antwort.status} ${antwort.statusText}: ${grund}`,
    );
  }

  const geloescht = (await antwort.json()) as unknown[];
  return geloescht.length > 0;
}
