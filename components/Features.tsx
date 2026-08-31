import { site } from "@/lib/site";
import FlashCard from "./FlashCard";

/**
 * Die drei Funktionen als geteiltes Band: Text links, die drehende
 * Karteikarte rechts in der Bildspalte.
 *
 * Vorher waren es drei gleichwertige Spalten mit Trennlinien und ohne
 * Abschnittskopf — die Punkte standen ohne Überschrift im Raum, und die
 * Karteikarte klebte als vierter Fremdkörper in der letzten Spalte.
 * Jetzt hat der Abschnitt einen Kopf wie jeder andere, und die Karte ist
 * das Bild des Bandes.
 *
 * Reihenfolge im Markup ist Text vor Bild, damit mobil zuerst gelesen
 * wird, worum es geht, und die Karte darunter rutscht.
 */
export default function Features() {
  return (
    <section className="band band--split" aria-labelledby="features">
      <div className="band__body">
        <p className="band__kicker">{site.featuresSection.kicker}</p>
        <h2 className="band__title display" id="features">
          {site.featuresSection.title}
        </h2>
        <p className="band__lead">{site.featuresSection.lead}</p>

        <ul className="points">
          {site.features.map((feature) => (
            <li className="point" key={feature.number}>
              <span className="point__number">{feature.number}</span>
              <div>
                <h3 className="point__title display">{feature.title}</h3>
                <p className="point__text">{feature.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="band__visual">
        <FlashCard />
      </div>
    </section>
  );
}
