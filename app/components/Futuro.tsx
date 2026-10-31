"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lingua } from "../lingue";
import { rotte, type ChiaveFutura } from "../rotte";

/**
 * Alcune destinazioni della V2 (/carta, /statuto, anagrafeumanoidi.it…) non esistono ancora.
 * Invece di mandare la gente su un 404, il link apre una scheda che dice a che punto siamo
 * e la riporta all'adesione. Quando la pagina esiste, in `contenuti.ts` si mette
 * `pronta: true` e lo stesso link comincia a navigare davvero. Nient'altro da toccare.
 */

type Scheda = { titolo: string; href: string };

/** Testi della scheda «in elaborazione» (sta qui perché il provider è un componente client). */
const SCHEDA = {
  it: {
    chiudi: "Chiudi",
    etichetta: "In elaborazione",
    uno: "Ci stiamo lavorando. Il documento è in stesura e sarà pubblicato su",
    due: "Se vuoi leggerlo per primo — o contribuire alla stesura — lascia i tuoi dati: ti scriviamo quando esce.",
    avvisami: "Voglio essere avvisato",
    torna: "Torna al sito",
  },
  en: {
    chiudi: "Close",
    etichetta: "In progress",
    uno: "We are working on it. The document is being drafted and will be published at",
    due: "If you want to read it first — or help draft it — leave your details: we will write to you when it is out.",
    avvisami: "Keep me posted",
    torna: "Back to the site",
  },
} as const;

const Ctx = createContext<{ apri: (s: Scheda) => void; lingua: Lingua }>({
  apri: () => {},
  lingua: "it",
});

export function FuturoProvider({ children, lingua = "it" }: { children: ReactNode; lingua?: Lingua }) {
  const t = SCHEDA[lingua];
  const r = rotte(lingua);
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
    <Ctx.Provider value={{ apri: setScheda, lingua }}>
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
            <button type="button" className="au-modale-chiudi" onClick={chiudi} aria-label={t.chiudi}>
              ×
            </button>
            <div className="art">{t.etichetta}</div>
            <h3 id="au-modale-titolo">{scheda.titolo}</h3>
            <p>
              {t.uno}{" "}
              <strong style={{ color: "var(--su-inchiostro)" }}>{scheda.href}</strong>.
            </p>
            <p>{t.due}</p>
            <div className="au-modale-azioni">
              <a className="btn btn-lg btn-pieno" href={r.aderisci} onClick={chiudi}>
                {t.avvisami}
              </a>
              <button type="button" className="btn btn-lg btn-linea" onClick={chiudi}>
                {t.torna}
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
  const { apri, lingua } = useContext(Ctx);
  const meta = rotte(lingua)[chiave];
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
