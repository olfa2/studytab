import Image from "next/image";
import { SCREENSHOT_SIZE, type Screen } from "@/lib/site";

/**
 * Ein iPhone mit einem Screenshot darin.
 *
 * Die Screenshots sind fertige Gerätemockups: Fassung, Tasten und Dynamic
 * Island stecken im Bild, der Grund ist durchsichtig. Mit Bild rendert
 * hier deshalb nur die Datei selbst — ein Rahmen aus CSS läge sonst als
 * zweites Telefon um das Telefon im Bild.
 *
 * `.phone` bleibt in beiden Fällen die äußere Klasse. Daran hängen Größe,
 * Drehung und Einblenden der vier Anordnungen, und die sollen für Bild
 * und Platzhalter dieselben sein.
 *
 * Solange `screen.src` null ist, zeichnet das CSS das Gerät nach. Drei
 * verschachtelte Ebenen, weil ein Telefon aus drei Ebenen besteht:
 *
 *   .phone           der Titanrand — die schmale helle Kante außen
 *   .phone__rahmen   die schwarze Blende dahinter
 *   .phone__slot     das Glas, in dem der Platzhalter liegt
 *
 * `sizes` sagt dem Browser, wie breit das Bild dargestellt wird — daraus
 * wählt er die passende Größenstufe. Der Standard deckt die Sektionen ab,
 * deren größtes Telefon 268px breit ist. Der Einstieg ist breiter und gibt
 * seinen Wert selbst mit. Ein zu kleiner Hinweis liefert ein zu kleines
 * Bild und macht die Screenshots unscharf.
 */
export default function ScreenshotSlot({
  screen,
  index,
  sizes = "(min-width: 1024px) 268px, 240px",
}: {
  screen: Screen;
  index: number;
  sizes?: string;
}) {
  if (screen.src) {
    const size = screen.size ?? SCREENSHOT_SIZE;

    return (
      <div className="phone phone--bild">
        <Image
          className="phone__bild"
          src={screen.src}
          alt={screen.alt}
          width={size.width}
          height={size.height}
          sizes={sizes}
          preload={index === 0}
        />
      </div>
    );
  }

  return (
    <div className="phone">
      <div className="phone__rahmen">
        <div className="phone__slot">
          <Placeholder screen={screen} />

          {/*
           * Die Dynamic Island. Nur im Platzhalter — die Mockups bringen
           * ihre eigene mit. Ihre Maße stehen in `cqw` — Prozent der
           * Glasbreite — und stimmen dadurch bei jeder Telefongröße auf
           * der Seite, vom 121px-Handkartenfächer bis zum 300px-Einstieg.
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
