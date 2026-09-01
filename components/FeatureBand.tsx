import { site, type FeatureSection } from "@/lib/site";
import ScreenshotSlot from "./ScreenshotSlot";

/**
 * Eine der vier Funktions-Sektionen: Text auf der einen Seite, Bilder auf
 * der anderen. Ersetzt das alte dreiteilige Funktionen-Band und den
 * Screenshot-Streifen — statt drei Zeilen nebeneinander bekommt jede
 * Funktion einen eigenen Abschnitt mit eigenen Bildern.
 *
 * Der Text steht IMMER zuerst im Markup. Auf welcher Seite die Bilder im
 * Desktop landen, macht `data-media` über `order` im CSS. Absicht: Mobil
 * wird gestapelt, und dort will man in jedem Abschnitt erst wissen, worum
 * es geht, und dann das Bild sehen — nicht mal so, mal so. Der Wechsel
 * links/rechts ist eine reine Desktop-Angelegenheit.
 *
 * Solange ein Bild `src: null` hat, rendert ScreenshotSlot den Platzhalter
 * mit dem erwarteten Dateinamen darin. Fassung und Maße sind dieselben wie
 * später beim echten Bild — es rutscht nichts, wenn die Fotos kommen.
 */
export default function FeatureBand({ section }: { section: FeatureSection }) {
  const offen = section.shots.every((shot) => shot.src === null);

  return (
    <section
      className="band band--split band--feature"
      data-media={section.media}
      aria-labelledby={section.id}
    >
      <div className="band__body">
        <p className="band__kicker">{section.kicker}</p>
        <h2 className="band__title display" id={section.id}>
          {section.title}
        </h2>
        <p className="band__lead">{section.lead}</p>
      </div>

      <div className="band__visual">
        <div className="shots" data-layout={section.layout}>
          {section.shots.map((shot, index) => (
            <ScreenshotSlot key={shot.file} screen={shot} index={index} />
          ))}
        </div>
        {offen ? <p className="shots__note">{site.placeholderNote}</p> : null}
      </div>
    </section>
  );
}
