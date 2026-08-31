import { Fragment } from "react";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Der Block "Ein Projekt von drei Schülern" stand im Design hier und
          war leer — er ist jetzt ein eigener Abschnitt (components/Team.tsx),
          weiter oben, wo er gelesen wird. Der Platzhalter-Abstand dafür ist
          entfallen; den Abstand macht jetzt der Bandrhythmus. */}
      <div className="footer__bar">
        {site.footer.links.map((link, index) => (
          <Fragment key={link.href}>
            {index > 0 ? <span className="footer__dot">·</span> : null}
            <a href={link.href}>{link.label}</a>
          </Fragment>
        ))}
        <span className="footer__copyright">{site.footer.copyright}</span>
      </div>
    </footer>
  );
}
