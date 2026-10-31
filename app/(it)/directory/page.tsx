import type { Metadata } from "next";
import { alternative } from "../../lingue";
import { RILEVAZIONE, SOCIETA_CONTI } from "../../societa";
import { Directory } from "../../views/Directory";

export const metadata: Metadata = {
  title: "Directory dei costruttori di umanoidi — AssoUmanoidi",
  description:
    `Il registro dei costruttori di robot umanoidi: ${SOCIETA_CONTI.totale} società censite in ${SOCIETA_CONTI.paesi} paesi, con modelli, stato di sviluppo e impieghi. Rilevazione del ${RILEVAZIONE}.`,
  alternates: alternative("directory", "it"),
};

export default function Pagina() {
  return <Directory lingua="it" />;
}
