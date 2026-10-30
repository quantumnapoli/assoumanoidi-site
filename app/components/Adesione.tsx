"use client";

import { useMemo, useState, type FormEvent } from "react";
import { ADESIONE, ROTTE } from "../contenuti";
import { Marchio } from "./Marchio";

type Porta = (typeof ADESIONE.porte)[number]["id"];

type Campo = {
  nome: string;
  etichetta: string;
  tipo?: "testo" | "email" | "testo-lungo" | "scelta";
  opzioni?: string[];
  largo?: boolean;
  obbligatorio?: boolean;
  aiuto?: string;
};

/** I campi cambiano con la Camera: chiediamo solo quello che serve davvero. */
const CAMPI: Record<Porta, Campo[]> = {
  persona: [
    { nome: "nome", etichetta: "Nome e cognome", obbligatorio: true },
    { nome: "email", etichetta: "Email", tipo: "email", obbligatorio: true },
    { nome: "citta", etichetta: "Città" },
    { nome: "professione", etichetta: "Professione" },
    {
      nome: "motivazione",
      etichetta: "Perché vuoi partecipare",
      tipo: "testo-lungo",
      largo: true,
      aiuto: "Facoltativo. Anche due righe ci aiutano a capire da dove parti.",
    },
  ],
  tutor: [
    { nome: "nome", etichetta: "Nome e cognome del tutor", obbligatorio: true },
    { nome: "email", etichetta: "Email", tipo: "email", obbligatorio: true },
    { nome: "modello", etichetta: "Modello dell’umanoide" },
    { nome: "produttore", etichetta: "Produttore" },
    {
      nome: "stato",
      etichetta: "A che punto sei",
      tipo: "scelta",
      opzioni: ["Ho già un umanoide", "Lo avrò entro l’anno", "Sto valutando"],
    },
    { nome: "ambito", etichetta: "Ambito d’uso", aiuto: "Domestico, assistenziale, produttivo…" },
    {
      nome: "motivazione",
      etichetta: "Che rapporto immagini",
      tipo: "testo-lungo",
      largo: true,
      aiuto: "Facoltativo.",
    },
  ],
  organizzazione: [
    { nome: "organizzazione", etichetta: "Nome dell’organizzazione", obbligatorio: true },
    {
      nome: "tipo",
      etichetta: "Tipo",
      tipo: "scelta",
      opzioni: ["Impresa", "Università", "Centro di ricerca", "Ente", "Associazione", "Istituzione"],
      obbligatorio: true,
    },
    { nome: "nome", etichetta: "Referente", obbligatorio: true },
    { nome: "ruolo", etichetta: "Ruolo" },
    { nome: "email", etichetta: "Email", tipo: "email", obbligatorio: true },
    { nome: "sito", etichetta: "Sito web" },
    {
      nome: "motivazione",
      etichetta: "Su cosa vorreste collaborare",
      tipo: "testo-lungo",
      largo: true,
      aiuto: "Ricerca, protocolli d’intesa, eventi, sperimentazione…",
    },
  ],
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Adesione() {
  const [porta, setPorta] = useState<Porta>("persona");
  const [errori, setErrori] = useState<Record<string, string>>({});
  const [invio, setInvio] = useState<"fermo" | "corso" | "fatto" | "errore">("fermo");

  const campi = useMemo(() => CAMPI[porta], [porta]);
  const portaScelta = ADESIONE.porte.find((p) => p.id === porta)!;

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
      if (c.obbligatorio && !v) nuovi[c.nome] = "Questo campo serve.";
      else if (c.tipo === "email" && v && !EMAIL.test(v)) nuovi[c.nome] = "Controlla l’indirizzo.";
    }
    if (!dati.get("consenso")) nuovi.consenso = "Serve il consenso per poterti scrivere.";

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
        <h3>Richiesta ricevuta.</h3>
        <p>
          Ti scriviamo appena la Camera {portaScelta.et.replace("Camera ", "")} apre le adesioni.
          Nel frattempo trovi tutto qui sopra.
        </p>
        <button
          type="button"
          className="btn btn-lg btn-linea"
          onClick={() => {
            setInvio("fermo");
            setErrori({});
          }}
        >
          Invia un’altra richiesta
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="au-porte">
        {ADESIONE.porte.map((p) => (
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
                    <option value="">Scegli…</option>
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
              Acconsento al trattamento dei miei dati per essere ricontattato da AssoUmanoidi,
              come descritto nella <a href={ROTTE.aderisci}>informativa privacy</a>.
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
              {invio === "corso" ? "Invio…" : portaScelta.azione}
            </button>
            <span className="au-modulo-nota">
              {invio === "errore"
                ? "Non siamo riusciti a inviare. Riprova, o scrivici direttamente."
                : "Nessuna quota richiesta in questa fase. Ti scriviamo solo per l’adesione."}
            </span>
          </div>
        </div>
      </form>
    </>
  );
}
