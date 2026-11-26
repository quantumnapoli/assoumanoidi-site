import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { inLingua, notizia, notizie } from "../../../../dati";
import { PAGINE } from "../../../../lingue";
import { NotiziaPagina } from "../../../../views/Notizie";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await notizie(50)).map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const n = await notizia((await params).slug);
  if (!n) return {};
  return {
    title: `${inLingua(n.title, "en")} — AssoUmanoidi`,
    description: inLingua(n.summary, "en").slice(0, 300) || undefined,
    alternates: {
      canonical: `${PAGINE.notizie.en}/${n.slug}`,
      languages: { it: `${PAGINE.notizie.it}/${n.slug}`, en: `${PAGINE.notizie.en}/${n.slug}`, "x-default": `${PAGINE.notizie.it}/${n.slug}` },
    },
    openGraph: { type: "article", publishedTime: n.date, images: n.image ? [n.image.full] : undefined },
  };
}

export default async function Pagina({ params }: { params: Promise<{ slug: string }> }) {
  const n = await notizia((await params).slug);
  if (!n) notFound();
  return <NotiziaPagina n={n} lingua="en" />;
}
