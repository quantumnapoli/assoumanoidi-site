import { haScheda, inLingua, type Modello } from "../dati";
import { PAGINE, altra, type Lingua } from "../lingue";
import { rotte } from "../rotte";
import { testi } from "../testi";
import { Nav } from "../components/Nav";
import { Piede } from "../components/Piede";

/**
 * Sottodirectory dei modelli di umanoidi: elenco, scheda e confronto. I dati vengono dalla piattaforma (ADR 0013):
 * ogni valore ha una fonte; un dato mancante si mostra come «—», mai stimato.
 */

const SPECS = [
  { key: "height_cm", it: "Altezza", en: "Height", unit: "cm" },
  { key: "weight_kg", it: "Peso", en: "Weight", unit: "kg" },
  { key: "dof", it: "Gradi di libertà", en: "Degrees of freedom", unit: "" },
  { key: "payload_kg", it: "Carico utile", en: "Payload", unit: "kg" },
  { key: "battery_h", it: "Autonomia", en: "Battery life", unit: "h" },
  { key: "speed_ms", it: "Velocità massima", en: "Top speed", unit: "m/s" },
] as const;

const STATI: Record<string, { it: string; en: string }> = {
  "in vendita": { it: "In vendita", en: "On sale" }, "pre-ordine": { it: "Pre-ordine", en: "Pre-order" },
  pilota: { it: "In pilota", en: "Pilot" }, prototipo: { it: "Prototipo", en: "Prototype" },
  annunciato: { it: "Annunciato", en: "Announced" }, ritirato: { it: "Ritirato", en: "Discontinued" },
};
const TIPI: Record<string, { it: string; en: string }> = {
  umanoide: { it: "Umanoide", en: "Humanoid" }, "umanoide su ruote": { it: "Umanoide su ruote", en: "Wheeled humanoid" },
  "parte superiore": { it: "Solo busto", en: "Upper body" }, mano: { it: "Mano robotica", en: "Robotic hand" }, altro: { it: "Altro", en: "Other" },
};
const NATURE: Record<string, { it: string; en: string }> = {
  dichiarato: { it: "dichiarato dal produttore", en: "manufacturer's claim" },
  "test indipendente": { it: "test indipendente", en: "independent test" }, dimostrato: { it: "dimostrato", en: "demonstrated" },
};

export const MAX_CONFRONTO = 4;

const T = {
  it: {
    articolo: "AssoUmanoidi — Modelli", soprattitolo: "Modelli", titolo: "di umanoidi.",
    intro: "I robot umanoidi delle aziende della directory, con le schede tecniche. Ogni dato ha la sua fonte; quando manca resta vuoto.",
    modelli: "modelli", conSchede: "con scheda tecnica", inVendita: "in vendita",
    cerca: "Cerca modello o azienda", stato: "Tutti gli stati", tipo: "Tutti i tipi", filtra: "Filtra", azzera: "Azzera",
    modello: "Modello", azienda: "Azienda", statoCol: "Stato", prezzo: "Prezzo", anno: "Anno", confronta: "Confronta i selezionati",
    aiuto: `Seleziona da 2 a ${MAX_CONFRONTO} modelli con scheda e premi «Confronta».`, inPrep: "scheda in preparazione", vuoto: "Nessun modello con questi filtri.",
    indietro: "← Tutti i modelli", fonti: "Fonti", verificato: "Dati verificati sulla fonte del produttore o su due fonti concordi.",
    parziale: "Dati parziali: in corso di verifica.", aggiornato: "Scheda aggiornata il", sitoAzienda: "Sito dell'azienda",
    confronto: "Confronto", confrontoTitolo: "fra modelli.", pochi: `Scegli da 2 a ${MAX_CONFRONTO} modelli dall'elenco.`, tipoCol: "Tipo",
    nota: "I valori sono quelli dichiarati dalle fonti indicate e possono riferirsi a versioni o configurazioni diverse: confrontali con cautela.",
  },
  en: {
    articolo: "AssoUmanoidi — Models", soprattitolo: "Humanoid", titolo: "models.",
    intro: "The humanoid robots of the companies in our directory, with their specs. Every figure has a source; when missing, it stays blank.",
    modelli: "models", conSchede: "with specs", inVendita: "on sale",
    cerca: "Search model or company", stato: "All statuses", tipo: "All types", filtra: "Filter", azzera: "Reset",
    modello: "Model", azienda: "Company", statoCol: "Status", prezzo: "Price", anno: "Year", confronta: "Compare selected",
    aiuto: `Select 2 to ${MAX_CONFRONTO} models with specs and press “Compare”.`, inPrep: "specs in preparation", vuoto: "No models match these filters.",
    indietro: "← All models", fonti: "Sources", verificato: "Figures checked against the manufacturer or two matching sources.",
    parziale: "Partial figures: being verified.", aggiornato: "Specs updated on", sitoAzienda: "Company website",
    confronto: "Compare", confrontoTitolo: "humanoid models.", pochi: `Pick 2 to ${MAX_CONFRONTO} models from the list.`, tipoCol: "Type",
    nota: "Figures are as stated by the sources listed and may refer to different versions or configurations: compare with care.",
  },
} as const;

