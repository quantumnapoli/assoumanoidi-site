import type { Metadata } from "next";
import { notizie } from "../../../dati";
import { alternative } from "../../../lingue";
import { Notizie } from "../../../views/Notizie";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "News — AssoUmanoidi",
  description: "Events, announcements and activities of AssoUmanoidi.",
  alternates: alternative("notizie", "en"),
};

export default async function Pagina() {
  return <Notizie voci={await notizie(30)} lingua="en" />;
}
