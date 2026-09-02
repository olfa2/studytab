import { featureSections, site } from "@/lib/site";
import ScreenshotSlot from "./ScreenshotSlot";

/**
 * Das Bento-Gitter — die Kurzfassung der vier Abschnitte, direkt unter
 * dem Einstieg.
 *
 * Warum überhaupt: Wer auf der Seite landet, weiß nach dem Einstieg, was
 * Studytab verspricht, aber nicht, was drin ist. Bis zur ersten Antwort
 * darauf musste man vorher eine ganze Bildschirmhöhe scrollen. Das
 * Gitter beantwortet es auf einen Blick und führt per Sprungmarke
 * dorthin, wo es ausführlich steht.
 *
 * Warum angeschnitten: Das Telefon läuft unten aus der Kachel heraus,
 * statt sauber darin zu stehen. Ein angeschnittenes Bild wirkt dichter —
 * und solange in den Rahmen noch Platzhalter stecken, verrät ein
 * Anschnitt weniger als eine vollständig sichtbare Attrappe.
 *
 * Kein neuer Text außer dem Vorspann: Beschriftung und Titel jeder
 * Kachel kommen aus derselben `featureSections`-Liste wie die Abschnitte
 * darunter. Sie können damit nicht auseinanderlaufen.
 */
export default function Bento() {
  return (
    <section className="band band--bento" aria-labelledby="bento">
      <div className="band__body" data-reveal="text">
        <p className="band__kicker">{site.bento.kicker}</p>
        <h2 className="band__title display" id="bento">
          {site.bento.title}
        </h2>
      </div>

      <div className="bento" data-reveal="bild">
        {featureSections.map((section) => (
          <a
            className="kachel"
            key={section.id}
            href={`#${section.id}`}
            data-ton={section.kachel}
          >
            <span className="kachel__kicker">{section.kicker}</span>
            <span className="kachel__titel display">{section.title}</span>

            {/*
             * Der Rahmen ist derselbe wie überall (components/ScreenshotSlot),
             * nur der Ausschnitt ist anders: Die Kachel schneidet ihn unten
             * ab. Damit bleibt es ein Gerät und wird keine zweite Bildsorte,
             * die man separat pflegen müsste.
             */}
            <div className="kachel__bild">
              <ScreenshotSlot screen={section.shots[0]} index={1} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
