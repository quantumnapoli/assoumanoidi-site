import type { Metadata } from "next";
import { alternative } from "../../../lingue";
import { Cariche } from "../../../views/Cariche";

export const metadata: Metadata = {
  title: "Governing bodies — AssoUmanoidi",
  description:
    "The governing bodies of AssoUmanoidi and the people who sit on them: Executive Board, Board of Arbitrators, Scientific Council.",
  alternates: alternative("cariche", "en"),
};

export default function Pagina() {
  return <Cariche lingua="en" />;
}
