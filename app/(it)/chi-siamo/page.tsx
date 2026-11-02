import type { Metadata } from "next";
import { alternative } from "../../lingue";
import { ChiSiamo } from "../../views/ChiSiamo";

export const metadata: Metadata = {
  title: "Chi siamo — AssoUmanoidi",
  description: "AssoUmanoidi: perché esistiamo, le tre Camere e chi decide. Un'associazione culturale per la convivenza tra esseri umani e umanoidi.",
  alternates: alternative("chiSiamo", "it"),
};

export default function Pagina() {
  return <ChiSiamo lingua="it" />;
}
