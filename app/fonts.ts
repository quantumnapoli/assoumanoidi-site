import { Manrope } from "next/font/google";

/**
 * Manrope, come da brand book. Una sola famiglia, tre ruoli distinti per peso e spaziatura:
 *   display  ExtraBold 800, tracking stretto  → titoli
 *   corpo    Regular/Medium                   → lettura
 *   dati     SemiBold maiuscoletto spaziato   → etichette, numeri d'articolo, Anagrafe
 */
export const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});
