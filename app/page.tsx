import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PrivacySection from "@/components/PrivacySection";
import Team from "@/components/Team";
import ClosingCta from "@/components/ClosingCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="page">
      <Header />
      <Hero />
      <Features />
      <PrivacySection />
      <Team />
      <ClosingCta />
      <Footer />
    </main>
  );
}
