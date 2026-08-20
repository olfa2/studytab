import { site } from "@/lib/site";

/**
 * Der dunkle Block. Auf der ganzen Seite die einzige Stelle, an der die
 * Farbe kippt — das Thema, bei dem Vertrauen entsteht, bekommt dafür
 * den Platz, den es vorher als 12,5-px-Fußnote nicht hatte.
 *
 * Der Inhalt ist am App-Repo geprüft und deckt sich mit dem "Kurz gesagt"
 * der Datenschutz-Seite in der App. Siehe die Belege in lib/site.ts.
 */
export default function PrivacySection() {
  const block = site.privacySection;

  return (
    <section className="privacy-block" aria-labelledby="datenschutz">
      <p className="privacy-block__kicker">{block.kicker}</p>

      <h2 className="privacy-block__title display" id="datenschutz">
        {block.title}
      </h2>

      <p className="privacy-block__lead">{block.lead}</p>

      <ul className="privacy-block__grid">
        {block.claims.map((claim) => (
          <li className="claim" key={claim.title}>
            <span className="claim__dot" aria-hidden="true" />
            <h3 className="claim__title display">{claim.title}</h3>
            <p className="claim__text">{claim.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
