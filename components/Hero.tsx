import { site } from "@/lib/site";
import DownloadCta from "./DownloadCta";

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
 * Der Screenshot-Streifen ist kein Teil des Einstiegs mehr, sondern ein
 * eigenes Band darunter (components/Screens.tsx).
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

      <aside className="average" aria-label={site.average.label}>
        <div className="average__label">{site.average.label}</div>
        <div className="average__value display">{site.average.value}</div>
        <div className="average__term">{site.average.term}</div>
        <div className="average__note">{site.average.note}</div>
      </aside>
    </section>
  );
}
