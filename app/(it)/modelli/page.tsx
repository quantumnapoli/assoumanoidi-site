import type { Metadata } from "next";
import { modelli } from "../../dati";
import { alternative } from "../../lingue";
import { Modelli } from "../../views/Modelli";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Modelli di robot umanoidi: schede tecniche e confronto — AssoUmanoidi",
  description: "Schede tecniche dei robot umanoidi: altezza, peso, gradi di libertà, prezzo, con le fonti di ogni dato.",
  alternates: alternative("modelli", "it"),
};

export default async function Pagina({ searchParams }: { searchParams: Promise<{ q?: string; stato?: string; tipo?: string }> }) {
  return <Modelli voci={await modelli()} lingua="it" filtri={await searchParams} />;
}
