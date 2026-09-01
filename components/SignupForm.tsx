"use client";

import { useActionState } from "react";
import { subscribe } from "@/app/actions";
import { signupInitialState } from "@/lib/signup-state";
import { site } from "@/lib/site";

type Props = {
  /** Beschriftung über dem Feld. Ohne Angabe die lange aus `site.signup`. */
  label?: string;
  /**
   * Beschriftung nur für Screenreader. Für den Abschluss-Block, wo die
   * Überschrift daneben schon sagt, worum es geht.
   */
  labelHidden?: boolean;
};

/**
 * Die Anmeldung für die Start-Benachrichtigung.
 *
 * Steht dort, wo im Design vor dem Release der tote Download-Button war:
 * Wer über den QR-Code aus dem Schulhaus kommt, soll etwas tun können,
 * statt in einer Sackgasse zu landen.
 *
 * Die graue Hinweiszeile unter dem Feld ist entfallen — den Platz nimmt
 * jetzt die Zusicherungs-Reihe im Einstieg ein. Damit fallen auch die
 * `useId`-Kennungen weg, die es nur für den Verweis darauf gab.
 */
export default function SignupForm({ label, labelHidden = false }: Props) {
  const [state, formAction, isPending] = useActionState(
    subscribe,
    signupInitialState,
  );
  const copy = site.signup;

  if (state.status === "ok") {
    return (
      <div className="signup">
        <p className="signup__ok" role="status">
          <span className="signup__ok-mark" aria-hidden="true" />
          {copy.success}
        </p>
      </div>
    );
  }

  return (
    <div className="signup">
      <form className="signup__form" action={formAction} noValidate>
        <label className="signup__field">
          <span
            className={
              labelHidden ? "signup__label visually-hidden" : "signup__label"
            }
          >
            {label ?? copy.label}
          </span>
          <input
            className="signup__input"
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            placeholder={copy.placeholder}
            required
            aria-invalid={state.status === "error"}
          />
        </label>

        {/* Honigtopf gegen Bots — für Menschen unsichtbar, für Screenreader versteckt */}
        <div className="signup__trap" aria-hidden="true">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <button className="cta__button" type="submit" disabled={isPending}>
          {isPending ? copy.pending : copy.button}
        </button>
      </form>

      {state.status === "error" && state.message ? (
        <p className="signup__error" role="alert">
          {state.message}
        </p>
      ) : null}

    </div>
  );
}
