import type { Metadata } from "next";
import { alternative } from "../../lingue";
import { Digest } from "../../views/Digest";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Digest — le notizie sugli umanoidi — AssoUmanoidi",
  description: "Le ultime notizie del Digest di Humanoide, la rivista di AssoUmanoidi, sui robot umanoidi.",
  alternates: alternative("digest", "it"),
};

export default function Pagina() {
  return <Digest lingua="it" />;
}
