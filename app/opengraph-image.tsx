import { renderOgImage } from "@/lib/og";

/*
 * Die Datei-Konvention: Next trägt aus diesem Modul selbst `og:image`,
 * `og:image:width`, `-height` und `-alt` in den Kopf ein. Deshalb steht
 * in app/layout.tsx kein `images`-Feld — das würde sich hiermit doppeln.
 *
 * Gezeichnet wird in lib/og.tsx, weil app/twitter-image.tsx dasselbe Bild
 * ausliefert.
 */
export { alt, size, contentType } from "@/lib/og";

export default function Image() {
  return renderOgImage();
}
