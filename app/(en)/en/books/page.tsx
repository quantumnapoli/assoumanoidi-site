import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { libri } from "../../../dati";
import { alternative } from "../../../lingue";
import { Libri } from "../../../views/Libri";

export const dynamic = "force-dynamic";

// area nascosta: mai indicizzata, anche quando sarà pubblica sul sito si decide da qui
export const metadata: Metadata = {
  title: "Books about humanoids — AssoUmanoidi",
  robots: { index: false, follow: false },
  alternates: alternative("libri", "en"),
};

export default async function Pagina({ searchParams }: { searchParams: Promise<{ anteprima?: string; filone?: string }> }) {
  const sp = await searchParams;
  const token = sp.anteprima ?? null;
  const voci = await libri(token);
  if (!voci) notFound();
  return <Libri voci={voci} lingua="en" token={token} filone={sp.filone ?? null} />;
}
