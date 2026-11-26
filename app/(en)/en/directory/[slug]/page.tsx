import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { inLingua, produttore, produttoriPremium } from "../../../../dati";
import { PAGINE } from "../../../../lingue";
import { Produttore } from "../../../../views/Produttore";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await produttoriPremium()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await produttore(slug);
  if (!p) return {};
  const descr = (p.profilo ? inLingua(p.profilo.tagline, "en") : "") || p.nota;
  return {
    title: `${p.nome} — humanoid builders directory — AssoUmanoidi`,
    description: descr.slice(0, 300),
    alternates: {
      canonical: `${PAGINE.directory.en}/${p.slug}`,
      languages: { it: `${PAGINE.directory.it}/${p.slug}`, en: `${PAGINE.directory.en}/${p.slug}`, "x-default": `${PAGINE.directory.it}/${p.slug}` },
    },
    openGraph: p.profilo?.cover ? { images: [p.profilo.cover.url] } : undefined,
  };
}

export default async function Pagina({ params }: { params: Promise<{ slug: string }> }) {
  const p = await produttore((await params).slug);
  if (!p) notFound();
  return <Produttore p={p} lingua="en" />;
}
