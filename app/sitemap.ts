import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Die Sitemap. Next erzeugt daraus /sitemap.xml — keine Datei zum Pflegen,
 * kein Paket, keine Adresse, die doppelt gepflegt werden muss. Sie kommt
 * aus `site.url`; sobald studytab.at läuft, ändert sich dort eine Zeile
 * und diese Datei zieht mit.
 *
 * Hier steht derzeit genau eine Adresse, und das ist Absicht:
 *
 * - /impressum und /datenschutz stehen auf `robots: { index: false }`,
 *   solange in ihnen Platzhalter in spitzen Klammern offen sind. Eine
 *   Sitemap, die Seiten anmeldet, die sich selbst von der Indexierung
 *   ausnehmen, widerspricht sich — Suchmaschinen werten das als Fehler.
 *   SOBALD DIE ANGABEN STEHEN: dort `index: true` setzen und beide
 *   Adressen hier eintragen.
 *
 * - /abmelden/<schlüssel> trägt einen persönlichen Schlüssel. Stünde eine
 *   dieser Adressen in einer Sitemap, könnte jeder darauf klicken und
 *   jemanden abmelden.
 *
 * - /opengraph-image und /twitter-image sind Vorschaubilder für geteilte
 *   Links und gehören nicht in die Suche.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
