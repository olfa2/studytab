import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const FILE = path.join(process.cwd(), ".data", "signups.jsonl");

/**
 * Speichert eine Anmeldung für die Start-Benachrichtigung.
 *
 * ────────────────────────────────────────────────────────────────────
 *  DAS HIER IST DER AUSTAUSCHPUNKT.
 *
 *  Im Moment landet jede Adresse als eine Zeile JSON in
 *  `.data/signups.jsonl` — das läuft lokal sofort und ohne Konto
 *  irgendwo. Auf einem Hoster mit schreibgeschütztem Dateisystem
 *  (Vercel, Netlify) funktioniert es NICHT.
 *
 *  Für den echten Betrieb nur den Rumpf dieser Funktion ersetzen,
 *  z. B. durch einen Resend-Kontakt, eine Supabase-Tabelle, eine
 *  Zeile in einem Google Sheet. Der Rest der Seite bleibt gleich.
 * ────────────────────────────────────────────────────────────────────
 */
export async function saveSignup(email: string): Promise<void> {
  const line = JSON.stringify({ email, at: new Date().toISOString() });

  await mkdir(path.dirname(FILE), { recursive: true });
  await appendFile(FILE, `${line}\n`, "utf8");
}
