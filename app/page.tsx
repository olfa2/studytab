import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeatureBand from "@/components/FeatureBand";
import PrivacySection from "@/components/PrivacySection";
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
 * Der Abschluss-Block mit der zweiten Anmeldung fehlt noch — er ist
 * Phase 17. `site.closing` liegt dafür bereit.
 */
export default function Home() {
  return (
    <main className="page">
      <Header />
      <Hero />

      {featureSections.map((section) => (
        <FeatureBand key={section.id} section={section} />
      ))}

      <PrivacySection />
      <Team />
      <Footer />
    </main>
  );
}
