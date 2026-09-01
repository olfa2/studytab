import { site } from "@/lib/site";

/**
 * Das dunkle Band. Auf der ganzen Seite die einzige Stelle, an der die
 * Farbe kippt — bewusst gesetzt, damit die Seite einen Merkpunkt hat.
 *
 * Der Inhalt ist am App-Repo geprüft und deckt sich mit dem "Kurz gesagt"
 * der Datenschutz-Seite in der App. Siehe die Belege in lib/site.ts.
 *
 * Die Überschrift lief vorher mit 46px aus der Reihe, während gleich-
 * rangige Abschnitte bei 25–34px lagen; sie folgt jetzt der Skala.
 */
export default function PrivacySection() {
  const block = site.privacySection;

  return (
    <section
      className="band band--dark"
      aria-labelledby="datenschutz"
    >
      <p className="band__kicker">{block.kicker}</p>

      <h2 className="band__title display" id="datenschutz">
        {block.title}
      </h2>

      <p className="band__lead">{block.lead}</p>

      <ul className="claims">
        {block.claims.map((claim) => (
          <li className="claim" key={claim.title}>
            <span className="claim__dot" aria-hidden="true" />
            <h3 className="claim__title display">{claim.title}</h3>
            <p className="claim__text">{claim.text}</p>
          </li>
        ))}
      </ul>

      {/*
        * Der Satz stand vorher klein im Einstieg. Dort ist jetzt die kurze
        * Zusicherungs-Zeile — aber diese Fassung ist WORTGLEICH mit dem
        * "Kurz gesagt" der Datenschutz-Seite in der App und muss es
        * bleiben. Sie darf deshalb nicht verlorengehen und steht jetzt
        * dort, wo sie ohnehin hingehört: im Datenschutz-Band.
        */}
      <p className="band__meta privacy__satz">{site.privacy}</p>
    </section>
  );
}
