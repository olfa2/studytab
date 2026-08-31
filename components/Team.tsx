import Image from "next/image";
import { site } from "@/lib/site";

/**
 * "Ein Projekt von drei Schülern" — bei einer Schul-App der Vertrauens-
 * anker: Wer dahintersteckt, überzeugt mehr als jedes Feature-Argument.
 * Für Presse und Wettbewerbe ist es ohnehin der wichtigste Block.
 *
 * Dieser Abschnitt war die Vorlage für das Band-System, nicht dessen
 * Baustelle: Aufbau, Texte und Reihenfolge sind unverändert, er trägt
 * jetzt nur die gemeinsamen Klassennamen. Bild zuerst im Markup — damit
 * es auf dem Desktop links steht und mobil oben, so wie bisher.
 *
 * Solange `site.team.photo` null ist, steht hier ein Platzhalter.
 */
export default function Team() {
  const team = site.team;

  return (
    <section className="band band--split" aria-labelledby="team">
      <div className="band__visual">
        <div className="team__photo">
          {team.photo ? (
            <Image
              className="team__image"
              src={team.photo}
              alt={team.photoAlt}
              width={1200}
              height={900}
              sizes="(min-width: 1024px) 460px, 100vw"
            />
          ) : (
            <div className="ph-surface team__placeholder">
              <span className="team__placeholder-kicker">Foto</span>
              <span className="team__placeholder-text">
                Ein Bild von euch dreien
              </span>
              <span className="team__placeholder-size">
                quer, mindestens 1200 breit
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="band__body">
        <p className="band__kicker">{team.kicker}</p>
        <h2 className="band__title display" id="team">
          {team.title}
        </h2>
        <p className="band__text">{team.text}</p>
        <p className="team__meta">
          {team.names}
          <span className="team__sep"> · </span>
          {team.school}
        </p>
        <a className="team__contact" href={team.contact.href}>
          {team.contact.label}
        </a>
      </div>
    </section>
  );
}
