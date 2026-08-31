import { screens, site } from "@/lib/site";
import ScreenshotSlot from "./ScreenshotSlot";

/**
 * Der Screenshot-Streifen als eigenes Band über die volle Breite.
 *
 * Vorher stand er in der rechten Spalte des Einstiegs — drei Geräte in
 * 560px, weshalb das erste per `margin-top` versetzt werden musste, damit
 * es überhaupt passte. Über die ganze Breite braucht es den Kniff nicht.
 * Mobil scrollt der Streifen weiterhin seitlich.
 */
export default function Screens() {
  const allPlaceholders = screens.every((screen) => screen.src === null);

  return (
    <section className="band" aria-labelledby="screens">
      <p className="band__kicker">{site.screensSection.kicker}</p>
      <h2 className="band__title display" id="screens">
        {site.screensSection.title}
      </h2>
      <p className="band__lead">{site.screensSection.subtitle}</p>

      <div className="screens__strip">
        {screens.map((screen, index) => (
          <ScreenshotSlot key={screen.title} screen={screen} index={index} />
        ))}
      </div>

      {allPlaceholders ? (
        <p className="band__meta">{site.screensSection.placeholderNote}</p>
      ) : null}
    </section>
  );
}