const fmt = (v: number | null, unit: string, l: Lingua) =>
  v === null ? "—" : `${v.toLocaleString(l === "it" ? "it-IT" : "en-GB", { maximumFractionDigits: 2 })}${unit ? ` ${unit}` : ""}`;
const lab = (m: Record<string, { it: string; en: string }>, k: string | null, l: Lingua) => (k ? m[k]?.[l] ?? k : "—");
const norm = (s: string) => s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase();

function Guscio({ lingua, altraLingua, children }: { lingua: Lingua; altraLingua: string; children: React.ReactNode }) {
  const { NAV, NAV_TESTI } = testi(lingua);
  const ROTTE = rotte(lingua);
  return (
    <>
      <Nav sottopagina lingua={lingua} voci={NAV(ROTTE)} testi={NAV_TESTI} aderisci={ROTTE.aderisci} altraLingua={altraLingua} />
      {children}
      <Piede lingua={lingua} />
    </>
  );
}

export type Filtri = { q?: string; stato?: string; tipo?: string };

export function Modelli({ voci, lingua, filtri }: { voci: Modello[]; lingua: Lingua; filtri: Filtri }) {
  const t = T[lingua];
  const base = PAGINE.modelli[lingua];
  const q = norm((filtri.q ?? "").trim());
  const stato = filtri.stato && STATI[filtri.stato] ? filtri.stato : "";
  const tipo = filtri.tipo && TIPI[filtri.tipo] ? filtri.tipo : "";
  const mostrati = voci
    .filter((m) => (!stato || m.status === stato) && (!tipo || m.kind === tipo) && (!q || norm(`${m.name} ${m.company.name}`).includes(q)))
    // prima le schede con dati, poi le altre; in ordine di azienda
    .sort((a, b) => Number(haScheda(b)) - Number(haScheda(a)) || a.company.name.localeCompare(b.company.name, "it") || a.name.localeCompare(b.name, "it"));
  const qs = new URLSearchParams(Object.entries({ q: filtri.q ?? "", stato, tipo }).filter(([, v]) => v)).toString();
  return (
    <Guscio lingua={lingua} altraLingua={`${PAGINE.modelli[altra(lingua)]}${qs ? `?${qs}` : ""}`}>
      <main className="au-pagina au-mod">
        <header className="au-pag-testa">
          <div className="art">{t.articolo}</div>
          <h1>{t.soprattitolo}<br /><span className="h">{t.titolo}</span></h1>
          <div className="au-pag-testa-in">
            <p className="au-pag-intro">{t.intro}</p>
            <div className="au-dir-conti">
              <div><b className="dati">{voci.length}</b><span>{t.modelli}</span></div>
              <div><b className="dati">{voci.filter(haScheda).length}</b><span>{t.conSchede}</span></div>
              <div><b className="dati">{voci.filter((m) => m.status === "in vendita").length}</b><span>{t.inVendita}</span></div>
            </div>
          </div>
        </header>
        <section className="au-pag-corpo">
          <form className="au-mod-filtri" action={base}>
            <input type="search" name="q" defaultValue={filtri.q ?? ""} placeholder={t.cerca} aria-label={t.cerca} />
            <select name="stato" defaultValue={stato} aria-label={t.statoCol}><option value="">{t.stato}</option>{Object.entries(STATI).map(([k, v]) => <option key={k} value={k}>{v[lingua]}</option>)}</select>
            <select name="tipo" defaultValue={tipo} aria-label={t.tipoCol}><option value="">{t.tipo}</option>{Object.entries(TIPI).map(([k, v]) => <option key={k} value={k}>{v[lingua]}</option>)}</select>
            <button>{t.filtra}</button>
            {qs && <a href={base}>{t.azzera}</a>}
          </form>
          <form action={`${base}/${lingua === "it" ? "confronto" : "compare"}`}>
            <p className="au-mod-aiuto">{t.aiuto} <button className="au-mod-confronta">{t.confronta}</button></p>
            <div className="au-mod-tabella">
              <table>
                <thead><tr><th aria-label={t.confronta}></th><th>{t.modello}</th><th>{t.azienda}</th><th>{t.statoCol}</th>
                  {SPECS.slice(0, 3).map((s) => <th key={s.key}>{s[lingua]}</th>)}<th>{t.prezzo}</th></tr></thead>
                <tbody>
                  {mostrati.length ? mostrati.map((m) => {
                    const scheda = haScheda(m);
                    return (
                      <tr key={m.slug} className={scheda ? "" : "vuota"}>
                        <td>{scheda && <input type="checkbox" name="m" value={m.slug} aria-label={`${t.confronta}: ${m.name}`} />}</td>
                        <td>{scheda ? <a href={`${base}/${m.slug}`}><strong>{m.name}</strong></a> : <strong>{m.name}</strong>}
                          {!scheda && <span className="au-mod-prep">{t.inPrep}</span>}</td>
                        <td>{m.company.name}</td>
                        <td>{lab(STATI, m.status, lingua)}</td>
                        {SPECS.slice(0, 3).map((s) => <td key={s.key} className="au-mod-num">{fmt(m.specs[s.key], s.unit, lingua)}</td>)}
                        <td className="au-mod-num">{m.price?.text ?? "—"}</td>
                      </tr>
                    );
                  }) : <tr><td colSpan={8}>{t.vuoto}</td></tr>}
                </tbody>
              </table>
            </div>
          </form>
          <p className="au-mod-nota">{t.nota}</p>
        </section>
      </main>
    </Guscio>
  );
}

