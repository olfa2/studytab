"use client";

import { useActionState } from "react";
import { abmeldenAusfuehren } from "@/app/actions";
import { abmeldeInitialState } from "@/lib/signup-state";
import { site } from "@/lib/site";

/**
 * Der Knopf auf der Abmeldeseite.
 *
 * Warum überhaupt ein Knopf und nicht Löschen beim Aufrufen der Seite:
 * Das Löschen ist endgültig, und Mailprogramme und Messenger rufen Links
 * im Hintergrund auf, um eine Vorschau zu bauen. Ohne Knopf hätte so ein
 * Abruf Leute abgemeldet, die nie geklickt haben.
 *
 * Der Schlüssel steht in einem versteckten Feld statt in der Server-Action
 * gebunden — so funktioniert das Formular auch ohne JavaScript.
 */
export default function AbmeldeForm({ schluessel }: { schluessel: string }) {
  const [state, formAction, isPending] = useActionState(
    abmeldenAusfuehren,
    abmeldeInitialState,
  );
  const t = site.abmelden;

  if (state.status === "fertig") {
    return (
      <div className="abmelden__ergebnis" role="status">
        <p className="abmelden__ergebnis-titel display">{t.fertigTitle}</p>
        <p className="abmelden__ergebnis-text">{t.fertigText}</p>
      </div>
    );
  }

  return (
    <>
      {state.status === "error" ? (
        <div className="abmelden__ergebnis" role="alert">
          <p className="abmelden__ergebnis-titel display">{t.fehlerTitle}</p>
          <p className="abmelden__ergebnis-text">{t.fehlerText}</p>
        </div>
      ) : null}

      <form action={formAction}>
        <input type="hidden" name="schluessel" value={schluessel} />
        <button className="cta__button" type="submit" disabled={isPending}>
          {isPending ? t.pending : t.button}
        </button>
      </form>
    </>
  );
}
