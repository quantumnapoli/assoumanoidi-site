import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { haScheda, inLingua, modelli, modello } from "../../../../dati";
import { PAGINE } from "../../../../lingue";
import { ModelloPagina } from "../../../../views/Modelli";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await modelli()).filter(haScheda).map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const m = await modello((await params).slug);
  if (!m) return {};
  const it = `${PAGINE.modelli.it}/${m.slug}`, en = `${PAGINE.modelli.en}/${m.slug}`;
  return {
    title: `${m.name} (${m.company.name}) — specs — AssoUmanoidi`,
    description: (inLingua(m.description, "en") || `${m.name}, ${m.company.name}`).slice(0, 300),
    alternates: { canonical: en, languages: { it, en, "x-default": it } },
  };
}

export default async function Pagina({ params }: { params: Promise<{ slug: string }> }) {
  const m = await modello((await params).slug);
  if (!m) notFound();
  return <ModelloPagina m={m} lingua="en" />;
}
