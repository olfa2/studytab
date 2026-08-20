import Image from "next/image";
import { SCREENSHOT_SIZE, type Screen } from "@/lib/site";

/**
 * Ein iPhone-Rahmen mit einem Screenshot-Slot.
 *
 * Solange `screen.src` null ist, steht hier der Platzhalter im echten
 * Screenshot-Format (1290 × 2796). Sobald ein Pfad in `lib/site.ts`
 * eingetragen ist, rendert an derselben Stelle das Bild — die Fassung,
 * die Maße und der Beschnitt bleiben gleich.
 */
export default function ScreenshotSlot({
  screen,
  index,
}: {
  screen: Screen;
  index: number;
}) {
  return (
    <div className="phone">
      <div className="phone__slot">
        {screen.src ? (
          <Image
            className="phone__shot"
            src={screen.src}
            alt={screen.alt}
            width={SCREENSHOT_SIZE.width}
            height={SCREENSHOT_SIZE.height}
            sizes="(min-width: 1024px) 232px, 186px"
            priority={index === 0}
          />
        ) : (
          <Placeholder screen={screen} index={index} />
        )}
      </div>
    </div>
  );
}

function Placeholder({ screen, index }: { screen: Screen; index: number }) {
  return (
    <div className="ph-surface slot-placeholder">
      <div className="slot-placeholder__kicker">Screenshot {index + 1}</div>
      <div className="slot-placeholder__title display">{screen.title}</div>
      <div className="slot-placeholder__caption">{screen.caption}</div>
      <div className="slot-placeholder__size">
        {SCREENSHOT_SIZE.width} × {SCREENSHOT_SIZE.height}
      </div>
    </div>
  );
}
