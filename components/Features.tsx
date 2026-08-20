import { site } from "@/lib/site";
import FlashCard from "./FlashCard";

/**
 * Die drei Punkte. Auf dem Desktop ein Dreispalter, mobil untereinander.
 * Beim letzten (Karteikarten) steht die drehende Karte daneben — mobil
 * rutscht sie per CSS unter den Text, gerendert wird sie nur einmal.
 */
export default function Features() {
  return (
    <section className="features">
      {site.features.map((feature, index) => {
        const isLast = index === site.features.length - 1;

        return (
          <div className="feature" key={feature.number}>
            <div className="feature__body">
              <div className="feature__head">
                <span className="feature__number">{feature.number}</span>
                <h3 className="feature__title display">{feature.title}</h3>
              </div>
              <p className="feature__text">{feature.text}</p>
            </div>
            {isLast ? <FlashCard /> : null}
          </div>
        );
      })}
    </section>
  );
}
