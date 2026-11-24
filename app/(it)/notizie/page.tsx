import type { Metadata } from "next";
import { notizie } from "../../dati";
import { alternative } from "../../lingue";
import { Notizie } from "../../views/Notizie";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Notizie — AssoUmanoidi",
  description: "Eventi, comunicati e attività di AssoUmanoidi.",
  alternates: alternative("notizie", "it"),
};

export default async function Pagina() {
  return <Notizie voci={await notizie(30)} lingua="it" />;
}
