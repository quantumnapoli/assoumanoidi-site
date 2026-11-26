import type { Metadata } from "next";
import { alternative } from "../../../lingue";
import { RILEVAZIONE_EN, SOCIETA_CONTI } from "../../../societa";
import { Directory } from "../../../views/Directory";

// la directory si legge dal database della piattaforma e si rigenera ogni 5 minuti
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Humanoid robot builders directory — AssoUmanoidi",
  description:
    `The register of humanoid robot builders: ${SOCIETA_CONTI.totale} companies listed in ${SOCIETA_CONTI.paesi} countries, with models, development stage and uses. Survey of ${RILEVAZIONE_EN}.`,
  alternates: alternative("directory", "en"),
};

export default function Pagina() {
  return <Directory lingua="en" />;
}
