import Image from "next/image";
import { SCREENSHOT_SIZE, type Screen } from "@/lib/site";

/**
 * Ein iPhone mit einem Screenshot darin.
 *
 * Drei verschachtelte Ebenen, weil ein Telefon aus drei Ebenen besteht:
 *
 *   .phone           der Titanrand — die schmale helle Kante außen
 *   .phone__rahmen   die schwarze Blende dahinter
 *   .phone__slot     das Glas, in dem der Screenshot liegt
 *
 * Vorher war es ein schwarzes Rechteck mit einem Schatten. Bei einer
 * Seite, die eine iPhone-App verkauft, ist der Gerätemockup das Erste,
 * woran man Handarbeit von Bausatz unterscheidet — und elf Bildplätze
 * heißt: Der Rahmen entscheidet über den Eindruck der halben Seite.
 *
 * Solange `screen.src` null ist, steht im Glas der Platzhalter im echten
 * Screenshot-Format (1290 × 2796). Sobald ein Pfad in `lib/site.ts`
 * eingetragen ist, rendert an derselben Stelle das Bild — Fassung, Maße
 * und Beschnitt bleiben gleich.
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
      <div className="phone__rahmen">
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
            <Placeholder screen={screen} />
          )}

          {/*
           * Die Dynamic Island. Sie liegt ÜBER dem Screenshot, weil sie
           * auf einem echten Gerät auch über dem Bild liegt: Ein
           * iOS-Screenshot enthält die Fläche, aber nicht die Aussparung.
           * Ihre Maße stehen in `cqw` — Prozent der Glasbreite — und
           * stimmen dadurch bei jeder Telefongröße auf der Seite, vom
           * 121px-Handkartenfächer bis zum 300px-Einstieg.
           */}
          <span className="phone__insel" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

/**
 * Der Platzhalter nennt den Dateinamen, unter dem das Bild erwartet wird.
 * Wer die Seite ansieht und wer fotografiert, sind hier nicht dieselbe
 * Person — der Dateiname im Kasten erspart die Rückfrage.
 */
function Placeholder({ screen }: { screen: Screen }) {
  return (
    <div className="ph-surface slot-placeholder">
      <div className="slot-placeholder__title display">{screen.title}</div>
      <div className="slot-placeholder__caption">{screen.caption}</div>
      <div className="slot-placeholder__file">{screen.file}</div>
      <div className="slot-placeholder__size">
        {SCREENSHOT_SIZE.width} × {SCREENSHOT_SIZE.height}
      </div>
    </div>
  );
}
