import type { Metadata } from "next";
import { alternative } from "../../../lingue";
import { Norme } from "../../../views/Norme";

export const metadata: Metadata = {
  title: "Norme per gli autori – Humanoide, la rivista di AssoUmanoidi",
  description:
    "Come scrivere per Humanoide: tipi di contributo e lunghezze, formato del file, convenzioni di stile e punteggiatura, materiali da allegare.",
  alternates: alternative("normeAutori", "it"),
};

export default function Pagina() {
  return <Norme lingua="it" />;
}
