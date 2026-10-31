import type { Metadata } from "next";
import { alternative } from "../../../../lingue";
import { Colophon } from "../../../../views/Colophon";

export const metadata: Metadata = {
  title: "Colophon – Humanoide, the journal of AssoUmanoidi",
  description:
    "Editorial team, Online First model, languages, access and legal notices of Humanoide, the official journal of AssoUmanoidi.",
  alternates: alternative("colophon", "en"),
};

export default function Pagina() {
  return <Colophon lingua="en" />;
}
