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

export const metadata: Metadata = {
  title: "Studytab — Noten, Mitschriften und Karteikarten",
  description: site.lede,
  openGraph: {
    title: "Studytab — Noten, Mitschriften und Karteikarten",
    description: site.lede,
    locale: "de_AT",
    type: "website",
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
