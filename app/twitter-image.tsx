import { renderOgImage } from "@/lib/og";

/*
 * X/Twitter fällt zwar auf `og:image` zurück, wenn `twitter:image` fehlt —
 * aber nur als Notlösung, und andere Dienste tun es nicht. Eine eigene
 * Route ist billiger als die Wette darauf: dasselbe Bild aus lib/og.tsx,
 * nur unter dem Namen, den die Twitter-Card sucht.
 */
export { alt, size, contentType } from "@/lib/og";

export default function Image() {
  return renderOgImage();
}
