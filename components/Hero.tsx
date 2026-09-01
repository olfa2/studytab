import { heroShot, site } from "@/lib/site";
import DownloadCta from "./DownloadCta";
import ScreenshotSlot from "./ScreenshotSlot";

/**
 * Der Einstieg — ein Band über die volle Breite.
 *
 * Kicker, Titel und Lead kommen aus dem gemeinsamen Band-Bestand, damit
 * dieser Abschnitt dieselbe Anatomie hat wie alle anderen. Rechts daneben
 * steht der Schnitt als ruhige Karte: kein Verlauf, kein Leuchtschatten,
 * keine gesättigte Farbe. Die Zahl war grün und damit das Auffälligste
 * im oberen Seitendrittel — an einer Stelle, an der man nichts tun kann.
 * Gesättigt ist hier jetzt allein der Anmeldeknopf.
 *
 * Die Screenshots der einzelnen Funktionen stehen in den vier Bändern
 * darunter (components/FeatureBand.tsx). Hier steht nur die Startseite —
 * das Bild, das die ganze App zeigt statt einer Funktion.
 */
export default function Hero() {
  return (
    <section className="band band--intro">
      <div className="band__body">
        {site.showScanLine ? (
          <p className="band__kicker">{site.scanLine}</p>
        ) : null}

        <h1 className="band__title band__title--page display">
          {site.headline}
        </h1>

        <p className="band__lead">{site.lede}</p>

        <DownloadCta />

        <p className="band__meta">{site.privacy}</p>
      </div>

      {/*
       * Das Bild der Startseite statt der Schnitt-Karte: Ein Screenshot
       * zeigt die App, eine erfundene Note behauptet sie nur. Solange
       * `heroShot.src` null ist, steht hier der Platzhalter.
       */}
      <div className="band__visual hero__shot">
        <ScreenshotSlot screen={heroShot} index={0} />
      </div>
    </section>
  );
}
