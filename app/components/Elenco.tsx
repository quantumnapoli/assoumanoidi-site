"use client";

import { useMemo, useState } from "react";
import { DIRECTORY } from "../contenuti";
import { SOCIETA, type Societa } from "../societa";

/**
 * Elenco filtrabile dei costruttori (pagina /directory).
 *
 * I dati arrivano già impaginati da `societa.ts`: qui non si fetcha niente, la
 * lista è nel bundle e i filtri lavorano in memoria. Sono poco più di cento record,
 * non serve altro — se un giorno diventassero migliaia, questo è il punto da paginare.
 */

const TUTTE = "__tutte__";

function unici(campo: (s: Societa) => string) {
  return Array.from(new Set(SOCIETA.map(campo))).sort((a, b) => a.localeCompare(b, "it"));
}

export function Elenco() {
  const [cerca, setCerca] = useState("");
  const [area, setArea] = useState(TUTTE);
  const [stadio, setStadio] = useState(TUTTE);
  const [tipo, setTipo] = useState(TUTTE);

  const aree = useMemo(() => unici((s) => s.area), []);
  const stadi = useMemo(() => unici((s) => s.stadio), []);
  const tipi = useMemo(() => unici((s) => s.tipo), []);

  const filtrate = useMemo(() => {
    const q = cerca.trim().toLowerCase();
    return SOCIETA.filter((s) => {
      if (area !== TUTTE && s.area !== area) return false;
      if (stadio !== TUTTE && s.stadio !== stadio) return false;
      if (tipo !== TUTTE && s.tipo !== tipo) return false;
      if (!q) return true;
      return [s.nome, s.paese, s.area, s.tipo, s.stadio, ...s.modelli, ...s.usi]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [cerca, area, stadio, tipo]);

  const filtrato = area !== TUTTE || stadio !== TUTTE || tipo !== TUTTE || cerca.trim() !== "";

  return (
    <>
      <div className="au-dir-attrezzi">
        <label className="au-dir-cerca">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={cerca}
            onChange={(e) => setCerca(e.target.value)}
            placeholder={DIRECTORY.cerca}
            aria-label={DIRECTORY.cerca}
          />
        </label>

        <div className="au-dir-selettori">
          <select value={area} onChange={(e) => setArea(e.target.value)} aria-label="Filtra per area">
            <option value={TUTTE}>{DIRECTORY.filtri.area}</option>
            {aree.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <select value={stadio} onChange={(e) => setStadio(e.target.value)} aria-label="Filtra per stato">
            <option value={TUTTE}>{DIRECTORY.filtri.stadio}</option>
            {stadi.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} aria-label="Filtra per natura">
            <option value={TUTTE}>{DIRECTORY.filtri.tipo}</option>
            {tipi.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="au-dir-conta" role="status" aria-live="polite">
        <span className="dati">{DIRECTORY.risultati(filtrate.length)}</span>
        {filtrato && (
          <button
            type="button"
            className="au-dir-azzera"
            onClick={() => {
              setCerca("");
              setArea(TUTTE);
              setStadio(TUTTE);
              setTipo(TUTTE);
            }}
          >
            Azzera i filtri
          </button>
        )}
      </div>

      {filtrate.length ? (
        <ul className="au-dir-lista">
          {filtrate.map((s, i) => (
            <li
              className={`au-dir-riga${s.stadio === "Sul mercato" ? " mercato" : ""}`}
              key={s.nome}
            >
              <span className="au-dir-num dati" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="au-dir-chi">
                <span className="au-dir-sigla" aria-hidden="true">
                  {s.nome[0]}
                  {s.dominio && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${s.dominio}&sz=64`}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </span>
                <div>
                  <h2>{s.nome}</h2>
                  <p>
                    {s.paese} · {s.tipo}
                  </p>
                </div>
              </div>

              <div className="au-dir-campo">
                <em>{DIRECTORY.colonne.modelli}</em>
                <span>{s.modelli.length ? s.modelli.join(", ") : "—"}</span>
              </div>

              <div className="au-dir-campo">
                <em>{DIRECTORY.colonne.stadio}</em>
                <span className="au-dir-stadio">{s.stadio}</span>
              </div>

              <div className="au-dir-campo largo">
                <em>{DIRECTORY.colonne.impieghi}</em>
                <span>{s.usi.length ? s.usi.join(" · ") : "—"}</span>
              </div>

              <a
                className="au-dir-sito"
                href={s.sito}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Sito di ${s.nome}`}
              >
                <i className={s.sitoVerificato ? "ok" : undefined} aria-hidden="true" />
                {s.dominio}
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="au-dir-vuoto">{DIRECTORY.vuoto}</p>
      )}
    </>
  );
}
