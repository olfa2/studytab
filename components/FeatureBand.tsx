import { site, type FeatureSection } from "@/lib/site";
import ScreenshotSlot from "./ScreenshotSlot";
import ScanPfeil from "./ScanPfeil";

/**
 * Eine der vier Funktions-Sektionen.
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
 *
 * Vier Attribute steuern das Aussehen, und keines davon ist eine Farbe
 * oder ein Pixelwert im JSX:
 *   data-form    die Grundform des Abschnitts (siehe unten)
 *   data-media   Bildseite im Desktop
 *   data-layout  wie die Telefone zueinander liegen
 *   data-akzent  welche Akzentfarbe der Abschnitt trägt
 *
 * `data-reveal` markiert die Teile, die beim Scrollen einlaufen. Die
 * Bewegung selbst steht vollständig in app/globals.css und braucht kein
 * JavaScript — ohne Unterstützung im Browser steht einfach alles sofort da.
 */
export default function FeatureBand({ section }: { section: FeatureSection }) {
  const offen = section.shots.every((shot) => shot.src === null);

  /*
   * `breit` ist keine zweispaltige Sektion und darf deshalb `band--split`
   * nicht erben — das setzt eine Flex-Zeile, gegen die jede Regel für die
   * volle Breite ankämpfen müsste. Die beiden anderen Formen sind
   * zweispaltig; ob sie zusätzlich eine getönte Karte sind, entscheidet
   * allein `data-form` im CSS.
   */
  const breit = section.form === "breit";
  const klassen = breit
    ? "band band--feature band--breit"
    : "band band--feature band--split";

  return (
    <section
      className={klassen}
      data-form={section.form}
      data-media={section.media}
      data-akzent={section.akzent}
      aria-labelledby={section.id}
    >
      <div className="band__body" data-reveal="text">
        <p className="band__kicker">{section.kicker}</p>
        <h2 className="band__title display" id={section.id}>
          {section.title}
        </h2>
        <p className="band__lead">{section.lead}</p>
      </div>

      <div className="band__visual" data-reveal="bild">
        <div className="shots" data-layout={section.layout}>
          {section.shots.map((shot, index) => (
            <ScreenshotSlot key={shot.file} screen={shot} index={index} />
          ))}
          {/*
           * Nur bei „gegenueber": Der Pfeil erklärt den Schritt zwischen
           * den beiden Bildern. Bei den anderen drei Anordnungen gibt es
           * keinen Ablauf zu zeigen — dort wäre er Dekoration.
           */}
          {section.layout === "gegenueber" ? <ScanPfeil /> : null}
        </div>
        {offen ? <p className="shots__note">{site.placeholderNote}</p> : null}
      </div>
    </section>
  );
}
