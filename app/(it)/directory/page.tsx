import type { Metadata } from "next";
import { alternative } from "../../lingue";
import { RILEVAZIONE, SOCIETA_CONTI } from "../../societa";
import { Directory } from "../../views/Directory";

// la directory si legge dal database della piattaforma e si rigenera ogni 5 minuti
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Directory dei costruttori di umanoidi — AssoUmanoidi",
  description:
    `Il registro dei costruttori di robot umanoidi: ${SOCIETA_CONTI.totale} società censite in ${SOCIETA_CONTI.paesi} paesi, con modelli, stato di sviluppo e impieghi. Rilevazione del ${RILEVAZIONE}.`,
  alternates: alternative("directory", "it"),
};

export default function Pagina() {
  return <Directory lingua="it" />;
}
