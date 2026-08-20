import { screens, site } from "@/lib/site";
import ScreenshotSlot from "./ScreenshotSlot";

/**
 * Der Screenshot-Streifen. Mobil scrollt er seitlich, auf dem Desktop
 * steht er in der rechten Hero-Spalte.
 */
export default function Screens() {
  const allPlaceholders = screens.every((screen) => screen.src === null);

  return (
    <section className="screens" aria-label={site.screensSection.title}>
      <h2 className="screens__title display">{site.screensSection.title}</h2>
      <p className="screens__subtitle">{site.screensSection.subtitle}</p>

      <div className="screens__strip">
        {screens.map((screen, index) => (
          <ScreenshotSlot key={screen.title} screen={screen} index={index} />
        ))}
      </div>

      {allPlaceholders ? (
        <p className="screens__note">{site.screensSection.placeholderNote}</p>
      ) : null}
    </section>
  );
}
