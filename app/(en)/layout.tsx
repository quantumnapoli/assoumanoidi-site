import { Shell, metadataRadice, viewport as vp } from "../shell";

export const metadata = metadataRadice("en");
export const viewport = vp;

export default function LayoutEn({ children }: { children: React.ReactNode }) {
  return <Shell lingua="en">{children}</Shell>;
}
