import type { Metadata, Viewport } from "next";
import { manrope } from "./fonts";
import { FuturoProvider } from "./components/Futuro";
import "./globals.css";
import "./landing.css";
import "./pagine.css";

const TITOLO = "AssoUmanoidi — Per una società più umana";
const DESCRIZIONE =
  "Associazione culturale che prepara la società alla convivenza tra esseri umani e umanoidi: etica, diritti, doveri, responsabilità e riconoscimento reciproco. Robotica umanoide e intelligenza artificiale come questione sociale, non solo tecnologica.";
const SITO = "https://assoumanoidi.it";

export const metadata: Metadata = {
  metadataBase: new URL(SITO),
  title: TITOLO,
  description: DESCRIZIONE,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITO,
    siteName: "AssoUmanoidi",
    title: TITOLO,
    description: DESCRIZIONE,
  },
  twitter: { card: "summary_large_image", title: TITOLO, description: DESCRIZIONE },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b1d3a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={manrope.variable}>
      <body>
        <FuturoProvider>{children}</FuturoProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "AssoUmanoidi",
              alternateName: "Associazione Umanoidi",
              url: SITO,
              description: DESCRIZIONE,
              slogan: "Innovare. Connettere. Umanizzare.",
              areaServed: "IT",
            }),
          }}
        />
      </body>
    </html>
  );
}
