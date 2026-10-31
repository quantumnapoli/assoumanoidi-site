import type { Metadata } from "next";
import { alternative } from "../../lingue";
import { Statuto } from "../../views/Statuto";

export const metadata: Metadata = {
  title: "Statuto — AssoUmanoidi",
  description:
    "Lo statuto di AssoUmanoidi: costituzione, soci, organi, patrimonio. Il testo integrale, per titolo e articolo.",
  alternates: alternative("statuto", "it"),
};

export default function Pagina() {
  return <Statuto lingua="it" />;
}
