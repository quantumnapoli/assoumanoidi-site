import type { Metadata } from "next";
import { ESEMPIO_PREMIUM } from "../../../esempio-premium";
import { Produttore } from "../../../views/Produttore";

// pagina di prova con dati inventati: mai indicizzata né collegata
export const metadata: Metadata = { title: "Anteprima scheda premium — AssoUmanoidi", robots: { index: false, follow: false } };

export default async function Pagina({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const lingua = (await searchParams).lang === "en" ? "en" : "it";
  return <Produttore p={ESEMPIO_PREMIUM} lingua={lingua} />;
}
