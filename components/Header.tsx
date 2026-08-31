import Image from "next/image";
import { site } from "@/lib/site";

/**
 * Der Kopf: Wortmarke links, Status rechts.
 *
 * Vorher klebte er oben und blendete per Scroll-Messung einen zweiten
 * Anmelde-Button ein, sobald das Feld im Einstieg weggescrollt war. Das
 * ist Conversion-Möbel und passt nicht zu einer Seite, deren Zweck es
 * ist, zu existieren und verlinkbar zu sein — die Anmeldung steht einmal
 * im Einstieg, das genügt.
 *
 * Damit fallen der Scroll-Listener, beide Zustände und die Kennungen
 * `HERO_CTA_ID` und `CLOSING_ID` weg; die Komponente braucht kein
 * "use client" mehr.
 */
export default function Header() {
  return (
    <header className="header">
      <div className="header__brand">
        <Image
          className="header__logo"
          src={site.logo}
          alt=""
          width={88}
          height={88}
          priority
        />
        <span className="header__name display">{site.name}</span>
      </div>

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
