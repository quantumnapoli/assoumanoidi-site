import type { Metadata } from "next";
import { alternative } from "../../lingue";
import { Home } from "../../views/Home";

export const metadata: Metadata = { alternates: alternative("home", "en") };

export default function Page() {
  return <Home lingua="en" />;
}
