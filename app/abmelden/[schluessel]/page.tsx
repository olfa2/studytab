import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AbmeldeForm from "@/components/AbmeldeForm";
import { istSchluessel } from "@/lib/signups";
import { site } from "@/lib/site";

/*
 * Nie indexieren: Diese Adressen enthalten einen persönlichen Schlüssel.
 * Landete einer in einer Suchmaschine, könnte jeder darauf klicken und
 * jemanden abmelden.
 */
export const metadata: Metadata = {
  title: `${site.abmelden.title} — ${site.name}`,
  robots: { index: false, follow: false },
};

/**
 * Die Abmeldeseite hinter dem Link aus der Start-Mail.
 *
 * Sie prüft hier nur die Form des Schlüssels, nicht ob es ihn gibt. Das ist
 * Absicht: Wer ausprobiert, dürfte sonst an der Antwort ablesen, welche
 * Schlüssel echt sind. Gelöscht — oder eben nicht — wird erst beim Knopf.
 */
export default async function Abmelden({
  params,
}: {
  params: Promise<{ schluessel: string }>;
}) {
  const { schluessel } = await params;
  const t = site.abmelden;
  const brauchbar = istSchluessel(schluessel);

  return (
    <main className="page">
      <Header />

      <section className="band abmelden" aria-labelledby="abmelden">
        <p className="band__kicker">{t.kicker}</p>
        <h1 className="band__title band__title--page display" id="abmelden">
          {brauchbar ? t.title : t.ungueltigTitle}
        </h1>
        <p className="band__lead">{brauchbar ? t.lead : t.ungueltigText}</p>

        {brauchbar ? <AbmeldeForm schluessel={schluessel} /> : null}

        <a className="legal__back" href="/">
          {t.zurueck}
        </a>
      </section>

      <Footer />
    </main>
  );
}
