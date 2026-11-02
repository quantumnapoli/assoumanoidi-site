import type { Metadata } from "next";
import { alternative } from "../../lingue";
import { Privacy } from "../../views/Privacy";

export const metadata: Metadata = {
  title: "Informativa privacy — AssoUmanoidi",
  description: "Come AssoUmanoidi tratta i dati quando usi il sito. Oggi non raccogliamo dati personali.",
  alternates: alternative("privacy", "it"),
};

export default function Pagina() {
  return <Privacy lingua="it" />;
}
