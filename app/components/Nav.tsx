"use client";

import { useEffect, useState } from "react";
import type { NAV_TESTI, VoceNav } from "../contenuti";
import type { Lingua } from "../lingue";
import { Marchio } from "./Marchio";

/**
 * `sottopagina` serve alle pagine che non sono la landing (/directory, /statuto…):
 * lì un href come `#etica` non porta da nessuna parte, quindi le ancore diventano
 * `/#etica` e il marchio torna in home invece di puntare a `#top`.
 */
export function Nav({
  lingua,
  voci,
  testi,
  aderisci,
  altraLingua,
  sottopagina = false,
}: {
  lingua: Lingua;
  voci: VoceNav[];
  testi: typeof NAV_TESTI;
  /** ancora della sezione di adesione (`#aderisci`) */
  aderisci: string;
  /** indirizzo della stessa pagina nell'altra lingua */
  altraLingua: string;
  sottopagina?: boolean;
}) {
  const [aperto, setAperto] = useState(false);
  const radice = lingua === "en" ? "/en" : "/";
  const dove = (href: string) => (sottopagina && href.startsWith("#") ? `${radice}${href}` : href);
  const selettore = (
    <a className="nav-lingua" href={altraLingua} hrefLang={lingua === "en" ? "it" : "en"} lang={lingua === "en" ? "it" : "en"} aria-label={testi.linguaAria}>
      {testi.linguaSigla}
    </a>
  );

  useEffect(() => {
    document.body.style.overflow = aperto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aperto]);

  useEffect(() => {
    if (!aperto) return;
    const suTasto = (e: KeyboardEvent) => e.key === "Escape" && setAperto(false);
    document.addEventListener("keydown", suTasto);
    return () => document.removeEventListener("keydown", suTasto);
  }, [aperto]);

  return (
    <>
      {/* sulla landing la classe .fissa la mette il motore di scroll; sulle
          sottopagine la barra è piena da subito, il contenuto le passa sotto */}
      <nav className={`nav${sottopagina ? " fissa" : ""}`}>
        <a
          className="marchio"
          href={sottopagina ? radice : "#top"}
          aria-label={sottopagina ? testi.home : testi.inizio}
        >
          <Marchio />
          <span className="marchio-testo">
            Assoumanoidi
          </span>
        </a>

        <ul className="nav-voci">
          {voci.map((v) =>
            v.sotto ? (
              // hover/focus-within: niente stato React per un menu che si apre
              // e chiude col mouse — la tastiera lo apre allo stesso modo col focus.
              <li className="nav-voce-menu" key={v.href}>
                <a href={dove(v.href)}>{v.testo}</a>
                <ul className="nav-sotto">
                  {v.sotto.map((s) => (
                    <li key={s.href}>
                      <a href={dove(s.href)}>{s.testo}</a>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={v.href}>
                <a href={dove(v.href)}>{v.testo}</a>
              </li>
            ),
          )}
        </ul>

        <div className="nav-destra">
          {selettore}
          <a className="btn btn-sm btn-pieno" href={dove(aderisci)}>
            {testi.aderisci}
          </a>
          <button
            type="button"
            className="nav-burger"
            aria-label={testi.apri}
            aria-expanded={aperto}
            onClick={() => setAperto(true)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </button>
        </div>
      </nav>

      <div
        className={`nav-mob-sfondo${aperto ? " aperto" : ""}`}
        onClick={() => setAperto(false)}
        aria-hidden="true"
      />
      <div className={`nav-mob${aperto ? " aperto" : ""}`} role="dialog" aria-modal={aperto} aria-label={testi.menu}>
        <div className="nav-mob-testa">
          <span className="marchio">
            <Marchio />
            <span className="marchio-testo">
              Assoumanoidi
            </span>
          </span>
          <button
            type="button"
            className="nav-mob-chiudi"
            onClick={() => setAperto(false)}
            aria-label={testi.chiudi}
          >
            ×
          </button>
        </div>
        <div className="nav-mob-corpo">
          {voci.map((v) => (
            <div className="nav-mob-voce" key={v.href}>
              <a href={dove(v.href)} onClick={() => setAperto(false)}>
                {v.testo}
              </a>
              {v.sotto && (
                <div className="nav-mob-sotto">
                  {v.sotto
                    .filter((s) => s.href !== v.href)
                    .map((s) => (
                      <a key={s.href} href={dove(s.href)} onClick={() => setAperto(false)}>
                        {s.testo}
                      </a>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="nav-mob-piede">
          <a
            className="btn btn-lg btn-pieno"
            href={dove(aderisci)}
            style={{ width: "100%" }}
            onClick={() => setAperto(false)}
          >
            {testi.aderisci}
          </a>
        </div>
      </div>
    </>
  );
}
