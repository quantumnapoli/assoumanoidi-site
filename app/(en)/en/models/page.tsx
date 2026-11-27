import type { Metadata } from "next";
import { modelli } from "../../../dati";
import { alternative } from "../../../lingue";
import { Modelli } from "../../../views/Modelli";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Humanoid robot models: specs and comparison — AssoUmanoidi",
  description: "Specs of humanoid robots: height, weight, degrees of freedom, price, with a source for every figure.",
  alternates: alternative("modelli", "en"),
};

export default async function Pagina({ searchParams }: { searchParams: Promise<{ q?: string; stato?: string; tipo?: string }> }) {
  return <Modelli voci={await modelli()} lingua="en" filtri={await searchParams} />;
}
