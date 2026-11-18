import type { Metadata } from "next";
import { alternative } from "../../../lingue";
import { Digest } from "../../../views/Digest";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Digest — humanoid robot news — AssoUmanoidi",
  description: "The latest news from the Humanoide Digest, AssoUmanoidi's journal, on humanoid robots.",
  alternates: alternative("digest", "en"),
};

export default function Pagina() {
  return <Digest lingua="en" />;
}
