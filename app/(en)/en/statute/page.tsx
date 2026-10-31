import type { Metadata } from "next";
import { alternative } from "../../../lingue";
import { Statuto } from "../../../views/Statuto";

export const metadata: Metadata = {
  title: "Statute — AssoUmanoidi",
  description:
    "The statute of AssoUmanoidi: constitution, members, bodies, assets. The full text, by title and article, in the original Italian (the only legally binding version).",
  alternates: alternative("statuto", "en"),
};

export default function Pagina() {
  return <Statuto lingua="en" />;
}
