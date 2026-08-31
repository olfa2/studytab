import { site } from "@/lib/site";
import SignupForm from "./SignupForm";

/**
 * Der Handlungsaufruf.
 *
 * Vor dem Release gibt es nichts herunterzuladen — dort steht deshalb
 * die Anmeldung für die Start-Benachrichtigung statt eines toten Buttons.
 * Nach dem Release (`site.released = true`) der echte Download.
 *
 * Steht einmal auf der Seite, im Einstieg. Die Props für eine verkürzte,
 * nur vorgelesene Feldbeschriftung sind mit dem Abschluss-Block entfallen,
 * der sie als einziger gesetzt hat; SignupForm kann das weiterhin.
 */
export default function DownloadCta() {
  if (!site.released) {
    return <SignupForm />;
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