function Fonti({ m, lingua }: { m: Modello; lingua: Lingua }) {
  const t = T[lingua];
  return (
    <>
      <h2>{t.fonti}</h2>
      <ul className="au-lib-fonti">
        {m.sources.map((s) => (
          <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer nofollow">{s.url.replace(/^https?:\/\/(www\.)?/, "").slice(0, 70)}</a>
            {s.for && <> — {s.for}</>} <em>({lab(NATURE, s.nature, lingua)})</em></li>
        ))}
      </ul>
      <p className="au-not-avviso">{m.verification === "verificato" ? t.verificato : t.parziale}</p>
    </>
  );
}

export function ModelloPagina({ m, lingua }: { m: Modello; lingua: Lingua }) {
  const t = T[lingua];
  const descr = inLingua(m.description, lingua);
  return (
    <Guscio lingua={lingua} altraLingua={`${PAGINE.modelli[altra(lingua)]}/${m.slug}`}>
      <main className="au-pagina au-mod">
        <header className="au-pag-testa">
          <a className="au-prod-indietro" href={PAGINE.modelli[lingua]}>{t.indietro}</a>
          <div className="art">{[m.company.name, m.company.country].filter(Boolean).join(" · ")}</div>
          <h1>{m.name}</h1>
          <p className="au-lib-tag">{[lab(TIPI, m.kind, lingua), lab(STATI, m.status, lingua), m.year].filter((x) => x && x !== "—").join(" · ")}</p>
        </header>
        <section className="au-pag-corpo au-not-corpo">
          {descr && <p lang={lingua === "en" && !m.description.en ? "it" : undefined}>{descr}</p>}
          <dl className="au-mod-scheda">
            {SPECS.map((s) => <div key={s.key}><dt>{s[lingua]}</dt><dd className="au-mod-num">{fmt(m.specs[s.key], s.unit, lingua)}</dd></div>)}
            <div><dt>{t.prezzo}</dt><dd>{m.price?.text ?? "—"}</dd></div>
            <div><dt>{t.anno}</dt><dd>{m.year ?? "—"}</dd></div>
          </dl>
          <Fonti m={m} lingua={lingua} />
          {m.company.website && <p><a href={m.company.website} target="_blank" rel="noopener noreferrer">{t.sitoAzienda} ↗</a></p>}
          {m.updated && <p className="au-mod-nota">{t.aggiornato} {new Date(m.updated).toLocaleDateString(lingua === "it" ? "it-IT" : "en-GB", { timeZone: "Europe/Rome" })}</p>}
        </section>
      </main>
    </Guscio>
  );
}

