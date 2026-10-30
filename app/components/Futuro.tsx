"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { ROTTE } from "../contenuti";

/**
 * Alcune destinazioni della V2 (/carta, /statuto, anagrafeumanoidi.it…) non esistono ancora.
 * Invece di mandare la gente su un 404, il link apre una scheda che dice a che punto siamo
 * e la riporta all'adesione. Quando la pagina esiste, in `contenuti.ts` si mette
 * `pronta: true` e lo stesso link comincia a navigare davvero. Nient'altro da toccare.
 */

type ChiaveFutura = {
  [K in keyof typeof ROTTE]: (typeof ROTTE)[K] extends { href: string } ? K : never;
}[keyof typeof ROTTE];

type Scheda = { titolo: string; href: string };

const Ctx = createContext<(s: Scheda) => void>(() => {});

export function FuturoProvider({ children }: { children: ReactNode }) {
  const [scheda, setScheda] = useState<Scheda | null>(null);
  const chiudi = useCallback(() => setScheda(null), []);

  useEffect(() => {
    if (!scheda) return;
    const suTasto = (e: KeyboardEvent) => {
      if (e.key === "Escape") chiudi();
    };
    document.addEventListener("keydown", suTasto);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", suTasto);
      document.body.style.overflow = "";
    };
  }, [scheda, chiudi]);

  return (
    <Ctx.Provider value={setScheda}>
      {children}
      {scheda && (
        <div
          className="au-modale"
          role="dialog"
          aria-modal="true"
          aria-labelledby="au-modale-titolo"
          onClick={chiudi}
        >
          <div className="au-modale-cassa" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="au-modale-chiudi" onClick={chiudi} aria-label="Chiudi">
              ×
            </button>
            <div className="art">In elaborazione</div>
            <h3 id="au-modale-titolo">{scheda.titolo}</h3>
            <p>
              Ci stiamo lavorando. Il documento è in stesura e sarà pubblicato su{" "}
              <strong style={{ color: "var(--su-inchiostro)" }}>{scheda.href}</strong>.
            </p>
            <p>
              Se vuoi leggerlo per primo — o contribuire alla stesura — lascia i tuoi dati:
              ti scriviamo quando esce.
            </p>
            <div className="au-modale-azioni">
              <a className="btn btn-lg btn-pieno" href={ROTTE.aderisci} onClick={chiudi}>
                Voglio essere avvisato
              </a>
              <button type="button" className="btn btn-lg btn-linea" onClick={chiudi}>
                Torna al sito
              </button>
            </div>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}

/** Link a una destinazione della V2. Naviga se è pronta, altrimenti apre la scheda. */
export function LinkFuturo({
  chiave,
  children,
  className,
}: {
  chiave: ChiaveFutura;
  children: ReactNode;
  className?: string;
}) {
  const apri = useContext(Ctx);
  const meta = ROTTE[chiave] as { href: string; pronta: boolean; esterna?: boolean };
  const titolo = typeof children === "string" ? children : meta.href;

  if (meta.pronta) {
    return (
      <a
        className={className}
        href={meta.href}
        {...(meta.esterna ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={className} onClick={() => apri({ titolo, href: meta.href })}>
      {children}
    </button>
  );
}
