"use server";

import { abmelden, saveSignup, zuVieleAnmeldungen } from "@/lib/signups";
import { absenderKennung } from "@/lib/absender";
import type { AbmeldeState, SignupState } from "@/lib/signup-state";

/** Bewusst großzügig — die Adresse muss zustellbar sein, nicht schön. */
function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) && value.length <= 254;
}

export async function subscribe(
  _previous: SignupState,
  formData: FormData,
): Promise<SignupState> {
  // Honigtopf: das Feld ist unsichtbar, nur Bots füllen es aus.
  // Die laufen freundlich ins Leere, statt eine Fehlermeldung zu lernen.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { status: "ok" };
  }

  const email = String(formData.get("email") ?? "").trim();

  if (email === "") {
    return { status: "error", message: "Da fehlt noch die Adresse." };
  }

  if (!looksLikeEmail(email)) {
    return {
      status: "error",
      message: "Das sieht nicht nach einer E-Mail-Adresse aus.",
    };
  }

  /*
   * Bremse gegen massenhaftes Eintragen. Steht bewusst NACH der Prüfung
   * der Adresse: Wer sich vertippt, soll das erfahren, statt auf eine
   * Grenze zu laufen, die er gar nicht ausgelöst hat.
   *
   * Die Kennung ist ein Hash aus Server-Geheimnis und IP — die IP selbst
   * wird weder gespeichert noch protokolliert (lib/absender.ts).
   */
  const absender = await absenderKennung();

  if (await zuVieleAnmeldungen(absender)) {
    return {
      status: "error",
      message: "Das waren gerade viele. Probier es in einer Stunde nochmal.",
    };
  }

  try {
    await saveSignup(email, absender);
  } catch (error) {
    console.error("Anmeldung konnte nicht gespeichert werden:", error);
    return {
      status: "error",
      message: "Hat gerade nicht geklappt. Probier es bitte später noch einmal.",
    };
  }

  return { status: "ok" };
}

/**
 * Die Abmeldung hinter /abmelden/<schluessel>.
 *
 * Warum ein Knopf und nicht einfach beim Aufrufen der Seite: Das Löschen
 * ist endgültig, und Mailprogramme und Messenger rufen Links im Hintergrund
 * auf, um eine Vorschau zu bauen. Ohne Knopf hätte so ein Vorschau-Abruf
 * Leute abgemeldet, die den Link nie angeklickt haben.
 */
export async function abmeldenAusfuehren(
  _previous: AbmeldeState,
  formData: FormData,
): Promise<AbmeldeState> {
  const schluessel = String(formData.get("schluessel") ?? "").trim();

  try {
    await abmelden(schluessel);
  } catch (error) {
    console.error("Abmeldung fehlgeschlagen:", error);
    return { status: "error" };
  }

  /*
   * Auch bei unbekanntem Schlüssel „fertig". Wer zweimal klickt, ist beim
   * zweiten Mal schon abgemeldet — das ist kein Fehler. Und es verhindert,
   * dass jemand über die Antwort herausfindet, welche Schlüssel es gibt.
   */
  return { status: "fertig" };
}
