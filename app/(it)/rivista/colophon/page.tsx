import type { Metadata } from "next";
import { alternative } from "../../../lingue";
import { Colophon } from "../../../views/Colophon";

export const metadata: Metadata = {
  title: "Colophon – Humanoide, la rivista di AssoUmanoidi",
  description:
    "Direzione, redazione, modello Online First, lingue, accesso e note legali di Humanoide, la rivista ufficiale di AssoUmanoidi.",
  alternates: alternative("colophon", "it"),
};

export default function Pagina() {
  return <Colophon lingua="it" />;
}
