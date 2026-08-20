"use server";

import { saveSignup } from "@/lib/signups";
import type { SignupState } from "@/lib/signup-state";

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

  try {
    await saveSignup(email);
  } catch (error) {
    console.error("Anmeldung konnte nicht gespeichert werden:", error);
    return {
      status: "error",
      message: "Hat gerade nicht geklappt. Probier es bitte später noch einmal.",
    };
  }

  return { status: "ok" };
}
