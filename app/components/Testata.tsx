/* eslint-disable @next/next/no-img-element */

/**
 * La testata di Humanoide.
 *
 * È il logotipo ufficiale, vettoriale, estratto dal PDF del logo
 * (`public/loghi/humanoide-scuro.svg`, variante per fondi scuri; la variante
 * `humanoide-chiaro.svg` è per fondi chiari): lettere, spaziatura e la O con
 * la figura dentro sono quelle vere. Un logo non si riscrive a mano, si usa quello.
 *
 * L'`alt` serve perché chi legge con lo schermo senta "Humanoide" e non il
 * nome di un file.
 */
export function Testata({ className = "" }: { className?: string }) {
  return (
    <img
      className={`au-testata ${className}`}
      src="/loghi/humanoide-scuro.svg"
      alt="Humanoide"
      width={729}
      height={100}
      draggable={false}
    />
  );
}
