/**
 * Zustand des Anmeldeformulars.
 *
 * Steht bewusst hier und nicht in `app/actions.ts`: Eine Datei mit
 * "use server" darf ausschließlich async-Funktionen exportieren —
 * eine Konstante daneben lässt den Server-Request mit 500 abbrechen.
 */
export type SignupState = {
  status: "idle" | "ok" | "error";
  message?: string;
};

export const signupInitialState: SignupState = { status: "idle" };

/** Zustand der Abmeldeseite — aus demselben Grund hier und nicht in actions.ts. */
export type AbmeldeState = {
  status: "idle" | "fertig" | "error";
};

export const abmeldeInitialState: AbmeldeState = { status: "idle" };
