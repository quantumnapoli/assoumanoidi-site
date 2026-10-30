/* eslint-disable @next/next/no-img-element */

/**
 * Marchio AssoUmanoidi — il logo ufficiale.
 *
 * Due file, generati dagli originali in `public/assets/` con lo sfondo reso
 * trasparente e il segno ritagliato al vivo:
 *   public/marchio.webp        variante per fondi scuri  (da logo_02.png)
 *   public/marchio-scuro.webp  variante per fondi chiari (da logo_01.png)
 *
 * La variante giusta la sceglie il CSS in base al contesto (`.carta`), così
 * qui non serve passare niente. Se cambiate gli originali, rigenerate i due
 * .webp e basta: nessun'altra modifica.
 */
export function Marchio({ className = "" }: { className?: string }) {
  return (
    <span className={`marchio-svg ${className}`} aria-hidden="true">
      <img className="mk-su-scuro" src="/marchio.webp" alt="" />
      <img className="mk-su-chiaro" src="/marchio-scuro.webp" alt="" />
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
