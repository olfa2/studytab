import { createHash } from "node:crypto";
import { headers } from "next/headers";

/**
 * Eine nicht zurückrechenbare Kennung des Absenders — zum Zählen, wie oft
 * jemand das Anmeldeformular abschickt.
 *
 * Gespeichert wird nie die IP-Adresse selbst. Sie ist ein personenbezogenes
 * Datum und hat auf einer Seite, die mit „kein Tracking" wirbt, nichts
 * verloren. Stattdessen ein SHA-256 über Geheimnis + IP.
 *
 * Das Geheimnis ist entscheidend: Ein Hash allein wäre wertlos, weil es nur
 * rund vier Milliarden IPv4-Adressen gibt — die kann man vollständig
 * durchhashen und die Zuordnung wiederherstellen. Mit einem Geheimnis, das
 * der Angreifer nicht kennt, geht das nicht.
 *
 * Als Geheimnis dient der Supabase-Schlüssel. Er ist ohnehin da, ist
 * serverseitig und geheim, und erspart eine weitere Umgebungsvariable, die
 * jemand vergessen könnte. Wird er je gewechselt, ändern sich die Hashes —
 * das ist folgenlos, weil sie nur eine Stunde lang gezählt werden.
 */
export async function absenderKennung(): Promise<string | null> {
  const kopf = await headers();

  /*
   * Auf Vercel steht die echte Adresse des Besuchers in `x-forwarded-for`,
   * und zwar als erster Eintrag — dahinter hängen die Zwischenstationen.
   * `x-real-ip` als Rückfall für andere Hoster.
   */
  const kette = kopf.get("x-forwarded-for") ?? kopf.get("x-real-ip") ?? "";
  const ip = kette.split(",")[0]?.trim();

  // Lokal gibt es oft keinen dieser Köpfe. Dann wird nicht begrenzt —
  // eine erfundene Kennung würde alle Besucher in einen Topf werfen.
  if (!ip) return null;

  const geheimnis = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  if (!geheimnis) return null;

  return createHash("sha256").update(`${geheimnis}:${ip}`).digest("hex");
}
