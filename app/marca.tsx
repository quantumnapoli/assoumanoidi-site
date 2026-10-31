import type { ReactNode } from "react";

/**
 * Titoli con parole evidenziate, scritti come testo semplice nei dizionari:
 *   <h>…</h>  parola in oro (l'umanoide)      <u>…</u>  parola in colore «umano»
 *   \n        a capo
 * Così l'italiano e l'inglese possono mettere l'accento dove cade nella loro frase,
 * e il markup resta identico nelle due lingue.
 */
export function marca(testo: string): ReactNode[] {
  return testo.split("\n").flatMap((riga, r) => {
    const pezzi = riga.split(/(<h>.*?<\/h>|<u>.*?<\/u>)/g).map((p, i) => {
      const m = /^<([hu])>(.*)<\/\1>$/.exec(p);
      return m ? (
        <span className={m[1]} key={`${r}-${i}`}>
          {m[2]}
        </span>
      ) : (
        <span key={`${r}-${i}`}>{p}</span>
      );
    });
    return r === 0 ? pezzi : [<br key={`br-${r}`} />, ...pezzi];
  });
}

/** Lo stesso testo senza i tag, per `aria-label` e metadati. */
export const senzaMarche = (testo: string) => testo.replace(/<\/?[hu]>/g, "").replace(/\n/g, " ");
