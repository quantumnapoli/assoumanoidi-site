import type { Metadata } from "next";
import { alternative } from "../../../../lingue";
import { Norme } from "../../../../views/Norme";

export const metadata: Metadata = {
  title: "Author guidelines – Humanoide, the journal of AssoUmanoidi",
  description:
    "How to write for Humanoide: contribution types and lengths, file format, style and punctuation conventions, materials to attach.",
  alternates: alternative("normeAutori", "en"),
};

export default function Pagina() {
  return <Norme lingua="en" />;
}
