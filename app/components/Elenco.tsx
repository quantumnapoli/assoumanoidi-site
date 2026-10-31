"use client";

import { useMemo, useState } from "react";
import type { DIRECTORY } from "../contenuti";
import type { RigaDirectory } from "../societa-en";

/**
 * Elenco filtrabile dei costruttori (pagina /directory).
 *
 * Le righe arrivano già tradotte nella lingua della pagina (`societa-en.ts`): qui non si
 * fetcha niente, la lista è nel bundle e i filtri lavorano in memoria. Sono poco più di cento record,
 * non serve altro — se un giorno diventassero migliaia, questo è il punto da paginare.
 */

const TUTTE = "__tutte__";

export function Elenco({
  righe,
  t,
  lingua,
}: {
  righe: RigaDirectory[];
  t: typeof DIRECTORY;
  lingua: string;
}) {
  const unici = (campo: (s: RigaDirectory) => string) =>
    Array.from(new Set(righe.map(campo))).sort((a, b) => a.localeCompare(b, lingua));

  const [cerca, setCerca] = useState("");
  const [area, setArea] = useState(TUTTE);
  const [stadio, setStadio] = useState(TUTTE);
  const [tipo, setTipo] = useState(TUTTE);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const aree = useMemo(() => unici((s) => s.area), [righe]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stadi = useMemo(() => unici((s) => s.stadio), [righe]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tipi = useMemo(() => unici((s) => s.tipo), [righe]);

  const filtrate = useMemo(() => {
    const q = cerca.trim().toLowerCase();
    return righe.filter((s) => {
      if (area !== TUTTE && s.area !== area) return false;
      if (stadio !== TUTTE && s.stadio !== stadio) return false;
      if (tipo !== TUTTE && s.tipo !== tipo) return false;
      if (!q) return true;
      return [s.nome, s.paese, s.area, s.tipo, s.stadio, ...s.modelli, ...s.usi]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [righe, cerca, area, stadio, tipo]);

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
            placeholder={t.cerca}
            aria-label={t.cerca}
          />
        </label>

        <div className="au-dir-selettori">
          <select value={area} onChange={(e) => setArea(e.target.value)} aria-label={t.aria.area}>
            <option value={TUTTE}>{t.filtri.area}</option>
            {aree.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <select value={stadio} onChange={(e) => setStadio(e.target.value)} aria-label={t.aria.stadio}>
            <option value={TUTTE}>{t.filtri.stadio}</option>
            {stadi.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} aria-label={t.aria.tipo}>
            <option value={TUTTE}>{t.filtri.tipo}</option>
            {tipi.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="au-dir-conta" role="status" aria-live="polite">
        <span className="dati">
          {filtrate.length} {t.unita[filtrate.length === 1 ? 0 : 1]}
        </span>
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
            {t.azzera}
          </button>
        )}
      </div>

      {filtrate.length ? (
        <ul className="au-dir-lista">
          {filtrate.map((s, i) => (
            <li
              className={`au-dir-riga${s.sulMercato ? " mercato" : ""}`}
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
                <em>{t.colonne.modelli}</em>
                <span>{s.modelli.length ? s.modelli.join(", ") : "—"}</span>
              </div>

              <div className="au-dir-campo">
                <em>{t.colonne.stadio}</em>
                <span className="au-dir-stadio">{s.stadio}</span>
              </div>

              <div className="au-dir-campo largo">
                <em>{t.colonne.impieghi}</em>
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
        <p className="au-dir-vuoto">{t.vuoto}</p>
      )}
    </>
  );
}
