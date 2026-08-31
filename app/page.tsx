import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Screens from "@/components/Screens";
import Features from "@/components/Features";
import PrivacySection from "@/components/PrivacySection";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

/**
 * Fünf Bänder zwischen Kopf und Fuß. Die Bildseite wechselt abwärts ab:
 * Funktionen mit der Karteikarte rechts, Team mit dem Foto links.
 *
 * Der Abschluss-Block mit der zweiten Anmeldung ist entfallen — eine
 * Visitenkarte braucht keinen doppelten Handlungsaufruf. `site.closing`
 * bleibt in lib/site.ts stehen, falls die Seite nach dem Release doch
 * eine Conversion-Seite werden soll.
 */
export default function Home() {
  return (
    <main className="page">
      <Header />
      <Hero />
      <Screens />
      <Features />
      <PrivacySection />
      <Team />
      <Footer />
    </main>
  );
}
