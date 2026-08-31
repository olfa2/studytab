import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { legal, site } from "@/lib/site";

/*
 * `index: false` steht hier, solange die Seite ein Gerüst ist: Ein
 * unfertiges Impressum in der Suche ist schlechter als keines. Sobald
 * die Lücken gefüllt sind, gehört das `robots`-Feld ersatzlos weg —
 * ein Impressum soll gefunden werden.
 */
export const metadata: Metadata = {
  title: `${legal.impressum.title} — ${site.name}`,
  robots: { index: false, follow: true },
};

export default function Impressum() {
  return <LegalPage doc={legal.impressum} />;
}
