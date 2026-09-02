import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Bento from "@/components/Bento";
import FeatureBand from "@/components/FeatureBand";
import PrivacySection from "@/components/PrivacySection";
import ClosingCta from "@/components/ClosingCta";
import Team from "@/components/Team";
import Footer from "@/components/Footer";
import { featureSections } from "@/lib/site";

/**
 * Einstieg, vier Funktions-Sektionen, Datenschutz, Team.
 *
 * Vorher standen hier ein Screenshot-Streifen und ein dreiteiliges
 * Funktionen-Band mit je einer Zeile Text. Jetzt bekommt jede Funktion
 * einen eigenen Abschnitt mit eigenen Bildern — die Sektionen kommen aus
 * `featureSections` in lib/site.ts, eine weitere wäre ein Eintrag mehr.
 *
 * Die Bildseite wechselt abwärts ab. Welche Seite, steht als `media` am
 * Eintrag; gemacht wird es per `order` im CSS, damit mobil überall zuerst
 * der Text steht.
 *
 * Der Abschluss-Block steht jetzt hinter dem Team: Wer bis dorthin
 * liest, ist überzeugt und fand vorher keine Möglichkeit mehr zu
 * handeln — das Anmeldefeld stand nur im Einstieg, also vor allen
 * Argumenten.
 */
export default function Home() {
  return (
    <main className="page">
      <Header />
      <Hero />
      <Bento />

      {featureSections.map((section) => (
        <FeatureBand key={section.id} section={section} />
      ))}

      <PrivacySection />
      <Team />
      <ClosingCta />
      <Footer />
    </main>
  );
}
