import { site } from "@/lib/site";
import SignupForm from "./SignupForm";

type Props = {
  /** Kurze Feldbeschriftung, nur für Screenreader (Abschluss-Block) */
  signupLabel?: string;
  signupLabelHidden?: boolean;
};

/**
 * Der Handlungsaufruf.
 *
 * Vor dem Release gibt es nichts herunterzuladen — dort steht deshalb
 * die Anmeldung für die Start-Benachrichtigung statt eines toten Buttons.
 * Nach dem Release (`site.released = true`) der echte Download.
 *
 * Kommt zweimal vor: im Hero und im Abschluss-Block.
 */
export default function DownloadCta({
  signupLabel,
  signupLabelHidden,
}: Props = {}) {
  if (!site.released) {
    return <SignupForm label={signupLabel} labelHidden={signupLabelHidden} />;
  }

  return (
    <div className="cta">
      <div className="cta__row">
        <a
          className="cta__button"
          href={site.appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download now
        </a>
        {/* Platzhalter — hier kommt das offizielle App-Store-Badge von Apple hin */}
        <div className="cta__badge">
          Platzhalter
          <br />
          App-Store-Badge
        </div>
      </div>
    </div>
  );
}
