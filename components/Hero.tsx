import { heroShot, site } from "@/lib/site";
import DownloadCta from "./DownloadCta";
import ScreenshotSlot from "./ScreenshotSlot";

/**
 * Der Einstieg.
 *
 * Aus dem Entwurf `studytab-hero.html` sind der helle Grund mit dem
 * weichen Lichtschein geblieben, die Release-Marke über der Schlagzeile,
 * die Zusicherungen als Marken und die abgerundeten Ecken an Feld und
 * Knopf.
 *
 * Was der Entwurf rechts hatte — Maskottchen im Farbkreis, dazu zwei
 * schwebende Karten mit "Semesterschnitt 1,4" und "12 Tage Lernserie" —
 * ist wieder entfallen. Dort steht jetzt der Screenshot der Startseite.
 *
 * Der Tausch hat einen Nebeneffekt, der zählt: Auf der Seite steht damit
 * keine erfundene Zahl mehr. Die beiden Karten waren die einzige Stelle,
 * an der eine Angabe nicht aus der App kam.
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

        <ul className="zusagen">
          {site.zusicherungen.map((zusage) => (
            <li className="zusagen__punkt" key={zusage}>
              {zusage}
            </li>
          ))}
        </ul>
      </div>

      <div className="band__visual hero__shot">
        {/* Die Breiten stehen bei .hero__shot in app/globals.css */}
        <ScreenshotSlot
          screen={heroShot}
          index={0}
          sizes="(min-width: 1024px) 365px, 304px"
        />
      </div>
    </section>
  );
}
