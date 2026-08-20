import { site } from "@/lib/site";
import DownloadCta from "./DownloadCta";
import { CLOSING_ID } from "./Header";

/**
 * Der Abschluss. Wer bis hierher gelesen hat, ist überzeugt — und hätte
 * ohne diesen Block keine Möglichkeit mehr zu handeln, weil der Hero
 * längst weggescrollt ist.
 *
 * Die Feldbeschriftung ist hier nur für Screenreader da: Die Überschrift
 * daneben sagt sehenden Leuten bereits, worum es geht.
 */
export default function ClosingCta() {
  const copy = site.closing;

  return (
    <section className="closing" id={CLOSING_ID} aria-labelledby="abschluss">
      <div className="closing__copy">
        <h2 className="closing__title display" id="abschluss">
          {copy.title}
        </h2>
        <p className="closing__text">{copy.text}</p>
      </div>

      <div className="closing__action">
        <DownloadCta signupLabel={site.signup.labelShort} signupLabelHidden />
      </div>
    </section>
  );
}
