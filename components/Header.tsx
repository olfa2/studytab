"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { site } from "@/lib/site";

/** Kennung des Anmeldefelds im Hero — daran hängt die Sichtbarkeit des CTA */
export const HERO_CTA_ID = "hero-cta";
/** Sprungziel des Header-Buttons */
export const CLOSING_ID = "anmelden";

/**
 * Der Kopf der Seite. Klebt oben, damit der Handlungsaufruf nicht
 * weggescrollt ist, sobald jemand die Seite tatsächlich liest.
 *
 * Zwei Zustände, beide aus derselben Messung:
 * - `data-stuck`   ab dem ersten Scrollen → Trennlinie nach unten
 * - `data-visible` sobald das Anmeldefeld im Hero hinter dem Kopf
 *                  verschwunden ist → Button. Vorher wäre er doppelt,
 *                  das Feld steht ja direkt darunter.
 *
 * Bewusst ein Scroll-Listener und kein IntersectionObserver: eine einzige
 * Quelle für beide Zustände, und die Messung ist direkt nachprüfbar. Die
 * Handlung im Listener ist ein Rechteck-Lesen — bei dieser Seitengröße
 * billiger als die Buchführung, die eine Drosselung kosten würde.
 */
export default function Header() {
  const kopf = useRef<HTMLElement>(null);
  const [stuck, setStuck] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const heroCta = document.getElementById(HERO_CTA_ID);

    const messen = () => {
      setStuck(window.scrollY > 4);

      // Ohne Bezugspunkt lieber dauerhaft zeigen als gar nicht
      if (!heroCta) {
        setCtaVisible(true);
        return;
      }

      const kopfhoehe = kopf.current?.offsetHeight ?? 0;
      setCtaVisible(heroCta.getBoundingClientRect().bottom < kopfhoehe);
    };

    messen();
    window.addEventListener("scroll", messen, { passive: true });
    window.addEventListener("resize", messen);

    return () => {
      window.removeEventListener("scroll", messen);
      window.removeEventListener("resize", messen);
    };
  }, []);

  const cta = site.released
    ? { href: site.appStoreUrl, label: "Download" }
    : { href: `#${CLOSING_ID}`, label: site.signup.button };

  return (
    <header className="header" data-stuck={stuck} ref={kopf}>
      <div className="header__brand">
        <Image
          className="header__logo"
          src={site.logo}
          alt=""
          width={88}
          height={88}
          priority
        />
        <span className="header__name display">{site.name}</span>
      </div>

      <a className="header__cta" href={cta.href} data-visible={ctaVisible}>
        {cta.label}
      </a>
    </header>
  );
}
