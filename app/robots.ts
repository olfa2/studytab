import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Next erzeugt daraus /robots.txt.
 *
 * Der Abmeldeweg ist ausdrücklich gesperrt: Diese Adressen enthalten einen
 * persönlichen Schlüssel, und ein Suchmaschinen-Crawler, der ihn aufruft,
 * würde jemanden abmelden. Die Route selbst setzt zusätzlich
 * `robots: { index: false, follow: false }` — zwei Schlösser, weil ein
 * einzelnes hier eine gelöschte Anmeldung kostet.
 *
 * `disallow` ist keine Zugriffssperre, sondern eine Bitte an brave
 * Crawler. Dass ein Aufruf trotzdem niemanden abmeldet, stellt die Seite
 * selbst sicher: Sie fragt einmal nach und löscht erst auf Knopfdruck.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/abmelden/",
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
