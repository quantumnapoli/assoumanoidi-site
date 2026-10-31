"use client";

import { useMemo, useState, type FormEvent } from "react";
import type { ADESIONE, Porta } from "../contenuti";
import { Marchio } from "./Marchio";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Adesione({ t, privacyHref }: { t: typeof ADESIONE; privacyHref: string }) {
  const m = t.msg;
  const [porta, setPorta] = useState<Porta>("persona");
  const [errori, setErrori] = useState<Record<string, string>>({});
  const [invio, setInvio] = useState<"fermo" | "corso" | "fatto" | "errore">("fermo");

  const campi = useMemo(() => t.campi[porta], [t, porta]);
  const portaScelta = t.porte.find((p) => p.id === porta)!;

  const cambiaPorta = (id: Porta) => {
    setPorta(id);
    setErrori({});
  };

  async function invia(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dati = new FormData(e.currentTarget);
    const nuovi: Record<string, string> = {};

    for (const c of campi) {
      const v = String(dati.get(c.nome) ?? "").trim();
      if (c.obbligatorio && !v) nuovi[c.nome] = m.obbligatorio;
      else if (c.tipo === "email" && v && !EMAIL.test(v)) nuovi[c.nome] = m.email;
    }
    if (!dati.get("consenso")) nuovi.consenso = m.consenso;

    setErrori(nuovi);
    if (Object.keys(nuovi).length) {
      const primo = document.getElementById(`campo-${Object.keys(nuovi)[0]}`);
      primo?.focus();
      return;
    }

    setInvio("corso");
    try {
      const risposta = await fetch("/api/adesione", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ camera: porta, ...Object.fromEntries(dati) }),
      });
      setInvio(risposta.ok ? "fatto" : "errore");
    } catch {
      setInvio("errore");
    }
  }

  if (invio === "fatto") {
    return (
      <div className="au-modulo au-esito">
        <Marchio />
        <h3>{m.fattoTitolo}</h3>
        <p>{m.fatto.replace("{camera}", portaScelta.et.split(" ").pop() ?? "")}</p>
        <button
          type="button"
          className="btn btn-lg btn-linea"
          onClick={() => {
            setInvio("fermo");
            setErrori({});
          }}
        >
          {m.altra}
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="au-porte">
        {t.porte.map((p) => (
          <button
            key={p.id}
            type="button"
            className="au-porta"
            aria-pressed={porta === p.id}
            onClick={() => cambiaPorta(p.id)}
          >
            <em>{p.et}</em>
            <strong>{p.nome}</strong>
            <span>{p.testo}</span>
          </button>
        ))}
      </div>

      <form className="au-modulo" onSubmit={invia} noValidate>
        <div className="au-campi-modulo">
          {campi.map((c) => {
            const id = `campo-${c.nome}`;
            const err = errori[c.nome];
            const comuni = {
              id,
              name: c.nome,
              "aria-invalid": err ? (true as const) : undefined,
              "aria-describedby": err ? `${id}-err` : c.aiuto ? `${id}-aiuto` : undefined,
            };
            return (
              <div key={c.nome} className={`au-campo-m${c.largo ? " largo" : ""}`}>
                <label htmlFor={id}>
                  {c.etichetta}
                  {c.obbligatorio ? " *" : ""}
                </label>

                {c.tipo === "testo-lungo" ? (
                  <textarea {...comuni} rows={3} />
                ) : c.tipo === "scelta" ? (
                  <select {...comuni} defaultValue="">
                    <option value="">{m.scegli}</option>
                    {c.opzioni?.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input {...comuni} type={c.tipo === "email" ? "email" : "text"} />
                )}

                {err ? (
                  <span className="au-errore" id={`${id}-err`} role="alert">
                    {err}
                  </span>
                ) : c.aiuto ? (
                  <span className="au-modulo-nota" id={`${id}-aiuto`}>
                    {c.aiuto}
                  </span>
                ) : null}
              </div>
            );
          })}

          <label className="au-consenso" htmlFor="campo-consenso">
            <input type="checkbox" id="campo-consenso" name="consenso" />
            <span>
              {m.consensoTesto} <a href={privacyHref}>{m.privacy}</a>.
              {errori.consenso ? (
                <>
                  {" "}
                  <span className="au-errore" role="alert">
                    {errori.consenso}
                  </span>
                </>
              ) : null}
            </span>
          </label>

          <div className="au-modulo-piede">
            <button
              type="submit"
              className="btn btn-lg btn-pieno au-magnete"
              disabled={invio === "corso"}
            >
              {invio === "corso" ? m.invio : portaScelta.azione}
            </button>
            <span className="au-modulo-nota">
              {invio === "errore" ? m.errore : m.nessunaQuota}
            </span>
          </div>
        </div>
      </form>
    </>
  );
}
