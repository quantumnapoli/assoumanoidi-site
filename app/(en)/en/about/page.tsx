import type { Metadata } from "next";
import { alternative } from "../../../lingue";
import { ChiSiamo } from "../../../views/ChiSiamo";

export const metadata: Metadata = {
  title: "About us — AssoUmanoidi",
  description: "AssoUmanoidi: why we exist, the three Chambers and who decides. A cultural association for coexistence between humans and humanoids.",
  alternates: alternative("chiSiamo", "en"),
};

export default function Pagina() {
  return <ChiSiamo lingua="en" />;
}
