import type { Metadata } from "next";
import { alternative } from "../../lingue";
import { Cariche } from "../../views/Cariche";

export const metadata: Metadata = {
  title: "Cariche sociali — AssoUmanoidi",
  description:
    "Gli organi di AssoUmanoidi e le persone che li compongono: Consiglio direttivo, Collegio dei probiviri, Consiglio scientifico.",
  alternates: alternative("cariche", "it"),
};

export default function Pagina() {
  return <Cariche lingua="it" />;
}
