import type { Metadata } from "next";
import { alternative } from "../../../lingue";
import { Privacy } from "../../../views/Privacy";

export const metadata: Metadata = {
  title: "Privacy policy — AssoUmanoidi",
  description: "How AssoUmanoidi handles data when you use the site. For now we do not collect personal data.",
  alternates: alternative("privacy", "en"),
};

export default function Pagina() {
  return <Privacy lingua="en" />;
}