export function Confronto({ scelti, lingua }: { scelti: Modello[]; lingua: Lingua }) {
  const t = T[lingua];
  const sel = scelti.map((m) => `m=${encodeURIComponent(m.slug)}`).join("&");
  const righe: { k: string; v: (m: Modello) => React.ReactNode }[] = [
    { k: t.azienda, v: (m) => m.company.name },
    { k: t.tipoCol, v: (m) => lab(TIPI, m.kind, lingua) },
    { k: t.statoCol, v: (m) => lab(STATI, m.status, lingua) },
    { k: t.anno, v: (m) => m.year ?? "—" },
    ...SPECS.map((s) => ({ k: s[lingua], v: (m: Modello) => fmt(m.specs[s.key], s.unit, lingua) })),
    { k: t.prezzo, v: (m) => m.price?.text ?? "—" },
    { k: t.fonti, v: (m) => m.sources.length },
  ];
  return (
    <Guscio lingua={lingua} altraLingua={`${PAGINE.modelli[altra(lingua)]}/${lingua === "it" ? "compare" : "confronto"}${sel ? `?${sel}` : ""}`}>
      <main className="au-pagina au-mod">
        <header className="au-pag-testa">
          <a className="au-prod-indietro" href={PAGINE.modelli[lingua]}>{t.indietro}</a>
          <div className="art">{t.articolo}</div>
          <h1>{t.confronto}<br /><span className="h">{t.confrontoTitolo}</span></h1>
        </header>
        <section className="au-pag-corpo">
          {scelti.length < 2 ? <p className="au-not-avviso">{t.pochi}</p> : (
            <div className="au-mod-tabella">
              <table className="au-mod-confronto">
                <thead><tr><th></th>{scelti.map((m) => <th key={m.slug}><a href={`${PAGINE.modelli[lingua]}/${m.slug}`}>{m.name}</a></th>)}</tr></thead>
                <tbody>{righe.map((r) => <tr key={r.k}><th scope="row">{r.k}</th>{scelti.map((m) => <td key={m.slug} className="au-mod-num">{r.v(m)}</td>)}</tr>)}</tbody>
              </table>
            </div>
          )}
          <p className="au-mod-nota">{t.nota}</p>
        </section>
      </main>
    </Guscio>
  );
}
