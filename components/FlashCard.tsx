"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

/**
 * Die Karteikarte — die einzige Animation der Seite.
 * Sie dreht sich alle `site.flipSeconds` Sekunden von selbst und auf Tippen.
 * Wer Bewegung reduziert hat, bekommt nur die Handsteuerung.
 */
export default function FlashCard() {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const id = window.setInterval(
      () => setFlipped((value) => !value),
      site.flipSeconds * 1000,
    );
    return () => window.clearInterval(id);
  }, []);

  const card = site.flashcard;

  return (
    <div className="flash">
      <button
        type="button"
        className="flash__inner"
        data-flipped={flipped}
        onClick={() => setFlipped((value) => !value)}
        aria-label={
          flipped
            ? `Antwort: ${card.answer}. Zurück zur Frage.`
            : `Frage: ${card.question}. Karte umdrehen.`
        }
      >
        <div className="flash__face flash__face--front" aria-hidden={flipped}>
          <div className="flash__label">{card.frontLabel}</div>
          <div className="flash__question display">{card.question}</div>
          <div className="flash__hint">{card.hint}</div>
        </div>
        <div className="flash__face flash__face--back" aria-hidden={!flipped}>
          <div className="flash__label">{card.backLabel}</div>
          <div className="flash__answer display">{card.answer}</div>
          <div className="flash__hint">{card.backHint}</div>
        </div>
      </button>
    </div>
  );
}
