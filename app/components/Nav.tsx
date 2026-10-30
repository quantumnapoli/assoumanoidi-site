"use client";

import { useEffect, useState } from "react";
import { NAV, ROTTE } from "../contenuti";
import { Marchio } from "./Marchio";

/**
 * `sottopagina` serve alle pagine che non sono la landing (/directory, /statuto…):
 * lì un href come `#etica` non porta da nessuna parte, quindi le ancore diventano
 * `/#etica` e il marchio torna in home invece di puntare a `#top`.
 */
export function Nav({ sottopagina = false }: { sottopagina?: boolean } = {}) {
  const [aperto, setAperto] = useState(false);
  const dove = (href: string) => (sottopagina && href.startsWith("#") ? `/${href}` : href);

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
          href={sottopagina ? "/" : "#top"}
          aria-label={sottopagina ? "AssoUmanoidi — home" : "AssoUmanoidi — inizio pagina"}
        >
          <Marchio />
          <span className="marchio-testo">
            Assoumanoidi
          </span>
        </a>

        <ul className="nav-voci">
          {NAV.map((v) =>
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
          <a className="btn btn-sm btn-pieno" href={dove(ROTTE.aderisci)}>
            Aderisci
          </a>
          <button
            type="button"
            className="nav-burger"
            aria-label="Apri il menu"
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
      <div className={`nav-mob${aperto ? " aperto" : ""}`} role="dialog" aria-modal={aperto} aria-label="Menu">
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
            aria-label="Chiudi il menu"
          >
            ×
          </button>
        </div>
        <div className="nav-mob-corpo">
          {NAV.map((v) => (
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
            href={dove(ROTTE.aderisci)}
            style={{ width: "100%" }}
            onClick={() => setAperto(false)}
          >
            Aderisci
          </a>
        </div>
      </div>
    </>
  );
}
