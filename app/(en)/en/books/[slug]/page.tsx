import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { libro } from "../../../../dati";
import { LibroPagina } from "../../../../views/Libri";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Books about humanoids — AssoUmanoidi", robots: { index: false, follow: false } };

export default async function Pagina({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ anteprima?: string }> }) {
  const token = (await searchParams).anteprima ?? null;
  const l = await libro((await params).slug, token);
  if (!l) notFound();
  return <LibroPagina l={l} lingua="en" token={token} />;
}
