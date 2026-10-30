/* eslint-disable @next/next/no-img-element */

/**
 * La testata di Humanoide.
 *
 * È il logotipo originale del brand, ritagliato dal file fornito e reso
 * trasparente sul fondo navy (`public/humanoide-testata.webp`): letterforme,
 * spaziatura e la O — anello d'oro con la figura in oro dentro — sono quelle
 * vere. Prima era ricostruita in CSS mettendo il marchio del sito dentro un
 * bordo tondo, e veniva sbagliata: doppio cerchio e figura bianca invece che
 * oro. Un logo non si riscrive a mano, si usa quello.
 *
 * Il `role="img"` con l'etichetta serve perché chi legge con lo schermo senta
 * "Humanoide" e non un file .webp.
 */
export function Testata({ className = "" }: { className?: string }) {
  return (
    <img
      className={`au-testata ${className}`}
      src="/humanoide-testata.webp"
      alt="Humanoide"
      width={1347}
      height={189}
      draggable={false}
    />
  );
}
