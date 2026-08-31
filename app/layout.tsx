import type { Metadata, Viewport } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

/*
 * `metadataBase` macht aus jedem relativen Pfad hier eine absolute URL —
 * ohne sie hätte `og:image` keine, und kein Dienst könnte das Bild laden.
 * Die Adresse steht in lib/site.ts, nicht hier.
 *
 * Das Bild selbst wird NICHT eingetragen: app/opengraph-image.tsx und
 * app/twitter-image.tsx melden sich über die Datei-Konvention von selbst
 * an. Ein `images`-Feld an dieser Stelle würde es doppelt setzen.
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.metaTitle,
  description: site.lede,
  openGraph: {
    title: site.metaTitle,
    description: site.lede,
    url: "/",
    siteName: site.name,
    locale: "de_AT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.metaTitle,
    description: site.lede,
  },
  icons: { icon: site.logo, apple: site.logo },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${baloo.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
