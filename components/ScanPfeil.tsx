/**
 * Der Pfeil vom Aufnehmen zum Einordnen — die eine Animation auf der
 * Seite, die einen Ablauf erklärt statt ihn zu schmücken.
 *
 * Er sitzt in der Lücke, die `.shots[data-layout="gegenueber"]` seit
 * Phase 10 dafür freihält: Foto machen (links) → Fach zuweisen (rechts).
 * Der Bogen zeichnet sich beim Scrollen selbst, die Spitze kommt zuletzt.
 *
 * Rein dekorativ und deshalb `aria-hidden`: Was er zeigt, steht im Lead
 * der Sektion schon als Satz ("Heft aufschlagen, Foto machen, Fach
 * auswählen"). Ein Screenreader bekäme sonst dieselbe Information zweimal,
 * einmal davon als unbeschriftete Grafik.
 *
 * `pathLength="1"` normiert die Pfadlänge auf 1. Dadurch braucht die CSS
 * kein `getTotalLength()` aus JavaScript, um `stroke-dasharray` zu setzen —
 * die ganze Animation läuft ohne eine Zeile Skript.
 */
export default function ScanPfeil() {
  return (
    <svg
      className="scan-pfeil"
      viewBox="0 0 48 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="scan-pfeil__bogen"
        d="M3 19 C 13 5, 31 5, 44 14"
        pathLength="1"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        className="scan-pfeil__spitze"
        d="M36 14.1 L44 14 L41.3 6.6"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
