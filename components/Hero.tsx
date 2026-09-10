import Image from "next/image";
import { site } from "@/lib/site";
import DownloadCta from "./DownloadCta";

/**
 * Der Einstieg.
 *
 * Nach dem Entwurf `studytab-hero.html`: heller Grund mit einem weichen
 * Lichtschein statt der ganzflächigen Ozean-Farbe, links der Text, rechts
 * das Maskottchen in einem Farbkreis, dazu zwei schwebende Karten.
 *
 * WAS SICH DAMIT ÄNDERT
 *
 * Vorher stand rechts der Screenshot der Startseite. Das Maskottchen ist
 * das, was man nach einer Sekunde wiedererkennt — genau das fehlte der
 * Seite (Markenidentität 4 von 10 im Prüfbericht). Die zehn übrigen
 * Screenshots stehen weiterhin in den vier Abschnitten darunter; dort
 * zeigen sie etwas, das man auch verstehen kann.
 *
 * Der Abschluss-Block bleibt Ozean. Die Klammer aus zwei farbigen Flächen
 * ist damit einseitig geworden — dafür trägt der Einstieg jetzt eine
 * Figur, und die trägt weiter.
 *
 * Texte kommen wie überall aus lib/site.ts. Der Entwurf brachte zwei
 * Sätze mit, die vor Kurzem bewusst entfernt wurden (der Semester-Satz im
 * Vorspann und "genau einmal" unter dem Feld) — sie sind hier absichtlich
 * NICHT übernommen.
 */
export default function Hero() {
  return (
    <section className="band band--intro">
      <div className="band__body">
        {/*
         * Die Release-Angabe steht im Kopf schon einmal. Hier ist sie
         * keine Wiederholung, sondern die Antwort auf die erste Frage,
         * die jeder an eine App-Seite hat: Kann ich sie schon laden?
         */}
        <p className="einstieg__marke">
          <span className="einstieg__punkt" aria-hidden="true" />
          {site.release.pending}
        </p>

        <h1 className="band__title band__title--page display">
          {site.headline}
        </h1>

        <p className="band__lead">{site.lede}</p>

        <DownloadCta />

        {/*
         * Die drei Zusicherungen, im Entwurf als weiße Marken statt als
         * Zeile mit Trennpunkten. Dieselben drei Wörter, dieselbe Stelle —
         * nur lesen sie sich als einzelne Zusagen statt als Aufzählung.
         */}
        <ul className="zusagen">
          {site.zusicherungen.map((zusage) => (
            <li className="zusagen__punkt" key={zusage}>
              {zusage}
            </li>
          ))}
        </ul>
      </div>

      <div className="band__visual einstieg__buehne">
        {/*
         * Kreis und gestrichelter Ring liegen hinter der Figur und tragen
         * keine Bedeutung — deshalb `aria-hidden` und keine Beschriftung.
         */}
        <span className="einstieg__kreis" aria-hidden="true" />
        <span className="einstieg__ring" aria-hidden="true" />

        <Image
          className="einstieg__figur"
          src={site.hero.maskottchen}
          alt={site.hero.maskottchenAlt}
          width={485}
          height={604}
          sizes="(min-width: 1024px) 380px, 320px"
          priority
        />

        {/*
         * Die zwei schwebenden Karten. Ihre Zahlen sind Beispielwerte —
         * die einzige Stelle der Seite, an der eine Zahl steht, die nicht
         * aus der App kommt. So entschieden; wer es ändert, ändert es in
         * lib/site.ts unter `hero`.
         */}
        <div className="einstieg__karte einstieg__karte--schnitt">
          <span className="einstieg__karte-label">{site.hero.schnittLabel}</span>
          <span className="einstieg__karte-zahl">{site.hero.schnittWert}</span>
        </div>

        <div className="einstieg__karte einstieg__karte--serie">
          <Image
            className="einstieg__flamme"
            src={site.hero.flamme}
            alt=""
            width={595}
            height={863}
            sizes="30px"
          />
          <span>
            <span className="einstieg__karte-wert">{site.hero.serieWert}</span>
            <span className="einstieg__karte-unter">{site.hero.serieLabel}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
