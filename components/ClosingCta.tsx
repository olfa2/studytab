import Image from "next/image";
import { site } from "@/lib/site";
import SignupForm from "./SignupForm";

/**
 * Der Abschluss — die zweite und letzte Gelegenheit zu handeln.
 *
 * Die Seite hörte vorher einfach auf: Nach dem Team-Block kam die
 * Fußzeile. Wer bis dorthin gelesen hat, ist überzeugt — und fand genau
 * dann nichts mehr, was er hätte tun können. Das Anmeldefeld stand
 * ausschließlich im Einstieg, also vor allen Argumenten.
 *
 * Ozean wie der Einstieg, und das ist der Punkt: Die beiden farbigen
 * Flächen klammern die Seite. Was dazwischen liegt, liest sich dadurch
 * als ein Text mit Anfang und Ende statt als eine Reihe von Abschnitten,
 * die irgendwann aufhört.
 *
 * Die Texte liegen seit Wochen ungenutzt in lib/site.ts unter `closing`.
 */
export default function ClosingCta() {
  return (
    <section className="band band--abschluss ozean" aria-labelledby="abschluss">
      <div className="abschluss__body" data-reveal="text">
        {/*
         * Das App-Zeichen groß. Es ist das Einzige auf der Seite, das
         * nach dem Laden auf dem Startbildschirm wieder auftaucht —
         * hier steht es an der Stelle, an der jemand sich entscheidet.
         */}
        <Image
          className="abschluss__zeichen"
          src={site.logo}
          alt=""
          width={168}
          height={168}
        />

        <h2 className="band__title display" id="abschluss">
          {site.closing.title}
        </h2>
        <p className="band__lead">{site.closing.text}</p>

        {/*
         * Die Überschrift daneben sagt schon, worum es geht — die lange
         * Feldbeschriftung wäre dieselbe Aussage ein zweites Mal. Für
         * Screenreader bleibt sie über `labelHidden` erhalten.
         */}
        <SignupForm label={site.signup.labelShort} labelHidden />
      </div>
    </section>
  );
}
