import Image from "next/image";
import { site } from "@/lib/site";

/**
 * Die Fußzeile.
 *
 * Vorher war sie eine einzelne dünne Zeile: drei Links, ein Copyright,
 * fertig. Auf einer Seite, die mit Ehrlichkeit und Sorgfalt wirbt, ist
 * ausgerechnet der Ort, an dem Impressum und Datenschutz stehen, der
 * falsche zum Sparen — dort schaut nach, wer es genau wissen will.
 *
 * Jetzt zwei Ebenen: die Marke, und darunter Rechtliches und Copyright.
 * Der Punkt zwischen den Links kommt weiterhin aus dem Markup, damit er
 * beim Umbruch sauber mitgeht.
 *
 * Kein neuer Text — es steht nichts hier, was nicht schon in
 * lib/site.ts stand.
 */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__marke">
        <Image
          className="footer__logo"
          src={site.logo}
          alt=""
          width={88}
          height={88}
        />
        <span className="footer__name display">{site.name}</span>
      </div>

      <div className="footer__bar">
        <nav className="footer__links" aria-label="Rechtliches">
          {site.footer.links.map((link) => (
            <a className="footer__link" key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <span className="footer__copyright">{site.footer.copyright}</span>
      </div>
    </footer>
  );
}
