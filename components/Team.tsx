import Image from "next/image";
import { site } from "@/lib/site";

/**
 * "Ein Projekt von drei Schülern" — im Design war der Block reserviert
 * und leer. Bei einer Schul-App ist genau das der Vertrauensanker:
 * Wer dahintersteckt, überzeugt mehr als jedes Feature-Argument.
 *
 * Solange `site.team.photo` null ist, steht hier ein Platzhalter —
 * gleiche Machart wie bei den Screenshot-Slots.
 */
export default function Team() {
  const team = site.team;

  return (
    <section className="team" aria-labelledby="team">
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
            <span className="team__placeholder-size">quer, mindestens 1200 breit</span>
          </div>
        )}
      </div>

      <div className="team__body">
        <p className="team__kicker">{team.kicker}</p>
        <h2 className="team__title display" id="team">
          {team.title}
        </h2>
        <p className="team__text">{team.text}</p>
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
