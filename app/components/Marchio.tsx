/* eslint-disable @next/next/no-img-element */

/**
 * Simbolo AssoUmanoidi — il logo ufficiale (cerchio con la figura).
 *
 * Vettoriale, estratto dal PDF del logo (Assoumanoidi_logo.pdf) senza ridisegnare
 * niente. Due varianti in `public/loghi/`:
 *   assoumanoidi-simbolo-scuro.svg   per fondi scuri  (figura chiara, testa e anello oro)
 *   assoumanoidi-simbolo-chiaro.svg  per fondi chiari (figura blu, testa e anello oro)
 *
 * La variante giusta la sceglie il CSS in base al contesto (`.carta`), così
 * qui non serve passare niente. Se il logo cambia ancora, si sostituiscono i
 * due .svg e basta: nessun'altra modifica.
 */
export function Marchio({ className = "" }: { className?: string }) {
  return (
    <span className={`marchio-svg ${className}`} aria-hidden="true">
      <img className="mk-su-scuro" src="/loghi/assoumanoidi-simbolo-scuro.svg" alt="" />
      <img className="mk-su-chiaro" src="/loghi/assoumanoidi-simbolo-chiaro.svg" alt="" />
    </span>
  );
}

/**
 * Anello di avanzamento, disegnabile. Non fa parte del marchio:
 * gli gira attorno nel rail in basso a destra e si chiude scendendo nella pagina.
 */
export function Anello({ className = "" }: { className?: string }) {
  return (
    <svg className={`anello ${className}`} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <circle className="an-fondo" cx="50" cy="50" r="46" />
      <circle
        className="an-corsa"
        cx="50"
        cy="50"
        r="46"
        pathLength={100}
        strokeDasharray="100"
        strokeDashoffset="100"
      />
    </svg>
  );
}
