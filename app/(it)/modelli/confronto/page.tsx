import type { Metadata } from "next";
import { haScheda, modelli } from "../../../dati";
import { Confronto, MAX_CONFRONTO } from "../../../views/Modelli";

export const dynamic = "force-dynamic";

// una pagina per ogni combinazione: utile da condividere, non da indicizzare
export const metadata: Metadata = { title: "Modelli di robot umanoidi: schede tecniche e confronto — AssoUmanoidi", robots: { index: false, follow: true } };

export default async function Pagina({ searchParams }: { searchParams: Promise<{ m?: string | string[] }> }) {
  const sp = await searchParams;
  const chiesti = [...new Set([sp.m ?? []].flat())].slice(0, MAX_CONFRONTO);
  const tutti = new Map((await modelli()).filter(haScheda).map((m) => [m.slug, m]));
  const scelti = chiesti.map((s) => tutti.get(s)).filter((m) => !!m);
  return <Confronto scelti={scelti} lingua="it" />;
}
