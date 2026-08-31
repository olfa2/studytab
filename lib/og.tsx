import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

/**
 * Das Vorschaubild für geteilte Links — 1200 × 630.
 *
 * Liegt hier und nicht in der Route, weil Open Graph und Twitter dasselbe
 * Bild zeigen sollen: app/opengraph-image.tsx und app/twitter-image.tsx
 * rufen beide diese Funktion auf, statt die Zeichnung zu verdoppeln.
 *
 * Aufbau ist die Anatomie der Seite selbst — grauer Grund (--page), weiße
 * Karte mit Hairline darauf (--surface, --line). Wer den Link teilt, sieht
 * dasselbe Bild wie beim Klicken.
 *
 * Zwei Dinge sind hier anders als im CSS:
 *
 * 1. Keine Tokens. Satori kennt keine CSS-Variablen, die Farben stehen als
 *    Zahlen da. Sie sind eins zu eins aus :root in app/globals.css — wer
 *    die Skala dort ändert, muss hier nachziehen.
 * 2. Keine Marken-Schrift. Baloo 2 und Nunito kommen über next/font aus dem
 *    Netz; ImageResponse braucht die Schrift als Datei. Solange keine .ttf
 *    im Projekt liegt, zeichnet Satori in seiner eigenen Grotesk.
 *
 * Blau kommt bewusst nicht vor: Es ist in diesem System die Aktionsfarbe,
 * und in einem Bild gibt es nichts anzuklicken. Farbe trägt allein das Logo.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.og.alt;

/* Aus :root in app/globals.css — Satori kann keine CSS-Variablen lesen */
const PAGE = "#f5f7fa";
const SURFACE = "#ffffff";
const LINE = "#dde0e8";
const INK = "#1c1f29";
const MUTED = "#4e5563";
const SOFT = "#9aa1af";

export async function renderOgImage() {
  const logo = await readFile(
    join(process.cwd(), "public", "studytab-logo.jpg"),
  );
  const logoSrc = `data:image/jpeg;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: PAGE,
          padding: 44,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: SURFACE,
            border: `1px solid ${LINE}`,
            borderRadius: 28,
            padding: "56px 64px",
          }}
        >
          {/* Wortmarke — genau wie im Kopf der Seite */}
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <img
              src={logoSrc}
              width={88}
              height={88}
              style={{ borderRadius: 26 }}
              alt=""
            />
            <div
              style={{
                display: "flex",
                fontSize: 50,
                fontWeight: 800,
                color: INK,
                letterSpacing: "-0.02em",
              }}
            >
              {site.name}
            </div>
          </div>

          {/* Die Schlagzeile — das Größte im Bild, so wie auf der Seite */}
          <div
            style={{
              display: "flex",
              maxWidth: 940,
              fontSize: 66,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              color: INK,
            }}
          >
            {site.headline}
          </div>

          {/* Fußzeile: was drin ist, und wann es kommt */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: `2px solid ${LINE}`,
              paddingTop: 30,
            }}
          >
            <div style={{ display: "flex", fontSize: 30, color: MUTED }}>
              {site.og.features}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 23,
                color: SOFT,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {site.release.pending}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
