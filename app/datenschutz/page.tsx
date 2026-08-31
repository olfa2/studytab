import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { legal, site } from "@/lib/site";

/* Wie im Impressum: nicht indexieren, solange Lücken offen sind. */
export const metadata: Metadata = {
  title: `${legal.datenschutz.title} — ${site.name}`,
  robots: { index: false, follow: true },
};

export default function Datenschutz() {
  return <LegalPage doc={legal.datenschutz} />;
}
