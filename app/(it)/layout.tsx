import { Shell, metadataRadice, viewport as vp } from "../shell";

export const metadata = metadataRadice("it");
export const viewport = vp;

export default function LayoutIt({ children }: { children: React.ReactNode }) {
  return <Shell lingua="it">{children}</Shell>;
}
