import type { Metadata, Viewport } from "next";
import { manrope } from "./fonts";
import { FuturoProvider } from "./components/Futuro";
import type { Lingua } from "./lingue";
import "./globals.css";
import "./landing.css";
import "./pagine.css";

/**
 * L'involucro HTML condiviso dalle due lingue. Ogni gruppo di route (`(it)`, `(en)`) ha il
 * suo layout radice, così `<html lang>` è giusto già nell'HTML statico, senza leggere
 * header a runtime (che renderebbe dinamiche tutte le pagine).
 */

const SITO = "https://assoumanoidi.it";

const TESTO = {
  it: {
    titolo: "AssoUmanoidi — Per una società più umana",
    descrizione:
      "Associazione culturale che prepara la società alla convivenza tra esseri umani e umanoidi: etica, diritti, doveri, responsabilità e riconoscimento reciproco. Robotica umanoide e intelligenza artificiale come questione sociale, non solo tecnologica.",
    locale: "it_IT",
    slogan: "Innovare. Connettere. Umanizzare.",
    alternativo: "Associazione Umanoidi",
  },
  en: {
    titolo: "AssoUmanoidi — For a more human society",
    descrizione:
      "Cultural association preparing society for coexistence between humans and humanoids: ethics, rights, duties, responsibility and mutual recognition. Humanoid robotics and artificial intelligence as a social question, not just a technological one.",
    locale: "en_GB",
    slogan: "Innovate. Connect. Humanize.",
    alternativo: "Association for Humanoid Rights",
  },
} as const;

export const metadataRadice = (l: Lingua): Metadata => ({
  metadataBase: new URL(SITO),
  title: TESTO[l].titolo,
  description: TESTO[l].descrizione,
  alternates: {
    canonical: l === "en" ? "/en" : "/",
    languages: { it: "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: TESTO[l].locale,
    alternateLocale: l === "en" ? "it_IT" : "en_GB",
    url: SITO,
    siteName: "AssoUmanoidi",
    title: TESTO[l].titolo,
    description: TESTO[l].descrizione,
  },
  twitter: { card: "summary_large_image", title: TESTO[l].titolo, description: TESTO[l].descrizione },
  robots: { index: true, follow: true },
});

export const viewport: Viewport = {
  themeColor: "#0b1d3a",
  width: "device-width",
  initialScale: 1,
};

export function Shell({ lingua, children }: { lingua: Lingua; children: React.ReactNode }) {
  return (
    <html lang={lingua} className={manrope.variable}>
      <body>
        <FuturoProvider lingua={lingua}>{children}</FuturoProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "AssoUmanoidi",
              alternateName: TESTO[lingua].alternativo,
              url: SITO,
              description: TESTO[lingua].descrizione,
              slogan: TESTO[lingua].slogan,
              areaServed: "IT",
            }),
          }}
        />
      </body>
    </html>
  );
}
