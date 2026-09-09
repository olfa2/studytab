import Image from "next/image";
import Link from "next/link";
import { featureSections, site } from "@/lib/site";

/**
 * Der Kopf: Wortmarke, Wegweiser, Status.
 *
 * Vorher standen hier nur Logo und "Bald im App Store". Auf einer Seite,
 * die nach dem Einstieg noch fünf Bildschirmhöhen weitergeht, war das
 * eine Sackgasse: Alle vier Funktionsabschnitte haben längst eine
 * Sprungmarke (`aria-labelledby` in FeatureBand), aber nichts führte
 * hin. Die Beschriftungen sind die Kicker der Abschnitte — sie kommen
 * aus lib/site.ts und bleiben damit automatisch in Deckung.
 *
 * Der Kopf klebt jetzt oben. Der Einstieg füllt den ersten Bildschirm;
 * ohne mitlaufenden Kopf wäre die Wortmarke nach einem Wisch weg und
 * käme erst am Seitenende wieder — bei einer Seite, deren Zweck es ist,
 * sich einzuprägen, ist das der falsche Handel.
 *
 * Vorher blendete er per Scroll-Messung einen zweiten Anmelde-Button
 * ein. Das ist Conversion-Möbel und bleibt draußen: Die zweite
 * Gelegenheit steht jetzt als eigener Abschluss-Abschnitt am Ende, wo
 * sie hingehört.
 */
export default function Header() {
  return (
    <header className="header">
      {/*
       * Zur Startseite, nicht zu "#top".
       *
       * Die Wortmarke zeigte auf "#top" — auf der Startseite scrollt das
       * nach oben, auf Impressum, Datenschutz und der Abmeldeseite
       * passiert damit gar nichts Sinnvolles: Man bleibt auf der
       * Unterseite und springt nur an deren Anfang. Ein Logo, das nicht
       * nach Hause führt, ist auf jeder Website eine Sackgasse.
       *
       * `Link` auf "/" macht beides richtig: Auf einer Unterseite
       * navigiert es zur Startseite, auf der Startseite selbst scrollt
       * Next bei gleicher Route ohnehin nach oben.
       */}
      <Link className="header__brand" href="/">
        <Image
          className="header__logo"
          src={site.logo}
          alt=""
          width={88}
          height={88}
          priority
        />
        <span className="header__name display">{site.name}</span>
      </Link>

      {/*
       * Nur ab Tablet-Breite. Auf 390px stünden vier weitere Wörter
       * neben Wortmarke und Status — die Zeile bräche um, und der Kopf
       * wäre doppelt so hoch wie der Inhalt darunter wert ist.
       */}
      <nav className="header__nav" aria-label="Abschnitte">
        {featureSections.map((section) => (
          <a className="header__navlink" key={section.id} href={`#${section.id}`}>
            {section.kicker}
          </a>
        ))}
      </nav>

      {site.released ? (
        <a className="header__link" href={site.appStoreUrl}>
          {site.release.link}
        </a>
      ) : (
        <span className="header__status">{site.release.pending}</span>
      )}
    </header>
  );
}
