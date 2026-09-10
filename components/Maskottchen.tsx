/**
 * Das Maskottchen als flache Zeichnung.
 *
 * WARUM NICHT DAS BILD AUS DEM ENTWURF
 *
 * Dort lag ein 3D-Render eines Bären. Zwei Dinge sprachen dagegen: Es
 * sah nach erzeugtem Bild aus, und es war das falsche Tier — im App-Icon
 * sitzt ein Wasserschwein, flach gezeichnet.
 *
 * Diese SVG ist aus denselben Formen gebaut wie das Icon: Kopf, zwei
 * Ohren, zwei große Augen mit Lichtpunkt, Schnauze mit zwei Nüstern und
 * dem Y-Mund. Die Farben sind aus public/studytab-logo.jpg abgetastet
 * und stehen als Tokens in globals.css — Icon und Seite können damit
 * nicht auseinanderlaufen.
 *
 * Als SVG statt als Bilddatei: Sie ist bei jeder Größe scharf, wiegt
 * unter zwei Kilobyte statt 335, und die Farben lassen sich über die
 * Tokens ändern, ohne ein Grafikprogramm zu öffnen.
 *
 * `aria-hidden`, weil daneben die Schlagzeile steht, die dasselbe sagt.
 * Ein Screenreader liest hier sonst eine Bildbeschreibung vor, die nichts
 * hinzufügt.
 */
export default function Maskottchen({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 250"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Ohren — liegen hinter dem Kopf, damit die Ansätze verdeckt sind */}
      <g fill="var(--fell-ohr)">
        <ellipse cx="56" cy="56" rx="33" ry="37" transform="rotate(-18 56 56)" />
        <ellipse cx="184" cy="56" rx="33" ry="37" transform="rotate(18 184 56)" />
      </g>
      <g fill="var(--fell-ohr-innen)">
        <ellipse cx="58" cy="60" rx="18" ry="21" transform="rotate(-18 58 60)" />
        <ellipse cx="182" cy="60" rx="18" ry="21" transform="rotate(18 182 60)" />
      </g>

      {/* Kopf */}
      <path
        fill="var(--fell)"
        d="M120 40c53 0 92 34 92 90 0 58-39 92-92 92s-92-34-92-92c0-56 39-90 92-90Z"
      />

      {/* Augen: große weiße Ovale, wie im Icon fast bis zur Kopfmitte */}
      <g fill="var(--auge)">
        <ellipse cx="80" cy="128" rx="29" ry="38" />
        <ellipse cx="160" cy="128" rx="29" ry="38" />
      </g>

      {/*
       * Die Pupillen sitzen leicht nach innen und unten — das ist der
       * Unterschied zwischen „schaut dich an" und „starrt ins Leere".
       */}
      <g fill="var(--pupille)">
        <ellipse cx="86" cy="134" rx="18" ry="26" />
        <ellipse cx="154" cy="134" rx="18" ry="26" />
      </g>

      {/* Lichtpunkt, im Icon eine Kerbe oben links in der Pupille */}
      <g fill="var(--auge)">
        <circle cx="79" cy="121" r="7" />
        <circle cx="147" cy="121" r="7" />
      </g>

      {/* Schnauze */}
      <ellipse cx="120" cy="180" rx="45" ry="39" fill="var(--schnauze)" />

      {/* Nüstern */}
      <g fill="var(--zug)">
        <ellipse cx="105" cy="170" rx="5.5" ry="7.5" />
        <ellipse cx="135" cy="170" rx="5.5" ry="7.5" />
      </g>

      {/* Der Y-Mund */}
      <path
        d="M120 180v14m0 0c-4 9-13 12-19 8m19-8c4 9 13 12 19 8"
        stroke="var(--zug)"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
